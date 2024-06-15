// category
const category = [
  {
    image:
      "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/40/4021452/Laptop-ASUS-X515EA-BQ1877-01-front.jpg",
    name: "Laptopy",
  },
  {
    image:
      "https://a.allegroimg.com/original/11313e/dc5f9bf7493295d6bdb71ffcb435/Smartfon-Apple-iPhone-14-Pro-6-GB-128-GB-5G-Space-Black",
    name: "Smatfony",
  },
  {
    image:
      "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/57/5718208/Telewizor-SHARP-FH2EA-skos-1.jpg",
    name: "TV",
  },
  {
    image:
      "https://mocnykomputer.pl/environment/cache/images/500_500_productGfx_410046/pc_gungnir_110r.png",
    name: "Gaming",
  },
  {
    image:
      "https://fotoforma.pl/environment/cache/images/500_500_productGfx_136720/aparat-canon-eos-r7-body_1.jpg",
    name: "Foto",
  },
  {
    image:
      "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/zdjecia_do_zestawow/Z464544-6491978.jpeg",
    name: "Tablety",
  },
  {
    image:
      "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/37/3784350/Sluchawki-nauszne-SONY-WH-1000XM5B-ANC-Czarny-skos.jpg",
    name: "Słuchawki",
  },
];

const Category = () => {
  return (
    <div>
      <div className="flex flex-col mt-5">
        {/* main 1 */}
        <div className="flex overflow-x-scroll lg:justify-center  hide-scroll-bar">
          {/* main 2  */}
          <div className="flex ">
            {/* category  */}
            {category.map((item, index) => {
              return (
                <div key={index} className="px-3 lg:px-10">
                  {/* Image  */}
                  <div className=" w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full  bg-gray-200 transition-all hover:bg-gray-500 cursor-pointer mb-1 ">
                    <div className="flex justify-center mb-12">
                      {/* Image tag  */}
                      <img src={item.image} alt="img" />
                    </div>
                  </div>

                  {/* Name Text  */}
                  <h1 className=" text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase ">
                    {item.name}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* style  */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            ".hide-scroll-bar {  -ms-overflow-style: none;  scrollbar-width: none;}.hide-scroll-bar::-webkit-scrollbar {  display: none;}",
        }}
      />
    </div>
  );
};

export default Category;
