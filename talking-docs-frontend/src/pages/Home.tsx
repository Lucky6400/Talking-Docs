import React from 'react'
import Hero from '../components/home/Hero'
import FixedNavbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const Home: React.FC = () => {
  return (
    <>
      <FixedNavbar />
      <Hero />
      <Footer/>
    </>
  )
}

export default Home