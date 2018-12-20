import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import {GridListTile} from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
// import IconButton from '@material-ui/core/IconButton';
import CheckCircle from '@material-ui/icons/CheckCircle';
// import AddressCard from './AddressCard';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import 'font-awesome/css/font-awesome.min.css';
import Typography from '@material-ui/core/Typography';


// const styles = theme => ({
//   root: {
//     width: '90%',
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper
//   },
//   button: {
//     marginTop: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//   },
//   actionsContainer: {
//     marginBottom: theme.spacing.unit * 2,
//   },
//   resetContainer: {
//     padding: theme.spacing.unit * 3,
//   },
//   gridListMain: {
//     flexWrap: 'nowrap',
//     transform: 'translateZ(0)',
//     },
//   card: {
//     maxWidth: 560,
//     margin: 10,
// },
// });
function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };




const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,    
    },
    gridListMain: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    card: {
        maxWidth: 560,
        margin: 10,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    title: {
        fontWeight: 'strong',
        color: 'red',
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    button: {
        margin: '20px'
    }
});



function getSteps() {
  return ['Delivery', 'Payment',];
}

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return `List of addresses`;
//     case 1:
//       return 'List of payment options';
//     default:
//       return 'Unknown step';
//   }
// }


class VerticalLinearStepper extends React.Component {
  
    constructor(props) {
        super(props);
            this.state = {
                id: "",
                flatbuilnumber: "",
                locality: "",
                city: "",
                zipcode: "",
                state_id: "",
                addType:"",
                allAddress:[],
                paymentOptions:[],
                activeStep: 0,
                value: 0,
                paymentMode:0,
                addressTab: 0,
                noAddressMessage:"There are no saved addresses! You can save an address using your ‘Profile’ menu option.",
                invalidAddress:"false",
                toggleFlatHelper:"displayNothing",
                toggleLocalityHelper: "displayNothing",
                toggleCityHelper: "displayNothing",
                toggleZipcodeHelper: "displayNothing",
                toggleStateIdHelper: "displayNothing",
                stateList:[],
                toggleZipcodeValidator:"displayNothing",
                addressProvidedByUser:[],
                addressSelected:"false",
                addressSelectedIndex: '',
                newAddressEnteredByUser: [],

                subTotal: props.cartPrice,
                isSnackBarOpen: false,
                snackBarMsg: "Unable to place your order! Please try again!",

                serverResponse: "",


                dummycheck: "hello+you",


            }

            this.openSnackBar = this.openSnackBar.bind(this);
            this.closeSnackBar = this.closeSnackBar.bind(this);
        
  };

  componentWillMount() {


    let statesData = null;
        let xhrRestaurant = new XMLHttpRequest();
        let stateThat = this;
        
        xhrRestaurant.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                stateThat.setState({
                    stateList : JSON.parse(this.responseText)             
                });      
             }
        });

        xhrRestaurant.open("GET", "http://localhost:8080/api/states");
        xhrRestaurant.send(statesData);

    // access-Token to be set from session-storage    
    if(sessionStorage.getItem("access-token")){

        let adressData = null;
        let xhrAddress = new XMLHttpRequest();
        let addThat = this;
        
        xhrAddress.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                addThat.setState({
                    allAddress : JSON.parse(this.responseText)           
                });      
            }    
            
        });
        
        xhrAddress.open("GET", "http://localhost:8080/api/address/user?accessToken=62f43a69-e749-4a6a-ac58-536b19ce5630");
        xhrAddress.setRequestHeader("Cache-Control", "no-cache");
        xhrAddress.setRequestHeader('accessToken', sessionStorage.getItem("access-token"))
        xhrAddress.send(adressData);
    }

    
    
    if(sessionStorage.getItem("access-token")){
        let paymentData = null;
        let xhrPayment = new XMLHttpRequest();
        let payThat = this;
        
        xhrPayment.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                payThat.setState({
                    paymentOptions : JSON.parse(this.responseText)           
                });      
            }    
            
        });
        
        xhrPayment.open("GET", "http://localhost:8080/api/payment");
        xhrPayment.setRequestHeader("Cache-Control", "no-cache");
        xhrPayment.setRequestHeader('accessToken', sessionStorage.getItem("access-token"))
        xhrPayment.send(paymentData);
    }
    





    //let req = "http://localhost:8080/api/address?flatBuilNo=%23342&locality=makwoood%20aprtments&city=bangalore&zipcode=560102&type=perm&stateId=21";


}


  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleTabChange = (e,addressTab) => {
    this.setState({ addressTab});
  };

  /* Function For material Radio button selection change handler*/
  handleChange = event => {
    this.setState({ paymentMode: event.target.value });
  };

  /* click handler for address-selector icon 
     all cards are selected by document.getElementsByClassName
     then indexes are match and styling is set/reset
  */

  iconClickHandler = (index)=>(e) =>{

        const selectedIcon = document.getElementsByClassName('selectIcon');
        const selectedAddress = document.getElementsByClassName('selectAddress');

        for(var i = 0;i < selectedAddress.length; i++){
   
            if(i===index){
                selectedAddress[i].style.border = '2px solid red';
                selectedIcon[i].style.color = 'green';   
            }
            else{
                selectedAddress[i].style.border = '';
                selectedIcon[i].style.color = 'grey';  
            }

        }
        this.setState.addressProvidedByUser =[];
        this.setState.addressProvidedByUser = this.state.allAddress[index];
        console.log(this.state.addressProvidedByUser);
        this.setState.addressSelected = true;
        this.setState.addressSelectedIndex= index;
}

  flatBuildChangeHandler = (e) =>{
      this.setState({flatbuilnumber: e.target.value});
      
  }

  localityChangeHandler = (e) =>{
    this.setState({locality: e.target.value});
    
}

    cityChangeHandler = (e) =>{
        this.setState({city: e.target.value});
}
    stateChangeHandler = (e) =>{
        this.setState({state_id: e.target.value});
}
    zipcodeChangeHandler = (e) =>{
        this.setState({zipcode: e.target.value});
    }


  handleNext = () => {
    
    if (this.state.addressTab === 1) {
       
        /*    form-control checks in NEW ADDRESS
        Below code to check user entry available or not, 
         and displays helper text accordingly
           @param toggleflatHelper is a state which will be set to a "className"
               "className" is defined in CSS
        */
        this.state.flatbuilnumber === "" ? 
                   this.setState({ invalidAddress:true,toggleFlatHelper:"displayRequired",flatbuilnumber:""}) 
                        : this.setState({  invalidAddress:false,toggleFlatHelper:"displayNothing"});
        
        this.state.locality === "" ? 
                        this.setState({ invalidAddress:true,toggleLocalityHelper:"displayRequired",locality:""}) 
                             : this.setState({  invalidAddress:false,toggleLocalityHelper:"displayNothing"});

        this.state.city === "" ? 
                             this.setState({ invalidAddress:true,toggleCityHelper:"displayRequired",city:""}) 
                                  : this.setState({  invalidAddress:false,toggleCityHelper:"displayNothing"});

        this.state.state_id === "" ? 
                                  this.setState({ invalidAddress:true,toggleStateIdHelper:"displayRequired",state_id:""}) 
                                       : this.setState({  invalidAddress:false,toggleStateIdHelper:"displayNothing"});

        this.state.zipcode === "" ? 
                        this.setState({ invalidAddress:true,toggleZipcodeHelper:"displayRequired",toggleZipcodeValidator:"displayNothing",zipcode:""}) 
                             : 
                             isNaN(this.state.zipcode)? 
                             this.setState({ invalidAddress:true,toggleZipcodeValidator:"displayRequired",toggleZipcodeHelper:"displayNothing",zipcode:""})
                             :
                             this.state.zipcode.length !== 6?
                             this.setState({ invalidAddress:true,toggleZipcodeValidator:"displayRequired",toggleZipcodeHelper:"displayNothing",zipcode:""})
                             :
                             this.setState({  invalidAddress:false,toggleZipcodeHelper:"displayNothing",toggleZipcodeValidator:"displayNothing"});                      

    
        if(this.state.invalidAddress === false){

            /* Save new address */

            //this.props.message = "hello";

            

            this.setState(state => ({
                activeStep: state.activeStep + 1,
             }));
        }

    }

    /* if address is selected then move to next Step*/
    else { 
 
        if(this.state.addressSelected === true)
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    }
    
  };


  handlePlaceOrder = () =>{
    //this.setState({dummycheck: this.cartAdded});
    // const orderDataid = this.props.cartItems.id;
    // const orderQunatity = this.props.cartItems.quantity;

    let orderData =[
        {
            "itemId": 1,
            "quantity": 1
        }
    ]

    if(sessionStorage.getItem("access-token")){

        let xhrOrder = new XMLHttpRequest();
        let placeOrder = this;
        
        xhrOrder.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                placeOrder.setState({
                    
                    serverResponse : JSON.parse(this.responseText)           
                }); 
                if(isNaN(placeOrder.state.serverResponse)){
                    placeOrder.setState({ snackBarMsg: "Unable to place your order! Please try again!" });
                }
                else{
                    let orderNo = placeOrder.state.serverResponse;
                    placeOrder.setState({ snackBarMsg: "Order placed successfully! Your order ID is "+orderNo });
                    
                }     
             }    
            
        });
        
        xhrOrder.open("POST", "http://localhost:8080/api/order?flatBuilNo=12&locality=12&city=12&zipcode=122122&stateId=12&paymentId=1&bill=232");
        xhrOrder.setRequestHeader("Cache-Control", "no-cache");
        xhrOrder.setRequestHeader("Content-Type","application/json");
        xhrOrder.setRequestHeader("Accept", "application/json");
        xhrOrder.setRequestHeader('accessToken', sessionStorage.getItem("access-token"));
        xhrOrder.send(JSON.stringify(orderData));

    }



    this.openSnackBar();
    console.log(this.state.subTotal);
    console.log(this.state.serverResponse);
}

    openSnackBar () {

    this.setState({ isSnackBarOpen: true });
  }

    closeSnackBar () {
    this.setState({ isSnackBarOpen: false });
  }

  
    

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    const userAddressSource = this.state.allAddress;
    const stateCodes = this.state.stateList;
    //const cartAdded = this.props.cart;  

    return (
      <div className={classes.root} style={{display:'flex'}}>
      <div className = "stepperBlock">
        <Stepper activeStep={activeStep} orientation="vertical" style={{width:'90%'}}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                    {index === 0 && <div>
                                <Tabs className="addressTabs"
                                      value={this.state.addressTab} onChange={this.handleTabChange}>
                                    <Tab label="EXISTING ADDRESS" />
                                    
                                    <Tab label="NEW ADDRESS" />
                                    
                                </Tabs>
                                {((this.state.addressTab === 0)&& (userAddressSource.length === 0)) && 
                                   <div style={{ padding:'10px' }}>
                                        <Typography >{this.state.noAddressMessage}</Typography> 
                                   </div>     
                                }
                                
                                {((this.state.addressTab === 0)&& (userAddressSource.length > 0)) && 
                                    <GridList cellHeight={"auto"} className={classes.gridListMain} cols={3}>
                                        {userAddressSource.map((userAdd,index) =>
                                            <GridListTile className="check" key={'mykey' + index}>
                                            <div className="selectAddress"style={{ padding:'10px',marginTop:'5px' }}>
                                                <Typography >{userAdd.flatBuilNo}</Typography>
                                                <Typography >{userAdd.locality}</Typography>
                                                <Typography >{userAdd.city}</Typography>
                                                <Typography >{userAdd.states.stateName}</Typography>
                                                <Typography >{userAdd.zipcode}</Typography>
                                                <IconButton className="selectIcon"style={{marginLeft:'20%'}} onClick={this.iconClickHandler(index)}>
                                                    <CheckCircle/>
                                                </IconButton>
                                    </div>
                                    </GridListTile>
                                    )}
                                    </GridList>
                                }
                                {(this.state.addressTab === 1) && 
                                    <div >
                                        <FormControl required>
                                            <InputLabel htmlFor="flatBuilNo">Flat/Building No.</InputLabel>
                                            <Input id="flatBuilNo" type="text" value={this.state.flatbuilnumber} onChange={this.flatBuildChangeHandler} />
                                            <FormHelperText className={this.state.toggleFlatHelper}>
                                                <span className="fieldRequired">required</span>
                                            </FormHelperText>
                                        </FormControl>
                                            <br></br>
                                        <FormControl required>
                                            <InputLabel htmlFor="locality">Locality</InputLabel>
                                            <Input id="locality" type="text" value={this.state.locality} onChange={this.localityChangeHandler} />
                                            <FormHelperText className={this.state.toggleLocalityHelper}>
                                                <span className="fieldRequired">required</span>
                                            </FormHelperText>
                                        </FormControl>
                                            <br></br>
                                            <FormControl required>
                                            <InputLabel htmlFor="city">City</InputLabel>
                                            <Input id="city" type="text" value={this.state.city} onChange={this.cityChangeHandler} />
                                            <FormHelperText className={this.state.toggleCityHelper}>
                                                <span className="fieldRequired">required</span>
                                            </FormHelperText>
                                        </FormControl>
                                            <br></br>

                                        <FormControl required>
                                            <InputLabel htmlFor="state">State</InputLabel>
                                            <Select
                                                value={this.state.state_id}
                                                onChange={this.stateChangeHandler}
                                            >
                                                {stateCodes.map(states => (
                                                    <MenuItem key={"states" + states.id} value={states.id}>
                                                        {states.stateName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                                <FormHelperText className={this.state.toggleStateIdHelper}>
                                                    <span className="fieldRequired">required</span>
                                                </FormHelperText>
                                            </FormControl>

                                            <br></br>
                                        <FormControl required>
                                            <InputLabel htmlFor="zipcode">Zipcode</InputLabel>
                                            <Input id="zipcode" type="text" value={this.state.zipcode} onChange={this.zipcodeChangeHandler} />
                                            <FormHelperText className={this.state.toggleZipcodeHelper}>
                                                <span className="fieldRequired">Required</span>
                                            </FormHelperText>
                                            <FormHelperText className={this.state.toggleZipcodeValidator}>
                                                <span className="fieldRequired">Zipcode must contain only numbers and must be 6 digits long</span>
                                            </FormHelperText>
                                        </FormControl>

                                    </div>  
                                
                                }
                                </div>
                                
                                }
                    {index === 1 && <div>
                                {/* referenced from radio-btn demo -> https://material-ui.com/demos/selection-controls/ */}
                                
                                    <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Select Mode of Payment</FormLabel>
                                    <RadioGroup
                                        aria-label="payment"
                                        name="payment1"
                                        className={classes.group}
                                        value={this.state.paymentMode}
                                        onChange={this.handleChange}
                                    >
                                    {this.state.paymentOptions.map((payBy,index) => {
                                        return (
                                        <FormControlLabel key={'mykey' + index} value={payBy.paymentName} control={<Radio />} label={payBy.paymentName} />
                                        )
                                    })}
                                    </RadioGroup>
                                    </FormControl>
                                    </div>
                    }


                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>View the summary and place your order now!</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Change
            </Button>
          </Paper>
        )}
        </div>
        <div className="cartSummary" style={{width: '360px'}}>
                            <Card style={{width: '350px', marginTop: '50px'}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Summary
                                    </Typography>
                                    {this.props.cartItems.map(item => (
                                        <div  key={"item" + item.id}>
                                            <span >{item.type === 'Veg' &&
                                                <i className="fa fa-stop-circle-o veg" ></i>}
                                                {item.type === 'Non-Veg' &&
                                                    <i className="fa fa-stop-circle-o nonVeg" ></i>}   {item.itemName}
                                            </span>
                                            <span > {item.quantity}</span>
                                            <span style={{float:'right'}}><i className="fa fa-inr" aria-hidden="true"></i> {item.price}</span>
                                        </div>
                                    ))}
                                        <div>
                                            <span >Sub Total  </span>
                                            <span style={{float:'right'}}><i className="fa fa-inr" aria-hidden="true"></i> {this.state.subTotal}</span>    
                                        </div>
                                    <Divider/>
                                    <div >
                                        <span style={{fontWeight:'bold'}} >Net Amount  </span>
                                        <span style={{float:'right'}}><i className="fa fa-inr" aria-hidden="true"></i> {this.state.subTotal}</span>
                                    </div>
                                    <br />
                                    <Button variant="contained" color="primary" onClick={this.handlePlaceOrder}>
                                        Place Order
                                    </Button>
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
                                </CardContent>
                            </Card>
            </div>
      </div>
      
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);