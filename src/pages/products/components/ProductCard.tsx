import { useGetSingleCarReviewQuery } from "../../../redux/fetchers/review/reviewApi";
import { IReview } from "../../viewDetails/ViewDetails";
import { Cars } from "../Products";
import { Link } from "react-router";
import ReactStars from "react-rating-stars-component";
import Loader from "../../shared/Loader";

export interface Car {
  product: Cars;
}


const ProductCard = ({ product }: Car) => {
  const { data: review, isLoading: reviewLoading } = useGetSingleCarReviewQuery(product?._id as string);

  const reviews = (review?.data)

  const averageRatting = reviews?.length > 0 ? reviews.reduce((sum: number, review: IReview) => sum+review?.ratting, 0) / reviews?.length : 0;

  if(reviewLoading){
    return <Loader />
  }

  return (
    <Link to={`/view-details/${product?._id}`} className="group block h-full rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:border-brand/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
      <div className="h-40 w-full overflow-hidden rounded-lg bg-muted">
          <img
            className="mx-auto h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
            src={product?.images[0]}
            alt=""
          />
      </div>

      <div className="pt-6">
        <div className="flex items-center gap-1">
          <ReactStars
                    count={5}
                    value={averageRatting}
                    size={24}
                    isHalf={true}
                    edit={false}
                    activeColor="#F57C1F"
                  />
                  <p className="text-xs text-muted-foreground">({averageRatting.toFixed(1)})</p>
        </div>
        <h3 className="text-lg font-semibold leading-tight transition-colors group-hover:text-brand-strong">
          {product?.name}
        </h3>

        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="text-lg font-semibold leading-tight text-brand-strong">
            {product?.price.toLocaleString()} Tk
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
