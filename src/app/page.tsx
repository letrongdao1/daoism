import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Projects from '../components/projects/Projects'
import About from '../components/About'
import Experience from '../components/Experience'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Contact />
      </main>
    </>
  )
}

