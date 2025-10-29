import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }

export default function Button({ variant = 'primary', className = '', ...rest }: Props) {
  const base = 'px-3 py-2 rounded-md'
  const cls = variant === 'primary' ? `${base} bg-blue-600 text-white` : `${base} bg-transparent`
  return <button className={`${cls} ${className}`} {...rest} />
}
