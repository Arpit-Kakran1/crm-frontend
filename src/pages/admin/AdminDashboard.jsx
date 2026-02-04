// // // import Card from '../../components/ui/Card.jsx'

// // // export default function AdminDashboard() {
// // //   return (
// // //     <div className="space-y-4">
// // //       <div>
// // //         <div className="text-sm font-semibold text-crm-text">Dashboard</div>
// // //         <div className="text-sm text-crm-muted">
// // //           Overview of your CRM data
// // //         </div>
// // //       </div>

// // //       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
// // //         <Card className="bg-white">
// // //           <div className="p-4">
// // //             <div className="text-xs text-crm-muted">Total Properties</div>
// // //             <div className="mt-1 text-2xl font-semibold text-crm-text">
// // //               0
// // //             </div>
// // //           </div>
// // //         </Card>

// // //         <Card className="bg-white">
// // //           <div className="p-4">
// // //             <div className="text-xs text-crm-muted">Total Enquiries</div>
// // //             <div className="mt-1 text-2xl font-semibold text-crm-text">
// // //               0
// // //             </div>
// // //           </div>
// // //         </Card>

// // //         <Card className="bg-white">
// // //           <div className="p-4">
// // //             <div className="text-xs text-crm-muted">Total Leads</div>
// // //             <div className="mt-1 text-2xl font-semibold text-crm-text">
// // //               0
// // //             </div>
// // //           </div>
// // //         </Card>
// // //       </div>
// // //     </div>
// // //   )
// // // }
// // import { useEffect, useState } from 'react'
// // import axios from 'axios'
// // import Card from '../../components/ui/Card.jsx'
// // import { serverUrl } from '../../utils/serverUrl.js'

// // const AdminDashboard = () => {
// //   const [loading, setLoading] = useState(true)

// //   const [stats, setStats] = useState({
// //     properties: 0,
// //     enquiries: 0,
// //     leads: 0,
// //     closed: 0,
// //     lost: 0,
// //     newLeads: 0,
// //   })

// //   useEffect(() => {
// //     const fetchDashboardData = async () => {
// //       try {
// //         const [propertiesRes, enquiriesRes] = await Promise.all([
// //           axios.get(`${serverUrl}/api/properties/getproperty`, {
// //             withCredentials: true,
// //           }),
// //           axios.get(`${serverUrl}/api/enquiries`, {
// //             withCredentials: true,
// //           }),
// //         ])

// //         const properties = propertiesRes.data.data || []
// //         const enquiries = enquiriesRes.data.data || []

// //         const leads = enquiries.filter(
// //           (e) => !['CLOSED', 'LOST'].includes(e.status)
// //         )

// //         const closed = enquiries.filter((e) => e.status === 'CLOSED')
// //         const lost = enquiries.filter((e) => e.status === 'LOST')
// //         const newLeads = enquiries.filter((e) => e.status === 'NEW')

// //         setStats({
// //           properties: properties.length,
// //           enquiries: enquiries.length,
// //           leads: leads.length,
// //           closed: closed.length,
// //           lost: lost.length,
// //           newLeads: newLeads.length,
// //         })
// //       } catch (error) {
// //         console.error('Dashboard fetch failed', error)
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     fetchDashboardData()
// //   }, [])

// //   if (loading) {
// //     return <div className="text-sm text-crm-muted">Loading dashboard…</div>
// //   }

// //   return (
// //     <div className="space-y-4">
// //       <div>
// //         <div className="text-sm font-semibold text-crm-text">Dashboard</div>
// //         <div className="text-sm text-crm-muted">
// //           Overview of your CRM data
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
// //         <Card className="bg-white">
// //           <div className="p-4">
// //             <div className="text-xs text-crm-muted">Total Properties</div>
// //             <div className="mt-1 text-2xl font-semibold text-crm-text">
// //               {stats.properties}
// //             </div>
// //           </div>
// //         </Card>

// //         <Card className="bg-white">
// //           <div className="p-4">
// //             <div className="text-xs text-crm-muted">Total Enquiries</div>
// //             <div className="mt-1 text-2xl font-semibold text-crm-text">
// //               {stats.enquiries}
// //             </div>
// //           </div>
// //         </Card>

// //         <Card className="bg-white">
// //           <div className="p-4">
// //             <div className="text-xs text-crm-muted">Active Leads</div>
// //             <div className="mt-1 text-2xl font-semibold text-crm-text">
// //               {stats.leads}
// //             </div>
// //           </div>
// //         </Card>

// //         <Card className="bg-white">
// //           <div className="p-4">
// //             <div className="text-xs text-crm-muted">New Leads</div>
// //             <div className="mt-1 text-2xl font-semibold text-crm-text">
// //               {stats.newLeads}
// //             </div>
// //           </div>
// //         </Card>

// //         <Card className="bg-white">
// //           <div className="p-4">
// //             <div className="text-xs text-crm-muted">Closed Deals</div>
// //             <div className="mt-1 text-2xl font-semibold text-crm-text">
// //               {stats.closed}
// //             </div>
// //           </div>
// //         </Card>

// //         <Card className="bg-white">
// //           <div className="p-4">
// //             <div className="text-xs text-crm-muted">Lost Leads</div>
// //             <div className="mt-1 text-2xl font-semibold text-crm-text">
// //               {stats.lost}
// //             </div>
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   )
// // }

// // export default AdminDashboard
// import { useEffect, useMemo, useState } from 'react'
// import axios from 'axios'
// import Card from '../../components/ui/Card.jsx'
// import { serverUrl } from '../../utils/serverUrl.js'

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   CartesianGrid,
// } from 'recharts'

// const STATUS_COLORS = {
//   NEW: '#3B82F6',
//   CONTACTED: '#6366F1',
//   VISITED: '#22C55E',
//   NEGOTIATION: '#F59E0B',
//   CLOSED: '#16A34A',
//   LOST: '#EF4444',
// }

// const AdminDashboard = () => {
//   const [properties, setProperties] = useState([])
//   const [enquiries, setEnquiries] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const [pRes, eRes] = await Promise.all([
//           axios.get(`${serverUrl}/api/properties/getproperty`, { withCredentials: true }),
//           axios.get(`${serverUrl}/api/enquiries`, { withCredentials: true }),
//         ])

//         setProperties(pRes.data.data || [])
//         setEnquiries(eRes.data.data || [])
//       } catch (err) {
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchDashboardData()
//   }, [])

//   /* ---------------- KPIs ---------------- */
//   const totalProperties = properties.length
//   const totalEnquiries = enquiries.length
//   const newEnquiries = enquiries.filter(e => e.status === 'NEW').length
//   const closedEnquiries = enquiries.filter(e => e.status === 'CLOSED').length

//   /* ---------------- Enquiries Over Time ---------------- */
//   const enquiriesByDate = useMemo(() => {
//     const map = {}
//     enquiries.forEach(e => {
//       const date = new Date(e.createdAt).toISOString().split('T')[0]
//       map[date] = (map[date] || 0) + 1
//     })
//     return Object.entries(map).map(([date, count]) => ({ date, count }))
//   }, [enquiries])

//   /* ---------------- Status Pie ---------------- */
//   const enquiriesByStatus = useMemo(() => {
//     const map = {}
//     enquiries.forEach(e => {
//       map[e.status] = (map[e.status] || 0) + 1
//     })
//     return Object.entries(map).map(([name, value]) => ({ name, value }))
//   }, [enquiries])

//   /* ---------------- Property Type Bar ---------------- */
//   const propertiesByType = useMemo(() => {
//     const map = {}
//     properties.forEach(p => {
//       map[p.propertyType] = (map[p.propertyType] || 0) + 1
//     })
//     return Object.entries(map).map(([type, count]) => ({ type, count }))
//   }, [properties])

//   if (loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center text-sm text-crm-muted">
//         Loading dashboard…
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {/* KPIs */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <Card className="bg-white p-4">
//           <div className="text-xs text-crm-muted">Total Properties</div>
//           <div className="text-2xl font-semibold">{totalProperties}</div>
//         </Card>
//         <Card className="bg-white p-4">
//           <div className="text-xs text-crm-muted">Total Enquiries</div>
//           <div className="text-2xl font-semibold">{totalEnquiries}</div>
//         </Card>
//         <Card className="bg-white p-4">
//           <div className="text-xs text-crm-muted">New Enquiries</div>
//           <div className="text-2xl font-semibold text-blue-600">{newEnquiries}</div>
//         </Card>
//         <Card className="bg-white p-4">
//           <div className="text-xs text-crm-muted">Closed Deals</div>
//           <div className="text-2xl font-semibold text-green-600">{closedEnquiries}</div>
//         </Card>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//         {/* Line Chart */}
//         <Card className="bg-white p-4">
//           <div className="mb-3 text-sm font-semibold">Enquiries Over Time</div>
//           <ResponsiveContainer width="100%" height={260}>
//             <LineChart data={enquiriesByDate}>
//               <XAxis dataKey="date" />
//               <YAxis allowDecimals={false} />
//               <Tooltip />
//               <Line type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </Card>

//         {/* Pie Chart */}
//         <Card className="bg-white p-4">
//           <div className="mb-3 text-sm font-semibold">Enquiry Status</div>
//           <ResponsiveContainer width="100%" height={260}>
//             <PieChart>
//               <Pie
//                 data={enquiriesByStatus}
//                 dataKey="value"
//                 nameKey="name"
//                 outerRadius={90}
//                 label
//               >
//                 {enquiriesByStatus.map((entry, idx) => (
//                   <Cell key={idx} fill={STATUS_COLORS[entry.name]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </Card>

//         {/* Bar Chart */}
//         <Card className="bg-white p-4 lg:col-span-2">
//           <div className="mb-3 text-sm font-semibold">Properties by Type</div>
//           <ResponsiveContainer width="100%" height={260}>
//             <BarChart data={propertiesByType}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="type" />
//               <YAxis allowDecimals={false} />
//               <Tooltip />
//               <Bar dataKey="count" fill="#6366F1" />
//             </BarChart>
//           </ResponsiveContainer>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export default AdminDashboard
import { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { toPng } from 'html-to-image'
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
      const [pRes, eRes] = await Promise.all([
        axios.get(`${serverUrl}/api/properties/getproperty`, { withCredentials: true }),
        axios.get(`${serverUrl}/api/enquiries`, { withCredentials: true }),
      ])
      setProperties(pRes.data.data || [])
      setEnquiries(eRes.data.data || [])
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
