import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import image from './assets/devsit.png';
import GermanWordChallange from './GermanWordsChallange/GermanWordChallange';

import {
  createBrowserRouter,
  Link,
  Route,
  RouterProvider,
  BrowserRouter,
  Routes,
  Outlet
} from "react-router-dom";

const SchoolApp = () => {
  return (
    <>
      <Outlet />
    </>
  )
}


const CardGermanVsItalian = () => {
  return (
  <>
   <div className='SchoolApp'>
          <div className='d-flex flex-wrap justify-content-between align-items-center'>
          
            <div className="card" >
                <img src={image}  className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">Cartellini in tedesco</h5>
                  <p className="card-text">Impara i vocaboli delle SM di tesse in tedesco.</p>
                  <Link to='/german-vs-italian/' className='btn btn-primary'>Vai alla sfida</Link><br/>
                </div>
              </div>
            </div>
        </div>
  </>)
}



function Layout() {
  // `BrowserRouter` component removed, but the <Routes>/<Route>
  // component below are unchanged
  return (
      <Routes>
        <Route path="" element={<CardGermanVsItalian />}> 
        </Route>
        <Route path="/german-vs-italian" element={<GermanWordChallange />} />        
      </Routes>
  );
}

const router = createBrowserRouter([
  { path: "*", Component: Layout },
]);


function NavigatorBoard () {
  return <RouterProvider router={router} />;
}


export {SchoolApp, NavigatorBoard}




