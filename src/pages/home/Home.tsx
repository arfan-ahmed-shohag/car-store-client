import { Banner } from "./components/Banner";
import ShopByBrand from "./components/ShopByBrand";
import HowItWorks from "./components/HowItWorks";
import NewArrivals from "./components/NewArrivals";
import OurPartners from "./components/OurPartners";
import PopularCars from "./components/PopularCars";
import WhyChooseUs from "./components/WhyChooseUs";

const brands = [
  {
    "id": 1,
    "name": "Toyota",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1024px-Toyota_carlogo.svg.png"
  },
  {
    "id": 2,
    "name": "Tesla",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1024px-Tesla_Motors.svg.png"
  },
  {
    "id": 3,
    "name": "Audi",
    "logo": "https://cdn.worldvectorlogo.com/logos/audi-11.svg"
  },
  {
    "id": 4,
    "name": "BMW",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1024px-BMW.svg.png"
  },
  {
    "id": 5,
    "name": "Honda",
    "logo": "https://cdn.worldvectorlogo.com/logos/honda-9.svg"
  },
  {
    "id": 6,
    "name": "Ford",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/1024px-Ford_logo_flat.svg.png"
  },
  {
    "id": 7,
    "name": "Hyundai",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/1024px-Hyundai_Motor_Company_logo.svg.png"
  },
  {
    "id": 8,
    "name": "Mercedes-Benz",
    "logo": "https://www.mercedes-benz.com/etc.clientlibs/mcom/clientlibs/google-tag-manager/resources/mercedes-benz-logo.png"
  },
  {
    "id": 9,
    "name": "Nissan",
    "logo": "https://libs-asia.nissan-cdn.net/etc/designs/nissan/20.07.2.NISSAN-18/common-assets/img/svg/nissan-logo.svg"
  },
  {
    "id": 10,
    "name": "Kia",
    "logo": "https://www.kia.com.pa/content/kia/images/common/Logo.png"
  }
]

const Home = () => {
  return (
    <div className="home-page bg-background text-foreground">
      <Banner />
      <ShopByBrand />
      <HowItWorks />
      <NewArrivals />
      <WhyChooseUs />
      <PopularCars />
      <OurPartners brands={brands} />
    </div>
  );
};

export default Home;
