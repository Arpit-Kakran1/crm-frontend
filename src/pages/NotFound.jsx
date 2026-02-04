import { Link } from 'react-router-dom'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-crm-bg flex items-center justify-center px-4">
      <Card className="bg-white max-w-md w-full">
        <div className="p-6 text-center">
          <div className="text-2xl font-semibold text-crm-text">404</div>
          <div className="mt-2 text-sm text-crm-muted">
            Page not found
          </div>
          <div className="mt-4">
            <Link to="/">
              <Button variant="primary">Go Home</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
