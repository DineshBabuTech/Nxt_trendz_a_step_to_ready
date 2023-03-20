import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const amountArray = cartList.map(
        eachItem => eachItem.quantity * eachItem.price,
      )
      const totalAmount = amountArray.reduce(
        (result, eachAmount) => result + eachAmount,
      )

      const ItemsCount = cartList.length
      return (
        <div className="cart-summary-cont">
          <div className="cart-content-cont">
            <h1 className="order-text">
              Order Total: <span className="span-item">RS {totalAmount}/-</span>
            </h1>
            <p className="items-cart">{ItemsCount} Items in cart</p>

            <button className="checkout-btn" type="button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
