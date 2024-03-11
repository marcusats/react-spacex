import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cards from '../../componnets/Cards';
import { Entity } from '../../types/items';
import NotFound from '../NotFound';


const payloades: React.FC = () => {
  const [payloads, setpayloads] = useState<any[]>([]);
  const { page } = useParams<{ page: string }>(); 
  const navigate = useNavigate(); 
  const [maxPage, setMaxPage] = useState<number>(0);


  useEffect(() => {
 
    const currentPage = page ? parseInt(page, 10) : 0;

    const fetchpayloads = async () => {
      try {
        const response = await axios.post('https://api.spacexdata.com/v4/payloads/query', {
          options: {
            page: currentPage + 1, 
            limit: 10,
          },
        });
        console.log('payloads:', response.data);
        setMaxPage(response.data.totalPages);
        let payloadList: Entity[] = [];
        response.data.docs.map((payload:any) => {
            payloadList.push({
                id: payload.id,
                title: payload.name,
                details: payload.type,
                image: "https://www.spacex.com/static/images/share.jpg",
                date: payload.epoch,
                type: "payloads",
            });
        }); 
        setpayloads(payloadList);

      } catch (error) {
        console.error('Error fetching payloades:', error);
      }
    };

    fetchpayloads();
  }, [page]); 


  const goToPage = (newPage: number) => {
    navigate(`/payloads/page/${newPage}`);
  };
  
  
  if (parseInt(page as string) > (maxPage - 1)) {
    return (
      <NotFound/>
    );
  }
  
    
    
    


  return (
    <div>
      <h1>Payloads List</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-[100vw]">
        <Cards items={payloads} />
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

export default payloades;
