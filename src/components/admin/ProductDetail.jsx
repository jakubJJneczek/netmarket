import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import "../styles/productDetailStyles.scss"; // Ścieżka do pliku SCSS

const ProductDetail = () => {
  const context = useContext(myContext);
  const { setLoading, getAllProduct, getAllProductFunction } = context;

  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "product", id));
      toast.success("Produkt usunięty pomyślnie");
      getAllProductFunction();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="product-detail__header">
        <h1 className="text-xl font-bold">Wszystkie produkty</h1>
        <Link to={"/addproduct"}>
          <button className="product-detail__button">Dodaj produkt</button>
        </Link>
      </div>

      <div className="product-detail__table">
        <table>
          <thead>
            <tr>
              <th>Nr.</th>
              <th>Zdjęcie</th>
              <th>Tytuł</th>
              <th>Cena</th>
              <th>Kategoria</th>
              <th>Data</th>
              <th>Edytuj</th>
              <th>Usuń</th>
            </tr>
          </thead>
          <tbody>
            {getAllProduct.map((item, index) => {
              const { id, title, price, category, date, productImageurl } = item;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex justify-center">
                      <img className="product-image" src={productImageurl} alt={title} />
                    </div>
                  </td>
                  <td>{title}</td>
                  <td>{price} zł</td>
                  <td>{category}</td>
                  <td>{date}</td>
                  <td onClick={() => navigate(`/updateproduct/${id}`)} className="edit-btn">
                    Edytuj
                  </td>
                  <td onClick={() => deleteProduct(id)} className="delete-btn">
                    Usuń
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;
