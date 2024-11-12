import React from "react";
import Modal from "react-bootstrap/Modal";
import "../style/ruang-admin.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  GetProject,
  UpdateProject,
  UploadProject,
  RemoveProject,
} from "../Api/SeniorApi";
export default function ProjectDashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const [sidenav, setSidenav] = useState("accordion");
  const [ischanged, setischanged] = useState(0);
    const [isadd, setisadd] = useState(0);
  const [project, setproject] = useState([]);
  const [id, setId] = useState();
  const [title, settitle] = useState();
  const [description, setDescription] = useState();
  const [location, setlocation] = useState();
  const [startDate, setstartDate] = useState();
  const [endDate, setendDate] = useState();
  const [expectedBudget,setexpectedBudget]=useState();
  const [ContractorName,setContractorName]=useState();
  const [userid,setuserid]=useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    GetProject().then((response) => {
     
      if (response) {
        setproject(response);
      }
    
    });
  },[ischanged]);

  const SidebarHandler = () => {
    if (sidenav == "accordion") {
      setSidenav("collapse");
    } else {
      setSidenav("accordion");
    }
  };

  const UpdateStates = (data) => {
    setIsUpdate(true);
    setId(data.id);
    settitle(data.title);
    setlocation(data.location);
    setstartDate(data.startDate);
    setendDate(data.endDate);
    setexpectedBudget(data.expectedBudget);
    setContractorName(data.ContractorName);
    
    setuserid(data.userid);
    

    setModelOpen(true);
  };
  const ResetStates = (data) => {
    setId(null);
    settitle("");
    setDescription("");
    setlocation(null);
    setstartDate("");
    setendDate(null);
    setexpectedBudget(false);
    setuserid(null);
    setContractorName("");
    setModelOpen(true);
  };
  const UpdateProject = () => {

    const res=UpdateProject(id, title, description, location, startDate,endDate,expectedBudget,ContractorName, userid);
 
      toast.success("Project update Succesful!");
      setIsUpdate(false);
   

    setischanged(ischanged + 2);
  

setModelOpen(false);

         
   
  };

  const CloseModel = () => {
    setIsUpdate(false);
    setModelOpen(false);
  };
  const AddProject = () => {
    setisadd(isadd+1)
    UploadProject(title, description, location, startDate,endDate,expectedBudget, userid,ContractorName);
          toast.success("Project added!");
          setIsUpdate(false);
          
      
    setModelOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isUpdate) {
      UpdateProject();
    
    } else {
      AddProject();
    }
  };
  const DeactivateProject = (id) => {
    RemoveProject(id).then((response) => {
      if (response.isRequestSuccessful) {
        toast.success(response.successResponse);
        setModelOpen(false);
      } else if (!response.isRequestSuccessful) {
        toast.error(response.successResponse);
      }
      setischanged(ischanged + 1);
    });
  };

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
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
                <span>Project</span>
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
                <span>
                  <strong>Equipment</strong>
                </span>
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
                onClick={() => navigate("/Labourtable")}
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
                <h1 className="h3 mb-0 text-gray-800">Listed Products</h1>

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
                <div className="col-xl-12 col-lg-10 mb-4 justify-content-center">
                  <div className="card">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="mx-3 font-weight-bold text-primary">
                        Listed Project
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
                            <th>id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>StartDate</th>
                            <th>EndDate</th>
                            <th>ExpectedBudget</th>
                            <th>Contractorid</th>
                            <th>Contrator</th>
                            
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.map(function (data, key) {
                            let image = "data:image/jpeg;base64," + data.image;
                            return (
                              <>
                                <tr>
                                  <td>{data.id}</td>
                                  <td>{data.title}</td>
                                  <td>{data.description}</td>
                                  <td>{data.location}</td>
                                  <td>{data.startDate}</td>
                                  <td>{data.endDate}</td>
                                  <td>{data.expectedBudget}</td>
                                    <th>{data.userid}</th>
                                  <td>{data.contractorName}</td>

                                  <td>
                                    <button
                                      type="button"
                                      className="btn-up btn-primary"
                                      onClick={() => UpdateStates(data)}
                                    >
                                      <i className="fa fa-fw fa-pencil"></i>
                                    </button>
                                    <button
                                      type="button"
                                      className="btn-rm btn-danger"
                                      onClick={() => DeactivateProject(data.id)}
                                    >
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
          <h2>Projects</h2>
          <h2 className="float-left close-btn" onClick={() => CloseModel()}>
          <i class="fa fa-times" aria-hidden="true"></i>
          </h2>
        </Modal.Header>
        <Modal.Body>
          <form className="flex-c" onSubmit={handleSubmit}>
            <div className="input-box">
              <span className="label">Title</span>
              <div className=" flex-r input">
                <input
                  name="productName"
                  type="text"
                  maxlength="50"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                  required
                  placeholder="e.g Kohistan bridge"
                />
              </div>
            </div>
            <div className="input-box">
              <span className="label">Description</span>
              <div className=" flex-r input">
                <textarea
                  name="description"
                  type="textarea"
                  maxlength="500"
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g This Product will....."
                  required
                />
              </div>
            </div>

            <div className="input-box">
              <span className="label">Location</span>
              <div className=" flex-r input">
                <input
                  name="quantity"
                  type="number"
                  value={location}
                  onChange={(e) => setlocation(e.target.value)}
                  placeholder="Kohistan inclaves"
                  required
                />
              </div>
            </div>
            <div className="input-box">
              <span className="label">StartDate</span>
              <div className=" flex-r input">
                <input
                  name="price"
                  type="number"
                  value={startDate}
                  onChange={(e) => setstartDate(e.target.value)}
                  required
                  placeholder="20/10/2024"
                />
              </div>
            </div>
            
              <div className="input-box">
                <span className="label">enddate</span>
                <div className="flex-r input">
                  <input
                    required
                    name="number"
                    type="file"
                    onChange={(e) => setendDate(e.target.value)}
                    
                  placeholder="20/10/2025"
                  />
                </div>
              </div>
              <div className="input-box">
                <span className="label">Contractor Name</span>
                <div className="flex-r input">
                  <input
                    required
                    name="number"
                    type="file"
                    onChange={(e) => setContractorName(e.target.value)}
                    
                  placeholder="Riaz Ahmed"
                  />
                </div>
              </div>
            
              

            {isUpdate ? (
              <input className="btn" type="submit" value="Update" />
            ) : (
              <input className="btn" type="submit" value="Add Product" />
            )}
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
