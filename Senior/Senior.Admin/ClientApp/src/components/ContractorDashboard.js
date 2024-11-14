import React, { useState, useEffect } from "react";
import { MyProject,GetProjectEquipment } from "../Api/SeniorApi";
import Modal from "react-bootstrap/Modal";
import { Container } from "reactstrap";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ContractorDashboard() {
  const navigate = useNavigate();
  const [ProjectEquipment,setProjectEquipment]= useState([]);
  const [ischanged] = useState(0);
  const [modelOpen, setModelOpen] = useState(false);
  const [Project, setMyProject] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const SelectResources = (project) => {
    setSelectedProject(project);  // Set the selected project
    setModelOpen(true);           // Open the modal
  };

  const CloseModel = () => {
    setModelOpen(false);
    setSelectedProject(null);  // Clear selected project on close
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    MyProject(user.id).then((response) => {
      if (response) {
        setMyProject(response);
      }
    });
  }, [ischanged]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(Project);
    GetProjectEquipment(Project.id).then((response) => {

      if (response) {
        setProjectEquipment(response);
      }
    });
  }, [ischanged]);
  const DeactivateProduct = (id) => {
   

  };

  return (
    <Container>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="col-xl-12 col-lg-10 mb-4">
        <h2>My Projects</h2>
        <div className="card">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">My Projects</h6>
          </div>
          <div className="table-responsive">
            <table className="table align-items-center table-flush">
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>StartDate</th>
                  <th>EndDate</th>
                  <th>ExpectedBudget</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Project.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.title}</td>
                    <td>{data.description}</td>
                    <td>{data.location}</td>
                    <td>{data.startDate}</td>
                    <td>{data.endDate}</td>
                    <td>{data.expectedBudget}</td>
                    <td>
                      <button
                        onClick={() => SelectResources(data)}
                        className="btn btn-outline-primary btn-sm mt-2"
                      >
                        Select Resources
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
      
        <Modal show={modelOpen} onHide={CloseModel}>
          <Modal.Header closeButton>
            <Modal.Title>Project Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {selectedProject && (
            <ul className="list-group">
              <li className="list-group-item disabled">Project Detail</li>
              <li className="list-group-item">Title: {selectedProject.title}</li>
              <li className="list-group-item">Location: {selectedProject.location}</li>
              <li className="list-group-item">Description: {selectedProject.description}</li>
              <li className="list-group-item">EndDate: {selectedProject.endDate}</li>
              <li className="list-group-item">Expected Budget: {selectedProject.expectedBudget}</li>
            </ul>
            )}
            <div className="col-xl-12 col-lg-10 mb-4">
        <h2>My Equipment</h2>
        <div className="card">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">My Projects</h6>
          </div>
          <div className="table-responsive">
            <table className="table align-items-center table-flush">
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Equipment Name</th>
                  <th>Description</th>
                  <th>Price</th>
                 
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ProjectEquipment.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.equipmentName}</td>
                    <td>{data.description}</td>
                    <td>{data.price}</td>
                    
                    <td>
                    <button
                                      type="button"
                                      className="btn-rm btn-danger"
                                      onClick={() => DeactivateProduct(data.id)}
                                    >
                                      <i className="fa fa-fw fa-trash"></i>
                                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={CloseModel} className="btn btn-secondary">
              Close
            </button>
          </Modal.Footer>
        </Modal>
      
    </Container>
  );
}
