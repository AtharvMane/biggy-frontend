import React from "react";
import { Link } from "react-router-dom";
import CardCss from "./card.module.css";
const starStyle = {
  backgroundColor: "green",
  color: "white",
  width: "40px",
  height: "20px",
  borderRadius: "5px",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize:'13.75px'
};
const Cards = (props) => {
  return (
    <li
      className={`${CardCss.col} ${CardCss.colLg4}`}
      style={{ listStyle: "none" }}
    >
      <Link style={{  color: "black", textDecoration: "none"}} to={props.id}>
        <div
          className={CardCss.card}
          style={{ height: "270px", width: "254px", marginBottom: "20px" }}
        >
          <img
            src={props.hotelImage}
            className={CardCss.cardImgTop}
            alt="hotel img"
          ></img>
          <div className={CardCss.cardBody}>
            <h5 className={CardCss.cardTitle}>{props.hotelName}</h5>
            <small className="text-muted">{props.hotelDescription}</small>
            <div style={starStyle}>{props.rating} &#9733;</div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Cards;
