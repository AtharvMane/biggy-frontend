import React from "react";
import Images from "../SaredComponent/Images";
import hotelTab from "./hotelTab.module.css";
const HotelTab = (props) => {
  return (
    <div className={hotelTab.HotelTabHolder}>
      <div className={hotelTab.emdiv}></div>
      <div className={hotelTab.Container}>
        <Images image={props.hotelImage} css={hotelTab.hotelImage}/>
      </div>

      <div className={hotelTab.infoTextContainer}>
        <h1>{props.hotelName}</h1>
        <p className={hotelTab.dimtext}>{props.hotelCuisine}</p>
        <p className={hotelTab.dimtext}>address lorem ipsum dolor set als hiooi hudheljem pideoihnlw</p>
        <div className={hotelTab.smallinfoContainer}>
        <div className={hotelTab.smallinfo}>
            <h5  style={{textAlign:"center"}}>
                4.7 stars
            </h5>
            <p className={hotelTab.dimtext+" "+hotelTab.infodimtext} style={{textAlign:"center"}}>ratings</p>
            </div>
            <div className={hotelTab.smallinfo}>
                <h5 style={{textAlign:"center"}}>
                    37 minutes
                </h5>
                <p  className={hotelTab.dimtext+" "+hotelTab.infodimtext} style={{textAlign:"center"}}>
                    delivery time
                </p>
            </div>
            </div>

      </div>
    </div>
  );
};

export default HotelTab;
