import React from 'react';

const ProductMoreDetails = ({ details }) => {
  // --- DEBUGGING: See what data this component is receiving ---
  console.log("ProductMoreDetails received:", details);

  // Check if details is a valid array with content
  if (!Array.isArray(details) || details.length === 0) {
    return null;
  }
  return (
    <div className="more-details-container">
      {details.map((image, index) => (
        <div key={image || index} className={`detail-row ${index % 2 !== 0 ? 'reverse' : ''}`}>
          <div className="detail-image">
            <img src={`http://localhost:5000${image}`} alt={`Product detail ${index + 1}`} />
          </div>
          <div className="detail-text"><p>{image.text}</p></div>
        </div>
      ))}
    </div>
  );
};

export default ProductMoreDetails;