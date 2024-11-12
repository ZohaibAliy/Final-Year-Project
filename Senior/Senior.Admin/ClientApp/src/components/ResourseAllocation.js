import React from "react";
import "../style/ruang-admin.min.css";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  GetProducts,
  GetOrders,
  GetUsers,
  UpdateStatus,
  GetLabour
} from "../Api/SeniorApi";
const Managerdashboard = () => {
  const [sidenav, setSidenav] = useState("accordion");
  const [products, setproducts] = useState([]);
  const [order, setorder] = useState([]);
  const [users, setusers] = useState([]);
  const [Labour,setLabour] = useState([])
  const [orderState, setorderState] = useState();
  const [earnings, setearnings] = useState(0);
  const navigate = useNavigate();
  var vearning = 0;
  useEffect(() => {
    GetOrders().then((response) => {
      if (response) {
        setorder(response);
      }
    });
  }, [orderState]);
  useEffect(() => {
    GetProducts().then((response) => {
      if (response) {
        setproducts(response);
      }
    });
    GetLabour().then((response) => {
      if (response) {
        setLabour(response);
      }
    });
    GetUsers().then((response) => {
      if (response) {
        setusers(response);
      }
    });
  }, []);
  useEffect(() => {
    CalculateEarning();
  }, [products]);
  const CalculateEarning = () => {
    {
      order.map((oitem) => {
        {
          products.map((pitem) => {
            if (oitem.productId === pitem.id) {
              vearning = vearning + pitem.price;
              console.log(vearning);
            }
          });
        }
      });
    }
    setearnings(vearning);
  };
  const SidebarHandler = () => {
    console.log(sidenav);
    if (sidenav == "accordion") {
      setSidenav("collapse");
    } else {
      setSidenav("accordion");
    }
  };
  const ChangeStatus = (id, status) => {
    UpdateStatus(id, status).then((response) => {
      console.log(response);
      if (response) {
        toast.success(response.successResponse);
        setorderState(status);
      }
    }
    );
};


  


  return (
    <div id="page-top">
      <Toaster position="top-center" reverseOrder={false} />
      <div id="wrapper">
       
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav
              className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top"
              id="admin-navbar"
            >
         
            </nav>

            <div className="container-fluid" id="container-wrapper">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="./">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Dashboard
                  </li>
                </ol>
              </div>

              <div className="row mb-3">
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-uppercase mb-1">
                            Earnings
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {earnings}/-
                          </div>
                  
                        </div>
                        <div className="col-auto">
                          <i className="fa fa-money fa-2x text-primary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-uppercase mb-1">
                            Total Equipment
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {products.length}
                          </div>
                     
                        </div>
                        <div className="col-auto">
                          <i className="fa fa-shopping-cart fa-2x text-success"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-uppercase mb-1">
                            Total Labour
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {Labour.length}
                          </div>
                     
                        </div>
                        <div className="col-auto">
                          <i className="fa fa-shopping-cart fa-2x text-success"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-uppercase mb-1">
                            Total User
                          </div>
                          <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                            {users.length}
                          </div>
                      
                        </div>
                        <div className="col-auto">
                          <i className="fa fa-users fa-2x text-info"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-uppercase mb-1">
                            Total Request
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {order.length}
                          </div>
                     
                        </div>
                        <div className="col-auto">
                          
                       
                          <i className="fa  fa-truck fa-2x text-warning"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              
                <div className="col-xl-12 col-lg-10 mb-4">
                  <div className="card">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">
                        All Request
                      </h6>
                                  <h6 className="add-btn font-weight-bold text-primary float-left">
              
           
            </h6>
                    </div>
                    <div className="table-responsive">
                      <table className="table align-items-center table-flush">
                        <thead className="thead-light">
                          <tr>
                            <th>Order ID</th>
                            <th>Equipment</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>

                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.map(function (data, key) {
                            return (
                              <>
                                <tr>
                                  <td>
                                    <a>{data.id}</a>
                                  </td>
                                  <td>{data.productName}</td>
                                  <td>{data.customerName}</td>
                                  <td>{data.customerEmail}</td>
                                  <td>{data.address}</td>

                                  <td className="action-td">
                                   
                                      <div className=" flex-r input status-change">
                                        <select
                                        defaultValue={data.status}
                                          className="form-select w-100"
                                          aria-label="Default select example"
                                          onChange={(e) =>
                                            ChangeStatus(
                                              data.id,
                                              e.target.value
                                            )
                                          }
                                        >
                                      
                                          <option value="Pending">
                                            Pending
                                          </option>
                                          <option value="In Progress">
                                            In Progress
                                          </option>
                                          <option value="Completed">
                                            Completed
                                          </option>
                                        </select>
                                      </div>
                                  
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

              </div>
              <div
                className="modal fade"
                id="logoutModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabelLogout"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabelLogout">
                        Ohh No!
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p>Are you sure you want to logout?</p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <a href="login.html" className="btn btn-primary">
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>
                  copyright &copy;{" "}
                  <script> document.write(new Date().getFullYear()); </script> -
                  developed by
                  <b>
                    <a target="_blank">Zohaib Ali & Iqra Zainab</a>
                  </b>
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>

      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fa fa-angle-up"></i>
      </a>
    </div>
  );
};

export default Managerdashboard;
