import React from "react";
import "./card.css";
import { Link } from "react-router-dom";
const starStyle = {
  backgroundColor: "green",
  color: "white",
  width: "40px",
  height: "20px",
  borderRadius: "5px",
};
const Cards = (props) => {
  return (

      <li className="col col-lg-4" style={{listStyle:"none"} }>
        <Link to={props.id}>
        <div className="card" style={{height: "270px",width:"254px", marginBottom: "20px" }}>
          <img
            src="./logo192.png"
            className="card-img-top"
            alt="hotel ing"
          ></img>
          <div className="card-body">
            <h5 className="card-title">{props.hotelName}</h5>
            <small className="text-muted">{props.hotelDescription}</small>
            <div style={starStyle}></div>
          </div>
        </div>
        </Link>
      </li>

  );
};

export default Cards;
