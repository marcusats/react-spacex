import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Payload } from '../../types/items';
import NotFound from '../NotFound';


const PayloadDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [payload, setPayload] = useState<Payload | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPayload = async () => {
      try {
        const response = await axios.get(`https://api.spacexdata.com/v4/payloads/${id}`);
        setPayload(response.data);
      } catch (error) {
        setNotFound(true);
        console.log('Error fetching payload data:', error);
      }
    };

    fetchPayload();
  }, [id]);

  if (!payload) {
    if (!notFound) {
      return <div>Loading...</div>;
    }
    return <NotFound />;
  }

  return (
    <div className="max-w-4xl p-4 mx-auto space-y-2">
      <h1 className="text-2xl font-bold">{payload.name}</h1>
      <p>Type: {payload.type}</p>
      <p>Reused: {payload.reused ? 'Yes' : 'No'}</p>
      <p>Mass: {payload.mass_kg} kg / {payload.mass_lbs} lbs</p>
      <p>Orbit: {payload.orbit}</p>
      <p>Customers: {payload.customers.join(', ')}</p>
      <p>Nationalities: {payload.nationalities.join(', ')}</p>
      <p>Manufacturers: {payload.manufacturers.join(', ')}</p>

    </div>
  );
};

export default PayloadDetail;
