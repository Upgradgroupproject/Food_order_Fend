import React, { Component } from 'react';
import "./Details.css";
import ReactDOM from 'react-dom';
//import mock from "../../assets/mock.jpg";


import Header from '../../common/header/Header';
import { List, ListItemText, ListItemSecondaryAction, Card, CardContent, Badge } from '@material-ui/core';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Checkout from '../checkout/Checkout';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';


class CartItem extends Component {
  render () {
    let isItemVeg = (this.props.type === "Veg");

    return (
      <ListItem>
        {
          (isItemVeg
          &&
          <i style = {{color: "green"}} className="fa fa-stop-circle-o" aria-hidden="true"></i>)
          ||
          <i style = {{color: "red"}} className="fa fa-stop-circle-o" aria-hidden="true"></i>
        }

        <ListItemText style = {{ textTransform: "capitalize" }} primary = {this.props.itemName} />
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
            (item, index) => <MenuItem name = {item.itemName} isVeg = { (item.type === "Veg") ? true : false } price = {item.price} addItemToCart = {this.props.addItemToCart.bind(this.props.thisReference, this.props.categoryId, item.id)} key = {index} />
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
  constructor () {
    super();

    this.state = {
      
      restaurantInfo: '',
      address: '',
      categories: [],


      cart: {
        totalItems: 0,
        totalPrice: 0,
        items: [
          // default items for the cart can be added here
        ]
      },
      isSnackBarOpen: false,
      snackBarMsg: "Default message",
      // default restaurant details
      rest: {
        restaurantName: "-",
        photoUrl: "",
        userRating: "-",
        avgPrice: "-",
        numberUsersRated: "-",
        address: {
          locality: "-"
        },
        infoCategories: [],
        categories: []
      },
      
    };

    this.updateTotals = this.updateTotals.bind(this);
    this.openSnackBar = this.openSnackBar.bind(this);
    this.closeSnackBar = this.closeSnackBar.bind(this);
    this.storeRestaurantDetails = this.storeRestaurantDetails.bind(this);
    this.checkoutHandler = this.checkoutHandler.bind(this);
  }

  componentWillMount () {
    //restDetailsArray = [];
    
    let reataurantData = null;
        let xhrRestaurantDetails = new XMLHttpRequest();
        let restDetails = this;
        
        xhrRestaurantDetails.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              restDetails.setState({
                    restaurantInfo: JSON.parse(this.responseText),
                    address: JSON.parse(this.responseText).address,
                    categories: JSON.parse(this.responseText).categories,
                      
               }); 
               console.log(restDetails.state.address);             
             }
        });

        xhrRestaurantDetails.open("GET", "http://localhost:8080/api/restaurant/"+this.props.id);
        xhrRestaurantDetails.setRequestHeader("Accept", "application/json");
        xhrRestaurantDetails.send(reataurantData);

        //console.log(JSON.parse(this.responseText) );
        

    this.storeRestaurantDetails();
    this.updateTotals();
  }

  storeRestaurantDetails () {
    // let restIndex = this.state.restaurantInfo.findIndex(
    //   //(rest) => rest.id === Number.parseInt(this.props.match.params.restaurantID)
    //   (rest) => rest.id === Number.parseInt(this.props.id)
    // );

    

    
      //let infoCategories = [];
      this.state.categories.map(
        (category) => this.state.rest.infoCategories.push(category.categoryName)
      );

      // this.setState({
      //   rest: {
      //     ...restDetailsArray[restIndex],
      //     infoCategories
      //   }
      // })
    //}
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

  addItemToCart (categoryId, itemId) {
    let currentCart = this.state.cart;

    let itemToBeAdded = this.state.categories.find(
      category => category.id === categoryId
      )
      .items.find(
        item => item.id === itemId
      );

    let itemInCartIndex = currentCart.items.findIndex(
      (item) => (item.id === itemToBeAdded.id)
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

  checkoutHandler () {
    if (this.state.cart.totalItems > 0) {
      // items present in the cart
      console.log(this.state.cart.totalItems,this.state.cart.totalPrice,this.state.cart.items);
      this.props.history.push({
        pathname: "/checkout"
      });
      ReactDOM.render(<Checkout   cartPrice={this.state.cart.totalPrice} cartItems={this.state.cart.items} />, document.getElementById('root'));
    }
    else {
      // no items in the cart
      this.setState({ snackBarMsg: "Please add an item to your cart!"});
      this.openSnackBar();
    }
  }

  openSnackBar () {
    this.setState({ isSnackBarOpen: true });
  }

  closeSnackBar () {
    this.setState({ isSnackBarOpen: false });
  }

  render () {
    const restInfo = this.state.restaurantInfo;
    const restAddress = this.state.address;
    const menuData = this.state.categories;

    return (
      <React.Fragment>
        {/* header */}
        <Header isDetails = {true} history={this.props.history}/>

        {/* Restaurant info */}
        <div className = "restaurant-info">
          <div className = "restaurant-img">
            <img src = { restInfo.photoUrl } alt="Restaurant Details"/>
          </div>

          <div className = "restaurant-text-info">
            <div className = "restaurant-name">{ restInfo.restaurantName }</div>
            <div className = "restaurant-locality">{ restAddress.locality }</div>
            <div className = "restaurant-categories">
              {this.state.categories.map((category,index) => (
                index === 0 ?
                <span key={"category" + category.id}>{category.categoryName} </span> :
                <span key={"category" + category.id}>,{category.categoryName} </span>
            ))}
            </div>
            <div className = "restaurant-info-footer">
              <div className = "restaurant-rating"><i className="fa fa-star" aria-hidden="true"></i> { restInfo.userRating }
                <br />
                <span className = "restaurant-rating-text">
                  AVERAGE RATING BY
                  <br />
                  <span>{ restInfo.numberUsersRated }</span> USERS
                </span>
              </div>
              <div className = "restaurant-avg-cost">&#8377; { restInfo.avgPrice }
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
                menuData.map(
                  (category, index) => <MenuCategory name = {category.categoryName} items = {category.items} addItemToCart = {this.addItemToCart} categoryId = {category.id} thisReference = {this} key = {index}/>
                )
              }

            </List>
          </div>

          {/* Cart */}
          <div className = "cart" >
          <Card >
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

              <Button variant = "contained" color = "primary" style = {{ width: "100%" }} onClick = { this.checkoutHandler }>CHECKOUT</Button>

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