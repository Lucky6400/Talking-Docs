import React from 'react'
import FixedNavbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Main from '../components/account/Main'

const Account: React.FC = () => {
    return (
        <>
            <FixedNavbar />
            <Main />
            <Footer />
        </>
    )
}

export default Account