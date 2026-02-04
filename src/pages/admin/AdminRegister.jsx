import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Card from '../../components/ui/Card.jsx'
import Input from '../../components/ui/Input.jsx'
import Button from '../../components/ui/Button.jsx'
import axios from 'axios'
import { serverUrl } from '../../utils/serverUrl.js'

export default function AdminRegister() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${serverUrl}/api/auth/register`, formData, { withCredentials: true });
      console.log(res);
      setLoading(false)
      navigate("/admin/login")
    } catch (error) {
      console.log(error, "this is the register error")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-crm-bg flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-4 text-center">
          <div className="text-lg font-semibold text-crm-text">
            Admin Register
          </div>
          <div className="text-sm text-crm-muted">
            Create a new admin account
          </div>
        </div>

        <Card className="bg-white">
          <form className="p-6 space-y-3" onSubmit={onSubmit}>
            <Input
              label="name"
              name="name"
              value={formData.name}
              onChange={handleFormData}
              autoComplete="name"
              required
            />
            <Input
              label="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormData}
              autoComplete="email"
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleFormData}
              autoComplete="new-password"
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creating…' : 'Register'}
            </Button>
            <div className="text-center text-sm text-crm-muted">
              already have an account
              <span className="text-blue-400 hover:text-blue-700 px-3 cursor-pointer" onClick={() => navigate("/admin/login")}>Login</span>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
