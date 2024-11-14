import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import "../styles/addProductPageStyles.scss"; // Importujemy nasz plik SCSS

const categoryList = [
  { name: "Laptopy" },
  { name: "Smartfony" },
  { name: "TV" },
  { name: "Gaming" },
  { name: "Foto" },
  { name: "Tablety" },
  { name: "Słuchawki" },
];

const AddProductPage = () => {
  const context = useContext(myContext);
  const { setLoading } = context;
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageurl: "",
    category: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProductFunction = async () => {
    if (
      product.title === "" ||
      product.price === "" ||
      product.productImageurl === "" ||
      product.category === "" ||
      product.description === ""
    ) {
      return toast.error("Wypełnij wszystkie pola");
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB, "product");
      await addDoc(productRef, product);
      toast.success("Produkt dodany pomyślnie");
      navigate("/admin-dashboard");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Coś poszło nie tak");
    }
  };

  return (
    <div className="add-product">
      <div className="add-product__form-container">
        <div className="add-product__header">
          <h2 className="text-2xl font-bold text-white">Dodaj Produkt</h2>
        </div>

        <input
          type="text"
          name="title"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          placeholder="Tytuł Produktu"
          className="add-product__input"
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          placeholder="Cena"
          className="add-product__input"
        />

        <input
          type="text"
          name="productImageUrl"
          value={product.productImageurl}
          onChange={(e) => setProduct({ ...product, productImageurl: e.target.value })}
          placeholder="Zdjęcie Produktu (URL)"
          className="add-product__input"
        />

        <select
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          className="add-product__select"
        >
          <option disabled>Wybierz kategorię produktu</option>
          {categoryList.map((value, index) => (
            <option key={index} value={value.name} className="capitalize">
              {value.name}
            </option>
          ))}
        </select>

        <textarea
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          name="description"
          placeholder="Opis Produktu"
          rows="5"
          className="add-product__textarea"
        ></textarea>

        <button onClick={addProductFunction} type="button" className="add-product__button">
          Dodaj Produkt
        </button>
      </div>
    </div>
  );
};

export default AddProductPage;
