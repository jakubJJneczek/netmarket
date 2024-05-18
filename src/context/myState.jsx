/* eslint-disable react/prop-types*/
import { useEffect, useState } from "react";
import MyContext from "./myContext";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

const MyState = ({ children }) => {
  const [loading, setLoading] = useState(false);

  //get all product state

  const [getAllProduct, setGetAllProduct] = useState([]);

  const getAllProductFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "product"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllProduct(productArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProductFunction();
  }, []);
  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllProduct,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyState;
