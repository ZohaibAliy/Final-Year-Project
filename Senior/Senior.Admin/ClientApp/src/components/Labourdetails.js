import React from "react";
import "../style/EquipmentDetails.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function LabourDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
	<>
    <div id="container">
		
      {console.log(location.state)}

      <div className="product-details">
        <h1>{location.state.firstName}</h1>
        <h1>{location.state.lastName}</h1>

        <p className="information">{location.state.description}</p>

        {user != null ? (
          <div className="control">
            <button
              className="btn-data"
              onClick={() => navigate("/placeLabourRequest", { state: location.state })}
            >
           
              <span className="shopping-cart">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              </span>
              <span className="buy">Appoint now!</span>
            </button>
          </div>
        ) : (
          <div className="control">
            <button className="btn-data" onClick={() => navigate("/login")}>
              
              <span className="shopping-cart">
                <i className="fa fa-fw fa-user" aria-hidden="true"></i>
              </span>
              <span className="buy">Sign in</span>
            </button>
          </div>
        )}
      </div>

      <div className="product-image">
      

        <div className="info">
          
        </div>
      </div>
    </div>
	</>
  );
}
