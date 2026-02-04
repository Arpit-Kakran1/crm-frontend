import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import Card from '../../components/ui/Card.jsx'
import Input from '../../components/ui/Input.jsx'
import Button from '../../components/ui/Button.jsx'

import { serverUrl } from '../../utils/serverUrl.js'

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.phone) {
      toast.error('Name and phone are required')
      return
    }

    try {
      setLoading(true)

      await axios.post(`${serverUrl}/api/enquiries/general`, form)

      toast.success('Message sent successfully')
      setForm({
        name: '',
        email: '',
        phone: '',
        message: '',
      })
    } catch (err) {
      console.error(err)
      toast.error('Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold text-crm-text">
          Contact Us
        </h1>
        <p className="text-sm text-crm-muted">
          Have a question or enquiry? Fill the form below.
        </p>
      </div>

      {/* FORM */}
      <Card className="bg-white">
        <form className="space-y-4 p-6" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <label className="block">
            <div className="mb-1 text-sm font-medium text-crm-text">
              Message
            </div>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-md border border-crm-border bg-white px-3 py-2 text-sm outline-none"
            />
          </label>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Contact
