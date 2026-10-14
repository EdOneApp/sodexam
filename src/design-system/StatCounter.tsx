import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import clsx from 'clsx'

export function StatCounter({
  value,
  suffix = '',
  label,
  light = false,
}: {
  value: number
  suffix?: string
  label: string
  /** Force les couleurs claires : à utiliser dans une section à fond sombre fixe (hors bascule de thème). */
  light?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1200
    const start = performance.now()
    let raf = 0
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration)
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
      <div
        className={clsx(
          'font-mono-data text-4xl font-bold sm:text-5xl',
          light ? 'text-(--color-radar)' : 'text-(--color-ivory-orange) dark:text-(--color-radar)',
        )}
      >
        {display}
        {suffix}
      </div>
      <div className={clsx('mt-2 text-sm', light ? 'text-white/70' : 'text-black/60 dark:text-white/70')}>{label}</div>
    </motion.div>
  )
}
