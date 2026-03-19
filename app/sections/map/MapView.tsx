"use client";

import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { HOTEL, POIS, type POI } from "./data";
import "leaflet/dist/leaflet.css";

// Numa hotel marker — black pin with "N" letter
const hotelIcon = L.divIcon({
  className: "",
  html: `<svg width="40" height="53" viewBox="0 0 56 74" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_f_5707_126424)">
<ellipse cx="28.0003" cy="67.0625" rx="9.33333" ry="4.625" fill="black" fill-opacity="0.12"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M41.8045 46.3959C47.5832 42.1867 51.3337 35.4024 51.3337 27.75C51.3337 14.9784 40.887 4.625 28.0003 4.625C15.1137 4.625 4.66699 14.9784 4.66699 27.75C4.66699 35.4025 8.41755 42.1868 14.1963 46.396C18.5853 49.6736 24.7711 54.8432 26.1984 63.1627C26.3511 64.0526 27.0974 64.743 28.0003 64.743V50.875L28.0003 64.743C28.9032 64.743 29.6495 64.0526 29.8022 63.1627C31.2296 54.8431 37.4155 49.6735 41.8045 46.3959Z" fill="#191919"/>
<path d="M23.9668 18.9868L29.8305 29.4903C30.6704 31.0867 31.3686 32.4662 31.9093 33.5046C31.8568 32.0167 31.8306 30.4461 31.8306 28.6895V18.9868H35.3687V37.9737H30.6127L25.1847 28.426C24.1872 26.4059 23.2108 24.732 22.6439 23.585C22.6964 25.0213 22.6964 27.0414 22.6964 28.7721V37.9737H19.1582V18.9868H23.9668Z" fill="#FFC9D2"/>
<defs>
<filter id="filter0_f_5707_126424" x="16.667" y="60.4375" width="22.667" height="13.25" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_5707_126424"/>
</filter>
</defs>
</svg>`,
  iconSize: [40, 53],
  iconAnchor: [20, 53],
});

// POI marker — small circle
function poiIcon(selected: boolean) {
  const size = selected ? 20 : 14;
  const color = selected ? "#191919" : "#6D706F";
  return L.divIcon({
    className: "",
    html: `<div style="
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:${color};
      border:2px solid #fff;
      box-shadow:0 2px 6px rgba(0,0,0,0.3);
      transition:all 0.2s;
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

type LatLng = [number, number];

async function fetchWalkingRoute(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
): Promise<LatLng[]> {
  const url = `https://router.project-osrm.org/route/v1/foot/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.code !== "Ok" || !data.routes?.[0]) {
    throw new Error("OSRM routing failed");
  }
  // GeoJSON coordinates are [lng, lat] — flip to [lat, lng] for Leaflet
  return data.routes[0].geometry.coordinates.map(
    ([lng, lat]: [number, number]) => [lat, lng] as LatLng
  );
}

function WalkingRoute({ poi }: { poi: POI }) {
  const routeCache = useRef<Map<string, LatLng[]>>(new Map());
  const [route, setRoute] = useState<LatLng[] | null>(null);

  useEffect(() => {
    const cached = routeCache.current.get(poi.id);
    if (cached) {
      setRoute(cached);
      return;
    }

    let cancelled = false;
    fetchWalkingRoute(poi, HOTEL).then(
      (coords) => {
        if (cancelled) return;
        routeCache.current.set(poi.id, coords);
        setRoute(coords);
      },
      () => {
        // Fallback to straight line on error
        if (!cancelled) {
          setRoute([
            [poi.lat, poi.lng],
            [HOTEL.lat, HOTEL.lng],
          ]);
        }
      }
    );

    return () => {
      cancelled = true;
    };
  }, [poi]);

  // Show straight line while loading, then the real route
  const positions: LatLng[] = route ?? [
    [poi.lat, poi.lng],
    [HOTEL.lat, HOTEL.lng],
  ];

  return (
    <Polyline
      positions={positions}
      pathOptions={{
        color: "#000",
        weight: 2,
        dashArray: "6,6",
      }}
    />
  );
}

function FitSelection({ selectedId }: { selectedId: string | null }) {
  const map = useMap();
  useEffect(() => {
    const selected = POIS.find((p) => p.id === selectedId);
    if (selected) {
      const bounds = L.latLngBounds([
        [HOTEL.lat, HOTEL.lng],
        [selected.lat, selected.lng],
      ]);
      map.fitBounds(bounds, {
        padding: [80, 60],
        paddingBottomRight: [60, 200],
        animate: true,
        duration: 0.5,
      });
    } else {
      const bounds = L.latLngBounds([[HOTEL.lat, HOTEL.lng]]);
      POIS.forEach((p) => bounds.extend([p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [60, 60], animate: true, duration: 0.5 });
    }
  }, [map, selectedId]);
  return null;
}

export default function MapView({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const selected = POIS.find((p) => p.id === selectedId) ?? null;

  return (
    <MapContainer
      center={[HOTEL.lat, HOTEL.lng]}
      zoom={14}
      style={{ width: "100%", height: "100%" }}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      <FitSelection selectedId={selectedId} />

      {/* Hotel marker */}
      <Marker position={[HOTEL.lat, HOTEL.lng]} icon={hotelIcon} />

      {/* POI markers */}
      {POIS.map((poi) => (
        <Marker
          key={poi.id}
          position={[poi.lat, poi.lng]}
          icon={poiIcon(poi.id === selectedId)}
          eventHandlers={{
            click: () => onSelect(poi.id === selectedId ? null : poi.id),
          }}
        />
      ))}

      {/* Walking route from selected POI to hotel */}
      {selected && <WalkingRoute poi={selected} />}
    </MapContainer>
  );
}
