import React from 'react'

const NavBar = () => {
  return (
    <div className='flex justify-between px-12 bg-indigo-900 h-[50px] text-white items-center'>
      <h1 className='font-bold text-xl'>iTask</h1>
      <ul className=' flex gap-10 mx-20'>
        <li className='hover:font-bold  transition-all duration-500 cursor-pointer'>Home</li>
        <li className='hover:font-bold  transition-all duration-500 cursor-pointer'>Your Task</li>
      </ul>
    </div>
  )
}

export default NavBar
