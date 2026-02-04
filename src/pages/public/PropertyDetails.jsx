import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Card from '../../components/ui/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Modal from '../../components/ui/Modal.jsx'
import Input from '../../components/ui/Input.jsx'

import { serverUrl } from '../../utils/serverUrl.js'
import {
  FaRulerCombined,
  FaBed,
  FaBath,
  FaCar,
  FaCouch,
  FaLayerGroup,
  FaCompass,
  FaHourglassHalf,
} from 'react-icons/fa'

const badgeColorForStatus = (status) => {
  if (status === 'Available') return 'green'
  if (status === 'Booked') return 'amber'
  if (status === 'Sold' || status === 'Rented') return 'red'
  return 'default'
}

const PropertyDetails = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  const [activeImg, setActiveImg] = useState(0)
  const [open, setOpen] = useState(false)

  const [enquiry, setEnquiry] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  /* ---------------- FETCH PROPERTY ---------------- */
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/properties/getproperty/${id}`
        )
        setProperty(res.data.data)
      } catch (error) {
        console.error('Failed to fetch property', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id])

  /* ---------------- SUBMIT ENQUIRY ---------------- */
  const handleSubmitEnquiry = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${serverUrl}/api/enquiries`, {
        ...enquiry,
        propertyId: property._id,
      })
      toast.success("Enquiry send successfully");

      setOpen(false)
      setEnquiry({
        name: '',
        email: '',
        phone: '',
        message: '',
      })
    } catch (error) {
      console.error('Enquiry failed', error)
    }
  }

  if (loading) {
    return <div className="text-sm text-crm-muted">Loading property...</div>
  }

  if (!property) {
    return <div className="text-sm text-crm-muted">Property not found</div>
  }

  const images =
    property.images && property.images.length > 0
      ? property.images
      : ['https://via.placeholder.com/800x500?text=No+Image']

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/properties"
          className="text-sm font-medium text-crm-primary hover:underline"
        >
          ← Back
        </Link>
        <Badge color={badgeColorForStatus(property.status)}>
          {property.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* IMAGE GALLERY */}
        <Card className="bg-white lg:col-span-2 overflow-hidden">
          <div className="aspect-[16/10] bg-crm-surface">
            <img
              src={images[activeImg]}
              alt={property.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 p-3">
            {images.map((src, idx) => (
              <button
                key={idx}
                type="button"
                className={`aspect-[16/10] overflow-hidden rounded-md border ${idx === activeImg
                  ? 'border-blue-500'
                  : 'border-crm-border hover:border-blue-300'
                  }`}
                onClick={() => setActiveImg(idx)}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </Card>

        {/* PROPERTY INFO */}
        <Card className="bg-white">
          <div className="p-4 space-y-3">
            <div>
              <div className="text-sm font-semibold text-crm-text">
                {property.title}
              </div>
              <div className="text-sm text-crm-muted">
                {property.location}
              </div>
            </div>

            <div className="rounded-md border border-crm-border bg-crm-surface p-3">
              <div className="text-xs text-crm-muted">Price</div>
              <div className="text-lg font-semibold text-crm-text">
                ₹ {Number(property.price).toLocaleString('en-IN')}
              </div>
            </div>

            <div className="rounded-md border border-crm-border bg-white p-3 text-sm">
              <div className="text-xs text-crm-muted">Type</div>
              <div className="font-medium text-crm-text">
                {property.propertyType}
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={() => setOpen(true)}
            >
              Submit enquiry
            </Button>

            <div className="text-xs text-crm-muted">
              Enquiries are sent to the admin.
            </div>
          </div>
        </Card>
      </div>

      {/* PROPERTY FEATURES */}
      <Card className="bg-white">
        <div className="p-4">
          <div className="mb-3 text-sm font-semibold text-crm-text">
            Property Features
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {property.area && (
              <div className="flex items-center gap-3 rounded-md border border-crm-border bg-crm-surface p-3">
                <FaRulerCombined className="text-orange-500 text-lg" />
                <div>
                  <div className="text-xs text-crm-muted">Area</div>
                  <div className="text-sm font-medium text-crm-text">
                    {property.area} sqft
                  </div>
                </div>
              </div>
            )}

            {property.bedrooms && (
              <div className="flex items-center gap-3 rounded-md border border-crm-border bg-crm-surface p-3">
                <FaBed className="text-blue-600 text-lg" />
                <div>
                  <div className="text-xs text-crm-muted">Bedrooms</div>
                  <div className="text-sm font-medium text-crm-text">
                    {property.bedrooms}
                  </div>
                </div>
              </div>
            )}

            {property.bathrooms && (
              <div className="flex items-center gap-3 rounded-md border border-crm-border bg-crm-surface p-3">
                <FaBath className="text-cyan-500 text-lg" />
                <div>
                  <div className="text-xs text-crm-muted">Bathrooms</div>
                  <div className="text-sm font-medium text-crm-text">
                    {property.bathrooms}
                  </div>
                </div>
              </div>
            )}

            {property.parking && (
              <div className="flex items-center gap-3 rounded-md border border-crm-border bg-crm-surface p-3">
                <FaCar className="text-gray-600 text-lg" />
                <div>
                  <div className="text-xs text-crm-muted">Parking</div>
                  <div className="text-sm font-medium text-crm-text">
                    {property.parking}
                  </div>
                </div>
              </div>
            )}

            {property.furnishing && (
              <div className="flex items-center gap-3 rounded-md border border-crm-border bg-crm-surface p-3">
                <FaCouch className="text-pink-500 text-lg" />
                <div>
                  <div className="text-xs text-crm-muted">Furnishing</div>
                  <div className="text-sm font-medium text-crm-text">
                    {property.furnishing}
                  </div>
                </div>
              </div>
            )}

            {(property.floorNumber || property.totalFloors) && (
              <div className="flex items-center gap-3 rounded-md border border-crm-border bg-crm-surface p-3">
                <FaLayerGroup className="text-indigo-600 text-lg" />
                <div>
                  <div className="text-xs text-crm-muted">Floor</div>
                  <div className="text-sm font-medium text-crm-text">
                    {property.floorNumber || '-'} / {property.totalFloors || '-'}
                  </div>
                </div>
              </div>
            )}

            {property.facing && (
              <div className="flex items-center gap-3 rounded-md border border-crm-border bg-crm-surface p-3">
                <FaCompass className="text-teal-500 text-lg" />
                <div>
                  <div className="text-xs text-crm-muted">Facing</div>
                  <div className="text-sm font-medium text-crm-text">
                    {property.facing}
                  </div>
                </div>
              </div>
            )}

            {property.propertyAge && (
              <div className="flex items-center gap-3 rounded-md border border-crm-border bg-crm-surface p-3">
                <FaHourglassHalf className="text-yellow-600 text-lg" />
                <div>
                  <div className="text-xs text-crm-muted">Property Age</div>
                  <div className="text-sm font-medium text-crm-text">
                    {property.propertyAge}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* DESCRIPTION */}
      <Card className="bg-white">
        <div className="p-4">
          <div className="text-sm font-semibold text-crm-text">
            Description
          </div>
          <div className="mt-2 text-sm text-crm-muted">
            {property.description}
          </div>
        </div>
      </Card>

      {/* ENQUIRY MODAL */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Enquiry"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmitEnquiry}>
              Submit
            </Button>
          </div>
        }
      >
        <form className="space-y-3">
          <Input
            label="Name"
            value={enquiry.name}
            onChange={(e) =>
              setEnquiry({ ...enquiry, name: e.target.value })
            }
          />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Input
              label="Phone"
              value={enquiry.phone}
              onChange={(e) =>
                setEnquiry({ ...enquiry, phone: e.target.value })
              }
            />
            <Input
              label="Email"
              type="email"
              value={enquiry.email}
              onChange={(e) =>
                setEnquiry({ ...enquiry, email: e.target.value })
              }
            />
          </div>
          <label className="block">
            <div className="mb-1 text-sm font-medium text-crm-text">
              Message
            </div>
            <textarea
              className="w-full rounded-md border border-crm-border bg-white px-3 py-2 text-sm text-crm-text outline-none"
              rows={4}
              value={enquiry.message}
              onChange={(e) =>
                setEnquiry({ ...enquiry, message: e.target.value })
              }
            />
          </label>
        </form>
      </Modal>
    </div>
  )
}

export default PropertyDetails
