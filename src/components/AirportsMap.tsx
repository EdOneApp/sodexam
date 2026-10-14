import { useEffect, useRef, useState } from 'react'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useNavigate } from 'react-router-dom'
import { aeroports, type StatutAeroport } from '../data/aeroports'
import { Icon } from '../design-system/Icon'

const statutColor: Record<StatutAeroport, string> = {
  service: '#F15A24',
  travaux: '#22D3EE',
  projet: '#9fb3c8',
}

export function AirportsMap({ height = 480 }: { height?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [indisponible, setIndisponible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    let map: maplibregl.Map
    const markers: maplibregl.Marker[] = []
    try {
      map = new maplibregl.Map({
        container: ref.current,
        style: 'https://tiles.openfreemap.org/styles/liberty',
        center: [-5.5, 7.5],
        zoom: 5.6,
        attributionControl: false,
      })
    } catch {
      setIndisponible(true)
      return
    }
    map.on('error', () => setIndisponible(true))
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')

    for (const a of aeroports) {
      const el = document.createElement('button')
      el.style.width = '16px'
      el.style.height = '16px'
      el.style.borderRadius = '50%'
      el.style.border = '2px solid white'
      el.style.background = statutColor[a.statut]
      el.style.cursor = 'pointer'
      el.style.boxShadow = '0 0 0 4px rgba(241,90,36,0.2)'
      el.title = `${a.nom} (${a.codeIata})`
      el.addEventListener('click', () => navigate(`/aeroports/${a.code}`))
      const marker = new maplibregl.Marker({ element: el }).setLngLat([a.lon, a.lat]).addTo(map)
      markers.push(marker)
    }

    return () => {
      markers.forEach((m) => m.remove())
      map.remove()
    }
  }, [navigate])

  if (indisponible) {
    return (
      <div
        style={{ height }}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-black/[0.04] text-black/40 dark:bg-white/5 dark:text-white/40"
      >
        <Icon name="globe" className="h-8 w-8" strokeWidth={1.2} />
        <span className="text-sm">Carte indisponible sur cet appareil</span>
      </div>
    )
  }

  return <div ref={ref} style={{ height }} className="w-full overflow-hidden rounded-2xl" />
}
