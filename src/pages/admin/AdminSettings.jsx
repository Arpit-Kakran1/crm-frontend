import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card.jsx'
import Button from '../../components/ui/Button.jsx'

export default function AdminSettings() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const onLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div className="space-y-4">
      <Card className="bg-white">
        <div className="p-6">
          <div className="text-sm font-semibold text-crm-text">Profile</div>
          <div className="mt-2 text-sm text-crm-muted">
            Signed in as{' '}
            <span className="font-medium text-crm-text">{user?.name}</span> (
            {user?.role})
          </div>
        </div>
      </Card>

      <Card className="bg-white">
        <div className="p-6 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-crm-text">Logout</div>
            <div className="mt-1 text-sm text-crm-muted">
              Signs out and clears your session cookie.
            </div>
          </div>
          <Button variant="danger" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </Card>
    </div>
  )
}
