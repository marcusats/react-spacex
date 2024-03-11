import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cards from '../../componnets/Cards';
import { Entity } from '../../types/items';
import NotFound from '../NotFound';


const Rockets: React.FC = () => {
  const [rockets, setRockets] = useState<any[]>([]);
  const { page } = useParams<{ page: string }>(); 
  const [maxPage, setMaxPage] = useState<number>(0);
  const navigate = useNavigate(); 


  useEffect(() => {
 
    const currentPage = page ? parseInt(page, 10) : 0;

    const fetchrockets = async () => {
      try {
        const response = await axios.post('https://api.spacexdata.com/v4/rockets/query', {
          options: {
            page: currentPage + 1, 
            limit: 10,
          },
        });
        setMaxPage(response.data.totalPages);
        let rocketsList: Entity[] = [];
        response.data.docs.map((rockets:any) => {
            rocketsList.push({
                id: rockets.id,
                title: rockets.name,
                details: rockets.description,
                image: rockets.flickr_images[0],
                date: rockets.first_flight,
                type: "rockets",
            });
        }); 
        setRockets(rocketsList);

      } catch (error) {
        console.error('Error fetching rocketses:', error);
      }
    };

    fetchrockets();
  }, [page]); 


  const goToPage = (newPage: number) => {
    navigate(`/rockets/page/${newPage}`);
  };
  
  if (parseInt(page as string) > (maxPage - 1)) {
    return (
      <NotFound/>
    );
  }


  return (
    <div>
      <h1>Rockets List</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-[100vw]">
        <Cards items={rockets} />
        </div>
      <div>
      <div className='items-center justify-center w-[100vw] flex '>
        {parseInt(page || '0', 10) > 0 && (
          <button className='m-5' onClick={() => goToPage(parseInt(page || '0', 10) - 1)}>Previous</button>
        )}
        {!(parseInt(page as string) > (maxPage - 2)) && (
          <button className='m-5' onClick={() => goToPage(parseInt(page || '0', 10) + 1)}>Next</button>
        )}
      </div>
      </div>
    </div>
  );
};

export default Rockets;
