import React from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Footer from '../../Components/Footer'
import MasonaryLayout from '../../Components/Portfolio/Masonarypage/MasonaryLayout'
import Images from '../../Components/Portfolio/Masonarypage/Images'
const Masonary = () => {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
        <div>
            <MasonaryLayout/>
            <Images/>
        </div>
      <Footer/>
    </div>
  )
}

export default Masonary
