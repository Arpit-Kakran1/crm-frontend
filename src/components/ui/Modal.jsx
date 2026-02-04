import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FiX } from 'react-icons/fi'
import React from 'react'
export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            className={`w-full ${sizes[size] || sizes.md} rounded-lg border border-crm-border bg-white shadow-soft`}
          >
            <div className="flex items-start justify-between gap-3 border-b border-crm-border px-4 py-3">
              <div>
                {title ? (
                  <DialogTitle className="text-sm font-semibold text-crm-text">
                    {title}
                  </DialogTitle>
                ) : null}
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-crm-border bg-white p-2 text-crm-muted hover:bg-crm-surface"
                onClick={onClose}
                aria-label="Close"
              >
                <FiX />
              </button>
            </div>

            <div className="px-4 py-4">{children}</div>

            {footer ? (
              <div className="border-t border-crm-border px-4 py-3">
                {footer}
              </div>
            ) : null}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

