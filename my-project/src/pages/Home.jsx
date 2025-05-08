import React from 'react'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import FeaturesShowcase from '../components/FeaturesShowcase'
import Gallery from '../components/Gallery'
import Pricing from '../components/Pricing'
import TryItNow from '../components/TryItNow'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import StorybookShowcase from '../components/Storybookshowcase'

function Home() {
  return (
    <div>
      <Hero />
      <StorybookShowcase />
      <HowItWorks />
      <FeaturesShowcase />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  )
}

export default Home