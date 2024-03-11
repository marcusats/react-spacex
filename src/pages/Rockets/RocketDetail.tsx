import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { RocketData } from '../../types/rocket';
import NotFound from '../NotFound';



const RocketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [rocket, setRocket] = useState<RocketData | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchRocket = async () => {
      try {
        const response = await axios.get(`https://api.spacexdata.com/v4/rockets/${id}`);
        setRocket(response.data);
      } catch (error) {
        setNotFound(true);
        console.log('Error fetching rocket data:', error);
      }
    };

    fetchRocket();
  }, [id]);

  if (!rocket) {
    if (!notFound) {
      return <div>Loading...</div>;
    }
    return <NotFound />;
  }

  const imagesToShow = rocket.flickr_images.length > 0 ? rocket.flickr_images : ['https://via.placeholder.com/150'];

  return (
    <div className="max-w-4xl p-4 mx-auto space-y-2">
      <h1 className="text-2xl font-bold">{rocket.name}</h1>
      <Carousel autoPlay infiniteLoop showThumbs={false}>
        {imagesToShow.map((imgUrl, index) => (
          <div key={index}>
            <img src={imgUrl} alt={`Rocket View ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      <div className="my-4">
        <p>{rocket.description}</p>
        <p><strong>Height:</strong> {rocket.height.meters} meters / {rocket.height.feet} feet</p>
        <p><strong>Diameter:</strong> {rocket.diameter.meters} meters / {rocket.diameter.feet} feet</p>
        <p><strong>Mass:</strong> {rocket.mass.kg} kg / {rocket.mass.lb} lbs</p>
        <p><strong>First Stage Thrust (sea level):</strong> {rocket.first_stage.thrust_sea_level.kN} kN / {rocket.first_stage.thrust_sea_level.lbf} lbf</p>
        <p><strong>First Stage Thrust (vacuum):</strong> {rocket.first_stage.thrust_vacuum.kN} kN / {rocket.first_stage.thrust_vacuum.lbf} lbf</p>
        <p><strong>First Stage Reusable:</strong> {rocket.first_stage.reusable ? 'Yes' : 'No'}</p>
        <p><strong>Second Stage Thrust:</strong> {rocket.second_stage.thrust.kN} kN / {rocket.second_stage.thrust.lbf} lbf</p>
        <p><strong>Number of Engines:</strong> {rocket.engines.number}</p>
        <p><strong>Engine Type:</strong> {rocket.engines.type} {rocket.engines.version}</p>
        <p><strong>Landing Legs:</strong> {rocket.landing_legs.number}, Material: {rocket.landing_legs.material || 'N/A'}</p>
        <p><strong>Active:</strong> {rocket.active ? 'Yes' : 'No'}</p>
        <p><strong>Stages:</strong> {rocket.stages}</p>
        <p><strong>Boosters:</strong> {rocket.boosters}</p>
        <p><strong>Cost per Launch:</strong> ${rocket.cost_per_launch.toLocaleString()}</p>
        <p><strong>Success Rate:</strong> {rocket.success_rate_pct}%</p>
        <p><strong>First Flight:</strong> {rocket.first_flight}</p>
        <p><strong>Country:</strong> {rocket.country}</p>
        <p><strong>Company:</strong> {rocket.company}</p>
      </div>
      <a href={rocket.wikipedia} target="_blank" rel="noopener noreferrer" className="text-blue-600">Learn more on Wikipedia</a>
    </div>
  );
  
};

export default RocketDetail;
