import { type ReactNode } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

export function Card({ children, className, glass = false }: { children: ReactNode; className?: string; glass?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={clsx(
        'rounded-2xl border border-black/5 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/5',
        glass && 'glass',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  light?: boolean
}) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && (
        <span
          className={clsx(
            'mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider',
            light ? 'bg-white/15 text-white' : 'bg-sky-500/10 text-(--color-sky)',
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2 className={clsx('font-display text-3xl font-bold sm:text-4xl', light ? 'text-white' : '')}>{title}</h2>
      {subtitle && <p className={clsx('mt-3 text-base', light ? 'text-white/80' : 'text-black/60 dark:text-white/60')}>{subtitle}</p>}
    </div>
  )
}
