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
import GridList from '@material-ui/core/GridList';


    const styles = {
        
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

class Home extends Component {
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

        xhrRestaurant.open("GET", "http://localhost:8080/api/restaurant");
        xhrRestaurant.send(reataurantData);
        
    }

    render() {
        const { classes } = this.props;
        const dataSource = this.state.restaurantsArray;
        return (
            <div className="home">
                <img src={logo}  className={classes.headerImage} alt="AppLogo"/>
                  ---------------------Check Food App  
                <br></br>  

                <MuiThemeProvider>
            <div>
            {/* <Header
            showLink={false}
            history={this.props.history}
            showSearch={true}
            searchImageByDescription={this.searchImageByDescription}
            showUpload={true}
            uploadNewImage={this.uploadNewImage}
            showProfile={true}
            enableMyAccount={true}
            /> */}
          <div className="images-main-container">
            <GridList cellHeight={"auto"} cols={4}>
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
            {/* <div className="left-column">
              {dataSource.map((restaurant, index) =>
                // index % 2 === 0 ? (
                  <RestaurantCard
                    key={index}
                    image={restaurant}
                    index={index}
                    classes={classes}
                    // likeButtonClickHandler={this.likeButtonClickHandler}
                    // commentChangeHandler={this.commentChangeHandler}
                    // addCommentClickHandler={this.addCommentClickHandler}
                  />
                // ) : null
              )}
            </div> */}
          </div>
        </div>
      </MuiThemeProvider>

            </div>
        ) }

}
export default withStyles(styles)(Home);