
import React, { useEffect, useRef } from 'react';
import { Asset } from '../types';
import L from 'leaflet';

interface MapViewProps {
  assets: Asset[];
  selectedAsset: Asset | null;
  onMarkerClick: (asset: Asset) => void;
  hoveredAssetId: number | null;
  showSidebar: boolean;
}

const MapView: React.FC<MapViewProps> = ({ assets, selectedAsset, onMarkerClick, hoveredAssetId, showSidebar }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: number]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([30.657, 104.066], 11);

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

  useEffect(() => {
    if (!mapRef.current) return;

    Object.values(markersRef.current).forEach((m: any) => m.remove());
    markersRef.current = {};

    assets.forEach(asset => {
      const coords = asset.geometry.split(',').map(c => parseFloat(c.trim()));
      if (coords.length !== 2) return;

      const markerColor = asset.空置程度标签 === '高' ? '#f43f5e' : asset.空置程度标签 === '中' ? '#f59e0b' : '#10b981';
      const isHighlighted = hoveredAssetId === asset.序号 || selectedAsset?.序号 === asset.序号;
      
      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="
          background-color: ${markerColor};
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1.5px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          ${isHighlighted ? 'transform: scale(2.5); box-shadow: 0 0 15px ' + markerColor + '60;' : ''}
        "></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5]
      });

      const marker = L.marker([coords[0], coords[1]], { icon })
        .addTo(mapRef.current!)
        .on('click', () => onMarkerClick(asset));
      
      markersRef.current[asset.序号] = marker;
    });

    if (selectedAsset) {
      const coords = selectedAsset.geometry.split(',').map(c => parseFloat(c.trim()));
      const isMobile = window.innerWidth < 768;
      
      let lngOffset = 0;
      let latOffset = 0;

      if (!isMobile) {
        // 卡片变宽（260px），偏移量调大
        const sidebarWeight = showSidebar ? 0.007 : 0;
        const detailsWeight = -0.011; 
        lngOffset = sidebarWeight + detailsWeight;
      } else {
        latOffset = -0.006; 
      }

      mapRef.current.setView(
        [coords[0] + latOffset, coords[1] - lngOffset], 
        15, 
        { animate: true }
      );
    }
  }, [assets, selectedAsset, hoveredAssetId, onMarkerClick, showSidebar]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default MapView;
