import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(
      eachItem => eachItem.id === product.id,
    )
    const updatedFilter = cartList.filter(
      eachItem => eachItem.id !== product.id,
    )
    if (filteredCartList.length > 0) {
      const quantity = product.quantity + 1
      const updatedProduct = {...product, quantity}
      this.setState({cartList: [...updatedFilter, updatedProduct]})
    } else {
      this.setState({cartList: [...cartList, product]})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: filteredCartList})
  }

  incrementCartItemQuantity = product => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(
      eachItem => eachItem.id !== product.id,
    )
    this.setState({cartList: [...filteredCartList, product]})
  }

  decrementCartItemQuantity = product => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(
      eachItem => eachItem.id !== product.id,
    )
    if (product.quantity > 0) {
      this.setState({cartList: [...filteredCartList, product]})
    } else {
      this.setState({cartList: filteredCartList})
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            removeAllCartItems: this.updateCartList,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
