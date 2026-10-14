import { useEffect, useRef, Suspense, lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container, Card, SectionTitle } from '../design-system/Card'
import { Button } from '../design-system/Button'
import { SplitTitle } from '../components/SplitTitle'
import { StatCounter } from '../design-system/StatCounter'
import { VigilanceBadge } from '../design-system/VigilanceBadge'
import { WeatherIcon } from '../design-system/WeatherIcon'
import { Icon, type IconName } from '../design-system/Icon'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { Marquee } from '../components/Marquee'
import { useTheme } from '../context/ThemeContext'
import { meteoActuelle } from '../lib/weather-sim'
import { actualites } from '../data/actualites'
import { niveauNational } from '../components/VigilanceBar'
import { villes } from '../data/villes'
import heroImage from '../assets/photos/yamoussoukro-aerogare.jpg'
import stationImage from '../assets/photos/yamoussoukro-station-meteo.jpg'
import hallImage from '../assets/photos/yamoussoukro-hall.jpg'
import sanPedroImage from '../assets/photos/san-pedro-aerogare.jpg'

const Globe3D = lazy(() => import('../components/Globe3D').then((m) => ({ default: m.Globe3D })))

gsap.registerPlugin(ScrollTrigger)

const accesRapides: { label: string; href: string; icon: IconName }[] = [
  { label: 'Météo de ma ville', href: '/meteo', icon: 'cloud' },
  { label: 'Vigilance en direct', href: '/vigilance', icon: 'alert-triangle' },
  { label: 'Nos aéroports', href: '/aeroports', icon: 'plane' },
  { label: 'Rendez-vous CERMA', href: '/cerma', icon: 'stethoscope' },
  { label: 'Demander un devis', href: '/produits', icon: 'document' },
]

const partenaires = ['AFD', 'MFI', 'ASECNA', 'OMM', 'Air Côte d’Ivoire', 'ARTCI']

const galerie = [
  { src: stationImage, legende: 'Station météorologique — plateforme de Yamoussoukro' },
  { src: hallImage, legende: 'Hall des départs — aérogare de Yamoussoukro' },
  { src: sanPedroImage, legende: 'Aérogare de San-Pédro' },
]

function PistePipeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { reducedMotion } = useTheme()

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return
    const stages = sectionRef.current.querySelectorAll<HTMLElement>('[data-stage]')
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=2200',
        scrub: true,
        pin: true,
      },
    })
    stages.forEach((stage, i) => {
      if (i > 0) tl.to(stages[i - 1], { autoAlpha: 0, scale: 0.92, duration: 0.4 }, i)
      tl.to(stage, { autoAlpha: 1, scale: 1, duration: 0.6 }, i)
    })
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [reducedMotion])

  return (
    <div ref={sectionRef} className="relative h-[80vh] overflow-hidden bg-(--color-night) text-white">
      <div data-stage className="absolute inset-0 flex flex-col items-center justify-center gap-5 opacity-100">
        <div className="h-40 w-full max-w-lg rounded-full bg-gradient-to-r from-white/10 via-white/30 to-white/10 blur-2xl" />
        <Icon name="cloud" className="h-9 w-9 text-white/70" strokeWidth={1.4} />
        <p className="font-display text-2xl">Les nuages se forment au-dessus de la Côte d’Ivoire</p>
      </div>
      <div data-stage className="absolute inset-0 flex flex-col items-center justify-center gap-5 opacity-0">
        <div className="relative h-56 w-56 rounded-full border-2 border-(--color-radar)/40">
          <div className="absolute inset-0 origin-center animate-spin rounded-full border-t-2 border-(--color-radar)" style={{ animationDuration: '2.5s' }} />
        </div>
        <Icon name="radar" className="h-9 w-9 text-(--color-radar)" strokeWidth={1.4} />
        <p className="font-display text-2xl">Le radar balaye l’espace aérien</p>
      </div>
      <div data-stage className="absolute inset-0 flex flex-col items-center justify-center gap-5 opacity-0">
        <Icon name="plane-landing" className="h-14 w-14 text-(--color-ivory-orange)" strokeWidth={1.2} />
        <p className="font-display text-2xl">L’avion se pose en toute sécurité</p>
      </div>
      <div data-stage className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6 opacity-0">
        <p className="font-display text-2xl">La SODEXAM en chiffres</p>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <StatCounter value={8} label="Aéroports" light />
          <StatCounter value={30} suffix="+" label="Stations météo" light />
          <StatCounter value={1200} suffix="+" label="Agents" light />
          <StatCounter value={45} suffix=" k" label="Vols traités / an" light />
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const { t } = useTranslation()
  const { liteMode } = useTheme()
  const meteo = meteoActuelle('abidjan')
  const niveau = niveauNational()
  const unes = actualites.slice(0, 3)
  const villesTicker = villes.slice(0, 12).map((v) => v.nom)

  return (
    <div>
      <section className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden text-white">
        <img
          src={heroImage}
          alt="Aérogare de Yamoussoukro, Côte d’Ivoire"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-(--color-night) via-(--color-night)/55 to-(--color-night)/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-(--color-night)/70 via-transparent to-transparent" />

        <Container className="relative z-10 pb-20 pt-32">
          <SplitTitle
            text={t('home.heroTitre')}
            className="max-w-4xl text-6xl font-bold leading-[0.95] tracking-tight sm:text-8xl"
          />
          <p className="mt-6 max-w-xl text-lg text-white/85">{t('home.heroSousTitre')}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/meteo">{t('home.heroCta')}</Button>
            <Button href="/vigilance" variant="ghost">{t('home.heroCtaSecondaire')}</Button>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:max-w-2xl">
            <div className="glass flex items-center gap-4 rounded-2xl p-5">
              <WeatherIcon condition={meteo.condition} className="h-12 w-12" />
              <div>
                <div className="text-3xl font-bold">{meteo.tempC}°C</div>
                <div className="text-sm text-white/70">Abidjan · ressenti {meteo.ressenti}°C</div>
              </div>
              <Link to="/meteo/abidjan" className="ml-auto text-sm underline">{t('common.voirPlus')}</Link>
            </div>
            <div className="glass flex items-center gap-4 rounded-2xl p-5">
              <VigilanceBadge niveau={niveau} pulse />
              <Link to="/vigilance" className="ml-auto text-sm underline">{t('common.voirPlus')}</Link>
            </div>
          </div>
        </Container>
      </section>

      <Marquee
        items={villesTicker}
        className="bg-(--color-ivory-orange) text-(--color-night)"
      />

      <PistePipeline />

      <section className="bg-(--color-night) py-20 text-white">
        <Container>
          <SectionTitle
            eyebrow="Réseau national"
            title="Nos aéroports et stations, connectés"
            subtitle="Chaque point lumineux représente une plateforme SODEXAM active ou en projet."
            light
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="h-80 rounded-2xl bg-white/5 lg:h-96">
              {liteMode ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-white/50">
                  <Icon name="globe" className="h-10 w-10" strokeWidth={1.2} />
                  <span className="text-xs">Mode connexion légère — globe 3D désactivé</span>
                </div>
              ) : (
                <ErrorBoundary
                  fallback={
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-white/50">
                      <Icon name="globe" className="h-10 w-10" strokeWidth={1.2} />
                      <span className="text-xs">Aperçu 3D indisponible sur cet appareil</span>
                    </div>
                  }
                >
                  <Suspense fallback={<div className="flex h-full items-center justify-center text-white/40">Chargement du globe…</div>}>
                    <Globe3D />
                  </Suspense>
                </ErrorBoundary>
              )}
            </div>
            <div className="flex flex-col justify-center gap-4">
              <p className="text-white/70">
                Du littoral aux savanes du nord, la SODEXAM exploite et modernise un réseau de plateformes aéroportuaires
                et de stations météorologiques réparties sur tout le territoire ivoirien.
              </p>
              <Button href="/aeroports">Explorer la carte des aéroports</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionTitle eyebrow="Sur le terrain" title="Nos plateformes, en images" />
          <div className="grid gap-4 sm:grid-cols-3">
            {galerie.map((g) => (
              <figure key={g.src} className="group relative overflow-hidden rounded-2xl">
                <img src={g.src} alt={g.legende} className="h-72 w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                <figcaption className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white">{g.legende}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-(--color-sand) py-20 dark:bg-(--color-night)">
        <Container>
          <SectionTitle eyebrow="Actualités" title={t('home.actualitesTitre')} />
          <div className="grid gap-6 sm:grid-cols-3">
            {unes.map((a) => (
              <Card key={a.slug} className="flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-(--color-sky)">{a.theme}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold">{a.titre}</h3>
                  <p className="mt-2 text-sm text-black/60 dark:text-white/60">{a.resume}</p>
                </div>
                <Link to={`/actualites/${a.slug}`} className="mt-4 text-sm font-semibold text-(--color-sky)">
                  {t('common.enSavoirPlus')} →
                </Link>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="/actualites" variant="secondary">{t('common.voirTout')}</Button>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionTitle eyebrow={t('home.accesRapides')} title="Les services les plus demandés" />
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {accesRapides.map((a) => (
              <Link
                key={a.href}
                to={a.href}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
              >
                <Icon name={a.icon} className="h-7 w-7 text-(--color-ivory-orange)" strokeWidth={1.5} />
                <span className="text-sm font-semibold">{a.label}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-black/5 py-14 dark:border-white/10">
        <Container>
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
            {t('home.partenaires')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
            {partenaires.map((p) => (
              <span key={p} className="font-display text-lg font-semibold text-black/50 dark:text-white/50">{p}</span>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
