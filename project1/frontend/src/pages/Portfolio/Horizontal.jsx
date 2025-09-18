import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Horizontalp from '../../Components/Portfolio/Horizontalpage/Horizontalp'
import Blog2 from '../../Components/Portfolio/Horizontalpage/Blog2'

const Horizontal = () => {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <Horizontalp/>
      <Blog2/>
      <Footer/>
    </div>
  )
}

export default Horizontal
