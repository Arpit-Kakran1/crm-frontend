import { toast } from 'react-toastify'
import api from '../../utils/api.js'

import Card from '../../components/ui/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import Input from '../../components/ui/Input.jsx'

const AdminSettings = () => {
  /* ---------------- LOGOUT ---------------- */
  const handleLogout = async () => {
    try {
      await api.post('/api/auth/logout')
      localStorage.removeItem('accessToken')
      toast.success('Logged out successfully')
      window.location.href = '/admin/login'
    } catch (err) {
      toast.error('Logout failed')
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* HEADER */}
      <div>
        <div className="text-sm font-semibold text-crm-text">
          Admin Settings
        </div>
        <div className="text-sm text-crm-muted">
          Account & session management
        </div>
      </div>

      {/* PROFILE */}
      <Card className="bg-white p-5 space-y-3">
        <div className="text-sm font-semibold text-crm-text">
          Profile
        </div>

        <Input label="Role" value="Administrator" disabled />
        <Input label="Access Level" value="Full Access" disabled />
      </Card>

      {/* LOGOUT */}
      <Card className="bg-white p-5 border border-red-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-red-600">
              Logout
            </div>
            <div className="text-xs text-crm-muted">
              End your current admin session
            </div>
          </div>

          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default AdminSettings
