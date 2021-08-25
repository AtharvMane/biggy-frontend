import React from "react";
import Cards from "./Cards";
import './hotelcontainer.css'
const HotelContainer = (props) => {
  



  const cards= props.hotel.map((e)=>{if (e) {return <Cards key={e._id} id={"/restaurants/"+e._id} hotelImage={e.image} hotelName={e.name} rating={e.score} hotelDescription={'Cuisine:'+e.cuisine}/>} else{return <></>}})   


  

  return (
    <div className="container" id="mainpage">
      <ul className="row" >
        {cards}
      </ul>
    </div>
  );
};

export default HotelContainer;
