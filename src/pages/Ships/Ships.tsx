import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cards from '../../componnets/Cards';
import { Entity } from '../../types/items';
import NotFound from '../NotFound';


const Ships: React.FC = () => {
  const [ships, setShips] = useState<any[]>([]);
  const { page } = useParams<{ page: string }>(); 
  const [maxPage, setMaxPage] = useState<number>(0);
  const navigate = useNavigate(); 


  useEffect(() => {
 
    const currentPage = page ? parseInt(page, 10) : 0;

    const fetchShips = async () => {
      try {
        const response = await axios.post('https://api.spacexdata.com/v4/ships/query', {
          options: {
            page: currentPage + 1, 
            limit: 10,
          },
        });
        setMaxPage(response.data.totalPages);
        let shipsList: Entity[] = [];
        response.data.docs.map((ships:any) => {
            shipsList.push({
                id: ships.id,
                title: ships.name,
                details: ships.roles[0],
                image: (ships.image) ? ships.image : "https://www.spacex.com/static/images/share.jpg",
                type: "ships",
            });
        }); 
        setShips(shipsList);

      } catch (error) {
        console.error('Error fetching shipses:', error);
      }
    };

    fetchShips();
  }, [page]); 


  const goToPage = (newPage: number) => {
    navigate(`/ships/page/${newPage}`);
  };
  
  if (parseInt(page as string) > (maxPage - 1)) {
    return (
      <NotFound/>
    );
  }


  return (
    <div>
      <h1>ships List</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-[100vw]">
        <Cards items={ships} />
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

export default Ships;
