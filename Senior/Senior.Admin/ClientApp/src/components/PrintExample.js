import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const PrintExample = () => {
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current, // This function should return `printRef.current`
    documentTitle: "Sample Report",
  });

  return (
    <div>
      <button onClick={handlePrint} className="btn btn-primary">
        Print Report
      </button>
      
      {/* The content you want to print must be inside this `div` with `ref={printRef}` */}
      <div ref={printRef} style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h1>Dashboard Report</h1>
        <p>This is the content that should be printed.</p>
      </div>
    </div>
  );
};

export default PrintExample;
