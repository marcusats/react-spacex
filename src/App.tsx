import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Launches from './pages/Launches/Launches'
import Payloads from './pages/Payloads/Payloads'
import Cores from './pages/Cores/Cores'
import Rockets from './pages/Rockets/Rockets'
import Ships from './pages/Ships/Ships'
import LaunchPads from './pages/Pads/Pads'
import PadsDetails from './pages/Pads/PadsDetails'
import LaunchDetail from './pages/Launches/LaunchesDetail'
import PayloadDetail from './pages/Payloads/PayloadsDetail'
import CoreDetail from './pages/Cores/CoreDetail'
import RocketDetail from './pages/Rockets/RocketDetail'
import ShipDetail from './pages/Ships/ShipDetail'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/"  element={<Home/>} />
          <Route path="/launches/page/:page" element={<Launches />} />
          <Route path="/launches/:id" element={<LaunchDetail />} />
          <Route path="/payloads/page/:page" element={<Payloads />} />
          <Route path="/payloads/:id" element={<PayloadDetail />} />
          <Route path="/cores/page/:page" element={<Cores />} />
          <Route path="/cores/:id" element={<CoreDetail />} />
          <Route path="/rockets/page/:page" element={<Rockets />} />
          <Route path="/rockets/:id" element={<RocketDetail />} />
          <Route path="/ships/page/:page" element={<Ships />} />
          <Route path="/ships/:id" element={<ShipDetail />} />
          <Route path="/launchpads/page/:page" element={<LaunchPads />} />
          <Route path="/launchpads/:id" element={<PadsDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
