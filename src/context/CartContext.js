import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  decrementCartItemQuantity: () => {},
  incrementCartItemQuantity: () => {},
  removeAllCartItems: () => {},
})

export default CartContext
