import React from 'react';
import Navbar from './header/navbar';
import { Item } from './types/items';

interface LayoutProps {
  children: React.ReactNode;
  navbarItems: Item[];
}

const Layout: React.FC<LayoutProps> = ({ children, navbarItems }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar items={navbarItems} />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}

export default Layout;
