import { useContext } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";

const HomePageProductCard = () => {
  const navigate = useNavigate();

  const context = useContext(myContext);
  const { getAllProduct } = context;

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  console.log(cartItems);
  //add to cart function

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Dodano do koszyka");
  };

  //delete from cart

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Usunięto z koszyka");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="mt-10">
      {/* Heading  */}
      <div className="">
        <h1 className=" text-center mb-5 text-2xl font-semibold">
          Nasze bestsellery
        </h1>
      </div>

      {/* main  */}
      <section className="text-gray-600 body-font">
        <div className="px-5 py-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {getAllProduct.slice(0, 8).map((item, index) => {
              const { id, title, price, productImageurl } = item;
              return (
                <div key={index} className="p-4 w-full md:w-1/6">
                  <div className="border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer flex flex-col">
                    <img
                      onClick={() => navigate(`/productinfo/${id}`)}
                      src={productImageurl}
                      alt="img"
                      style={{ transform: "scale(0.7)" }}
                    />
                    <div className="p-6">
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {title.substring(0, 25)}
                      </h1>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {price} zł
                      </h1>

                      <div className="flex justify-center ">
                        {cartItems.some((p) => p.id === item.id) ? (
                          <button
                            onClick={() => deleteCart(item)}
                            className=" w-full px-4 py-3 text-center text-gray-100 bg-gray-500 border border-transparent dark:border-gray-700 hover:border-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl"
                          >
                            Usuń z koszyka
                          </button>
                        ) : (
                          <button
                            onClick={() => addCart(item)}
                            className="w-full px-4 py-3 text-center text-gray-100 bg-gray-500 border border-transparent dark:border-gray-700 hover:border-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl"
                          >
                            Dodaj do koszyka
                          </button>
                        )}
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
