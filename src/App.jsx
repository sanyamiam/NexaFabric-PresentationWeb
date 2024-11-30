import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "./components/Navbar";
import IntroSection from "./components/IntroSection";
import FeatureGrid from "./components/FeatureGrid";
import FeatureSection from "./components/FeatureSection";
import ThanksSection from "./components/ThanksSection";
import ConnectionStatus from "./components/ConnectionStatus";
import { features } from "./data/features.js";
import TechSection from "./components/TechSection";
import "./styles/App.css";

function App() {
  const canvasRef = useRef(null);
  const [currentScreen, setCurrentScreen] = useState("intro");
  const [viewedFeatures, setViewedFeatures] = useState(new Set());
  const [ws, setWs] = useState(null);
  const [wsStatus, setWsStatus] = useState("connecting");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [fallDetection, setFallDetection] = useState({
    detected: false,
    height: 0,
    timestamp: null,
  });
  const [crashAlert, setCrashAlert] = useState({
    detected: false,
    impact: "",
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
    type: "",
    location: "",
    timestamp: null,
  });

  const changeScreen = useCallback((screen) => {
    if (screen === "tech") {
      setCurrentScreen("tech");
      return;
    }

    if (screen === "intro") {
      setCurrentScreen("intro");
      return;
    }

    if (screen === "thanks") {
      setCurrentScreen("thanks");
      return;
    }

    setCurrentScreen(screen);

    if (
      screen !== "resetAll" &&
      screen !== "thanks" &&
      screen !== "tech" &&
      screen !== "intro"
    ) {
      setViewedFeatures((prev) => new Set([...prev, screen]));
    }
  }, []);

  const connectWebSocket = useCallback(() => {
    setWsStatus("connecting");
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      setWs(socket);
      setWsStatus("connected");
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
      setWs(null);
      setWsStatus("disconnected");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setWsStatus("disconnected");
    };

    return socket;
  }, []);

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connectWebSocket]);

  // Handle WebSocket messages
  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      console.log(event.data);
      const command = event.data;

      // Handle connection message
      if (command === "CONNECTION_ESTABLISHED") {
        setWsStatus("connected");
        return;
      }

      if (command.startsWith("tech_")) {
        changeScreen("tech");
        return;
      } else if (command.startsWith("intro_")) {
        changeScreen("intro");
        return;
      }

      // Extract feature ID from command (everything before _SHOW)
      const featureId = command.split("_")[0].toLowerCase();
      const featureIdNotUpperCase = command.split("_")[0];

      // Handle different command types
      if (command.endsWith("_SHOW_HOME_CARD")) {
        // Show specific card in hero-content
        const cards = document.querySelectorAll(".feature-row");
        cards.forEach((card) => {
          if (card.dataset.screen.toLowerCase() === featureId) {
            card.style.visibility = "visible";
            card.style.opacity = "1";
          }
        });
      } else if (command.endsWith("_SHOW_SECTION")) {
        if (command.toLowerCase() === "resetall_show_section") {
          changeScreen("resetAll");
          const videos = document.querySelectorAll("video");
          videos.forEach((video) => {
            video.pause();
          });

          const closeBtn = document.querySelectorAll(".close-video");

          closeBtn.forEach((btn) => {
            btn.click();
          });
        } else {
          // Find and click the View button for the specific feature
          const viewButton = document.querySelector(
            `.feature-row[data-screen="${featureIdNotUpperCase}"] .nav-button`
          );
          if (viewButton) {
            viewButton.click();
          }

          if (featureId == "thanks") {
            changeScreen("thanks");

            const video = document.querySelector("#thanks video");
            video.play();
          }
        }
      } else if (command.endsWith("_SHOW_MOCKUP")) {
        // Show specific video container and hide others
        const videoContainers = document.querySelectorAll(".video-container");
        videoContainers.forEach((container) => {
          const section = container.closest("section");
          if (section && section.id.toLowerCase() === featureId) {
            // First set display to flex to make it visible
            container.style.display = "flex";
            // Add animation class after a brief delay to trigger animation
            requestAnimationFrame(() => {
              container.classList.add("mockup-visible");
            });
          } else {
            // Remove animation class first
            container.classList.remove("mockup-visible");
            // Hide after animation completes
            container.addEventListener(
              "transitionend",
              () => {
                container.style.display = "none";
              },
              { once: true }
            );
          }
        });
      } else if (command.endsWith("_SHOW_ALERT")) {
        // Reset all alerts first
        // setFallDetection(prev => ({ ...prev, detected: false }));
        // setCrashAlert(prev => ({ ...prev, detected: false }));
        // setAquaAlert(prev => ({ ...prev, detected: false }));
        // setShadowAlert(prev => ({ ...prev, detected: false }));

        // Trigger specific alert
        switch (featureId) {
          case "safestep":
            document.querySelector(".trigger-fall-alert").click();
            break;
          case "crashsense":
            document.querySelector(".trigger-crash-alert").click();
            break;
          case "aquaguard":
            document.querySelector(".trigger-aqua-alert").click();
            break;
          case "shadowalert":
            document.querySelector(".trigger-shadow-alert").click();
            break;
        }
      } else if (command.endsWith("_SHOW_DEMO_VIDEO")) {
        // Show video overlay first
        // setIsVideoPlaying(true);

        // I want to click the button having class "play-video-btn hidden-video-btn"
        const videoBtn = document.querySelector(
          `section[id="${featureIdNotUpperCase}"] .play-video-btn.hidden-video-btn`
        );
        videoBtn.click();

        const videoPlayer = document.querySelector(
          `section[id="${featureIdNotUpperCase}"] .video-overlay div video`
        );

        if (videoPlayer.paused) {
          videoPlayer.play();
        }
        // if (video) {
        //   video.currentTime = 0;
        //   video.load();
        // }
      }

      // else if (command.endsWith('_PLAY_DEMO_VIDEO')) {
      //   const video = document.querySelector(`section[id="${featureId}"] .video-container-fullscreen video`);
      //   if (video) {
      //     video.play().catch(err => console.error('Video play failed:', err));
      //   }
      // }

      // else if (command.endsWith('_HIDE_DEMO_VIDEO')) {
      //   setIsVideoPlaying(false);
      //   const video = document.querySelector(`section[id="${featureId}"] .video-container-fullscreen video`);
      //   if (video) {
      //     video.pause();
      //     video.currentTime = 0;
      //   }
      // }
    };
  }, [ws, changeScreen]);

  // Add cleanup for WebSocket connection
  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  const handleExplore = () => {
    setCurrentScreen("resetAll"); // Navigate to the features grid
  };

  // Add background animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let fiberLines = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initFiberLines = () => {
      fiberLines = [];
      const numberOfLines = 20; // Increased for fuller effect

      for (let i = 0; i < numberOfLines; i++) {
        fiberLines.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 300 + 200, // Longer lines
          angle: Math.random() * Math.PI * 2,
          speed: (Math.random() - 0.5) * 0.1,
          thickness: Math.random() * 2 + 1,
          glow: Math.random() * 0.5 + 0.3,
        });
      }
    };

    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor(
        (canvas.width * canvas.height) / 20000
      );

      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          brightness: Math.random(),
          color: Math.random() > 0.5 ? "#4a90e2" : "#50c878",
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw space background
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "rgba(10, 12, 16, 0.99)");
      gradient.addColorStop(1, "rgba(16, 24, 32, 0.99)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw fiber lines
      fiberLines.forEach((line) => {
        line.angle += line.speed;

        const endX = line.x + Math.cos(line.angle) * line.length;
        const endY = line.y + Math.sin(line.angle) * line.length;

        const gradient = ctx.createLinearGradient(line.x, line.y, endX, endY);
        gradient.addColorStop(0, `rgba(74, 144, 226, ${line.glow})`);
        gradient.addColorStop(1, "rgba(74, 144, 226, 0)");

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

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        const brightness = 0.3 + Math.sin(Date.now() * 0.001 + i) * 0.2;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;

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

    const handleResize = () => {
      resizeCanvas();
      initParticles();
      initFiberLines();
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="app">
      <canvas ref={canvasRef} className="global-canvas" />
      <ConnectionStatus
        wsStatus={wsStatus}
        retryConnection={connectWebSocket}
      />
      <IntroSection
        isVisible={currentScreen === "intro"}
        onExplore={handleExplore}
      />
      <section
        id="resetAll"
        style={{ display: currentScreen === "resetAll" ? "flex" : "none" }}
      >
        <Navbar />
        <div className="hero-content">
          <h2>Smart Features</h2>
          <FeatureGrid
            viewedFeatures={viewedFeatures}
            onScreenChange={changeScreen}
          />
          <button
            className="complete-tour-btn cta-button"
            onClick={() => changeScreen("completed")}
          >
            Complete Tour
          </button>
        </div>
      </section>

      {features.map((feature) => (
        <FeatureSection
          key={feature.id}
          {...feature}
          isVisible={currentScreen === feature.id}
          onBackHome={() => changeScreen("resetAll")}
          isVideoPlaying={isVideoPlaying}
          setIsVideoPlaying={setIsVideoPlaying}
          fallDetection={fallDetection}
          setFallDetection={setFallDetection}
          crashAlert={crashAlert}
          setCrashAlert={setCrashAlert}
          aquaAlert={aquaAlert}
          setAquaAlert={setAquaAlert}
          shadowAlert={shadowAlert}
          setShadowAlert={setShadowAlert}
        />
      ))}

      <TechSection isVisible={currentScreen === "tech"} />

      <ThanksSection
        isVisible={currentScreen === "thanks"}
        onBackHome={() => changeScreen("resetAll")}
      />
    </div>
  );
}

export default App;
