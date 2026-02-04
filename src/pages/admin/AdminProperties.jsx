import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../../components/ui/Card.jsx'
import Table from '../../components/ui/Table.jsx'
import Button from '../../components/ui/Button.jsx'
import Input from '../../components/ui/Input.jsx'
import Select from '../../components/ui/Select.jsx'
import Modal from '../../components/ui/Modal.jsx'
import Badge from '../../components/ui/Badge.jsx'
import {
  FaHome,
  FaClock,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaBed,
  FaBath,
  FaCar,
  FaRulerCombined,
  FaBuilding,
  FaCompass,
  FaLayerGroup,
  FaCouch,
  FaImages,
  FaRegCalendarAlt
} from 'react-icons/fa'

import { serverUrl } from '../../utils/serverUrl.js'
import { toast } from 'react-toastify'

function badgeColorForStatus(status) {
  if (status === 'Available') return 'green'
  if (status === 'Booked') return 'amber'
  if (status === 'Sold' || status === 'Rented') return 'red'
  return 'default'
}
const AdminProperties = () => {

  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [imageFile, setImageFile] = useState([])

  const [properties, setProperties] = useState([])
  const [fetching, setFetching] = useState(true)

  const [editOpen, setEditOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)

  const [form, setForm] = useState({
    title: '',
    location: '',
    price: '',
    propertyType: '',
    status: '',
    description: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    balconies: '',
    parking: '',
    furnishing: '',
    floorNumber: '',
    totalFloors: '',
    facing: '',
    propertyAge: '',
  })


  const fetchProperties = async () => {
    try {
      setFetching(true);
      const res = await axios.get(
        `${serverUrl}/api/properties/getproperty`,
        { withCredentials: true }
      )
      console.log(res);
      setProperties(res.data.data || [])
    } catch (err) {
      console.error('Failed to fetch properties', err)
    } finally {
      setFetching(false)
    }
  }

  /* ---------------- IMAGE UPLOAD ---------------- */

  const uploadImageToCloudinary = async () => {
    if (!imageFile || imageFile.length === 0) return []

    const uploadedUrls = []

    for (const file of imageFile) {
      const formData = new FormData()
      formData.append('image', file)

      const res = await axios.post(
        `${serverUrl}/api/upload/image`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      console.log(res, "this is the result from the upload to the cloudinary")
      uploadedUrls.push(res.data.data.url)
    }

    return uploadedUrls
  }


  /* ---------------- CREATE PROPERTY ---------------- */
  const handleAddProperty = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(form)
    try {
      // 1️⃣ upload image
      const imageUrl = await uploadImageToCloudinary()
      console.log(imageUrl, "this is the image url from the addProperty")
      // 2️⃣ create property
      const res = await axios.post(
        `${serverUrl}/api/properties/createproperty`,
        {
          title: form.title,
          location: form.location,
          price: Number(form.price),
          propertyType: form.propertyType,
          status: form.status,
          description: form.description,
          images: imageUrl,
          size: form.size,
          bedrooms: form.bedrooms,
          bathrooms: form.bathrooms,
          parking: form.parking,
          furnished: form.furnished,
          floor: form.floor,
          totalFloors: form.totalFloors,
          facing: form.facing,
        },
        { withCredentials: true }
      )


      fetchProperties();
      // reset
      setForm({
        title: '',
        location: '',
        price: '',
        propertyType: 'Flat',
        status: 'Available',
        description: '',
      })

      setImageFile([])
      setOpen(false)
      toast.success('Property created successfully 🏡')
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Failed to create property'
      )
    } finally {
      setLoading(false)
    }
  }

  //Fetching properties
  useEffect(() => {
    fetchProperties()
  }, [])

  //Edit property

  const handleEditProperty = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let uploadedImages = []

      // ✅ SAFE image check
      if (Array.isArray(imageFile) && imageFile.length > 0) {
        uploadedImages = await uploadImageToCloudinary()
      }

      const payload = {
        title: form.title,
        location: form.location,
        price: Number(form.price),
        propertyType: form.propertyType,
        status: form.status,
        description: form.description,

        // ✅ BACKEND-CORRECT FIELD NAMES
        area: form.area,
        bedrooms: form.bedrooms,
        bathrooms: form.bathrooms,
        parking: form.parking,
        furnishing: form.furnishing,
        floorNumber: form.floorNumber,
        totalFloors: form.totalFloors,
        facing: form.facing,
        propertyAge: form.propertyAge,
      }

      // ✅ Only attach images if uploaded
      if (uploadedImages.length > 0) {
        payload.images = uploadedImages
      }

      const res = await axios.put(
        `${serverUrl}/api/properties/updateproperty/${selectedProperty._id}`,
        payload,
        { withCredentials: true }
      )

      console.log('Property updated:', res.data)

      await fetchProperties()
      setEditOpen(false)
      setSelectedProperty(null)
      setImageFile([])
      toast.success('Property Edited successfully 🏡')

    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Failed to create property'
      )
    } finally {
      setLoading(false)
    }
  }

  //Delete property
  const handleDeleteProperty = async () => {
    if (!selectedProperty?._id) return;

    try {
      setLoading(true);

      await axios.delete(
        `${serverUrl}/api/properties/deleteproperty/${selectedProperty._id}`,
        { withCredentials: true }
      );

      setDeleteOpen(false);
      setSelectedProperty(null);
      fetchProperties(); // refresh list
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-crm-text">
            Properties management
          </div>
          <div className="text-sm text-crm-muted">
            Add, edit, delete properties
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Input
            label="Search"
            placeholder="Title, location, status..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className="pt-6">
            <Button
              variant="primary"
              onClick={() => {
                setForm({
                  title: '',
                  location: '',
                  price: '',
                  propertyType: '',
                  status: '',
                  description: '',
                })
                setImageFile(null)
                setSelectedProperty(null)
                setOpen(true)
              }}
            >
              Add Property
            </Button>

          </div>
        </div>
      </div>

      {/* TABLE */}
      <Card className="bg-white">
        <div className="p-4">
          <Table>
            <thead>
              <tr className="text-left text-xs text-crm-muted">
                {['Title', 'Location', 'Type', 'Status', 'Price', 'Actions'].map(
                  (h) => (
                    <th
                      key={h}
                      className="border-b border-crm-border bg-crm-bg px-3 py-2 font-medium"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {fetching ? (
                <tr>
                  <td colSpan="6" className="px-3 py-6 text-center text-sm text-crm-muted">
                    Loading properties...
                  </td>
                </tr>
              ) : properties.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-3 py-6 text-center text-sm text-crm-muted">
                    No properties found
                  </td>
                </tr>
              ) : (
                properties.map((p) => (
                  <tr key={p._id} className="text-sm hover:bg-crm-bg">
                    <td className="border-b border-crm-border px-3 py-2">
                      <div className="font-medium text-crm-text">{p.title}</div>
                      <div className="text-xs text-crm-muted">{p._id}</div>
                    </td>

                    <td className="border-b border-crm-border px-3 py-2 text-crm-muted">
                      {p.location}
                    </td>

                    <td className="border-b border-crm-border px-3 py-2 text-crm-muted">
                      {p.propertyType}
                    </td>

                    <td className="border-b border-crm-border px-3 py-2">
                      <Badge color={badgeColorForStatus(p.status)}>
                        {p.status}
                      </Badge>
                    </td>

                    <td className="border-b border-crm-border px-3 py-2 text-crm-text">
                      ₹ {Number(p.price).toLocaleString('en-IN')}
                    </td>

                    <td className="border-b border-crm-border px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setSelectedProperty(p)
                            setForm({
                              title: p.title || '',
                              location: p.location || '',
                              price: p.price || '',
                              propertyType: p.propertyType || '',
                              status: p.status || '',
                              description: p.description || '',

                              size: p.size || '',
                              bedrooms: p.bedrooms || '',
                              bathrooms: p.bathrooms || '',
                              parking: p.parking || '',
                              furnished: p.furnished || '',
                              floor: p.floor || '',
                              totalFloors: p.totalFloors || '',
                              facing: p.facing || '',
                              propertyAge: p.propertyAge || '',
                            })
                            setImageFile([]) // reset new uploads
                            setEditOpen(true)
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            setSelectedProperty(p)
                            setDeleteOpen(true)
                          }}
                        >
                          Delete
                        </Button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </Table>
        </div>
      </Card>

      {/* CREATE MODAL */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add property"
        size="lg"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddProperty}
              disabled={loading}
            >
              {loading ? 'Saving…' : 'Save'}
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          {/* BASIC DETAILS */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaHome className="text-blue-500" />
                  Title
                </span>
              }
              name="title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  Location
                </span>
              }
              name="location"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />

            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaRupeeSign className="text-green-600" />
                  Price (₹)
                </span>
              }
              name="price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            {/* PROPERTY TYPE */}
            <label className="block">
              <div className="mb-1 flex items-center gap-2 text-sm font-medium text-crm-text">
                <FaBuilding className="text-indigo-500" />
                Property Type
              </div>
              <select
                className="w-full rounded-md border border-crm-border bg-white px-3 py-2 text-sm"
                value={form.propertyType}
                onChange={(e) =>
                  setForm({ ...form, propertyType: e.target.value })
                }
              >
                <option value="">Select type</option>
                <option value="Flat">Flat</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </label>

            {/* STATUS */}
            <label className="block">
              <div className="mb-1 flex items-center gap-2 text-sm font-medium text-crm-text">
                <FaLayerGroup className="text-purple-500" />
                Status
              </div>
              <select
                className="w-full rounded-md border border-crm-border bg-white px-3 py-2 text-sm"
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <option value="">Select status</option>
                <option value="Available">Available</option>
                <option value="Rented">Rented</option>
                <option value="Sold">Sold</option>
              </select>
            </label>
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaRulerCombined className="text-orange-500" />
                  Size (sqft)
                </span>
              }
              value={form.size || ''}
              onChange={(e) =>
                setForm({ ...form, size: e.target.value })
              }
            />

            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaBed className="text-blue-600" />
                  Bedrooms
                </span>
              }
              value={form.bedrooms || ''}
              onChange={(e) =>
                setForm({ ...form, bedrooms: e.target.value })
              }
            />

            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaBath className="text-cyan-500" />
                  Bathrooms
                </span>
              }
              value={form.bathrooms || ''}
              onChange={(e) =>
                setForm({ ...form, bathrooms: e.target.value })
              }
            />

            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaCar className="text-gray-600" />
                  Parking
                </span>
              }
              value={form.parking || ''}
              onChange={(e) =>
                setForm({ ...form, parking: e.target.value })
              }
            />

            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaCouch className="text-pink-500" />
                  Furnished
                </span>
              }
              value={form.furnished || ''}
              onChange={(e) =>
                setForm({ ...form, furnished: e.target.value })
              }
            />

            <label className="block">
              <div className="mb-1 flex items-center gap-2 text-sm font-medium text-crm-text">
                <FaCompass className="text-teal-500" />
                Facing
              </div>

              <select
                className="w-full rounded-md border border-crm-border bg-white px-3 py-2 text-sm outline-none"
                value={form.facing || ''}
                onChange={(e) =>
                  setForm({ ...form, facing: e.target.value })
                }
              >
                <option value="">Select facing</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="North-East">North-East</option>
                <option value="North-West">North-West</option>
                <option value="South-East">South-East</option>
                <option value="South-West">South-West</option>
              </select>
            </label>

            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaLayerGroup className="text-indigo-600" />
                  Floor
                </span>
              }
              value={form.floor || ''}
              onChange={(e) =>
                setForm({ ...form, floor: e.target.value })
              }
            />

            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaBuilding className="text-gray-700" />
                  Total Floors
                </span>
              }
              value={form.totalFloors || ''}
              onChange={(e) =>
                setForm({ ...form, totalFloors: e.target.value })
              }
            />
            <label className="block">
              <div className="mb-1 flex items-center gap-2 text-sm font-medium text-crm-text">
                <FaRegCalendarAlt className="text-amber-500" />
                Property Age
              </div>

              <select
                className="w-full rounded-md border border-crm-border bg-white px-3 py-2 text-sm outline-none"
                value={form.propertyAge || ''}
                onChange={(e) =>
                  setForm({ ...form, propertyAge: e.target.value })
                }
              >
                <option value="">Select property age</option>
                <option value="New Construction">New Construction</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5-10 years">5-10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </label>

          </div>

          {/* DESCRIPTION */}
          <label className="block">
            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-crm-text">
              <FaHome className="text-blue-500" />
              Description
            </div>
            <textarea
              className="w-full rounded-md border border-crm-border bg-white px-3 py-2 text-sm"
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </label>

          {/* MULTIPLE IMAGE UPLOAD */}
          <label className="block">
            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-crm-text">
              <FaImages className="text-purple-600" />
              Property Images
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setImageFile(Array.from(e.target.files))
              }
            />
          </label>
        </form>
      </Modal>

      {/* EDIT MODAL */}
      {/* <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit property"
        size="lg"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleEditProperty}
              disabled={loading}
            >
              {loading ? 'Updating…' : 'Update'}
            </Button>
          </div>
        }
      >
        <form className="space-y-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />
            <Input
              label="Location"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />
            <Input
              label="Price (₹)"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />
            <Select
              label="Type"
              value={form.propertyType}
              onChange={(e) =>
                setForm({ ...form, propertyType: e.target.value })
              }
              options={[
                { value: 'Flat', label: 'Flat' },
                { value: 'Apartment', label: 'Apartment' },
                { value: 'House', label: 'House' },
                { value: 'Villa', label: 'Villa' },
                { value: 'Plot', label: 'Plot' },
                { value: 'Commercial', label: 'Commercial' },
              ]}
            />
            <Select
              label="Status"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
              options={[
                { value: 'Available', label: 'Available' },
                { value: 'Booked', label: 'Booked' },
                { value: 'Sold', label: 'Sold' },
              ]}
            />
          </div>

          <label className="block">
            <div className="mb-1 text-sm font-medium text-crm-text">
              Description
            </div>
            <textarea
              className="w-full rounded-md border border-crm-border bg-white px-3 py-2 text-sm text-crm-text outline-none"
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </form>
      </Modal> */}
      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit property"
        size="lg"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleEditProperty}
              disabled={loading}
            >
              {loading ? 'Updating…' : 'Update'}
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          {/* BASIC DETAILS */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaHome className="text-blue-500" />
                  Title
                </span>
              }
              value={form.title || ''}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  Location
                </span>
              }
              value={form.location || ''}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />

            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaRupeeSign className="text-green-600" />
                  Price (₹)
                </span>
              }
              value={form.price || ''}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            {/* PROPERTY TYPE */}
            <label className="block">
              <div className="mb-1 flex items-center gap-2 text-sm font-medium text-crm-text">
                <FaBuilding className="text-indigo-500" />
                Property Type
              </div>
              <select
                className="w-full rounded-md border border-crm-border bg-white px-3 py-2 text-sm"
                value={form.propertyType || ''}
                onChange={(e) =>
                  setForm({ ...form, propertyType: e.target.value })
                }
              >
                <option value="">Select type</option>
                <option value="Flat">Flat</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </label>

            {/* STATUS */}
            <label className="block">
              <div className="mb-1 flex items-center gap-2 text-sm font-medium text-crm-text">
                <FaLayerGroup className="text-purple-500" />
                Status
              </div>
              <select
                className="w-full rounded-md border border-crm-border bg-white px-3 py-2 text-sm"
                value={form.status || ''}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <option value="">Select status</option>
                <option value="Available">Available</option>
                <option value="Rented">Rented</option>
                <option value="Sold">Sold</option>
              </select>
            </label>
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaRulerCombined className="text-orange-500" />
                  Size (sqft)
                </span>
              }
              value={form.area || ''}
              onChange={(e) =>
                setForm({ ...form, area: e.target.value })
              }
            />

            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaBed className="text-blue-600" />
                  Bedrooms
                </span>
              }
              value={form.bedrooms || ''}
              onChange={(e) =>
                setForm({ ...form, bedrooms: e.target.value })
              }
            />

            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaBath className="text-cyan-500" />
                  Bathrooms
                </span>
              }
              value={form.bathrooms || ''}
              onChange={(e) =>
                setForm({ ...form, bathrooms: e.target.value })
              }
            />

            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaCar className="text-gray-600" />
                  Parking
                </span>
              }
              value={form.parking || ''}
              onChange={(e) =>
                setForm({ ...form, parking: e.target.value })
              }
            />

            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaCouch className="text-pink-500" />
                  Furnishing
                </span>
              }
              value={form.furnishing || ''}
              onChange={(e) =>
                setForm({ ...form, furnishing: e.target.value })
              }
            />

            {/* FACING (ENUM SAFE) */}
            <label className="block">
              <div className="mb-1 flex items-center gap-2 text-sm font-medium text-crm-text">
                <FaCompass className="text-teal-500" />
                Facing
              </div>
              <select
                className="w-full rounded-md border border-crm-border bg-white px-3 py-2 text-sm"
                value={form.facing || ''}
                onChange={(e) =>
                  setForm({ ...form, facing: e.target.value })
                }
              >
                <option value="">Select facing</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North-East">North-East</option>
                <option value="North-West">North-West</option>
                <option value="South-East">South-East</option>
                <option value="South-West">South-West</option>
              </select>
            </label>

            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaLayerGroup className="text-indigo-600" />
                  Floor
                </span>
              }
              value={form.floorNumber || ''}
              onChange={(e) =>
                setForm({ ...form, floorNumber: e.target.value })
              }
            />

            <Input
              label={
                <span className="flex items-center gap-2">
                  <FaBuilding className="text-gray-700" />
                  Total Floors
                </span>
              }
              value={form.totalFloors || ''}
              onChange={(e) =>
                setForm({ ...form, totalFloors: e.target.value })
              }
            />
            <label className="block">
              <div className="mb-1 flex items-center gap-2 text-sm font-medium text-crm-text">
                <FaClock className="text-amber-500" />
                Property Age
              </div>
              <select
                className="w-full rounded-md border border-crm-border bg-white px-3 py-2 text-sm"
                value={form.propertyAge || ''}
                onChange={(e) =>
                  setForm({ ...form, propertyAge: e.target.value })
                }
              >
                <option value="">Select property age</option>
                <option value="New Construction">New Construction</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5-10 years">5-10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </label>

          </div>

          {/* DESCRIPTION */}
          <label className="block">
            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-crm-text">
              <FaHome className="text-blue-500" />
              Description
            </div>
            <textarea
              className="w-full rounded-md border border-crm-border bg-white px-3 py-2 text-sm"
              rows={4}
              value={form.description || ''}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </label>

          {/* IMAGE UPDATE (OPTIONAL) */}
          <label className="block">
            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-crm-text">
              <FaImages className="text-purple-600" />
              Update Images (optional)
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setImageFile(Array.from(e.target.files))
              }
            />
          </label>
        </form>
      </Modal>


      {/* DELETE MODAL (UI ONLY) */}
      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete property?"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteProperty}
              disabled={loading}
            >
              {loading ? 'Deleting…' : 'Delete'}
            </Button>
          </div>
        }
      >
        <div className="text-sm text-crm-muted">
          This action can’t be undone. The property will be permanently removed.
        </div>
      </Modal>

    </div>
  )
}
export default AdminProperties
