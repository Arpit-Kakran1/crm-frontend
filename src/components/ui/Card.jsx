import React from 'react'

export default function Card({ className = '', children }) {
  return (
    <div
      className={`rounded-lg border border-crm-border bg-crm-surface shadow-soft ${className}`}
    >
      {children}
    </div>
  )
}
