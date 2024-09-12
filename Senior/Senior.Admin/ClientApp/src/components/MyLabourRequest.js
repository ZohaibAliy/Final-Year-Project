import React from "react";
import { CheckMyLabourRequest,ChangeLabourRequest } from "../Api/SeniorApi";
import { useState, useEffect } from "react";
import { Container } from "reactstrap";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-bootstrap/Modal";

export default function MyLabourRequest() {
  const [MyLabourRequest, setMyLabourRequest] = useState([]);
  const [ischanged, setischanged] = useState(0);
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  
  const [modelOpen, setModelOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    CheckMyLabourRequest(user.id).then((response) => {

      if (response) {
        setMyLabourRequest(response);
      }
    });
  }, [ischanged]);
  const UpdateStates = (data) => {
    
setId(data.id);
    setName(data.customerName);
    setEmail(data.customerEmail);
    setAddress(data.address);
    setModelOpen(true);
  };
    const handleSubmit = (event) => {
      event.preventDefault();
      ChangeLabourRequest(id, name,email,address).then(
        (response) => {
          if (response.isRequestSuccessful) {
            toast.success(response.successResponse);
            setModelOpen(false);
            setischanged(ischanged+1)
          } else if (!response.isRequestSuccessful) {
            toast.error(response.successResponse);
          }

          console.log(response);
        }
      );
    
  };
  return (
    <Container>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="col-xl-12 col-lg-10 mb-4">
        <h2>My Request</h2>
        <div className="card">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">My Request</h6>
        
          </div>
          <div className="table-responsive">
            <table className="table align-items-center table-flush">
              <thead className="thead-light">
                <tr>
                  <th>Request ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {MyLabourRequest.map(function (data, key) {
                  return (
                    <>
                      <tr>
                        <td>
                          <a>{data.id}</a>
                        </td>

                        <td>{data.customerName}</td>
                        <td>{data.customerEmail}</td>
                        <td>{data.address}</td>

                        <td action-td>
                          <strong>{data.status}</strong>
                        </td>
                                <td>
                                  {data.status==="Pending"?(  <button
                                      type="button"
                                      className="btn-up btn-primary"
                                      onClick={() => UpdateStates(data)}
                                    >
                                      Update
                                    </button>):('No Action')}
                                  
                                  </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
      <Modal show={modelOpen}>
        <Modal.Header>
          <h2>Order</h2>
          <h2 className="float-left close-btn" onClick={() => setModelOpen(false)}>
          <i class="fa fa-times" aria-hidden="true"></i>
          </h2>
        </Modal.Header>
        <Modal.Body>
          <form className="flex-c" onSubmit={handleSubmit}>
            <div className="input-box">
              <span className="label">Name</span>
              <div className=" flex-r input">
                <input
                  name="name"
                  type="text"
                  maxlength="256"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g John"
                />
              </div>
            </div>
            <div className="input-box">
              <span className="label">E-mail</span>
              <div className=" flex-r input">
                <input
                  name="email"
                  type="email"
                  maxlength="500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@abc.com"
                />
              </div>
            </div>

            <div className="input-box">
              <span className="label">address</span>
              <div className=" flex-r input">
                <input
                  name="address"
                  type="text"
                  maxlength="256"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder="e.g Doe"
                />
              </div>
            </div>
        
 

      
         
              <input className="btn-up" type="submit" value="Update" />
          
          </form>
        </Modal.Body>
      
      </Modal>
    </Container>
  );
}
