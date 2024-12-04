import React from "react";
import Modal from "react-bootstrap/Modal";
import "../style/ruang-admin.min.css";
import {  Toast } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import toast, { Toaster } from "react-hot-toast";
import {
  GetProducts,
  UpdateProducts,
  UploadProducts,
  RemoveProduct,
  ActivateProducts,
  GetUnactiveProducts
} from "../Api/SeniorApi";
export default function EquipmentDashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const [sidenav, setSidenav] = useState("accordion");
  const [ischanged, setischanged] = useState(0);
  const [Ischanged,setIsChanged]=useState(0);
    const [isadd, setisadd] = useState(0);
  const [products, setproducts] = useState([]);
  const [id, setId] = useState();
  const [productname, setProductname] = useState();
  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [unactiveProduct, setunactiveproduct] = useState([]);
  const [ActivateProduct,setActivateProduct] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // For loading state when activating
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);


  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmActivateModalOpen,setConfirmActiveModalOpen]=useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    GetProducts().then((response) => {
     
      if (response) {
        setproducts(response);
      }
    
    });
  },[ischanged]);
useEffect(()=>{
  GetUnactiveProducts().then((response)=>
  {
    if(response){
      setunactiveproduct(response);
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
  
  
  const ActivateEquipment = (id) => {
    ActivateProduct(id).then((response) => {
      if (response.isRequestSuccessful) {
        toast.success(response.successResponse);
        setModelOpen(false);
      } else if (!response.isRequestSuccessful) {
        toast.error(response.successResponse);
      }
      setischanged(ischanged - 1);
    });
  };
  
  const handleActivateClick = (id) => {
    setSelectedProductId(id);
    setConfirmModalOpen(true); // Open confirmation modal
  };
  const confirmActivation = () => {
    if (selectedProductId) {
      ActivateEquipment(selectedProductId);
    }
    
    setConfirmModalOpen(false); // Close modal
    setSelectedProductId(null);
  };
  
  const cancelActivation = () => {
    setConfirmModalOpen(false); // Close modal without action
    setSelectedProductId(null);
  };
  const handleDeactivateClick = (id) => {
    setSelectedProductId(id);
    setConfirmModalOpen(true); // Open confirmation modal
  };

  
 
  // Close modal and reset state
  const closeModal = () => {
    closeInactiveModal();
    setSelectedProductId(null);
  };

  const UpdateStates = (data) => {
    setIsUpdate(true);
    setId(data.id);
    setProductname(data.productName);
    setPrice(data.price);
    setQuantity(data.quantity);
    setDescription(data.description);
    setImage(dataURLtoFile("data:image/jpeg;base64," + data.image));

    setModelOpen(true);
  };
  const ResetStates = (data) => {
    setId(null);
    setProductname("");
    setPrice(null);
    setQuantity(null);
    setDescription("");
    setImage(null);
    setIsUpdate(false);
    setModelOpen(true);
  };
  const UpdateProduct = () => {

    const res=UpdateProducts(id, productname, price, quantity, description, image);
 
      toast.success("Product update Succesful!");
      setIsUpdate(false);
   

    setischanged(ischanged + 2);
  

setModelOpen(false);

         
   
  };

  const CloseModel = () => {
    setIsUpdate(false);
    setModelOpen(false);
  };
  const AddProduct = () => {
    setisadd(isadd+1)
    UploadProducts(productname, price, quantity, description, image);
          toast.success("Product added!");
          setIsUpdate(false);
          
      
    setModelOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isUpdate) {
      UpdateProduct();
    
    } else {
      AddProduct();
    }
  };
  const showInactiveProducts = () => {
    setModelOpen(true); // Open the modal
  };
  const closeInactiveModal = () => {
    setModelOpen(false); // Close the modal
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
                <span>Equipment</span>
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
                <h1 className="h3 mb-0 text-gray-800">Listed Equipment</h1>

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
                        Listed Equipment
                      </h6>
                      <div className="d-flex align-items-center">
                  
                       
                            </div>
                       

                    </div>
                    <div className="table-responsive">
                      <table className="table align-items-center table-flush">
                        <thead className="thead-light">
                          <tr>
                            <th>Image</th>
                            <th>Equipment Name</th>
                            <th>Price "per week"</th>
                            <th>Available Quantity</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map(function (data, key) {
                            let image = "data:image/jpeg;base64," + data.image;
                            return (
                              <>
                                <tr>
                                  <td className="align-middle">
                                    <a>
                                      {" "}
                                      <img
                                        src={image}
                                        className=" thumbnail rounded-circle  border  justifycenter"
                                      />
                                    </a>
                                  </td>
                                  <td>{data.productName}</td>
                                  <td>{data.price}</td>
                                  <td>{data.quantity}</td>
                                  <td>{data.description}</td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn-rm btn-danger"
                                      onClick={() => handleActivateClick(data.id)}
                                     >
                                     <i className="fa fa-fw fa-archive"></i>
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
      <Modal show={confirmModalOpen} onHide={cancelActivation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Activation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to Activate this product?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelActivation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmActivation}>
            Activate
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Toast message to show success or error */}
      {toastMessage && (
        <Toast
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 9999,
          }}
          onClose={() => setToastMessage(null)}
          show={!!toastMessage}
          delay={3000}
          autohide
        >
          <Toast.Body
            style={{
              backgroundColor: toastType === 'success' ? '#28a745' : '#dc3545',
              color: '#fff',
            }}
          >
            {toastMessage}
          </Toast.Body>
        </Toast>
      )}

   </div>
  );
}
