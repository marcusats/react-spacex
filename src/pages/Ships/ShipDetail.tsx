import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NotFound from '../NotFound';


interface Ship {
  legacy_id: string;
  model: string | null;
  type: string;
  roles: string[];
  imo: number;
  mmsi: number;
  abs: number;
  class: number;
  mass_kg: number;
  mass_lbs: number;
  year_built: number;
  home_port: string;
  status: string;
  speed_kn: number | null;
  course_deg: number | null;
  latitude: number | null;
  longitude: number | null;
  last_ais_update: string | null;
  link: string;
  image: string;
  launches: string[];
  name: string;
  active: boolean;
  id: string;
}

const ShipDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ship, setShip] = useState<Ship | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchShip = async () => {
      try {
        const response = await axios.get(`https://api.spacexdata.com/v4/ships/${id}`);
        setShip(response.data);
      } catch (error) {
        setNotFound(true);
        console.log('Error fetching ship data:', error);
      }
    };

    fetchShip();
  }, [id]);

  if (!ship) {
    if (!notFound) {
      return <div>Loading...</div>;
    }
    return <NotFound/>;
  }

  return (
    <div className="max-w-4xl p-4 mx-auto space-y-2">
      <h1 className="text-2xl font-bold">{ship.name ? ship.name : ""}</h1>
      <img src={(ship.image) ? ship.image : "https://www.spacex.com/static/images/share.jpg" } alt={ship.name} className="w-full max-w-md mx-auto"/>
      <div>Type: {ship.type ? ship.type : ""}</div>
      <div>Roles: {ship.roles.length > 0 ? ship.roles.join(', ') : ""}</div>
      <div>IMO: {ship.imo ? ship.imo : ""}</div>
      <div>MMSI: {ship.mmsi ? ship.mmsi : ""}</div>
      <div>Mass (kg): {ship.mass_kg ? ship.mass_kg.toLocaleString() : ""}</div>
      <div>Year Built: {ship.year_built ? ship.year_built : ""}</div>
      <div>Home Port: {ship.home_port ? ship.home_port : ""}</div>
      <div>Status: {ship.status ? ship.status : 'N/A'}</div>
      <a href={ship.link} target="_blank" rel="noopener noreferrer" className="text-blue-600">MarineTraffic Link</a>
    </div>
  );
};

export default ShipDetail;
