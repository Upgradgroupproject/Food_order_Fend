import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Home.css';
//import Header from '../../common/header/Header';
import logo from '../../assets/FastFood.svg';
import { withStyles } from '@material-ui/core/styles';
import * as Utils from "../../common/Utils";
import * as Constants from "../../common/Constants";


import PropTypes from "prop-types";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ImageCard from "./RestaurantCard";

const styles = theme => ({
    image: {
        flex: 1,
        width: 50,
        height: 50,
        resizeMode: 'contain' 
    }
});

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
            isDataLoaded:false
        }
    }
    
    componentDidMount() {

          //this.getAllImageData();
        
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
                console.log(JSON.parse(this.responseText) );         
             }
        });

        xhrRestaurant.open("GET", "http://localhost:8080/api/restaurant");
        xhrRestaurant.send(reataurantData);
        
    }

    // getAllImageData = () => {
    //       const requestUrl = this.props.baseUrl + "/restaurant";
    //       const that = this;
    //       Utils.makeApiCall(
    //         requestUrl,
    //         null,
    //         null,
    //         Constants.ApiRequestTypeEnum.GET,
    //         null,
    //         responseText => {
    //           that.setState(
    //             {
    //               imageData: JSON.parse(responseText).data
    //               // imageData: ImageData.data
    //             },
    //             function() {
    //               that.setState({
    //                 isDataLoaded: true
    //               });
    //             }
    //           );
    //         },
    //         () => {}
    //       );
        
    //   };

    render() {
        const { classes } = this.props;
        const dataSource = this.state.restaurantsArray;
        return (
            <div className="home">
                <img src={logo}  className={classes.image} alt="AppLogo"/>
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
            <div className="left-column">
              {dataSource.map((image, index) =>
                index % 2 === 0 ? (
                  <ImageCard
                    key={index}
                    image={image}
                    index={index}
                    classes={classes}
                    likeButtonClickHandler={this.likeButtonClickHandler}
                    commentChangeHandler={this.commentChangeHandler}
                    addCommentClickHandler={this.addCommentClickHandler}
                  />
                ) : null
              )}
            </div>
            <div className="right-column">
              {dataSource.map((image, index) =>
                index % 2 !== 0 ? (
                  <ImageCard
                    key={index}
                    image={image}
                    index={index}
                    classes={classes}
                    likeButtonClickHandler={this.likeButtonClickHandler}
                    commentChangeHandler={this.commentChangeHandler}
                    addCommentClickHandler={this.addCommentClickHandler}
                  />
                ) : null
              )}
            </div>
          </div>
        </div>
      </MuiThemeProvider>

            </div>
        ) }

}
export default withStyles(styles)(Home);