import React from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Footer from '../../Components/Footer'
import Flexible from '../../Components/PricingPlans/Flexible'
import Modern from '../../Components/PricingPlans/Modern'
import Modern3 from '../../Components/PricingPlans/Modern3'
import PricingCards from '../../Components/PricingPlans/PricingCards'
import Classicplan from '../../Components/PricingPlans/Classicplan'
import Pay from '../../Components/PricingPlans/Pay'

const PricingPlans = () => {
  return (
    <>
    <Navbar/>
    <Sidebar/>
    <div>
      <Flexible/>
      <Modern/>
      <Modern3/>
      <PricingCards/>
      <Classicplan/>
      <Pay/>
    </div>
    <Footer/>
    </>
  )
}

export default PricingPlans
