// Spinner.js
import React from 'react';
import { ThreeDots } from 'react-loader-spinner'; // Import ThreeDots from react-loader-spinner

const Spinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ThreeDots color="#00BFFF" height={100} width={100} />
    </div>
  );
};

export default Spinner; // Ensure Spinner component is exported as default



