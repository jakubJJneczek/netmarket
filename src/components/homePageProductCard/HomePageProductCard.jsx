import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import "../styles/productCard.scss"; // Import SCSS file for Product Card styles
import "../styles/variables.scss";

const HomePageProductCard = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProduct } = context;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Add to cart function
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Dodano do koszyka");
  };

  // Delete from cart
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
      <div className="text-center mb-5">
        <h1 className="text-3xl font-semibold">Nasze bestsellery</h1>
      </div>

      {/* Main Section */}
      <section className="text-gray-600 body-font">
        <div className="product-grid">
          {getAllProduct.slice(0, 8).map((item, index) => {
            const { id, title, price, productImageurl } = item;
            return (
              <div key={index} className="product-card">
                <div className="product-card-wrapper">
                  <img
                    onClick={() => navigate(`/productinfo/${id}`)}
                    src={productImageurl}
                    alt="img"
                    className="product-image"
                  />
                  <div className="product-info p-6">
                    <h1 className="product-title">{title.substring(0, 25)}</h1>
                    <h2 className="product-price">{price} zł</h2>
                    <div className="flex justify-center mt-4">
                      {cartItems.some((p) => p.id === item.id) ? (
                        <button onClick={() => deleteCart(item)} className="cart-button removed">
                          Usuń z koszyka
                        </button>
                      ) : (
                        <button onClick={() => addCart(item)} className="cart-button added">
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
      </section>
    </div>
  );
};

export default HomePageProductCard;
