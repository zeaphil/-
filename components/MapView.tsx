import React, { useEffect, useRef } from 'react';
import { Asset } from '../types';
import L from 'leaflet';

interface MapViewProps {
  assets: Asset[];
  selectedAsset: Asset | null;
  onMarkerClick: (asset: Asset) => void;
  hoveredAssetId: number | null;
}

const MapView: React.FC<MapViewProps> = ({ assets, selectedAsset, onMarkerClick, hoveredAssetId }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: number]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map centered on Chengdu
    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([30.657, 104.066], 12);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(mapRef.current);

    L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Sync markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    // Fix: Explicitly type 'm' as 'L.Marker' to avoid 'unknown' type errors during compilation.
    Object.values(markersRef.current).forEach((m: L.Marker) => m.remove());
    markersRef.current = {};

    assets.forEach(asset => {
      const coords = asset.geometry.split(',').map(c => parseFloat(c.trim()));
      if (coords.length !== 2) return;

      const markerColor = asset.空置程度标签 === '高' ? '#ef4444' : asset.空置程度标签 === '中' ? '#f59e0b' : '#10b981';
      
      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="
          background-color: ${markerColor};
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          transition: all 0.2s ease-in-out;
          ${hoveredAssetId === asset.序号 || selectedAsset?.序号 === asset.序号 ? 'transform: scale(1.6); ring: 4px;' : ''}
        "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });

      const marker = L.marker([coords[0], coords[1]], { icon })
        .addTo(mapRef.current!)
        .on('click', () => onMarkerClick(asset));
      
      markersRef.current[asset.序号] = marker;
    });

    // If focused on an asset, pan to it
    if (selectedAsset) {
      const coords = selectedAsset.geometry.split(',').map(c => parseFloat(c.trim()));
      mapRef.current.setView([coords[0], coords[1]], 14, { animate: true });
    }
  }, [assets, selectedAsset, hoveredAssetId, onMarkerClick]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default MapView;