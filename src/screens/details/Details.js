import React, { Component } from 'react';
import logo from '../../assets/FastFood.svg';
import "./Details.css";

import mock from "../../assets/mock.jpg";

import Header from '../../common/header/header';
import { List, ListItemText, ListItemSecondaryAction, Card, CardContent, Badge, Button, Snackbar } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const menu = [
  {
    categoryName: "chinese",
    items: [
      {
        name: "hakka noodles",
        isVeg: true,
        price: 204
      },
      {
        name: "chicken wrap",
        isVeg: false,
        price: 245
      },
      {
        name: "chicken noodles",
        isVeg: false,
        price: 246
      }
    ]
  },
  {
    categoryName: "continental",
    items: [
      {
        name: "ice cream",
        isVeg: true,
        price: 204
      }
    ]
  }
]

class CartItem extends Component {
  render () {
    return (
      <ListItem>
        {
          (this.props.isVeg
          &&
          <i style = {{color: "green"}} className="fa fa-stop-circle-o" aria-hidden="true"></i>)
          ||
          <i style = {{color: "red"}} className="fa fa-stop-circle-o" aria-hidden="true"></i>
        }

        <ListItemText style = {{ textTransform: "capitalize" }} primary = {this.props.name} />
        <ListItemSecondaryAction>
          <span className = "cart-item-quantity">
            <IconButton aria-label = "Remove" onClick = {this.props.decreaseQuantity} className = "hover-yellow-icon">
              <Remove />
            </IconButton>
            <span>{this.props.quantity}</span>
            <IconButton aria-label = "Add" onClick = {this.props.increaseQuantity} className = "hover-yellow-icon">
              <Add />
            </IconButton>
          </span>
          <i className="fa fa-inr" aria-hidden="true"></i> {(this.props.price * this.props.quantity).toFixed(2)}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

class MenuCategory extends Component {
  render () {
    return (
    <React.Fragment>
      <ListItem>
        <ListItemText style = {{ textTransform: "capitalize" }} primary = {this.props.name} />
      </ListItem>
      <Divider />
      <List component = "div">
        {
          this.props.items.map(
            (item, index) => <MenuItem name = {item.name} isVeg = {item.isVeg} price = {item.price} addItemToCart = {this.props.addItemToCart.bind(this.props.thisReference, this.props.categoryIndex, index)} key = {index} />
          )
        }
      </List>
    </React.Fragment>
    )
  }
}

class MenuItem extends Component {
  render () {
    return (
      <ListItem>
        {
          (this.props.isVeg
          &&
          <i style = {{color: "green"}} className="fa fa-circle" aria-hidden="true"></i>)
          ||
          <i style = {{color: "red"}} className="fa fa-circle" aria-hidden="true"></i>
        }
        <ListItemText style = {{ textTransform: "capitalize" }} primary = {this.props.name} />
        <ListItemSecondaryAction>
          <i className="fa fa-inr" aria-hidden="true"></i> {this.props.price.toFixed(2)}
          <IconButton aria-label = "Add" onClick = {this.props.addItemToCart} thisReference = {this.props.thisReference}>
            <Add />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default class Details extends Component {
  constructor (props) {
    super(props);

    this.state = {
      cart: {
        totalItems: 0,
        totalPrice: 0,
        items: [
          // default items for the cart can be added here
        ]
      },
      isSnackBarOpen: false,
      snackBarMsg: "Default message"
    };

    this.updateTotals = this.updateTotals.bind(this);
    this.openSnackBar = this.openSnackBar.bind(this);
    this.closeSnackBar = this.closeSnackBar.bind(this);
  }

  componentDidMount () {
    this.updateTotals();
  }

  updateTotals () {
    let totalPrice = 0, totalItems = 0, currentCart = this.state.cart;

    this.state.cart.items.map(
      (item) => {
        totalPrice += (item.price * item.quantity);
        totalItems += item.quantity
      }
    );

    currentCart.totalItems = totalItems;
    currentCart.totalPrice = totalPrice;

    this.setState({ cart: currentCart });
  }

  increaseCartItemQuantity (index) {
    let currentCart = this.state.cart;

    currentCart.items[index].quantity += 1;

    this.setState({ cart: currentCart, snackBarMsg: "Item quantity increased by 1!" });

    this.openSnackBar();
    this.updateTotals();
  }

  decreaseCartItemQuantity (index) {
    let currentCart = this.state.cart;

    if (currentCart.items[index].quantity > 0) {
      currentCart.items[index].quantity -= 1;

      if (currentCart.items[index].quantity === 0) {
        currentCart.items.splice(index, 1);
      }

      this.setState({ cart: currentCart, snackBarMsg: "Item quantity decreased by 1!" });

      this.openSnackBar();
      this.updateTotals();
    }
  }

  addItemToCart (categoryIndex, itemIndex) {
    let currentCart = this.state.cart;

    let itemToBeAdded = menu[categoryIndex].items[itemIndex];

    let itemInCartIndex = currentCart.items.findIndex(
      (item) => (item.name === itemToBeAdded.name)
    )

    if (itemInCartIndex > -1) {
      // item already in cart
      this.increaseCartItemQuantity(itemInCartIndex);
    }
    else {
      // new item
      currentCart.items.push({
        ...itemToBeAdded,
        quantity: 1
      });
    }

    this.setState({ cart: currentCart, snackBarMsg: "Item added to cart!"});

    this.openSnackBar();
    this.updateTotals();
  }

  openSnackBar () {
    this.setState({ isSnackBarOpen: true });
  }

  closeSnackBar () {
    this.setState({ isSnackBarOpen: false });
  }

  render () {
    return (
      <React.Fragment>
        {/* header */}
        <Header isDetails = {true} />

        {/* Restaurant info */}
        <div className = "restaurant-info">
          <div className = "restaurant-img">
            <img src = {mock} />
          </div>

          <div className = "restaurant-text-info">
            <div className = "restaurant-name">Loud Silence</div>
            <div className = "restaurant-locality">cbd-belapur</div>
            <div className = "restaurant-categories">Chinese, Continental, Indian, Italian</div>
            <div className = "restaurant-info-footer">
              <div className = "restaurant-rating"><i className="fa fa-star" aria-hidden="true"></i> 4.4
                <br />
                <span className = "restaurant-rating-text">
                  AVERAGE RATING BY
                  <br />
                  <span>{123}</span> USERS
                </span>
              </div>
              <div className = "restaurant-avg-cost">&#8377; 600
                <br />
                <span className = "restaurant-avg-cost-text">
                  AVERAGE COST FOR
                  <br />
                  TWO PEOPLE
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className = "details-bottom">
          {/* Menu */}
          <div className = "restaurant-menu">
            <List component = "div">
              {
                menu.map(
                  (category, index) => <MenuCategory name = {category.categoryName} items = {category.items} addItemToCart = {this.addItemToCart} categoryIndex = {index} thisReference = {this} key = {index}/>
                )
              }
            </List>
          </div>

          {/* Cart */}
          <div className = "cart">
          <Card>
            <CardContent>
              <Badge badgeContent = {this.state.cart.totalItems} color = "primary">
                <ShoppingCart />
              </Badge>
              <span style = {{ fontWeight: "bold", fontSize: "20px", paddingLeft: "25px" }}>My Cart</span>

              <List component = "div">
                {
                  this.state.cart.items.map(
                    (item, index) => React.createElement(CartItem, {...item, increaseQuantity: this.increaseCartItemQuantity.bind(this, index), decreaseQuantity: this.decreaseCartItemQuantity.bind(this, index), key: {index}})
                  )
                }

                <ListItem style = {{ fontWeight: "bold" }}>
                  TOTAL AMOUNT

                  <ListItemSecondaryAction style = {{ fontWeight: "bold" }}>
                    <i className="fa fa-inr" aria-hidden="true"></i> {this.state.cart.totalPrice.toFixed(2)}
                  </ListItemSecondaryAction>
                </ListItem>
              </List>

              <Button variant = "contained" color = "primary" style = {{ width: "100%" }}>CHECKOUT</Button>

            </CardContent>
          </Card>
        </div>
        </div>

        <Snackbar
          anchorOrigin = {{ vertical: "bottom", horizontal: "left" }}
          autoHideDuration = {1000}
          open = {this.state.isSnackBarOpen}
          onClose = {this.closeSnackBar}
          message = {this.state.snackBarMsg}
          action = {[
            <IconButton onClick = {this.closeSnackBar}>
              <CloseIcon style = {{ color: "white" }}/>
            </IconButton>
          ]}
        />
      </React.Fragment>
    )
  }
}