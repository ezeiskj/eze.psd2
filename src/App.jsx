import "./style.css?v=2"
import { useEffect, useState, useRef } from "react"
import { AsciiText, Dither } from "@appletosolutions/reactbits"
import "./style.css"

const BASE = import.meta.env.BASE_URL

export default function App() {
  const [ready, setReady] = useState(false)
  const [showDither, setShowDither] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [selectedExtra, setSelectedExtra] = useState(null)
  
  const [isMobile, setIsMobile] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)

    const t = setTimeout(() => setReady(true), 200)
    const observer = new IntersectionObserver(
      ([entry]) => setShowDither(!entry.isIntersecting),
      { threshold: 0.1 }
    )

    if (heroRef.current) observer.observe(heroRef.current)

    return () => {
      window.removeEventListener('resize', checkDevice)
      clearTimeout(t)
      observer.disconnect()
    }
  }, [])

  const posters = [
    { type: "video", src: `${BASE}P1.mp4` }, { type: "video", src: `${BASE}P2.mp4` },
    { type: "image", src: `${BASE}P3.jpg` }, { type: "image", src: `${BASE}P4.jpg` },
    { type: "image", src: `${BASE}P5.jpg` }, { type: "image", src: `${BASE}P6.jpg` },
    { type: "image", src: `${BASE}P7.png` }, { type: "image", src: `${BASE}P8.jpg` },
    { type: "image", src: `${BASE}P9.jpg` }, { type: "image", src: `${BASE}P10.jpg` },
    { type: "image", src: `${BASE}P11.jpg` }, { type: "image", src: `${BASE}P12.jpg` },
    { type: "image", src: `${BASE}P13.jpg` }, { type: "image", src: `${BASE}P14.jpg` },
    { type: "image", src: `${BASE}P15.png` }, { type: "image", src: `${BASE}P16.jpg` },
    { type: "image", src: `${BASE}P17.jpg` }, { type: "image", src: `${BASE}P18.png` },
    { type: "image", src: `${BASE}P19.jpg` }, { type: "image", src: `${BASE}P20.jpg` },
    { type: "image", src: `${BASE}P21.jpg` }, { type: "image", src: `${BASE}P22.png` }
  ]

  const extras = [
    { img: `${BASE}M1.png`, link: null },
    { img: `${BASE}M2.png`, link: null },
    { img: `${BASE}M3.png`, link: null },
    { img: `${BASE}M4.png`, link: null },
   { img: "M5.png", link: "manual.pdf" } // Solo el nombre del archivo
  ]

  return (
    <main className="page">
      <div className={`background-layer ${showDither ? "is-visible" : "is-hidden"}`}>
        <Dither waveIntensity={0.15} colorNum={3} pixelSize={3} />
        <div className="overlay"></div>
      </div>

      <section className="hero" ref={heroRef}>
        <div className="ascii-container">
          {isMobile ? (
            <h1 className="mobile-hero-title">PORTFOLIO</h1>
          ) : (
            ready && (
              <AsciiText
                text="PORTFOLIO"
                characters="01"
                textFontSize={75}
                planeAspectRatio={900 / 220}
                enableMouseInteraction
                color="white"
              />
            )
          )}
        </div>
        <p className="scroll-hint">explorar ↓</p>
      </section>

      <section className="about-split">
        <div className="profile-photo">
          <img src={`${BASE}1.png`} className="my-photo" alt="Eze" />
        </div>
        <div className="about-content">
          <span className="tag">INFO // ROSARIO_ARG_2007</span>
          <h2 className="name-title">EZEQUIEL NATINO</h2>
          <p className="main-text">
            DISEÑADOR DE 19 AÑOS. FORMADO EN LA <span className="highlight">EETP 625</span> Y PROYECTANDO EN LA <span className="outline">FAPyD — UNR</span>.
          </p>
          <div className="capabilities">VISUAL STRATEGY — MOTION DESIGN — POSTER ART</div>
        </div>
      </section>

      <div className="full-width-carousel">
        <h2 className="section-title">SELECTED WORKS ({posters.length})</h2>
        <div className="carousel-container">
          <div className="track">
            {[...posters, ...posters].map((item, i) => (
              <div className="poster-card" key={i} onClick={() => setSelectedIndex(i % posters.length)}>
                {item.type === "video" 
                  ? <video src={item.src} autoPlay loop muted playsInline preload="metadata" /> 
                  : <img src={item.src} alt="Poster" />
                }
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="extras-section">
        <h2 className="section-title">EXTRAS / ARCHIVE</h2>
        <div className="extras-full-container">
          {extras.map((item, i) => (
            <div 
              key={i} 
              className="extra-full-item" 
              onClick={() => {
                if (item.link) {
                  window.open(item.link, '_blank');
                } else {
                  setSelectedExtra(item.img);
                }
              }}
            >
              <img src={item.img} className="full-img-view" alt="Extra" />
              {item.link && <span className="view-pdf-tag">VER MANUAL DE MARCA PDF</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="contact">
        <h2 className="section-title">CONTACTO</h2>
        <div className="contact-buttons">
          <a href="https://www.instagram.com/eze.psd/" target="_blank" rel="noreferrer" className="contact-btn">Instagram</a>
          <a href="mailto:ezequielnatino@gmail.com" className="contact-btn">Email</a>
        </div>
        <p className="footer-tag">ROSARIO — ARGENTINA</p>
      </section>

      {selectedIndex !== null && (
        <div className="lightbox" onClick={() => setSelectedIndex(null)}>
          <button className="close-btn">×</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {posters[selectedIndex].type === "video" 
              ? <video src={posters[selectedIndex].src} controls autoPlay /> 
              : <img src={posters[selectedIndex].src} alt="Full" />
            }
          </div>
        </div>
      )}

      {selectedExtra && (
        <div className="lightbox" onClick={() => setSelectedExtra(null)}>
          <button className="close-btn">×</button>
          <img src={selectedExtra} className="extra-view" alt="Extra" />
        </div>
      )}
    </main>
  )
}