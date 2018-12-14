import React from "react";
import "./RestaurantCard.css";
// import * as Constants from "../../common/Constants";
// import * as Utils from "../../common/Utils";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// import Favorite from "@material-ui/icons/Favorite";
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import Input from "@material-ui/core/Input";
// import Button from "@material-ui/core/Button";

/**
 * Functional component for displaying an image card
 * @param props properties passed by parent component to child component
 */
const RestaurantCard = function(props) {
  const image = props.image;
  const index = props.index;
  const classes = props.classes;

  return (
    <Card className={classes.RestaurantCard} key={image.id}>
      <CardHeader
        //   < img
        //     src={image.photoUrl}
        //     className="user-profile-image"
        //     alt=""
        //   />
        
        //subheader={Utils.formatDate(image.created_time)}
      />

      <CardContent>
        <div>
          <img
            src={image.photoUrl}
            className="user-profile-image"
            alt=""
          />
          <hr className="custom-horizontal-rule" />
          {image.restaurantName}
          <br />
{/*           
          <hr className="custom-horizontal-rule" />
          {image.caption === null ? "" : image.caption.text.split("#")[0]}
          <br />
          <div className="hashtags-container">
            {image.tags.map((tag, i) => "#" + tag + " ")}
          </div>
          {Utils.isUndefinedOrNull(image.like) || image.like === false ? (
            <FavoriteBorder
              onClick={() =>
                props.likeButtonClickHandler(
                  index,
                  Constants.HeartButtonAction.LIKE
                )
              }
              className="black"
              fontSize="large"
            />
          ) : (
            <Favorite
              onClick={() =>
                props.likeButtonClickHandler(
                  index,
                  Constants.HeartButtonAction.UNLIKE
                )
              }
              className="red"
              fontSize="large"
            />
          )}
          <div className="likes-container">
            {image.likes.count === undefined ? 0 : image.likes.count} likes
          </div>
          <div className="comments-container">
            {image.commentList !== undefined &&
              image.commentList.map(comment => (
                <div key={comment.id} className="comment">
                  <span className="username-who-commented">
                    {comment.username}:
                  </span>
                  &nbsp;&nbsp;{comment.comment}
                </div>
              ))}
          </div>

          <div className="add-comment-container">
            <FormControl className="add-comment-formcontrol">
              <InputLabel htmlFor="Add a comment"> Add a comment</InputLabel>
              <Input
                id="addCommentInput"
                onChange={props.commentChangeHandler}
                onBlur={event => (event.target.value = "")}
              />
            </FormControl>
            &nbsp;&nbsp;
            <Button
              className={classes.addCommentButton}
              onClick={() => props.addCommentClickHandler(index)}
              variant="contained"
              color="primary"
            >
              ADD
            </Button>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
