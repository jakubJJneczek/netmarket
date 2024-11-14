import { useNavigate, useParams } from "react-router-dom";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
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

const UpdateProductPage = () => {
  const context = useContext(myContext);
  const { setLoading, getAllProductFunction } = context;

  // navigate
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  // product state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageurl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Get single product function
  const getSingleProductFunction = async () => {
    setLoading(true);

    try {
      const productTemp = await getDoc(doc(fireDB, "product", id));

      const product = productTemp.data();
      console.log(product);

      setProduct({
        title: product?.title,
        price: product?.price,
        productImageurl: product?.productImageurl,
        category: product?.category,
        description: product?.description,
        quantity: product?.quantity,
        time: product?.time,
        date: product?.date,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Update product
  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "product", id), product);
      toast.success("Produkt zaktualizowany pomyślnie");
      getAllProductFunction();
      setLoading(false);
      navigate("/admin-dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, []);

  return (
    <div className="add-product">
      <div className="add-product__form-container">
        <div className="add-product__header">
          <h2 className="text-2xl font-bold text-white">Zaktualizuj Produkt</h2>
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
          name="productImageurl"
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

        <button onClick={updateProduct} type="button" className="add-product__button">
          Edytuj Produkt
        </button>
      </div>
    </div>
  );
};

export default UpdateProductPage;
