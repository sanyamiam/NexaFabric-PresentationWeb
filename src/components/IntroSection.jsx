import React, { useEffect, useRef } from 'react';

function IntroSection({ isVisible, onExplore }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let fiberLines = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize fiber lines
    const initFiberLines = () => {
      fiberLines = [];
      const numberOfLines = 15;
      
      for (let i = 0; i < numberOfLines; i++) {
        fiberLines.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 200 + 100,
          angle: Math.random() * Math.PI * 2,
          speed: (Math.random() - 0.5) * 0.2,
          thickness: Math.random() * 2 + 1,
          glow: Math.random() * 0.5 + 0.5
        });
      }
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 20000);
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          brightness: Math.random(),
          color: Math.random() > 0.5 ? '#4a90e2' : '#50c878'
        });
      }
    };

    // Draw scene
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw space background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(10, 12, 16, 0.9)');
      gradient.addColorStop(1, 'rgba(16, 24, 32, 0.9)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw fiber lines
      fiberLines.forEach(line => {
        line.angle += line.speed;
        
        const endX = line.x + Math.cos(line.angle) * line.length;
        const endY = line.y + Math.sin(line.angle) * line.length;
        
        const gradient = ctx.createLinearGradient(line.x, line.y, endX, endY);
        gradient.addColorStop(0, `rgba(74, 144, 226, ${line.glow})`);
        gradient.addColorStop(1, 'rgba(74, 144, 226, 0)');
        
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = line.thickness;
        ctx.strokeStyle = gradient;
        ctx.stroke();
      });

      // Draw particles and connections
      particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with glow effect
        const brightness = 0.3 + Math.sin(Date.now() * 0.001 + i) * 0.2;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw connections
        particles.forEach((otherParticle, j) => {
          if (i === j) return;
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = (1 - distance / 120) * 0.15;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    // Handle resize
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
      initFiberLines();
    });
    
    resizeCanvas();
    initParticles();
    initFiberLines();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <section id="intro" style={{ display: isVisible ? 'flex' : 'none' }}>
      <canvas
        ref={canvasRef}
        className="intro-canvas"
      />
      <div className="intro-overlay"></div>
      <div className="intro-content">
        <div className="intro-header">
          <div className="brand-container">
            <h1 className="brand">NexaFabric</h1>
            <span className="brand-tagline">The Future of Smart Clothing</span>
          </div>
          <div className="header-stats">
            <div className="stat">
              <span className="stat-value">99.9%</span>
              <span className="stat-label">Accuracy</span>
            </div>
            <div className="stat">
              <span className="stat-value">24/7</span>
              <span className="stat-label">Protection</span>
            </div>
          </div>
        </div>

        <div className="feature-grid">
          <div className="feature-item">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h3>LifeSync™</h3>
            <p>Advanced vital monitoring with real-time health insights</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
              </svg>
            </div>
            <h3>SafeStep™</h3>
            <p>Intelligent fall detection and emergency response</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
            </div>
            <h3>ShadowAlert™</h3>
            <p>Advanced security and threat detection system</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.55 19.09L4.96 20.5 6.76 18.71 5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13"/>
              </svg>
            </div>
            <h3>EcoShield™</h3>
            <p>Environmental monitoring and protection</p>
          </div>
        </div>

        <div className="cta-container">
          <button 
            className="cta-button"
            onClick={() => onExplore && onExplore()}
          >
            <span className="button-text">Explore Features</span>
            <span className="button-icon">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default IntroSection; 