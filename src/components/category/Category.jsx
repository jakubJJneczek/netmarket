import React from "react";
import { useNavigate } from "react-router";
import "../styles/styles.scss"; // Importuj arkusz styli

const category = [
  {
    image:
      "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/40/4021452/Laptop-ASUS-X515EA-BQ1877-01-front.jpg",
    name: "Laptopy",
  },
  {
    image:
      "https://a.allegroimg.com/original/11313e/dc5f9bf7493295d6bdb71ffcb435/Smartfon-Apple-iPhone-14-Pro-6-GB-128-GB-5G-Space-Black",
    name: "Smartfony",
  },
  {
    image:
      "https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/57/5718208/Telewizor-SHARP-FH2EA-skos-1.jpg",
    name: "TV",
  },
  {
    image: "https://www.art-comp24.pl/7285-large_default/komputer-gamer-8-rdzeni-gtx1650-32gb-1201tb-win10.jpg",
    name: "Gaming",
  },
  {
    image: "https://fotoforma.pl/environment/cache/images/500_500_productGfx_136720/aparat-canon-eos-r7-body_1.jpg",
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
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-center mb-5 text-2xl font-semibold mt-5">Kategorie</h1>
      <div className="category-container hide-scrollbar">
        {category.map((item, index) => (
          <div key={index} className="category-item" onClick={() => navigate(`/category/${item.name}`)}>
            <img src={item.image} alt={item.name} />
            <h1>{item.name}</h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;
