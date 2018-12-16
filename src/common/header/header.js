import React, { Component } from "react";
import "./Header.css";
import * as Constants from "../../common/Constants";
import * as Utils from "../../common/Utils";
import * as UtilsUI from "../../common/UtilsUI";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import Modal from "react-modal";
import Input from "@material-ui/core/Input";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import LogoImage from "../../assets/FastFood.svg";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';

// custom styles for upload modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

// inline styles for Material-UI components
const styles = {
  searchInput: {
    width: "80%"
  },
  uploadIcon: {
    paddingLeft: 10
  },
  profileIconButton: {
    padding: 0
  }
};

/**
 * Class component for the header
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
  constructor() {
    super();

    this.state={
      modalIsOpen:false
    };
    this.openUploadImageModal = this.openUploadImageModal.bind(this);
    this.closeUploadImageModal = this.closeUploadImageModal.bind(this);
    this.selectImageForUpload = this.selectImageForUpload.bind(this);
    this.changeDescriptionHandlerInUploadImageModal = this.changeDescriptionHandlerInUploadImageModal.bind(
      this
    );
    this.changeHashtagsHandlerInUploadImageModal = this.changeHashtagsHandlerInUploadImageModal.bind(
      this
    );
    this.uploadClickHandlerInUploadModal = this.uploadClickHandlerInUploadModal.bind(
      this
    );
    this.profileIconClickHandler = this.profileIconClickHandler.bind(this);
    this.logoutClickHandler = this.logoutClickHandler.bind(this);
  }

  state = {
    currentUserDetails: {
      // object containing details of the currently logged-in user
      profileImage: "", // profile picture URL of the currently logged-in user
      username: "" // username of the currently logged-in user
    },
    showUserProfileDropDown: false, // boolean value indicating if the user profile dropdown is open; TRUE for open and FALSE for closed
    isUploadModalOpen: false, // boolean value indicating if the upload image modal is open; TRUE for open and FALSE for closed
    uploadImageFormValues: {
      // object containing values filled by the user in the upload image modal
      imageFile: {}, // image file containing the new image selected by the user from the system
      imagePreviewUrl: "", // preview URL the new image file selected by the user from the system
      description: "", // description for the new image to be uploaded
      hashtags: "" // hashtags for the new image to be uploaded
    },
    uploadImageFormValidationClassnames: {
      // object containing validation classnames for the form fields inside the upload image modal
      image: Constants.DisplayClassname.DISPLAY_NONE,
      description: Constants.DisplayClassname.DISPLAY_NONE,
      hashtags: Constants.DisplayClassname.DISPLAY_NONE
    }
  };

  /**
   * Function called before the render method
   * @memberof Header
   */
  componentDidMount() {
    this.getUserInformation();
  }

  /**
   * Function to get all the information about the currently logged-in user
   * @memberof Header
   */
  getUserInformation = () => {
    if (
      !Utils.isUndefinedOrNullOrEmpty(sessionStorage.getItem("access-token"))
    ) {
      const requestUrl =
        "https://api.instagram.com/v1/users/self/?access_token=" +
        sessionStorage.getItem("access-token");
      const that = this;
      Utils.makeApiCall(
        requestUrl,
        null,
        null,
        Constants.ApiRequestTypeEnum.GET,
        null,
        responseText => {
          const userDetails = { ...this.state.currentUserDetails };
          userDetails.profileImage = JSON.parse(
            responseText
          ).data.profile_picture;
          userDetails.username = JSON.parse(responseText).data.username;
          that.setState({
            currentUserDetails: userDetails
          });
          sessionStorage.setItem(
            "user-details",
            JSON.parse(responseText).data.username
          );
        },
        () => {}
      );
    }
  };

  /**
   * Event handler called when the upload button inside the header is clicked to open the upload image modal
   * @memberof Header
   */
  openUploadImageModal = () => {
    this.setState({
      isUploadModalOpen: true
    });
  };

  /**
   * Event handler called to close upload image modal
   * @memberof Header
   */
  closeUploadImageModal = () => {
    let newUploadImageModalFormValues = { ...this.state.uploadImageFormValues };
    Utils.assignEmptyStringToAllKeysInObj(newUploadImageModalFormValues);
    const currentUploadImageFormValidationClassnames = {
      ...this.uploadImageFormValidationClassnames
    };

    currentUploadImageFormValidationClassnames.image =
      Constants.DisplayClassname.DISPLAY_NONE;
    currentUploadImageFormValidationClassnames.description =
      Constants.DisplayClassname.DISPLAY_NONE;
    currentUploadImageFormValidationClassnames.hashtags =
      Constants.DisplayClassname.DISPLAY_NONE;

    this.setState({
      isUploadModalOpen: false,
      uploadImageFormValues: newUploadImageModalFormValues,
      uploadImageFormValidationClassnames: currentUploadImageFormValidationClassnames
    });
  };

  /**
   * Event handler called when an image is selected by a user to be uploaded
   * @param event default parameter on which the event handler is called
   * @memberof Header
   */
  selectImageForUpload = event => {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      const currentUploadImageFormValues = {
        ...this.state.uploadImageFormValues
      };
      currentUploadImageFormValues.imageFile = file;
      currentUploadImageFormValues.imagePreviewUrl = reader.result;
      this.setState({
        uploadImageFormValues: currentUploadImageFormValues
      });
    };

    reader.readAsDataURL(file);
  };

  /**
   * Event handler called when the description input field is changed inside the upload image modal
   * @param event default parameter on which the event handler is called
   * @memberof Header
   */
  changeDescriptionHandlerInUploadImageModal = event => {
    let currentUploadImageFormValues = { ...this.state.uploadImageFormValues };
    currentUploadImageFormValues.description = event.target.value;
    this.setState({
      uploadImageFormValues: currentUploadImageFormValues
    });
  };

  /**
   * Event handler called when the hashtags input field is changed inside the upload image modal
   * @param event default parameter on which the event handler is called
   * @memberof Header
   */
  changeHashtagsHandlerInUploadImageModal = event => {
    let currentUploadImageFormValues = { ...this.state.uploadImageFormValues };
    currentUploadImageFormValues.hashtags = event.target.value;
    this.setState({
      uploadImageFormValues: currentUploadImageFormValues
    });
  };

  /**
   * Event handler called when the 'Upload' button inside the upload image modal is clicked
   * @memberof Header
   */
  uploadClickHandlerInUploadModal = () => {
    // finding the class names for the desciption and hashtags validation messages - to be displayed or not
    const image_validation_classname = UtilsUI.findValidationMessageClassname(
      this.state.uploadImageFormValues.imagePreviewUrl,
      Constants.ValueTypeEnum.FORM_FIELD
    );
    const description_validation_classname = UtilsUI.findValidationMessageClassname(
      this.state.uploadImageFormValues.description,
      Constants.ValueTypeEnum.FORM_FIELD
    );
    const hashtags_validation_classname = UtilsUI.findValidationMessageClassname(
      this.state.uploadImageFormValues.hashtags,
      Constants.ValueTypeEnum.FORM_FIELD
    );

    // setting the class names for the desciption and hashtags validation messages - to be displayed or not
    let currentUploadImageFormValidationClassnames = {
      ...this.state.uploadImageFormValidationClassnames
    };
    currentUploadImageFormValidationClassnames.image = image_validation_classname;
    currentUploadImageFormValidationClassnames.description = description_validation_classname;
    currentUploadImageFormValidationClassnames.hashtags = hashtags_validation_classname;

    if (
      Utils.isAnyValueOfObjectUndefinedOrNullOrEmpty(
        this.state.uploadImageFormValues
      )
    ) {
      this.setState({
        uploadImageFormValidationClassnames: currentUploadImageFormValidationClassnames
      });
    } else {
      const imageDetails = {
        id: Math.floor(new Date().getTime() / 1000),
        caption: { text: this.state.uploadImageFormValues.description },
        tags: this.state.uploadImageFormValues.hashtags.split(","),
        images: {
          standard_resolution: {
            url: this.state.uploadImageFormValues.imagePreviewUrl
          }
        },
        user: {
          profile_picture: this.state.currentUserDetails.profileImage,
          username: this.state.currentUserDetails.username
        },
        likes: { count: 0 },
        created_time: Math.floor(new Date().getTime() / 1000)
      };

      this.props.uploadNewImage(imageDetails);
      this.closeUploadImageModal();
    }
  };

  /**
   * Event handler called when the profile icon inside the header is clicked to toggle the user profile dropdown
   * @memberof Header
   */
  profileIconClickHandler = () => {
    this.setState({
      showUserProfileDropDown: !this.state.showUserProfileDropDown
    });
  };
  
  openModalHandler =() =>{
    this.setState({modalIsOpen:true})
  }

  closeModalHandler=() =>{
    this.setState({modalIsOpen:false})
  }
  /**
   * Event handler called when the logout menu item is clicked inside the user profile dropdown to log a user out of the application
   * @memberof Header
   */
  logoutClickHandler = () => {
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("user-details");
    this.props.history.push({
      pathname: "/"
    });
  };


  /**
   * Function called when the component is rendered
   * @memberof Header
   */
  render() {
    const { classes } = this.props;

    // logo to be rendered inside the header
    let logoToRender = null;
    if (this.props.showLink) {
      logoToRender = (
        <Link to="/home" className="logo">
          <img src={LogoImage} className="logo"/>
        </Link>
      );
    } else {
      logoToRender = <img src={LogoImage} className="logo"/>;
    }

    // search box to be rendered inside the header
    let searchBoxToRender = null;
    // if (this.props.showSearch || !this.props.showSearch) {
    if (this.props.showSearch) {
      searchBoxToRender = (
        <div className="header-search-container">
          <div className="search-icon">
            <SearchIcon />
          </div>
          <Input
            
            className={classes.searchInput}
            placeholder="Search by Restaurant Name"
            disableUnderline
          />
        </div>
      );
    
    }
    else{
      searchBoxToRender = (
                    <div class="fill-remaining-space"></div>
                    
                    
      );
    }

    // upload button to be rendered inside the header
    let uploadButtonToRender = null;
    // if (this.props.showUpload || !this.props.showUpload) {
    if (this.props.showUpload) {
      uploadButtonToRender = (
        <div className="header-upload-btn-container">
         <Toolbar variant="dense">
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Categories
          </Typography>
        </Toolbar>
        </div>
        );
    }

    // user profile icon to be rendered inside the header
    let profileIconButtonToRender = null;
    if (this.props.showProfile || !this.props.showProfile) {
      profileIconButtonToRender = (
        <div paddingTop="20px">
        <div className="header-profile-btn-container">
          <IconButton
            key="close"
            aria-label="Close"
            className={classes.profileIconButton}
          >
            <Button variant="contained" size="small" className={classes.button} onClick={this.openModalHandler}>
            <AccountCircle />
                Login
             </Button>
          </IconButton>
          
        </div>
        <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Login"onRequestClose={this.closeModalHandler}>
        </Modal>
        </div>
      );
    }

    return (
      <MuiThemeProvider>
        <div className="header-main-container">
          <div className="header-logo-container">{logoToRender}</div>
          {searchBoxToRender}
          {uploadButtonToRender}
          {profileIconButtonToRender}
        </div>
      </MuiThemeProvider>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
