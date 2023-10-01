import React from 'react'
import FixedNavbar from '../components/common/Navbar'
import Main from '../components/PDFList/Main'
import Footer from '../components/common/Footer'

const PDFList: React.FC = () => {
  return (
    <>
      <FixedNavbar />
      <Main />
      <Footer/>
    </>
  )
}

export default PDFList