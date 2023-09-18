import React from 'react'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='h-full relative'>
     <div className='hidden h-full md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-700 text-white'>
    <Sidebar/>
     </div>
     <main className='md:pl-56'>
        <Navbar/>
       <div>
        {children}
       </div>
     </main>
    </div>
  )
}

export default layout
