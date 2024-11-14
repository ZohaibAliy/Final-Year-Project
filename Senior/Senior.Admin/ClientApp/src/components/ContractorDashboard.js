import React from "react";
import { MyProject } from "../Api/SeniorApi";
import { useState, useEffect } from "react";
import { Container } from "reactstrap";
import  { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function ContractorDashboard() {
    const navigate = useNavigate();
  const [ischanged, ] = useState(0);
const [Project,setMyProject]= useState([]);
  


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    MyProject(user.id).then((response) => {

      if (response) {
        setMyProject(response);
      }
    });
  }, [ischanged]);
  

    

  return (
    <Container>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="col-xl-12 col-lg-10 mb-4">
        <h2>My Projects</h2>
        <div className="card">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">My Projects</h6>
            <i
                         
                        ></i>
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
                {Project.map(function (data, key) {
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
                        <td> 
                        <a className="btn btn-outline-primary btn-sm mt-2">
                  View Details
                </a>
                </td>
                                <td>
                                <a className="add-btn font-weight-bold text-primary float-left">
                       
                      </a>
                                  
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
   
    </Container>
  );
}
