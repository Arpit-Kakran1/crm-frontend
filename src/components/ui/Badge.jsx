import React from 'react'

const styles = {
  default: 'bg-white text-crm-text/80 border-crm-border',
  blue: 'bg-[#2563EB]/10 text-crm-primary border-[#2563EB]/25',
  green: 'bg-[#16A34A]/10 text-crm-success border-[#16A34A]/25',
  amber: 'bg-[#F59E0B]/10 text-crm-warning border-[#F59E0B]/25',
  red: 'bg-[#EF4444]/10 text-crm-danger border-[#EF4444]/25',
}

export default function Badge({
  color = 'default',
  className = '',
  children,
}) {
  const colorClass = styles[color] || styles.default

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${colorClass} ${className}`}
    >
      {children}
    </span>
  )
}
