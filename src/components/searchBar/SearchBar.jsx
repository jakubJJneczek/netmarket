import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "../styles/searchBar.scss";

const SearchBar = () => {
  const context = useContext(myContext);
  const { getAllProduct } = context;
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Filter search data
  const filterSearchData = getAllProduct.filter((obj) => obj.title.toLowerCase().includes(search)).slice(0, 8);

  return (
    <div className="search-bar">
      <SearchIcon className="search-icon" />
      <div className="search-bar__input-container">
        <input
          type="text"
          placeholder="Wyszukaj produkt"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar__input"
        />
        {search && (
          <div className="search-bar__dropdown">
            {filterSearchData.length > 0 ? (
              filterSearchData.map((item, index) => (
                <div
                  onClick={() => navigate(`/productinfo/${item.id}`)}
                  key={index}
                  className="search-bar__dropdown-item"
                >
                  <div className="search-bar__dropdown-content">
                    <img className="search-bar__dropdown-image" src={item.productImageurl} alt={item.title} />
                    {item.title}
                  </div>
                </div>
              ))
            ) : (
              <div className="search-bar__no-results flex flex-col items-center">
                <img
                  src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150544943.jpg?ga=GA1.1.198981354.1731618927&semt=ais_hybrid"
                  alt="No results"
                  className="search-bar__no-results-image"
                />
                <p className="text-gray-600 text-sm mt-2">Brak wyników dla tej frazy</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
