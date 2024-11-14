import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import "../styles/userDashboard.scss"; // Import pliku SCSS

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { loading, getAllOrder } = context;

  return (
    <Layout>
      <div className="user-dashboard container mx-auto px-4 py-5 lg:py-8">
        {/* Górny panel z informacjami o użytkowniku */}
        <div className="user-info-panel">
          <h2 className="panel-title">Panel Użytkownika</h2>
          <div className="user-details">
            <p>
              <span>Imię:</span> {user?.name}
            </p>
            <p>
              <span>Email:</span> {user?.email}
            </p>
            <p>
              <span>Data:</span> {user?.date}
            </p>
            <p>
              <span>Rola:</span> {user?.role}
            </p>
          </div>
        </div>

        {/* Sekcja metryk zamówień */}
        <div className="user-stats">
          <div className="stat-card">
            <p className="stat-number">{getAllOrder.length}</p>
            <p className="stat-label">Wszystkie zamówienia</p>
          </div>
          <div className="stat-card">
            <p className="stat-number">{user?.role}</p>
            <p className="stat-label">Rola użytkownika</p>
          </div>
        </div>

        {/* Sekcja szczegółów zamówień */}
        <div className="order-details">
          <h2 className="section-title">Szczegóły zamówienia</h2>
          <div className="flex justify-center relative top-10">{loading && <Loader />}</div>
          <div className="order-table">
            {getAllOrder
              .filter((order) => order.userid === user?.uid)
              .map((order, index) => (
                <div key={index} className="order-card">
                  <div className="order-info">
                    <p className="order-id">ID zamówienia: #{order.id}</p>
                    <p className="order-date">Data: {order.date}</p>
                    <p className="order-amount">Kwota: {order.price} zł</p>
                    <p className="order-status">{order.status}</p>
                  </div>
                  {order.cartItems.map((item, itemIndex) => (
                    <div key={itemIndex} className="order-item">
                      <img src={item.productImageurl} alt={item.title} className="order-item-image" />
                      <div className="order-item-details">
                        <p className="order-item-title">{item.title}</p>
                        <p className="order-item-category">{item.category}</p>
                        <p className="order-item-quantity">x {item.quantity}</p>
                        <p className="order-item-price">{item.price} zł</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
