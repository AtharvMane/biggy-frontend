import React, { useState } from "react";
import HotelMenuCss from "./HotelMenu.module.css";
import axios from "axios";
import Images from "../SaredComponent/Images";

function HotelMenu(props) {
  const netCost=(array)=>{
    let sum=0

    for(let i=0;i<array.length;i++){
    
      sum=sum+parseFloat(array[i].cost)


    }
    return sum
  }
  const [totalCost, settotalCost] = useState(0)
  const addToCart = (e) => {
    
    if (!localStorage.getItem(`cart${props.hotelID}`)) {
      e.ordernumber = 1;
      localStorage.setItem(`cart${props.hotelID}`, JSON.stringify([e]));
    } else {
      e.ordernumber = JSON.parse(localStorage.getItem(`cart${props.hotelID}`)).length+1;
      localStorage.setItem(
        `cart${props.hotelID}`,
        JSON.stringify(JSON.parse(localStorage.getItem(`cart${props.hotelID}`)).concat([e]))
      );
      
    }settotalCost(netCost(JSON.parse(localStorage.getItem(`cart${props.hotelID}`))))
    setorderDish(JSON.parse(localStorage.getItem(`cart${props.hotelID}`)));
  };
  const [orderDish, setorderDish] = useState(JSON.parse(localStorage.getItem(`cart${props.hotelID}`)));
  

  const removeFromCart = (e) => {
    if (localStorage.getItem(`cart${props.hotelID}`)) {
      localStorage.setItem(
        `cart${props.hotelID}`,
        JSON.stringify(
          JSON.parse(localStorage.getItem(`cart${props.hotelID}`)).filter(
            (element) => element.ordernumber !== e.ordernumber
          )
        )
      );
      settotalCost(netCost(JSON.parse(localStorage.getItem(`cart${props.hotelID}`))))
      setorderDish(JSON.parse(localStorage.getItem(`cart${props.hotelID}`)));
    }
  };
  const article = { cart: orderDish, restaurant_id: props.hotelID};
  const [response, setresponse] = useState(<></>)
  const sendOrder = () => {
    axios
      .post("http://localhost:5000/pendingOrders", article)
      .then((res) => {setresponse(<p>{res.data.message}</p>);setTimeout(()=>{setresponse(<></>)},2000);localStorage.removeItem(`cart${props.hotelID}`);setorderDish([])})
      .catch((err)=>{console.log(err);setresponse(<p>Some Error Occured</p>);setTimeout(setresponse(<></>),2000);})
  };

  return (
    <div className={HotelMenuCss.parentdiv}>
      <ul className={HotelMenuCss.menulist}>
        {props.menu.map((e) => (
          <li className={HotelMenuCss.menulistItems} key={e.id}>
            <Images css={HotelMenuCss.menuImg} image={e.image}/>
            <div className={HotelMenuCss.textClass}>
              <p className={HotelMenuCss.menutext}>{e.name}</p>
              <button
                className={HotelMenuCss.addButton}
                onClick={() => {
                  addToCart(e);
                }}
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ul className={HotelMenuCss.cart}>
        {orderDish?.map((e) => (
          <li key={e.ordernumber}>
            {e.name}
            <button
              onClick={() => {
                removeFromCart(e);
              }}
            >
              cancel
            </button>
          </li>
        ))}
        <button
          onClick={() => {
            sendOrder();
          }}
        >
          Order cost:{totalCost}
        </button>
        {response}
      </ul>
    </div>
  );
}

export default HotelMenu;
