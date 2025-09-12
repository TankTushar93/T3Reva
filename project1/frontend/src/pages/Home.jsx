import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Texts from '../Components/Texts'
import Cards from '../Components/Cards'
import Ads from '../Components/Ads'
import Demo from '../Components/Demo'
import Editing from '../Components/Editing'
import Integration from '../Components/Integration'
import Fluid from '../Components/Fluid'
import Consulting from '../Components/Consulting'
import MoreFeatures from '../Components/MoreFeatures'
import Testimonial from '../Components/Testimonial'
import Needhelp from '../Components/Needhelp'
import FAQ from '../Components/FAQ'
import Purchase from '../Components/Purchase'
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
