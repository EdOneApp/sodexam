import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '../design-system/Icon'
import logo from '../assets/sodexam-logo.png'

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-white/10 bg-(--color-night) text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logo} alt="SODEXAM" className="h-8 w-auto" />
            <p className="mt-4 text-sm text-white/60">
              Société d’État chargée de l’exploitation aéroportuaire, de la navigation aérienne et de la météorologie en Côte d’Ivoire.
            </p>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold text-white">{t('footer.liensUtiles')}</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/presentation" className="hover:text-white">{t('nav.presentation')}</Link></li>
              <li><Link to="/meteo" className="hover:text-white">{t('nav.previsions')}</Link></li>
              <li><Link to="/vigilance" className="hover:text-white">{t('nav.vigilance')}</Link></li>
              <li><Link to="/aeroports" className="hover:text-white">{t('nav.nosAeroports')}</Link></li>
              <li><Link to="/cerma" className="hover:text-white">{t('nav.cerma')}</Link></li>
              <li><Link to="/appels-offres" className="hover:text-white">{t('nav.appelsOffres')}</Link></li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold text-white">Contact</div>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Abidjan, Côte d’Ivoire</li>
              <li>contact@sodexam.ci (fictif)</li>
              <li>+225 27 XX XX XX XX (fictif)</li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold text-white">{t('footer.suivezNous')}</div>
            <div className="flex gap-3 text-sm">
              <a href="#" className="rounded-full border border-white/15 px-3 py-1.5 hover:bg-white/10">X</a>
              <a href="#" className="rounded-full border border-white/15 px-3 py-1.5 hover:bg-white/10">FB</a>
              <a href="#" className="rounded-full border border-white/15 px-3 py-1.5 hover:bg-white/10">YT</a>
              <a href="#" className="rounded-full border border-white/15 px-3 py-1.5 hover:bg-white/10">in</a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex items-start gap-2 rounded-xl border border-orange-400/30 bg-orange-400/10 p-4 text-xs text-orange-100">
          <Icon name="alert-triangle" className="mt-0.5 h-4 w-4 shrink-0" />
          {t('footer.mentionDemo')}
        </div>
        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} SODEXAM — {t('footer.droits')}</span>
          <span>Décret n°97-228 du 16 avril 1997</span>
        </div>
      </div>
    </footer>
  )
}
