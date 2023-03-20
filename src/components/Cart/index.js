import CartContext from '../../context/CartContext'

import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      const clearAllCartItems = () => {
        removeAllCartItems()
      }
      return (
        <>
          <Header />
          {showEmptyView ? (
            <EmptyCartView />
          ) : (
            <div className="cart-container">
              <div className="cart-content-container">
                <div className="remove-all-cont">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    onClick={clearAllCartItems}
                    className="remove-all-btn"
                    type="button"
                  >
                    Remove all
                  </button>
                </div>
                <CartListView />
                <CartSummary />
              </div>
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
