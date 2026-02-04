import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Card from '../../components/ui/Card.jsx'
import Input from '../../components/ui/Input.jsx'
import Select from '../../components/ui/Select.jsx'
import Badge from '../../components/ui/Badge.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'

import { serverUrl } from '../../utils/serverUrl.js'

const badgeColorForStatus = (status) => {
  if (status === 'Available') return 'green'
  if (status === 'Booked') return 'amber'
  if (status === 'Sold' || status === 'Rented') return 'red'
  return 'default'
}

const PropertiesList = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  // filters
  const [q, setQ] = useState('')
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [status, setStatus] = useState('')
  const [minBudget, setMinBudget] = useState('')
  const [maxBudget, setMaxBudget] = useState('')

  /* ---------------- FETCH PROPERTIES ---------------- */
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/properties/getproperty`
        )
        setProperties(res.data.data || [])
      } catch (err) {
        console.error('Failed to fetch properties', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  /* ---------------- REAL-TIME FILTERING ---------------- */
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchesSearch =
        q === '' ||
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.location.toLowerCase().includes(q.toLowerCase()) ||
        p.propertyType.toLowerCase().includes(q.toLowerCase()) ||
        p.status.toLowerCase().includes(q.toLowerCase())

      const matchesLocation =
        location === '' || p.location === location

      const matchesType =
        propertyType === '' || p.propertyType === propertyType

      const matchesStatus =
        status === '' || p.status === status

      const matchesMin =
        minBudget === '' || p.price >= Number(minBudget)

      const matchesMax =
        maxBudget === '' || p.price <= Number(maxBudget)

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesStatus &&
        matchesMin &&
        matchesMax
      )
    })
  }, [
    properties,
    q,
    location,
    propertyType,
    status,
    minBudget,
    maxBudget,
  ])

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-crm-text">Properties</div>
          <div className="text-sm text-crm-muted">
            Search and filter properties
          </div>
        </div>
        <div className="text-sm text-crm-muted">
          Showing{' '}
          <span className="font-medium text-crm-text">
            {filteredProperties.length}
          </span>{' '}
          of{' '}
          <span className="font-medium text-crm-text">
            {properties.length}
          </span>
        </div>
      </div>

      {/* FILTERS */}
      <Card className="bg-white">
        <div className="p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
            <div className="md:col-span-2">
              <Input
                label="Search"
                placeholder="Title, location, type, status..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <Select
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              options={[
                { value: '', label: 'All' },
                ...[...new Set(properties.map((p) => p.location))].map(
                  (loc) => ({ value: loc, label: loc })
                ),
              ]}
            />

            <Select
              label="Type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              options={[
                { value: '', label: 'All' },
                ...[...new Set(properties.map((p) => p.propertyType))].map(
                  (t) => ({ value: t, label: t })
                ),
              ]}
            />

            <Select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { value: '', label: 'All' },
                { value: 'Available', label: 'Available' },
                { value: 'Booked', label: 'Booked' },
                { value: 'Sold', label: 'Sold' },
                { value: 'Rented', label: 'Rented' },
              ]}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Min ₹"
                inputMode="numeric"
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
              />
              <Input
                label="Max ₹"
                inputMode="numeric"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* PROPERTY GRID */}
      {loading ? (
        <div className="text-sm text-crm-muted">Loading properties…</div>
      ) : filteredProperties.length === 0 ? (
        <EmptyState
          title="No properties found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((p) => (
            <Card key={p._id} className="bg-white overflow-hidden">
              <div className="aspect-[16/10] bg-crm-surface">
                <img
                  src={p.images?.[0] || 'https://via.placeholder.com/600x400'}
                  alt={p.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-crm-text">
                      {p.title}
                    </div>
                    <div className="text-sm text-crm-muted">
                      {p.location}
                    </div>
                  </div>
                  <Badge color={badgeColorForStatus(p.status)}>
                    {p.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-crm-text">
                    ₹ {Number(p.price).toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-crm-muted">
                    {p.propertyType}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/properties/${p._id}`}
                    className="text-sm font-medium text-crm-primary hover:underline"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default PropertiesList
