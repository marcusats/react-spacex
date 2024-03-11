import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Layout from './Layout.tsx'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout navbarItems={[
      { itemName: 'Home', link: '/' }, 
      { itemName: 'Launches', link: '/launches/page/0' },
      { itemName: 'Payloads', link: '/payloads/page/0' },
      { itemName: 'Cores', link: '/cores/page/0' },
      { itemName: 'Rockets', link: '/rockets/page/0' },
      { itemName: 'Ships', link: '/ships/page/0' },
      { itemName: 'Launch Pads', link: '/launchpads/page/0' },
    ]}>
      <App />
    </Layout>
  </React.StrictMode>,
)
