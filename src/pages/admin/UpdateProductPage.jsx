import { useNavigate, useParams } from "react-router-dom";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const categoryList = [
  {
    name: "fashion",
  },
  {
    name: "shirt",
  },
  {
    name: "jacket",
  },
  {
    name: "mobile",
  },
  {
    name: "laptop",
  },
  {
    name: "shoes",
  },
  {
    name: "home",
  },
  {
    name: "books",
  },
];

const UpdateProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProductFunction } = context;

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
      toast.success("Product Updated sucesfully");
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
            <h2 className="text-center text-2xl font-bold text-gray-500 ">
              Update Product
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
              placeholder="Product Title"
              className="bg-gray-50 border text-gray-300 border-gray-200 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-300"
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
              placeholder="Product Price"
              className="bg-gray-50 border text-gray-300 border-gray-200 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-300"
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
              placeholder="Product Image Url"
              className="bg-gray-50 border text-gray-300 border-gray-200 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-300"
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
              className="w-full px-1 py-2 text-gray-300 bg-gray-50 border border-gray-200 rounded-md outline-none  "
            >
              <option disabled>Select Product Category</option>
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
              placeholder="Product Description"
              value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e.target.value,
                });
              }}
              rows="5"
              className=" w-full px-2 py-1 text-gray-300 bg-gray-50 border border-gray-200 rounded-md outline-none placeholder-gray-300 "
            ></textarea>
          </div>

          {/* Update Product Button  */}
          <div className="mb-3">
            <button
              onClick={updateProduct}
              type="button"
              className="bg-gray-500 hover:bg-gray-600 w-full text-white text-center py-2 font-bold rounded-md "
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductPage;
