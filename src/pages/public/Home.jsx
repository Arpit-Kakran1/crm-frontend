import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Card from '../../components/ui/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import Stats from './Stats.jsx'
import { serverUrl } from '../../utils/serverUrl.js'

const Home = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/properties/getproperty`
        )

        setProperties(res.data.data || [])
      } catch (error) {
        console.error('Failed to fetch properties', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const featured = properties.slice(0, 6)

  return (
    <div className="space-y-6">
      {/* HERO */}
      <Card
        className="
    relative overflow-hidden
    bg-white
    shadow-[0_10px_30px_rgba(0,0,0,0.08)]
    transition-all duration-300
    hover:-translate-y-1
    hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)]
  "
      >
        {/* subtle accent gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-purple-50/40 pointer-events-none" />

        <div className="relative p-6 md:p-8">
          <div className="text-xs font-semibold tracking-wide text-blue-600">
            Properties!!
          </div>

          <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-crm-text leading-tight">
            Find properties.
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Close leads faster.
            </span>
          </h1>

          <p className="mt-3 text-sm md:text-base text-crm-muted max-w-2xl">
            Find your dream property with us just put the enquiry and rest we will do for you.
            So let's get started.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/properties">
              <Button variant="primary" className="shadow-soft hover:scale-[1.02] transition">
                Browse properties
              </Button>
            </Link>
          </div>
        </div>
      </Card>


      {/* HEADER */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-sm font-semibold text-crm-text">
            Featured properties
          </div>
          <div className="text-sm text-crm-muted">
            Quick picks from the latest listings
          </div>
        </div>
        <Link
          to="/properties"
          className="text-sm font-medium text-crm-primary"
        >
          View all
        </Link>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-sm text-crm-muted">
          Loading properties...
        </div>
      ) : featured.length === 0 ? (
        <div className="text-sm text-crm-muted">
          No properties available
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {featured.map((p) => (
            <Card key={p._id} className="bg-white">
              <div className="h-40 w-full bg-crm-bg">
                <img
                  src={
                    p.images && p.images.length > 0
                      ? p.images[0]
                      : 'https://via.placeholder.com/400x300?text=No+Image'
                  }
                  alt={p.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="text-sm font-semibold text-crm-text">
                  {p.title}
                </div>
                <div className="mt-1 text-sm text-crm-muted">
                  {p.location}
                </div>
                <div className="mt-3 text-sm font-semibold text-crm-text">
                  ₹ {Number(p.price).toLocaleString('en-IN')}
                </div>
                <div className="mt-4">
                  <Link to={`/properties/${p._id}`}>
                    <Button variant="secondary" size="sm">
                      View details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Stats />
    </div>
  )
}

export default Home
