// src/components/ContractorDashboard/CContractorDashboardSummary.jsx
import React from "react";
import {
  FaUserTie,
  FaClipboardList,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";

const cardStyle = {
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease",
  cursor: "pointer",
  minHeight: "110px",
};

const ContractorDashboardSummary = () => {
  // Cards Section Data
  const cards = [
    { title: "Workers", count: 18, icon: <FaUserTie />, color: "#2980b9" },
    { title: "Workers Attendance", count: 250, icon: <FaClipboardList />, color: "#27ae60" },
    { title: "Workers Salary", count: 15, icon: <FaMoneyCheckAlt />, color: "#8e44ad" },
  ];

  // Workers Attendance Chart
  const workersAttendanceChart = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [200, 50],
        backgroundColor: ["#2ecc71", "#e74c3c"],
      },
    ],
  };

  // Workers Salary Bar Chart
  const workersSalaryChart = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Paid",
        data: [15000, 17000, 18000, 20000, 19000, 21000, 22000],
        backgroundColor: "#3498db",
      },
      {
        label: "Pending",
        data: [2000, 1000, 0, 500, 1000, 0, 500],
        backgroundColor: "#e67e22",
      },
    ],
  };

  // Workers Payment Status Chart
  const workersPaymentStatus = {
    labels: ["Paid", "Pending"],
    datasets: [
      {
        data: [14, 4],
        backgroundColor: ["#16a085", "#f1c40f"],
      },
    ],
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4 fw-bold text-center text-primary">Contractor Dashboard</h3>

      {/* Cards Section */}
      <div className="row justify-content-center g-3">
        {cards.map((card, index) => (
          <div className="col-12 col-sm-6 col-md-4" key={index}>
            <div
              className="p-4 text-white d-flex align-items-center justify-content-between"
              style={{ ...cardStyle, backgroundColor: card.color }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
              <div>
                <div className="fs-4 fw-bold">{card.count}</div>
                <div className="fs-6">{card.title}</div>
              </div>
              <div className="fs-2">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="row g-3 mt-4 justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="bg-white p-3 shadow-sm rounded h-100">
            <h6 className="text-center text-secondary">Workers Attendance</h6>
            <div style={{ maxHeight: "250px" }}>
              <Doughnut data={workersAttendanceChart} />
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="bg-white p-3 shadow-sm rounded h-100">
            <h6 className="text-center text-secondary">Workers Salary (Paid vs Pending)</h6>
            <div style={{ maxHeight: "250px" }}>
              <Bar data={workersSalaryChart} />
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="bg-white p-3 shadow-sm rounded h-100">
            <h6 className="text-center text-secondary">Workers Payment Status</h6>
            <div style={{ maxHeight: "250px" }}>
              <Doughnut data={workersPaymentStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorDashboardSummary;
