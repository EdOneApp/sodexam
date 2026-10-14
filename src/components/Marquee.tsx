import clsx from 'clsx'

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const doubled = [...items, ...items]
  return (
    <div className={clsx('overflow-hidden border-y border-black/10 py-3', className)}>
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-semibold uppercase tracking-wider">
            {item}
            <span aria-hidden className="opacity-50">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
