import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen exo-2-font'>

            <NavBar></NavBar>

            <div className='flex-grow'>
            <Outlet></Outlet>
            </div>
            

            <Footer></Footer>

            
        </div>
    );
};

export default MainLayout;