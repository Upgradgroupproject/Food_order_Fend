import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { white } from 'material-ui/styles/colors';
import CheckoutPage from "./VerticalStepper";
import "./Checkout.css";
import Header from '../../common/header/Header'

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
             <div>
            
             {/* To be integrated later */}
            
                <Header
                showLink={true}
                history={this.props.history}
                isHome={false}
                showProfile={true}
                enableMyAccount={true}
                />
            
                <div className= {classes.root}>
                    
                        <CheckoutPage  cartPrice={cartPrice} cartItems= {cartItems}>

                        </CheckoutPage>
                </div>

            </div>
        ) }

}
export default withStyles(styles)(Checkout);





