import React from "react";
import "./hotelcontainer.css";
import Cards from "./Cards";
import { useParams } from "react-router-dom";

const HotelSearchContainer = (props) => {
  const param = useParams();

  const neededcards = props.hotel
    .filter((el) => {
      return el && el.name.toLowerCase().includes(param.searchText.toLowerCase());
    })
    const cards=neededcards.map((e) => {
      return (
        <Cards
          key={e._id}
          id={"/restaurants/" + e._id}
          hotelName={e.name}
          hotelDescription={"Cuisine:" + e.cuisine}
        />
      );
    });
  return (
    <div className="container" id="mainpage">
      <ul className="row">{cards.length?cards:<div><h5>no results</h5></div>}</ul>
    </div>
  );
};

export default HotelSearchContainer;
