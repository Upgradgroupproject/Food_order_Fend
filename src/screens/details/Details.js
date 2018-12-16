import React, { Component } from 'react';
import logo from '../../assets/FastFood.svg';
import "./Details.css";

import mock from "../../assets/mock.jpg";

import Header from '../../common/header/header';
import { List, ListItemText, ListItemSecondaryAction, Card, CardContent, Badge } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Add from '@material-ui/icons/Add';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';

export default class Details extends Component {
  render () {

    const mockPrice = 123;

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
              <div className = "restaurant-rating"><i class="fa fa-star" aria-hidden="true"></i> 4.4
                <br />
                <span className = "restaurant-rating-text">
                  AVERAGE RATING BY
                  <br />
                  <span>123</span> USERS
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
              <ListItem>
                <ListItemText primary = "Chinese" />
              </ListItem>
              <Divider />
              <List component = "div">
                <ListItem>
                  <i style = {{color: "green"}} class="fa fa-circle" aria-hidden="true"></i>
                  <ListItemText primary = "hakka noodles" />
                  <ListItemSecondaryAction>
                    <i class="fa fa-inr" aria-hidden="true"></i> {mockPrice.toFixed(2)}
                    <IconButton aria-label = "Add">
                      <Add />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem>
                  <i style = {{color: "red"}} class="fa fa-circle" aria-hidden="true"></i>
                  <ListItemText primary = "hakka noodles" />
                  <ListItemSecondaryAction>
                    <i class="fa fa-inr" aria-hidden="true"></i> {mockPrice.toFixed(2)}
                    <IconButton aria-label = "Add">
                      <Add />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>

              <ListItem>
                <ListItemText primary = "Chinese" />
              </ListItem>
              <Divider />
              <List component = "div">
                <ListItem>
                  <i style = {{color: "red"}} class="fa fa-circle" aria-hidden="true"></i>
                  <ListItemText primary = "hakka noodles" />
                  <ListItemSecondaryAction>
                    <i class="fa fa-inr" aria-hidden="true"></i> {mockPrice.toFixed(2)}
                    <IconButton aria-label = "Add">
                      <Add />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem>
                  <i style = {{color: "red"}} class="fa fa-circle" aria-hidden="true"></i>
                  <ListItemText primary = "hakka noodles" />
                  <ListItemSecondaryAction>
                    <i class="fa fa-inr" aria-hidden="true"></i> {mockPrice.toFixed(2)}
                    <IconButton aria-label = "Add">
                      <Add />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </List>
          </div>

          {/* Cart */}
          <div className = "cart">
          <Card>
            <CardContent>
              <Badge badgeContent = {4} color = "primary">
                <ShoppingCart />
              </Badge>
              <span style = {{ fontWeight: "bold", fontSize: "20px", paddingLeft: "25px" }}>My Cart</span>

              <List component = "div">
                <ListItem>
                  <i style = {{color: "red"}} class="fa fa-stop-circle-o" aria-hidden="true"></i>
                  <ListItemText primary = "hakka noodles" />
                  <ListItemSecondaryAction>
                    <IconButton aria-label = "Add">
                      <Add />
                    </IconButton>
                    <i class="fa fa-inr" aria-hidden="true"></i> {mockPrice.toFixed(2)}
                  </ListItemSecondaryAction>
                </ListItem>
              </List>

            </CardContent>
          </Card>
        </div>
        </div>
      </React.Fragment>
    )
  }
}