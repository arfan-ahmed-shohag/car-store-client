import { useGetPopularCarQuery } from "../../../redux/fetchers/cars/carApi";
import { Cars } from "../../products/Products";
import Loader from "../../shared/Loader";
import ReUsableHomePageCarsSection from "./ReUsableHomePageCarsSection";

const PopularCars = () => {
  const { data, isLoading } = useGetPopularCarQuery(undefined);

  if (isLoading) return <Loader />;

  const products = data?.data || [];




  const popularCars = products?.map((p: {_id: string, totalQuantity: number, carDetails: Cars})=>p?.carDetails)
  const popularCarsData = popularCars?.slice(0, 8) || [];

  return <ReUsableHomePageCarsSection carData={popularCarsData} header="Popular Cars" />;
};

export default PopularCars;
