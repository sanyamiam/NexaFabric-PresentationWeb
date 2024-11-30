import { useState, useEffect } from 'react';
import '../styles/ConnectionStatus.css';

function ConnectionStatus({ wsStatus, retryConnection }) {

    const timerMaxTime = 3;

  const [showRetry, setShowRetry] = useState(false);
  const [countdown, setCountdown] = useState(timerMaxTime);



  useEffect(() => {
    let timer;
    if (wsStatus === 'disconnected') {
      timer = setTimeout(() => setShowRetry(true), timerMaxTime*1000);
    } else {
      setShowRetry(false);
      setCountdown(timerMaxTime);
    }
    return () => clearTimeout(timer);
  }, [wsStatus]);

  useEffect(() => {
    let interval;
    if (wsStatus === 'disconnected' && !showRetry && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [wsStatus, showRetry, countdown]);

  return (
    <>
      {/* Minimal Status Indicator */}
      <div className={`connection-pill ${wsStatus}`}>
        <div className="status-dot"></div>
        <span className="status-text">
          {wsStatus === 'connecting' && 'Connecting...'}
          {wsStatus === 'connected' && 'Connected'}
          {wsStatus === 'disconnected' && 'Disconnected'}
        </span>
      </div>

      {/* Connection Overlay */}
      {wsStatus !== 'connected' && (
        <div className="modern-overlay">
          <div className="connection-card">
            <div className="connection-status-circle">
              {wsStatus === 'connecting' && (
                <div className="connecting-animation">
                  <div className="signal-wave"></div>
                  <div className="signal-wave"></div>
                  <div className="signal-wave"></div>
                </div>
              )}
              {wsStatus === 'disconnected' && (
                <div className="disconnected-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M18.364 5.636a9 9 0 010 12.728m-12.728 0a9 9 0 010-12.728m12.728 0L5.636 18.364" />
                  </svg>
                </div>
              )}
            </div>

            <div className="connection-message">
              <h3>
                {wsStatus === 'connecting' && 'Establishing Connection'}
                {wsStatus === 'disconnected' && 'Connection Lost'}
              </h3>
              <p>
                {wsStatus === 'connecting' && 'Connecting to presentation control server...'}
                {wsStatus === 'disconnected' && 'Unable to reach the presentation server'}
              </p>
            </div>

            {wsStatus === 'disconnected' && (
              <div className="connection-actions">
                {!showRetry ? (
                  <div className="auto-retry">
                    <div className="countdown-timer">
                      <svg viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray={`${(countdown / timerMaxTime) * 100}, 100`}
                        />
                      </svg>
                      <span>{countdown}</span>
                    </div>
                    <p>Retrying automatically...</p>
                  </div>
                ) : (
                  <div className="manual-retry">
                    <p>Automatic retry failed</p>
                    <button onClick={retryConnection} className="retry-now">
                      <span>Retry Now</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="connection-details">
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className={`detail-value ${wsStatus}`}>
                  {wsStatus.charAt(0).toUpperCase() + wsStatus.slice(1)}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Server</span>
                <span className="detail-value">ws://localhost:8080</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Activity</span>
                <span className="detail-value">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConnectionStatus; 