import Button from './Button.jsx'
import React from 'react'
export default function EmptyState({
  title = 'No data',
  description = 'Try adjusting filters or add a new item.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="rounded-lg border border-crm-border bg-white p-6 text-center">
      <div className="text-sm font-semibold text-crm-text">{title}</div>
      <div className="mt-1 text-sm text-crm-muted">{description}</div>
      {actionLabel ? (
        <div className="mt-4 flex justify-center">
          <Button variant="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

