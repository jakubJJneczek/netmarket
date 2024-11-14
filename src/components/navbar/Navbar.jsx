import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import Cart from "../cart/cart.jsx";
import "../styles/searchBar.scss"; // Import pliku SCSS

const Navbar = () => {
  // Pobieranie użytkownika z localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  // Nawigacja
  const navigate = useNavigate();

  // Funkcja wylogowania
  const logout = () => {
    localStorage.removeItem("users"); // Poprawione: removeItem zamiast clear
    navigate("/login");
  };

  const cartItems = useSelector((state) => state.cart);

  // Dane nawigacyjne
  const navList = (
    <ul className="nav-list flex space-x-4 items-center">
      {/* Strona główna */}
      <li>
        <Link to="/">Strona główna</Link>
      </li>

      {/* Produkty */}
      <li>
        <Link to="/allproduct">Produkty</Link>
      </li>

      {/* Rejestracja */}
      {!user && (
        <li>
          <Link to="/signup">Zarejestruj</Link>
        </li>
      )}

      {/* Logowanie */}
      {!user && (
        <li>
          <Link to="/login">Zaloguj</Link>
        </li>
      )}

      {/* Użytkownik */}
      {user?.role === "user" && (
        <li>
          <Link to="/user-dashboard">{user?.name}</Link>
        </li>
      )}

      {/* Administrator */}
      {user?.role === "admin" && (
        <li>
          <Link to="/admin-dashboard">Admin</Link>
        </li>
      )}

      {/* Wylogowanie */}
      {user && (
        <li className="logout cursor-pointer" onClick={logout}>
          Wyloguj
        </li>
      )}

      {/* Koszyk */}
      <li className="cart-icon">
        <Link to="/cart">
          <Cart cartItems={cartItems.length} />
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-gray-600 sticky top-0">
      {/* Główna zawartość */}
      <div className="navbar-container flex justify-between items-center py-3 lg:px-6">
        {/* Lewa strona */}
        <div className="navbar-left">
          <Link to="/">
            <h2 className="navbar-logo font-bold text-white text-2xl text-center">NetMarket</h2>
          </Link>
        </div>

        {/* Prawa strona */}
        <div className="navbar-right flex items-center">
          <SearchBar />
          {navList}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
