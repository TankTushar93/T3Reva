import React from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Footer from '../../Components/Footer'
import Timeline from '../../Components/Portfolio/Timelinepage/Timeline'
import Vertical from '../../Components/Portfolio/Timelinepage/Vertical'
import Content from '../../Components/Portfolio/Timelinepage/Content'
const TimeLine = () => {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
        <div>
            <Vertical/>
            <Timeline/>
            <Content/>
        </div>
      <Footer/>
    </div>
  )
}

export default TimeLine;
