import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {GridListTile} from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import IconButton from '@material-ui/core/IconButton';
import CheckCircle from '@material-ui/icons/CheckCircle';
// import AddressCard from './AddressCard';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';



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
        backgroundColor: theme.palette.background.paper
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

function getStepContent(step) {
  switch (step) {
    case 0:
      return `List of addresses`;
    case 1:
      return 'List of payment options';
    default:
      return 'Unknown step';
  }
}


class VerticalLinearStepper extends React.Component {
  
    constructor() {
        super();
            this.state = {
                id: "",
                flat_buil_number: "",
                locality: "",
                city: "",
                zipcode: "",
                state_id: "",
                addressList:[
                                {"id":13,"flat_buil_number":"1","locality":"11","city":"11","zipcode":"560102","state_id":12},
                                {"id":14,"flat_buil_number":"2","locality":"12","city":"11","zipcode":"560102","state_id":12},
                            ],
                paymentOptions: [
                                {"id": 1,"paymentName": "Cash on Delivery"},
                                {"id": 2,"paymentName": "Wallet"},
                                {"id": 3,"paymentName": "Net Banking"},
                                {"id": 4,"paymentName": "COD"},
                                {"id": 5,"paymentName": "Debit/Credit Card"}
                                ],
                activeStep: 0,
                value: 0,
                paymentMode:0,
                addressTab: 0,
                noAddressMessage:"There are no saved addresses! You can save an address using your ‘Profile’ menu option.",

            }
        
  };

  componentWillMount() {

        
    let adressData = null;
    let xhrRestaurant = new XMLHttpRequest();
    let that = this;
    
    xhrRestaurant.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            that.setState({
                addressList : JSON.parse(this.responseText)           
            });      
         }
        //printing array but json transfe to prop is giving error
        //that.setState(this.state.id, JSON.parse(this.responseText));    
        //console.log(JSON.parse(this.responseText));
    });

    xhrRestaurant.open("GET", "http://localhost:8080/api/address/user?accessToken=205802dd-84f0-42ff-abb8-947d120669a0");
    xhrRestaurant.send(adressData);
    
    console.log(this.state.addressList);
    
}

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

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

  handleTabChange = (event, addressTab) => {
    this.setState({ addressTab });
  };

  /* Function For material Radio button selection change handler*/
  handleChange = event => {
    this.setState({ paymentMode: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    const userAddressSource = this.state.addressList;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>check{label}</StepLabel>
                <StepContent>
                    {index === 0 && <div>
                                <Tabs className="addressTabs"
                                      value={this.state.addressTab} onChange={this.handleTabChange}>
                                    <Tab label="EXISTING ADDRESS" />
                                    
                                    <Tab label="NEW ADDRESS" />
                                    
                                </Tabs>
                                {this.state.addressTab === 0 && 
                                    <GridList cellHeight={"auto"} className={classes.gridListMain}>
                                        {userAddressSource.map((userAdd,index) =>
                                            <GridListTile key={'mykey' + index}>
                                            <div style={{ padding:'10px' }}>
                                                <Typography >{userAdd.flat_buil_number}</Typography>
                                                <Typography >{userAdd.locality}</Typography>
                                                <Typography >{userAdd.city}</Typography>
                                                <Typography >{userAdd.state_id}</Typography>
                                                <Typography >{userAdd.zipcode}</Typography>
                                                <IconButton style={{marginLeft:'60%'}}>
                                                    <CheckCircle/>
                                                </IconButton>
                                    </div>
                                    </GridListTile>
                                    )}
                                    </GridList>
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

                  {/* <Typography>{getStepContent(index)}</Typography> */}
                    {/* <GridList className={classes.root}cellHeight={"auto"} cols={4} spacing={15}>
                        {userAddressSource.map((address, index) =>
                        <GridListTile key={'mykey' + index}> */}
                        {/* <AddressCard
                            key={index}
                            address={address}
                            index={index}
                            classes={classes}
                                    // likeButtonClickHandler={this.likeButtonClickHandler}
                                    // commentChangeHandler={this.commentChangeHandler}
                                    // addCommentClickHandler={this.addCommentClickHandler}
                                /> */}


                                
                        {/* </GridListTile>
                    )}
                    </GridList> */}


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
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);