import { FiMenu, FiSearch } from 'react-icons/fi'

export default function Topbar({ title, right, onMenuClick }) {
  return (
    <div className="sticky top-0 z-10 border-b border-white/10 bg-crm-nav">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10 lg:hidden"
            onClick={onMenuClick}
            aria-label="Toggle sidebar"
          >
            <FiMenu />
          </button>
          <div>
            <div className="text-sm font-semibold text-white">{title}</div>
            <div className="text-xs text-white/70">
              Professional CRM dashboard
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">
          <FiSearch />
          <span>Search (placeholder)</span>
        </div>

        <div className="flex items-center gap-2">{right}</div>
      </div>
    </div>
  )
}
