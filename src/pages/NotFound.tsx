import { motion } from 'framer-motion'
import { Container } from '../design-system/Card'
import { Button } from '../design-system/Button'
import { Icon } from '../design-system/Icon'

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-(--color-night) text-center text-white">
      <div className="absolute inset-0 opacity-40">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 blur-xl"
            style={{ width: 120 + i * 20, height: 60 + i * 10, top: `${10 + i * 14}%`, left: `${(i * 23) % 100}%` }}
            animate={{ x: [0, 40, 0] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, 4, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10"
      >
        <Icon name="plane" className="h-20 w-20 text-(--color-ivory-orange)" strokeWidth={1} />
      </motion.div>
      <Container className="relative z-10 mt-6">
        <h1 className="font-display text-4xl font-bold">Vol détourné — 404</h1>
        <p className="mt-3 text-white/70">Cette page a quitté l’espace aérien. Retournons vers une piste connue.</p>
        <div className="mt-6">
          <Button href="/">Retour à l’accueil</Button>
        </div>
      </Container>
    </div>
  )
}
