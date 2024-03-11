import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 space-y-4">
      <img src="https://www.svgrepo.com/show/1320/rocket.svg" alt="Rocket Icon" className="w-20 h-20" />
      <h1 className="text-2xl font-bold text-center">SpaceX API Explorer</h1>
      <p className="mt-4 text-lg text-center">
        This Single Page Application (SPA) is designed to explore various aspects of SpaceX's missions, rockets, and more, utilizing the publicly accessible SpaceX API. This project showcases the power of React and Vite, employing functional components and React's core Hooks, such as <code>useState</code> and <code>useEffect</code>, for state management and side effects, respectively.
      </p>
      <p className="text-lg text-center">
        Through React Router, this SPA enables navigation across different data endpoints without reloading the page, offering a seamless user experience as you discover information about SpaceX Launches, Payloads, Rockets, Ships, Launch Pads, and Cores.
      </p>
      <p className="text-lg text-center">
        No API key is required for accessing the SpaceX data, as all requests are read-only GET operations. Explore detailed information about each SpaceX resource by visiting the respective routes:
        <ul className="list-disc list-inside">
          <li>Launches: A list of launches and specific launch details</li>
          <li>Payloads: Detailed payload information</li>
          <li>Rockets: Explore various rockets designed by SpaceX</li>
          <li>Ships: Information on ships used in SpaceX missions</li>
          <li>Launch Pads: Details on launch pad locations</li>
          <li>Cores: Insights into rocket cores and their reuse</li>
        </ul>
      </p>
      <p className="text-lg text-center">
        Dive into the fascinating world of space exploration with SpaceX API!
      </p>
    </div>
  );
};

export default Home;