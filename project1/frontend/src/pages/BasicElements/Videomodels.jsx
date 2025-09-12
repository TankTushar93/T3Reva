import React from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Footer from '../../Components/Footer'
import Video from '../../Components/VideoModels/Video'
import StartupPromo from '../../Components/VideoModels/StartupPromo'
import StartupPromo2 from '../../Components/VideoModels/StartupPromo2'
import StartupPromo3 from '../../Components/VideoModels/StartupPromo3'
import Cost from '../../Components/VideoModels/Cost'
import LeaderSupport from '../../Components/VideoModels/LeaderSupport'
import Effective from '../../Components/VideoModels/Effective'
import Organized from '../../Components/VideoModels/Organized'
import EnergySolutions from '../../Components/VideoModels/EnergySolutions'

const Videomodels = () => {
  return (
    <>
    <Navbar/>
    <Sidebar/>
    <div>
      <Video/>
      <StartupPromo/>
      <StartupPromo2/>
      <StartupPromo3/>
      <Cost/>
      <LeaderSupport/>
      <Effective/>
      <Organized/>
      <EnergySolutions/>
    </div>
    <Footer/>
    </>
  )
}

export default Videomodels
