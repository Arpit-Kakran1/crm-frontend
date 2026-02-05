import { useEffect, useMemo, useState } from 'react'
import api from '../../utils/api.js'
import Card from '../../components/ui/Card.jsx'
import Table from '../../components/ui/Table.jsx'
import Input from '../../components/ui/Input.jsx'
import Button from '../../components/ui/Button.jsx'
import Drawer from '../../components/ui/Drawer.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import * as XLSX from "xlsx";

import { serverUrl } from '../../utils/serverUrl.js'

const AdminEnquiries = () => {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [enquiries, setEnquiries] = useState([])
  const [selectedEnquiry, setSelectedEnquiry] = useState(null)

  /* ---------------- FETCH ENQUIRIES ---------------- */
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await api.get('/api/enquiries')
        setEnquiries(res.data.data || [])
      } catch (err) {
        console.error('Failed to fetch enquiries', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEnquiries()
  }, [])


  /* ---------------- SEARCH FILTER ---------------- */
  const filteredEnquiries = useMemo(() => {
    if (!q) return enquiries

    return enquiries.filter((e) => {
      const property = e.propertyId?.title || ''
      const name = e.name || ''
      const phone = e.phone || ''

      return (
        property.toLowerCase().includes(q.toLowerCase()) ||
        name.toLowerCase().includes(q.toLowerCase()) ||
        String(phone).includes(q)
      )
    })
  }, [q, enquiries])


  /* ---------------- DOWNLOAD CSV (NEW) ---------------- */
  const downloadExcel = () => {
    if (!filteredEnquiries || filteredEnquiries.length === 0) return;

    // 1️⃣ Prepare clean data
    const data = filteredEnquiries.map((e, index) => ({
      "S.No": index + 1,
      "Date": new Date(e.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      "Property": e.propertyId?.title || "-",
      "Name": e.name || "-",
      "Phone": e.phone ? `${e.phone}` : "-",
      "Email": e.email || "-",
      "Message": e.message?.replace(/\n|\r/g, " ") || "-"
    }));


    const worksheet = XLSX.utils.json_to_sheet(data);

    worksheet["!cols"] = [
      { wch: 6 },
      { wch: 14 },
      { wch: 32 },
      { wch: 20 },
      { wch: 16 },
      { wch: 30 },
      { wch: 50 },
    ];


    worksheet["!freeze"] = { ySplit: 1 };


    worksheet["!autofilter"] = {
      ref: `A1:G${data.length + 1}`
    };

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");


    XLSX.writeFile(
      workbook,
      `Enquiries_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };


  return (
    <div className="space-y-4">

      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-crm-text">
            Enquiries
          </div>
          <div className="text-sm text-crm-muted">
            View enquiry submissions from public property pages
          </div>
        </div>

        <div className="flex items-end gap-2">
          <Input
            label="Search"
            placeholder="Property, name, phone..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <div className="pt-6">
            <Button
              variant="secondary"
              onClick={downloadExcel}
              disabled={filteredEnquiries.length === 0}
              className="cursor-pointer"
            >
              Download Excel
            </Button>

          </div>
        </div>
      </div>

      {/* TABLE */}
      <Card className="bg-white">
        <div className="p-4">
          {loading ? (
            <div className="text-sm text-crm-muted">
              Loading enquiries…
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <EmptyState
              title="No enquiries found"
              description="No enquiries match your search."
            />
          ) : (
            <Table>
              <thead>
                <tr className="text-left text-xs text-crm-muted">
                  {['Date', 'Property', 'Name', 'Phone', 'Actions'].map(
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
                {filteredEnquiries.map((e) => (
                  <tr
                    key={e._id}
                    className="text-sm hover:bg-crm-bg"
                  >
                    <td className="border-b border-crm-border px-3 py-2 text-crm-muted">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>

                    <td className="border-b border-crm-border px-3 py-2 text-crm-text">
                      {e.propertyId?.title || '—'}
                    </td>

                    <td className="border-b border-crm-border px-3 py-2 text-crm-text">
                      {e.name}
                    </td>

                    <td className="border-b border-crm-border px-3 py-2 text-crm-muted">
                      {e.phone}
                    </td>

                    <td className="border-b border-crm-border px-3 py-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSelectedEnquiry(e)
                          setOpen(true)
                        }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Card>

      {/* DRAWER */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Enquiry details"
        footer={
          <div className="flex justify-end">
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        }
      >
        {selectedEnquiry && (
          <div className="space-y-3 text-sm">
            <div className="rounded-md border border-crm-border bg-crm-surface p-3">
              <div className="text-xs text-crm-muted">Property</div>
              <div className="font-medium text-crm-text">
                {selectedEnquiry.propertyId?.title}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-md border border-crm-border bg-white p-3">
                <div className="text-xs text-crm-muted">Name</div>
                <div className="font-medium text-crm-text">
                  {selectedEnquiry.name}
                </div>
              </div>

              <div className="rounded-md border border-crm-border bg-white p-3">
                <div className="text-xs text-crm-muted">Phone</div>
                <div className="font-medium text-crm-text">
                  {selectedEnquiry.phone}
                </div>
              </div>

              <div className="rounded-md border border-crm-border bg-white p-3 md:col-span-2">
                <div className="text-xs text-crm-muted">Email</div>
                <div className="font-medium text-crm-text">
                  {selectedEnquiry.email}
                </div>
              </div>
            </div>

            <div className="rounded-md border border-crm-border bg-white p-3">
              <div className="text-xs text-crm-muted">Message</div>
              <div className="mt-1 text-crm-text">
                {selectedEnquiry.message}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}

export default AdminEnquiries
