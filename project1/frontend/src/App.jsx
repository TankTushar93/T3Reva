import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Api from './pages/Api'
import Gallery from './pages/BasicElements/Gallery'
import PricingPlans from './pages/BasicElements/PricingPlans'
import Videomodels from './pages/BasicElements/Videomodels'

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
          
        </Route>
      </Routes>
    </div>
  )
}

export default App
