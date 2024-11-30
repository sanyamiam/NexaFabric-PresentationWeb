import { useState, useEffect } from "react";

function FeatureSection({
  id,
  title,
  problem,
  solution,
  description,
  number,
  isVisible,
  onBackHome,
}) {
  const [vitalSigns, setVitalSigns] = useState({
    heartRate: 72,
    temperature: 37.0,
    bloodPressure: "120/80",
    oxygenLevel: 98,
    respiratoryRate: 16,
    glucoseLevel: 95,
    hydrationLevel: 65,
    stressIndex: 42,
  });

  const [ecoData, setEcoData] = useState({
    uvIndex: 5.2,
    uvExposure: 65,
    airQuality: 85,
    chemicalExposure: 10,
  });

  const [moodData, setMoodData] = useState({
    currentMood: "Calm",
    stressLevel: 45,
    sleepQuality: "Good",
    energyLevel: 80,
    anxietyLevel: 30,
    focusScore: 75,
    emotionalState: "Balanced",
    socialInteractions: "Active",
  });

  const [motionData, setMotionData] = useState({
    fallRisk: "Low",
    stepCount: 2467,
    walkingSpeed: "3.2",
    walkingStatus: "Walking",
    stability: "Stable",
    gaitScore: 95,
    balanceIndex: 88,
    lastActivity: "Walking",
    motionStatus: "Normal",
    locationStatus: "Home",
  });

  const [crashData, setCrashData] = useState({
    vehicleSpeed: '0.0',
    kmsToday: 0,
    lastUpdateTime: Date.now()
  });

  const [aquaData, setAquaData] = useState({
    depth: 0.0,
    speed: 0.0,
    waterResistance: 95,
    breathability: 85,
  });

  const [shadowData, setShadowData] = useState({
    alertStatus: 'Ready',
    gestureDetected: 'None',
    batteryLevel: 95,
    signalStrength: 85,
  });

  const [fallDetection, setFallDetection] = useState({
    detected: false,
    height: 0,
    timestamp: null,
  });

  const [crashAlert, setCrashAlert] = useState({
    detected: false,
    impact: 0,
    speed: 0,
    timestamp: null,
  });

  const [aquaAlert, setAquaAlert] = useState({
    detected: false,
    depth: 0,
    pressure: 0,
    timestamp: null,
  });

  const [shadowAlert, setShadowAlert] = useState({
    detected: false,
    type: '',
    location: '',
    timestamp: null,
  });

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isVisible && id === "lifeSync") {
      const interval = setInterval(() => {
        setVitalSigns((prev) => ({
          heartRate: Math.floor(Math.random() * (120 - 55) + 55),
          temperature: (Math.random() * (38.0 - 36.0) + 36.0).toFixed(1),
          bloodPressure: `${Math.floor(
            Math.random() * (150 - 85) + 85
          )}/${Math.floor(Math.random() * (95 - 55) + 55)}`,
          oxygenLevel: Math.floor(Math.random() * (100 - 90) + 90),
          respiratoryRate: Math.floor(Math.random() * (25 - 12) + 12),
          glucoseLevel: Math.floor(Math.random() * (140 - 70) + 70),
          hydrationLevel: Math.floor(Math.random() * (100 - 40) + 40),
          stressIndex: Math.floor(Math.random() * (100 - 20) + 20),
        }));
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isVisible, id]);

  useEffect(() => {
    if (isVisible && id === "moodMap") {
      const interval = setInterval(() => {
        setMoodData({
          currentMood: ["Calm", "Happy", "Focused", "Tired", "Stressed"][
            Math.floor(Math.random() * 5)
          ],
          stressLevel: Math.floor(Math.random() * 100),
          sleepQuality: ["Poor", "Fair", "Good", "Excellent"][
            Math.floor(Math.random() * 4)
          ],
          energyLevel: Math.floor(Math.random() * 100),
          anxietyLevel: Math.floor(Math.random() * 100),
          focusScore: Math.floor(Math.random() * 100),
          emotionalState: ["Balanced", "Fluctuating", "Stable", "Variable"][
            Math.floor(Math.random() * 4)
          ],
          socialInteractions: ["Low", "Moderate", "Active", "High"][
            Math.floor(Math.random() * 4)
          ],
        });
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isVisible, id]);

  useEffect(() => {
    if (isVisible && id === "safeStep") {
      const interval = setInterval(() => {
        setMotionData((prev) => ({
          ...prev,
          fallRisk: ["Low", "Moderate", "High", "Critical"][
            Math.floor(Math.random() * 4)
          ],
          walkingSpeed: (Math.random() * (7.5 - 0.5) + 0.5).toFixed(1),
          walkingStatus: ["Standing", "Walking", "Running", "Jogging"][
            Math.floor(Math.random() * 4)
          ],
        }));
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isVisible, id]);

  useEffect(() => {
    if (isVisible && id === "crashSense") {
      const interval = setInterval(() => {
        setCrashData(prev => {
          const currentTime = Date.now();
          const timeDiff = (currentTime - prev.lastUpdateTime) / 1000; // Convert to seconds
          const speed = Math.floor(Math.random() * 120); // Random speed between 0-120
          const distanceIncrement = (speed * timeDiff) / 3600; // Convert speed(km/h) to km/s and multiply by time

          return {
            vehicleSpeed: speed.toString(),
            kmsToday: prev.kmsToday + distanceIncrement,
            lastUpdateTime: currentTime
          };
        });
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isVisible, id]);

  useEffect(() => {
    if (isVisible && id === "aquaGuard") {
      const interval = setInterval(() => {
        setAquaData({
          depth: (Math.random() * (5.0 - 0.1) + 0.1).toFixed(1),
          speed: (Math.random() * (12.0 - 0.1) + 0.1).toFixed(1),
          waterResistance: Math.floor(Math.random() * (100 - 80) + 80),
          breathability: Math.floor(Math.random() * (100 - 60) + 60),
        });
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isVisible, id]);

  useEffect(() => {
    if (isVisible && id === "shadowAlert") {
      const interval = setInterval(() => {
        setShadowData({
          alertStatus: ['Ready', 'Monitoring', 'Alert Active', 'Emergency'][Math.floor(Math.random() * 4)],
          gestureDetected: ['None', 'Single Tap', 'Double Tap', 'Triple Tap'][Math.floor(Math.random() * 4)],
          batteryLevel: Math.floor(Math.random() * (100 - 20) + 20),
          signalStrength: Math.floor(Math.random() * (100 - 40) + 40),
        });
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isVisible, id]);

  useEffect(() => {
    if (isVisible && id === "ecoShield") {
      const interval = setInterval(() => {
        setEcoData({
          uvIndex: (Math.random() * (11.0 - 0.1) + 0.1).toFixed(1),
          uvExposure: Math.floor(Math.random() * (100 - 0) + 0),
          airQuality: Math.floor(Math.random() * 100),
          chemicalExposure: Math.floor(Math.random() * 50),
        });
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isVisible, id]);

  const getHeartRateStatus = (rate) => {
    if (rate < 60) return { text: "Low", class: "status-alert" };
    if (rate > 100) return { text: "High", class: "status-warning" };
    return { text: "Normal", class: "status-normal" };
  };

  const getTemperatureStatus = (temp) => {
    if (temp < 36.5) return { text: "Low", class: "status-alert" };
    if (temp > 37.5) return { text: "High", class: "status-warning" };
    return { text: "Normal", class: "status-normal" };
  };

  const getBloodPressureStatus = (bp) => {
    const [systolic, diastolic] = bp.split("/").map(Number);
    if (systolic < 90 || diastolic < 60)
      return { text: "Low", class: "status-alert" };
    if (systolic > 140 || diastolic > 90)
      return { text: "High", class: "status-warning" };
    return { text: "Optimal", class: "status-normal" };
  };

  const getOxygenStatus = (level) => {
    if (level < 92) return { text: "Critical", class: "status-alert" };
    if (level < 95) return { text: "Low", class: "status-warning" };
    return { text: "Excellent", class: "status-normal" };
  };

  const getRespiratoryStatus = (rate) => {
    if (rate < 12) return { text: "Low", class: "status-alert" };
    if (rate > 20) return { text: "High", class: "status-warning" };
    return { text: "Normal", class: "status-normal" };
  };

  const getGlucoseStatus = (level) => {
    if (level < 70) return { text: "Low", class: "status-alert" };
    if (level > 140) return { text: "High", class: "status-warning" };
    return { text: "Normal", class: "status-normal" };
  };

  const getHydrationStatus = (level) => {
    if (level < 50) return { text: "Low", class: "status-alert" };
    if (level < 65) return { text: "Moderate", class: "status-warning" };
    return { text: "Optimal", class: "status-normal" };
  };

  const getStressStatus = (level) => {
    if (level > 75) return { text: "High", class: "status-alert" };
    if (level > 50) return { text: "Moderate", class: "status-warning" };
    return { text: "Low", class: "status-normal" };
  };

  const getAirQualityStatus = (level) => {
    if (level < 50) return { text: "Poor", class: "status-alert" };
    if (level < 75) return { text: "Moderate", class: "status-warning" };
    return { text: "Good", class: "status-normal" };
  };

  const getChemicalExposureStatus = (ppm) => {
    if (ppm > 30) return { text: "Dangerous", class: "status-alert" };
    if (ppm > 15) return { text: "Warning", class: "status-warning" };
    return { text: "Safe", class: "status-normal" };
  };

  const getToxinStatus = (level) => {
    if (level === "High") return { text: "Danger", class: "status-alert" };
    if (level === "Moderate")
      return { text: "Caution", class: "status-warning" };
    return { text: "Clear", class: "status-normal" };
  };

  const getRiskStatus = (level) => {
    if (level === "Critical" || level === "High")
      return { text: level, class: "status-alert" };
    if (level === "Moderate") return { text: level, class: "status-warning" };
    return { text: level, class: "status-normal" };
  };

  const getMoodStatus = (mood) => {
    const moodMap = {
      Calm: { text: "Peaceful", class: "status-normal" },
      Happy: { text: "Positive", class: "status-normal" },
      Focused: { text: "Productive", class: "status-normal" },
      Tired: { text: "Rest Needed", class: "status-warning" },
      Stressed: { text: "High Tension", class: "status-alert" },
    };
    return moodMap[mood] || { text: mood, class: "status-normal" };
  };

  const getStressLevelStatus = (level) => {
    if (level > 70) return { text: "High", class: "status-alert" };
    if (level > 40) return { text: "Moderate", class: "status-warning" };
    return { text: "Low", class: "status-normal" };
  };

  const getSleepStatus = (quality) => {
    const sleepMap = {
      Poor: { text: "Insufficient", class: "status-alert" },
      Fair: { text: "Adequate", class: "status-warning" },
      Good: { text: "Restful", class: "status-normal" },
      Excellent: { text: "Optimal", class: "status-normal" },
    };
    return sleepMap[quality];
  };

  const getStabilityStatus = (stability) => {
    const stabilityMap = {
      Stable: { text: "Safe", class: "status-normal" },
      "Slightly Unstable": { text: "Caution", class: "status-warning" },
      Unstable: { text: "Warning", class: "status-alert" },
      "Very Unstable": { text: "Danger", class: "status-alert" },
    };
    return (
      stabilityMap[stability] || { text: stability, class: "status-normal" }
    );
  };

  const getFallRiskStatus = (risk) => {
    const riskMap = {
      Low: { text: "Safe", class: "status-normal" },
      Moderate: { text: "Monitor", class: "status-warning" },
      High: { text: "Caution", class: "status-alert" },
      Critical: { text: "Emergency", class: "status-alert" },
    };
    return riskMap[risk] || { text: risk, class: "status-normal" };
  };

  const getWalkingStatus = (status, speed) => {
    const speedNum = parseFloat(speed);
    if (status === "Standing")
      return { text: "Stationary", class: "status-normal" };
    if (speedNum > 6) return { text: "Running", class: "status-alert" };
    if (speedNum > 4) return { text: "Jogging", class: "status-warning" };
    return { text: "Walking", class: "status-normal" };
  };

  const getValueClass = (value) => {
    const baseLength = 6; // Base length for full-size text
    const length = value.toString().length;
    const scale = length > baseLength ? baseLength / length : 1;

    return {
      className: "vital-value",
      style: { "--scale": scale },
    };
  };

  const getImpactStatus = (status) => {
    const statusMap = {
      'Normal': { text: "Safe", class: "status-normal" },
      'Warning': { text: "Caution", class: "status-warning" },
      'Impact Detected': { text: "Alert", class: "status-alert" },
      'Severe Impact': { text: "Emergency", class: "status-alert" }
    };
    return statusMap[status] || { text: status, class: "status-normal" };
  };

  const getGForceStatus = (force) => {
    const gForce = parseFloat(force);
    if (gForce > 8) return { text: "Severe", class: "status-alert" };
    if (gForce > 4) return { text: "Warning", class: "status-warning" };
    return { text: "Normal", class: "status-normal" };
  };

  const getSpeedStatus = (speed) => {
    const speedNum = parseFloat(speed);
    if (speedNum > 100) return { text: "High Speed", class: "status-alert" };
    if (speedNum > 60) return { text: "Moderate", class: "status-warning" };
    if (speedNum === 0) return { text: "Stationary", class: "status-normal" };
    return { text: "Normal", class: "status-normal" };
  };

  const getWaterResistanceStatus = (level) => {
    if (level > 90) return { text: "Maximum", class: "status-normal" };
    if (level > 80) return { text: "Optimal", class: "status-normal" };
    return { text: "Reduced", class: "status-warning" };
  };

  const getBreathabilityStatus = (level) => {
    if (level > 80) return { text: "Excellent", class: "status-normal" };
    if (level > 60) return { text: "Good", class: "status-normal" };
    return { text: "Limited", class: "status-warning" };
  };

  const getDepthStatus = (depth) => {
    const depthNum = parseFloat(depth);
    if (depthNum > 3) return { text: "Deep", class: "status-alert" };
    if (depthNum > 1.5) return { text: "Medium", class: "status-warning" };
    return { text: "Shallow", class: "status-normal" };
  };

  const getSpeedInWaterStatus = (speed) => {
    const speedNum = parseFloat(speed);
    if (speedNum > 8) return { text: "Fast", class: "status-alert" };
    if (speedNum > 4) return { text: "Moderate", class: "status-warning" };
    return { text: "Slow", class: "status-normal" };
  };

  const getAlertStatus = (status) => {
    const statusMap = {
      'Ready': { text: "Standby", class: "status-normal" },
      'Monitoring': { text: "Active", class: "status-normal" },
      'Alert Active': { text: "Warning", class: "status-warning" },
      'Emergency': { text: "SOS", class: "status-alert" }
    };
    return statusMap[status] || { text: status, class: "status-normal" };
  };

  const getGestureStatus = (gesture) => {
    if (gesture === 'None') return { text: "Waiting", class: "status-normal" };
    return { text: "Detected", class: "status-warning" };
  };

  const getUVStatus = (index) => {
    const uvNum = parseFloat(index);
    if (uvNum > 7) return { text: "Extreme", class: "status-alert" };
    if (uvNum > 5) return { text: "High", class: "status-warning" };
    return { text: "Moderate", class: "status-normal" };
  };

  const getExposureStatus = (level) => {
    if (level > 80) return { text: "Critical", class: "status-alert" };
    if (level > 50) return { text: "Warning", class: "status-warning" };
    return { text: "Safe", class: "status-normal" };
  };

  const renderFeatureUI = (featureId) => {
    switch (featureId) {
      case "lifeSync": {
        const heartStatus = getHeartRateStatus(vitalSigns.heartRate);
        const tempStatus = getTemperatureStatus(vitalSigns.temperature);
        const bpStatus = getBloodPressureStatus(vitalSigns.bloodPressure);
        const oxygenStatus = getOxygenStatus(vitalSigns.oxygenLevel);
        const respiratoryStatus = getRespiratoryStatus(
          vitalSigns.respiratoryRate
        );
        const glucoseStatus = getGlucoseStatus(vitalSigns.glucoseLevel);
        const hydrationStatus = getHydrationStatus(vitalSigns.hydrationLevel);
        const stressStatus = getStressStatus(vitalSigns.stressIndex);

        return (
          <div className="feature-ui lifesync-ui">
            <div className="lifesync-header">
              <div className="lifesync-title">
                <span className="title-text">{title}</span>
              </div>
              <div className="lifesync-status">
                <span className="time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
            <div className="vitals-grid">
              <div className="vital-card">
                <div className="vital-title">
                  <svg
                    className="vital-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                  Heart Rate
                </div>
                <div
                  className={getValueClass(vitalSigns.heartRate).className}
                  style={getValueClass(vitalSigns.heartRate).style}
                >
                  {vitalSigns.heartRate} BPM
                </div>
                <div className={`vital-status ${heartStatus.class}`}>
                  <span className="status-indicator"></span>
                  <span className="status-text">{heartStatus.text}</span>
                </div>
              </div>

              <div className="vital-card">
                <div className="vital-title">
                  <svg
                    className="vital-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                  </svg>
                  Temperature
                </div>
                <div
                  className={
                    getValueClass(`${vitalSigns.temperature}°C`).className
                  }
                  style={getValueClass(`${vitalSigns.temperature}°C`).style}
                >
                  {vitalSigns.temperature}°C
                </div>
                <div className={`vital-status ${tempStatus.class}`}>
                  <span className="status-indicator"></span>
                  <span className="status-text">{tempStatus.text}</span>
                </div>
              </div>

              <div className="vital-card">
                <div className="vital-title">
                  <svg
                    className="vital-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                  Blood Pressure
                </div>
                <div
                  className={getValueClass(vitalSigns.bloodPressure).className}
                >
                  {vitalSigns.bloodPressure}
                </div>
                <div className={`vital-status ${bpStatus.class}`}>
                  <span className="status-indicator"></span>
                  <span className="status-text">{bpStatus.text}</span>
                </div>
              </div>

              <div className="vital-card">
                <div className="vital-title">
                  <svg
                    className="vital-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                  Oxygen Level
                </div>
                <div
                  className={
                    getValueClass(`${vitalSigns.oxygenLevel}%`).className
                  }
                >
                  {vitalSigns.oxygenLevel}%
                </div>
                <div className={`vital-status ${oxygenStatus.class}`}>
                  <span className="status-indicator"></span>
                  <span className="status-text">{oxygenStatus.text}</span>
                </div>
              </div>

              <div className="vital-card">
                <div className="vital-title">
                  <svg
                    className="vital-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                  </svg>
                  Respiratory Rate
                </div>
                <div
                  className={
                    getValueClass(`${vitalSigns.respiratoryRate} BPM`).className
                  }
                >
                  {vitalSigns.respiratoryRate} BPM
                </div>
                <div className={`vital-status ${respiratoryStatus.class}`}>
                  <span className="status-indicator"></span>
                  <span className="status-text">{respiratoryStatus.text}</span>
                </div>
              </div>

              <div className="vital-card">
                <div className="vital-title">
                  <svg
                    className="vital-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.05 11.5c0 4.174-3.376 7.55-7.55 7.55-4.174 0-7.55-3.376-7.55-7.55C4.95 7.326 8.326 3.95 12.5 3.95c4.174 0 7.55 3.376 7.55 7.55zm-1.5 0c0-3.346-2.704-6.05-6.05-6.05-3.346 0-6.05 2.704-6.05 6.05 0 3.346 2.704 6.05 6.05 6.05 3.346 0 6.05-2.704 6.05-6.05z" />
                  </svg>
                  Glucose Level
                </div>
                <div
                  className={
                    getValueClass(`${vitalSigns.glucoseLevel} mg/dL`).className
                  }
                >
                  {vitalSigns.glucoseLevel} mg/dL
                </div>
                <div className={`vital-status ${glucoseStatus.class}`}>
                  <span className="status-indicator"></span>
                  <span className="status-text">{glucoseStatus.text}</span>
                </div>
              </div>

              <div className="vital-card">
                <div className="vital-title">
                  <svg
                    className="vital-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z" />
                  </svg>
                  Hydration Level
                </div>
                <div
                  className={
                    getValueClass(`${vitalSigns.hydrationLevel}%`).className
                  }
                >
                  {vitalSigns.hydrationLevel}%
                </div>
                <div className={`vital-status ${hydrationStatus.class}`}>
                  <span className="status-indicator"></span>
                  <span className="status-text">{hydrationStatus.text}</span>
                </div>
              </div>

              <div className="vital-card">
                <div className="vital-title">
                  <svg
                    className="vital-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  Stress Index
                </div>
                <div
                  className={
                    getValueClass(`${vitalSigns.stressIndex}%`).className
                  }
                >
                  {vitalSigns.stressIndex}%
                </div>
                <div className={`vital-status ${stressStatus.class}`}>
                  <span className="status-indicator"></span>
                  <span className="status-text">{stressStatus.text}</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "moodMap": {
        const moodStatus = getMoodStatus(moodData.currentMood);
        const stressStatus = getStressLevelStatus(moodData.stressLevel);
        const sleepStatus = getSleepStatus(moodData.sleepQuality);

        return (
          <div className="feature-ui moodmap-ui">
            <div className="lifesync-header">
              <div className="lifesync-title">
                <span className="title-text">{title}</span>
              </div>
              <div className="lifesync-status">
                <span className="time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
            <div className="vitals-grid">
              <div className="vital-card">
                <div className="vital-title">
                  <svg
                    className="vital-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12zm0 2a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                  Current Mood
                </div>
                <div className={getValueClass(moodData.currentMood).className}>
                  {moodData.currentMood}
                </div>
                <div className={`vital-status ${moodStatus.class}`}>
                  <span className="status-indicator"></span>
                  <span className="status-text">{moodStatus.text}</span>
                </div>
              </div>

              <div className="vital-card">
                <div className="vital-title">
                  <svg
                    className="vital-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  Stress Level
                </div>
                <div
                  className={
                    getValueClass(`${moodData.stressLevel}%`).className
                  }
                >
                  {moodData.stressLevel}%
                </div>
                <div className={`vital-status ${stressStatus.class}`}>
                  <span className="status-indicator"></span>
                  <span className="status-text">{stressStatus.text}</span>
                </div>
                <div className="toxin-meter">
                  <div
                    className="toxin-level"
                    style={{ "--level": `${moodData.stressLevel}%` }}
                  ></div>
                </div>
              </div>

              <div className="vital-card">
                <div className="vital-title">
                  <svg
                    className="vital-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-2a7 7 0 110-14 7 7 0 010 14zm1-7V7h-2v5H8v2h5z" />
                  </svg>
                  Sleep Quality
                </div>
                <div className={getValueClass(moodData.sleepQuality).className}>
                  {moodData.sleepQuality}
                </div>
                <div className={`vital-status ${sleepStatus.class}`}>
                  <span className="status-indicator"></span>
                  <span className="status-text">{sleepStatus.text}</span>
                </div>
              </div>

              <div className="vital-card">
                <div className="vital-title">
                  <svg
                    className="vital-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z" />
                  </svg>
                  Energy Level
                </div>
                <div
                  className={
                    getValueClass(`${moodData.energyLevel}%`).className
                  }
                >
                  {moodData.energyLevel}%
                </div>
                <div
                  className={`vital-status ${
                    moodData.energyLevel > 60
                      ? "status-normal"
                      : "status-warning"
                  }`}
                >
                  <span className="status-indicator"></span>
                  <span className="status-text">
                    {moodData.energyLevel > 60 ? "Energetic" : "Low Energy"}
                  </span>
                </div>
                <div className="toxin-meter">
                  <div
                    className="toxin-level"
                    style={{ "--level": `${moodData.energyLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "safeStep": {
        const fallRiskStatus = getFallRiskStatus(motionData.fallRisk);
        const walkingStatus = getWalkingStatus(
          motionData.walkingStatus,
          motionData.walkingSpeed
        );

        return (
          <div className="feature-ui safestep-ui">
            <div className="lifesync-header">
              <div className="lifesync-title">
                <span className="title-text">{title}</span>
              </div>
              <div className="lifesync-status">
                <span className="time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
            {fallDetection.detected ? (
              <div className="fall-alert-overlay">
                <div className="fall-alert-content">
                  <div className="alert-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
                    </svg>
                  </div>
                  <div className="alert-header">
                    <h2>Fall Detected!</h2>
                  </div>
                  <div className="alert-header">
                    <div className="alert-badge">Critical</div>
                  </div>
                  <div className="fall-details">
                    <div className="detail-item">
                      <span className="detail-label">Fall Height</span>
                      <span className="detail-value">{46}m</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Detection Time</span>
                      <span className="detail-value">{fallDetection.timestamp?.toLocaleTimeString()}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Location</span>
                      <span className="detail-value">AITR Block-1</span>
                    </div>
                  </div>
                  <div className="emergency-countdown">
                    <div className="countdown-text">
                      Take action as soon as possible
                      <span className="blink-dots">...</span>
                    </div>
                  </div>
                  <div className="alert-actions">
                    <button 
                      className="cancel-alert"
                      onClick={() => setFallDetection({ detected: false, height: 0, timestamp: null })}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="button-icon">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                      Cancel Alert
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="vitals-grid">
                <div className="vital-card">
                  <div className="vital-title">
                    <svg
                      className="vital-icon"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
                    </svg>
                    Walking Speed
                  </div>
                  <div
                    className={getValueClass(`${motionData.walkingSpeed} km/h`).className}
                  >
                    {motionData.walkingSpeed} km/h
                  </div>
                  <div className={`vital-status ${walkingStatus.class}`}>
                    <span className="status-indicator"></span>
                    <span className="status-text">{walkingStatus.text}</span>
                  </div>
                  <div className="toxin-meter">
                    <div
                      className="toxin-level"
                      style={{
                        "--level": `${(parseFloat(motionData.walkingSpeed) / 8) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="vital-card">
                  <div className="vital-title">
                    <svg
                      className="vital-icon"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
                    </svg>
                    Steps Today
                  </div>
                  <div
                    className={
                      getValueClass(motionData.stepCount.toString()).className
                    }
                  >
                    {motionData.stepCount}
                  </div>
                  <div className="vital-status status-normal">
                    <span className="status-indicator"></span>
                    <span className="status-text">Active</span>
                  </div>
                </div>

                <div className="vital-card">
                  <div className="vital-title">
                    <svg
                      className="vital-icon"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm1-10c2.21 0 4 1.79 4 4 0 2.5-3 2.75-3 5h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4z"/>
                    </svg>
                    Fall Risk
                  </div>
                  <div className={getValueClass(motionData.fallRisk).className}>
                    {motionData.fallRisk}
                  </div>
                  <div className={`vital-status ${fallRiskStatus.class}`}>
                    <span className="status-indicator"></span>
                    <span className="status-text">{fallRiskStatus.text}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }

      case "crashSense": {
        const speedStatus = getSpeedStatus(crashData.vehicleSpeed);
        
        return (
          <div className="feature-ui crashsense-ui">
            <div className="lifesync-header">
              <div className="lifesync-title">
                <span className="title-text">{title}</span>
              </div>
              <div className="lifesync-status">
                <span className="time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
            {crashAlert.detected ? (
              <div className="alert-overlay crash-alert">
                <div className="alert-content">
                  <div className="alert-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
                    </svg>
                  </div>
                  <div className="alert-header">
                    <h2>Vehicle Crash Detected!</h2>
                  </div>
                  <div className="alert-header">
                    <div className="alert-badge">Critical</div>
                  </div>
                  <div className="alert-details">
                    <div className="detail-item">
                      <span className="detail-label">Impact Force</span>
                      <span className="detail-value">{crashAlert.impact}G</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Vehicle Speed</span>
                      <span className="detail-value">{crashAlert.speed} km/h</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Location</span>
                      <span className="detail-value">Highway NH-8</span>
                    </div>
                  </div>
                  <div className="emergency-countdown">
                    <div className="countdown-text">
                      Take action as soon as possible
                      <span className="blink-dots">...</span>
                    </div>
                  </div>
                  <div className="alert-actions">
                    <button 
                      className="cancel-alert"
                      onClick={() => setCrashAlert({ detected: false, impact: 0, speed: 0, timestamp: null })}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="button-icon">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                      Cancel Alert
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="vitals-grid">
                <div className="vital-card">
                  <div className="vital-title">
                    <svg
                      className="vital-icon"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v2h2v-2zm0-4h-2V7h2v6z" />
                    </svg>
                    Vehicle Speed
                  </div>
                  <div className={getValueClass(`${crashData.vehicleSpeed} km/h`).className}>
                    {crashData.vehicleSpeed} km/h
                  </div>
                  <div className={`vital-status ${speedStatus.class}`}>
                    <span className="status-indicator"></span>
                    <span className="status-text">{speedStatus.text}</span>
                  </div>
                  <div className="toxin-meter">
                    <div className="toxin-level" style={{ "--level": `${(parseFloat(crashData.vehicleSpeed)/120)*100}%` }}></div>
                  </div>
                </div>

                <div className="vital-card">
                  <div className="vital-title">
                    <svg className="vital-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
                    </svg>
                    Distance Today
                  </div>
                  <div className={getValueClass(`${crashData.kmsToday.toFixed(1)} km`).className}>
                    {crashData.kmsToday.toFixed(1)} km
                  </div>
                  <div className="vital-status status-normal">
                    <span className="status-indicator"></span>
                    <span className="status-text">Tracking</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }

      case "aquaGuard": {
        const depthStatus = getDepthStatus(aquaData.depth);
        const speedStatus = getSpeedInWaterStatus(aquaData.speed);
        
        return (
          <div className="feature-ui aquashield-ui">
            <div className="lifesync-header">
              <div className="lifesync-title">
                <span className="title-text">{title}</span>
              </div>
              <div className="lifesync-status">
                <span className="time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
            {aquaAlert.detected ? (
              <div className="alert-overlay aqua-alert">
                <div className="alert-content">
                  <div className="alert-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
                    </svg>
                  </div>
                  <div className="alert-header">
                    <h2>Drowning Risk Detected!</h2>
                  </div>
                  <div className="alert-header">
                    <div className="alert-badge">Critical</div>
                  </div>
                  <div className="alert-details">
                    <div className="detail-item">
                      <span className="detail-label">Current Depth</span>
                      <span className="detail-value">{aquaAlert.depth}m</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Water Pressure</span>
                      <span className="detail-value">{aquaAlert.pressure} bar</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Location</span>
                      <span className="detail-value">Deep Ocean</span>
                    </div>
                  </div>
                  <div className="emergency-countdown">
                    <div className="countdown-text">
                      Take action as soon as possible
                      <span className="blink-dots">...</span>
                    </div>
                  </div>
                  <div className="alert-actions">
                    <button 
                      className="cancel-alert"
                      onClick={() => setAquaAlert({ detected: false, depth: 0, pressure: 0, timestamp: null })}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="button-icon">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                      Cancel Alert
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="vitals-grid">
                <div className="vital-card">
                  <div className="vital-title">
                    <svg className="vital-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v2h2v-2zm0-4h-2V7h2v6z" />
                    </svg>
                    Current Depth
                  </div>
                  <div className={getValueClass(`${aquaData.depth} m`).className}>
                    {aquaData.depth} m
                  </div>
                  <div className={`vital-status ${depthStatus.class}`}>
                    <span className="status-indicator"></span>
                    <span className="status-text">{depthStatus.text}</span>
                  </div>
                  <div className="toxin-meter">
                    <div className="toxin-level" style={{ "--level": `${(parseFloat(aquaData.depth)/5)*100}%` }}></div>
                  </div>
                </div>

                <div className="vital-card">
                  <div className="vital-title">
                    <svg className="vital-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
                    </svg>
                    Swimming Speed
                  </div>
                  <div className={getValueClass(`${aquaData.speed} m/s`).className}>
                    {aquaData.speed} m/s
                  </div>
                  <div className={`vital-status ${speedStatus.class}`}>
                    <span className="status-indicator"></span>
                    <span className="status-text">{speedStatus.text}</span>
                  </div>
                  <div className="toxin-meter">
                    <div className="toxin-level" style={{ "--level": `${(parseFloat(aquaData.speed)/12)*100}%` }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }

      case "shadowAlert": {
        const alertStatus = getAlertStatus(shadowData.alertStatus);
        const gestureStatus = getGestureStatus(shadowData.gestureDetected);
        
        return (
          <div className="feature-ui shadowalert-ui">
            <div className="lifesync-header">
              <div className="lifesync-title">
                <span className="title-text">{title}</span>
              </div>
              <div className="lifesync-status">
                <span className="time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
            {shadowAlert.detected ? (
              <div className="alert-overlay shadow-alert">
                <div className="alert-content">
                  <div className="alert-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
                    </svg>
                  </div>
                  <div className="alert-header">
                    <h2>Security Threat Detected!</h2>
                  </div>
                  <div className="alert-header">
                    <div className="alert-badge">Critical</div>
                  </div>
                  <div className="alert-details">
                    <div className="detail-item">
                      <span className="detail-label">Threat Type</span>
                      <span className="detail-value">{shadowAlert.type}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Location</span>
                      <span className="detail-value">{shadowAlert.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Risk Level</span>
                      <span className="detail-value">High</span>
                    </div>
                  </div>
                  <div className="emergency-countdown">
                    <div className="countdown-text">
                      Take action as soon as possible
                      <span className="blink-dots">...</span>
                    </div>
                  </div>
                  <div className="alert-actions">
                    <button 
                      className="cancel-alert"
                      onClick={() => setShadowAlert({ detected: false, type: '', location: '', timestamp: null })}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="button-icon">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                      Cancel Alert
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="vitals-grid">
                <div className="vital-card">
                  <div className="vital-title">
                    <svg className="vital-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v2h2v-2zm0-4h-2V7h2v6z" />
                    </svg>
                    System Status
                  </div>
                  <div className={getValueClass(shadowData.alertStatus).className}>
                    {shadowData.alertStatus}
                  </div>
                  <div className={`vital-status ${alertStatus.class}`}>
                    <span className="status-indicator"></span>
                    <span className="status-text">{alertStatus.text}</span>
                  </div>
                  <div className="toxin-meter">
                    <div className="toxin-level" style={{ "--level": `${shadowData.signalStrength}%` }}></div>
                  </div>
                </div>

                <div className="vital-card">
                  <div className="vital-title">
                    <svg className="vital-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
                    </svg>
                    Last Gesture
                  </div>
                  <div className={getValueClass(shadowData.gestureDetected).className}>
                    {shadowData.gestureDetected}
                  </div>
                  <div className={`vital-status ${gestureStatus.class}`}>
                    <span className="status-indicator"></span>
                    <span className="status-text">{gestureStatus.text}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }

      case "ecoShield": {
        const uvStatus = getUVStatus(ecoData.uvIndex);
        const exposureStatus = getExposureStatus(ecoData.uvExposure);
        const airStatus = getAirQualityStatus(ecoData.airQuality);
        const chemicalStatus = getChemicalExposureStatus(ecoData.chemicalExposure);
        
        return (
          <div className="feature-ui ecoshield-ui">
            <div className="lifesync-header">
              <div className="lifesync-title">
                <span className="title-text">{title}</span>
              </div>
              <div className="lifesync-status">
                <span className="time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
            <div className="vitals-grid">
              <div className="vital-card">
                <div className="vital-title">
                  <svg className="vital-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                  </svg>
                  UV Index
                </div>
                <div className={getValueClass(ecoData.uvIndex.toString()).className}>
                  {ecoData.uvIndex}
                </div>
                <div className={`vital-status ${uvStatus.class}`}>
                  <span className="status-indicator"></span>
                  <span className="status-text">{uvStatus.text}</span>
                </div>
                <div className="toxin-meter">
                  <div className="toxin-level" style={{ "--level": `${(parseFloat(ecoData.uvIndex)/11)*100}%` }}></div>
                </div>
              </div>

              <div className="vital-card">
                <div className="vital-title">
                  <svg className="vital-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 16c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-13c4.4 0 8 3.6 8 8 0 5.4-7 13-8 13s-8-7.6-8-13c0-4.4 3.6-8 8-8z" />
                  </svg>
                  Air Quality
                </div>
                <div className={getValueClass(`${ecoData.airQuality}%`).className}>
                  {ecoData.airQuality}%
                </div>
                <div className={`vital-status ${airStatus.class}`}>
                  <span className="status-indicator"></span>
                  <span className="status-text">{airStatus.text}</span>
                </div>
                <div className="toxin-meter">
                  <div className="toxin-level" style={{ "--level": `${ecoData.airQuality}%` }}></div>
                </div>
              </div>

              <div className="vital-card">
                <div className="vital-title">
                  <svg className="vital-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-4L7.11 16.63 4.5 12 9 4H5L.5 12 5 20h4l7.89-12.63L19.5 12 15 20h4l4.5-8z" />
                  </svg>
                  Chemical Exposure
                </div>
                <div className={getValueClass(`${ecoData.chemicalExposure} PPM`).className}>
                  {ecoData.chemicalExposure} PPM
                </div>
                <div className={`vital-status ${chemicalStatus.class}`}>
                  <span className="status-indicator"></span>
                  <span className="status-text">{chemicalStatus.text}</span>
                </div>
                <div className="toxin-meter">
                  <div className="toxin-level" style={{ "--level": `${(ecoData.chemicalExposure/50)*100}%` }}></div>
                </div>
              </div>

              <div className="vital-card">
                <div className="vital-title">
                  <svg className="vital-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                  </svg>
                  UV Exposure
                </div>
                <div className={getValueClass(`${ecoData.uvExposure}%`).className}>
                  {ecoData.uvExposure}%
                </div>
                <div className={`vital-status ${exposureStatus.class}`}>
                  <span className="status-indicator"></span>
                  <span className="status-text">{exposureStatus.text}</span>
                </div>
                <div className="toxin-meter">
                  <div className="toxin-level" style={{ "--level": `${ecoData.uvExposure}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "voltEdge": {
        return (
          <div className="video-container">
            <div className="video-container-fullscreen">
              <video
                autoPlay
                loop
                muted
                playsInline
                src="assets/videos/voltEdge.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        );
      }

      // Add more cases for other features

      default:
        return (
          <div className="feature-ui">
            <div
              style={{
                color: "#333",
                textAlign: "center",
                marginTop: "50%",
                transform: "translateY(-50%)",
              }}
            >
              Feature UI Preview
            </div>
          </div>
        );
    }
  };

  return (
    <section id={id} style={{ display: isVisible ? "flex" : "none" }}>
      <div className="section-content">
        <h2>{title}</h2>
        {problem && solution ? (
          <div className="feature-description">
            <div className="problem">
              {/* <h3>The Problem</h3> */}
              <p>{problem}</p>
            </div>
            {/* <div className="solution">
              <h3>Our Solution</h3>
              <p>{solution}</p>
            </div> */}
          </div>
        ) : (
          <p>{description}</p>
        )}
        <div className="section-index">{number}/8</div>
        <button className="back-home" onClick={onBackHome}>
          ←
        </button>
        {id === 'safeStep' && (
          <button 
            className="trigger-fall-alert"
            onClick={() => setFallDetection({
              detected: true,
              height: 46,
              timestamp: new Date()
            })}
          >
            Simulate Fall Detection
          </button>
        )}
        {id === 'crashSense' && (
          <button 
            className="trigger-crash-alert"
            onClick={() => setCrashAlert({
              detected: true,
              impact: 8.5,
              speed: 75,
              timestamp: new Date()
            })}
          >
            Simulate Crash Detection
          </button>
        )}
        {id === 'aquaGuard' && (
          <button 
            className="trigger-aqua-alert"
            onClick={() => setAquaAlert({
              detected: true,
              depth: 12.5,
              pressure: 2.4,
              timestamp: new Date()
            })}
          >
            Simulate Drowning Alert
          </button>
        )}
        {id === 'shadowAlert' && (
          <button 
            className="trigger-shadow-alert"
            onClick={() => setShadowAlert({
              detected: true,
              type: 'Suspicious Activity',
              location: 'Back Alley',
              timestamp: new Date()
            })}
          >
            Simulate Security Alert
          </button>
        )}
      </div>
      {id === 'voltEdge' ? (
        <div className="video-container">
          <div className="video-container-fullscreen">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="assets/videos/voltEdge.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      ) : (
        <div className="video-container">
          <div className="device-wrapper">
            <div className="device-mockup">
              <div className="device-screen">{renderFeatureUI(id)}</div>
            </div>
          </div>
        </div>
      )}
      {(id === 'safeStep' || id === 'crashSense' || id === 'aquaGuard') && (
        <>
          <button 
            className="play-video-btn hidden-video-btn"
            onClick={() => {
              setIsVideoPlaying(true);
            }}
          >
            <svg 
              className="play-icon" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
            Watch Demo Video
          </button>
          <div className={`video-overlay ${isVideoPlaying ? 'active' : ''}`}>
            <div className={`video-container-fullscreen ${isLoading ? 'loading' : ''}`}>
              <button 
                className="close-video"
                onClick={() => {
                  // First pause and reset the video
                  const video = document.querySelector('.video-container-fullscreen video');
                  if (video) {
                    video.pause();
                    video.currentTime = 0;
                    // Remove the src attribute to fully stop the video
                    video.removeAttribute('src');
                    // Force browser to stop loading the video
                    video.load();
                  }
                  // Then update state
                  setIsVideoPlaying(false);
                  setIsLoading(false);
                }}
              >
                ×
              </button>
              <div className="video-loading"></div>
              <video 
                key={isVideoPlaying ? 1 : 0}
                autoPlay
                src={isVideoPlaying ? `assets/videos/${id}.mp4` : ''}
                onLoadStart={() => setIsLoading(true)}
                onLoadedData={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setIsVideoPlaying(false);
                }}
                onPlaying={() => setIsLoading(false)}
                onEnded={() => {
                  setIsVideoPlaying(false);
                  setIsLoading(false);
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default FeatureSection;
