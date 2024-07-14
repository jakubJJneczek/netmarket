import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext } from "react";
import myContext from "../../context/myContext";

const CategoryPage = () => {
  const { categoryname } = useParams();

  const context = useContext(myContext);
  const { getAllProduct } = context;

  const navigate = useNavigate();
  const filterProduct = getAllProduct.filter((obj) =>
    obj.category.includes(categoryname)
  );
  return (
    <Layout>
      <div className="mt-10">
        <div className="">
          <h1 className=" text-center mb-5 text-2xl font-semibold first-letter:uppercase">
            {categoryname}
          </h1>
        </div>

        <section className="text-gray-600 body-font">
          <div className="container px-5 py-5 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center">
              {filterProduct.length > 0 ? (
                <>
                  {filterProduct.map((item, index) => {
                    const { id, title, price, productImageurl } = item;
                    return (
                      <div key={index} className="p-4 w-full md:w-1/4">
                        <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                          <img
                            onClick={() => navigate(`/productinfo/${id}`)}
                            className="lg:h-60  h-96 w-full"
                            src={productImageurl}
                            alt="img"
                          />
                          <div className="p-6">
                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                              {title.substring(0, 25)}
                            </h1>
                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                              {price} zł
                            </h1>

                            <div className="flex justify-center ">
                              <button className=" bg-gray-500 hover:bg-gray-600 w-full text-white py-[4px] rounded-lg font-bold">
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div>
                  <div className="flex justify-center">
                    <img
                      className=" mb-2"
                      src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                      alt=""
                    />
                  </div>
                  <h1 className=" text-black text-xl">
                    No {categoryname} product found
                  </h1>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CategoryPage;
