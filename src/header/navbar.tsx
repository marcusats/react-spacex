import React from 'react';
import { Item } from '../types/items';

interface NavbarProps {
    items: Item[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  return (
    <nav className="flex flex-wrap items-center justify-between p-6 bg-gray-800 w-[100vw]">
      <div className="flex items-center flex-shrink-0 mr-6 text-white">
        <span className="text-xl font-semibold tracking-tight">Lab 5</span>
      </div>
      <div className="flex-grow block w-full lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {items.map((item: Item, index: number) => (
            <a key={index} href={item.link} className="block mt-4 mr-4 text-white lg:inline-block lg:mt-0 hover:text-white">
              {item.itemName}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

