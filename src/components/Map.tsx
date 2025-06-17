
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Default: NYC as center
const DEFAULT_CENTER = [-73.968285, 40.785091];

type PlayerMarker = {
  name: string;
  avatar: string;
  coords: { lng: number, lat: number };
};

interface MapProps {
  players?: PlayerMarker[];
  mapboxToken?: string;
}

const Map: React.FC<MapProps> = ({ players = [], mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: DEFAULT_CENTER,
      zoom: 12,
      attributionControl: false,
    });

    map.on("load", () => {
      setMapLoaded(true);

      // Clean up any previous markers
      (window as any).playerMarkers = (window as any).playerMarkers || [];

      (window as any).playerMarkers.forEach((m: any) => m.remove());
      (window as any).playerMarkers = [];

      players.forEach((player) => {
        const el = document.createElement("div");
        el.style.border = "2px solid #54a0ff";
        el.style.borderRadius = "100%";
        el.style.overflow = "hidden";
        el.style.width = "44px";
        el.style.height = "44px";
        el.style.boxShadow = "0 2px 8px rgba(60,60,90,.23)";
        el.style.background = "#fff";
        const img = new window.Image();
        img.src = player.avatar;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        el.appendChild(img);

        const marker = new mapboxgl.Marker(el)
          .setLngLat([player.coords.lng, player.coords.lat])
          .addTo(map);

        (window as any).playerMarkers.push(marker);
      });
    });

    // Clean up
    return () => {
      map.remove();
    };
  }, [mapboxToken, players]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 w-full h-full rounded-lg" />
      {!mapboxToken && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50 rounded-lg">
          <div className="text-white mb-4">
            Please enter your Mapbox public token below to display the map.
            <br />
            <a
              href="https://account.mapbox.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-300"
            >
              Get a token
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
