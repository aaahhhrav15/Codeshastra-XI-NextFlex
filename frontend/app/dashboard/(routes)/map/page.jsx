'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import MapComponent to prevent SSR issues
const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });

const MapsPage = () => {
  // You can pass coordinates as props if needed
  const sourceCoords = { lat: 19.1073, lng:72.8371 }; 
  const destCoords = { lat: 18.7557, lng: 73.4091 };   // Los Angeles

  return (
    <div style={{ padding: '1rem' }}>
      <h1 className="text-2xl font-semibold mb-4">Map Route</h1>
      <MapComponent sourceCoords={sourceCoords} destCoords={destCoords} />
    </div>
  );
};

export default MapsPage;
