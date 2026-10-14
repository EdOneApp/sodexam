import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { repondre } from '../lib/chatbot'

type Msg = { from: 'bot' | 'user'; text: string }

const INTRO: Msg = { from: 'bot', text: 'Bonjour ! Assistant de démonstration SODEXAM — posez une question sur la météo, la vigilance, le CERMA ou nos aéroports.' }

export function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([INTRO])
  const [input, setInput] = useState('')

  function send() {
    if (!input.trim()) return
    const userMsg: Msg = { from: 'user', text: input }
    const botMsg: Msg = { from: 'bot', text: repondre(input) }
    setMessages((m) => [...m, userMsg, botMsg])
    setInput('')
  }

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass mb-3 flex h-96 w-80 flex-col overflow-hidden rounded-2xl text-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="font-semibold">Assistant SODEXAM</span>
              <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] font-semibold text-orange-200">DÉMO</span>
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto p-4 text-sm">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.from === 'bot'
                      ? 'max-w-[85%] rounded-xl rounded-tl-none bg-white/10 px-3 py-2'
                      : 'ml-auto max-w-[85%] rounded-xl rounded-tr-none bg-(--color-sky) px-3 py-2'
                  }
                >
                  {m.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Votre question…"
                className="flex-1 rounded-full bg-white/10 px-3 py-2 text-sm outline-none placeholder:text-white/40"
              />
              <button onClick={send} className="rounded-full bg-(--color-ivory-orange) px-3 py-2 text-sm font-semibold">
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-(--color-ivory-orange) text-2xl text-white shadow-lg shadow-orange-900/30 transition hover:scale-105"
        aria-label="Ouvrir l’assistant"
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}
