import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow });
L.Marker.prototype.options.icon = DefaultIcon;

const socket = io(import.meta.env.VITE_BACKEND_URL);

// Component to update map bounds dynamically
function FitBounds({ users }) {
  const map = useMap();

  useEffect(() => {
    const positions = Object.values(users).map((u) => [u.lat, u.lng]);
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [users, map]);

  return null;
}

function App() {
  const [users, setUsers] = useState({});
  const [myPosition, setMyPosition] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    socket.on("users", (data) => setUsers(data));
    return () => socket.off("users");
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setMyPosition([coords.lat, coords.lng]);
          socket.emit("location", coords);
          setMapReady(true);
        },
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation not available.");
    }
  }, []);

  if (!mapReady) return <p className="p-4 text-center">Loading map...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full bg-indigo-600 p-4 text-white text-center shadow-md">
        <h1 className="text-xl font-bold">Real-Time Tracking App</h1>
      </header>

      <main className="flex-1 w-full flex justify-center items-center p-4">
        <MapContainer
          center={myPosition}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-[80vh] rounded-2xl shadow-lg border border-gray-300"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          />

          {Object.entries(users).map(([id, u]) => (
            <Marker
              key={id}
              position={[u.lat, u.lng]}
              icon={L.icon({
                iconUrl,
                shadowUrl: iconShadow,
                iconAnchor: [12, 41],
                popupAnchor: [0, -41],
                className: "user-marker",
                // Use the user’s color
              })}
            >
              <Popup>{id === socket.id ? "You" : `User ${id}`}</Popup>
            </Marker>
          ))}

          <FitBounds users={users} />
        </MapContainer>
      </main>

      <footer className="w-full bg-indigo-600 p-3 text-center text-white">
        <p className="text-sm">
          Powered by React + Leaflet + Tailwind + Socket.IO
        </p>
      </footer>
    </div>
  );
}

export default App;
