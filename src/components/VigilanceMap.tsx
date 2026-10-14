import { useEffect, useRef, useState } from 'react'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import districts from '../assets/civ-districts.geojson?url'
import { zoneParDistrict } from '../data/vigilance'
import { Icon } from '../design-system/Icon'

const niveauColor: Record<string, string> = {
  vert: '#1b9e5a',
  jaune: '#e8b800',
  orange: '#f15a24',
  rouge: '#d81f2a',
}

export function VigilanceMap({
  height = 520,
  onSelect,
  selected,
}: {
  height?: number
  onSelect?: (district: string) => void
  selected?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [indisponible, setIndisponible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    let map: maplibregl.Map
    try {
      map = new maplibregl.Map({
        container: ref.current,
        style: {
          version: 8,
          sources: {},
          layers: [],
          glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
        },
        center: [-5.4, 7.6],
        zoom: 5.5,
        minZoom: 4.5,
        maxZoom: 8,
        attributionControl: false,
      })
    } catch {
      setIndisponible(true)
      return
    }
    map.on('error', () => setIndisponible(true))
    mapRef.current = map
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
    map.addControl(new maplibregl.AttributionControl({ compact: true, customAttribution: '© geoBoundaries (CC BY 4.0)' }))

    map.on('load', () => {
      fetch(districts)
        .then((res) => res.json())
        .then((data) => {
          for (const f of data.features) {
            const zone = zoneParDistrict(f.properties.shapeName)
            f.properties.niveau = zone?.niveau ?? 'vert'
            f.properties.nomAffiche = zone?.nom ?? f.properties.shapeName
          }

          map.addSource('districts', { type: 'geojson', data })

          map.addLayer({
            id: 'districts-fill',
            type: 'fill',
            source: 'districts',
            paint: {
              'fill-color': [
                'match',
                ['get', 'niveau'],
                'rouge', niveauColor.rouge,
                'orange', niveauColor.orange,
                'jaune', niveauColor.jaune,
                niveauColor.vert,
              ],
              'fill-opacity': 0.75,
            },
          })
          map.addLayer({
            id: 'districts-line',
            type: 'line',
            source: 'districts',
            paint: { 'line-color': '#faf3e6', 'line-width': 1.4 },
          })
          map.addLayer({
            id: 'districts-selected',
            type: 'line',
            source: 'districts',
            paint: { 'line-color': '#151009', 'line-width': 3 },
            filter: ['==', ['get', 'shapeName'], selected ?? ''],
          })

          map.on('click', 'districts-fill', (e) => {
            const name = e.features?.[0]?.properties?.shapeName
            if (name) onSelect?.(name)
          })
          map.on('mouseenter', 'districts-fill', () => { map.getCanvas().style.cursor = 'pointer' })
          map.on('mouseleave', 'districts-fill', () => { map.getCanvas().style.cursor = '' })
        })
        .catch(() => setIndisponible(true))
    })

    return () => map.remove()
  }, [onSelect])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !map.getLayer('districts-selected')) return
    map.setFilter('districts-selected', ['==', ['get', 'shapeName'], selected ?? ''])
  }, [selected])

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
