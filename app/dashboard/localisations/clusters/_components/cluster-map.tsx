"use client"

import { Cluster } from "@/types"
import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Correction des icônes Leaflet dans Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
})

const FRANCE_BOUNDS = {
  minLat: 41.0,
  maxLat: 51.5,
  minLng: -5.0,
  maxLng: 9.5,
}

interface Props {
  cluster: Cluster
}

export function ClusterMap({ cluster }: Props) {
  const buildings = (cluster.buildings || []).filter((b) => {
    const [lat, lng] = b.gps.split(",").map(Number)
    return (
      lat >= FRANCE_BOUNDS.minLat &&
      lat <= FRANCE_BOUNDS.maxLat &&
      lng >= FRANCE_BOUNDS.minLng &&
      lng <= FRANCE_BOUNDS.maxLng
    )
  })

  const center: [number, number] = buildings.length
    ? buildings[0].gps.split(",").map(Number) as [number, number]
    : [48.8566, 2.3522] // fallback Paris

  return (
    <div className='h-96 rounded overflow-hidden'>  
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={true}
        className="h-full w-full"
        attributionControl={false}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        />
        {buildings.map((b) => {
          const [lat, lng] = b.gps.split(",").map(Number)
          return (
            <Marker key={b.id} position={[lat, lng]}>
              <Popup>
                <strong>{b.name}</strong>
                <br />{b.address}
                <br />{b.spots.length} spot(s)
              </Popup>
              <Tooltip direction="top" offset={[0, -10]}>{b.name}</Tooltip>
              <Circle
                center={[lat, lng]}
                radius={30 + b.spots.length * 5}
                pathOptions={{ color: "var(--color-secondary)", fillOpacity: 0.2 }}
              />
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
