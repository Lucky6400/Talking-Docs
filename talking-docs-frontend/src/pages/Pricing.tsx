import React from 'react'
import FixedNavbar from '../components/common/Navbar'
import PricingCard from '../components/pricing/PricingCard'
import Footer from '../components/common/Footer'

const Pricing: React.FC = () => {
    return (
        <>
            <FixedNavbar />
            <h1 className="w-full text-5xl font-bold text-center leading-snug">
                Upgrade to pro for <br />
                premium features and much more!
            </h1>

            <div className="flex w-full justify-center my-5 gap-5">

                <PricingCard color='gray' title='Basic' price={9} noOfMessages={1000} noOfPdfs={10} refer={false}/>
                <PricingCard color='green' title='Standard' price={29} noOfMessages={4000} noOfPdfs={40} refer={true}/>
                <PricingCard color='amber' title='Gold' price={99} noOfMessages={10000} noOfPdfs={100} refer={true}/>
            </div>
            <Footer/>
        </>
    )
}

export default Pricing