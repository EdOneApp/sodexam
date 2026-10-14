import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SEEN_KEY = 'sodexam-preloader-seen'
const WORD = 'SODEXAM'

export function Preloader() {
  const [visible, setVisible] = useState(() => sessionStorage.getItem(SEEN_KEY) !== '1')

  useEffect(() => {
    if (!visible) return
    sessionStorage.setItem(SEEN_KEY, '1')
    const id = setTimeout(() => setVisible(false), 1800)
    return () => clearTimeout(id)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.1 } }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden bg-(--color-night)"
        >
          <div className="grain absolute inset-0" />
          <div className="relative flex items-baseline">
            {WORD.split('').map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl font-bold tracking-tight sm:text-7xl"
                style={{ color: i < 4 ? '#F15A24' : '#1FAE68' }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.15 + WORD.length * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 h-[3px] w-40 origin-left rounded-full bg-gradient-to-r from-(--color-ivory-orange) to-(--color-sky) sm:w-56"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 + WORD.length * 0.07 + 0.3, duration: 0.4 }}
            className="mt-4 text-xs uppercase tracking-[0.3em] text-white/50"
          >
            Du ciel à la piste
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
