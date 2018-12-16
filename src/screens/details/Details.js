import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import './Home.css';
//import Header from '../../common/header/Header';
import logo from '../../assets/FastFood.svg';
import { withStyles } from '@material-ui/core/styles';
//import PropTypes from "prop-types";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RestaurantCard from "./RestaurantCard";
import {GridListTile} from '@material-ui/core';   
import Divider from '@material-ui/core/Divider';
import HomeHeader from '../../common/header/Header';
import { grey } from '@material-ui/core/colors';


const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: grey,
        width:'95%',
        
      },
      gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
      },
    headerImage: {
        flex: 1,
        width: 50,
        height: 50,
        resizeMode: 'contain' 
    },
    restaurantImage: {
        flex: 1,
        width: '95%',
        height: 200,
        resizeMode: 'contain' 
    },
    restaurantName: {
        flex: 1,
        height: 50,
        resizeMode: 'contain' 
    },
    restaurantCard: {
      marginBottom: 40,
      margintop: 40
    },
};

class Details extends Component {
constructor() {
    super();
    
    this.state = {
        id : "",
        restaurantName : "" ,
        photoUrl : "" ,
        userRating : "" ,
        avgPrice : "" ,
        numberUsersRated : "" ,
        address : "" ,
        categories : [],
        restaurantsArray : [],
        //isDataLoaded:false
    }
}


  componentWillMount() {

    
    let reataurantData = null;
    let xhrRestaurant = new XMLHttpRequest();
    let that = this;
    
    xhrRestaurant.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            that.setState({
                restaurantsArray : JSON.parse(this.responseText)             
            });      
         }
    });

    xhrRestaurant.open("GET", "http://localhost:8080/api/restaurant/{restaurantID}");
    xhrRestaurant.send(reataurantData);
    
}

render() {
    const { classes } = this.props;
    const dataSource = this.state.restaurantsArray;
    return (
        <div className="Details
        ">
            <img src={logo}  className={classes.headerImage} alt="AppLogo"/>
              ---------------------Check Food App  
            <br></br>  

            <MuiThemeProvider>
        <div>
      <div className= {classes.root}>
        <GridList className={classes.root}cellHeight={"auto"} cols={4} spacing={15}>
            {dataSource.map((restaurant, index) =>
                <GridListTile key={'mykey' + index}>
                    <RestaurantCard
                        key={index}
                        rest={restaurant}
                        index={index}
                        classes={classes}
                                // likeButtonClickHandler={this.likeButtonClickHandler}
                                // commentChangeHandler={this.commentChangeHandler}
                                // addCommentClickHandler={this.addCommentClickHandler}
                            />
                </GridListTile>
            )}
        </GridList>
      </div>
    </div>
  </MuiThemeProvider>

        </div>
    ) }

}
export default withStyles(styles)(Details); 
