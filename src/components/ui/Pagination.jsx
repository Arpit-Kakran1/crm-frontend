import Button from './Button.jsx'
import React from 'react'
export default function Pagination({ page, pageCount, onPageChange }) {
  if (pageCount <= 1) return null

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-sm text-crm-muted">
        Page <span className="font-medium text-crm-text">{page}</span> of{' '}
        <span className="font-medium text-crm-text">{pageCount}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

