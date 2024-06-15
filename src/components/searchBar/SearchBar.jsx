import { useState } from "react";

// Search Data
const searchData = [
  {
    name: "Laptopy",
    image:
      "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/40/4021452/Laptop-ASUS-X515EA-BQ1877-01-front.jpg",
  },
  {
    name: "Smarfony",
    image:
      "https://a.allegroimg.com/original/11313e/dc5f9bf7493295d6bdb71ffcb435/Smartfon-Apple-iPhone-14-Pro-6-GB-128-GB-5G-Space-Black",
  },
  {
    name: "TV",
    image:
      "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/57/5718208/Telewizor-SHARP-FH2EA-skos-1.jpg",
  },
  {
    name: "Gaming",
    image:
      "https://mocnykomputer.pl/environment/cache/images/500_500_productGfx_410046/pc_gungnir_110r.png",
  },
  {
    name: "Foto",
    image:
      "https://fotoforma.pl/environment/cache/images/500_500_productGfx_136720/aparat-canon-eos-r7-body_1.jpg",
  },
  {
    name: "Tablety",
    image:
      "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/zdjecia_do_zestawow/Z464544-6491978.jpeg",
  },
  {
    name: "Słuchawki",
    image:
      "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/37/3784350/Sluchawki-nauszne-SONY-WH-1000XM5B-ANC-Czarny-skos.jpg",
  },
];

const SearchBar = () => {
  // Search State
  const [search, setSearch] = useState("");

  // Filter Search Data
  const filterSearchData = searchData
    .filter((obj) => obj.name.toLowerCase().includes(search))
    .slice(0, 8);
  return (
    <div className="">
      {/* search input  */}
      <div className="input flex justify-center">
        <input
          type="text"
          placeholder="Search here"
          onChange={(e) => setSearch(e.target.value)}
          className=" bg-gray-200 placeholder-gray-400 rounded-lg px-2 py-2 w-96 lg:w-96 md:w-96 outline-none text-black "
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
                    <div key={index} className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <img className="w-10" src={item.image} alt="" />
                        {item.name}
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
  );
};

export default SearchBar;
