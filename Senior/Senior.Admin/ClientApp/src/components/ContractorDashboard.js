import React, { useState, useEffect } from "react";
import {
  MyProject,
  GetProjectEquipment,
  GetProjectLabour,
  GetLabour,
  GetActiveProducts,
  assignEquipmentToProject,
  assignLabourToProject,
  RemoveProjectEquipment,
  RemoveProjectLabour,
 
} from "../Api/SeniorApi";
import Modal from "react-bootstrap/Modal";
import { Container } from "reactstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ContractorDashboard() {
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(false);
const [itemToDelete, setItemToDelete] = useState(null);
const [deleteType, setDeleteType] = useState(""); // 'equipment' or 'labour'

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
  const [loadingLabour, setLoadingLabour] = useState(false);

  const [submitResourcesModal, setSubmitResourcesModal] = useState(false);
  const [budgetComparisonMessage, setBudgetComparisonMessage] = useState("");

  const handleSubmitResources = () => {
    if (selectedProject) {
      const { expectedBudget, actualBudget } = selectedProject;

      if (actualBudget <= expectedBudget) {
        setBudgetComparisonMessage("Your actual budget is within the expected budget. You can proceed.");
      } else {
        setBudgetComparisonMessage(
          "Your actual budget exceeds the expected budget. Please remove some equipment or labour to continue."
        );
      }

      // Open the Submit Resources Modal
      setSubmitResourcesModal(true);
    } else {
      toast.error("No project selected!");
    }
  };
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
};const handleDelete = async () => {
  try {
    if (deleteType === "equipment") {
      const response = await RemoveProjectEquipment(itemToDelete.id);
      if (response.isRequestSuccessful) {
        toast.success(response.successResponse || "Equipment removed successfully!");

        // Refresh the equipment list
        const updatedEquipment = await GetProjectEquipment(selectedProject.id);
        setEquipment(updatedEquipment);
      } else {
        toast.error(response.errors || "Failed to remove equipment.");
      }
    } else if (deleteType === "labour") {
      const response = await RemoveProjectLabour(itemToDelete.id);
      if (response.isRequestSuccessful) {
        toast.success(response.successResponse || "Labour removed successfully!");

        // Refresh the labour list
        const updatedLabour = await GetProjectLabour(selectedProject.id);
        setProjectlabour(updatedLabour);
      } else {
        toast.error(response.errors || "Failed to remove labour.");
      }
    }
  } catch (error) {
    toast.error("An error occurred while removing the item.");
  } finally {
    setConfirmationModal(false); // Close the confirmation modal
  }
};

const handleAddLabour = async (labourItem) => {
  if (!selectedProject) {
    toast.error("No project selected!");
    return;
  }

  try {
    // Call the API to assign labour
    const response = await assignLabourToProject(labourItem.id, selectedProject.id);
    if (response) {
      toast.success(
        `${labourItem.firstName} ${labourItem.lastName} successfully assigned to ${selectedProject.title}!`
      );

      // Refresh the labour list for the project
      const updatedLabour = await GetProjectLabour(selectedProject.id);
      setProjectlabour(updatedLabour);

      // Close the Add Labour modal
      setAddLabourModal(false);

      // Ensure the Project Modal is still open
      setModelOpen(true);
    } else {
      toast.error("Failed to assign labour to the project.");
    }
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
    GetActiveProducts().then((response) => {
     
      if (response) {
        setproducts(response);
      }
    
    });
  },[ischanged]);
  const openAddLabourModal = async () => {
    setLoadingLabour(true); // Start loading
    try {
      const response = await GetLabour();
      if (response) {
        setLabour(response); // Update labour state
        setAddLabourModal(true); // Open modal
      } else {
        toast.error("Failed to fetch labour data.");
      }
    } catch (error) {
      console.error("Error fetching labour data:", error);
      toast.error("An error occurred while fetching labour data.");
    } finally {
      setLoadingLabour(false); // Stop loading
    }
  };
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
              <li className="list-group-item">Total Budget: {selectedProject.actualBudget}</li>
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
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {equipment.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.equipmentName}</td>
        <td>{item.description}</td>
        <td>{item.price}</td>
        <td>
  <button
    className="btn btn-danger btn-sm"
    onClick={() => {
      setItemToDelete(item);
      setDeleteType("equipment");
      setConfirmationModal(true);
    }}
  >
    Remove Equipment
  </button>
</td>

      </tr>
    ))}
  </tbody>
</table>

         {/* Labour Section */}
<h2 className="mt-4 d-flex justify-content-between align-items-center">
  Project Labour
  <button
    className="btn btn-outline-success btn-sm"
    onClick={openAddLabourModal}
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
      <th>Actions</th>
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
        <td>
  <button
    className="btn btn-danger btn-sm"
    onClick={() => {
      setItemToDelete(item);
      setDeleteType("labour");
      setConfirmationModal(true);
    }}
  >
    Remove Labour
  </button>
</td>

      </tr>
    ))}
  </tbody>
</table>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={CloseModel} className="btn btn-secondary">
            Close
          </button>
          
      <button onClick={handleSubmitResources} className="btn btn-primary">
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

<Modal show={addLabourModal} onHide={() => setAddLabourModal(false)} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Add Labour</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {loadingLabour ? (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    ) : (
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
    )}
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
<Modal show={confirmationModal} onHide={() => setConfirmationModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Deletion</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Are you sure you want to delete this {deleteType}?
    <p>
      <strong>{itemToDelete?.equipmentName || `${itemToDelete?.firstName} ${itemToDelete?.lastName}`}</strong>
    </p>
  </Modal.Body>
  <Modal.Footer>
    <button className="btn btn-secondary" onClick={() => setConfirmationModal(false)}>
      Cancel
    </button>
    <button className="btn btn-danger" onClick={() => handleDelete()}>
      Delete
    </button>
  </Modal.Footer>
</Modal>
<Modal
        show={submitResourcesModal}
        onHide={() => setSubmitResourcesModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Budget Comparison</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{budgetComparisonMessage}</p>
          <div className="d-flex justify-content-between">
            {selectedProject?.actualBudget > selectedProject?.expectedBudget && (
              <button
                className="btn btn-warning"
                onClick={() => setSubmitResourcesModal(false)}
              >
                Modify Resources
              </button>
            )}
           
          </div>
        </Modal.Body>
      </Modal>

    </Container>
  );
}
