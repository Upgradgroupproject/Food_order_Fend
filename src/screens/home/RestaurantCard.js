import React from "react";
import "./RestaurantCard.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';

/**
 * Functional component for displaying an Restaurant card
 * @param props properties passed by parent component to child component
 */


const RestaurantCard = function(props) {
  const rest = props.rest;
  //const index = props.index;
  //const classes = props.classes;
  const { classes } = props;
  

  return (
    <Card className={classes.restaurantCard} key={rest.id}>
      <CardContent >
            <img
            src={rest.photoUrl}
            className={classes.restaurantImage}
            alt=""
            />
            <Typography gutterBottom variant="h5" component="h2">
            {rest.restaurantName}
            </Typography>
            <p>{rest.categories}</p>
            <div>
                <span className="rest-rating"><i className="fa fa-star"aria-hidden="true"></i>
                            {rest.userRating} ({rest.numberUsersRated})</span>
                <span className="rest-avg-price"> <i className="fa fa-inr" aria-hidden="true"></i> {rest.avgPrice * 2} for two</span>
            </div>
      </CardContent>
    </Card>
  );
};

RestaurantCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default RestaurantCard;
