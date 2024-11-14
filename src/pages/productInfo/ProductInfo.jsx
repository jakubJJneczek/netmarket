import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import "../styles/productInfo.scss";

const ProductInfo = () => {
  const context = useContext(myContext);
  const { setLoading } = context;

  const [product, setProduct] = useState("");

  const { id } = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "product", id));
      setProduct({ ...productTemp.data(), id: productTemp.id });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Layout>
      <section className="product-info-container py-16 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-center items-start space-y-8 lg:space-x-16 lg:space-y-0">
            {/* Product Image Section */}
            <div className="product-image-container w-full lg:w-1/2">
              <img
                className="product-image w-full h-auto rounded-xl shadow-lg"
                src={product?.productImageurl}
                alt={product?.title}
              />
            </div>

            {/* Product Details Section */}
            <div className="product-details-container w-full lg:w-1/2">
              <h2 className="product-title text-3xl font-semibold text-white mb-4">{product?.title}</h2>

              <p className="product-price text-xl font-semibold text-yellow-400 mb-6">{product?.price} zł</p>

              <div className="product-description mb-8">
                <h3 className="text-lg font-bold text-white mb-2">Opis produktu:</h3>
                <p className="text-gray-300">{product?.description}</p>
              </div>

              {/* Add to Cart Button */}
              <div className="add-to-cart-button">
                {cartItems.some((p) => p.id === product.id) ? (
                  <button
                    onClick={() => deleteCart(product)}
                    className="btn-remove w-full px-6 py-3 text-lg font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition duration-300"
                  >
                    Usuń z koszyka
                  </button>
                ) : (
                  <button
                    onClick={() => addCart(product)}
                    className="btn-add w-full px-6 py-3 text-lg font-medium text-white bg-green-500 hover:bg-green-600 rounded-xl transition duration-300"
                  >
                    Dodaj do koszyka
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductInfo;
