import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NoteContext from '../context/NoteContext'
import NoteState from '../context/NoteState'
import Header from './Other/Header'
import Navbar from './Other/Navbar'
import NearestRide from './RidesType/NearestRide'
import PastRides from './RidesType/PastRides'
import UpcomingRides from './RidesType/UpcomingRides'

const Homepage = () => {
    return (
        <NoteState>
            <Router>
                <div>
                    <Header />
                    <div className='px-11'>
                        <Navbar />
                        <Routes>
                            <Route exact path="/" element={<NearestRide />} />
                            <Route exact path="/upcomingrides" element={<UpcomingRides />} />
                            <Route exact path="/pastrides" element={<PastRides />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </NoteState>
    )
}

export default Homepage