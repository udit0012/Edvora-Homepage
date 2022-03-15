import React, { useContext } from 'react'
import { useState } from 'react'
import NoteContext from '../../context/NoteContext'

const MenuButton = () => {
    const { cities, states, cityinput, stateinput, setCityinput, setStateinput } = useContext(NoteContext)
    const [openMenu, setOpenMenu] = useState(false)
    const [stateoption, setStateoption] = useState(false)
    const [cityoption, setCityoption] = useState(false)

    const openmenu = () => {
        setOpenMenu(!openMenu)
    }
    const handlestatemenu = () => {
        setStateoption(!stateoption);
        setCityoption(false)
    }
    const handlecitymenu = () => {
        setCityoption(!cityoption);
        setStateoption(false)
    }
    const handlestateoption = (state) => {
        setStateinput(state);
        setStateoption(false)
    }
    const handlecityoption = (city) => {
        setCityinput(city);
        setCityoption(false)
        setOpenMenu(false)

    }
    return (
        <div className="relative inline-block text-left">
            <div className='cursor-pointer'>
                <div onClick={openmenu} className="inline-flex justify-center items-center text-lg w-full px-4 py-2 bg-neutral-800 font-medium text-white hover:text-neutral-200 focus:outline-none focus:border-none">
                    <span className="material-icons-outlined px-2">sort</span>
                    Filters
                </div>
            </div>
            {openMenu && <div className="origin-top-right absolute right-0 mt-0 w-64 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-3">
                    <div className='mx-9 py-3 text-xl font-light text-[#A5A5A5] relative'><span className='before:absolute before:h-[1px] before:w-full before:bg-white before:bottom-0'>Filters</span></div>
                    <div className='select-box'>
                        <div onClick={handlestatemenu} className={`selected hover:bg-neutral-700 bg-neutral-800 text-white rounded-md mx-[30px] px-3 py-2 my-3 text-md flex items-center justify-between cursor-pointer`}>
                            {stateinput} <span className={`material-icons-outlined transition-all duration-[.4s] ${stateoption ? "rotate-180" : ""}`}>arrow_drop_down</span>
                        </div>
                        <div className={`${stateoption ? "max-h-60 opacity-100 overflow-y-scroll" : "max-h-0 opacity-0 overflow-hidden"} mx-[30px] bg-neutral-800 option-box text-sm transition-all duration-[.4s]`}>
                            <div onClick={() => { handlestateoption("State") }} key={"State"} className='option py-3 px-2 hover:bg-neutral-600'>
                                <input type="radio" className='hidden' id="State" name="state" />
                                <label htmlFor="State">State</label>
                            </div>
                            {states.map((state) => {
                                return <div onClick={() => { handlestateoption(state) }} key={state} className='option py-3 px-2 hover:bg-neutral-600'>
                                    <input type="radio" className='hidden' id={state} name="state" />
                                    <label htmlFor={state}>{state}</label>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className='select-box'>
                        <div onClick={handlecitymenu} className={`selected hover:bg-neutral-700 bg-neutral-800 text-white rounded-md mx-[30px] px-3 py-2 my-3 text-md flex items-center justify-between cursor-pointer`}>
                            {cityinput} <span className={`material-icons-outlined transition-all duration-[.4s] ${cityoption ? "rotate-180" : ""}`}>arrow_drop_down</span>
                        </div>
                        <div className={`${cityoption ? "max-h-60 opacity-100 overflow-y-scroll" : "max-h-0 opacity-0 overflow-hidden"} mx-[30px] bg-neutral-800 option-box text-sm transition-all duration-[.4s]`}>
                            <div onClick={() => { handlecityoption("City") }} key={"City"} className='option py-3 px-2 hover:bg-neutral-600'>
                                <input type="radio" className='hidden' id="City" name="city" />
                                <label htmlFor="City">City</label>
                            </div>
                            {cities.filter((c) => {
                                if (stateinput !== "State") {
                                    return c.state === stateinput
                                }
                                return true
                            }).map(({ city }) => {
                                return <div onClick={() => { handlecityoption(city) }} key={city} className='option py-3 px-2 hover:bg-neutral-600'>
                                    <input type="radio" className='hidden' id={city} name="city" />
                                    <label htmlFor={city}>{city}</label>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default MenuButton