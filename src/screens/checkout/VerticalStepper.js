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
// import {GridListTile} from '@material-ui/core';
// import GridList from '@material-ui/core/GridList';
// import AddressCard from './AddressCard';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
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
                activeStep: 0,
                value: 0,
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
         // console.log(JSON.parse(this.responseText));
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

  handleTabChange = (event, value) => {
    this.setState({ value });
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
                                <Tabs tabItemContainerStyle={{width: 'auto'}}
                                      style={{background: '#1231dd',color:'white'}}
                                      contentContainerStyle={{background: '#FFF'}}
                                      value={this.state.value} onChange={this.handleTabChange}>
                                    <Tab label="EXISTING ADDRESS" />
                                    <Tab label="NEW ADDRESS" />
                                </Tabs>
                                </div>
                                
                                }
                    {index === 1 && <div>
                                <h4>Select Mode of Payment</h4>
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
              Reset
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