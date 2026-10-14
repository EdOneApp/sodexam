import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SEEN_KEY = 'sodexam-preloader-seen'

export function Preloader() {
  const [visible, setVisible] = useState(() => sessionStorage.getItem(SEEN_KEY) !== '1')

  useEffect(() => {
    if (!visible) return
    sessionStorage.setItem(SEEN_KEY, '1')
    const id = setTimeout(() => setVisible(false), 1500)
    return () => clearTimeout(id)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-(--color-night)"
        >
          <svg viewBox="0 0 200 200" className="h-24 w-24">
            <motion.path
              d="M100 30 L112 90 L170 100 L112 108 L100 170 L88 108 L30 100 L88 90 Z"
              fill="none"
              stroke="#F77F00"
              strokeWidth="3"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="100" cy="100" r="6" fill="#22D3EE"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
