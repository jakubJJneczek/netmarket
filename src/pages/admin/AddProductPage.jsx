import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";

const categoryList = [
  { name: "Laptopy" },
  { name: "Smatfony" },
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
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB, "product");
      await addDoc(productRef, product);
      toast.success("Product added successfully");
      navigate("/admin-dashboard");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Add product failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-50 px-8 py-6 border border-gray-200 rounded-xl shadow-md">
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            Add Product
          </h2>
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            placeholder="Product Title"
            className="bg-gray-50 border text-gray-800 border-gray-300 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-800"
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            placeholder="Product Price"
            className="bg-gray-50 border text-gray-800 border-gray-300 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-800"
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="productImageUrl"
            value={product.productImageurl}
            onChange={(e) =>
              setProduct({ ...product, productImageurl: e.target.value })
            }
            placeholder="Product Image URL"
            className="bg-gray-50 border text-gray-800 border-gray-300 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-800"
          />
        </div>

        <div className="mb-3">
          <select
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            className="w-full px-2 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-md outline-none"
          >
            <option disabled>Select Product Category</option>
            {categoryList.map((value, index) => (
              <option key={index} value={value.name} className="capitalize">
                {value.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <textarea
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            name="description"
            placeholder="Product Description"
            rows="5"
            className="w-full px-2 py-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-md outline-none placeholder-gray-800"
          ></textarea>
        </div>

        <div className="mb-3">
          <button
            onClick={addProductFunction}
            type="button"
            className="bg-gray-600 hover:bg-gray-700 w-full text-white text-center py-2 font-bold rounded-md"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
