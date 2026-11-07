import { Nav } from './components/Nav'
import { IntroOverlay } from './components/intro/IntroOverlay'
import { Hero } from './components/hero/Hero'
import { About } from './components/about/About'
import { Gallery } from './components/gallery/Gallery'
import { Videos } from './components/videos/Videos'
import { TourSection } from './components/tour/TourSection'
import { MerchSection } from './components/merch/MerchSection'
import { Footer } from './components/footer/Footer'
import { useUIStore } from './store/useUIStore'

function App() {
  const introPlayed = useUIStore((s) => s.introPlayed)
  const markIntroPlayed = useUIStore((s) => s.markIntroPlayed)

  return (
    <>
      {!introPlayed && <IntroOverlay onComplete={markIntroPlayed} />}

      <Nav />

      <main>
        <Hero />
        <Videos />
        <TourSection />
        <About />
        <Gallery />
        <MerchSection />
      </main>

      <Footer />
    </>
  )
}

export default App
