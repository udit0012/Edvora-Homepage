import React from 'react'
import { useEffect } from 'react'

const Card = ({ card,user }) => {
    const { map_url, id, date, station_path, origin_station_code,distance, state, city } = card

    // changing time in 24 hours format 
    var time = (date.slice(17,19)==="PM" && date.slice(11,13)!=="12")?(+(date.slice(11,13))+12):(date.slice(11,13))
    var newdate=date.slice(0,11)+time+date.slice(13,16)

    const stationpath=String(station_path)
    return (
        <div className='bg-[#171717] rounded-[10px] pt-5 pb-7 px-5 flex justify-between'>
            <div className='flex'>
                <img className='rounded-md w-[296px] h-[148px] mx-2' src={map_url} alt="" />
                <div className='mx-9 leading-[22px] text-lg font-medium text-[#CFCFCF]'>
                    <div className='py-1'> Ride Id : <span className='text-white'> {id}</span></div>
                    <div className='py-1'> Origin Station : <span className='text-white'> {origin_station_code}</span></div>
                    <div className='py-1'> station_path : <span className='text-white'> [{stationpath}]</span></div>
                    <div className='py-1'> Date : <span className='text-white'> {newdate}</span></div>
                    <div className='py-1'> Distance : <span className='text-white'>{distance}</span></div>
                </div>
            </div>
            <div>
                <div className='flex h-16 space-x-6'>
                    <div>
                        <div className='bg-[rgba(0,0,0,.56)] py-1 flex justify-center px-[10px] text-[12px] font-medium rounded-2xl'>City Name</div>
                        <div className='py-1 px-[10px] flex justify-center max-w-[80px] text-[12px]'>{city}</div>
                    </div>
                    <div>
                        <div className='bg-[rgba(0,0,0,.56)] py-1 flex justify-center px-[10px] text-[12px] font-medium rounded-2xl'>State Name</div>
                        <div className='py-1 px-[10px] flex justify-center max-w-[88px] text-[12px]'>{state}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card