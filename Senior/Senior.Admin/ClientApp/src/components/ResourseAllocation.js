import React, { useState, useEffect, useRef } from "react";
import "../style/ruang-admin.min.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  GetProducts,
  GetOrders,
  GetUsers,
  UpdateStatus,
  GetLabour,
  GetLabourRequest
} from "../Api/SeniorApi";
import { useReactToPrint } from 'react-to-print';

const Managerdashboard = () => {
  const [products, setproducts] = useState([]);
  const [LabourRequest, setLabourRequest] = useState([]);
  const [order, setorder] = useState([]);
  const [users, setusers] = useState([]);
  const [Labour, setLabour] = useState([]);
  const navigate = useNavigate();
  const [earnings, setearnings] = useState(0);
  const printRef = useRef(); // Ref for print section
  React.useEffect(() => {
    console.log(printRef.current); // This should log the HTML element you want to print
  }, []);
  
  
  useEffect(() => {
    GetOrders().then((response) => {
      if (response) setorder(response);
    });
  }, []);

  useEffect(() => {
    GetLabourRequest().then((response) => {
      if (response) setLabourRequest(response);
    });
  }, []);

  useEffect(() => {
    GetProducts().then((response) => {
      if (response) setproducts(response);
    });
    GetLabour().then((response) => {
      if (response) setLabour(response);
    });
    GetUsers().then((response) => {
      if (response) setusers(response);
    });
  }, []);

  useEffect(() => {
    CalculateEarning();
  }, [products]);

  const CalculateEarning = () => {
    let vearning = 0;
    order.forEach((oitem) => {
      products.forEach((pitem) => {
        if (oitem.productId === pitem.id) {
          vearning += pitem.price;
        }
      });
    });
    setearnings(vearning);
  };

  const ChangeStatus = (id, status) => {
    UpdateStatus(id, status).then((response) => {
      if (response) {
        toast.success(response.successResponse);
      }
    });
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Manager Dashboard Report",
  });

  return (
    <div id="page-top">
      <Toaster position="top-center" reverseOrder={false} />
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid" id="container-wrapper">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Manager Dashboard</h1>
                {/* Print Button */}
                <button onClick={()=>navigate('/printresourses')}>Print Report</button>
              </div>

              {/* Dashboard Content to Print */}
              <div ref={printRef}>
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
                  {/* Additional Cards for Total Equipment, Labour, User, and Requests */}
                </div>

                {/* Orders Table */}
                <div className="col-xl-12 col-lg-10 mb-4">
                  <div className="card">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">
                        All Request
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
                          {order.map((data) => (
                            <tr key={data.id}>
                              <td>{data.id}</td>
                              <td>{data.productName}</td>
                              <td>{data.customerName}</td>
                              <td>{data.customerEmail}</td>
                              <td>{data.address}</td>
                              <td className="action-td">
                                <select
                                  defaultValue={data.status}
                                  className="form-select w-100"
                                  onChange={(e) =>
                                    ChangeStatus(data.id, e.target.value)
                                  }
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* End of content to print */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Managerdashboard;
