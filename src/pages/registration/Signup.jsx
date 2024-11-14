/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import "../styles/signup.scss"; // Import stylów SCSS

const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const userSignupFunction = async () => {
    if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
      toast.error("Wypełnij wszystkie pola");
      return;
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userRefrence = collection(fireDB, "user");
      await addDoc(userRefrence, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });

      toast.success("Zarejestrowano pomyślnie");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Rejestracja nie powiodła się");
    }
  };

  return (
    <div className="signup-container">
      {loading && <Loader />}
      <div className="signup-form">
        <h2 className="signup-title">Zarejestruj się</h2>
        <input
          type="text"
          placeholder="Podaj Imię"
          value={userSignup.name}
          onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
          className="signup-input"
        />
        <input
          type="email"
          placeholder="Podaj adres email"
          value={userSignup.email}
          onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Podaj hasło"
          value={userSignup.password}
          onChange={(e) => setUserSignup({ ...userSignup, password: e.target.value })}
          className="signup-input"
        />
        <button type="button" onClick={userSignupFunction} className="signup-button">
          Zarejestruj się
        </button>
        <p>
          Posiadasz już konto?{" "}
          <Link to="/login" className="login-link">
            Zaloguj się
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
