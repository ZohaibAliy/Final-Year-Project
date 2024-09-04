import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { OrderPlace } from "../Api/SeniorApi";

import "../style/placeorder.css";

export default function PlaceOrder() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const [address, setAddress] = useState("");
  const [customername, setcustomername] = useState(user.firstName + " " + user.lastName);
  const navigate = useNavigate();

  const [data, setData] = useState({});

  const handleSubmit = (event) => {
    setData({
      productId: location.state.id,
      userId: user.id,
      address: address,
      productName: location.state.productName,
      customerName: user.firstName + " " + user.lastName,
      customerEmail: user.email,
    });


    OrderPlace(location.state.id,user.id,address,location.state.productName,customername,user.email).then((response) => {
      if (response.isRequestSuccessful) {
        toast.success(response.successResponse);
        navigate("/myorders");
      } else if (!response.isRequestSuccessful) {
        toast.error(response.successResponse);
      }

      console.log(response);
    });
    event.preventDefault();
  };
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="form ">
        <div className=" flex-r container">
          <div className="flex-r login-wrapper">
            <div className="login-text">
              <div className="logo">
                <h2 className="form-header">Checkout.</h2>
                <p className="form-header">
                  <strong>Customer Name: </strong>
                  {user.firstName} {user.lastName}
                </p>
                <p className="form-header">
                  <strong>Product Name: </strong>
                  {location.state.productName}
                </p>
                <p className="form-header">
                  <strong>Cost: </strong>${location.state.price}
                </p>
                <p className="form-header">
                  <strong>Description: </strong>
                  {location.state.description}
                </p>
              </div>
              <form className="flex-c" onSubmit={handleSubmit}>
                <div className="input-box">
                  <span className="label">Address</span>
                  <div className=" flex-r input">
                    <input
                      name="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      placeholder="Address"
                    />
                    <i className="fa fa-at"></i>
                  </div>
                </div>

                <div className="check">
                  <input type="checkbox" name="" id="" required />
                  <span>I've read and agree with T&C</span>
                </div>

                <input className="btn" type="submit" value="Place Order" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
