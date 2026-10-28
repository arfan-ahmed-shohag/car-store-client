import { useEffect, useState, type MouseEvent } from "react";
import { Link } from "react-router";
import { ArrowRight, CarFront, Headphones, PackageCheck, Plus, ShoppingBag } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../components/ui/collapsible";
import { footerContent } from "../shared/footerData";
import "./Faq.css";
import "../shared/PageHero.css";

const faqTopics = [
  {
    id: "finding-a-car",
    title: "Finding your car",
    description: "Get to know the collection and find the details that matter to you.",
    Icon: CarFront,
    questions: [
      {
        id: "car-details",
        question: "Where can I find the full details of a car?",
        answer: "Open a car from the collection to see its detail page. You can explore the photos, description and listed specifications, including fuel type, transmission and mileage. If something you need is missing, contact our team with the car's name.",
      },
      {
        id: "choosing-a-car",
        question: "Can you help me choose the right car?",
        answer: "Tell us about your budget, daily journeys, preferred brands and the space you need. Our team can discuss the listings with you and help you understand which options might suit your lifestyle.",
      },
      {
        id: "car-colors",
        question: "How can I check the available colors?",
        answer: "When a car has color options, select a color swatch on its card to preview the corresponding images. Color choices vary by listing, so please confirm your preferred color and its availability with our team before ordering.",
      },
    ],
  },
  {
    id: "buying-a-car",
    title: "Buying & availability",
    description: "A few things to check before you take the next step.",
    Icon: ShoppingBag,
    questions: [
      {
        id: "car-availability",
        question: "How do I know if a car is still available?",
        answer: "Check the stock status shown on the car's detail page, then contact our team to confirm the latest availability. Stock, color options and listing details can change, so it helps to mention the exact car you are interested in.",
      },
      {
        id: "viewing-a-car",
        question: "Can I view a car before making a decision?",
        answer: "Contact our team about the car you would like to see. We can confirm whether a viewing or test drive can be arranged and discuss the location, timing and any requirements before you visit.",
      },
      {
        id: "car-price",
        question: "What should I confirm about the price and payment?",
        answer: "Before proceeding, ask our team to confirm the current price, the currency shown on the listing, accepted payment methods and any additional charges. Delivery, registration and other costs should be discussed for the specific car and your location.",
      },
    ],
  },
  {
    id: "orders-and-support",
    title: "Orders & support",
    description: "Know where to go for order updates and a little extra help.",
    Icon: PackageCheck,
    questions: [
      {
        id: "my-orders",
        question: "Where can I find my orders?",
        answer: "Sign in to your account and open My Orders to see your order information. If you need help with a particular order, contact our team with your order reference and the email address associated with your account.",
      },
      {
        id: "warranty-and-delivery",
        question: "What about warranty and delivery?",
        answer: "Check the warranty details on the individual car listing and ask our team to clarify the coverage and any conditions. Delivery options, times and costs depend on the car and your location; please confirm these before placing an order.",
      },
      {
        id: "order-help",
        question: "Who should I contact about an order or a change?",
        answer: "Use our Contact page, call us or send an email with your order reference and a short explanation of what you need. Our team can check your order status and explain the options for your request, including any applicable conditions.",
      },
    ],
  },
];

export default function Faq() {
  const [topicId, setTopicId] = useState(faqTopics[0].id);
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqTopics[0].questions[0].id);
  const activeTopic = faqTopics.find((topic) => topic.id === topicId) ?? faqTopics[0];

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "FAQs | AutoSphere";
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => { document.title = previousTitle; };
  }, []);

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <main className="faq-page">
      <section className="page-hero faq-hero" aria-labelledby="faq-title">
        <img className="page-hero__image faq-hero__image" src="/images/promotions/bmw-city.webp" alt="" />
        <div className="page-hero__shade" aria-hidden="true" />
        <div className="page-hero__content">
          <p className="page-hero__eyebrow">Frequently asked questions</p>
          <h1 className="page-hero__title" id="faq-title">A little clarity.<br /><span>A confident next drive.</span></h1>
          <p className="page-hero__description">From exploring your options to taking the next step, find answers to the questions along the way.</p>
        </div>
      </section>

      <section className="faq-section" aria-labelledby="faq-section-title">
        <div className="faq-page__container">
          <div className="faq-heading">
            <p className="faq-page__eyebrow">A good place to start</p>
            <h2 id="faq-section-title">Your questions, answered.</h2>
            <p>Choose a topic and get to know your next car journey a little better.</p>
          </div>

          <div className="faq-layout">
            <aside className="faq-sidebar" aria-label="FAQ topics and support">
              <nav className="faq-topics" aria-label="Question topics">
                <p className="faq-topics__label">Browse by topic</p>
                <div className="faq-topics__list">
                  {faqTopics.map(({ id, title, Icon }) => (
                    <button
                      className="faq-topic"
                      type="button"
                      key={id}
                      aria-pressed={topicId === id}
                      aria-controls="faq-questions"
                      onClick={() => {
                        setTopicId(id);
                        setOpenQuestion(faqTopics.find((topic) => topic.id === id)?.questions[0].id ?? null);
                      }}
                    >
                      <Icon aria-hidden="true" />
                      <span>{title}</span>
                      <ArrowRight className="faq-topic__arrow" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </nav>

              <div className="faq-support">
                <span className="faq-support__icon"><Headphones aria-hidden="true" /></span>
                <h2>Still have a question?</h2>
                <p>A real conversation can make the next step easier. Our team is here to help.</p>
                <Link className="faq-page__button" to="/contact" onClick={handleNavigation}>Contact our team <ArrowRight aria-hidden="true" /></Link>
                <a className="faq-support__phone" href={`tel:${footerContent.phone.replace(/^0/, "+880")}`}>{footerContent.phone}</a>
              </div>
            </aside>

            <div className="faq-questions" id="faq-questions" role="region" aria-labelledby="faq-topic-title">
              <div className="faq-questions__heading">
                <span className="faq-questions__icon"><activeTopic.Icon aria-hidden="true" /></span>
                <div>
                  <h2 id="faq-topic-title">{activeTopic.title}</h2>
                  <p>{activeTopic.description}</p>
                </div>
              </div>

              <div className="faq-accordion" key={activeTopic.id}>
                {activeTopic.questions.map(({ id, question, answer }) => (
                  <Collapsible className="faq-item" key={id} open={openQuestion === id} onOpenChange={(open) => setOpenQuestion(open ? id : null)}>
                    <h3>
                      <CollapsibleTrigger className="faq-item__trigger" id={`faq-trigger-${id}`} aria-controls={`faq-answer-${id}`}>
                        <span>{question}</span>
                        <span className="faq-item__toggle"><Plus aria-hidden="true" /></span>
                      </CollapsibleTrigger>
                    </h3>
                    <CollapsibleContent className="faq-item__content" id={`faq-answer-${id}`} role="region" aria-labelledby={`faq-trigger-${id}`}>
                      <div className="faq-item__answer"><p>{answer}</p></div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>

              <p className="faq-questions__note">Looking for something specific? Share the car name or order reference when you contact us so we can help with the right details.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
