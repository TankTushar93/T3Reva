import React from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Footer from '../../Components/Footer'
import Carouselp from '../../Components/Portfolio/Carouselpage/Carouselp'
import Images3 from '../../Components/Portfolio/Carouselpage/Images3'
const Carousel = () => {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
        <div>
            <Carouselp/>
            <Images3/>
        </div>
      <Footer/>
    </div>
  )
}

export default Carousel;
