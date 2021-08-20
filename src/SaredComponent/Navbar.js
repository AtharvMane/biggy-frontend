import React, { useState } from "react";
import NavCss from "./navBar.module.css";
import { useHistory} from "react-router-dom";

const Navbar = (props) => {

  const navToggler = (state) => {
    if (state !== NavCss.navlistOpen) return NavCss.navlistOpen;
    else {
      return NavCss.navlist;
    }
  };
  const searchToggler = (state) => {
    if (state !== NavCss.searchOpen) return NavCss.searchOpen;
    else {
      return NavCss.searchClosed;
    }
  };

  const [navToggled, navToggle] = useState(NavCss.navlist);
  const [searchToggled, searchToggle] = useState(NavCss.searchClosed);
  const history = useHistory();
  const [searchtext, setsearchtext] = useState("");
   const signOut=()=>{
    localStorage.clear();
    history.push('/')

  }
  return (
    <div className={NavCss.topnav} id="myTopnav">
      <button
        className={NavCss.navButton}
        onClick={() => navToggle((prevToggeled) => navToggler(prevToggeled))}
      >
        Menu
      </button>
      <div className={NavCss.logo}>logo</div>
      <div className={navToggled}>
        <div className={NavCss.active}>Location</div>
        <div
          onClick={() =>
            searchToggle((prevToggeled) => searchToggler(prevToggeled))
          }
        >
          Restaurants
        </div>
        <div>Help (this doesnt work)</div>
        <div onClick={()=>{signOut()}}>Signout</div>
      </div>
      <div className={searchToggled}>
        <div className={NavCss.searchContainer}>
          <input
            type="text"
            onChange={(event) => {
              setsearchtext(event.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              history.push(`/restaurants/search/${searchtext}`);
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
