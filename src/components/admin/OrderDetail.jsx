import React, { useContext } from "react";
import myContext from "../../context/myContext";
import "../styles/orderDetailStyles.scss"; // Importujemy styl SCSS

const OrderDetail = () => {
  const context = useContext(myContext);
  const { getAllOrder } = context;

  return (
    <div className="order-detail">
      <div className="order-detail__header">
        <h1 className="text-xl font-bold">Wszystkie zamówienia</h1>
      </div>

      <div className="order-detail__table">
        <table>
          <thead>
            <tr>
              <th>Nr.</th>
              <th>ID zamówienia</th>
              <th>Zdjęcie</th>
              <th>Tytuł</th>
              <th>Kategoria</th>
              <th>Cena</th>
              <th>Ilość</th>
              <th>Suma</th>
              <th>Status</th>
              <th>Imię</th>
              <th>Adres</th>
              <th>Kod pocztowy</th>
              <th>Numer telefonu</th>
              <th>Email</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {getAllOrder.map((order, orderIndex) => {
              return (
                <>
                  {order.cartItems.map((item, itemIndex) => {
                    const { id, productImageurl, title, category, price, quantity } = item;
                    const totalPrice = price * quantity;
                    return (
                      <tr key={itemIndex}>
                        <td>{itemIndex + 1}</td>
                        <td>{id}</td>
                        <td>
                          <img className="product-image" src={productImageurl} alt="Produkt" />
                        </td>
                        <td>{title}</td>
                        <td>{category}</td>
                        <td>{price} zł</td>
                        <td>{quantity}</td>
                        <td>{totalPrice} zł</td>
                        <td className={`status-${order.status.toLowerCase()}`}>{order.status}</td>
                        <td>{order.addressInfo.name}</td>
                        <td>{order.addressInfo.address}</td>
                        <td>{order.addressInfo.pincode}</td>
                        <td>{order.addressInfo.mobileNumber}</td>
                        <td>{order.email}</td>
                        <td>{order.date}</td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
