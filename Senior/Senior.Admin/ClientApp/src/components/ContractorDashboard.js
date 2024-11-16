import React, { useState, useEffect } from "react";
import {
  MyProject,
  GetProjectEquipment,
  GetProjectLabour,
  GetLabour,
  GetProducts,
  assignEquipmentToProject,
  assignLabourToProject
} from "../Api/SeniorApi";
import Modal from "react-bootstrap/Modal";
import { Container } from "reactstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ContractorDashboard() {
  const navigate = useNavigate();

  const [Project, setMyProject] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [equipment, setEquipment] = useState([]);
  const [labour, setLabour] = useState([]);
  const [Projectlabour,setProjectlabour] = useState([]);
  const [Products,setproducts] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [addEquipmentModal, setAddEquipmentModal] = useState(false);
  const [addLabourModal, setAddLabourModal] = useState(false);
  const [ischanged, setischanged] = useState(0);

  const CloseModel = () => {
    setModelOpen(false);
    setSelectedProject(null);
    setEquipment([]);
    setLabour([]);
  };
 const handleAddEquipment = async (equipmentItem) => {
  if (!selectedProject) {
    toast.error("No project selected!");
    return;
  }

  try {
    const response = await assignEquipmentToProject(equipmentItem.id, selectedProject.id);
    toast.success(`${equipmentItem.equipmentName} successfully assigned to ${selectedProject.title}!`);
    
    setAddEquipmentModal(false);

    // Refresh equipment list
    const updatedEquipment = await GetProjectEquipment(selectedProject.id);
    setEquipment(updatedEquipment);
    setModelOpen(true);
  } catch (error) {
    if (error.response) {
      console.error("Backend Error Response:", error.response.data);
      toast.error(error.response.data?.message || "Failed to assign equipment to the project.");
    } else {
      console.error("Error:", error.message);
      toast.error("Network error or server is unreachable.");
    }
  }
};
const handleAddLabour = async (labourItem) => {
  if (!selectedProject) {
    toast.error("No project selected!");
    return;
  }

  try {
    // Call the API to assign labor
    await assignLabourToProject(labourItem.id, selectedProject.id);

    // Show success message
    toast.success(
      `${labourItem.firstName} ${labourItem.lastName} successfully assigned to ${selectedProject.title}!`
    );

    // Close the Add Labour modal
    setAddLabourModal(false);

    // Refresh the labour list for the project
    const updatedLabour = await GetProjectLabour(selectedProject.id);
    setLabour(updatedLabour);

    // Ensure the Project Modal is still open
    setModelOpen(true);
  } catch (error) {
    if (error.response) {
      console.error("Backend Error Response:", error.response.data);
      toast.error(
        error.response.data?.message || "Failed to assign labour to the project."
      );
    } else {
      console.error("Error:", error.message);
      toast.error("Network error or server is unreachable.");
    }
  }
};

  
  useEffect(() => {
    GetProducts().then((response) => {
     
      if (response) {
        setproducts(response);
      }
    
    });
  },[ischanged]);
  useEffect(() => {
    GetLabour().then((response) => {
     
      if (response) {
        setLabour(response);
      }
    
    });
  },[ischanged]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      MyProject(user.id).then((response) => {
        if (response) {
          setMyProject(response);
        }
      });
    }
  }, [ischanged]);

  useEffect(() => {
    if (selectedProject && selectedProject.id) {
      GetProjectEquipment(selectedProject.id)
        .then((data) => {
          if (data) setEquipment(data);
        })
        .catch((error) => console.error("Error fetching equipment:", error));
      GetProjectLabour(selectedProject.id)
        .then((data) => {
          if (data) setProjectlabour(data);
        })
        .catch((error) => console.error("Error fetching labour:", error));
    }
  }, [selectedProject]);

  const SelectResources = (project) => {
    setSelectedProject(project);
    setModelOpen(true);
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
        </div>
      </div>

      {/* Main Modal */}
      <Modal show={modelOpen} onHide={CloseModel} size="xl">
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

          {/* Equipment Section */}
          <h2 className="mt-4 d-flex justify-content-between align-items-center">
            Project Equipment
            <button
              className="btn btn-outline-success btn-sm"
              onClick={() => setAddEquipmentModal(true)}
            >
              + Add Equipment
            </button>
          </h2>
          <table className="table align-items-center table-flush">
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>Equipment Name</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.equipmentName}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Labour Section */}
          <h2 className="mt-4 d-flex justify-content-between align-items-center">
            Project Labour
            <button
              className="btn btn-outline-success btn-sm"
              onClick={() => setAddLabourModal(true)}
            >
              + Add Labour
            </button>
          </h2>
          <table className="table align-items-center table-flush">
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Speciality</th>
                <th>PhNumber</th>
                
                <th>Charges</th>
              </tr>
            </thead>
            <tbody>
              {Projectlabour.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.speciality}</td>
                  <td>{item.phNumber}</td>
                  <td>{item.charges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={CloseModel} className="btn btn-secondary">
            Close
          </button>
          <button
            onClick={() => navigate("/Resourses")}
            className="btn btn-primary"
          >
            Submit Resources
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={addEquipmentModal} onHide={() => setAddEquipmentModal(false)} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Add Equipment</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="row">
      {Products.map((item) => (
        <div key={item.id} className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{item.productName}</h5>
              <p className="card-text">{item.description}</p>
              <p className="card-text">
                <strong>Price:</strong> {item.price}
              </p>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleAddEquipment(item)}
              >
                Add to Project
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Modal.Body>
  <Modal.Footer>
    <button
      onClick={() => setAddEquipmentModal(false)}
      className="btn btn-secondary"
    >
      Close
    </button>
  </Modal.Footer>
</Modal>

{/* Add Labour Modal */}
<Modal show={addLabourModal} onHide={() => setAddLabourModal(false)} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Add Labour</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="row">
      {labour.map((item) => (
        <div key={item.id} className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                {item.firstName} {item.lastName}
              </h5>
              <p className="card-text">
                <strong>Speciality:</strong> {item.speciality}
              </p>
              <p className="card-text">
                <strong>Phone:</strong> {item.phNumber}
              </p>
              <p className="card-text">
                <strong>Charges:</strong> {item.charges}
              </p>
              <button
               className="btn btn-primary btn-sm"
               onClick={() => handleAddLabour(item)}
              >
                Add to Project
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Modal.Body>
  <Modal.Footer>
    <button
      onClick={() => setAddLabourModal(false)}
      className="btn btn-secondary"
    >
      Close
    </button>
  </Modal.Footer>
</Modal>
    </Container>
  );
}
