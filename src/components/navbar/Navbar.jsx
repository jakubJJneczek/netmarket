import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import Cart from "../cart/cart.jsx";

const Navbar = () => {
  // get user from localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  // navigate
  const navigate = useNavigate();

  // logout function
  const logout = () => {
    localStorage.clear("users");
    navigate("/login");
  };
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);
  // navList Data
  const navList = (
    <ul className="flex space-x-3 text-white font-medium text-md px-5 items-center">
      {/* Home */}
      <li>
        <Link to={"/"}>Strona główna</Link>
      </li>

      {/* All Product */}
      <li>
        <Link to={"/allproduct"}>Produkty</Link>
      </li>

      {/* Signup */}
      {!user ? (
        <li>
          <Link to={"/signup"}>Zarejestruj</Link>
        </li>
      ) : (
        ""
      )}

      {/* Signup */}
      {!user ? (
        <li>
          <Link to={"/login"}>Zaloguj</Link>
        </li>
      ) : (
        ""
      )}

      {/* User */}
      {user?.role === "user" && (
        <li>
          <Link to={"/user-dashboard"}>{user?.name}</Link>
        </li>
      )}

      {/* Admin */}
      {user?.role === "admin" && (
        <li>
          <Link to={"/admin-dashboard"}>Admin</Link>
        </li>
      )}

      {/* logout */}
      {user && (
        <li className=" cursor-pointer" onClick={logout}>
          Wyloguj
        </li>
      )}

      {/* Cart */}
      <li>
        <Link to={"/cart"}>
          <Cart cartItems={cartItems.length} />
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="bg-gray-600 sticky top-0">
      {/* main  */}
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
        {/* left  */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className=" font-bold text-white text-2xl text-center">
              NetMarket
            </h2>
          </Link>
        </div>
        {/* Search Bar  */}

        {/* right  */}
        <div className="right flex justify-center mb-4 lg:mb-0 items-center">
          <SearchBar />
          {navList}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
