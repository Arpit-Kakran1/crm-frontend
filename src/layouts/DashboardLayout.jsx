import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'
import Drawer from '../components/ui/Drawer.jsx'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-crm-bg">
      <div className="flex">
        <div className="hidden lg:block w-72 border-r border-crm-border bg-crm-nav">
          <Sidebar />
        </div>

        <Drawer
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          title="Menu"
        >
          <Sidebar />
        </Drawer>

        <div className="flex-1 min-w-0">
          <Topbar title="Admin Dashboard" onMenuClick={() => setSidebarOpen(true)} />
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
