import { useCart } from '../context/CartContext.jsx';

export default function CartPage() {
  const { cart, dispatch } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Корзина пуста</h2>
        <p>Добавьте товары на главной странице</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>🛒 Ваша корзина</h2>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-info">
              <h4>{item.name}</h4>
              <p>{item.price.toLocaleString()} ₽ × {item.quantity}</p>
            </div>
            <button
              className="remove-btn"
              onClick={() => handleRemove(item.id)}
              aria-label="Удалить товар"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>Итого: {total.toLocaleString()} ₽</h3>
      </div>
    </div>
  );
}