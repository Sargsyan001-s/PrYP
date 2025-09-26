import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const products = [
  {
    id: 1,
    name: "Gloss Drip",
    price: 2990,
    image: "https://i.pinimg.com/736x/c5/bb/b6/c5bbb67c63300e7e7c536a2057152381.jpg"
  },
  {
    id: 2,
    name: "Laneige",
    price: 3990,
    image: "https://i.pinimg.com/1200x/f9/68/97/f96897236a5439fb864e18b0a77c9381.jpg"
  },
  {
    id: 3,
    name: "KIE",
    price: 14990,
    image: "https://i.pinimg.com/1200x/b3/dc/6c/b3dc6cb1ab6261ee1c85068f1a93ebd8.jpg"
  },
  {
    id: 4,
    name: "Ello",
    price: 29990,
    image: "https://i.pinimg.com/736x/cb/37/e6/cb37e6147f47c2c900f62ec9328774ab.jpg"
  },
  {
    id: 5,
    name: "new",
    price: 44990,
    image: "https://i.pinimg.com/736x/90/24/72/902472a156c3a44296ed9c409ceda00f.jpg"
  },
  {
    id: 6,
    name: "Florence",
    price: 59990,
    image: "https://i.pinimg.com/736x/ec/76/1d/ec761d52366b30fe72d59de403a5b8b2.jpg"
  }
];
export default function HomePage() {
  return (
    <div className="page-container">
      <div className="app-header">
        <h1>Магазин Beauty</h1>
        <p>Выберите товары и добавьте их в корзину</p>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}