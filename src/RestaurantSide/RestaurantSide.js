import React, { useEffect, useState } from "react";
import HotelMenuCss from "../HotelPage/HotelMenu.module.css";
import HotelTab from "../HotelPage/HotelTab";
import axios from "axios";
import {useParams} from 'react-router-dom'
import Images from "../SaredComponent/Images";

function RestaurantSide(props) {
const params=useParams()
const [dataNeeded, setdataNeeded] = useState(false)
  const [hotel, sethotel] = useState([])
  
  useEffect(() => {

    let isGetting = true;
    const fetchdata=async()=>{await axios
      .get(`https://biggy-backend.herokuapp.com/Hotels/${params.id}`)
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
  }, [dataNeeded,params.id]);

  const [addMenuForm, setaddMenuForm] = useState(false);
  const [order, setorder] = useState([]);
  const token=localStorage.getItem("authToken")
  useEffect(() => {
    const continuousReq = setInterval(async () => {
      await axios
        .get("https://biggy-backend.herokuapp.com/RestaurantSide/orders/getOrders", {
          headers: { restaurant_id: params.id},
        })
        .then((res) => {
          setorder(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    }, 2000);

    return () => {
      clearInterval(continuousReq);
    };
  }, [params.id]);
  const orderDone = async (element) => {
    await axios
      .post("https://biggy-backend.herokuapp.com/RestaurantSide/orders/setOrders", element)
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postMenu = async () => {
    await axios
      .post("https://biggy-backend.herokuapp.com/RestaurantSide/menu/addMenu",{_id:params.id,addToMenu:name,cost:cost,image:imgPath} ,{
        headers: {"Authorization":`Bearer ${token}`},
      })
      .then((res) => {
        setdataNeeded((prevneeded)=>!prevneeded)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [name, setname] = useState("")
  const [cost, setcost] = useState(0)
  const [imgPath, setimgPath] = useState('')
if(hotel[0]){
  return (
    <div style={{ position: "relative", top: "15vh" }}>
      <HotelTab hotelName={hotel[0].name} hotelCuisine={hotel[0].cuisine} />
      <div className={HotelMenuCss.parentdiv}>
        <ul className={HotelMenuCss.menulist}>
          
          {hotel[0].menu&&hotel[0].menu.map((e) => {

            return (
              
              <li key={e.id} className={HotelMenuCss.menulistItems}>
                <Images css={HotelMenuCss.menuImg} image={e.image}/>
                <div className={HotelMenuCss.textClass}>
                  <p className={HotelMenuCss.menutext}>{e.name} </p>
                  <p className={HotelMenuCss.menutext}>{e.cost} </p>
                  <button
            onClick={() => {
              setaddMenuForm((prevForm) => !prevForm);
            }}
            style={{ height: "30px" }}
            className={HotelMenuCss.addButton}
          >
            Add To Menu
          </button>
                </div>
              </li>
            );
          })}
          <button
            onClick={() => {
              setaddMenuForm((prevForm) => !prevForm);
            }}
            style={{ height: "30px" }}
            className={HotelMenuCss.addButton}
          >
            Add to Menu
          </button>
          {addMenuForm && (
            <li className={HotelMenuCss.menulistItems}>
              <form onSubmit={(e) => {e.preventDefault(); postMenu()}}>
                <input
                  type="text"
                  placeholder="Dish Name"
                  onChange={(e) => {setname(e.target.value);}}
                ></input>
                <input
                  type="text"
                  placeholder="Dish Cost"
                  onChange={(e) => {setcost(parseFloat(e.target.value)||0);}}
                ></input>
                <input
                  type="text"
                  placeholder="path for image"
                  onChange={(e) => {setimgPath(parseFloat(e.target.value)||"");}}
                ></input>
                
                <input
                  type="submit"
                  style={{ height: "30px" }}
                  className={HotelMenuCss.addButton}
                  value="Add"
                ></input>
                
              </form>
            </li>
          )}
        </ul>

        <ul className={HotelMenuCss.cart}>
          
            {order&&order.map((e) => {
              return (
                <li className={HotelMenuCss.menulistItems}>
                  <div className={HotelMenuCss.textClass}>
                    {e.cart.map((name) => {
                      return <p className={HotelMenuCss.menutext}>{name.name} </p>;
                    })}
                  </div>
                  <button onClick={(event)=>{orderDone()}}>Dispatch</button>
                </li>
              );
            })}
          
        </ul>
      </div>
    </div>
  );}else{
    return <></>
  }
}

export default RestaurantSide;
