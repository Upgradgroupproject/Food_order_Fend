import React from "react";
//import "./RestaurantCard.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

/**
 * Functional component for displaying an Address card
 * @param props properties passed by parent component to child component
 */


const AddressCard = function(props) {
  const address = props.address;
  //const index = props.index;
  //const classes = props.classes;
  const { classes } = props;
  

  return (
    <Card key={address.id}>
      <CardContent >
            
           <p>check</p> 
        
            
      </CardContent>
    </Card>
  );
};

AddressCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default AddressCard;
