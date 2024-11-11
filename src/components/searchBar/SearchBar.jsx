import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

// Search Data

const SearchBar = () => {
  const context = useContext(myContext);
  const { getAllProduct } = context;
  // Search State
  const [search, setSearch] = useState("");

  // Filter Search Data
  const filterSearchData = getAllProduct
    .filter((obj) => obj.title.toLowerCase().includes(search))
    .slice(0, 8);
  const navigate = useNavigate();
  return (
    <>
      <SearchIcon sx={{ color: "#FFF", marginRight: "0.5em" }} />
      <div className="">
        {/* search input  */}
        <div className="input flex justify-center">
          <input
            type="text"
            placeholder="Wyszukaj produkt"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-500 placeholder-white rounded-lg px-2 py-2 w-72 lg:w-72 md:w-72 outline-none text-black"
          />
        </div>

        {/* search drop-down  */}
        <div className=" flex justify-center">
          {search && (
            <div className="block absolute bg-gray-200 w-96 md:w-96 lg:w-96 z-50 my-1 rounded-lg px-2 py-2">
              {filterSearchData.length > 0 ? (
                <>
                  {filterSearchData.map((item, index) => {
                    return (
                      <div
                        onClick={() => navigate(`/productinfo/${item.id}`)}
                        key={index}
                        className="py-2 px-2"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            className="w-10"
                            src={item.productImageurl}
                            alt=""
                          />
                          {item.title}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <div className="flex justify-center">
                    <img
                      className=" w-20"
                      src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                      alt="img"
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
