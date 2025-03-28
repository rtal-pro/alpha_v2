"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect } from "react"

// Custom marker icon using --color-secondary
const customIcon = new L.DivIcon({
  html: '<div style="background-color: var(--color-secondary); width: 14px; height: 14px; border-radius: 9999px; border: 2px solid white;"></div>',
  className: "",
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

interface Props {
  clusterId: string
}

const buildings = [
  {
    id: "b1",
    name: "Bâtiment A",
    coords: [48.8534, 2.3488],
  },
  {
    id: "b2",
    name: "Bâtiment B",
    coords: [48.851, 2.35],
  },
]

function AutoZoom() {
  const map = useMap()

  useEffect(() => {
    const bounds = L.latLngBounds(buildings.map((b) => b.coords as [number, number]))
    map.fitBounds(bounds, { padding: [30, 30] })
  }, [map])

  return null
}

export default function ClusterMap({ clusterId }: Props) {
  return (
    <MapContainer
      center={[48.8534, 2.3488]}
      zoom={14}
      scrollWheelZoom={false}
      className="h-full w-full z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {buildings.map((b) => (
        <Marker key={b.id} position={b.coords as [number, number]} icon={customIcon}>
          <Popup>{b.name}</Popup>
        </Marker>
      ))}
      <AutoZoom />
    </MapContainer>
  )
}
