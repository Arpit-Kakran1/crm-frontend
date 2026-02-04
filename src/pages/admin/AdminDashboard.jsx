import { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { toPng } from 'html-to-image'
import api from '../../utils/api.js'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

import Card from '../../components/ui/Card.jsx'
import Select from '../../components/ui/Select.jsx'
import Button from '../../components/ui/Button.jsx'
import { serverUrl } from '../../utils/serverUrl.js'

const STATUS_COLORS = {
  NEW: '#2563EB',
  CONTACTED: '#F59E0B',
  VISITED: '#10B981',
  NEGOTIATION: '#6366F1',
  CLOSED: '#22C55E',
  LOST: '#EF4444',
}

const AdminDashboard = () => {
  const [properties, setProperties] = useState([])
  const [enquiries, setEnquiries] = useState([])
  const [month, setMonth] = useState('ALL')
  const [status, setStatus] = useState('ALL')

  const dashboardRef = useRef(null)

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [pRes, eRes] = await Promise.all([
          api.get('/api/properties/getproperty'),
          api.get('/api/enquiries'),
        ])

        setProperties(pRes.data.data || [])
        setEnquiries(eRes.data.data || [])
      } catch (err) {
        console.error('Dashboard fetch failed', err)
      }
    }

    fetchAll()
  }, [])


  /* ---------------- FILTERED ENQUIRIES ---------------- */
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter(e => {
      const d = new Date(e.createdAt)
      const monthMatch =
        month === 'ALL' || d.getMonth() + 1 === Number(month)
      const statusMatch =
        status === 'ALL' || e.status === status
      return monthMatch && statusMatch
    })
  }, [enquiries, month, status])

  /* ---------------- KPIs ---------------- */
  const totalProperties = properties.length
  const totalEnquiries = filteredEnquiries.length

  const leadsWon = filteredEnquiries.filter(e => e.status === 'CLOSED').length
  const leadsLost = filteredEnquiries.filter(e => e.status === 'LOST').length

  /* ---------------- ENQUIRIES BY WEEK ---------------- */
  const enquiriesByWeek = useMemo(() => {
    const map = {}
    filteredEnquiries.forEach(e => {
      const d = new Date(e.createdAt)
      const key = `${d.getFullYear()}-W${Math.ceil(d.getDate() / 7)}`
      map[key] = (map[key] || 0) + 1
    })
    return Object.entries(map).map(([week, count]) => ({
      week,
      enquiries: count,
    }))
  }, [filteredEnquiries])

  /* ---------------- ENQUIRIES BY STATUS ---------------- */
  const enquiriesByStatus = useMemo(() => {
    const map = {}
    filteredEnquiries.forEach(e => {
      map[e.status] = (map[e.status] || 0) + 1
    })
    return Object.entries(map).map(([name, value]) => ({ name, value }))
  }, [filteredEnquiries])

  /* ---------------- PROPERTIES BY TYPE ---------------- */
  const propertiesByType = useMemo(() => {
    const map = {}
    properties.forEach(p => {
      map[p.propertyType] = (map[p.propertyType] || 0) + 1
    })
    return Object.entries(map).map(([type, count]) => ({ type, count }))
  }, [properties])

  /* ---------------- EXPORT DASHBOARD ---------------- */
  const exportPNG = async () => {
    if (!dashboardRef.current) return
    const dataUrl = await toPng(dashboardRef.current)
    const link = document.createElement('a')
    link.download = 'crm-dashboard.png'
    link.href = dataUrl
    link.click()
  }

  return (
    <div ref={dashboardRef} className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-semibold text-crm-text">
            Admin Dashboard
          </div>
          <div className="text-sm text-crm-muted">
            Real-time overview of properties & enquiries
          </div>
        </div>

        <div className="flex gap-2">
          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            options={[
              { value: 'ALL', label: 'All Months' },
              ...Array.from({ length: 12 }).map((_, i) => ({
                value: String(i + 1),
                label: new Date(0, i).toLocaleString('default', { month: 'long' }),
              })),
            ]}
          />
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: 'ALL', label: 'All Status' },
              ...Object.keys(STATUS_COLORS).map(s => ({ value: s, label: s })),
            ]}
          />
          <Button variant="secondary" onClick={exportPNG}>
            Export PNG
          </Button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          ['Total Properties', totalProperties],
          ['Total Enquiries', totalEnquiries],
          ['Leads Won', leadsWon],
          ['Leads Lost', leadsLost],
        ].map(([label, value]) => (
          <Card key={label} className="bg-white p-4">
            <div className="text-xs text-crm-muted">{label}</div>
            <div className="mt-1 text-2xl font-semibold text-crm-text">
              {value}
            </div>
          </Card>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* LINE */}
        <Card className="bg-white p-5 lg:col-span-2">
          <div className="mb-3 text-sm font-semibold text-crm-text">
            Enquiry Trend (Weekly)
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={enquiriesByWeek}>
              <CartesianGrid stroke="#E5E7EB" strokeDasharray="4 4" />
              <XAxis dataKey="week" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="enquiries"
                stroke="#2563EB"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* DONUT */}
        <Card className="bg-white p-5">
          <div className="mb-3 text-sm font-semibold text-crm-text">
            Enquiry Pipeline
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={enquiriesByStatus}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
              >
                {enquiriesByStatus.map((e, i) => (
                  <Cell key={i} fill={STATUS_COLORS[e.name]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* BAR */}
        <Card className="bg-white p-5 lg:col-span-3">
          <div className="mb-3 text-sm font-semibold text-crm-text">
            Property Inventory
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={propertiesByType}>
              <CartesianGrid stroke="#E5E7EB" strokeDasharray="4 4" />
              <XAxis dataKey="type" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
