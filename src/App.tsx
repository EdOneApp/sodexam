import { useEffect, useState, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { Header } from './components/Header'
import { VigilanceBar } from './components/VigilanceBar'
import { Footer } from './components/Footer'
import { Preloader } from './components/Preloader'
import { ChatbotWidget } from './components/ChatbotWidget'
import { CommandPalette } from './components/CommandPalette'
import { ScrollToTop, PageTransition } from './components/PageTransition'

const Home = lazy(() => import('./pages/Home'))
const Presentation = lazy(() => import('./pages/Presentation'))
const MotDuDG = lazy(() => import('./pages/MotDuDG'))
const Gouvernance = lazy(() => import('./pages/Gouvernance'))
const Meteo = lazy(() => import('./pages/Meteo'))
const MeteoVille = lazy(() => import('./pages/MeteoVille'))
const Vigilance = lazy(() => import('./pages/Vigilance'))
const MeteoMarine = lazy(() => import('./pages/MeteoMarine'))
const Agrometeo = lazy(() => import('./pages/Agrometeo'))
const MeteoAeronautique = lazy(() => import('./pages/MeteoAeronautique'))
const Aeroports = lazy(() => import('./pages/Aeroports'))
const AeroportDetail = lazy(() => import('./pages/AeroportDetail'))
const NavigationAerienne = lazy(() => import('./pages/NavigationAerienne'))
const Cerma = lazy(() => import('./pages/Cerma'))
const Produits = lazy(() => import('./pages/Produits'))
const Actualites = lazy(() => import('./pages/Actualites'))
const ActualiteDetail = lazy(() => import('./pages/ActualiteDetail'))
const Carrieres = lazy(() => import('./pages/Carrieres'))
const AppelsOffres = lazy(() => import('./pages/AppelsOffres'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const BackofficeDashboard = lazy(() => import('./pages/BackofficeDashboard'))
const CermaEspace = lazy(() => import('./pages/CermaEspace'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-(--color-sky) border-t-transparent" />
    </div>
  )
}

function SmoothScroll() {
  const { reducedMotion, liteMode } = useTheme()
  useEffect(() => {
    if (reducedMotion || liteMode) return
    const lenis = new Lenis({ smoothWheel: true })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [reducedMotion, liteMode])
  return null
}

function Shell() {
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <Preloader />
      <SmoothScroll />
      <VigilanceBar />
      <Header onOpenSearch={() => setSearchOpen(true)} />
      <ScrollToTop />
      <PageTransition>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/mot-du-dg" element={<MotDuDG />} />
            <Route path="/gouvernance" element={<Gouvernance />} />
            <Route path="/meteo" element={<Meteo />} />
            <Route path="/meteo/:slug" element={<MeteoVille />} />
            <Route path="/vigilance" element={<Vigilance />} />
            <Route path="/meteo-marine" element={<MeteoMarine />} />
            <Route path="/agrometeo" element={<Agrometeo />} />
            <Route path="/meteo-aeronautique" element={<MeteoAeronautique />} />
            <Route path="/aeroports" element={<Aeroports />} />
            <Route path="/aeroports/:code" element={<AeroportDetail />} />
            <Route path="/navigation-aerienne" element={<NavigationAerienne />} />
            <Route path="/cerma" element={<Cerma />} />
            <Route path="/cerma/espace" element={<CermaEspace />} />
            <Route path="/produits" element={<Produits />} />
            <Route path="/actualites" element={<Actualites />} />
            <Route path="/actualites/:slug" element={<ActualiteDetail />} />
            <Route path="/carrieres" element={<Carrieres />} />
            <Route path="/appels-offres" element={<AppelsOffres />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/backoffice" element={<BackofficeDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageTransition>
      <Footer />
      <ChatbotWidget />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Shell />
      </AuthProvider>
    </ThemeProvider>
  )
}
