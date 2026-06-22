import './App.css';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import Footer from './pages/Footer';
import Header from './pages/Header';
import Places from './pages/Places';
import Activities from './pages/Activities';
import Weather from './pages/Weather';
import Settings from './pages/Settings';


function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/Places" replace />} />
        <Route path="/Places" element={<Places />} />
        <Route path="/Activities" element={<Activities />} />
        <Route path="/Weather" element={<Weather />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
