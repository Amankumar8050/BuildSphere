function Landing() {
  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div>
          <p className="dashboard-label">BUILDSPHERE</p>

          <h1>
            Track. Verify.
            <br />
            <span>Achieve.</span>
          </h1>

          <p className="landing-subtitle">
            A unified student achievement and co-curricular
            activity portfolio platform.
          </p>

          <div className="landing-actions">
            <a href="/student" className="landing-primary">
              Student Portal
            </a>

            <a href="/login" className="landing-secondary">
              Login
            </a>
          </div>
        </div>

        <div className="landing-visual">
          <div className="floating-card card-one">
            <strong>72 / 100</strong>
            <span>Activity Points</span>
          </div>

          <div className="floating-card card-two">
            <strong>8</strong>
            <span>Certificates</span>
          </div>

          <div className="landing-circle">
            <span>100</span>
            <small>Target Points</small>
          </div>
        </div>
      </section>

      <section className="landing-section" id="how-it-works">
        <p className="dashboard-label">HOW IT WORKS</p>
        <h2>Simple process for every student</h2>

        <div className="landing-grid">
          <div className="landing-info-card">
            <span>01</span>
            <h3>Participate</h3>
            <p>
              Take part in hackathons, sports, NSS and other
              co-curricular activities.
            </p>
          </div>

          <div className="landing-info-card">
            <span>02</span>
            <h3>Upload</h3>
            <p>
              Submit your achievement certificate through the
              student portal.
            </p>
          </div>

          <div className="landing-info-card">
            <span>03</span>
            <h3>Verify</h3>
            <p>
              Activity coordinators review and verify your
              certificate.
            </p>
          </div>

          <div className="landing-info-card">
            <span>04</span>
            <h3>Earn Points</h3>
            <p>
              Verified activities contribute to your 100-point
              achievement target.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <p className="dashboard-label">ABOUT US</p>
        <h2>One portfolio for every achievement</h2>

        <p className="landing-text">
          BuildSphere brings certificates, activity points and
          student achievements into one centralized digital
          portfolio.
        </p>
      </section>

      <section className="landing-section">
        <p className="dashboard-label">TESTIMONIALS</p>
        <h2>Student experiences</h2>

        <div className="testimonial-card">
          <p>
            “BuildSphere makes it much easier to keep track of
            my certificates and activity points.”
          </p>

          <strong>— Student Achievement Portal</strong>
        </div>
      </section>

      <footer className="landing-footer">
        <strong>BuildSphere</strong>
        <span>Student Achievement & Co-Curricular Portfolio</span>
      </footer>
    </main>
  );
}

export default Landing;