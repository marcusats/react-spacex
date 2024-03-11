
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NotFound from '../NotFound';

interface Core {
  block: number | null;
  reuse_count: number;
  rtls_attempts: number;
  rtls_landings: number;
  asds_attempts: number;
  asds_landings: number;
  last_update: string;
  launches: string[];
  serial: string;
  status: string;
  id: string;
}

const CoreDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [core, setCore] = useState<Core | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchCore = async () => {
      try {
        const response = await axios.get(`https://api.spacexdata.com/v4/cores/${id}`);
        console.log('Core:', response.data);
        setCore(response.data);
      } catch (error) {
        setNotFound(true);
        console.log('Error fetching core data:', error);
      }
    };

    fetchCore();
  }, [id]);

  if (!core) {
    if (!notFound) {
      return <div>Loading...</div>;
    }
    return <NotFound/>;
  }

  return (
    <div className="max-w-4xl p-4 mx-auto space-y-2">
      <h1 className="text-2xl font-bold">Core Serial: {core.serial}</h1>
      <p>Block: {core.block}</p>
      <p>Reuse Count: {core.reuse_count}</p>
      <p>RTLS Attempts: {core.rtls_attempts}</p>
      <p>RTLS Landings: {core.rtls_landings}</p>
      <p>ASDS Attempts: {core.asds_attempts}</p>
      <p>ASDS Landings: {core.asds_landings}</p>
      <p>Last Update: {core.last_update}</p>
      <p>Status: {core.status}</p>
      <div>
        <h2 className="text-xl font-semibold">Launches:</h2>
        <ul>
          {core.launches.map((launchId) => (
            <li key={launchId}>
              <a href={`/launches/${launchId}`}> {launchId} </a>  
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoreDetail;
