import ProductCard from '../components/ProductCard';

const products = [
  {
    id: 1,
    name: "Gloss Drip",
    price: 2990,
    image: "https://i.pinimg.com/736x/c5/bb/b6/c5bbb67c63300e7e7c536a2057152381.jpg",
    description: "Интенсивно увлажняющий глянцевый бальзам для губ с эффектом объема.",
    volume: "5 мл",
    skinType: "Все типы",
    effect: "Мгновенное сияние, увлажнение на 8 часов",
    ingredients: "Гиалуроновая кислота, масло ши, витамин Е, сквалан, растительные экстракты."
  },
  {
    id: 2,
    name: "Laneige Lip Sleeping Mask",
    price: 3990,
    image: "https://i.pinimg.com/1200x/f9/68/97/f96897236a5439fb864e18b0a77c9381.jpg",
    description: "Ночная маска для губ, восстанавливающая сухие и потрескавшиеся губы.",
    volume: "20 г",
    skinType: "Сухая, обезвоженная кожа губ",
    effect: "Мягкость и гладкость с утра",
    ingredients: "Березовый сок, антиоксиданты, витамины C и E, миндальное масло."
  },
  {
    id: 3,
    name: "KIEHL'S Ultra Facial Cream",
    price: 14990,
    image: "https://i.pinimg.com/1200x/b3/dc/6c/b3dc6cb1ab6261ee1c85068f1a93ebd8.jpg",
    description: "Легкий крем для лица с 24-часовым увлажнением без жирного блеска.",
    volume: "125 мл",
    skinType: "Все типы кожи, включая чувствительную",
    effect: "Гладкость, комфорт, защита от сухости",
    ingredients: "Антарктицин, сквалан, витамин Е, глицерин, масло авокадо."
  },
  {
    id: 4,
    name: "Ello Bio-Collagen Serum",
    price: 29990,
    image: "https://i.pinimg.com/736x/cb/37/e6/cb37e6147f47c2c900f62ec9328774ab.jpg",
    description: "Антивозрастная сыворотка с био-коллагеном для подтяжки овала лица.",
    volume: "30 мл",
    skinType: "Зрелая кожа 35+",
    effect: "Лифтинг, разглаживание морщин, упругость",
    ingredients: "Морской коллаген, пептиды, гиалуроновая кислота, экстракт водорослей."
  },
  {
    id: 5,
    name: "NEW Radiance Essence",
    price: 44990,
    image: "https://i.pinimg.com/736x/90/24/72/902472a156c3a44296ed9c409ceda00f.jpg",
    description: "Осветляющая эссенция для сияющей и ровной тональности кожи.",
    volume: "50 мл",
    skinType: "Тусклая, неровная кожа",
    effect: "Сияние, выравнивание тона, защита от пигментации",
    ingredients: "Ниацинамид, арбутин, витамин C, ферментированный рис, экстракт женьшеня."
  },
  {
    id: 6,
    name: "Florence Botanical Oil",
    price: 59990,
    image: "https://i.pinimg.com/736x/ec/76/1d/ec761d52366b30fe72d59de403a5b8b2.jpg",
    description: "Роскошное многофункциональное масло для лица, тела и волос.",
    volume: "100 мл",
    skinType: "Сухая, обезвоженная кожа",
    effect: "Питание, восстановление липидного барьера, блеск волос",
    ingredients: "Масло арганы, жожоба, камелии, макадамии, розмарина и лаванды."
  }
];

export default function HomePage() {
  return (
    <div className="page-container">
      <div className="app-header">
        <h1>Магазин Beauty</h1>
        <p>Премиальная косметика с натуральным составом и доказанной эффективностью</p>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            description={product.description}
            volume={product.volume}
            skinType={product.skinType}
            effect={product.effect}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
}
