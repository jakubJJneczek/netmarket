import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import "../styles/categoryProductPage.scss"; // Import SCSS for styling

const CategoryPage = () => {
  const { categoryname } = useParams();
  const context = useContext(myContext);
  const { getAllProduct, loading } = context;

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const filterProduct = getAllProduct.filter((product) => product.category.includes(categoryname));

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Dodano do koszyka");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Usunięto z koszyka");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="mt-10">
        <div className="text-center mb-5">
          <h1 className="text-2xl font-semibold capitalize">{categoryname}</h1>
        </div>

        {loading ? (
          <p>Ładowanie...</p>
        ) : (
          <section className="text-gray-600 body-font">
            <div className="product-grid">
              {filterProduct.length > 0 ? (
                filterProduct.map((item, index) => {
                  const { id, title, price, productImageurl } = item;
                  return (
                    <div key={index} className="product-card">
                      <div className="product-card-wrapper">
                        <img
                          onClick={() => navigate(`/productinfo/${id}`)}
                          src={productImageurl}
                          alt={title}
                          className="product-image"
                        />
                        <div className="product-info">
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
                })
              ) : (
                <div className="text-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                    alt="No products found"
                    className="mb-2"
                  />
                  <h1 className="text-xl">No {categoryname} product found</h1>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
