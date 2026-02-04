import React from 'react'

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-md border font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3.5 py-2 text-sm',
    lg: 'px-4 py-2.5 text-sm',
  }

  const variants = {
    primary:
      'bg-crm-primary border-crm-primary text-white hover:bg-blue-700 hover:border-blue-700',
    secondary:
      'bg-white border-crm-border text-crm-text hover:bg-crm-bg',
    danger:
      'bg-crm-danger border-crm-danger text-white hover:brightness-95 hover:border-crm-danger',
    ghost:
      'bg-transparent border-transparent text-crm-text hover:bg-crm-bg',
  }

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
