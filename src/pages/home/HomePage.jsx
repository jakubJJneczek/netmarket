import Category from "../../components/category/Category";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection.jsx";
//import Testimonial from "../../components/testimonial/Testimonial";
//import Track from "../../components/track/Track";
//import { Loader } from "lucide-react";

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <Category />
      <HomePageProductCard />
    </Layout>
  );
};

export default HomePage;
