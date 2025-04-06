'use client';

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const PopularPlacesMap = ({ coordinates }) => {
  const [popularPlaces, setPopularPlaces] = useState([]);
  const [selectedPlaceIndex, setSelectedPlaceIndex] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchPopularPlaces = () => {
    const dummyData = {
      places: [
        {
          name: 'Gateway of India',
          address_line2: 'Colaba, Mumbai',
          lat: 18.921984,
          lon: 72.834654,
        },
        {
          name: 'Marine Drive',
          address_line2: 'South Mumbai',
          lat: 18.9437,
          lon: 72.8236,
        },
        {
          name: 'Siddhivinayak Temple',
          address_line2: 'Prabhadevi, Mumbai',
          lat: 19.0176,
          lon: 72.8305,
        },
      ],
    };
    setPopularPlaces(dummyData.places);
    setButtonClicked(true);
  };

  const handleMapClick = () => {
    setSelectedPlaceIndex(null);
  };

  return (
    <div className="relative w-full h-[500px]">
      {/* Floating Button - only show if not clicked */}
      {!buttonClicked && (
        <button
          onClick={fetchPopularPlaces}
          className="absolute top-4 right-4 z-[1000] bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          style={{ zIndex: 1000 }}
        >
          Explore More Places
        </button>
      )}

      {/* Map itself */}
      <MapContainer
        center={[coordinates.lat, coordinates.lon]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full rounded z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onClick={handleMapClick} />

        <Marker position={[coordinates.lat, coordinates.lon]}>
          <Popup>Your location</Popup>
        </Marker>

        {popularPlaces.map((place, index) => (
          <Marker
            key={index}
            position={[place.lat, place.lon]}
            eventHandlers={{
              click: () => {
                setSelectedPlaceIndex(index);
              },
            }}
          >
            {selectedPlaceIndex === index && (
              <Popup>
                <div>
                  <h3 className="font-semibold">{place.name}</h3>
                  <p className="text-sm">{place.address_line2}</p>
                  <p className="text-yellow-500">
                    {'★'.repeat(Math.floor(Math.random() * (5 - 2.6) + 2.6))}
                  </p>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

const MapClickHandler = ({ onClick }) => {
  useMapEvents({
    click: () => onClick(),
  });
  return null;
};

export default PopularPlacesMap;