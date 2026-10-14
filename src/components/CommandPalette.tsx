import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { buildSearchIndex } from '../lib/search-index'

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const index = useMemo(() => buildSearchIndex(), [])

  const results = useMemo(() => {
    if (!query.trim()) return index.slice(0, 8)
    const q = query.toLowerCase()
    return index.filter((i) => i.label.toLowerCase().includes(q) || i.sousTitre?.toLowerCase().includes(q)).slice(0, 10)
  }, [query, index])

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  function go(href: string) {
    navigate(href)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-24"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-xl overflow-hidden rounded-2xl text-white shadow-2xl"
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une page, une ville, un aéroport…"
              className="w-full bg-transparent px-5 py-4 text-lg outline-none placeholder:text-white/40"
            />
            <div className="max-h-96 overflow-y-auto border-t border-white/10">
              {results.length === 0 && <div className="p-5 text-sm text-white/50">Aucun résultat</div>}
              {results.map((r) => (
                <button
                  key={r.href}
                  onClick={() => go(r.href)}
                  className="flex w-full items-center justify-between px-5 py-3 text-left hover:bg-white/10"
                >
                  <span>
                    <span className="font-medium">{r.label}</span>
                    {r.sousTitre && <span className="ml-2 text-xs text-white/50">{r.sousTitre}</span>}
                  </span>
                  <span className="text-xs text-white/40">{r.categorie}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
