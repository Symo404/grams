import React from 'react';

const Quote = ({ scriptText, normalText, author }) => {
  return (
    // This container provides the full-width background
    <div className="quote-container">
      {/* This wrapper constrains the content's width for readability */}
      <div className="quote-wrapper">
        <div className="quote-icon">“</div>
        <blockquote className="quote-content">
          <p className="quote-script-text">{scriptText}</p>
          <p className="quote-normal-text">{normalText}</p>
        </blockquote>
        <footer className="quote-author">— {author}</footer>
      </div>
    </div>
  );
};

export default Quote;