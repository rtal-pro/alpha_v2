"use client"

import { Cluster } from "@/types"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Correction des icônes Leaflet dans Next.js (optionnel selon build)
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
})

interface Props {
  cluster: Cluster
}

export function ClusterMap({ cluster }: Props) {
  const buildings = cluster.buildings || []

  const center: [number, number] = buildings.length
    ? buildings[0].gps.split(",").map(Number) as [number, number]
    : [48.8566, 2.3522] // fallback Paris

  return (
    <div className="h-64 rounded overflow-hidden">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="h-full w-full">
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
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}