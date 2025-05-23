import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import VehicleComponent from "./COMPONENTS/VEHICLE-COMPONENT/VehicleComponent";
import HomePage from './COMPONENTS/USER-PAGES/HOME-PAGE/HomePage';


// This component holds the logic and is rendered *inside* the Router
function AppRoutes() {
  const location = useLocation();
  const allowAccessToMaintainance = location.state?.fromApp === true;

  return (
    <Routes>
      <Route path="*" element={<VehicleComponent />} />
      <Route path='/home' element={<HomePage />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
