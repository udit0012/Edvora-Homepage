import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import NoteContext from '../../context/NoteContext'

const Header = () => {
  const {user} = useContext(NoteContext)
  return (
    <div className='w-100 flex justify-between py-5 bg-black'>
        <div className='mx-11 text-4xl font-bold'>
           <Link to="/">Edvora</Link>
        </div>
        <div className='mx-2 flex items-center'>
            <span className='mx-3 font-bold text-xl'>{user.name}</span>
            <span className='mx-3'><img className='w-11 h-11 rounded-full' src={user.url} alt="" /></span>
        </div>
    </div>
  )
}

export default Header