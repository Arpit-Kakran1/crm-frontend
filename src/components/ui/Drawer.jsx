import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FiX } from 'react-icons/fi'
import React from 'react'
export default function Drawer({ open, onClose, title, children, footer }) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md border-l border-crm-border bg-white shadow-soft">
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-3 border-b border-crm-border px-4 py-3">
                  {title ? (
                    <DialogTitle className="text-sm font-semibold text-crm-text">
                      {title}
                    </DialogTitle>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-crm-border bg-white p-2 text-crm-muted hover:bg-crm-surface"
                    onClick={onClose}
                    aria-label="Close"
                  >
                    <FiX />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  {children}
                </div>
                {footer ? (
                  <div className="border-t border-crm-border px-4 py-3">
                    {footer}
                  </div>
                ) : null}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

