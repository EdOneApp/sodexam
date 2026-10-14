import { useEffect, useRef } from 'react'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useNavigate } from 'react-router-dom'
import { aeroports, type StatutAeroport } from '../data/aeroports'

const statutColor: Record<StatutAeroport, string> = {
  service: '#F77F00',
  travaux: '#22D3EE',
  projet: '#9fb3c8',
}

export function AirportsMap({ height = 480 }: { height?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!ref.current) return
    const map = new maplibregl.Map({
      container: ref.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [-5.5, 7.5],
      zoom: 5.6,
      attributionControl: false,
    })
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')

    const markers: maplibregl.Marker[] = []
    for (const a of aeroports) {
      const el = document.createElement('button')
      el.style.width = '16px'
      el.style.height = '16px'
      el.style.borderRadius = '50%'
      el.style.border = '2px solid white'
      el.style.background = statutColor[a.statut]
      el.style.cursor = 'pointer'
      el.style.boxShadow = '0 0 0 4px rgba(34,211,238,0.25)'
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

  return <div ref={ref} style={{ height }} className="w-full overflow-hidden rounded-2xl" />
}
