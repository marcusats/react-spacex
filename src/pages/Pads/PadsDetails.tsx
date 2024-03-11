import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import NotFound from '../NotFound';

interface Launchpad {
  name: string;
  full_name: string;
  locality: string;
  region: string;
  timezone: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  rockets: string[];
  launches: string[];
  status: string;
  id: string;
}

const PadsDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [launchpad, setLaunchpad] = useState<Launchpad | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchLaunchpad = async () => {
      try {
        const response = await axios.get(`https://api.spacexdata.com/v4/launchpads/${id}`);
        setLaunchpad(response.data);
      } catch (error) {
        setNotFound(true);
        console.log('Error fetching launchpad data:', error);
      }
    };

    fetchLaunchpad();
  }, [id]);

  if (!launchpad) {
    if (!notFound) {
      return <div>Loading...</div>;
    }
    return <NotFound/>;
  }

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <h1 className="text-2xl font-bold">{launchpad.name}</h1>
      <p className="text-lg">{launchpad.full_name}</p>
      <p>{launchpad.locality}, {launchpad.region}</p>
      <p>Timezone: {launchpad.timezone}</p>
      <p>Launch Attempts: {launchpad.launch_attempts}</p>
      <p>Launch Successes: {launchpad.launch_successes}</p>
      <p>Status: {launchpad.status}</p>
      <div className="h-64 mt-4">
        <MapContainer
        // @ts-ignore
          center={[launchpad.latitude, launchpad.longitude]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // @ts-ignore
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[launchpad.latitude, launchpad.longitude]}></Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default PadsDetails;
