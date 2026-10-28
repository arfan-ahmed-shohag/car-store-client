import { useRef, useState } from "react";
import { Link } from "react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, ChevronLeft, ChevronRight, Heart, MoreHorizontal, Search, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";
import type { ArrivalCar } from "../data/newArrivals";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addToCart, toggleWishlist, type ShoppingItem } from "../../../redux/fetchers/shopping/shoppingSlice";

const priceFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const formatPrice = (price: number) => priceFormatter.format(price);

export default function NewArrivalCard({ car, badgeLabel = "New", previewLabel = "New arrival" }: { car: ArrivalCar; badgeLabel?: string; previewLabel?: string }) {
  const dispatch = useAppDispatch();
  const saved = useAppSelector((state) => state.shopping.wishlist.some((item) => item.productId === car.id));
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [variantIndex, setVariantIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(0);
  const [dialogMode, setDialogMode] = useState<"preview" | "options">("preview");
  const variant = car.variants[variantIndex] ?? car.variants[0];
  const imageIndex = hovered && variant.images.length > 1 ? 1 : 0;
  const hasColors = car.variants.length > 1;
  const detailsHref = `/view-details/${car.detailsId ?? car.id}`;

  const shoppingItem: ShoppingItem = {
    productId: car.id,
    name: car.name,
    variantId: variant.id,
    variantName: variant.name,
    price: car.price,
    image: variant.images[0],
  };

  const openDialog = (mode: "preview" | "options", image: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setDialogMode(mode);
    setPreviewImage(image);
    if (mode === "options") setHovered(false);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(shoppingItem));
    setPreviewOpen(false);
    toast.success("Added to cart", { description: `${car.name}${hasColors ? ` · ${variant.name}` : ""}` });
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(shoppingItem));
    toast.success(saved ? "Removed from wishlist" : "Added to wishlist", { description: car.name });
  };

  const selectColor = (index: number) => {
    setVariantIndex(index);
    setHovered(false);
    setPreviewImage(0);
  };

  return (
    <Dialog.Root open={previewOpen} onOpenChange={setPreviewOpen}>
      <article
        className="arrival-card"
        data-car-id={car.id}
        onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
      >
        <div
          className="arrival-card__media"
          data-has-colors={hasColors}
        >
          <div className="arrival-card__image-stack">
            {car.variants.flatMap((colorVariant) => colorVariant.images.map((image, index) => {
              const active = colorVariant.id === variant.id && index === imageIndex;
              return (
                <img
                  key={`${colorVariant.id}-${index}`}
                  src={image}
                  alt={active ? `${car.name}${hasColors ? ` in ${variant.name}` : ""}, ${index === 0 ? "exterior" : "alternate"} view` : ""}
                  aria-hidden={!active}
                  data-active={active}
                  className="arrival-card__image"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              );
            }))}
          </div>

          <span className="arrival-card__ribbon">{badgeLabel}</span>
          {variant.images.length > 1 && (
            <div className="arrival-card__image-indicators" aria-hidden="true">
              <span data-active={imageIndex === 0} /><span data-active={imageIndex === 1} />
            </div>
          )}

          <div className="arrival-card__actions">
            {hasColors ? (
              <Dialog.Trigger asChild>
                <button type="button" className="arrival-card__action" aria-label={`Choose ${car.name} color`} title="Choose options" onClick={(event) => openDialog("options", 0, event.currentTarget)}>
                  <MoreHorizontal aria-hidden="true" />
                </button>
              </Dialog.Trigger>
            ) : (
              <button type="button" className="arrival-card__action" aria-label={`Add ${car.name} to cart`} title="Add to cart" onClick={handleAddToCart}>
                <ShoppingBag aria-hidden="true" />
              </button>
            )}
            <Dialog.Trigger asChild>
              <button type="button" className="arrival-card__action" aria-label={`Quick view ${car.name}`} title="Quick view" onClick={(event) => openDialog("preview", imageIndex, event.currentTarget)}>
                <Search aria-hidden="true" />
              </button>
            </Dialog.Trigger>
            <button
              type="button"
              className="arrival-card__action"
              data-saved={saved}
              aria-label={`${saved ? "Remove" : "Add"} ${car.name} ${saved ? "from" : "to"} wishlist`}
              aria-pressed={saved}
              title={saved ? "Remove from wishlist" : "Add to wishlist"}
              onClick={handleWishlist}
            >
              <Heart fill={saved ? "currentColor" : "none"} aria-hidden="true" />
            </button>
          </div>

          {hasColors && (
            <div className="arrival-card__colors" role="group" aria-label={`${car.name} colors`}>
              {car.variants.map((colorVariant, index) => (
                <button
                  key={colorVariant.id}
                  type="button"
                  className="arrival-card__swatch"
                  aria-label={`${car.name} in ${colorVariant.name}`}
                  aria-pressed={index === variantIndex}
                  title={colorVariant.name}
                  onClick={() => selectColor(index)}
                >
                  <span style={{ backgroundColor: colorVariant.color }} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="arrival-card__information">
          <h3 className="arrival-card__name">
            <Link className="arrival-card__details-link" to={detailsHref}>{car.name}</Link>
          </h3>
          <p className="arrival-card__price">
            <span><span className="sr-only">Price: </span>{formatPrice(car.price)}</span>
            {car.previousPrice && car.previousPrice > car.price && (
              <del><span className="sr-only">Previous price: </span>{formatPrice(car.previousPrice)}</del>
            )}
          </p>
        </div>
      </article>

      <Dialog.Portal>
        <Dialog.Overlay className="arrival-preview__overlay" />
        <Dialog.Content
          className={`arrival-preview${dialogMode === "options" ? " arrival-preview--options" : ""}`}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            triggerRef.current?.focus();
          }}
        >
          <Dialog.Close className="arrival-preview__close" aria-label="Close car preview"><X aria-hidden="true" /></Dialog.Close>
          <div className="arrival-preview__layout">
            <div className="arrival-preview__gallery">
              {car.variants.flatMap((colorVariant) => colorVariant.images.map((image, index) => {
                const active = colorVariant.id === variant.id && index === previewImage;
                return <img key={`${colorVariant.id}-${index}`} src={image} alt={active ? `${car.name}${hasColors ? ` in ${variant.name}` : ""} preview` : ""} aria-hidden={!active} data-active={active} />;
              }))}
              {variant.images.length > 1 && (
                <div className="arrival-preview__gallery-controls">
                  <button type="button" aria-label="Previous car photo" onClick={() => setPreviewImage((index) => (index - 1 + variant.images.length) % variant.images.length)}><ChevronLeft aria-hidden="true" /></button>
                  <span>{previewImage + 1} / {variant.images.length}</span>
                  <button type="button" aria-label="Next car photo" onClick={() => setPreviewImage((index) => (index + 1) % variant.images.length)}><ChevronRight aria-hidden="true" /></button>
                </div>
              )}
            </div>
            <div className="arrival-preview__details">
              <p className="arrival-preview__eyebrow">{dialogMode === "options" ? "Choose options" : previewLabel}</p>
              <Dialog.Title className="arrival-preview__title">{car.name}</Dialog.Title>
              <Dialog.Description className="arrival-preview__description">
                {dialogMode === "options" ? "Choose your preferred color, then add this car to your cart." : car.description}
              </Dialog.Description>
              <p className="arrival-card__price arrival-preview__price"><span>{formatPrice(car.price)}</span>{car.previousPrice && <del>{formatPrice(car.previousPrice)}</del>}</p>
              {dialogMode === "preview" && (
                <dl className="arrival-preview__specs">
                  <div><dt>Body style</dt><dd>{car.bodyType}</dd></div>
                  <div><dt>Fuel</dt><dd>{car.fuelType}</dd></div>
                  <div><dt>Transmission</dt><dd>{car.transmission}</dd></div>
                </dl>
              )}
              {dialogMode === "preview" && hasColors && (
                <div className="arrival-preview__color-options">
                  <p>Color: <strong>{variant.name}</strong></p>
                  <div role="group" aria-label="Preview car colors">
                    {car.variants.map((colorVariant, index) => (
                      <button key={colorVariant.id} type="button" className="arrival-card__swatch" aria-label={`Preview ${colorVariant.name}`} aria-pressed={index === variantIndex} title={colorVariant.name} onClick={() => selectColor(index)}><span style={{ backgroundColor: colorVariant.color }} /></button>
                    ))}
                  </div>
                </div>
              )}
              {dialogMode === "options" ? (
                <>
                  <fieldset className="arrival-cart-options">
                    <legend>Choose a color</legend>
                    <div className="arrival-cart-options__colors">
                      {car.variants.map((colorVariant, index) => (
                        <label key={colorVariant.id} className="arrival-cart-options__choice" data-selected={index === variantIndex}>
                          <input type="radio" className="sr-only" name={`cart-color-${car.id}`} value={colorVariant.id} checked={index === variantIndex} onChange={() => selectColor(index)} />
                          <span className="arrival-cart-options__swatch" style={{ backgroundColor: colorVariant.color }} aria-hidden="true" />
                          <span>{colorVariant.name}</span>
                          <span className="arrival-cart-options__check" aria-hidden="true">{index === variantIndex && <Check />}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <p className="arrival-cart-options__selection">Selected color: <strong>{variant.name}</strong></p>
                  <button type="button" className="arrival-preview__add-cart" onClick={handleAddToCart}>
                    <ShoppingBag aria-hidden="true" /> Add to cart
                  </button>
                </>
              ) : (
                <Link to="/contact" className="arrival-preview__enquire" onClick={() => setPreviewOpen(false)}>Enquire about this car</Link>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
