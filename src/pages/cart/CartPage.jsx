import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from "lucide-react";
import { decrementQuantity, deleteFromCart, incrementQuantity } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router";
import "../styles/cartPage.scss"; // Import stylu SCSS

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Usunięto z koszyka");
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const cartItemTotal = cartItems
    .map((item) => item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const user = JSON.parse(localStorage.getItem("users"));

  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const buyNowFunction = () => {
    if (
      addressInfo.name === "" ||
      addressInfo.address === "" ||
      addressInfo.pincode === "" ||
      addressInfo.mobileNumber === ""
    ) {
      return toast.error("Wypełnij wszystkie pola");
    }

    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userid: user.uid,
      status: "confirmed",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    try {
      const orderRef = collection(fireDB, "order");
      addDoc(orderRef, orderInfo);
      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
      });
      toast.success("Zamówienie złożone pomyślnie");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="cart-page container mx-auto px-4 max-w-7xl py-8">
        <h1 className="page-title">Twój Koszyk</h1>
        <form className="cart-form lg:grid lg:grid-cols-12 lg:gap-x-12">
          <section className="cart-items lg:col-span-8">
            <ul role="list">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => {
                  const { id, title, price, productImageurl, quantity, category } = item;
                  return (
                    <li key={index} className="cart-item">
                      <img src={productImageurl} alt="img" className="item-image" />
                      <div className="item-details">
                        <h3 className="item-title">{title}</h3>
                        <p className="item-category">{category}</p>
                        <p className="item-price">{price} zł</p>
                      </div>
                      <div className="item-actions">
                        <button onClick={() => handleDecrement(id)}>-</button>
                        <input type="text" value={quantity} readOnly className="quantity-input" />
                        <button onClick={() => handleIncrement(id)}>+</button>
                        <button onClick={() => deleteCart(item)} className="delete-button">
                          <Trash size={16} /> Usuń
                        </button>
                      </div>
                    </li>
                  );
                })
              ) : (
                <h1 className="empty-cart-message">Brak produktów w Twoim koszyku</h1>
              )}
            </ul>
          </section>
          <section className="order-summary lg:col-span-4">
            <h2 className="summary-title">Do zapłaty</h2>
            <div className="summary-content">
              <div className="summary-item">
                <span className="summary-label">Cena ({cartItemTotal} szt.):</span>
                <span className="summary-value">{cartTotal} zł</span>
              </div>
              {user ? (
                <BuyNowModal
                  addressInfo={addressInfo}
                  setAddressInfo={setAddressInfo}
                  buyNowFunction={buyNowFunction}
                />
              ) : (
                <Navigate to={"/login"} />
              )}
            </div>
          </section>
        </form>
      </div>
    </Layout>
  );
};

export default CartPage;
