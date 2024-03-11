import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cards from '../../componnets/Cards';
import { Entity } from '../../types/items';
import NotFound from '../NotFound';


const Cores: React.FC = () => {
  const [cores, setCores] = useState<any[]>([]);
  const { page } = useParams<{ page: string }>(); 
  const [maxPage, setMaxPage] = useState<number>(0);
  const navigate = useNavigate(); 


  useEffect(() => {
 
    const currentPage = page ? parseInt(page, 10) : 0;

    const fetchCores = async () => {
      try {
        const response = await axios.post('https://api.spacexdata.com/v4/cores/query', {
          options: {
            page: currentPage + 1, 
            limit: 10,
          },
        });
        setMaxPage(response.data.totalPages);
        let coresList: Entity[] = [];
        response.data.docs.map((cores:any) => {
            coresList.push({
                id: cores.id,
                title: cores.serial,
                details: cores.last_update,
                image: "https://www.spacex.com/static/images/share.jpg",
                type: "cores",
            });
        }); 
        setCores(coresList);

      } catch (error) {
        console.error('Error fetching coreses:', error);
      }
    };

    fetchCores();
  }, [page]); 


  const goToPage = (newPage: number) => {
    navigate(`/cores/page/${newPage}`);
  };
  
  if (parseInt(page as string) > (maxPage - 1)) {
    return (
      <NotFound/>
    );
  }
  

  return (
    <div>
      <h1>Cores List</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-[100vw]">
        <Cards items={cores} />
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

export default Cores;
