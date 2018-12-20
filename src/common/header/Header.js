import React, { Component } from "react";
import "./Header.css";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
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

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
// import {createMuiTheme } from 'material-ui/styles';

// const theme = createMuiTheme({
// overrides: {
// MuiInput: {
// underline: {
// '&:before': { //underline color when textfield is inactive
// backgroundColor: 'black',
// },
// '&:hover:not($disabled):before': { //underline color when hovered
// backgroundColor: 'white',
// },
// }
// }
// }
// });

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

const TabContainer = function (props) {
  return (
    <Typography Component="div" style={{ padding: 0, textAlign: 'center' }}>
      {props.children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}


// inline styles for Material-UI components
const styles = {
  searchInput: {
    width: "80%",
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

    this.state = {

      modalIsOpen: false,
      value: 0,
      username: "",
      usernameRequired: "dispNone",
      contactNumber: "",
      password: "",
      contactNumberRequired: "dispNone",
      passwordRequired: "dispNone",
      firstName: "",
      lastName: "",
      email: "",
      isLoggedIn: "",
      showParagraph: false,
      showUserExistMsg: false,
      usersFirstName:"",
      credentialsEntered: false,

    };
    this.profileIconClickHandler = this.profileIconClickHandler.bind(this);
    this.logoutClickHandler = this.logoutClickHandler.bind(this);
  }

  /**
  * Event handler called when the profile icon inside the header is
  clicked to toggle the user profile dropdown
  * @memberof Header
  */
  profileIconClickHandler = () => {
    this.setState({
      showUserProfileDropDown: !this.state.showUserProfileDropDown
    });
  };

  openModalHandler = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModalHandler = () => {
    this.setState({ modalIsOpen: false })
  }

  tabChangeHandler = (event, value) => {
    this.setState({ value })
  }
  loginClickHandler = () => {

    this.areCredentialsEntered();


    if (!this.state.password || !this.state.contactNumber) {
      //alert("Please enter the username and password")

    } else {
      var varAPI = "http://localhost:8080/api/user/login/?contactNumber="+this.state.contactNumber +"&password="+this.state.password;
      // var postBody = {
      //   contactNumber: this.state.contactNumber,
      //   password: this.state.password
      // }
      fetch(varAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify(postBody)
      })
        .then(function (response) {
          console.log(response);
          //localStorage.setItem('Acces',response.data.token);
          if (response.headers.get("access-token")) {
            sessionStorage.setItem("access-token", response.headers.get("access-token"));
            console.log(response.status);
            console.log(sessionStorage.getItem("access-token"));
          }
          else if (response.status === 200) {
            console.log("Hi");
            this.setState({ showUserExistMsg: true });
          }
        }).catch(function (err) {
          // Error :(ss
          console.log(err);
        });
    }
  }
  signUpClickHandler = () => {
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var email = this.state.email;
    // var username = this.state.username;
    var password = this.state.password;
    var contactNumber = this.state.contactNumber;

    var signUpAPI = "http://localhost:8080/api/user/signup?firstName='" +
      firstName + "'&lastName='" + lastName + "'&email='" + email +
      "'&contactNumber='" + contactNumber + "'&password='" + password + "'";
    fetch(signUpAPI, {
      method: 'POST',
    })
      .then(function (response) {
        console.log(response);
        console.log(response.body);
        console.log(response.message);
        console.log(response.errors);
        alert(response.message)
        // dispatch(update_errors(response));
        if (response.status >= 400) {
          alert("Bad response from server");
        }
      }).then(function (json) {
        console.log("succeed json response");
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

      });

  }
//   inputUsernameChangeHandler (e){
//     this.setState({ [e.target.name]: e.target.value });
//     if (e.target.name === "password") {
//      var value = e.target.value;
//       var pass = new RegExp("((?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&*!^]).{8,20})");
//       var valid = pass.test(this.state.password);
//       if(this.state.password === ""){
//         this.setState({passwordRequired : "dispInfo"});
//       }
//       else{

//         if (valid !== true) {
//           this.setState({ showParagraph: true });
//           this.setState({passwordRequired : "dispNone"});
//         }
//         else {
//             this.setState({ showParagraph: false });
//             this.setState({passwordRequired : "dispNone"});
//           }
          
//         }
      
//       }
    
//     else if (e.target.name === "contactNumber") {
//        var contactNoCheck = this.state.contactNumber;
//        pass = new RegExp("\\d{10}");
//        valid = pass.test(contactNoCheck);
//        if(this.state.password === ""){
//         this.setState({contactNumberRequired : "dispInfo"});
//       }
//       else{
//         if (valid !== true) {
//           this.setState({ showContactParagraph: true });
//           this.setState({contactNumberRequired : "dispNone"});
//         }
//           else{
//           this.setState({ showContactParagraph: false });
//           this.setState({contactNumberRequired : "dispNone"});
//         }
//       }
    
//   }
// }

  /**
  * Event handler called when the logout menu item is clicked inside the
  user profile dropdown to log a user out of the application
  * @memberof Header
  */
  logoutClickHandler = () => {
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("user-details");
    this.props.history.push({
      pathname: "/"
    });
  };

  loginContactNumberChangeHandler = (e) =>{
    
    this.setState({contactNumber : e.target.value});

    
  };

  loginPasswordChangeHandler = (e) =>{

    this.setState({password : e.target.value});
    
    
  };

  areCredentialsEntered(){
    this.state.password === "" ? 
      this.setState({ passwordRequired: "dispBlock" }) :
          this.setState({ passwordRequired: "dispNone" });
          
      this.state.contactNumber === "" ? 
        this.setState({ contactNumberRequired: "dispBlock" }) :
         this.setState({ contactNumberRequired: "dispNone" });
  }








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
          <img src={LogoImage} className="logo" alt="Food-Orders" />
        </Link>
      );
    } else {
      logoToRender = <img src={LogoImage} className="logo" alt="Food-Orders"/>;
    }

    // search box to be rendered inside the header
    let searchBoxToRender = null;

    // if (this.props.showSearch || !this.props.showSearch) {
    if (this.props.showSearch) {

      searchBoxToRender = (
        // <MuiThemeProvider theme={theme}>
        <div className="header-search-container">
          <div className="search-icon">
            <SearchIcon />
          </div>
          <Input style={{ color: 'white' }}

            className={classes.searchInput}
            placeholder="Search by Restaurant Name"
            // disableUnderline
            onChange={this.props.onChange}
          />
        </div>
        // </MuiThemeProvider>
      );

    }

    else {
      searchBoxToRender = (
        <div className="fill-remaining-space"></div>


      );
    }

    let viewCategories = null;
    if (this.props.showSearch || !this.props.showSearch) {
      if (this.props.showSearch) {

        viewCategories = (
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
    }

    // user profile icon to be rendered inside the header
    let profileIconButtonToRender = null;
    if (!sessionStorage.getItem("access-token")) {
      if (this.props.showProfile || !this.props.showProfile) {
        profileIconButtonToRender = (

          <div paddingtop="20px">

            <div className="header-profile-btn-container">
              <IconButton
                key="close"
                aria-label="Close"
                className={classes.profileIconButton}

              >
                <Button variant="contained" size="small" className={classes.button}
                  onClick={this.openModalHandler}>
                  <AccountCircle />
                  Login
                </Button>
              </IconButton>

            </div>

            <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen}
              contentLabel="Login" onRequestClose={this.closeModalHandler}
              style={customStyles}>
              <Tabs className="tabs" value={this.state.value}
                onChange={this.tabChangeHandler}>
                <Tab label="Login" />
                <Tab label="Signup" />
              </Tabs>
              {this.state.value === 0 &&
                <TabContainer>
                  <FormControl required>
                    <InputLabel htmlFor="contactNumber">Contact No.</InputLabel>
                    <Input id="contactNumber" type="text" name="contactNumber"
                      contactNumber={this.state.contactNumber}
                      onChange={this.loginContactNumberChangeHandler} 
                      />
                    <FormHelperText
                      className={
                        this.state.contactNumberRequired
                      }
                    >
                      <span className="red">required</span>
                    </FormHelperText>
                  </FormControl><br />
                  <FormControl required>
                    <InputLabel htmlFor="password" >Password</InputLabel>
                    <Input id="password" type="password" name="password"
                      password={this.state.password}
                      onChange={this.loginPasswordChangeHandler} 
                      />
                  
                    <FormHelperText
                      className={
                        this.state.passwordRequired
                      }
                    >
                      <span className="red">required</span>
                    </FormHelperText>
                    </FormControl>
                  <br />
                  <FormControl>
                    {this.state.showParagraph === true ?
                      <div className='red' style={{ width: "200px" }}>Password must
                      contain Minimum eight characters, at least one uppercase letter, one
lowercase letter, one number and one special character</div> : null}
                  </FormControl>
                  <br /><br />
                  <Button variant="contained" color="primary"
                    onClick={this.loginClickHandler}>Login</Button><br />
                  <FormControl>
                    {this.state.showUserExistMsg === true ?
                      <div className='red' style={{ width: "200px" }}>This contact No. has
not be registered!</div> : null}
                  </FormControl>
                </TabContainer>}
              {this.state.value === 1 &&
                <TabContainer>
                  <FormControl required>
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <Input id="firstName" name="firstName" type="text"
                      onChange={this.inputUsernameChangeHandler.bind(this)} />
                  </FormControl><br /><br />
                  <FormControl >
                    <InputLabel htmlFor="lastName">Last name</InputLabel>
                    <Input id="lastName" name="lastName" type="text"
                      onChange={this.inputUsernameChangeHandler.bind(this)} />
                  </FormControl><br /><br />
                  <FormControl required >
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" name="email" type="text"
                      onChange={this.inputUsernameChangeHandler.bind(this)} />
                  </FormControl><br /><br />
                  <FormControl required>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" type="password" name="password"
                      onChange={this.inputUsernameChangeHandler.bind(this)} />
                    <br />
                    <FormControl>
                      {this.state.showParagraph === true ?
                        <div className='red' style={{ width: "200px" }}>Password must
                        contain Minimum eight characters, at least one uppercase letter, one
lowercase letter, one number and one special character</div> : null}
                    </FormControl>
                  </FormControl><br />
                  <FormControl required>
                    <InputLabel htmlFor="contactNumber">Contact No.</InputLabel>
                    <Input id="contactNumber" type="text" name="contactNumber"
                      onChange={this.inputUsernameChangeHandler.bind(this)} />
                    <br />
                    <FormControl>
                      {this.state.showContactParagraph === true ?
                        <div className='red' style={{ width: "200px" }}>Contact number must
contains 10 digit and must contains numbers only</div> : null}
                    </FormControl>
                  </FormControl><br />
                  <Button variant="contained" color="primary"
                    onClick={this.loginClickHandler}>SIGNUP</Button>
                </TabContainer>}

            </Modal>


          </div>
        );
      }
    }
    else {
      profileIconButtonToRender = (
        <div className="header-profile-btn-container">
          <IconButton
            key="close"
            aria-label="Close"
            onClick={this.profileIconClickHandler}
            className={classes.profileIconButton}
          >
            <AccountCircle />
          </IconButton>

          {this.state.showUserProfileDropDown ? (
            <div className="user-profile-drop-down">
              <div>
                <Link to="/profile" className="my-account-dropdown-menu-item">
                  My Account
                </Link>
                <hr />
              </div>
              <div
                onClick={this.logoutClickHandler}
                className="logout-dropdown-menu-item"
              >
                Logout
              </div>
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <MuiThemeProvider>
        <div className="header-main-container">
          <div className="header-logo-container">{logoToRender}</div>
          {searchBoxToRender}
          {/* {uploadButtonToRender} */}
          {viewCategories}
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