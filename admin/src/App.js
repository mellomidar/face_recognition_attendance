import './App.css';
import React, { useEffect } from 'react';
import logo from './assets/bisu-logo.png'
import DateTime from './components/DateTime';
import Register from './routers/Register';
import Report from './routers/Report';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './routers/Layout';
import Home from './routers/Home';
import CrudEmployee from './routers/CrudEmployee';
import Authentication from './routers/Authentication';

function App() {
  return (
    <div className="App">
      <Authentication/>
      <div className="top-container">
        <div className="top-left">
          <img className="bisu-logo" src={logo} alt='bisu logo'></img>
          <div className='school-info'>
            <h2>BOHOL ISLAND STATE UNIVERSITY</h2>
            <h3>Clarin Campus</h3>
            <h3>Poblacion Norte, Clarin, Bohol</h3>
          </div>
        </div>
        <div className="top-right">
          <DateTime />
        </div>
      </div>

      <div className='admin-subwindow-container'>
        <div className='admin-main-btns'>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="Register" element={<Register />} />
                <Route path="Report" element={<Report />} />
                <Route path="CrudEmployee" element={<CrudEmployee/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
