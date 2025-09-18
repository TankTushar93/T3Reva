import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Homepage/Hero'
import Texts from '../Components/Homepage/Texts'
import Cards from '../Components/Homepage/Cards'
import Ads from '../Components/Homepage/Ads'
import Demo from '../Components/Homepage/Demo'
import Editing from '../Components/Homepage/Editing'
import Integration from '../Components/Homepage/Integration'
import Fluid from '../Components/Homepage/Fluid'
import Consulting from '../Components/Homepage/Consulting'
import MoreFeatures from '../Components/Homepage/MoreFeatures'
import Testimonial from '../Components/Homepage/Testimonial'
import Needhelp from '../Components/Homepage/Needhelp'
import FAQ from '../Components/Homepage/FAQ'
import Purchase from '../Components/Homepage/Purchase'
import Footer from '../Components/Footer'
import Sidebar from '../Components/Sidebar/Sidebar'
import { useSidebar } from '../context/Sidebarcontext'

const Home = () => {

  const {setIsOpen ,layout} = useSidebar()
  return (
   <div className="overflow-x-hidden">
  <div className={`${layout === 'Wide' ? '' : 'px-4 md:px-42 bg-[#617798]'}`}>
    <Navbar />
    <Sidebar />
    <div className="relative">
      <Hero />
      <Texts />
      <Cards />
      <Ads />
      <Demo />
      <Editing />
      <Integration />
      <Fluid />
      <Consulting />
      <MoreFeatures />
      <Testimonial />
      <Needhelp />
      <FAQ />
      <Purchase />
    </div>
    <Footer />
  </div>
</div>

  ) 
}

export default Home
