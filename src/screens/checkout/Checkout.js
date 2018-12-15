import React, { Component } from 'react';
import logo from '../../assets/FastFood.svg';
import { withStyles } from '@material-ui/core/styles';
//import PropTypes from "prop-types";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
//import RestaurantCard from "./RestaurantCard";
import {GridListTile} from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import { white } from 'material-ui/styles/colors';
import Stepper from "./VerticalStepper";

    const styles = {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: white,
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

class Checkout extends Component {
    constructor() {
        super();
        
        this.state = {
            id: "",
            flat_buil_number: "",
            locality: "",
            city: "",
            zipcode: "",
            state_id: "",
        }
    }
    

      componentWillMount() {

        
        let adressData = null;
        let xhrRestaurant = new XMLHttpRequest();
        let that = this;
        
        xhrRestaurant.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    adressList : JSON.parse(this.responseText)             
                });      
             }
        });

        xhrRestaurant.open("GET", "http://localhost:8080/api/address/user?accessToken=205802dd-84f0-42ff-abb8-947d120669a0");
        xhrRestaurant.send(adressData);
        
    }

    render() {
        const { classes } = this.props;
        const userAddressSource = this.state.adressList;
        return (
            <div className="home">
                <img src={logo}  className={classes.headerImage} alt="AppLogo"/>
                  ---------------------Check Food App  
                <br></br>  

                <MuiThemeProvider>
            <div className={classes.root}>
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
          <div className= {classes.root}>
            <span>
                <Stepper>
                
                </Stepper>
            </span>
            <p>summary</p>
          </div>
        </div>
      </MuiThemeProvider>

            </div>
        ) }

}
export default withStyles(styles)(Checkout);





