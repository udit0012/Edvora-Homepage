import React from 'react'
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom'
import NoteContext from '../../context/NoteContext';
import MenuButton from './MenuButton';

const Navbar = () => {
    const {upcomingrides,pastrides} = useContext(NoteContext)

    const location = useLocation();
    
    const active = "text-white font-bold before:absolute before:bg-white before:h-[3px] before:w-full before:bottom-0 before:rounded-xl"
    return (
        <div className='flex justify-between items-center'>
            <div className=''>
                <ul className='flex space-x-11 text-xl text-[#D0CBCB] py-3'>
                    <li className='relative py-2'><Link className={`py-2 before:rounde ${location.pathname === "/" ? active : ""}`} to="/">Nearest rides</Link></li>
                    <li className='relative py-2'><Link className={`py-2 ${location.pathname === "/upcomingrides" ? active : ""}`} to="/upcomingrides">Upcoming rides ({upcomingrides.length})</Link></li>
                    <li className='relative py-2'><Link className={`py-2 ${location.pathname === "/pastrides" ? active : ""}`} to="/pastrides">Past rides ({pastrides.length})</Link></li>
                </ul>
            </div>
            <div>
                <MenuButton />
            </div>
        </div>
    )
}

export default Navbar