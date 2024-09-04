import React from "react";
import "../style/ruang-admin.min.css";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import "bootstrap/dist/css/bootstrap.min.css";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  GetProducts,
  ChangeUser,
  GetUsers,
  CreateUser,
  RemoveUser,
} from "../Api/SeniorApi";
export default function UserDashboard() {
  const [sidenav, setSidenav] = useState("accordion");
  const [modelOpen, setModelOpen] = useState(false);
  const [users, setusers] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [ischanged, setischanged] = useState(0);

  const [id, setId] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    GetUsers().then((response) => {
      if (response) {
        setusers(response);
      }
    });
  }, [ischanged]);

  const SidebarHandler = () => {
    if (sidenav == "accordion") {
      setSidenav("collapse");
    } else {
      setSidenav("accordion");
    }
  };

  const AddAdmin = () => {
    if (password != confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      CreateUser(firstName, lastName, email, password, gender, role).then(
        (response) => {
          if (response.isRequestSuccessful) {
            toast.success("Registration Successful!");
            setModelOpen(false);
          } else if (!response.isRequestSuccessful) {
            toast.error(response.successResponse);
          }

          setischanged(ischanged+1);
        }
      );
    }
  };
  const UpdateUser = () => {
    if (password != confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      ChangeUser(id, firstName, lastName, email, password, gender, role).then(
        (response) => {
          if (response.isRequestSuccessful) {
            toast.success(response.successResponse);
            setModelOpen(false);
          } else if (!response.isRequestSuccessful) {
            toast.error(response.successResponse);
          }

          setischanged(ischanged+1);
        }
      );
    }
  };
  const UpdateStates = (data) => {
    setIsUpdate(true);

    setId(data.id);
    setfirstName(data.firstName);
    setlastName(data.lastName);
    setEmail(data.email);
    setGender(data.gender);
    setPassword(data.password);
    setconfirmPassword(data.password);
    setRole(data.role);

    setModelOpen(true);
  };
  const ResetStates = (data) => {
    setfirstName("");
    setlastName("");
    setEmail("");
    setGender("");
    setPassword("");
    setRole("");
    setconfirmPassword("");
    setIsUpdate(false);
    setModelOpen(true);
  };
  const CloseModel = () => {
    setIsUpdate(false);
    setModelOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isUpdate) {
      UpdateUser();
    } else {
      AddAdmin();
    }
  };
  const DeactivateUser = (id) => {
    RemoveUser(id).then(
      (response) => {
      
        if (response.isRequestSuccessful) {
          toast.success(response.successResponse);
          setModelOpen(false);
        } else if (!response.isRequestSuccessful) {
          toast.error(response.successResponse);
        }
          setischanged(ischanged+1);
       

        console.log(response);
      }
    );
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
              <div className="sidebar-brand-text mx-3">SeniorAdmin</div>
            </a>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
              <a className="nav-link" href="index.html">
                <i className="fa fa-fw fa-tachometer-alt"></i>
                <span>Listed User</span>
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
                <span>Dashboard</span>
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
                <span>
                  <strong>User</strong>
                </span>
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
                <h1 className="h3 mb-0 text-gray-800">Listed Users</h1>
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
                        Listed User
                      </h6>
                      <h6 className="add-btn font-weight-bold text-primary float-left">
                      <i
                        class="fa fa-fw fa-plus"
                        onClick={() => ResetStates()}
                      ></i>
                      </h6>
                    </div>
                    <div className="table-responsive">
                      <table className="table align-items-center table-flush">
                        <thead className="thead-light">
                          <tr>
                            <th>User Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Is Active</th>
                            <th>Gender</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map(function (data, key) {
                          
                            return (
                              <>
                                <tr>
                                  <td>
                                    <a>{data.id}</a>
                                  </td>
                                  <td>{data.firstName}</td>
                                  <td>{data.lastName}</td>
                                  <td>{data.email}</td>
                                  <td>{data.role}</td>
                                  <td>{data.isActive ? "True" : "False"}</td>
                                  <td>{data.gender}</td>
                                  <td>
                                 
                                    <button
                                      type="button"
                                      className="btn-up btn-primary"
                                      onClick={() => UpdateStates(data)}
                                    >
                                      <i className="fa fa-fw fa-pencil"></i>
                                    </button>
                                    <br/>
                                    <button type="button" className="btn-rm btn-danger" onClick={()=>DeactivateUser(data.id)}>
                                  <i className="fa fa-fw fa-trash"></i>
</button>
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
      <Modal show={modelOpen}>
        <Modal.Header>
          <h2>User</h2>
          <h2 className="float-left close-btn" onClick={() => CloseModel()}>
          <i class="fa fa-times" aria-hidden="true"></i>
          </h2>
        </Modal.Header>
        <Modal.Body>
          <form className="flex-c" onSubmit={handleSubmit}>
            <div className="input-box">
              <span className="label">First-Name</span>
              <div className=" flex-r input">
                <input
                  name="firstName"
                  type="text"
                  maxlength="100"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  required
                  placeholder="e.g John"
                />
              </div>
            </div>
            <div className="input-box">
              <span className="label">Last-Name</span>
              <div className=" flex-r input">
                <input
                  name="lastName"
                  type="text"
                  maxlength="100"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  required
                  placeholder="e.g Doe"
                />
              </div>
            </div>
            <div className="input-box">
              <span className="label">E-mail</span>
              <div className=" flex-r input">
                <input
                  name="email"
                  type="email"
                  maxlength="256"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@abc.com"
                />
              </div>
            </div>
            <div className="input-box">
              <span className="label">Password</span>
              <div className="flex-r input">
                <input
                  name="password"
                  type="password"
                  minlength="8"
                  placeholder="8+ (a, A, 1, #)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-box">
              <span className="label">Confirm Password</span>
              <div className="flex-r input">
                <input
                  name="confirmPassword"
                  type="password"
                     minlength="8"
                  placeholder="8+ (a, A, 1, #)"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

      
            {gender===""?(
               <div className="input-box">
               <span className="label">Gender</span>
 
               <div className=" flex-r input">
                 <select 
                   className="form-select w-100"
                   aria-label="Default select example"
                   onChange={(e) => setGender(e.target.value)}
                 >
                 <option selected value="">Please select an option:</option>
                   <option value="Male">Male</option>
                   <option value="Female">Female</option>
                   <option value="Others">Others</option>
                 </select>
               </div>
             </div>
 
            ):(
              <div className="input-box">
              <span className="label">Gender</span>

              <div className=" flex-r input">
                <select defaultValue={gender}
                  className="form-select w-100"
                  aria-label="Default select example"
                  onChange={(e) => setGender(e.target.value)}
                >
                
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            )}
            {role===""?(
                   <div className="input-box">
                   <span className="label">Role</span>
     
                   <div className=" flex-r input">
                     <select
                  
                    
                       className="form-select w-100"
                       aria-label="Default select example"
                       onChange={(e) => setRole(e.target.value)}
                     >
                     <option selected value="">Please select an option:</option>
                       <option value="Contractor">Contractor</option>
                       <option value="Admin">Admin</option>
                     </select>
                   </div>
                 </div>
            ):(
              <div className="input-box">
              <span className="label">Role</span>

              <div className=" flex-r input">
                <select
             
                defaultValue={role}
                  className="form-select w-100"
                  aria-label="Default select example"
                  onChange={(e) => setRole(e.target.value)}
                >
               
                  <option value="Contractor">Contractor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            )}
       
            {isUpdate ? (
              <input className="btn" type="submit" value="Update" />
            ) : (
              <input className="btn" type="submit" value="Add User" />
            )}
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
