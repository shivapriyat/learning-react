import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import { About } from './About';
import { Contacts } from './Contacts';
import { History } from './History';
import { Restapi } from './Restapi';
import { Graphql } from './Graphql';
import { NavMenu } from './NavMenu';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <NavMenu/>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/about" element={<About />}>
        <Route path="history" element={<History />}> </Route>
      </Route>
      <Route path="/contact" element={<Contacts />}></Route>
      <Route path="/restapi" element={<Restapi />}></Route>
      <Route path="/graphql" element={<Graphql />}></Route>
    </Routes>
  </BrowserRouter>
);


