import { Entity } from '../types/items';
import { Link } from 'react-router-dom';

export default function Cards({ items }: { items: Entity[] }) {
  return (
    
    <div className="w-[100vw]">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {items && items.map((item: Entity) => (
            <div key={item.id} className="relative group">
              <Link to={`/${item.type}/${item.id}`}>
                <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={item.image}
                    alt={item.title ? item.title : "No Name"}
                    className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <div>
                    <h3 className="text-sm text-blue-400">
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        {item.title ? item.title : "No Name"}
                    </h3>
                    <p className="mt-1 text-sm">{item.details ? `${item.details.slice(0, 150)}...` : "..."}</p>
                  </div>
                  <p className="text-sm font-medium">{item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
}
