import React from 'react';

// 1. Import your local icons
import franchisingIcon from '../assets/icons/franchising.png';
import supplyingIcon from '../assets/icons/supplying.png';
import subscribingIcon from '../assets/icons/subscribing.png';
import becomeStaffIcon from '../assets/icons/becomeastaff.png';

const ServicesSection = () => {
  // 2. Update the services array to use the imported icons
  const services = [
    {
      icon: franchisingIcon,
      title: 'Franchising',
    },
    {
      icon: supplyingIcon,
      title: 'Supplying',
    },
    {
      icon: subscribingIcon,
      title: 'Subscribing',
    },
    {
      icon: becomeStaffIcon,
      title: 'Become staff member',
    },
  ];

  return (
    <div className="services-container">
      {services.map((service, index) => (
        <div key={index} className="service-item">
          <div className="service-icon">
            {/* 3. Use an <img> tag to display the icon */}
            <img src={service.icon} alt={`${service.title} icon`} />
          </div>
          <p className="service-title">{service.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ServicesSection;