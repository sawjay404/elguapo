import React, { useState } from 'react'
import Navbar from './assets/Components/Navbar/Navbar'
import HeroSection from './assets/Components/HeroSection/HeroSection'
import Services from './assets/Components/Services/Services'
import About from './assets/Components/About/About'
import Portfolio from './assets/Components/Portfolio/Portfolio'
import Testimonials from './assets/Components/Testimonials/Testimonials'
import Contact from './assets/Components/Contact/Contact'
import Footer from './assets/Components/Footer/Footer'
import FormModal from './assets/Components/Form/FormModal' // NEW IMPORT

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Helper to make the code cleaner
  const openForm = () => setShowPopup(true);

  return (
    <div className="relative font-sans antialiased selection:bg-cyan-100 selection:text-cyan-900">
      
      <Navbar setIsFormOpen={openForm} />
      
      <main>
        <HeroSection setIsFormOpen={openForm} />
        <Services setIsFormOpen={openForm} />
        <About setIsFormOpen={openForm} />
        <Portfolio setIsFormOpen={openForm} /> {/* Fixed typo here */}
        <Testimonials setIsFormOpen={openForm} />
        <Contact setIsFormOpen={openForm} />
      </main>
      
      <Footer setIsFormOpen={openForm} />

      {/* The Master Modal 
          This stays at the bottom of the DOM so it covers everything.
      */}
      <FormModal isOpen={showPopup} setIsOpen={setShowPopup} />
      
    </div>
  )
}

export default App