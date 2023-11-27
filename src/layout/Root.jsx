import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../shared/Navbar/Navbar';
import Marque from '../pages/Home/Marque/Marque';

const Root = () => {
    const location = useLocation()
    console.log("Location",location);
    return (
        <div>
           
            <Navbar />
            {location?.pathname==="/" && <Marque />}
            <Outlet />
        </div>
    );
};

export default Root;