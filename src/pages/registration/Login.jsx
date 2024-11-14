/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import "../styles/login.scss"; // Import stylów SCSS

const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const userLoginFunction = async () => {
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("Wypełnij wszystkie pola");
      return;
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);

      const q = query(collection(fireDB, "user"), where("uid", "==", users?.user?.uid));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let user;
        QuerySnapshot.forEach((doc) => (user = doc.data()));
        localStorage.setItem("users", JSON.stringify(user));
        setUserLogin({ email: "", password: "" });
        toast.success("Zalogowano pomyślnie");
        setLoading(false);
        navigate(user.role === "user" ? "/user-dashboard" : "/admin-dashboard");
      });
      return () => data;
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Logowanie nie powiodło się");
    }
  };

  return (
    <div className="login-container">
      {loading && <Loader />}
      <div className="login-form">
        <h2 className="login-title">Zaloguj się</h2>
        <input
          type="email"
          placeholder="Podaj adres email"
          value={userLogin.email}
          onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Podaj hasło"
          value={userLogin.password}
          onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
          className="login-input"
        />
        <button type="button" onClick={userLoginFunction} className="login-button">
          Zaloguj się
        </button>
        <p>
          Nie posiadasz konta?{" "}
          <Link to="/signup" className="signup-link">
            Zarejestruj się
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
