import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';

const backendUrl = 'http://localhost:5000';

const DrinkDetailScreen = () => {
  const { drinkId } = useParams();
  const [drink, setDrink] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrink = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/menu-drinks/${drinkId}`);
        
        // --- DEBUGGING STEP: See the exact data arriving from the API ---
        console.log("Data received from API for drink:", response.data); 
        
        setDrink(response.data);
      } catch (error) {
        console.error("Failed to fetch drink details:", error);
        setDrink(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrink();
  }, [drinkId]);

  if (isLoading) {
    return (
        <>
            <Navbar />
            <div style={{ padding: '4rem', textAlign: 'center' }}><h2>Loading drink...</h2></div>
            <Footer />
        </>
    );
  }

  if (!drink) {
    return (
      <>
        <Navbar />
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <h2>Drink not found</h2>
          <Link to="/menu">Back to Menu</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="drink-detail-page">
        <header className="drink-detail-container">
          <div className="detail-left-column">
            <div className="detail-text-content" style={{ '--theme-color': drink.theme_color || '#333' }}>
              <h1>{drink.name}</h1>
              
              <h2>{drink.tagline}</h2>
              <h3>{drink.subheading}</h3>
              
              <p>{drink.description}</p>
              <div className="options-container">
                <div className="options-list">
                  <h4>Options:</h4>
                  <ul>{drink.options && drink.options.map((o, i) => <li key={i}>{o}</li>)}</ul>
                </div>
                <div className="options-list">
                  <h4>Supplements:</h4>
                  <ul>{drink.supplements && drink.supplements.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-right-column">
            <img src={`${backendUrl}${drink.main_image}`} alt={drink.name} className="detail-main-image" />
          </div>
        </header>

        {/* --- THE KEY FIX IS HERE --- */}
        {/* We now check for `drink.more_details` (snake_case) */}
        {drink.more_details && drink.more_details.length > 0 && (
          <main className="drink-details-body">
            <div className="details-body-header">
              <h2 style={{ color: drink.theme_color || '#333' }}>
                The Making of a Perfect {drink.name}
              </h2>
            </div>
            {drink.more_details.map((detail, index) => (
              <div key={index} className="detail-item">
                <div className="detail-item-image">
                  <img src={`${backendUrl}${detail.image}`} alt={`${drink.name} detail ${index + 1}`} />
                </div>
                <div className="detail-item-text">
                  <p>{detail.text}</p>
                </div>
              </div>
            ))}
          </main>
        )}
      </div>
      <Footer />
    </>
  );
};

export default DrinkDetailScreen;