import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function ProductCard({ 
  id, 
  name, 
  price, 
  image, 
  description, 
  volume, 
  skinType, 
  effect, 
  ingredients 
}) {
  const [quantity, setQuantity] = useState(1);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showDetails, setShowDetails] = useState(false); 
  const { dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

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
      <img src={image.trim()} alt={name} className="product-image" />
      
      <h3 className="product-name">{name}</h3>
      <p className="product-price">{price.toLocaleString()} ₽</p>
      
      <p className="product-description">{description}</p>
      
      <div className="product-meta">
        <span>🕗 Объём: {volume}</span>
        <span>🧴 Для: {skinType}</span>
        <span>✨ Эффект: {effect}</span>
      </div>

      
      <button 
        type="button"
        className="ingredients-toggle"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Скрыть состав' : 'Показать состав'}
      </button>

      {showDetails && (
        <div className="ingredients-panel">
          <h4>Состав:</h4>
          <p>{ingredients}</p>
        </div>
      )}

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