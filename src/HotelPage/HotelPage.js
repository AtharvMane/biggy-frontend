import React from "react";
import HotelTab from "./HotelTab";
import HotelMenu from "./HotelMenu";

const HotelPage = (props) => {
  return (

      <div style={{ position: "relative", top: "10vh"}}>
        <HotelTab hotelImage={props.hotel.image} hotelName={props.hotel.name} score={props.hotel.score} hotelCuisine={props.hotel.cuisine}/>
        <HotelMenu menu={props.hotel.menu} hotelID={props.hotel._id}/>
      </div>

  );
};

export default HotelPage;
