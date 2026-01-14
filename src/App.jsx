import { useEffect, useRef, useState } from 'react';
import { siteConfig } from './config';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { id: 'hero', label: siteConfig.nav.home },
    { id: 'blog', label: siteConfig.nav.blog },
    { id: 'socials', label: siteConfig.nav.socials },
    { id: 'about', label: siteConfig.nav.about },
    { id: 'cta', label: siteConfig.nav.services },
    { id: 'connect', label: siteConfig.nav.connect },
  ];

  const contentRef = useRef(null);
  const isLastSection = currentSection === sections.length - 1;

  useEffect(() => {
    const video = videoRef.current;
    const content = contentRef.current;
    if (!video || !content) return;

    const handleScroll = () => {
      const scrollY = content.scrollTop;
      const totalScrollHeight = content.scrollHeight - content.clientHeight;
      const scrollProgress = totalScrollHeight > 0 ? scrollY / totalScrollHeight : 0;

      const sectionIndex = Math.min(
        Math.floor(scrollProgress * sections.length),
        sections.length - 1
      );
      setCurrentSection(sectionIndex);

      // Scrub video up until the last section
      if (video.duration && sectionIndex < sections.length - 1) {
        // Scale progress to end video before last section
        const videoProgress = scrollProgress * (sections.length / (sections.length - 1));
        video.currentTime = Math.min(videoProgress * video.duration, video.duration);
      }
    };

    content.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => content.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      {/* Video background - hidden on last section */}
      <video
        ref={videoRef}
        className={`video-background ${isLastSection ? 'hidden' : ''}`}
        src="/cropped.mp4"
        muted
        playsInline
        preload="auto"
      />

      {/* Still image for Connect section */}
      <img
        src={siteConfig.connect.image}
        alt=""
        className={`image-background ${isLastSection ? 'visible' : ''}`}
      />

      <header className="header">
        <nav>
          {sections.map((section, i) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={currentSection === i ? 'active' : ''}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </header>

      <main ref={contentRef} className="content">
        <section id="hero" className="section section-hero">
          <h1>{siteConfig.hero.title}</h1>
          <p className="tagline">{siteConfig.hero.tagline}</p>
        </section>

        <section id="blog" className="section">
          <div className="section-card">
            <h2>{siteConfig.blog.heading}</h2>
            <article>
              <h3>{siteConfig.blog.postTitle}</h3>
              <p>{siteConfig.blog.postDescription}</p>
            </article>
            <a
              href={siteConfig.blog.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-large"
            >
              {siteConfig.blog.buttonText}
            </a>
          </div>
        </section>

        <section id="socials" className="section">
          <div className="section-card">
            <h2>{siteConfig.socials.heading}</h2>
            <p>{siteConfig.socials.description}</p>
            <div className="socials-links">
              {siteConfig.socials.links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-card">
            <h2>{siteConfig.about.heading}</h2>
            <p>{siteConfig.about.description}</p>
          </div>
        </section>

        <section id="cta" className="section section-cta">
          <div className="section-card">
            <h2>{siteConfig.services.heading}</h2>
            <p>{siteConfig.services.description}</p>
            <div className="button-group">
              <a
                href={siteConfig.services.button1Link}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-large"
              >
                {siteConfig.services.button1Text}
              </a>
              <a
                href={siteConfig.services.button2Link}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-large"
              >
                {siteConfig.services.button2Text}
              </a>
            </div>
          </div>
        </section>

        <section id="connect" className="section">
          <div className="section-card">
            <h2>{siteConfig.connect.heading}</h2>
            <p>{siteConfig.connect.description}</p>
          </div>
          <a
            href={siteConfig.connect.buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="triangle-button"
          >
            <span>cal.com link</span>
          </a>
        </section>
      </main>
    </div>
  );
}

export default App;
