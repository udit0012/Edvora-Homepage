import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import NoteContext from '../../context/NoteContext';
import Card from '../Other/Card'

const NearestRide = () => {

  const { allrides,setAllrides, user, cityinput, stateinput } = useContext(NoteContext)

  //adding distance attribute to each object
  useEffect(() => {
    if (user) {
      allrides.forEach(e => {
        var distance = e.station_path.map((ss) => {
          return (ss - user.station_code);
        });
        for (let i = 0; i < distance.length; i++) {
          if (distance[i] < 0) {
            distance[i] *= -1
          }
        }
        e.distance = Math.min(...distance);
      });
    }
  }, [user, allrides])

  useEffect(() => {
    setAllrides(allrides.filter((ele) => {
      if (stateinput !== "State" && cityinput !== "City") { return ele.state === stateinput && ele.city === cityinput }
      else if (stateinput !== "State" && cityinput === "City") {
          return ele.state === stateinput
      }
      else if (stateinput === "State" && cityinput !== "City") {
          return ele.city === cityinput
      }
      else return 1;
  }))
  }, [stateinput,cityinput])
  
  //function to sort elements of json array according to distance
  const comparefunction = (distance) => {
    return (a, b) => {
      if (a[distance] > b[distance]) return 1;
      else if (a[distance] < b[distance]) return -1;
      return 0;
    }
  }

  return (
    <div className='py-3 space-y-3'>
      {allrides.length ? allrides.sort(comparefunction("distance")).map((card) => {
        return <Card key={card.date} card={card} user={user} />
      }) :
        <div className='flex justify-center items-center'>
          <div className='text-5xl font-semibold text-neutral-400 mt-64'>No Ride found</div>
        </div>
      }
    </div>
  )
}

export default NearestRide