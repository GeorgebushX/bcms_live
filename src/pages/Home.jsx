import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { assets } from "../assets/assets"; // Ensure you have front, front2, front3

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container d-flex justify-content-center">
          <a className="navbar-brand fw-bold fs-5 text-center" href="/">
            CONSTRUCTION EMPLOYEE MANAGEMENT SYSTEM
          </a>
        </div>
      </nav> */}

      {/* Hero Carousel Section */}
      <div
        id="heroCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ height: "80vh", overflow: "hidden" }}
      >
        <div className="carousel-inner" style={{ height: "100%" }}>
          {[assets.front, assets.front2, assets.front3].map((img, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center h-100 text-white"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
              >
                <div className="text-center px-4">
                  <h1 className="fw-bold display-6 mb-3">
                    Construction Employee Management System
                  </h1>
                  <p className="lead mb-4">
                    Organize your site, manage workforce, and monitor progress efficiently.
                  </p>
                  <button
                    className="btn btn-warning btn-lg fw-semibold px-4"
                    onClick={() => (window.location.href = "/login")}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-5 fw-bold">Why Choose CEMS?</h2>
          <div className="row g-4">
            <div className="col-sm-12 col-md-6 col-lg-4">
              <div className="card border-0 shadow h-100 animate__animated animate__fadeInUp">
                <img
                  src="https://img.freepik.com/free-vector/monitoring-concept-illustration_114360-3988.jpg"
                  className="card-img-top"
                  alt="Real-Time Monitoring"
                />
                <div className="card-body">
                  <h5 className="card-title">Real-Time Monitoring</h5>
                  <p className="card-text">
                    Track employee attendance, shift assignments, and progress live.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-4">
              <div className="card border-0 shadow h-100 animate__animated animate__fadeInUp animate__delay-1s">
                <img
                  src="https://img.freepik.com/free-vector/team-building-concept-illustration_114360-5919.jpg"
                  className="card-img-top"
                  alt="Simplified Onboarding"
                />
                <div className="card-body">
                  <h5 className="card-title">Simplified Onboarding</h5>
                  <p className="card-text">
                    Quickly onboard workers, assign supervisors, and manage tasks.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-4">
              <div className="card border-0 shadow h-100 animate__animated animate__fadeInUp animate__delay-2s">
                <img
                  src="https://img.freepik.com/free-vector/dashboard-interface-concept-illustration_114360-7883.jpg"
                  className="card-img-top"
                  alt="Centralized Dashboard"
                />
                <div className="card-body">
                  <h5 className="card-title">Centralized Dashboard</h5>
                  <p className="card-text">
                    Get a bird's-eye view of all your project sites and workforce.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3 mt-5">
        <div className="container">
          &copy; {new Date().getFullYear()} Construction Employee Management System
        </div>
      </footer>
    </div>
  );
};

export default Home;
