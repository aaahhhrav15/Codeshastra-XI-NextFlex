'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

export default function MapWrapper({ coordinates }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Fix Leaflet icons
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/images/marker-icon-2x.png',
        iconUrl: '/images/marker-icon.png',
        shadowUrl: '/images/marker-shadow.png',
      });
    }
  }, []);

  if (!isClient || !coordinates) {
    return (
      <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lon]}
      zoom={13}
      className="h-full w-full rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={[coordinates.lat, coordinates.lon]}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
  );
}