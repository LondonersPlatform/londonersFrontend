"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { createRoot, Root } from "react-dom/client";

interface Props {
  location: {
    title: string;
    description: string;
    walkingDistances: string[];
    coordinates: string; // "lat,lng"
  };
  imagesDummy?: string[];
  listingId?: string;
  loading?: boolean;
  properties_List?: any;
}

function MapAutoCenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], 15);
  }, [lat, lng]);

  return null;
}

export function PropertyLocation({
  location,
  imagesDummy,
  listingId,
  properties_List,
}: Props) {
  const [lat, lng] = location.coordinates.split(",").map(Number);
  const [properties, setProperties] = useState<any[]>([]);

  const markerRef = useRef(document.createElement("div"));
  const reactRootRef = useRef<Root | null>(null); // 🟡 Fix: store React root

  useEffect(() => {
    const target = properties_List?.target_listing;
    const nearby = properties_List?.nearby_listings || [];

    const allListings = [
      {
        id: target?.listing_id,
        latitude: target?.latitude,
        longitude: target?.longitude,
        imageUrl:
          target?.pictures?.[0]?.thumbnail ?? imagesDummy?.[0] ?? null,
        title: target?.title ?? "Target Listing",
        rating: target?.overall_average_rating ?? "no rating",
        details: {
          beds: target?.beds ?? 0,
          baths: target?.bathrooms ?? 0,
          kitchens: 1,
        },
        isFavorite: target?.isFavorite,
        area: target?.location?.city ?? "Unknown",
        price: target?.price_per_night?.base_price ?? 0,
        guests: target?.guests ?? 1,
        isMain: true,
      },
      ...nearby
        .filter(
          (listing: any) =>
            listing.latitude && listing.longitude && !listing.error
        )
        .map((listing: any) => ({
          id: listing.listing_id,
          latitude: listing.latitude,
          longitude: listing.longitude,
          imageUrl: listing?.pictures?.[0]?.thumbnail ?? null,
          title: listing.title ?? "Untitled Listing",
          rating: listing.overall_average_rating ?? "no rating",
          details: {
            beds: listing.beds ?? 0,
            baths: listing.bathrooms ?? 0,
            kitchens: 1,
          },
          isFavorite: listing.isFavorite,
          area: listing.location?.city ?? "Unknown",
          price: listing.price_per_night?.base_price ?? 0,
          guests: listing.guests ?? 1,
          isMain: false,
        })),
    ];

    setProperties(allListings);

    // 🟡 Only create root once
    if (markerRef.current) {
      if (!reactRootRef.current) {
        reactRootRef.current = createRoot(markerRef.current);
      }

      reactRootRef.current.render(
        <div
          style={{
            width: 72,
            height: 90,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid #3b82f6",
              boxShadow: "0 0 12px rgba(59, 130, 246, 0.6)",
              backgroundColor: "#eee",
              zIndex: 2,
            }}
          >
            <img
              src={imagesDummy?.[0] ?? ""}
              alt="property"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: 48,
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "14px solid #3b82f6",
              zIndex: 1,
              filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.2))",
            }}
          />
        </div>
      );
    }
  }, [properties_List, imagesDummy]);

  const customIcon = L.divIcon({
    html: markerRef.current,
    className: "",
    iconSize: [72, 90],
    iconAnchor: [36, 90],
  });

  const createCustomIcon = (imageUrl: string | null) =>
    L.divIcon({
      html: `
        <div style="width: 64px; height: 80px; position: relative; display: flex; justify-content: center; align-items: flex-start;">
          <div style="width: 48px; height: 48px; border-radius: 50%; overflow: hidden; border: 3px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.3); background-color: #eee; z-index: 2;">
            <img src="${imageUrl ?? ""}" alt="property" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <div style="position: absolute; top: 40px; width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 14px solid red; z-index: 1; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));"></div>
        </div>
      `,
      className: "",
      iconSize: [64, 80],
      iconAnchor: [32, 80],
    });

  return (
    <div className="relative z-0 space-y-6 mt-8 mb-8">
      <h2 className="text-xl font-semibold">{location.title}</h2>

      <div className="space-y-4">
        <p className="text-gray-700">{location.description}</p>
        <ul className="space-y-2 text-gray-700">
          {location?.walkingDistances?.map((distance, index) => (
            <li key={index}>{distance}</li>
          ))}
        </ul>
      </div>

      <MapContainer
        center={[lat, lng]}
        zoom={30}
        minZoom={14}
        maxZoom={18}
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
        }}
        scrollWheelZoom={false}
      >
        <MapAutoCenter lat={lat} lng={lng} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.latitude, property.longitude]}
            icon={
              property.isMain
                ? customIcon
                : createCustomIcon(property.imageUrl)
            }
          >
            <Tooltip direction="top" offset={[0, -80]} permanent={property.isMain}>
              {property.isMain ? `🎯 ${property.title}` : property.title}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
