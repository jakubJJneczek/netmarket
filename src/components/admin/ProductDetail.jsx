// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const context = useContext(myContext);
  const { setLoading, getAllProduct, getAllProductFunction } = context;

  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "product", id));
      toast.success("Product Deleted successfully");
      getAllProductFunction();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="py-5 flex justify-between items-center">
        <h1 className="text-xl text-gray-800 font-bold">All Products</h1>
        <Link to={"/addproduct"}>
          <button className="px-5 py-2 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100">
            Add Product
          </button>
        </Link>
      </div>

      <div className="w-full overflow-x-auto mb-5">
        <table className="w-full text-left border-collapse sm:border-separate border-gray-100 text-gray-800">
          <thead>
            <tr>
              <th className="h-12 px-6 text-md border border-gray-100 bg-white font-bold">
                No.
              </th>
              <th className="h-12 px-6 text-md border border-gray-100 bg-white font-bold">
                Image
              </th>
              <th className="h-12 px-6 text-md border border-gray-100 bg-white font-bold">
                Title
              </th>
              <th className="h-12 px-6 text-md border border-gray-100 bg-white font-bold">
                Price
              </th>
              <th className="h-12 px-6 text-md border border-gray-100 bg-white font-bold">
                Category
              </th>
              <th className="h-12 px-6 text-md border border-gray-100 bg-white font-bold">
                Date
              </th>
              <th className="h-12 px-6 text-md border border-gray-100 bg-white font-bold">
                Edit
              </th>
              <th className="h-12 px-6 text-md border border-gray-100 bg-white font-bold">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {getAllProduct.map((item, index) => {
              const { id, title, price, category, date, productImageurl } =
                item;
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="h-12 px-6 text-md border border-gray-100">
                    {index + 1}.
                  </td>
                  <td className="h-12 px-6 text-md border border-gray-100">
                    <div className="flex justify-center">
                      <img className="w-20" src={productImageurl} alt="" />
                    </div>
                  </td>
                  <td className="h-12 px-6 text-md border border-gray-100">
                    {title}
                  </td>
                  <td className="h-12 px-6 text-md border border-gray-100">
                    {price} zł
                  </td>
                  <td className="h-12 px-6 text-md border border-gray-100">
                    {category}
                  </td>
                  <td className="h-12 px-6 text-md border border-gray-100">
                    {date}
                  </td>
                  <td
                    onClick={() => navigate(`/updateproduct/${id}`)}
                    className="h-12 px-6 text-md border border-gray-100 text-green-500 cursor-pointer hover:underline"
                  >
                    Edit
                  </td>
                  <td
                    onClick={() => deleteProduct(id)}
                    className="h-12 px-6 text-md border border-gray-100 text-red-500 cursor-pointer hover:underline"
                  >
                    Delete
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
