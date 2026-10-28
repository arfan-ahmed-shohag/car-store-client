import { Link, useParams } from "react-router";
import { useGetSimilarCarsQuery, useGetSingleCarQuery } from "../../redux/fetchers/cars/carApi";
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, CarFront, Check, ChevronRight, Fuel, Gauge, LoaderCircle, Minus, Plus, Settings2, ShoppingBag, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCreateOrderMutation } from "../../redux/fetchers/orders/orderApi";
import type { ChangeEvent, PointerEvent } from "react";
import { toast } from "sonner";
import Review from "../dashboard/user/review/Review";
import { useGetSingleCarReviewQuery } from "../../redux/fetchers/review/reviewApi";
import ReactStars from "react-rating-stars-component";
import type { Cars } from "../products/Products";
import "./ViewDetails.css";

export interface IReview {
  _id: string;
  carId: string;
  userId: { _id: string; firstName: string; lastName: string };
  ratting: number;
  comment: string;
  createdAt: string;
}

type CarDetails = Cars & {
  shortDescription?: string;
  longDescription?: string;
};

const formatPrice = (value: number) => Number.isFinite(value) ? value.toLocaleString("en-US") : "—";
const formatYear = (value: unknown) => {
  const text = String(value ?? "").trim();
  if (/^\d{4}$/.test(text)) return text;
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? "—" : String(date.getFullYear());
};
const displayValue = (value: string | undefined) => value?.trim() || "—";

const ViewDetails = () => {
  const { id } = useParams();
  const [quantitySell, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageZoomed, setImageZoomed] = useState(false);
  const { currentData: data, isLoading, isFetching, isError: productError, refetch } = useGetSingleCarQuery(id as string, { skip: !id });
  const product = data?.data as CarDetails | undefined;
  const { currentData: review, isLoading: reviewLoading, isError: reviewError } = useGetSingleCarReviewQuery(id as string, { skip: !id });
  const { currentData: similarProducts, isLoading: similarProductsLoading, isError: similarProductsError } = useGetSimilarCarsQuery(
    { carId: id as string, model: product?.model },
    { skip: !id || !product?.model },
  );
  const [createOrder, { isLoading: createOrderLoading, isSuccess, data: createOrderData, isError, error }] = useCreateOrderMutation();

  useEffect(() => {
    setImageIndex(0);
    setImageZoomed(false);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  const handleIncrement = () => setQuantity((previous) => previous + 1);
  const handleDecrement = () => setQuantity((previous) => previous > 1 ? previous - 1 : 1);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };
  const handleOrder = async () => {
    if (!product) return;
    await createOrder({ car: product._id, quantity: quantitySell });
  };

  useEffect(() => {
    const toastId = "cart";
    if (createOrderLoading) toast.loading("Processing ........", { id: toastId });
    if (isSuccess) {
      toast.success(createOrderData?.message, { id: toastId });
      if (createOrderData?.data) {
        setTimeout(() => { window.location.href = createOrderData.data; }, 1000);
      }
    }
    if (isError) {
      const err = error as { data?: { errorMessage?: string } };
      toast.error(err?.data?.errorMessage ?? "Something went wrong", { id: toastId });
    }
  }, [createOrderData?.data, createOrderData?.message, error, isError, createOrderLoading, isSuccess]);

  if (isLoading || (isFetching && !product)) {
    return <main className="car-details" aria-busy="true"><div className="car-details__loading" role="status"><LoaderCircle className="animate-spin" aria-hidden="true" /><p>Loading car details…</p></div></main>;
  }
  if (productError || !product) {
    return (
      <main className="car-details">
        <div className="car-details__state">
          <CarFront aria-hidden="true" /><h1>This car is unavailable</h1>
          <p>We couldn’t load this car. Please try again or explore our collection.</p>
          <div><button type="button" className="car-details__button" onClick={() => refetch()}>Try again</button><Link className="car-details__text-link" to="/products">Browse cars <ArrowRight aria-hidden="true" /></Link></div>
        </div>
      </main>
    );
  }

  const reviews: IReview[] = Array.isArray(review?.data) ? review.data : [];
  const similarCars: Cars[] = Array.isArray(similarProducts?.data) ? similarProducts.data : [];
  const images: string[] = Array.isArray(product.images) ? product.images : [];
  const activeImage = Math.min(imageIndex, Math.max(0, images.length - 1));
  const tags: string[] = Array.isArray(product.tags) ? product.tags : [];
  const features: string[] = Array.isArray(product.features) ? product.features : [];
  const averageRatting = reviews.length > 0 ? reviews.reduce((sum, item) => sum + item.ratting, 0) / reviews.length : 0;
  const releaseYear = formatYear(product.releaseYear);
  const fullDescription = product.longDescription?.trim() || product.description?.trim() || product.shortDescription?.trim() || "";
  const summaryText = product.shortDescription?.trim() || product.description?.trim() || fullDescription;
  const shortDescription = summaryText.length > 200 ? `${summaryText.slice(0, 200).replace(/\s+\S*$/, "")}…` : summaryText;
  const descriptionParagraphs = fullDescription.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const specifications = [
    ["Brand", displayValue(product.brand)], ["Model", displayValue(product.model)],
    ["Release Year", releaseYear], ["Body Type", displayValue(product.bodyType)],
    ["Color", displayValue(product.color)], ["Transmission", displayValue(product.transmission)],
    ["Fuel Type", displayValue(product.fuelType)], ["Engine Size", displayValue(product.engineSize)],
    ["Mileage", displayValue(product.mileage)], ["Category", displayValue(product.category)],
  ];
  const highlights = [
    { label: "Release year", value: releaseYear, Icon: CalendarDays },
    { label: "Fuel type", value: displayValue(product.fuelType), Icon: Fuel },
    { label: "Transmission", value: displayValue(product.transmission), Icon: Settings2 },
    { label: "Mileage", value: displayValue(product.mileage), Icon: Gauge },
  ];

  const handleImagePointer = (event: PointerEvent<HTMLDivElement>) => {
    if (images.length === 0) return;
    if (event.pointerType === "touch" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      if (imageZoomed) setImageZoomed(false);
      return;
    }
    const frame = event.currentTarget;
    const bounds = frame.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
    const y = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100));
    frame.style.setProperty("--gallery-zoom-x", `${x}%`);
    frame.style.setProperty("--gallery-zoom-y", `${y}%`);
    if (!imageZoomed) setImageZoomed(true);
  };

  return (
    <main className="car-details">
      <div className="car-details__container">
        <nav className="car-details__breadcrumb" aria-label="Breadcrumb">
          <ol><li><Link to="/">Home</Link></li><li><ChevronRight aria-hidden="true" /><Link to="/products">Cars</Link></li><li aria-current="page"><ChevronRight aria-hidden="true" /><span>{product.name}</span></li></ol>
        </nav>

        <section className="car-details__overview" aria-labelledby="car-title">
          <div className="car-gallery">
            <div
              className="car-gallery__stage"
              data-zoomed={imageZoomed}
              data-has-image={images.length > 0}
              onPointerEnter={handleImagePointer}
              onPointerMove={handleImagePointer}
              onPointerLeave={() => setImageZoomed(false)}
              onPointerCancel={() => setImageZoomed(false)}
            >
              {images.length > 0 ? images.map((image, index) => (
                <img key={`${product._id}-${index}`} src={image} alt={index === activeImage ? `${product.name}, photo ${index + 1}` : ""} aria-hidden={index !== activeImage} data-active={index === activeImage} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
              )) : <div className="car-gallery__empty"><CarFront aria-hidden="true" /><span>Photo not available</span></div>}
              {product.bodyType && <span className="car-gallery__label"><CarFront aria-hidden="true" />{product.bodyType}</span>}
              {images.length > 0 && <span className="car-gallery__count">{activeImage + 1} / {images.length}</span>}
            </div>
            {images.length > 1 && (
              <div className="car-gallery__thumbnails" role="group" aria-label="Car photos">
                {images.map((image, index) => <button key={`${product._id}-${index}`} type="button" aria-label={`View photo ${index + 1} of ${product.name}`} aria-pressed={index === activeImage} onClick={() => { setImageIndex(index); setImageZoomed(false); }}><img src={image} alt="" loading="lazy" /></button>)}
              </div>
            )}
          </div>

          <div className="car-summary">
            <div className="car-summary__top"><p className="car-details__eyebrow">{product.brand}</p><span className="car-summary__stock" data-in-stock={product.inStock}>{product.inStock ? "In stock" : "Out of stock"}</span></div>
            <h1 id="car-title">{product.name}</h1>
            <div className="car-summary__rating" aria-label={`Average review: ${averageRatting.toFixed(1)} out of 5, ${reviews.length} reviews`}>
              <ReactStars key={`${id}-${averageRatting}`} count={5} value={averageRatting} size={20} isHalf={true} edit={false} activeColor="#f57c1f" />
              <span>{averageRatting.toFixed(1)} <span>({reviews.length} reviews)</span></span>
            </div>
            <p className="car-summary__price">{formatPrice(product.price)} <span>Tk</span></p>
            <p className="car-summary__description">{shortDescription}</p>
            {fullDescription && fullDescription !== shortDescription && <a className="car-summary__read-more" href="#car-description">Read full description <ArrowDown aria-hidden="true" /></a>}
            <dl className="car-summary__highlights">
              {highlights.map(({ label, value, Icon }) => <div key={label}><Icon aria-hidden="true" /><div><dt>{label}</dt><dd>{value}</dd></div></div>)}
            </dl>
            {tags.length > 0 && <div className="car-summary__tags"><span>Tags</span>{tags.map((tag, index) => <span key={`${tag}-${index}`}>#{tag}</span>)}</div>}
            <div className="car-summary__purchase">
              <div className="car-quantity"><label htmlFor="car-quantity">Quantity</label><div><button type="button" onClick={handleDecrement} aria-label="Decrease quantity"><Minus aria-hidden="true" /></button><input id="car-quantity" type="number" value={quantitySell} onChange={handleChange} /><button type="button" onClick={handleIncrement} aria-label="Increase quantity"><Plus aria-hidden="true" /></button></div></div>
              <button type="button" className="car-summary__add-cart"><ShoppingCart aria-hidden="true" />Add to cart</button>
              <button type="button" className="car-details__button car-summary__buy" onClick={handleOrder} aria-busy={createOrderLoading}>{createOrderLoading ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : <ShoppingBag aria-hidden="true" />}{createOrderLoading ? "Processing…" : "Buy Now"}</button>
            </div>
            <Link className="car-summary__contact" to="/contact">Questions about this car? Contact our team <ArrowUpRight aria-hidden="true" /></Link>
          </div>
        </section>

        <div className="car-details__lower">
          <div className="car-details__information">
            {descriptionParagraphs.length > 0 && (
              <section id="car-description" className="car-description" aria-labelledby="car-description-title">
                <div className="car-details__heading">
                  <p className="car-details__eyebrow">A closer look</p>
                  <h2 id="car-description-title">Details</h2>
                </div>
                <div className="car-description__content">
                  {descriptionParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>
              </section>
            )}
            <section className="car-specifications" aria-labelledby="car-specifications-title">
              <div className="car-details__heading"><p className="car-details__eyebrow">Get to know this car</p><h2 id="car-specifications-title">Specifications</h2></div>
              <dl className="car-specifications__table">
                {specifications.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
                <div><dt>Features</dt><dd>{features.length > 0 ? <ul>{features.map((feature, index) => <li key={`${feature}-${index}`}><Check aria-hidden="true" />{feature}</li>)}</ul> : "—"}</dd></div>
                <div><dt>Warranty Details</dt><dd>{displayValue(product.warranty)}</dd></div>
              </dl>
            </section>

            <section className="car-reviews" aria-labelledby="car-reviews-title">
              <div className="car-details__heading"><p className="car-details__eyebrow">From the driver’s seat</p><h2 id="car-reviews-title">Customer reviews <span>({reviews.length})</span></h2></div>
              {reviewLoading ? <p className="car-details__empty" role="status">Loading reviews…</p> : reviewError ? <p className="car-details__empty">Reviews are unavailable right now. Please try again later.</p> : reviews.length === 0 ? <p className="car-details__empty">No reviews yet. Share your thoughts about this car below.</p> : (
                <div className="car-reviews__list">{reviews.slice(0, 10).map((item) => <article className="car-review" key={item._id}><ReactStars count={5} value={item.ratting} size={20} isHalf={true} edit={false} activeColor="#f57c1f" /><p>{item.comment}</p><div className="car-review__author"><span>{[item.userId?.firstName, item.userId?.lastName].filter(Boolean).join(" ") || "Customer"}</span><time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</time></div></article>)}</div>
              )}
              <Review key={product._id} id={product._id} />
            </section>
          </div>

          <aside className="car-similar" aria-labelledby="similar-cars-title">
            <div className="car-details__heading"><p className="car-details__eyebrow">Keep exploring</p><h2 id="similar-cars-title">You may also like</h2></div>
            {similarProductsLoading ? <p className="car-details__empty" role="status">Finding more cars…</p> : similarProductsError ? <p className="car-details__empty">More cars are unavailable right now.</p> : similarCars.length === 0 ? <p className="car-details__empty">No recommendations available yet.</p> : (
              <div className="car-similar__list">{similarCars.map((car) => <Link key={car._id} to={`/view-details/${car._id}`} className="car-similar__card"><div className="car-similar__image">{car.images?.[0] ? <img src={car.images[0]} alt="" loading="lazy" /> : <CarFront aria-hidden="true" />}</div><div><h3>{car.name}</h3><p>{formatPrice(car.price)} <span>Tk</span></p></div><ArrowRight aria-hidden="true" /></Link>)}</div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ViewDetails;
