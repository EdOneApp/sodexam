import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  type?: 'button' | 'submit'
  className?: string
}

const variants = {
  primary: 'bg-(--color-ivory-orange) text-white hover:brightness-110 shadow-lg shadow-orange-900/20',
  secondary: 'bg-(--color-sky) text-white hover:brightness-110',
  ghost: 'bg-transparent border border-white/30 text-current hover:bg-white/10',
}

export function Button({ children, href, onClick, variant = 'primary', type = 'button', className }: Props) {
  const classes = clsx(
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-sm transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0',
    variants[variant],
    className,
  )
  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
