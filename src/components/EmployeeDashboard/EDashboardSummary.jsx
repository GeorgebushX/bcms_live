// src/components/EmployeeDashboard/EDashboardSummary.jsx
import React from "react";
import {
  FaUserCircle,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaUsers,
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

const EDashboardSummary = () => {
  const cards = [
    { title: "My Profile", count: 1, icon: <FaUserCircle />, color: "#2980b9" },
    { title: "My Attendance", count: 22, icon: <FaClipboardList />, color: "#27ae60" },
    { title: "My Salary Entries", count: 2, icon: <FaMoneyCheckAlt />, color: "#8e44ad" },
    { title: "Contractors", count: 4, icon: <FaUsers />, color: "#e67e22" },
    { title: "Contractor Attendance", count: 20, icon: <FaClipboardList />, color: "#1abc9c" },
    { title: "Contractor Salary", count: 10, icon: <FaMoneyCheckAlt />, color: "#34495e" },
  ];

  const contractorAttendanceChart = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["#2ecc71", "#e74c3c"],
      },
    ],
  };

  const paymentBarChart = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Receivable",
        data: [0, 0, 0, 0, 0, 0, 200000],
        backgroundColor: "#95a5a6",
      },
      {
        label: "Expense",
        data: [0, 0, 0, 0, 0, 0, 25000],
        backgroundColor: "#3498db",
      },
    ],
  };

  const contractorPaymentStatus = {
    labels: ["Approved", "Pending"],
    datasets: [
      {
        data: [12, 3],
        backgroundColor: ["#16a085", "#f1c40f"],
      },
    ],
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4 fw-bold text-center text-primary">Supervisor Dashboard</h3>

      {/* Cards Section */}
      <div className="row justify-content-center g-3">
        {cards.map((card, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={index}>
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
            <h6 className="text-center text-secondary">Contractor Attendance</h6>
            <div style={{ maxHeight: "250px" }}>
              <Doughnut data={contractorAttendanceChart} />
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="bg-white p-3 shadow-sm rounded h-100">
            <h6 className="text-center text-secondary">Receivable vs Expense</h6>
            <div style={{ maxHeight: "250px" }}>
              <Bar data={paymentBarChart} />
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="bg-white p-3 shadow-sm rounded h-100">
            <h6 className="text-center text-secondary">Contractor Payment Status</h6>
            <div style={{ maxHeight: "250px" }}>
              <Doughnut data={contractorPaymentStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EDashboardSummary;
