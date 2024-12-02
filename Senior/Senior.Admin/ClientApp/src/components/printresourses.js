import React, { useState, useEffect, useRef } from "react";
import "../style/ruang-admin.min.css";
import { GetOrders } from "../Api/SeniorApi";

const Managerdashboard = () => {
  const [order, setOrder] = useState([]); // Store orders
  const printRef = useRef(); // Ref for the section to be printed

  // Fetch orders from the backend using useEffect
  useEffect(() => {
    GetOrders().then((response) => {
      if (response) setOrder(response); // Set orders from the response
    });
  }, []);

  // Print handler using window.print()
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const content = printRef.current.innerHTML;

    // Create print content
    printWindow.document.write(`
      <html>
        <head>
          <title>Orders Table</title>
          <style>
            body { font-family: Arial, sans-serif; font-size: 12pt; margin: 0; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px; border: 1px solid #ddd; }
            th { background-color: #f2f2f2; }
            h2 { text-align: center; }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <h2>Orders Table</h2>
          <div>${content}</div>
        </body>
      </html>
    `);
    printWindow.document.close(); // Close the document
    printWindow.print(); // Trigger the print dialog
  };

  return (
    <div>
      <h1>Manager Dashboard</h1>

      {/* Print button */}
      <button onClick={handlePrint}>Print Table</button>

      {/* Section to print */}
      <div ref={printRef}>
        <h2>Orders Table</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {order.map((orderItem) => (
              <tr key={orderItem.id}>
                <td>{orderItem.id}</td>
                <td>{orderItem.productName}</td>
                <td>{orderItem.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Managerdashboard;
