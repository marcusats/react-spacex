import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cards from '../../componnets/Cards';
import { Entity } from '../../types/items';
import NotFound from '../NotFound';


const Launchpads: React.FC = () => {
  const [launchpads, setLaunchpads] = useState<any[]>([]);
  const { page } = useParams<{ page: string }>(); 
  const [maxPage, setMaxPage] = useState<number>(0);
  const navigate = useNavigate(); 


  useEffect(() => {
 
    const currentPage = page ? parseInt(page, 10) : 0;

    const fetchLaunchpads = async () => {
      try {
        const response = await axios.post('https://api.spacexdata.com/v4/launchpads/query', {
          options: {
            page: currentPage + 1, 
            limit: 10,
          },
        });
        setMaxPage(response.data.totalPages);
  
        let launchpadsList: Entity[] = [];
        response.data.docs.map((launchpads:any) => {
            launchpadsList.push({
                id: launchpads.id,
                title: launchpads.name,
                details: launchpads.full_name,
                image: "https://www.spacex.com/static/images/share.jpg",
                type: "launchpads",
            });
        }); 
        setLaunchpads(launchpadsList);

      } catch (error) {
        console.error('Error fetching launchpadses:', error);
      }
    };

    fetchLaunchpads();
  }, [page]); 


  const goToPage = (newPage: number) => {
    navigate(`/launchpads/page/${newPage}`);
  };
  
  if (parseInt(page as string) > (maxPage - 1)) {
    return (
      <NotFound/>
    );
  }


  return (
    <div>
      <h1>Launchpads List</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-[100vw]">
        <Cards items={launchpads} />
        </div>
      <div>
      <div className='items-center justify-center w-[100vw] flex '>
        {parseInt(page || '0', 10) > 0 && (
          <button className='m-5' onClick={() => goToPage(parseInt(page || '0', 10) - 1)}>Previous</button>
        )}
        { !(parseInt(page as string) > (maxPage - 2)) && (
          <button className='m-5' onClick={() => goToPage(parseInt(page || '0', 10) + 1)}>Next</button>
        )}
      </div>
      </div>
    </div>
  );
};

export default Launchpads;
