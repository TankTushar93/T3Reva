import React from 'react'
import Navbar from '../../Components/Navbar'
import GridLayout from '../../Components/Portfolio/Gridpage/Gridlayout'
import Footer from '../../Components/Footer'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Blog from '../../Components/Portfolio/Gridpage/Blog'

const Grid = () => {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <GridLayout/>
      <Blog/>
      <Footer/>
    </div>
  )
}

export default Grid
