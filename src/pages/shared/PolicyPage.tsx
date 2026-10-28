import { useEffect, type MouseEvent, type ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRight, CalendarDays, MessageSquare, type LucideIcon } from "lucide-react";
import { footerContent } from "./footerData";
import "./PolicyPage.css";
import "./PageHero.css";

export interface PolicySection {
  id: string;
  title: string;
  content: ReactNode;
}

interface PolicyPageProps {
  pageId: string;
  title: string;
  heroLines: [string, string];
  heroDescription: string;
  introduction: string;
  sections: PolicySection[];
  Icon: LucideIcon;
  lastUpdated: { dateTime: string; label: string };
}

export default function PolicyPage({ pageId, title, heroLines, heroDescription, introduction, sections, Icon, lastUpdated }: PolicyPageProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | AutoSphere`;
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "auto" });
    return () => { document.title = previousTitle; };
  }, [title]);

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const documentSections: PolicySection[] = [
    ...sections,
    {
      id: `${pageId}-contact`,
      title: "Questions and support",
      content: (
        <>
          <p>Contact our team if you need help with your purchase or any information on this page. Include your order reference, the car name and the email address associated with your account so we can find the relevant details.</p>
          <address className="policy-contact">
            <div><span>Email</span><a href={`mailto:${footerContent.email}`}>{footerContent.email}</a></div>
            <div><span>Phone</span><a href={`tel:${footerContent.phone.replace(/^0/, "+880")}`}>{footerContent.phone}</a></div>
          </address>
        </>
      ),
    },
  ];

  return (
    <main className={`policy-page ${pageId}-page`}>
      <section className="page-hero policy-hero" aria-labelledby={`${pageId}-title`}>
        <img className="page-hero__image policy-hero__image" src="/images/promotions/porsche-road.webp" alt="" />
        <div className="page-hero__shade" aria-hidden="true" />
        <div className="page-hero__content">
          <p className="page-hero__eyebrow">{title}</p>
          <h1 className="page-hero__title" id={`${pageId}-title`}>{heroLines[0]}<br /><span>{heroLines[1]}</span></h1>
          <p className="page-hero__description">{heroDescription}</p>
        </div>
      </section>

      <div className="policy-content">
        <div className="policy-page__container policy-layout">
          <aside className="policy-sidebar" aria-label="Policy navigation and help">
            <nav className="policy-contents" aria-labelledby={`${pageId}-contents-title`}>
              <h2 id={`${pageId}-contents-title`}>On this page</h2>
              <ol>
                {documentSections.map(({ id, title: sectionTitle }, index) => (
                  <li key={id}><a href={`#${id}`}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{sectionTitle}</a></li>
                ))}
              </ol>
            </nav>
            <div className="policy-help">
              <MessageSquare aria-hidden="true" />
              <h2>Let's talk it through.</h2>
              <p>Have a question about your order? Our team can help you understand the next step.</p>
              <Link to="/contact" onClick={handleNavigation}>Contact our team <ArrowRight aria-hidden="true" /></Link>
            </div>
          </aside>

          <article className="policy-document" aria-labelledby={`${pageId}-document-title`}>
            <header className="policy-document__header">
              <span className="policy-document__icon"><Icon aria-hidden="true" /></span>
              <p className="policy-page__eyebrow">Support for your purchase</p>
              <h2 id={`${pageId}-document-title`}>{title}</h2>
              <p className="policy-document__intro">{introduction}</p>
              <p className="policy-document__updated"><CalendarDays aria-hidden="true" /> Last updated <time dateTime={lastUpdated.dateTime}>{lastUpdated.label}</time></p>
            </header>

            {documentSections.map(({ id, title: sectionTitle, content }, index) => (
              <section className="policy-section" id={id} key={id} aria-labelledby={`${id}-title`}>
                <h2 id={`${id}-title`}><span className="policy-section__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{sectionTitle}</h2>
                <div className="policy-section__copy">{content}</div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}
