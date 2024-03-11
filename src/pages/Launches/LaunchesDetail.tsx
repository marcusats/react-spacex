import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Make sure to import the CSS
import NotFound from '../NotFound';


interface LaunchData {
    fairings: null | object;
    links: {
        patch: { small: string; large: string };
        reddit: { campaign: string; launch: string; media: string; recovery: string | null };
        flickr: { small: string[]; original: string[] };
        presskit: string;
        webcast: string;
        youtube_id: string;
        article: string;
        wikipedia: string;
    };
    static_fire_date_utc: string;
    rocket: string;
    success: boolean;
    details: string;
    flight_number: number;
    name: string;
    date_utc: string;
    cores: Array<any>;
}


const LaunchDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [launch, setLaunch] = useState<LaunchData | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);

    useEffect(() => {
        const fetchLaunch = async () => {
            try {
                const response = await axios.get(`https://api.spacexdata.com/v4/launches/${id}`);
                console.log('Launch:', response.data);
                setLaunch(response.data);
            } catch (error) {
                setNotFound(true);
                console.log('Error fetching launch data:', error);
            }
        };

        fetchLaunch();
    }, [id]);

    if (!launch) {
        if (!notFound) {
            return <div>Loading...</div>;
        }
        return <NotFound/>;
    }


    const images = [
        ...launch.links.flickr.original,
        launch.links.patch.large
    ].filter(Boolean); 


    const imagesToShow = images.length > 0 ? images : ['https://via.placeholder.com/150'];

    return (
        <div className="w-[100vw] items-center ">
            <div className="relative flex-row">
                <h1 className="text-2xl font-bold">{launch.name}</h1>
                <div className="w-[100%] flex items-center">
                    <Carousel className='w-[350px]' autoPlay infiniteLoop showThumbs={false}>
                        {imagesToShow.map((imgUrl, index) => (
                            <div key={index}>
                                <img src={imgUrl} alt={`Launch View ${index + 1}`} />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <p>Flight Number: {launch.flight_number}</p>
                <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
                <p>Details: {launch.details}</p>
                <p>Success: {launch.success ? 'Yes' : 'No'}</p>
                <a href={launch.links.wikipedia} target="_blank" rel="noopener noreferrer" className="text-blue-600">Wikipedia</a>
                <div className="mt-4">
                    <a href={launch.links.webcast} target="_blank" rel="noopener noreferrer" className="text-blue-600">Watch Webcast</a>
                </div>
            </div>
        </div>
    );
};

export default LaunchDetail;
