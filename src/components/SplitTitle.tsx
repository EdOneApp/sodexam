import { motion } from 'framer-motion'
import clsx from 'clsx'

function Words({ words }: { words: string[] }) {
  return (
    <>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden pb-1 pr-3 align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.6, delay: wi * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  )
}

export function SplitTitle({ text, className, el = 'h1' }: { text: string; className?: string; el?: 'h1' | 'h2' | 'h3' }) {
  const words = text.split(' ')
  const cls = clsx('font-display', className)
  if (el === 'h2') return <h2 className={cls} aria-label={text}><Words words={words} /></h2>
  if (el === 'h3') return <h3 className={cls} aria-label={text}><Words words={words} /></h3>
  return <h1 className={cls} aria-label={text}><Words words={words} /></h1>
}
