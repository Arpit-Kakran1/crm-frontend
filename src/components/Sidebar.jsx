// import { NavLink, useNavigate } from 'react-router-dom'
// import {
//   FiBarChart2,
//   FiHome,
//   FiInbox,
//   FiLayers,
//   FiLogOut,
//   FiSettings,
// } from 'react-icons/fi'
// import { serverUrl } from '../utils/serverUrl'
// const navItems = [
//   { to: '/admin', label: 'Dashboard', icon: FiBarChart2 },
//   { to: '/admin/properties', label: 'Properties', icon: FiHome },
//   { to: '/admin/enquiries', label: 'Enquiries', icon: FiInbox },
//   { to: '/admin/leads', label: 'Leads', icon: FiLayers },
//   { to: '/admin/reports', label: 'Reports', icon: FiBarChart2 },
//   { to: '/admin/settings', label: 'Settings', icon: FiSettings },
// ]

// export default Sidebar = () => {
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(false)
//   const onLogout = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post(`${serverUrl}/api/auth/logout`, {}, { withCredentials: true });
//       console.log(res, "this is the logout response");
//       setLoading(false)
//       navigate("/");
//     } catch (error) {
//       console.log(error, "this is loguout error")
//     }
//   }
//   return (
//     <aside className="flex h-full flex-col bg-crm-nav text-white">
//       <div className="flex items-center gap-2 px-4 py-4 border-b border-white/10">
//         <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 border border-white/10 shadow-soft">
//           <FiHome className="text-white" />
//         </span>
//         {!compact && (
//           <div className="leading-tight">
//             <div className="font-semibold text-white">Admin CRM</div>
//             <div className="text-xs text-white/70">Real Estate</div>
//           </div>
//         )}
//       </div>

//       <nav className="flex-1 p-2">
//         {navItems.map((item) => {
//           const Icon = item.icon
//           return (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               className={({ isActive }) =>
//                 cx(
//                   'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium border',
//                   isActive
//                     ? 'bg-[#2563EB]/20 text-white border-[#2563EB]/40'
//                     : 'bg-transparent text-white/80 border-transparent hover:border-white/10 hover:bg-white/5',
//                 )
//               }
//             >
//               <Icon />
//               {!compact && <span>{item.label}</span>}
//             </NavLink>
//           )
//         })}
//       </nav>

//       <div className="p-2 border-t border-white/10">
//         <button
//           onClick={onLogout}
//           className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium border border-white/10 bg-transparent text-crm-danger hover:bg-[#EF4444]/10"
//         >
//           <FiLogOut />
//           <span className='px-2 py-1'>Logout</span>
//         </button>
//       </div>
//     </aside>
//   )
// }

import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {
  FiBarChart2,
  FiHome,
  FiInbox,
  FiLayers,
  FiLogOut,
  FiSettings,
} from 'react-icons/fi'

import { serverUrl } from '../utils/serverUrl.js'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: FiBarChart2 },
  { to: '/admin/properties', label: 'Properties', icon: FiHome },
  { to: '/admin/enquiries', label: 'Enquiries', icon: FiInbox },
  { to: '/admin/leads', label: 'Leads', icon: FiLayers },
  { to: '/admin/reports', label: 'Reports', icon: FiBarChart2 },
  { to: '/admin/settings', label: 'Settings', icon: FiSettings },
]

export default function Sidebar({ compact = false }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true);
    try {
      await api.post('/api/auth/logout')
      localStorage.removeItem('accessToken')
      toast.success('Logged out successfully')
      window.location.href = '/admin/login'
    } catch (err) {
      setLoading(false);
      toast.error('Logout failed')
    }
  }

  return (
    <aside className="flex h-full flex-col bg-crm-nav text-white">
      <div className="flex items-center gap-2 px-4 py-4 border-b border-white/10">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 border border-white/10 shadow-soft">
          <FiHome className="text-white" />
        </span>

        {!compact && (
          <div className="leading-tight">
            <div className="font-semibold text-white">Admin CRM</div>
            <div className="text-xs text-white/70">Real Estate</div>
          </div>
        )}
      </div>

      <nav className="flex-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium border ${isActive
                  ? 'bg-[#2563EB]/20 text-white border-[#2563EB]/40'
                  : 'bg-transparent text-white/80 border-transparent hover:border-white/10 hover:bg-white/5'
                }`
              }
            >
              <Icon />
              {!compact && <span>{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      <div className="p-2 border-t border-white/10">
        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium border border-white/10 bg-transparent text-crm-danger hover:bg-[#EF4444]/10 disabled:opacity-50"
        >
          <FiLogOut />
          {!compact && <span className="px-2 py-1">Logout</span>}
        </button>
      </div>
    </aside>
  )
}
