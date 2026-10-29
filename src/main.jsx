import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, Phone, Mail, MapPin, Menu, X, Trees, Check, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import site from '../content/site.json';
import home from '../content/home.json';
import about from '../content/about.json';
import services from '../content/services.json';
import gallery from '../content/gallery.json';
import contact from '../content/contact.json';
import legalContent from '../content/legal.json';
import './style.css';

const projects = gallery.items ?? [];
const phoneLink = `tel:${contact.phone}`;
const emailLink = `mailto:${contact.email}`;

function Paragraphs({ text }) {
  return (text || '').split(/\r?\n\s*\r?\n/).filter(Boolean).map((paragraph, index) => (
    <p className="content-text" key={index}>{paragraph}</p>
  ));
}

function Brand() {
  return <a className="brand" href="#start" aria-label="Zur Startseite">
    <span className="brand-icon"><Trees size={30} strokeWidth={1.4} /></span>
    <span>{site.brandTitle}<small>{site.brandSubtitle}</small></span>
  </a>;
}

function Address() {
  return <p>{site.companyName}<br />{contact.street}<br />{contact.city}</p>;
}

function LegalSections({ sections }) {
  return (sections ?? []).map((section, index) => <section key={index}>
    <h3>{section.title}</h3><Paragraphs text={section.text} />
  </section>);
}

function App() {
  const [menu, setMenu] = useState(false);
  const [legal, setLegal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef(null);
  const selectedProject = selected === null ? null : projects[selected];
  const legalDocument = legal === 'Impressum' ? legalContent.imprint : legalContent.privacy;
  const close = () => { setLegal(null); setSelected(null); };

  useEffect(() => {
    if (legal || selectedProject) dialog.current?.showModal();
    else dialog.current?.close();
  }, [legal, selectedProject]);

  useEffect(() => {
    document.title = site.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', site.description);
  }, []);

  return <>
    <header>
      <div className="nav-wrap">
        <Brand />
        <nav id="main-navigation" className={menu ? 'open' : ''} aria-label="Hauptnavigation">
          {[['Über uns', 'ueber-uns'], ['Leistungen', 'leistungen'], ['Bilder', 'einblicke']].map(([label, id]) => (
            <a key={id} href={'#' + id} onClick={() => setMenu(false)}>{label}</a>
          ))}
          <a className="nav-contact" href="#kontakt" onClick={() => setMenu(false)}>Kontakt <Phone size={17} /></a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label={menu ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={menu} aria-controls="main-navigation">
          {menu ? <X /> : <Menu />}
        </button>
      </div>
    </header>
    <main>
      <section className="hero" id="start">
        <img className="hero-image" src={home.image} alt="" aria-hidden="true" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <h1 className="content-text">{home.title}</h1>
          <Paragraphs text={home.text} />
          <div className="hero-actions">
            <a className="button lime" href={phoneLink}><Phone size={19} /> {contact.phoneDisplay}</a>
            <a className="text-link" href="#leistungen">{home.servicesButton} <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>
      {(site.trust ?? []).length > 0 && <div className="trust-bar"><div className="container">
        {site.trust.map((text, index) => <span key={index}><Check /> {text}</span>)}
      </div></div>}
      <section className="section container" id="ueber-uns">
        <div className="about-panel">
          <div className="about-copy">
            <h2>{about.title}</h2>
            <Paragraphs text={about.text} />
            <a className="button green" href="#kontakt">{about.contactButton} <ArrowRight size={18} /></a>
          </div>
          <figure className="about-visual">
            <img src={about.image} alt={about.alt} loading="lazy" />
            {about.caption && <figcaption>{about.caption}</figcaption>}
          </figure>
        </div>
      </section>
      <section className="services section" id="leistungen">
        <div className="container">
          <div className="section-heading"><h2>{services.title}</h2><Paragraphs text={services.intro} /></div>
          <div className="service-grid">
            {(services.items ?? []).map((service, index) => <article className="service" key={index}>
              {service.image ? <figure>
                <img src={service.image} alt={service.alt} loading="lazy" />
                {service.caption && <figcaption>{service.caption}</figcaption>}
              </figure> : <div className="service-placeholder" role="img" aria-label={'Noch kein Foto für ' + service.title + ' vorhanden'}>
                <ImageIcon size={36} strokeWidth={1.3} aria-hidden="true" />
                <span>Foto folgt</span>
              </div>}
              <div className="service-copy">
                <h3>{service.title}</h3>
                <Paragraphs text={service.text} />
                <a className="inline-link" href={emailLink + '?subject=' + encodeURIComponent('Anfrage: ' + service.title)} aria-label={service.title + ' anfragen'}>Anfragen <ArrowRight size={18} /></a>
              </div>
            </article>)}
          </div>
        </div>
      </section>
      <section className="section container" id="einblicke">
        <div className="section-heading"><h2>{gallery.title}</h2><Paragraphs text={gallery.intro} /></div>
        <div className="projects">
          {projects.slice(0, expanded ? projects.length : 3).map((project, index) => <button className="project" key={index} onClick={() => setSelected(index)} aria-label={project.title + ' – Bild vergrößern'}>
            <div className="project-image">
              <img src={project.image} alt={project.alt} loading="lazy" />
              <span className="project-open"><ArrowUpRight size={22} /></span>
            </div>
            <h3>{project.title}</h3>
            <Paragraphs text={project.text} />
          </button>)}
        </div>
        {projects.length > 3 && <div className="center"><button className="button outline" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Weniger Bilder anzeigen' : 'Weitere Bilder ansehen'} <span>{expanded ? '−' : '+'}</span>
        </button></div>}
      </section>
      <section className="contact" id="kontakt">
        <div className="container contact-grid">
          <div><h2>{contact.title}</h2><Paragraphs text={contact.text} /><a className="button lime" href={emailLink}>E-Mail schreiben <Mail size={19} /></a></div>
          <div className="contact-details">
            <a href={phoneLink}><Phone /><span><small>Telefon</small><strong>{contact.phoneDisplay}</strong></span><ArrowUpRight /></a>
            <a href={emailLink}><Mail /><span><small>E-Mail</small><strong className="email">{contact.email}</strong></span><ArrowUpRight /></a>
            <div><MapPin /><span><small>Büro</small><strong>{contact.street}<br />{contact.city}</strong></span></div>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <div className="container footer-top"><Brand /><a href="#start" className="back-top">Zurück nach oben ↑</a></div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {site.companyName}</span>
        <div><button onClick={() => setLegal('Impressum')}>Impressum</button><button onClick={() => setLegal('Datenschutz')}>Datenschutz</button></div>
      </div>
    </footer>
    <dialog ref={dialog} aria-label={selectedProject ? selectedProject.title : legal || 'Bildansicht'} onCancel={close} onClick={event => { if (event.target === dialog.current) close(); }}>
      <button className="dialog-close" onClick={close} aria-label="Schließen"><X /></button>
      {selectedProject ? <div className="lightbox">
        <img src={selectedProject.image} alt={selectedProject.alt} />
        <div className="lightbox-copy">
          <div><h3>{selectedProject.title}</h3><Paragraphs text={selectedProject.text} /></div>
          {projects.length > 1 && <div className="lightbox-nav">
            <button aria-label="Vorheriges Bild" onClick={() => setSelected((selected + projects.length - 1) % projects.length)}><ChevronLeft /></button>
            <button aria-label="Nächstes Bild" onClick={() => setSelected((selected + 1) % projects.length)}><ChevronRight /></button>
          </div>}
        </div>
      </div> : legal && <div className="legal">
        <h2>{legal}</h2>
        <Address />
        <h3>Kontakt</h3><p>Telefon: {contact.phoneDisplay}<br />E-Mail: {contact.email}</p>
        {legalDocument.notice && <div className="notice">{legalDocument.notice}</div>}
        <LegalSections sections={legalDocument.sections} />
      </div>}
    </dialog>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
