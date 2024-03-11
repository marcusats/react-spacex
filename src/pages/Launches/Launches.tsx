import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cards from '../../componnets/Cards';
import { Entity } from '../../types/items';
import NotFound from '../NotFound';

const Launches: React.FC = () => {
  const [launches, setLaunches] = useState<any[]>([]);
  const { page } = useParams<{ page: string }>(); 
  const [maxPage, setMaxPage] = useState<number>(0);
  const navigate = useNavigate(); 

  function getImageSrc(item: any) {
    if (item.links.flickr.original.length > 0) {
      return item.links.flickr.original[0];
    } else if (item.links.patch.small) {
      return item.links.patch.small;
    }
    return 'https://via.placeholder.com/150'; 
  }

  useEffect(() => {
 
    const currentPage = page ? parseInt(page, 10) : 0;

    const fetchLaunches = async () => {
      try {
        const response = await axios.post('https://api.spacexdata.com/v4/launches/query', {
          options: {
            page: currentPage + 1, 
            limit: 10,
          },
        });
        setMaxPage(response.data.totalPages);
        let launchList: Entity[] = [];
        response.data.docs.map((launch:any) => {
            launchList.push({
                id: launch.id,
                title: launch.name,
                details: launch.details,
                image: getImageSrc(launch),
                date: launch.date_utc,
                type: "launches",
            });
        }); 
        setLaunches(launchList);

      } catch (error) {
        console.error('Error fetching launches:', error);
      }
    };

    fetchLaunches();
  }, [page]); 


  const goToPage = (newPage: number) => {
    navigate(`/launches/page/${newPage}`);
  };

  if (parseInt(page as string) > (maxPage - 1)) {
    return (
      <NotFound/>
    );
  }
  


  return (
    <div>
      <h1>Launches List</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-[100vw]">
        <Cards items={launches} />
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

export default Launches;
