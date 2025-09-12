import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import Elegant from '../../Components/BasicElements/Elegant'
import Sidebar from '../../Components/Sidebar/Sidebar'
import SliderGallery from '../../Components/BasicElements/SliderGallery'
import SliderTran from '../../Components/BasicElements/SliderTran'
import Gridgallery from '../../Components/BasicElements/Gridgallery'
import Masonrygallery from '../../Components/BasicElements/Masonrygallery'
// import Lightbg from '../../Components/BasicElements/Lightbg'

const Gallery = () => {
  return (
    <>
    <Navbar/>
    <Sidebar/>
    <div className=''>
      <Elegant/>
      <SliderGallery/>
      <SliderTran/>
      <Gridgallery/>
      <Masonrygallery/>
    </div>
    <Footer/>
      </>
  )
}

export default Gallery
