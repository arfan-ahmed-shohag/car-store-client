import { useEffect, type MouseEvent } from "react";
import { ArrowUpRight, CarFront } from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { Link, useLocation } from "react-router";
import BrandLogo from "./BrandLogo";
import { footerContent, footerNavigation, footerSocialProfiles } from "./footerData";
import "./Footer.css";

const Footer = () => {
  const location = useLocation();
  const socialLinks = [
    { label: "Facebook profile", icon: FaFacebookF, href: footerSocialProfiles.facebook },
    { label: "LinkedIn profile", icon: FaLinkedinIn, href: footerSocialProfiles.linkedin },
    { label: "GitHub profile", icon: FaGithub, href: footerSocialProfiles.github },
    { label: "Chat on WhatsApp", icon: FaWhatsapp, href: footerSocialProfiles.whatsapp },
  ];

  const scrollPageToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || event.currentTarget.hash) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    if (!location.hash) return;
    const section = document.getElementById(location.hash.slice(1));
    if (!section) return;
    window.scrollTo({ top: Math.max(0, section.getBoundingClientRect().top + window.scrollY - 96), behavior: "auto" });
  }, [location.hash, location.key]);

  return (
    <footer className="site-footer">
      <div className="site-footer__container site-footer__main">
        <div className="site-footer__grid">
          <div id="autosphere-about" className="site-footer__brand">
            <Link to="/" className="site-footer__logo" aria-label="AutoSphere home" onClick={scrollPageToTop}><BrandLogo /></Link>
            <p>{footerContent.description}</p>
          </div>

          {footerNavigation.map((group) => (
            <nav key={group.title} className="site-footer__navigation" aria-label={`Footer ${group.title}`}>
              <h2>{group.title}</h2>
              <ul>
                {group.links.map((link) => <li key={link.label}><Link to={link.href} onClick={scrollPageToTop}>{link.label}</Link></li>)}
              </ul>
            </nav>
          ))}

          <div className="site-footer__contact">
            <h2>Contact Us</h2>
            <address>
              <p><span className="site-footer__label">Address:</span> {footerContent.address}</p>
              <p><span className="site-footer__label">Phone:</span> <a href={`tel:${footerContent.phone.replace(/^0/, "+880")}`}>{footerContent.phone}</a></p>
              <p><span className="site-footer__label">Email:</span> <a href={`mailto:${footerContent.email}`}>{footerContent.email}</a></p>
              <p><span className="site-footer__label">WhatsApp:</span> <a href={footerSocialProfiles.whatsapp} target="_blank" rel="noopener noreferrer">{footerContent.whatsapp}</a></p>
            </address>
            <Link to="/contact" className="site-footer__contact-link" onClick={scrollPageToTop}>Send us a message <ArrowUpRight aria-hidden="true" /></Link>
          </div>
        </div>

        <nav className="site-footer__socials" aria-label="Connect with AutoSphere">
          {socialLinks.map(({ label, icon: Icon, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
              <Icon aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>

      <div className="site-footer__bottom">
        <div className="site-footer__container site-footer__bottom-inner">
          <p>&copy; {new Date().getFullYear()} <Link to="/" onClick={scrollPageToTop}>AutoSphere</Link>. All rights reserved.</p>
          <p className="site-footer__tagline"><CarFront aria-hidden="true" /> Your journey starts here.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
