import { features } from '../data/features.js';

function FeatureGrid({ viewedFeatures, onScreenChange }) {
  return (
    <div className="features-grid">
      {features.map(feature => (
        <div 
          key={feature.id} 
          className="feature-row" 
          data-screen={feature.id}
          style={{ 
            visibility: 'hidden',
            opacity: 0
          }}
        >
          <span className="feature-name">
            <span className="feature-number">{feature.number}.</span> {feature.title}
          </span>
          <img 
            src="assets/tick.svg" 
            className={`tick-mark ${viewedFeatures.has(feature.id) ? 'active' : ''}`}
            alt="tick" 
            style={{ visibility: viewedFeatures.has(feature.id) ? 'visible' : 'hidden' }}
          />
          <button 
            className="nav-button"
            onClick={() => onScreenChange(feature.id)}
          >
            View
          </button>
        </div>
      ))}
    </div>
  );
}

export default FeatureGrid; 