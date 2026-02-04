import Card from '../../components/ui/Card.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'

export default function AdminReports() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm font-semibold text-crm-text">Reports</div>
        <div className="text-sm text-crm-muted">
          Analytics and reporting features
        </div>
      </div>

      <Card className="bg-white">
        <div className="p-4">
          <EmptyState
            title="Reports coming soon"
            description="Reporting features will be available here."
          />
        </div>
      </Card>
    </div>
  )
}
