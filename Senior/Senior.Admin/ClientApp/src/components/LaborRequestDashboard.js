import React from "react";
import "../style/ruang-admin.min.css";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import {
  GetLabour,
  GetLabourRequest,
  UpdateRequestStatus,

} from "../Api/SeniorApi";
export default function OrderDashboard() {
    const [sidenav, setSidenav] = useState("accordion");
    const [LabourRequestState, setLabourRequestState] = useState();
    const navigate = useNavigate();
    const [LabourRequest, setLabourRequeest] = useState([]);
  
  
    useEffect(() => {
  

      GetLabourRequest().then((response) => {
        console.log(response);
        if (response) {
          setLabourRequeest(response);
        }
      });

    }, [LabourRequestState]);

    const SidebarHandler = () => {
      if (sidenav == "accordion") {
        setSidenav("collapse");
      } else {
        setSidenav("accordion");
      }
    };
    const ChangeRequestStatus = (id,status) => {
      UpdateRequestStatus(id,status).then((response) => {
        console.log(response);
        if (response) {
          toast.success(response.successResponse);
          setLabourRequestState(status);
        }
      });
    };
  
  return (
    <div id="page-top">
    <Toaster position="top-center" reverseOrder={false} />
    <div id="wrapper">
    <div className={sidenav}>
          <ul
            className="navbar-nav sidebar sidebar-light "
            id="accordionSidebar"
          >
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="index.html"
            >
              <div className="sidebar-brand-icon"></div>
              <div className="sidebar-brand-text mx-3">Admin</div>
            </a>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
              <a className="nav-link" href="index.html">
                <i className="fa fa-fw fa-tachometer-alt"></i>
                <span>Labour Request</span>
              </a>
            </li>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">Features</div>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                onClick={() => navigate("/admindashboard")}
                data-toggle="collapse"
                data-target="#collapseBootstrap"
                aria-expanded="true"
                aria-controls="collapseBootstrap"
              >
                <i className="fa fa-fw fa-window-maximize"></i>
                <span>
                  <strong>Dashboard</strong>
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                onClick={() => navigate("/producttable")}
                data-toggle="collapse"
                data-target="#collapseBootstrap"
                aria-expanded="true"
                aria-controls="collapseBootstrap"
              >
                 <i className="fa fa-fw fa-shopping-cart"></i>
                <span>Equipment</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                onClick={() => navigate("/ordertable")}
                data-toggle="collapse"
                data-target="#collapseBootstrap"
                aria-expanded="true"
                aria-controls="collapseBootstrap"
              >
                 <i className="fa fa-fw fa-truck"></i>
              
                <span>Order</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                onClick={() => navigate("/LabourRequesttable")}
                data-toggle="collapse"
                data-target="#collapseBootstrap"
                aria-expanded="true"
                aria-controls="collapseBootstrap"
              >
                 <i className="fa fa-fw fa-truck"></i>
              
                <span>LabourRequest</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                onClick={() => navigate("/usertable")}
                data-toggle="collapse"
                data-target="#collapseBootstrap"
                aria-expanded="true"
                aria-controls="collapseBootstrap"
              >
                <i className="fa fa-fw Example of users fa-users"></i>
                <span>User</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                onClick={() => navigate("/Labourtable")}
                data-toggle="collapse"
                data-target="#collapseBootstrap"
                aria-expanded="true"
                aria-controls="collapseBootstrap"
              >
                <i className="fa fa-fw Example of users fa-users"></i>
                <span>Labour</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                onClick={() => navigate("/projecttable")}
                data-toggle="collapse"
                data-target="#collapseBootstrap"
                aria-expanded="true"
                aria-controls="collapseBootstrap"
              >
                <i className="fa fa-fw Example of users fa-users"></i>
                <span>Project</span>
              </a>
            </li>

            <div className="version" id="version-ruangadmin"></div>
          </ul>
        </div>
        
       
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <nav
            className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top"
            id="admin-navbar"
          >
            <button
              id="sidebarToggleTop"
              className="btn btn-link  mr-3"
              onClick={() => SidebarHandler()}
            >
              <i className="fa fa-bars"></i>
            </button>
          </nav>

          <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Orders</h1>
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
       
          
              <div className="col-xl-12 col-lg-10 mb-4">
                <div className="card">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                      All Orders
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
                        {LabourRequest.map(function (data, key) {
                          return (
                            <>
                              <tr>
                                <td>
                                  <a>{data.id}</a>
                                </td>
                                <td>{data.labourName}</td>
                                  <td>{data.customerName}</td>
                                  <td>{data.customerEmail}</td>
                                  <td>{data.address}</td>
                                  <td className="action-td">
                               
               

                  <div className=" flex-r input status-change">
                    <select
                      className="form-select w-100"
                      defaultValue={data.status}
                      aria-label="Default select example"
                      onChange={(e) =>
                        ChangeRequestStatus(data.id,e.target.value)
                      }
                    >
             
                      <option value="Pending" >Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
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
}
