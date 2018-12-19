import React, { Component } from 'react';
import logo from '../../assets/FastFood.svg';
import { withStyles } from '@material-ui/core/styles';
//import PropTypes from "prop-types";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { white } from 'material-ui/styles/colors';
import CheckoutPage from "./VerticalStepper";
import "./Checkout.css";
import Header from '../../common/header/Header'



// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Divider from '@material-ui/core/Divider';
// import Snackbar from '@material-ui/core/Snackbar';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import 'font-awesome/css/font-awesome.min.css';
// import Typography from '@material-ui/core/Typography';




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

        this.state={
            message: "",
        }
        
    }
    

      

    render() {
        const { classes } = this.props;
        const cartPrice= this.props.cartPrice;
        const cartItems= this.props.cartItems;
        
        return (
             <div className="home">
            {/*      <img src={logo}  className={classes.headerImage} alt="AppLogo"/>
                   ---------------------Check Food App  
                <br></br>   */}
                

                <MuiThemeProvider>
            <div className={classes.root}>
            
             {/* To be integrated later */}
            
            <Header
               showLink={false}
               history={this.props.history}
               showSearch={false}
               //searchImageByDescription={this.searchImageByDescription}
               showUpload={false}
               isCheckout={true}
               // uploadNewImage={this.uploadNewImage}
               //showProfile={false}
               //enableMyAccount={true}
            />
            
          <div className= {classes.root}>
            
                <CheckoutPage style={{width: '60%'}} cartPrice={cartPrice} cartItems= {cartItems}>

                </CheckoutPage>
          </div>
        </div>
      </MuiThemeProvider>

            </div>
        ) }

}
export default withStyles(styles)(Checkout);





