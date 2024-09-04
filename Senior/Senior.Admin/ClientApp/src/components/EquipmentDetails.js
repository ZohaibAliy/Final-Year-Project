import React from "react";
import "../style/EquipmentDetails.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function EquipmentDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  let image = "data:image/jpeg;base64," + location.state.image;
  return (
	<>
    <div id="container">
		
      {console.log(location.state)}

      <div className="product-details">
        <h1>{location.state.productName}</h1>

        <p className="information">{location.state.description}</p>

        {user != null ? (
          <div className="control">
            <button
              className="btn-data"
              onClick={() => navigate("/placeorder", { state: location.state })}
            >
              <span className="price">${location.state.price}</span>
              <span className="shopping-cart">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              </span>
              <span className="buy">Request now!</span>
            </button>
          </div>
        ) : (
          <div className="control">
            <button className="btn-data" onClick={() => navigate("/login")}>
              <span className="price">${location.state.price}</span>
              <span className="shopping-cart">
                <i className="fa fa-fw fa-user" aria-hidden="true"></i>
              </span>
              <span className="buy">Sign in</span>
            </button>
          </div>
        )}
      </div>

      <div className="product-image">
        <img src={image} alt="" />

        <div className="info">
          <h2> Description</h2>
          <ul>
            <li>
              <strong>Remaining Equipment : </strong>
              {location.state.quantity}{" "}
            </li>
            <li>
              <strong>Price : </strong>
              {location.state.price}{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
	</>
  );
}
