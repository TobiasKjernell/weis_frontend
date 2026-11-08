import { Nav } from './components/Nav'
import { Atmosphere } from './components/ui/Atmosphere'
import { Hero } from './components/hero/Hero'
import { About } from './components/about/About'
import { Gallery } from './components/gallery/Gallery'
import { Videos } from './components/videos/Videos'
import { TourSection } from './components/tour/TourSection'
import { MerchSection } from './components/merch/MerchSection'
import { Footer } from './components/footer/Footer'

function App() {
  return (
    <>
      <Atmosphere />
      <Nav />

      <main>
        <Hero />
        <Videos />
        <MerchSection />
        <Gallery />
        <About />
        <TourSection />
      </main>

      <Footer />
    </>
  )
}

export default App
