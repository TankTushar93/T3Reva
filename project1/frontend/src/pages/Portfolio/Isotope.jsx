import React from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Footer from '../../Components/Footer'
import Socialproof from '../../Components/Portfolio/Isotopepage/Socialproof'
import Images2 from '../../Components/Portfolio/Isotopepage/Images2'
const Isotope = () => {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
        <div>
            <Socialproof/>
            <Images2/>       
        </div>
      <Footer/>
    </div>
  )
}

export default Isotope;
