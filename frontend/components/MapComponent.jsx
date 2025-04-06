import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

const DEFAULT_ICON = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DEFAULT_ICON;

const MapComponent = ({ sourceCoords, destCoords }) => {
  const [map, setMap] = useState(null);

  const source = sourceCoords || { lat: 19.1073, lng: 72.8371 }; // San Francisco
  const destination = destCoords || { lat: 18.7557, lng: 73.4091 }; // Los Angeles

  useEffect(() => {
    const mapContainer = document.getElementById('map');

    // Only initialize map if not already present
    if (!map && mapContainer && !mapContainer._leaflet_id) {
      const leafletMap = L.map('map').setView(
        [
          (source.lat + destination.lat) / 2,
          (source.lng + destination.lng) / 2
        ],
        7
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap);

      setMap(leafletMap);
    }

    if (map) {
      // Remove previous non-tile layers
      map.eachLayer((layer) => {
        if (!(layer instanceof L.TileLayer)) {
          map.removeLayer(layer);
        }
      });

      const sourceMarker = L.marker([source.lat, source.lng]).addTo(map);
      sourceMarker.bindPopup("Source Location").openPopup();

      const destMarker = L.marker([destination.lat, destination.lng]).addTo(map);
      destMarker.bindPopup("Destination Location");

      L.Routing.control({
        waypoints: [
          L.latLng(source.lat, source.lng),
          L.latLng(destination.lat, destination.lng)
        ],
        routeWhileDragging: true,
        showAlternatives: true,
        altLineOptions: {
          styles: [
            { color: 'black', opacity: 0.15, weight: 9 },
            { color: 'white', opacity: 0.8, weight: 6 },
            { color: 'blue', opacity: 0.5, weight: 2 }
          ]
        }
      }).addTo(map);

      const bounds = L.latLngBounds(
        L.latLng(source.lat, source.lng),
        L.latLng(destination.lat, destination.lng)
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map, source, destination]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div id="map" style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
};

export default MapComponent;
