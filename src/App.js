import React, { useState, useEffect } from "react";
import HotelPage from "./HotelPage/HotelPage";
import Navbar from "./SaredComponent/Navbar";
import axios from "axios";
import HotelContainer from "./HotelRecommendationPage/HotelContainer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./Auth Pages/loginPage";
import "./main.css";
import PrivateRoute from "./routing/PrivateRoute";
import RegisterPage from "./Auth Pages/RegisterPage";
import RestaurantSide from "./RestaurantSide/RestaurantSide";
import RestaurantLogin from "./Auth Pages/restaurantLogin";
import HotelSearchContainer from "./HotelRecommendationPage/HotelSearchContainer";
const App = () => {
  const [hotel, sethotel] = useState([]);
  useEffect(() => {
    let isGetting = true;
    const fetchdata=async()=>{await axios
      .get("https://biggy-backend.herokuapp.com/Hotels")
      .then((res) => {
        if (isGetting) {
          sethotel(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });}
      fetchdata()
    return () => (isGetting = false);
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar/>

        <Switch>
          <Route exact path={"/user/register"}>
            <RegisterPage />
          </Route>
          <Route exact path={"/"}>
            <LoginPage />
          </Route>
          <Route exact path={"/restaurantLogin"}>
            <RestaurantLogin />
          </Route>

          <PrivateRoute
            exact
            path={"/restaurants"}
            usertype="user"
            component={HotelContainer}
            hotel={hotel}
          />

          {hotel.map((e) => (
            <PrivateRoute
              key={e._id}
              exact
              path={"/restaurants/" + e._id}
              usertype="user"
              component={HotelPage}
              hotel={e}
            />
          ))}

          <PrivateRoute
            exact
            path={"/restaurants/search/:searchText"}
            usertype="user"
            hotel={hotel}
            component={HotelSearchContainer}
          />

              <PrivateRoute

                exact
                path={"/restaurantsSide/:id"}
                component={RestaurantSide}
                usertype="restaurant"

              />


        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
