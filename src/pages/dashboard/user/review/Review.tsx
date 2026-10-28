import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import { useCreateReviewsMutation } from "../../../../redux/fetchers/review/reviewApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Button } from "../../../../components/ui/button";

export class CustomError extends Error {
  data?: { errorMessage?: string };
  constructor(message: string, data?: { errorMessage?: string }) {
    super(message);
    this.data = data;
  }
}


const Review = ({ id }: { id: string }) => {
  const [ratting, setRatting] = useState(0);
  const [createRating, { isError, data, isSuccess, isLoading }] =
    useCreateReviewsMutation();

  const navigate = useNavigate();

  const ratingChanged = (newRating: number) => {
    setRatting(newRating);
  };

  const handleReview = async (e: FieldValues) => {
    e.preventDefault();
    const review = e.target.review.value;

    const reviewInfo = {
      carId: id,
      comment: review,
      ratting: ratting,
    };
    await createRating(reviewInfo);

    e.target.reset()
    setRatting(0);
  };

  const toastId = "rating";

  useEffect(() => {
    if (isLoading) {
      toast.loading("processing.....", { id: toastId });
    }
    if (isError) {
      toast.error("Something went wrong!", { id: toastId });
    }
    if (isSuccess) {
      toast.success(data?.message, { id: toastId });
    }
  }, [
    data?.message,
    isError,
    isLoading,
    isSuccess,
    navigate,
  ]);
  return (
    <div className="car-review-form">
      <div>
        <form className="car-review-form__fields" onSubmit={handleReview}>
          <h2>
            Write a review
          </h2>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            value={ratting}
            size={24}
            key={ratting} 
            activeColor="#f57c1f"
          />
          <label className="sr-only" htmlFor="review">Your review</label>
          <textarea
            id="review"
            name="review"
            rows={4}
            required
            className="car-review-form__input"
            placeholder="Write your review"
          ></textarea>
          <div>
            <Button
              type="submit"
              className="car-review-form__submit"
            >
              Submit Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Review;
