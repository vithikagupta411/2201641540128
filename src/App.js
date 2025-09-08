import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Stats from './pages/Stats';
import RedirectHandler from './pages/RedirectHandler';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </>
  );
}

export default App;
