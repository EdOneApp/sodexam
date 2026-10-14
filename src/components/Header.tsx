import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

type MenuItem = { label: string; href: string; desc: string }
type MenuGroup = { label: string; items: MenuItem[] }

function useMenus(): MenuGroup[] {
  const { t } = useTranslation()
  return [
    {
      label: t('nav.institution'),
      items: [
        { label: t('nav.presentation'), href: '/presentation', desc: 'Statut, décret de 1997, valeurs' },
        { label: t('nav.motDg'), href: '/mot-du-dg', desc: 'Message du Directeur Général' },
        { label: t('nav.gouvernance'), href: '/gouvernance', desc: 'Conseil, direction, rapports' },
      ],
    },
    {
      label: t('nav.meteo'),
      items: [
        { label: t('nav.previsions'), href: '/meteo', desc: '30+ villes, actuel, 7 jours' },
        { label: t('nav.vigilance'), href: '/vigilance', desc: 'Carte des régions, niveaux' },
        { label: t('nav.marine'), href: '/meteo-marine', desc: 'Houle, vent, marées' },
        { label: t('nav.agrometeo'), href: '/agrometeo', desc: 'Saisons, cumuls, normales' },
        { label: t('nav.aeronautique'), href: '/meteo-aeronautique', desc: 'METAR, TAF, SIGMET' },
      ],
    },
    {
      label: t('nav.aeroports'),
      items: [
        { label: t('nav.nosAeroports'), href: '/aeroports', desc: 'Carte interactive des plateformes' },
        { label: t('nav.navigationAerienne'), href: '/navigation-aerienne', desc: 'Espace aérien ivoirien' },
      ],
    },
    {
      label: t('nav.services'),
      items: [
        { label: t('nav.cerma'), href: '/cerma', desc: 'Visites médicales, rendez-vous' },
        { label: t('nav.produits'), href: '/produits', desc: 'Bulletins, données, études' },
      ],
    },
  ]
}

export function Header({ onOpenSearch }: { onOpenSearch: () => void }) {
  const { t, i18n } = useTranslation()
  const { isDark, setMode, mode, liteMode, setLiteMode } = useTheme()
  const menus = useMenus()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  function toggleLang() {
    const next = i18n.language === 'en' ? 'fr' : 'en'
    i18n.changeLanguage(next)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-(--color-night)/90 backdrop-blur-md text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <svg viewBox="0 0 48 48" className="h-8 w-8">
            <circle cx="24" cy="24" r="24" fill="#0A1F44" />
            <circle cx="24" cy="24" r="16" fill="none" stroke="#22D3EE" strokeWidth="1" opacity="0.5" />
            <path d="M24 7 L27 23 L41 27 L27 29 L24 41 L21 29 L7 27 L21 23 Z" fill="#F77F00" />
          </svg>
          SODEXAM
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpenMenu(null)}>
          {menus.map((menu) => (
            <div key={menu.label} className="relative" onMouseEnter={() => setOpenMenu(menu.label)}>
              <button className="rounded-full px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white">
                {menu.label}
              </button>
              <AnimatePresence>
                {openMenu === menu.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="glass absolute left-0 top-full mt-2 w-80 rounded-2xl p-3 shadow-2xl"
                  >
                    {menu.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setOpenMenu(null)}
                        className="block rounded-xl px-4 py-3 transition hover:bg-white/10"
                      >
                        <div className="font-semibold text-white">{item.label}</div>
                        <div className="text-xs text-white/60">{item.desc}</div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <NavLink to="/actualites" className="rounded-full px-4 py-2 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white">
            {t('nav.actualites')}
          </NavLink>
          <NavLink to="/carrieres" className="rounded-full px-4 py-2 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white">
            {t('nav.carrieres')}
          </NavLink>
          <NavLink to="/contact" className="rounded-full px-4 py-2 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white">
            {t('nav.contact')}
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="hidden items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 sm:flex"
            aria-label={t('nav.rechercher')}
          >
            <span>⌘K</span>
          </button>
          <button
            onClick={toggleLang}
            className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold hover:bg-white/10"
          >
            {t('common.langue')}
          </button>
          <button
            onClick={() => setMode(mode === 'dark' ? 'light' : mode === 'light' ? 'auto' : 'dark')}
            className="rounded-full border border-white/15 px-3 py-1.5 text-xs hover:bg-white/10"
            title="Basculer le thème"
          >
            {isDark ? '🌙' : '☀️'}
          </button>
          <button
            onClick={() => setLiteMode(!liteMode)}
            className={`hidden rounded-full border px-3 py-1.5 text-xs sm:block ${liteMode ? 'border-(--color-ivory-orange) bg-(--color-ivory-orange)/20' : 'border-white/15 hover:bg-white/10'}`}
            title="Mode connexion légère : désactive 3D et vidéos"
          >
            🐢
          </button>
          <Link
            to="/login"
            className="hidden rounded-full bg-(--color-ivory-orange) px-4 py-2 text-sm font-semibold text-white hover:brightness-110 sm:block"
          >
            {t('nav.connexion')}
          </Link>
          <button className="rounded-full border border-white/15 p-2 lg:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
            <span className="block h-0.5 w-5 bg-white" />
            <span className="mt-1 block h-0.5 w-5 bg-white" />
            <span className="mt-1 block h-0.5 w-5 bg-white" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {menus.flatMap((m) => m.items).map((item) => (
                <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 hover:bg-white/10">
                  {item.label}
                </Link>
              ))}
              <Link to="/actualites" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 hover:bg-white/10">{t('nav.actualites')}</Link>
              <Link to="/carrieres" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 hover:bg-white/10">{t('nav.carrieres')}</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 hover:bg-white/10">{t('nav.contact')}</Link>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="mt-2 rounded-lg bg-(--color-ivory-orange) px-3 py-2 text-center font-semibold">{t('nav.connexion')}</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
