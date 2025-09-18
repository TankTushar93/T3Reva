import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Api from './pages/Api'
import Gallery from './pages/BasicElements/Gallery'
import PricingPlans from './pages/BasicElements/PricingPlans'
import Videomodels from './pages/BasicElements/Videomodels'
import Grid from './pages/Portfolio/Grid'
import Masonary from './pages/Portfolio/Masonary'
import Isotope from './pages/Portfolio/Isotope'
import TimeLine from './pages/Portfolio/Timeline'
import Carousel from './pages/Portfolio/Carousel'
import Horizontal from './pages/Portfolio/Horizontal'
import Finance from './pages/Portfoliopages/Finance'

const App = () => {

  useEffect(()=>{
     window.scrollTo(0, 0);
  },[])

  return (
    <div className='font-poppins'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/api' element={<Api/>}/>

         <Route path="/elements" >
          {/* Basic elements */}
          <Route path="basic-elements/gallery" element={<Gallery />} />
          <Route path="infographic-elements/pricing-plans" element={<PricingPlans />} />
          <Route path="business-elements/video-modal" element={<Videomodels />} />
          <Route path="advanced-elements/timeline" element={<TimeLine />} />
        </Route>

        <Route path='portfolio'>
            <Route path="portfolio-grid" element={<Grid/>} />
            <Route path="masonry-layout" element={<Masonary/>} />
            <Route path="isotope-view" element={<Isotope/>} />
            <Route path="masonry-minimal" element={<Carousel/>} />
            <Route path="portfolio-horizontal" element={<Horizontal/>} />
        </Route>
        <Route path='/how-buy-now-pay-later-could-transform-traditional-b2b-trade-finance-models' element={<Finance/>} />
      </Routes>
    </div>
  )
}

export default App
