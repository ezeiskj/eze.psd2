import { useEffect, useState, useRef } from "react"
import { AsciiText, Dither } from "@appletosolutions/reactbits"
import "./style.css"

export default function App() {

  const [ready,setReady] = useState(false)
  const [showDither,setShowDither] = useState(false)
  const [selectedIndex,setSelectedIndex] = useState(null)
  const [selectedExtra,setSelectedExtra] = useState(null)

  const heroRef = useRef(null)

  useEffect(()=>{
    const t = setTimeout(()=>setReady(true),200)
    const observer = new IntersectionObserver(
      ([entry])=>{
        setShowDither(!entry.isIntersecting)
      },
      {threshold:0.1}
    )
    if(heroRef.current) observer.observe(heroRef.current)
    return ()=>{
      clearTimeout(t)
      observer.disconnect()
    }
  },[])

  const posters=[
    {type:"video",src:"/P1.mp4"},
    {type:"video",src:"/P2.mp4"},
    {type:"image",src:"/P3.jpg"},
    {type:"image",src:"/P4.jpg"},
    {type:"image",src:"/P5.jpg"},
    {type:"image",src:"/P6.jpg"},
    {type:"image",src:"/P7.png"},
    {type:"image",src:"/P8.jpg"},
    {type:"image",src:"/P9.jpg"},
    {type:"image",src:"/P10.jpg"},
    {type:"image",src:"/P11.jpg"},
    {type:"image",src:"/P12.jpg"},
    {type:"image",src:"/P13.jpg"},
    {type:"image",src:"/P14.jpg"},
    {type:"image",src:"/P15.png"},
    {type:"image",src:"/P16.jpg"},
    {type:"image",src:"/P17.jpg"},
    {type:"image",src:"/P18.png"},
    {type:"image",src:"/P19.jpg"},
    {type:"image",src:"/P20.jpg"},
    {type:"image",src:"/P21.jpg"},
    {type:"image",src:"/P22.png"}
  ]

  const extras=["/M1.png","/M2.png","/M3.png"]

  const nextImg=(e)=>{
    e.stopPropagation()
    setSelectedIndex((prev)=>(prev+1)%posters.length)
  }

  const prevImg=(e)=>{
    e.stopPropagation()
    setSelectedIndex((prev)=>(prev-1+posters.length)%posters.length)
  }

  return(
    <main className="page">
      <div className={`background-layer ${showDither?"is-visible":"is-hidden"}`}>
        <Dither waveIntensity={0.15} colorNum={3} pixelSize={3}/>
        <div className="overlay"></div>
      </div>

      <section className="hero" ref={heroRef}>
        <div className="ascii-container">
          {ready&&(
            <AsciiText
              text="PORTFOLIO"
              characters="01"
              textFontSize={50}
              enableMouseInteraction
              color="white"
            />
          )}
        </div>
        <p className="scroll-hint">explorar ↓</p>
      </section>

      <section className="about-split">
        <div className="profile-photo">
          <img src="/1.png" className="my-photo"/>
        </div>
        <div className="about-content">
          <span className="tag">INFO // ROSARIO_ARG_2007</span>
          <h2 className="name-title">EZEQUIEL NATINO</h2>
          <p className="main-text">
            DISEÑADOR DE 19 AÑOS. FORMADO EN LA
            <span className="highlight"> EETP 625 </span>
            Y PROYECTANDO EN LA
            <span className="outline"> FAPyD — UNR</span>.
          </p>
          <div className="capabilities">
            VISUAL STRATEGY — MOTION DESIGN — POSTER ART
          </div>
        </div>
      </section>

      <div className="full-width-carousel">
        <h2 className="section-title">SELECTED WORKS ({posters.length})</h2>
        <div className="carousel-container">
          <div className="track">
            {[...posters,...posters].map((item,i)=>(
              <div
                className="poster-card"
                key={i}
                onClick={()=>setSelectedIndex(i%posters.length)}
              >
                {item.type==="video"
                  ?<video src={item.src} autoPlay loop muted playsInline preload="metadata"/>
                  :<img src={item.src}/>
                }
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="extras-section">
        <h2 className="section-title">EXTRAS / ARCHIVE</h2>
        <div className="extras-full-container">
          {extras.map((img,i)=>(
            <div
              key={i}
              className="extra-full-item"
              onClick={()=>setSelectedExtra(img)}
            >
              <img src={img} className="full-img-view"/>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN CONTACTO INTEGRADA */}
      <section className="contact">
        <h2 className="section-title">CONTACTO</h2>
        <div className="contact-buttons">
          <a href="https://www.instagram.com/eze.psd/" target="_blank" rel="noreferrer" className="contact-btn">
            Instagram
          </a>
          <a href="mailto:ezequielnatino@gmail.com" className="contact-btn">
            Email
          </a>
        </div>
        <p className="footer-tag">ROSARIO — ARGENTINA</p>
      </section>

      {selectedIndex!==null&&(
        <div className="lightbox" onClick={()=>setSelectedIndex(null)}>
          <button className="close-btn">×</button>
          <button className="nav-btn prev" onClick={prevImg}>←</button>
          <div className="lightbox-content" onClick={(e)=>e.stopPropagation()}>
            {posters[selectedIndex].type==="video"
              ?<video src={posters[selectedIndex].src} controls autoPlay preload="metadata"/>
              :<img src={posters[selectedIndex].src}/>
            }
          </div>
          <button className="nav-btn next" onClick={nextImg}>→</button>
        </div>
      )}

      {selectedExtra&&(
        <div className="lightbox" onClick={()=>setSelectedExtra(null)}>
          <img src={selectedExtra} className="extra-view"/>
        </div>
      )}
    </main>
  )
}
