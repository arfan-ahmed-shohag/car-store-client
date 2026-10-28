import { FieldValues, useForm } from "react-hook-form";
import { useCreateContactMutation } from "../../redux/fetchers/orders/orderApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { ArrowUpRight, LoaderCircle, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { footerContent, footerSocialProfiles } from "../shared/footerData";
import "./Contact.css";
import "../shared/PageHero.css";

class CustomError extends Error {
  data?: { message?: string };
  constructor(message: string, data?: { message?: string }) {
    super(message);
    this.data = data;
  }
}

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();

  const [createContact, { data, isLoading, isSuccess, error }] =
    useCreateContactMutation();

  const onSubmit = async (data: FieldValues) => {
    await createContact(data);
    reset();
  };

  useEffect(() => {
    const loaderKey = "contact";
    if (isLoading) {
      toast.loading("processing ...", { id: loaderKey });
    }
    if (isSuccess) {
      toast.success(data?.message, { id: loaderKey });
    }
    if (error) {
      toast.error((error as CustomError)?.data?.message, {
        id: loaderKey,
      });
    }
  }, [data?.message, error, isLoading, isSuccess]);
  return (
    <main className="contact-page">
      <section className="page-hero contact-hero" aria-labelledby="contact-title">
        <img className="page-hero__image contact-hero__image" src="/images/promotions/bmw-city.webp" alt="" />
        <div className="page-hero__shade" aria-hidden="true" />
        <div className="page-hero__content">
          <p className="page-hero__eyebrow">Let’s connect</p>
          <h1 className="page-hero__title" id="contact-title">Let’s talk about<br /><span>your next drive.</span></h1>
          <p className="page-hero__description">Have a car in mind or need a little guidance? Tell us what you’re looking for. We’re here to help.</p>
        </div>
      </section>

      <div className="contact-content">
        <div className="contact-page__container contact-grid">
          <section className="contact-message" aria-labelledby="contact-message-title">
            <div className="contact-message__heading">
              <p className="contact-page__eyebrow">We’d love to hear from you</p>
              <h2 id="contact-message-title">Send us a message</h2>
              <p>Tell us about the car you have in mind or the question you’d like answered.</p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)} aria-busy={isLoading}>
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="contact-name">Your name</label>
                  <input id="contact-name" type="text" placeholder="Name" {...register("name")} />
                </div>
                <div className="contact-form__field">
                  <label htmlFor="contact-email">Email address</label>
                  <input id="contact-email" type="email" placeholder="Email" {...register("email")} />
                </div>
              </div>
              <div className="contact-form__field">
                <label htmlFor="contact-message">Your message</label>
                <textarea id="contact-message" placeholder="Message" {...register("message")} />
              </div>
              <Button type="submit" className="contact-form__submit">
                {isLoading ? <><LoaderCircle className="animate-spin" aria-hidden="true" /> Sending message…</> : <>Send message <Send aria-hidden="true" /></>}
              </Button>
            </form>
          </section>

          <aside className="contact-info" aria-labelledby="contact-info-title">
            <p className="contact-page__eyebrow">Contact AutoSphere</p>
            <h2 id="contact-info-title">Talk to our team</h2>
            <p className="contact-info__description">From finding the right car to planning your next upgrade, we’re ready to help.</p>

            <address className="contact-info__channels">
              <div className="contact-info__channel">
                <span className="contact-info__icon"><Phone aria-hidden="true" /></span>
                <div><h3>Give us a call</h3><a href={`tel:${footerContent.phone.replace(/^0/, "+880")}`}>{footerContent.phone}</a></div>
              </div>
              <div className="contact-info__channel">
                <span className="contact-info__icon"><Mail aria-hidden="true" /></span>
                <div><h3>Drop us an email</h3><a href={`mailto:${footerContent.email}`}>{footerContent.email}</a></div>
              </div>
              <div className="contact-info__channel">
                <span className="contact-info__icon"><MessageCircle aria-hidden="true" /></span>
                <div><h3>Chat on WhatsApp</h3><a href={footerSocialProfiles.whatsapp} target="_blank" rel="noopener noreferrer">{footerContent.whatsapp} <ArrowUpRight aria-hidden="true" /></a></div>
              </div>
              <div className="contact-info__channel">
                <span className="contact-info__icon"><MapPin aria-hidden="true" /></span>
                <div><h3>Find us here</h3><p>{footerContent.address}</p></div>
              </div>
            </address>

            <div className="contact-info__socials">
              <p>Stay connected</p>
              <nav aria-label="AutoSphere social profiles">
                <a href={footerSocialProfiles.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook profile"><FaFacebookF aria-hidden="true" /></a>
                <a href={footerSocialProfiles.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><FaLinkedinIn aria-hidden="true" /></a>
                <a href={footerSocialProfiles.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><FaGithub aria-hidden="true" /></a>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Contact;
