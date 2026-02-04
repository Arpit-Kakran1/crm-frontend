import { useEffect, useMemo, useState } from 'react'
import api from '../../utils/api.js'
import Card from '../../components/ui/Card.jsx'
import Table from '../../components/ui/Table.jsx'
import Input from '../../components/ui/Input.jsx'
import Button from '../../components/ui/Button.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Modal from '../../components/ui/Modal.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'


/* ---------------- STATUS COLOR ---------------- */
const badgeColorForStatus = (status) => {
  if (status === 'NEW') return 'blue'
  if (status === 'CONTACTED') return 'amber'
  if (status === 'CLOSED') return 'green'
  if (status === 'LOST') return 'red'
  return 'default'
}

/* ---------------- COMPONENT ---------------- */
const AdminEnquiries = () => {
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [enquiries, setEnquiries] = useState([])
  const [selected, setSelected] = useState(null)
  const [open, setOpen] = useState(false)

  /* ---------------- FETCH ENQUIRIES ---------------- */
  const fetchEnquiries = async () => {
    try {
      setLoading(true)
      const res = await api.get('/api/enquiries')
      setEnquiries(res.data.data || [])
    } catch (err) {
      console.error('Failed to fetch enquiries', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEnquiries()
  }, [])

  /* ---------------- SEARCH ---------------- */
  const filtered = useMemo(() => {
    if (!q) return enquiries
    const query = q.toLowerCase()

    return enquiries.filter((e) =>
      (e.name || '').toLowerCase().includes(query) ||
      String(e.phone || '').includes(query) ||
      (e.propertyId?.title || '').toLowerCase().includes(query)
    )
  }, [q, enquiries])


  /* ---------------- UPDATE STATUS ---------------- */
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/api/enquiries/${id}`, { status })
      fetchEnquiries()
    } catch (err) {
      console.error('Status update failed', err)
    }
  }


  /* ---------------- DELETE ---------------- */
  const deleteEnquiry = async (id) => {
    if (!confirm('Delete this enquiry?')) return
    try {
      await api.delete(`/api/enquiries/${id}`)
      fetchEnquiries()
    } catch (err) {
      console.error('Delete failed', err)
    }
  }


  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-crm-text">Enquiries</div>
          <div className="text-sm text-crm-muted">
            Leads submitted from property pages
          </div>
        </div>

        <Input
          label="Search"
          placeholder="Property, name, phone..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <Card className="bg-white">
        <div className="p-4 overflow-x-auto">
          {loading ? (
            <div className="text-sm text-crm-muted">Loading enquiries…</div>
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No enquiries found"
              description="Try changing search keywords."
            />
          ) : (
            <Table>
              <thead>
                <tr className="text-left text-xs text-crm-muted">
                  {['Date', 'Property', 'Name', 'Phone', 'Status', 'Actions'].map(
                    (h) => (
                      <th
                        key={h}
                        className="border-b border-crm-border bg-crm-bg px-3 py-2 font-medium"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {filtered.map((e) => (
                  <tr
                    key={e._id}
                    className="text-sm hover:bg-crm-bg cursor-pointer"
                    onClick={() => {
                      setSelected(e)
                      setOpen(true)
                    }}
                  >
                    <td className="border-b border-crm-border px-3 py-2 text-crm-muted">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>

                    <td className="border-b border-crm-border px-3 py-2 text-crm-text">
                      {e.propertyId?.title || '—'}
                    </td>

                    <td className="border-b border-crm-border px-3 py-2">
                      {e.name}
                    </td>

                    <td className="border-b border-crm-border px-3 py-2 text-crm-muted">
                      {e.phone}
                    </td>

                    <td className="border-b border-crm-border px-3 py-2">
                      <Badge color={badgeColorForStatus(e.status)}>
                        {e.status}
                      </Badge>
                    </td>

                    <td
                      className="border-b border-crm-border px-3 py-2"
                      onClick={(ev) => ev.stopPropagation()}
                    >
                      <div className="flex flex-wrap gap-2">
                        {e.status !== 'CONTACTED' && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() =>
                              updateStatus(e._id, 'CONTACTED')
                            }
                          >
                            Contacted
                          </Button>
                        )}

                        {e.status !== 'CLOSED' && (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() =>
                              updateStatus(e._id, 'CLOSED')
                            }
                          >
                            Closed
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => deleteEnquiry(e._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Card>

      {/* DETAILS MODAL */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Enquiry details"
        size="lg"
        footer={
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        }
      >
        {selected && (
          <div className="space-y-3 text-sm">
            <div className="rounded-md border p-3">
              <div className="text-xs text-crm-muted">Property</div>
              <div className="font-medium">
                {selected.propertyId?.title}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="border p-3 rounded">
                <div className="text-xs text-crm-muted">Name</div>
                {selected.name}
              </div>
              <div className="border p-3 rounded">
                <div className="text-xs text-crm-muted">Phone</div>
                {selected.phone}
              </div>
              <div className="border p-3 rounded md:col-span-2">
                <div className="text-xs text-crm-muted">Email</div>
                {selected.email}
              </div>
            </div>

            <div className="border p-3 rounded">
              <div className="text-xs text-crm-muted">Message</div>
              {selected.message}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default AdminEnquiries
