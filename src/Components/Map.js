import React, { useState } from 'react';
import { MapContainer, TileLayer, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapBox = ({ onBoundingBoxChange }) => {
  const [bounds, setBounds] = useState([
    [37.7749, -122.4194], // Initial top-left corner [lat, lon]
    [34.0522, -118.2437] // Initial bottom-right corner [lat, lon]
  ]);

  const handleBoundsChange = (event) => {
    const { _southWest, _northEast } = event.target.getBounds();
    const boundingBox = {
      bottom_left: { lat: _southWest.lat, lon: _southWest.lng },
      top_right: { lat: _northEast.lat, lon: _northEast.lng }
    };
    setBounds([
      [_northEast.lat, _southWest.lng],
      [_southWest.lat, _northEast.lng]
    ]);
    onBoundingBoxChange(boundingBox);
  };

  return (
    <MapContainer
      center={[36.7783, -119.4179]}
      zoom={6}
      style={{ height: '400px', width: '100%' }}
      whenCreated={(map) => map.on('moveend', handleBoundsChange)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Rectangle bounds={bounds} />
    </MapContainer>
  );
};

export default MapBox;
