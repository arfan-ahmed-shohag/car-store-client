import { useEffect, type MouseEvent, type ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRight, CalendarDays, FileText, MessageSquare } from "lucide-react";
import { footerContent } from "../shared/footerData";
import "./TermsAndConditions.css";
import "../shared/PageHero.css";

interface TermsSection {
  id: string;
  title: string;
  content: ReactNode;
}

const lastUpdated = { dateTime: "2026-10-28", label: "October 28, 2026" };

const termsSections: TermsSection[] = [
  {
    id: "terms-website",
    title: "Using AutoSphere",
    content: (
      <>
        <p>AutoSphere lets you explore cars, view listing details, create an account, submit order requests and contact our team. These terms explain the responsibilities that come with using those features.</p>
        <p>Use the site lawfully and provide accurate information when creating an account, placing an order or contacting us. Only submit orders and payment instructions that you are authorised to make.</p>
        <p>The details of a vehicle purchase, including the specific car, final price and handover arrangements, should be confirmed with our team before you proceed.</p>
      </>
    ),
  },
  {
    id: "terms-account",
    title: "Your account and security",
    content: (
      <>
        <p>Keep your account details current so we can contact you about your orders or questions. Protect your password, avoid sharing your sign-in details and sign out when using a shared device.</p>
        <p>Contact us promptly if you suspect someone is using your account without permission. Please do not send your password in a message or review.</p>
        <p>Creating an account, saving a car to your wishlist or adding it to your cart does not reserve that vehicle.</p>
      </>
    ),
  },
  {
    id: "terms-listings",
    title: "Car listings and availability",
    content: (
      <>
        <p>Read the individual car listing carefully and ask about any information that is missing or unclear. Confirm the exact vehicle, condition, specifications, mileage, available colors and current stock before making a purchase.</p>
        <p>Some collection and promotional previews use sample vehicles, images and prices. A preview is not confirmation that the pictured car or offer is available to purchase.</p>
        <p>If you notice a difference between a listing, an image and the information provided by our team, ask us to clarify it before proceeding.</p>
      </>
    ),
  },
  {
    id: "terms-prices",
    title: "Prices and payments",
    content: (
      <>
        <p>Confirm the final price and currency for your selected car before paying. Ask our team to explain any additional costs, such as delivery, registration or other charges, and any conditions attached to a promotional offer.</p>
        <p>Checkout may take you to an external payment service. Check the amount, currency and payment instructions there, and keep your order and transaction references for future questions.</p>
        <p>A payment screen or transaction reference should be checked alongside the order and payment status. If a payment appears incomplete, duplicated or incorrect, contact our team before trying again.</p>
      </>
    ),
  },
  {
    id: "terms-orders",
    title: "Orders and handover",
    content: (
      <>
        <p>Check the selected car, quantity and your contact information before submitting an order. Sign in and open My Orders to review the order information and status associated with your account.</p>
        <p>Before completing your purchase, confirm these details with our team:</p>
        <ul>
          <li>The vehicle being purchased and confirmation of its availability.</li>
          <li>The agreed total, payment method and any outstanding amount.</li>
          <li>Collection or delivery arrangements, timing and any related charges.</li>
          <li>Documents, registration requirements and handover details relevant to your purchase.</li>
        </ul>
        <p>If you need to correct an order or ask about its progress, contact us with your order reference.</p>
      </>
    ),
  },
  {
    id: "terms-cancellations",
    title: "Cancellations, refunds and warranty",
    content: (
      <>
        <p>For a cancellation, return, refund or change request, contact our team promptly with your order reference and explain what you need. Your account also includes a cancellation option; delivered or already cancelled orders cannot be cancelled through that button.</p>
        <p>Order cancellation and payment refunds are separate processes. A cancelled order status does not by itself confirm that a payment has been refunded. Ask our team to confirm the applicable conditions and the progress of any refund request.</p>
        <p>Warranty coverage depends on the specific car and the terms provided for that purchase. Confirm the coverage, duration, exclusions and how to request support before completing the purchase.</p>
        <p>Nothing in these terms is intended to take away rights that apply to your purchase under applicable law.</p>
      </>
    ),
  },
  {
    id: "terms-reviews",
    title: "Reviews and acceptable use",
    content: (
      <>
        <p>Share honest, relevant feedback when submitting a car review. Reviews may display your name, rating, comment and review date publicly. You can manage your submitted reviews from your account.</p>
        <p>Do not post misleading content, abusive messages, spam, private information about other people or material you do not have permission to share. Do not attempt to access another person's account, interfere with the site or misuse its services.</p>
      </>
    ),
  },
  {
    id: "terms-privacy",
    title: "Privacy and external services",
    content: (
      <>
        <p>Our <Link to="/privacy-policy">Privacy Policy</Link> explains the information involved in using your account, orders, messages and reviews, as well as browser storage and your available choices.</p>
        <p>External checkout, image-hosting services, social platforms and messaging services have their own terms and privacy information. Review the relevant provider's information when you use those services.</p>
      </>
    ),
  },
  {
    id: "terms-updates",
    title: "Updates to these terms",
    content: (
      <>
        <p>These terms may be updated as the site and its services change. The date at the top of this page shows when the content was last revised.</p>
        <p>Publishing an update does not, by itself, change the terms already agreed for an existing purchase. If you have an ongoing order, contact our team if you are unsure which terms apply to it.</p>
      </>
    ),
  },
  {
    id: "terms-contact",
    title: "Questions and support",
    content: (
      <>
        <p>If anything on this page is unclear, talk to our team before placing an order. For an existing order, include your order reference and the email address associated with your account so we can find the relevant information.</p>
        <address className="terms-contact">
          <div><span>Email</span><a href={`mailto:${footerContent.email}`}>{footerContent.email}</a></div>
          <div><span>Phone</span><a href={`tel:${footerContent.phone.replace(/^0/, "+880")}`}>{footerContent.phone}</a></div>
        </address>
      </>
    ),
  },
];

export default function TermsAndConditions() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Terms & Conditions | AutoSphere";
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "auto" });
    return () => { document.title = previousTitle; };
  }, []);

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <main className="terms-page">
      <section className="page-hero terms-hero" aria-labelledby="terms-title">
        <img className="page-hero__image terms-hero__image" src="/images/promotions/porsche-road.webp" alt="" />
        <div className="page-hero__shade" aria-hidden="true" />
        <div className="page-hero__content">
          <p className="page-hero__eyebrow">Terms &amp; Conditions</p>
          <h1 className="page-hero__title" id="terms-title">Clear terms.<br /><span>Confident choices.</span></h1>
          <p className="page-hero__description">A guide to using AutoSphere, understanding your orders and knowing what to check before your next purchase.</p>
        </div>
      </section>

      <div className="terms-content">
        <div className="terms-page__container terms-layout">
          <aside className="terms-sidebar" aria-label="Terms navigation and help">
            <nav className="terms-contents" aria-labelledby="terms-contents-title">
              <h2 id="terms-contents-title">On this page</h2>
              <ol>
                {termsSections.map(({ id, title }, index) => (
                  <li key={id}><a href={`#${id}`}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{title}</a></li>
                ))}
              </ol>
            </nav>
            <div className="terms-help">
              <MessageSquare aria-hidden="true" />
              <h2>A question before you decide?</h2>
              <p>Talk through the details with our team and make your next step a clear one.</p>
              <Link to="/contact" onClick={handleNavigation}>Contact our team <ArrowRight aria-hidden="true" /></Link>
            </div>
          </aside>

          <article className="terms-document" aria-labelledby="terms-document-title">
            <header className="terms-document__header">
              <span className="terms-document__icon"><FileText aria-hidden="true" /></span>
              <p className="terms-page__eyebrow">Before your next drive</p>
              <h2 id="terms-document-title">Terms &amp; Conditions</h2>
              <p className="terms-document__intro">Please read these terms before using your account or placing an order. They explain how the site works, what to confirm about a purchase and how to get help if you need it.</p>
              <p className="terms-document__updated"><CalendarDays aria-hidden="true" /> Last updated <time dateTime={lastUpdated.dateTime}>{lastUpdated.label}</time></p>
            </header>

            {termsSections.map(({ id, title, content }, index) => (
              <section className="terms-section" id={id} key={id} aria-labelledby={`${id}-title`}>
                <h2 id={`${id}-title`}><span className="terms-section__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{title}</h2>
                <div className="terms-section__copy">{content}</div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}
