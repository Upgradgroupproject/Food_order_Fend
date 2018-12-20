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

 /**		
  * Class component for the header		
  * @class Header		
  * @extends {Component}		
  */

class Header extends Component {


    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            value: 0,
            anchorEl: null,

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
            readyForSignup: false,
            snackBarMessage:"",
            signupFailInfo:"",
            signupFailed:"dispNone",
            loginFailInfo:"",
            loginFailed:"dispNone",

            showUserProfileDropDown: false,
            enableMyAccount: false,

            userLoggedIn: (sessionStorage.getItem("access-token") !== null),

        }
    }

    tabChangeHandler = (event, value) => {
        this.setState({
            value
        });
    };

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            contactNumberRequired: "dispNone",
            isLoggedInContactValid: "dispNone",
            contactNumber: "",
            passwordasswordRequired: "dispNone",
            password: "",
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
            readyForSignup: false,

        });
    };

    closeModalHandler = () => {
        this.setState({
            modalIsOpen: false,
            
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
            readyForSignup: false,
            //snackBarMessage:"",
            signupFailInfo:"",
            signupFailed:"dispNone",
            loginFailInfo:"",
            loginFailed:"dispNone",
            //userLoggedIn: false,
        });
    };

    /**
     * login click handler to perform
     *    check credentials entered?
     *    API call to user/login
     *    response to user , set sessionItems
     * */

    loginClickHandler = () => {
        
        this.areLoginCredentialsEntered();

        //validate contact no.?

    if (!this.state.password || !this.state.contactNumber) {
      //alert("Please enter the username and password")

    } else {
      
        var varAPI = "http://localhost:8080/api/user/login/?contactNumber="+this.state.contactNumber +"&password="+this.state.password;
      
        
        let xhrUserLogin = new XMLHttpRequest();
        let that = this;
            xhrUserLogin.addEventListener("readystatechange", function () {
                if (this.readyState === 4 && this.status === 200) {
                    
                    let loggedInUserInfo = JSON.parse(this.responseText);


                    that.setState({
                        userLoggedIn: true,
                        loggedInUserName: loggedInUserInfo.firstName,
                        snackBarMessage: 'Logged in successfully!',
                        openSnackBar: true,
                        modalIsOpen: false,
                    });
                    sessionStorage.setItem("loggedInUserName", loggedInUserInfo.firstName);
                    sessionStorage.setItem("access-token", xhrUserLogin.getResponseHeader("access-token"));
                    that.closeModalHandler();
                } else {
                    that.setState({
                        openSnackBar: false,
                        snackBarMessage: "",
                        loginFailInfo: this.responseText,
                        loginFailed: "dispBlock"
                    });        
                }
            });
        
        xhrUserLogin.open("POST", varAPI);
        xhrUserLogin.setRequestHeader("Content-Type", "application/json");
        xhrUserLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrUserLogin.send();
      
      
      
      
      
      // var postBody = {
      //   contactNumber: this.state.contactNumber,
      //   password: this.state.password
      // }
    //   fetch(varAPI, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     // body: JSON.stringify(postBody)
    //   })
    //     .then(function (response) {
    //       //console.log(response);
    //       //localStorage.setItem('Acces',response.data.token);
    //       if (response.headers.get("access-token")) {
    //         sessionStorage.setItem("access-token", response.headers.get("access-token"));
    //         //sessionStorage.setItem("loggedInUserName", response.results.firstName);
    //         //console.log(response.results.firstName);
    //         console.log(JSON.parse(response));
    //         this.closeModalHandler();
    //         this.setState({ snackBarMsg: "Logged in" });
    //         this.setState({ openSnackBar: true})
    //       }
    //       else if (response.status === 200) {
    //         console.log("Hi");
    //         //this.setState({ showUserExistMsg: true });
    //       }
          
    //     }).catch(function (err) {
    //       // Error :(ss
    //       //console.log(err);
    //     });
    }
    }

    areLoginCredentialsEntered(){
        this.state.password === "" ? 
          this.setState({ passwordRequired: "dispBlock" }) :
              this.setState({ passwordRequired: "dispNone" });
              
          this.state.contactNumber === "" ? 
            this.setState({ contactNumberRequired: "dispBlock" }) :
             this.setState({ contactNumberRequired: "dispNone" });

            // const contactRegx = /^[0-9]{10}$/;
      }

      /* Login Handlers */

    loginContactNumberChangeHandler = (e) => {
        this.setState({contactNumber: e.target.value});
        console.log(this.state.contactNumber);
    };

    loginPasswordChangeHandler = (e) => {
        this.setState({password: e.target.value});
    };

        /*
        SignUp handlers
        */

    firstNameChangeHandler = (e) => {
        this.setState({firstName: e.target.value});
    };

    lastNameChangeHandler = (e) => {
        this.setState({lastName: e.target.value});
    };

    emailChangeHandler = (e) => {
        this.setState({email: e.target.value});
    };

    signupPasswordChangeHandler = (e) => {
        this.setState({signupPassword: e.target.value});
    };

    signupcontactNumberChangeHandler = (e) => {
        this.setState({signupcontactNumber: e.target.value});
    };


    /**
     * validate the user entries in signup page
     *     email,password and contact are for length and mentioned combination/structure
     * */
    areCredentialsEntered() {

        const emailRegx = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        const passwordRegx = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)(?=.*[#@$%&*!^]+.*)[a-zA-Z0-9#@$&*!]{4,}$/;
        const contactRegx = /^[0-9]{10}$/;

        this.setState({readyForSignup: false});
        
        this.state.firstName === "" ? this.setState({firstNameRequired: "dispBlock",readyForSignup: false})
                                    : this.setState({firstNameRequired: "dispNone",readyForSignup: true});

        this.state.email === "" ? this.setState({emailRequired: "dispBlock",isEmailValid: "dispNone",readyForSignup: false})
                                : !this.state.email.match(emailRegx) ? 
                                      this.setState({isEmailValid: "dispBlock",emailRequired: "dispNone",readyForSignup: false})
                                            :  this.setState({isEmailValid: "dispNone",emailRequired: "dispNone",readyForSignup: true});

        this.state.signupPassword === "" ? this.setState({signupPasswordRequired: "dispBlock",isPasswordValid: "dispNone",readyForSignup: false})
                :
                 !this.state.signupPassword.match(passwordRegx) ? 
                    this.setState({ isPasswordValid: "dispBlock",signupPasswordRequired: "dispNone",readyForSignup: false})
                    :    
                        this.setState({ isPasswordValid: "dispNone",signupPasswordRequired: "dispNone",readyForSignup: true});

        this.state.signupcontactNumber === "" ? this.setState({signupcontactNumberRequired: "dispBlock",isContactNumberValid: "dispNone",readyForSignup: false})
            :
            !this.state.signupcontactNumber.match(contactRegx) ? this.setState({isContactNumberValid: "dispBlock",signupcontactNumberRequired: "dispNone",
                readyForSignup: false})
            :
            this.setState({isContactNumberValid: "dispNone",signupcontactNumberRequired: "dispNone",readyForSignup: true }) 

    }

    /**
     * singup click handler to perform
     *    check form inputs entered?
     *    form inputs valid?
     *    API call to user/signup
     *    response to user 
     * */

    signupClickHandler = () => {

        this.areCredentialsEntered();  
        
        if(this.state.readyForSignup){  

            let cURL = "";

            cURL = "http://localhost:8080/api/user/signup/?" + 
            "firstName=" + this.state.firstName + "&lastName=" + this.state.lastName +
            "&email=" + this.state.email + "&contactNumber=" + this.state.signupcontactNumber + "&password=" + this.state.signupPassword ;

            let xhrSignup = new XMLHttpRequest();
            let that = this;

            xhrSignup.addEventListener("readystatechange", function () {
                if (this.readyState === 4 && this.status === 201) {
                    that.setState({
                        openSnackBar: true,
                        value: 0,
                        snackBarMessage: 'Registered successfully! Please login now!'
                    });
                } else {
                    that.setState({
                        openSnackBar: false,
                        snackBarMessage: "",
                        loginFailInfo: this.responseText,
                        loginFailed: "dispBlock"
                    });
                
                }
            });

            xhrSignup.open("POST", cURL);
            xhrSignup.setRequestHeader("Cache-Control", "no-cache");
            xhrSignup.setRequestHeader("Content-Type", "application/json");
            xhrSignup.send();
            
        }
        else
        {

        }
        
    };


    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({openSnackBar: false});
    };

    
    handleCloseMenu = () => {

        this.setState({showUserProfileDropDown: false, anchorEl: null});
    };

    userProfileClickHandler = () => {
        this.props.history.push({
            pathname: "/profile"
        });
    };

    /* logout handler
     * clears session info - access-token,user name 
    */
    logoutClickHandler = () => {

            sessionStorage.removeItem("access-token");
            sessionStorage.removeItem("loggedInUserName");
            this.setState({
                userLoggedIn: false,
                showUserProfileDropDown: false
            });
            this.props.history.push({
              pathname: "/"
            });     
    };

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
                      <InputLabel htmlFor="contactnumber">Contact No.</InputLabel>
                      <Input id="contactnumber" type="text"
                        contactnumber={this.state.contactNumber}
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
                      <Input id="password" type="password"
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
                        <FormHelperText className={this.state.loginFailed}>
                                <span
                                    className="fieldRequired"> {this.state.loginFailInfo}
                                </span>
                        </FormHelperText>
                        <Button variant="contained" color="primary"
                                onClick={this.loginClickHandler}>LOGIN</Button>
                    </TabContainer>
                    }

                    {/* the sign-up modal */}

                    {this.state.value === 1 &&
                    <TabContainer>
                        <FormControl required >
                            <InputLabel htmlFor="firstname">First Name</InputLabel>
                            <Input id="firstname" type="text" firstname={this.state.firstName}
                                   onChange={this.firstNameChangeHandler}
                                   />
                            <FormHelperText className={this.state.firstNameRequired}>
                                <span className="fieldRequired">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl >
                            <InputLabel htmlFor="lastname">Last Name</InputLabel>
                            <Input id="lastname" type="text" lastname={this.state.lastName}
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
                            <InputLabel htmlFor="signuppassword">Password</InputLabel>
                            <Input id="signuppassword" type="password"
                                   signuppassword={this.state.signupPassword}
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
                            <InputLabel htmlFor="contactnumber">Contact No.</InputLabel>
                            <Input id="contactnumber" type="text" 
                                   contactnumber={this.state.signupcontactNumber}
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
                        <FormHelperText className={this.state.signupFailed}>
                                <span
                                    className="fieldRequired"> {this.state.signupFailInfo}
                                </span>
                        </FormHelperText>
                        
                        <Button variant="contained" color="primary"
                                onClick={this.signupClickHandler}>SIGNUP</Button>
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
                        message={<span id="message-id">{this.state.snackBarMessage}</span>}
                    />
                </div> 
            
            </div>
        )
    }
}

export default Header;