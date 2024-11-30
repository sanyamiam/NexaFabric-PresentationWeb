function ThanksSection({ isVisible }) {
  return (
    <section id="thanks" style={{ display: isVisible ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="thanks-wrapper" style={{ textAlign: 'center', width: '100%' }}>
        <video autoPlay loop muted playsInline src="assets/videos/thanks.mp4" style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}

export default ThanksSection;