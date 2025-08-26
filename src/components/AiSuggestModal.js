import React, { useState } from 'react';
import { Modal, Input, Button, Spin, message, Space } from 'antd';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles, faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Import icons

const { TextArea } = Input;
const backendUrl = 'http://localhost:5000';

const AiSuggestModal = ({ visible, onClose, menuDrinks }) => {
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  const predefinedMoods = ['Tired & Stressed', 'Creative & Focused', 'Relaxed & Cozy', 'Adventurous'];

  const handleGetSuggestion = async (selectedMood) => {
    const currentMood = selectedMood || mood;
    if (!currentMood.trim()) {
      message.warning('Please describe or select a mood!');
      return;
    }
    setLoading(true);
    setSuggestion(null);

    const simplifiedMenu = menuDrinks.map(d => ({ id: d.id, name: d.name, description: d.description, tags: d.tags }));

    try {
      const res = await axios.post('/api/ai/suggest-drink', { mood: currentMood, menuDrinks: simplifiedMenu });
      const { drinkId, explanation } = res.data;
      const suggestedDrink = menuDrinks.find(d => d.id === drinkId);

      if (suggestedDrink) {
        setSuggestion({ ...suggestedDrink, explanation: explanation });
      } else {
        console.error("AI returned an invalid drinkId:", drinkId);
        message.error("The AI suggested something we don't have! Please try again.");
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to get suggestion.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAndReset = () => {
      setSuggestion(null);
      setMood('');
      onClose();
  };
      
  return (
    <Modal
      visible={visible}
      onCancel={handleCloseAndReset}
      footer={null}
      className="ai-suggestion-modal" // <-- Add a class to the modal itself
      width={suggestion ? 600 : 520} // Make the modal wider when showing the result
    >
      <div className="ai-modal-content">
        {!suggestion && (
          <div className="ai-input-section">
            <FontAwesomeIcon icon={faWandMagicSparkles} className="ai-modal-icon" />
            <h2>AI Drink Suggestion</h2>
            <p className="ai-modal-subtitle">How are you feeling right now? Let our AI Barista find the perfect drink for you.</p>
            <div className="predefined-moods">
              {predefinedMoods.map(m => <button key={m} className="mood-pill" onClick={() => handleGetSuggestion(m)}>{m}</button>)}
            </div>
            <p className="ai-modal-or-text">or</p>
            <TextArea 
              rows={3} 
              placeholder="Describe your mood in your own words..."
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />
            <Button type="primary" onClick={() => handleGetSuggestion()} loading={loading} className="ai-submit-button">
              Find My Drink
            </Button>
          </div>
        )}

        {loading && <Spin size="large" className="ai-modal-spinner" />}
        
        {suggestion && (
          <div className="ai-suggestion-result">
              <button className="ai-back-button" onClick={() => { setSuggestion(null); setMood(''); }}>
                <FontAwesomeIcon icon={faArrowLeft} /> Ask Again
              </button>
              <h3>Our AI Barista recommends...</h3>
              <div className="suggested-drink-card">
                  <img src={`${backendUrl}${suggestion.main_image}`} alt={suggestion.name} />
                  <div className="suggested-drink-info">
                      <h4>{suggestion.name}</h4>
                      <p>"{suggestion.explanation}"</p>
                  </div>
              </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AiSuggestModal;