import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export function StatCounter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
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
      <div className="font-mono-data text-4xl font-bold text-(--color-radar) sm:text-5xl">
        {display}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-white/70">{label}</div>
    </motion.div>
  )
}
