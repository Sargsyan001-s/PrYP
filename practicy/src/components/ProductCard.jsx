import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function ProductCard({ name, price, image, id }) {
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const handleAddToCart = () => {
    if (!user) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000);
      return;
    }

    dispatch({
      type: 'additem',
      payload: { id, name, price, image, quantity }
    });

    navigate('/cart');
  };

  const increase = () => setQuantity(q => q + 1);
  const decrease = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-price">{price.toLocaleString()} ₽</p>

      <div className="quantity-controls">
        <button className="quantity-btn" onClick={decrease}>−</button>
        <span className="quantity">{quantity}</span>
          <button className="quantity-btn" onClick={increase}>+</button>
      </div>

      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        В корзину
      </button>

      {showLoginMessage && (
        <div className="login-prompt">
          ^..^ Сперва войдите в аккаунт!
        </div>
      )}
    </div>
  );
}

export default ProductCard;
