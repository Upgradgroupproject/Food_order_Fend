import React, {Component} from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Fastfood from '@material-ui/icons/Fastfood';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import CategoryToc from '@material-ui/icons/Toc';
import Snackbar from '@material-ui/core/Snackbar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from "@material-ui/core/Menu/Menu";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{padding: 0, textAlign: 'center', width: 'parent'}}>
            {props.children}
        </Typography>
    )
};

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

class Header extends Component {


    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            value: 0,
            anchorEl: null,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            isEmailValid: "dispNone",
            isPassValid: "dispNone",
            isContactValid: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
            registrationSuccess: false,
            formValid: false,
            loggedInUserName: '',
            isLoggedInContactValid: "dispNone",
            successMessage: "",
            errorResponse: "",
            showUserProfileDropDown: false,
            enableMyAccount: false,

            userLoggedIn: (sessionStorage.getItem("access-token") !== null),
            contactNumber: "",
            password: "",
            contactNumberRequired: "dispNone",
            passwordRequired: "dispNone",


            firstNameRequired: "dispNone",
            firstName: "",
            lastNameRequired: "dispNone",
            lastName: "",
            emailRequired: "dispNone",
            email: "",
            isEmailValid: "dispNone",
            signupPasswordRequired: "dispNone",
            signupPassword: "",
            isPasswordValid: "dispNone",
            signupcontactNumber: "",
            signupcontactNumberRequired: "dispNone",
            isContactNumberValid: "dispNone",


        }
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            usernameRequired: "dispNone",
            isLoggedInContactValid: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",



            firstNameRequired: "dispNone",
            firstName: "",
            lastNameRequired: "dispNone",
            lastName: "",
            emailRequired: "dispNone",
            email: "",
            isEmailValid: "dispNone",
            signupPasswordRequired: "dispNone",
            signupPassword: "",
            isPasswordValid: "dispNone",
            signupcontactNumber: "",
            signupcontactNumberRequired: "dispNone",
            isContactNumberValid: "dispNone",

            openSnackBar: false,
            errorResponse: "",
            successMessage: ""
        });
    };

    closeModalHandler = () => {
        this.setState({modalIsOpen: false});
    };

    tabChangeHandler = (event, value) => {
        this.setState({
            value

        });
    };

    loginClickHandler = () => {
        
        this.areCredentialsEntered();

        //validate contact no.?

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
          //console.log(response);
          //localStorage.setItem('Acces',response.data.token);
          if (response.headers.get("access-token")) {
            sessionStorage.setItem("access-token", response.headers.get("access-token"));
            //sessionStorage.setItem("loggedInUserName", response.results.firstName);
            //console.log(response.results.firstName);
            this.closeModalHandler();
            this.setState({ snackBarMsg: "Logged in" });
            this.setState({ openSnackBar: true})
          }
          else if (response.status === 200) {
            console.log("Hi");
            //this.setState({ showUserExistMsg: true });
          }
          
        }).catch(function (err) {
          // Error :(ss
          //console.log(err);
        });
    }
    };

    areCredentialsEntered(){
        this.state.password === "" ? 
          this.setState({ passwordRequired: "dispBlock" }) :
              this.setState({ passwordRequired: "dispNone" });
              
          this.state.contactNumber === "" ? 
            this.setState({ contactNumberRequired: "dispBlock" }) :
             this.setState({ contactNumberRequired: "dispNone" });

             this.setState({ openSnackBar: true})
      }

    loginContactNumberChangeHandler = (e) => {
        this.setState({contactNumber: e.target.value});
        console.log(this.state.contactNumber);
    };

    loginPasswordChangeHandler = (e) => {
        this.setState({password: e.target.value});
    };

    /**
     * validate the sign up page
     * */
    validateSignUp() {

        const emailRegx = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        const passwordRegx = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)(?=.*[#@$%&*!^]+.*)[a-zA-Z0-9#@$&*!]{4,}$/;
        const contactRegx = /^[0-9]{10}$/;

        this.setState({errorResponse: '', formValid: false});
        this.state.firstname === "" ? this.setState({
            firstnameRequired: "dispBlock",
            formValid: this.state.formValid ? false : false
        }) : this.setState({
            firstnameRequired: "dispNone",
            formValid: this.state.formValid ? true : true
        });

        this.state.email === "" ? this.setState({
            emailRequired: "dispBlock",
            isEmailValid: "dispNone",
            formValid: this.state.formValid ? false : false
        }) : this.state.email.match(emailRegx) ? this.setState({
            isEmailValid: "dispNone",
            emailRequired: "dispNone",
            formValid: this.state.formValid ? true : true
        }) : this.setState({
            isEmailValid: "dispBlock",
            emailRequired: "dispNone",
            formValid: this.state.formValid ? false : false
        });

        this.state.registerPassword === "" ? this.setState({
                registerPasswordRequired: "dispBlock",
                isPassValid: "dispNone",
                formValid: this.state.formValid ? false : false
            }) :
            this.state.registerPassword.match(passwordRegx) ? this.setState({
                isPassValid: "dispNone",
                registerPasswordRequired: "dispNone",
                formValid: this.state.formValid ? true : true
            }) : this.setState({
                isPassValid: "dispBlock",
                registerPasswordRequired: "dispNone",
                formValid: this.state.formValid ? false : false
            });

        this.state.contact === "" ? this.setState({
                contactRequired: "dispBlock",
                isContactValid: "dispNone",
                formValid: this.state.formValid ? false : false
            }) :
            this.state.contact.match(contactRegx) ? this.setState({
                isContactValid: "dispNone",
                contactRequired: "dispNone",
                formValid: this.state.formValid ? true : true
            }) : this.setState({
                isContactValid: "dispBlock",
                contactRequired: "dispNone",
                formValid: this.state.formValid ? false : false
            });
        return this.state.formValid;

    }

    /**
     * user sign up api call
     */
    signUp(dataSignup) {

        let resourcePath = "/user/signup";
        let xhrSignup = new XMLHttpRequest();
        let that = this;

        console.log("baseurl : " + this.props.baseUrl + resourcePath);
        console.log("signUp Data : " + dataSignup);
        xhrSignup.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && this.status === 201) {
                that.setState({
                    registrationSuccess: true,
                    openSnackBar: true,
                    value: 0,
                    errorResponse: this.responseText,
                    successMessage: 'Registered successfully! Please login now!'
                });
            } else {
                that.setState({errorResponse: this.responseText});
                console.log(this.responseText);
            }
        });

        xhrSignup.open("POST", this.props.baseUrl + resourcePath + "?" + dataSignup.toString());
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        xhrSignup.send();

    }

    /**
     * singup click handler to call the sign up method
     * */
    signUpClickHandler = () => {

        if (!this.validateSignUp()) {
            return;
        }
        let dataSignup =
            "firstName=" + this.state.firstname +
            "&lastName=" + this.state.lastname +
            "&email=" + this.state.email +
            "&contactNumber=" + this.state.contact +
            "&password=" + this.state.registerPassword
        ;
        this.signUp(dataSignup);
    };
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({openSnackBar: false});
    };

    inputFirstNameChangeHandler = (e) => {
        this.setState({firstname: e.target.value});
    };

    inputLastNameChangeHandler = (e) => {
        this.setState({lastname: e.target.value});
    };

    inputEmailChangeHandler = (e) => {
        this.setState({email: e.target.value});
    };

    inputRegisterPasswordChangeHandler = (e) => {
        this.setState({registerPassword: e.target.value});
    };

    inputContactChangeHandler = (e) => {
        this.setState({contact: e.target.value});
    };

    handleCloseMenu = () => {


        this.setState({showUserProfileDropDown: false, anchorEl: null});
    };

    userProfileClickHandler = () => {
        this.props.history.push({
            pathname: "/profile"
        });
    };
    /**
     * this is method is logout the user from current session and navigates him to home page
     *
     */
    logoutClickHandler = () => {

            sessionStorage.removeItem("access-token");
            sessionStorage.removeItem("user-details");
            sessionStorage.removeItem("loggedInUserName");
            this.setState({
                userLoggedIn: false,
                showUserProfileDropDown: false
            });
            this.props.history.push({
              pathname: "/"
            });
            
        
    };

    /**
     * Event handler called when the profile menu icon inside the header is clicked to toggle the user profile dropdown
     * @memberof Header
     */
    profileIconClickHandler = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
            showUserProfileDropDown: !this.state.showUserProfileDropDown
        });
    };

    render() {

    
        return (
            <div > 
                <header className="mainHeader" style={{backgroundColor: '#263238'}}>
                    <div className="header-icon-group">
                        <div>
                            <IconButton color="inherit" aria-label="Open drawer">
                                <Fastfood/>
                            </IconButton>
                        </div> 
                        <div className="search-field">
                            {this.props.isHomePage && (
                                <div style={{display:'flex'}}>
                                    <SearchIcon/>
                                    < Input 
                                            placeholder="Search by Restaurant Name"
                                            onChange={this.props.onChange}
                                            style={{ color: 'white' ,width:'290px'}}
                                    />
                                </div>
                            )}
                            
                        </div>
                        <div >
                            {this.props.isHomePage &&
                            <IconButton color="inherit" aria-label="Open drawer">
                                <CategoryToc/> <Typography component="h2" style={{color:'white'}}>Categories</Typography>
                            </IconButton>
                            }
                        </div>
                        <div >
                            {this.state.userLoggedIn ?
                                <Button
                                    variant="contained"
                                    color="default"
                                    className="options-button"
                                    aria-owns={this.state.showUserProfileDropDown ? 'menu-user-options' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.profileIconClickHandler}>
                                        <AccountCircle className="account-circle"/>
                                        {sessionStorage.getItem('loggedInUserName')}
                                </Button>
                                :
                                <Button variant="contained"
                                        className="options-button"
                                        color="default"
                                        onClick={this.openModalHandler}>
                                    <AccountCircle className="account-circle"/>
                                    Login
                                </Button>
                            }
                        </div>
                    </div>
                    <Menu
                        id="menu-user-options"
                        open={this.state.showUserProfileDropDown}
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleCloseMenu}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        getContentAnchorEl={null}
                        >
                        <MenuItem onClick={this.userProfileClickHandler}>Profile</MenuItem>
                        <MenuItem onClick={this.logoutClickHandler}>Logout</MenuItem>
                     </Menu>
                </header>
                
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}
                >
                    <Tabs value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="LOGIN"/>
                        <Tab label="SIGNUP"/>
                    </Tabs>
                    {/* Login-modal  */}
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
                        <span className="fieldRequired">required</span>
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
                        <span className="fieldRequired">required</span>
                      </FormHelperText>
                      </FormControl>
                        <br/><br/>
                        <Button variant="contained" color="primary"
                                onClick={this.loginClickHandler}>LOGIN</Button>
                    </TabContainer>
                    }

                    {/* the sign-up modal */}

                    {this.state.value === 1 &&
                    <TabContainer>
                        <FormControl required >
                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                            <Input id="firstName" type="text" firstName={this.state.firstName}
                                   onChange={this.firstNameChangeHandler}
                                   />
                            <FormHelperText className={this.state.firstNameRequired}>
                                <span className="fieldRequired">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl >
                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                            <Input id="lastName" type="text" lastname={this.state.lastName}
                                   onChange={this.LastNameChangeHandler}
                                   />
                            <FormHelperText className={this.state.lastNameRequired}>
                                <span className="fieldRequired">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required >
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" type="email" email={this.state.email}
                                   onChange={this.emailChangeHandler}
                                   />
                            <FormHelperText className={this.state.emailRequired}>
                                <span className="fieldRequired">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.isEmailValid}>
                                <span className="fieldRequired">Invalid Email</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required >
                            <InputLabel htmlFor="signupPassword">Password</InputLabel>
                            <Input id="signupPassword" type="password"
                                   signupPassword={this.state.signupPassword}
                                   onChange={this.signupPasswordChangeHandler}
                                   />
                            <FormHelperText className={this.state.signupPasswordRequired}>
                                <span className="fieldRequired">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.isPasswordValid}>
                                <span className="fieldRequired">Password must contain at least one capital letter, one small letter,
                                    one number, and one special character
                                </span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required >
                            <InputLabel htmlFor="contactNumber">Contact No.</InputLabel>
                            <Input id="contactNumber" type="text" 
                                   contactNumber={this.state.signupcontactNumber}
                                   onChange={this.signupcontactNumberChangeHandler} 
                                   />
                            <FormHelperText className={this.state.signupPasswordRequired}>
                                <span className="fieldRequired">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.isContactNumberValid}>
                                <span
                                    className="fieldRequired">Contact No. must contain only numbers and must be 10 digits long
                                </span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        
                        <br/><br/>
                        <Button variant="contained" color="primary"
                                onClick={this.signUpClickHandler}>SIGNUP</Button>
                    </TabContainer>
                    }
                </Modal>

                <div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.openSnackBar}
                        autoHideDuration={3000}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.snackBarMsg}</span>}
                    />
                </div> 
            
            </div>
        )
    }
}

export default Header;