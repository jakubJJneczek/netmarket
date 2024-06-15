import { useNavigate } from "react-router-dom";

// productData
const productData = [
  {
    id: 1,
    image:
      "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/40/4021452/Laptop-ASUS-X515EA-BQ1877-01-front.jpg",
    title: "ASUS X515EA i5 8/512",
    desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
    price: 2300,
    trendingProductName: "Featured",
    quantity: 1,
  },
  {
    id: 2,
    image:
      "https://a.allegroimg.com/original/11313e/dc5f9bf7493295d6bdb71ffcb435/Smartfon-Apple-iPhone-14-Pro-6-GB-128-GB-5G-Space-Black",
    title: "IPhone 14 PRO 256 GB",
    desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
    price: 4200,
    trendingProductName: "Featured",
    quantity: 1,
  },
];

const HomePageProductCard = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-10">
      {/* Heading  */}
      <div className="">
        <h1 className=" text-center mb-5 text-2xl font-semibold">
          Bestselling Products
        </h1>
      </div>

      {/* main  */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {productData.map((item, index) => {
              const { image, title, price } = item;
              return (
                <div key={index} className="p-4 w-full md:w-1/4">
                  <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                    <img
                      onClick={() => navigate("/productinfo")}
                      className="lg:h-80  h-96 w-full"
                      src={image}
                      alt="blog"
                    />
                    <div className="p-6">
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {title.substring(0, 25)}
                      </h1>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {price} zł
                      </h1>

                      <div className="flex justify-center ">
                        <button className=" bg-gray-500 hover:bg-gray-800 w-full text-white py-[4px] rounded-lg font-bold">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageProductCard;
