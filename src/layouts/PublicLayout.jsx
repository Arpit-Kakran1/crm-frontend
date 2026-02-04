import { NavLink, Outlet } from 'react-router-dom'
import { FiHome, FiSearch } from 'react-icons/fi'
import Footer from '../pages/Footer.jsx'
const cx = (...classes) => classes.filter(Boolean).join(' ')

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-crm-bg flex flex-col">
      <header className="sticky top-0 z-20 border-b border-gray-200 
                   bg-gray-200 backdrop-blur-md
                   transition-all duration-300">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">


          <NavLink
            to="/"
            className="group flex items-center gap-3"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl
        bg-gray-100 border border-gray-200
        transition-all duration-300
        group-hover:bg-gray-200"
            >
              <FiHome className="text-gray-700 text-lg" />
            </span>

            <div className="leading-tight">

              <div className="text-sm font-semibold tracking-wide text-gray-800">
                Find Your Dream Property
              </div>


              <div className="hidden sm:block text-xs text-gray-500">
                Discover • Enquire • Close Deals Faster
              </div>
            </div>
          </NavLink>

          <nav className="flex items-center gap-3">
            <NavLink
              to="/properties"
              className={({ isActive }) =>
                cx(
                  'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium border transition-all',
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                )
              }
            >
              <FiSearch />
              Explore Properties
            </NavLink>


            <NavLink
              to="/contact"
              className="
          inline-flex items-center rounded-md px-3 py-2 text-sm font-medium
          bg-blue-600 text-white
          transition-all duration-300
          hover:bg-blue-700
        "
            >
              Contact Us
            </NavLink>
          </nav>
        </div>
      </header>


      {/* CONTENT */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}

export default PublicLayout
