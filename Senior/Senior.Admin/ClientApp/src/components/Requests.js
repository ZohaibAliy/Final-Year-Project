import React from "react";
import { CheckMyOrders,ChangeOrder } from "../Api/SeniorApi";
import { CheckMyLabourRequest,ChangeLabourRequest } from "../Api/SeniorApi";
import { useState, useEffect } from "react";
import { Container } from "reactstrap";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-bootstrap/Modal";


export default function Home() {
    const [myorders, setMyOrders] = useState([]);
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
    CheckMyOrders(user.id).then((response) => {

      if (response) {
        setMyOrders(response);
      }
    });
  }, [ischanged]);

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
        const handleLabourSubmit = (event) => {
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
        }
  const UpdateState = (data) => {
    
setId(data.id);
    setName(data.customerName);
    setEmail(data.customerEmail);
    setAddress(data.address);
    setModelOpen(true);
  };
    const handleSubmit = (event) => {
      event.preventDefault();
      ChangeOrder(id, name,email,address).then(
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
    <>


      <div className="parallax">

      <div className="main-header row text-center  ">
              <div className="col-lg-6 m-auto ">
                <h1 className="h1" id="paralex-text-heading"></h1>
                <p className="Feature-text">
                <strong><h1>Ittehad Group</h1></strong>

                </p>
              </div>
            </div>


      </div>
        
    <Container>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="col-xl-12 col-lg-10 mb-4">
        <h2>My Equipment Request</h2>
        <div className="card">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">My Equipment Request</h6>
        
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
                {myorders.map(function (data, key) {
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
                                      onClick={() => UpdateState(data)}
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
     
    <Container>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="col-xl-12 col-lg-10 mb-4">
        <h2>My Labour Request</h2>
        <div className="card">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">My Labour Request</h6>
        
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
        

        <footer className="bg-dark" id="tempaltemo_footer">
<div className="container">
    <div className="row">

        <div className="col-md-6 pt-5">
            <h2 className="h2  border-bottom pb-3 border-light " id="logo-txt">Ittehad Group</h2>
            <ul className="list-unstyled text-light footer-link-list">
                <li>
                    <i className="fas fa-map-marker-alt fa-fw"></i>
                    
                </li>
                <li>
                    <i className="fa fa-phone fa-fw"></i>
                    <a className="text-decoration-none" href="tel:010-020-0340">+39 02 96416710</a>
                </li>
                  <li>
                    <i className="fa fa-phone fa-fw"></i>
                    <a className="text-decoration-none" href="tel:010-020-0340">+39 02 96416711</a>
                </li>
             
            </ul>
        </div>

        <div className="col-md-6 pt-5">
            <h2 className="h2 text-light border-bottom pb-3 border-light">Products</h2>
            <ul className="list-unstyled text-light footer-link-list">
                <li><a className="text-decoration-none" href="#">Crawler Excavator</a></li>
                <li><a className="text-decoration-none" href="#">CAT Bulldozer Dozer</a></li>
                <li><a className="text-decoration-none" href="#">Transportation Trucks</a></li>
            
            </ul>
        </div>



    </div>

    <div className="row text-light mb-4">
        <div className="col-12 mb-3">
            <div className="w-100 my-3 border-top border-light"></div>
        </div>
        <div className="col-auto me-auto">
            <ul className="list-inline text-left footer-icons">
                <li className="list-inline-item border border-light rounded-circle text-center">
                    <a className="text-light text-decoration-none" target="_blank" href="http://facebook.com/"><i className="fa fa-facebook-f fa-lg fa-fw"></i></a>
                </li>
                <li className="list-inline-item border border-light rounded-circle text-center">
                    <a className="text-light text-decoration-none" target="_blank" href="https://www.instagram.com/"><i className="fa fa-instagram fa-lg fa-fw"></i></a>
                </li>
                <li className="list-inline-item border border-light rounded-circle text-center">
                    <a className="text-light text-decoration-none" target="_blank" href="https://twitter.com/"><i className="fa fa-twitter fa-lg fa-fw"></i></a>
                </li>
                <li className="list-inline-item border border-light rounded-circle text-center">
                    <a className="text-light text-decoration-none" target="_blank" href="https://www.linkedin.com/"><i className="fa fa-linkedin fa-lg fa-fw"></i></a>
                </li>
            </ul>
        </div>
        <div className="col-auto">
            <label className="sr-only" for="subscribeEmail">Email address</label>
            <div className="input-group mb-2">
                <input type="text" className="form-control bg-dark border-light" id="subscribeEmail" placeholder="Email address"/>
                <div className="input-group-text btn-success text-light">Subscribe</div>
            </div>
        </div>
    </div>
</div>

<div className="w-100 bg-black py-3">
    <div className="container">
        <div className="row pt-2">
            <div className="col-12">
                <p className="footer-coprright-text text-left text-light">
                    Copyright &copy; 2022 FYP Project
                    | Designed by <a rel="sponsored" target="_blank">Zohaib Ali & Iqra Zainab</a>
                </p>
            </div>
        </div>
    </div>
</div>

</footer>
      
    </>
  );
}
