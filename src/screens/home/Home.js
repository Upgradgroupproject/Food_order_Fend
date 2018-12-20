import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RestaurantCard from "./RestaurantCard";
import { white } from 'material-ui/styles/colors';
import Details from '../details/Details';


    const styles = {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: white,
            width:'95%',
            
          },
          gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
          },
        headerImage: {
            flex: 1,
            width: 50,
            height: 50,
            resizeMode: 'contain' 
        },
        restaurantImage: {
            flex: 1,
            width: '95%',
            height: 200,
            resizeMode: 'contain' 
        },
        restaurantName: {
            flex: 1,
            height: 50,
            resizeMode: 'contain' 
        },
        restaurantCard: {
          marginBottom: 40,
          margintop: 40
        },
    };

/**		
  * Class component for the header		
  * @class Home		
  * @extends {Component}		
  */

class Home extends Component {
    constructor() {
        super();
        
        this.state = {
            id : "",
            restaurantName : "" ,
            photoUrl : "" ,
            userRating : "" ,
            avgPrice : "" ,
            numberUsersRated : "" ,
            address : "" ,
            categories : [],
            restaurantsArray : [],
            filteredReastaurantArray: [], 
            currentSearchValue: "",
            
            //isDataLoaded:false
        }
    }
    

      componentWillMount() {
        
        this.getAllRestaurantsDataArray();
        
    }

    /**
     * function to get 
     *    All restaurants
     *    rendered at home page
     *    
     * */

    getAllRestaurantsDataArray(){
        let reataurantData = null;
        let xhrRestaurant = new XMLHttpRequest();
        let that = this;
        
        xhrRestaurant.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    restaurantsArray : JSON.parse(this.responseText)             
                });      
             }
        });

        xhrRestaurant.open("GET", "http://localhost:8080/api/restaurant");
        xhrRestaurant.send(reataurantData);
    }

    /**
     * function to get 
     *     restaurants details as per id
     *    rendered at Details page
     *    
     * */

    getRestaurantDetails(restaurantId){
        
        this.props.history.push({
            pathname: "/restaurant/"+restaurantId
          });
        ReactDOM.render(<Details   id={restaurantId}  history={this.props.history}/>, document.getElementById('root'));
    }



    /**
     * Search handler to perform
     *    API call to get all restaurant based on search string passed
     *    rendered at home page with estaurant card updated
     * */

    searchRestaurantHandler = (e) => {

        if(e.target.value === ""){
            
            this.getAllRestaurantsDataArray();
        }

        else{
            let xhrRestSearch = new XMLHttpRequest();
            let that = this;

            xhrRestSearch.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    that.setState({
                        restaurantsArray: JSON.parse(this.responseText)
                    });
                }
                
            });

            xhrRestSearch.open("GET", this.props.baseUrl + "/restaurant/name/" + e.target.value);
            xhrRestSearch.send();
        }
        
    }

    render() {
        const { classes } = this.props;
        const dataSource = this.state.restaurantsArray;
        return (
            <div className="home">
            <MuiThemeProvider>
            <div>
            <Header 
            showLink={false}
            history={this.props.history}
            showSearch={true}
            showProfile={true}
            enableMyAccount={true}
            isHomePage={true}
            onChange={this.searchRestaurantHandler}
            />

            <div className="images-main-container">
            <div className="first-row" >
              {dataSource.map((restaurant, index) =>
                (index === 0 || index === 1 || index === 2 || index === 3) ? (
                  <div className="left-column" onClick={() => this.getRestaurantDetails(dataSource[index].id)}>
                  <RestaurantCard
                  key={index}
                  rest={restaurant}
                  index={index}
                  classes={classes}
                  />
                  </div>
                ) : null
              )}
            </div>
            <div className="second-row">
            {dataSource.map((restaurant, index) =>
                (index === 4 || index === 5 || index === 6 || index === 7) ? (
                  <div className="left-column" onClick={() => this.getRestaurantDetails(dataSource[index].id)}>
                  <RestaurantCard
                  key={index}
                  rest={restaurant}
                  index={index}
                  classes={classes}
                  />
                  </div>
                ) : null
              )}
            </div>
            </div>
        </div>
        
      </MuiThemeProvider>
            </div>
        ) }

}
export default withStyles(styles)(Home);