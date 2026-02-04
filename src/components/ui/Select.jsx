import React from 'react'

export default function Select({
  label,
  hint,
  error,
  options = [],
  className = '',
  ...props
}) {
  const base =
    'w-full rounded-md border bg-white px-3 py-2 text-sm text-crm-text outline-none focus:border-crm-primary focus:ring-2 focus:ring-[#2563EB]/20'

  const errorClasses = error
    ? 'border-[#EF4444]/40 focus:border-crm-danger focus:ring-[#EF4444]/20'
    : 'border-crm-border'

  return (
    <label className="block">
      {label && (
        <div className="mb-1 text-sm font-medium text-crm-text">
          {label}
        </div>
      )}

      <select
        className={`${base} ${errorClasses} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {hint && (
        <div className="mt-1 text-xs text-crm-muted">{hint}</div>
      )}

      {error && (
        <div className="mt-1 text-xs text-crm-danger">{error}</div>
      )}
    </label>
  )
}
