import { forwardRef } from 'react'

export const Input = forwardRef(function Input({ label, error, id, className = '', ...props }, ref) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={`
          block w-full rounded-lg border px-3 py-2 text-sm
          bg-white dark:bg-gray-900
          text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          transition-colors
          focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
          ${error
            ? 'border-red-400 dark:border-red-500'
            : 'border-gray-300 dark:border-gray-700'
          }
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  )
})

export const Select = forwardRef(function Select({ label, error, id, children, className = '', ...props }, ref) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`
          block w-full rounded-lg border px-3 py-2 text-sm
          bg-white dark:bg-gray-900
          text-gray-700 dark:text-gray-300
          transition-colors
          focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
          ${error
            ? 'border-red-400 dark:border-red-500'
            : 'border-gray-300 dark:border-gray-700'
          }
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  )
})
