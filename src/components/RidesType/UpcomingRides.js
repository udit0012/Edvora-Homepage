import React, { useContext } from 'react'
import NoteContext from '../../context/NoteContext'
import Card from '../Other/Card'

const UpcomingRides = () => {
  const { user, upcomingrides, cityinput, stateinput } = useContext(NoteContext)

  //adding distance attribute to each object
  upcomingrides.forEach(e => {
    var distance = e.station_path.map((e) => { return e - user.station_code });
    for (let i = 0; i < distance.length; i++) {
      if (distance[i] < 0) {
        distance[i] *= -1
      }
    }
    e.distance = Math.min(...distance);
  });
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
      {upcomingrides.length?upcomingrides.sort(comparefunction("distance")).map((card) => {
        return <Card key={card.date} card={card} user={user} />
      }):
      <div className='flex justify-center items-center'>
        <div className='text-5xl font-semibold text-neutral-400 mt-64'>No Upcoming Rides found</div>
      </div>
      }
    </div>
  )
}

export default UpcomingRides