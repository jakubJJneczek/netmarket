import { useNavigate, useParams } from "react-router-dom";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const categoryList = [
  {
    name: "Laptopy",
  },
  {
    name: "Smatfony",
  },
  {
    name: "TV",
  },
  {
    name: "Gaming",
  },
  {
    name: "Foto",
  },
  {
    name: "Tablety",
  },
  {
    name: "Słuchawki",
  },
];

const UpdateProductPage = () => {
  const context = useContext(myContext);
  const { setLoading, getAllProductFunction } = context;

  //navigate
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  //product state

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageurl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-es", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  //get single poroduct function

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
  //update product

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
    <div>
      <div className="flex justify-center items-center h-screen">
        {/* Login Form  */}
        <div className="login_Form bg-gray-50 px-8 py-6 border border-gray-100 rounded-xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold  ">
              Zaktualizuj produkt
            </h2>
          </div>

          {/* Input One  */}
          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={(e) => {
                setProduct({
                  ...product,
                  title: e.target.value,
                });
              }}
              placeholder="Tytuł"
              className="bg-gray-50 border border-gray-200 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-800"
            />
          </div>

          {/* Input Two  */}
          <div className="mb-3">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => {
                setProduct({
                  ...product,
                  price: e.target.value,
                });
              }}
              placeholder="Cena"
              className="bg-gray-50 border border-gray-200 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-800"
            />
          </div>

          {/* Input Three  */}
          <div className="mb-3">
            <input
              type="text"
              name="productImageurl"
              onChange={(e) => {
                setProduct({
                  ...product,
                  productImageurl: e.target.value,
                });
              }}
              value={product.productImageurl}
              placeholder="Zdjęcie Produktu (URL)"
              className="bg-gray-50 border border-gray-200 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-800"
            />
          </div>

          {/* Input Four  */}
          <div className="mb-3">
            <select
              value={product.category}
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: e.target.value,
                });
              }}
              className="w-full px-1 py-2 text-gray-800 bg-gray-50 border border-gray-200 rounded-md outline-none  "
            >
              <option disabled>Wybierz kategorię produktu</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option
                    className=" first-letter:uppercase"
                    key={index}
                    value={name}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Input Five  */}
          <div className="mb-3">
            <textarea
              name="description"
              placeholder="Opis produktu"
              value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e.target.value,
                });
              }}
              rows="5"
              className=" w-full px-2 py-1 text-gray-800 bg-gray-50 border border-gray-200 rounded-md outline-none placeholder-gray-800 "
            ></textarea>
          </div>

          {/* Update Product Button  */}
          <div className="mb-3">
            <button
              onClick={updateProduct}
              type="button"
              className="w-full px-4 py-3 text-center text-gray-100 bg-gray-500 border border-transparent dark:border-gray-700 hover:border-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl "
            >
              Edytuj produkt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductPage;
