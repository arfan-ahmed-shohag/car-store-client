import { useEffect, type MouseEvent, type ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, CalendarDays, Mail, ShieldCheck } from "lucide-react";
import { footerContent } from "../shared/footerData";
import "./PrivacyPolicy.css";
import "../shared/PageHero.css";

interface PolicySection {
  id: string;
  title: string;
  content: ReactNode;
}

const lastUpdated = { dateTime: "2026-10-28", label: "October 28, 2026" };

const policySections: PolicySection[] = [
  {
    id: "privacy-information",
    title: "Information you provide",
    content: (
      <>
        <p>The information you share depends on how you use AutoSphere:</p>
        <ul>
          <li><strong>Account and profile:</strong> your name, email address, phone number, password and uploaded profile photo. Profile forms also let you provide details such as your date of birth, gender, location and a short biography.</li>
          <li><strong>Orders:</strong> the car you select, quantity, order reference and order or payment status associated with your account.</li>
          <li><strong>Messages:</strong> your name, email address and the information you include when you contact our team.</li>
          <li><strong>Reviews:</strong> the rating and comment you submit about a car.</li>
        </ul>
        <p>Please share only the information needed for your request. Avoid including passwords, payment card details or other sensitive information in messages or reviews.</p>
      </>
    ),
  },
  {
    id: "privacy-use",
    title: "How your information is used",
    content: (
      <>
        <p>Information submitted through the site supports the features you choose to use. This includes creating and signing in to your account, maintaining your profile, handling order requests and checking order or payment status.</p>
        <p>Contact details and messages help our team respond to your questions. Submitted reviews appear alongside the relevant car so other visitors can read your feedback.</p>
        <p>Newsletter subscriptions are not currently active. The newsletter form does not send your email address to a mailing-list service.</p>
      </>
    ),
  },
  {
    id: "privacy-storage",
    title: "Browser storage and cookies",
    content: (
      <>
        <p>AutoSphere uses browser storage to remember your sign-in state, cart items, wishlist and light or dark theme preference between visits. Sign-in services may also use session cookies.</p>
        <p>You can manage cookies and remove saved site data through your browser settings. Doing so may sign you out, clear saved items or reset your preferences. Some account features may not work as expected when the storage they rely on is blocked.</p>
        <p>Removing data from your browser does not delete your account, orders or information already submitted to our services.</p>
      </>
    ),
  },
  {
    id: "privacy-services",
    title: "Services and external links",
    content: (
      <>
        <p>Account details, orders, reviews and contact messages are sent to the services that support those features. Uploaded profile photos are sent to Cloudinary for image hosting.</p>
        <p>Loading externally hosted images connects your browser to the image provider. Following a social link, opening WhatsApp or continuing to an external checkout takes you to another service, where its own privacy information applies.</p>
        <p>You can read <a href="https://cloudinary.com/privacy" target="_blank" rel="noopener noreferrer">Cloudinary's privacy notice <ArrowUpRight aria-hidden="true" /></a> for information about that provider. Check the relevant provider's notice before sharing information on an external service.</p>
      </>
    ),
  },
  {
    id: "privacy-reviews",
    title: "Information visible to other visitors",
    content: (
      <>
        <p>Car reviews can display your name, rating, comment and review date publicly. Take a moment to check your review before submitting it, and leave out personal contact details or information about someone else.</p>
        <p>You can manage your submitted reviews from your account. If you need help with information that is already visible, contact our team with a link to the car or review.</p>
      </>
    ),
  },
  {
    id: "privacy-retention",
    title: "Keeping and protecting information",
    content: (
      <>
        <p>Browser-saved information remains until it is removed or replaced. Retention of account, order and support records can differ from information saved on your device. Contact us to ask about a particular record or request its removal.</p>
        <p>Some records may need to remain available to complete an order, address an unresolved request or meet applicable obligations. Our team can explain what applies to your request.</p>
        <p>Keep your password private and sign out on shared devices. No online service can guarantee complete security. If you suspect someone has accessed your account without permission, contact us promptly.</p>
      </>
    ),
  },
  {
    id: "privacy-choices",
    title: "Your choices and requests",
    content: (
      <>
        <p>You can update the available profile fields and manage your reviews from your account. You can also clear browser-saved preferences using your browser settings.</p>
        <p>To ask about access to your information, request a correction or ask for account or data deletion, email our team using the contact details below. Describe what you need and include the email address associated with your account.</p>
        <p>We may need to confirm that a request relates to your account before discussing account information or making changes. Please do not send your password as proof of identity.</p>
      </>
    ),
  },
  {
    id: "privacy-updates",
    title: "Updates to this policy",
    content: <p>This page may be updated as the site and its features change. The date at the top of this notice shows when its content was last revised. Visit this page again when you want to check the current information.</p>,
  },
  {
    id: "privacy-contact",
    title: "Contact us about privacy",
    content: (
      <>
        <p>If you have a question about this policy or information you have shared with AutoSphere, get in touch with our team.</p>
        <address className="privacy-contact">
          <div><span>Email</span><a href={`mailto:${footerContent.email}`}>{footerContent.email}</a></div>
          <div><span>Phone</span><a href={`tel:${footerContent.phone.replace(/^0/, "+880")}`}>{footerContent.phone}</a></div>
        </address>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Privacy Policy | AutoSphere";
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "auto" });
    return () => { document.title = previousTitle; };
  }, []);

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <main className="privacy-page">
      <section className="page-hero privacy-hero" aria-labelledby="privacy-title">
        <img className="page-hero__image privacy-hero__image" src="/images/promotions/porsche-road.webp" alt="" />
        <div className="page-hero__shade" aria-hidden="true" />
        <div className="page-hero__content">
          <p className="page-hero__eyebrow">Privacy Policy</p>
          <h1 className="page-hero__title" id="privacy-title">Your information.<br /><span>Your choices.</span></h1>
          <p className="page-hero__description">Understand the information you share with AutoSphere, how the site uses it and where to turn with questions.</p>
        </div>
      </section>

      <div className="privacy-content">
        <div className="privacy-page__container privacy-layout">
          <aside className="privacy-sidebar" aria-label="Policy navigation and help">
            <nav className="privacy-contents" aria-labelledby="privacy-contents-title">
              <h2 id="privacy-contents-title">On this page</h2>
              <ol>
                {policySections.map(({ id, title }, index) => (
                  <li key={id}><a href={`#${id}`}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{title}</a></li>
                ))}
              </ol>
            </nav>
            <div className="privacy-help">
              <Mail aria-hidden="true" />
              <h2>Let's talk about privacy.</h2>
              <p>Have a question about your information? Our team can help you find the next step.</p>
              <Link to="/contact" onClick={handleNavigation}>Contact our team <ArrowRight aria-hidden="true" /></Link>
            </div>
          </aside>

          <article className="privacy-document" aria-labelledby="privacy-document-title">
            <header className="privacy-document__header">
              <span className="privacy-document__icon"><ShieldCheck aria-hidden="true" /></span>
              <p className="privacy-page__eyebrow">Privacy Policy</p>
              <h2 id="privacy-document-title">Privacy, in plain language.</h2>
              <p className="privacy-document__intro">AutoSphere helps you explore cars, manage your account and connect with our team. This notice explains the information involved when you use these features and the choices available to you.</p>
              <p className="privacy-document__updated"><CalendarDays aria-hidden="true" /> Last updated <time dateTime={lastUpdated.dateTime}>{lastUpdated.label}</time></p>
            </header>

            {policySections.map(({ id, title, content }, index) => (
              <section className="privacy-section" id={id} key={id} aria-labelledby={`${id}-title`}>
                <h2 id={`${id}-title`}><span className="privacy-section__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{title}</h2>
                <div className="privacy-section__copy">{content}</div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}
