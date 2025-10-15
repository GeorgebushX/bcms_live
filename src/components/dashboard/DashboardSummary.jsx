// // import React from "react";
// // import {
// //   FaUsers,
// //   FaBuilding,
// //   FaMapMarkedAlt,
// //   FaUserTie,
// //   FaClipboardList,
// //   FaMoneyCheckAlt,
// // } from "react-icons/fa";
// // import { Doughnut, Bar } from "react-chartjs-2";
// // import "chart.js/auto";

// // const cardStyle = {
// //   borderRadius: "12px",
// //   boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
// //   transition: "transform 0.3s ease",
// //   cursor: "pointer",
// //   minHeight: "110px",
// // };

// // const DashboardSummary = () => {
// //   const cards = [
// //     { title: "Clients", count: 3, icon: <FaUsers />, color: "#f1c40f" },
// //     { title: "Supervisors", count: 1, icon: <FaUserTie />, color: "#e74c3c" },
// //     { title: "Total Sites", count: 5, icon: <FaMapMarkedAlt />, color: "#8e44ad" },
// //     { title: "Employees", count: 8, icon: <FaBuilding />, color: "#3498db" },
// //     { title: "Attendance", count: 30, icon: <FaClipboardList />, color: "#16a085" },
// //     { title: "Salaries", count: 10, icon: <FaMoneyCheckAlt />, color: "#2c3e50" },
// //   ];

// //   const doughnutData = {
// //     labels: ["Approved", "Pending"],
// //     datasets: [
// //       {
// //         data: [70, 30],
// //         backgroundColor: ["#27ae60", "#e67e22"],
// //       },
// //     ],
// //   };

// //   const barData = {
// //     labels: ["15/Jan", "16/Jan", "17/Jan", "18/Jan", "19/Jan", "20/Jan", "21/Jan"],
// //     datasets: [
// //       {
// //         label: "Receivable",
// //         data: [0, 0, 0, 0, 0, 0, 200000],
// //         backgroundColor: "#bdc3c7",
// //       },
// //       {
// //         label: "Expense",
// //         data: [0, 0, 0, 0, 0, 0, 25000],
// //         backgroundColor: "#3498db",
// //       },
// //     ],
// //   };

// //   return (
// //     <div className="container py-4">
// //       <h3 className="mb-4 fw-bold text-center text-primary">
// //         Engineer Dashboard
// //       </h3>

// //       <div className="row g-3">
// //         {cards.map((card, index) => (
// //           <div className="col-12 col-sm-6 col-lg-4" key={index}>
// //             <div
// //               className="p-4 text-white d-flex align-items-center justify-content-between"
// //               style={{ ...cardStyle, backgroundColor: card.color }}
// //               onMouseEnter={(e) =>
// //                 (e.currentTarget.style.transform = "scale(1.03)")
// //               }
// //               onMouseLeave={(e) =>
// //                 (e.currentTarget.style.transform = "scale(1)")
// //               }
// //             >
// //               <div>
// //                 <div className="fs-4 fw-bold">{card.count}</div>
// //                 <div className="fs-6">{card.title}</div>
// //               </div>
// //               <div className="fs-2">{card.icon}</div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="row g-3 mt-4">
// //         <div className="col-12 col-md-6 col-lg-4">
// //           <div className="bg-white p-3 shadow-sm rounded h-100">
// //             <h6 className="text-center">Purchase Chart</h6>
// //             <div style={{ maxHeight: "250px" }}>
// //               <Doughnut data={doughnutData} />
// //             </div>
// //           </div>
// //         </div>

// //         <div className="col-12 col-md-6 col-lg-4">
// //           <div className="bg-white p-3 shadow-sm rounded h-100">
// //             <h6 className="text-center">Expense vs Receivable</h6>
// //             <div style={{ maxHeight: "250px" }}>
// //               <Bar data={barData} />
// //             </div>
// //           </div>
// //         </div>

// //         <div className="col-12 col-md-6 col-lg-4">
// //           <div className="bg-white p-3 shadow-sm rounded h-100">
// //             <h6 className="text-center">Expense Chart</h6>
// //             <div style={{ maxHeight: "250px" }}>
// //               <Doughnut
// //                 data={{
// //                   labels: ["Approved", "Pending"],
// //                   datasets: [
// //                     {
// //                       data: [60, 40],
// //                       backgroundColor: ["#f39c12", "#2980b9"],
// //                     },
// //                   ],
// //                 }}
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DashboardSummary;

// import React, { useState, useEffect } from "react";
// import {
//   FaUsers,
//   FaBuilding,
//   FaMapMarkedAlt,
//   FaUserTie,
//   FaClipboardList,
//   FaMoneyCheckAlt,
//   FaEye,
//   FaArrowLeft,
// } from "react-icons/fa";
// import { Doughnut, Bar } from "react-chartjs-2";
// import "chart.js/auto";
// import axios from "axios";

// const cardStyle = {
//   borderRadius: "12px",
//   boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
//   transition: "transform 0.3s ease",
//   cursor: "pointer",
//   minHeight: "110px",
// };

// const EngineerDashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [selectedSite, setSelectedSite] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:3002/api/stats");
//       setDashboardData(response.data.data);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to fetch dashboard data");
//       setLoading(false);
//       console.error("Error fetching dashboard data:", err);
//     }
//   };

//   const fetchSiteDetails = async (siteId) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `http://localhost:3002/api/site/${siteId}`
//       );
//       setSelectedSite(response.data.data);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to fetch site details");
//       setLoading(false);
//       console.error("Error fetching site details:", err);
//     }
//   };

//   const handleSiteClick = (siteId) => {
//     fetchSiteDetails(siteId);
//   };

//   const handleBackToDashboard = () => {
//     setSelectedSite(null);
//   };

//   if (loading) {
//     return (
//       <div className="container py-4">
//         <div
//           className="d-flex justify-content-center align-items-center"
//           style={{ minHeight: "400px" }}
//         >
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container py-4">
//         <div className="alert alert-danger" role="alert">
//           {error}
//           <button
//             className="btn btn-sm btn-outline-danger ms-3"
//             onClick={fetchDashboardData}
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!dashboardData) {
//     return (
//       <div className="container py-4">
//         <div className="alert alert-warning" role="alert">
//           No data available
//         </div>
//       </div>
//     );
//   }

//   // Render Site Details View
//   if (selectedSite) {
//     return (
//       <div className="container py-4">
//         <button
//           className="btn btn-outline-primary mb-3"
//           onClick={handleBackToDashboard}
//         >
//           <FaArrowLeft className="me-2" /> Back to Dashboard
//         </button>

//         <div className="card shadow-sm mb-4">
//           <div className="card-header bg-primary text-white">
//             <h4 className="mb-0">
//               {selectedSite.site.siteName} - Site Details
//             </h4>
//           </div>
//           <div className="card-body">
//             <div className="row">
//               <div className="col-md-6">
//                 <p>
//                   <strong>Location:</strong> {selectedSite.site.location}
//                 </p>
//                 <p>
//                   <strong>Total Area:</strong> {selectedSite.site.totalAreaSqFt}{" "}
//                   sq.ft
//                 </p>
//                 <p>
//                   <strong>Budget:</strong> ₹
//                   {selectedSite.site.totalBudget?.toLocaleString()}
//                 </p>
//                 <p>
//                   <strong>Status:</strong>{" "}
//                   <span className="badge bg-info">
//                     {selectedSite.site.status}
//                   </span>
//                 </p>
//               </div>
//               <div className="col-md-6">
//                 <p>
//                   <strong>Start Date:</strong> {selectedSite.site.startDate}
//                 </p>
//                 <p>
//                   <strong>End Date:</strong>{" "}
//                   {selectedSite.site.endDate || "Not set"}
//                 </p>
//                 <p>
//                   <strong>Client:</strong> {selectedSite.site.client?.name}
//                 </p>
//                 <p>
//                   <strong>Supervisors:</strong>{" "}
//                   {selectedSite.supervisors.length} /{" "}
//                   {selectedSite.site.totalSupervisors}
//                 </p>
//               </div>
//             </div>

//             {selectedSite.site.siteMap && (
//               <div className="mt-3">
//                 <h5>Site Map</h5>
//                 <img
//                   src={selectedSite.site.siteMap}
//                   alt="Site Map"
//                   className="img-fluid rounded shadow-sm"
//                   style={{ maxHeight: "300px" }}
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-md-6">
//             <div className="card shadow-sm mb-4">
//               <div className="card-header bg-info text-white">
//                 <h5 className="mb-0">Attendance Summary</h5>
//               </div>
//               <div className="card-body">
//                 <div className="row text-center">
//                   <div className="col-6 col-md-3 mb-3">
//                     <div className="p-3 bg-success bg-opacity-10 rounded">
//                       <h4 className="text-success">
//                         {selectedSite.attendance.fullday}
//                       </h4>
//                       <small>Full Day</small>
//                     </div>
//                   </div>
//                   <div className="col-6 col-md-3 mb-3">
//                     <div className="p-3 bg-warning bg-opacity-10 rounded">
//                       <h4 className="text-warning">
//                         {selectedSite.attendance.halfday}
//                       </h4>
//                       <small>Half Day</small>
//                     </div>
//                   </div>
//                   <div className="col-6 col-md-3 mb-3">
//                     <div className="p-3 bg-primary bg-opacity-10 rounded">
//                       <h4 className="text-primary">
//                         {selectedSite.attendance.overtime}
//                       </h4>
//                       <small>Overtime</small>
//                     </div>
//                   </div>
//                   <div className="col-6 col-md-3 mb-3">
//                     <div className="p-3 bg-danger bg-opacity-10 rounded">
//                       <h4 className="text-danger">
//                         {selectedSite.attendance.absent}
//                       </h4>
//                       <small>Absent</small>
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-center mt-2">
//                   <strong>Total Per Day Salary:</strong> ₹
//                   {selectedSite.attendance.totalPerDaySalary?.toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-6">
//             <div className="card shadow-sm mb-4">
//               <div className="card-header bg-secondary text-white">
//                 <h5 className="mb-0">
//                   Supervisors ({selectedSite.supervisors.length})
//                 </h5>
//               </div>
//               <div
//                 className="card-body"
//                 style={{ maxHeight: "300px", overflowY: "auto" }}
//               >
//                 {selectedSite.supervisors.map((supervisor, index) => (
//                   <div
//                     key={index}
//                     className="d-flex align-items-center mb-3 p-2 bg-light rounded"
//                   >
//                     {supervisor.photo && (
//                       <img
//                         src={supervisor.photo}
//                         alt={supervisor.name}
//                         className="rounded-circle me-3"
//                         style={{
//                           width: "50px",
//                           height: "50px",
//                           objectFit: "cover",
//                         }}
//                       />
//                     )}
//                     <div className="flex-grow-1">
//                       <h6 className="mb-0">{supervisor.name}</h6>
//                       <small className="text-muted">
//                         {supervisor.supervisorType}
//                       </small>
//                       <div>
//                         <span
//                           className={`badge ${
//                             supervisor.currentAttendance?.status === "Fullday"
//                               ? "bg-success"
//                               : supervisor.currentAttendance?.status ===
//                                 "Halfday"
//                               ? "bg-warning"
//                               : supervisor.currentAttendance?.status ===
//                                 "Overtime"
//                               ? "bg-primary"
//                               : "bg-danger"
//                           }`}
//                         >
//                           {supervisor.currentAttendance?.status || "Absent"}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="text-end">
//                       <small className="d-block">
//                         ₹{supervisor.perDaySalary?.toLocaleString()}
//                       </small>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Render Main Dashboard View
//   const { summary, attendance, sites } = dashboardData;

//   const cards = [
//     {
//       title: "Clients",
//       count: summary.totalClients,
//       icon: <FaUsers />,
//       color: "#f1c40f",
//     },
//     {
//       title: "Supervisors",
//       count: summary.totalSupervisors,
//       icon: <FaUserTie />,
//       color: "#e74c3c",
//     },
//     {
//       title: "Total Sites",
//       count: summary.totalSites,
//       icon: <FaMapMarkedAlt />,
//       color: "#8e44ad",
//     },
//     {
//       title: "Total Budget",
//       count: `₹${summary.totalBudget?.toLocaleString()}`,
//       icon: <FaMoneyCheckAlt />,
//       color: "#3498db",
//     },
//     {
//       title: "Today's Attendance",
//       count: `${
//         attendance.fullday + attendance.halfday + attendance.overtime
//       }/${summary.totalSupervisors}`,
//       icon: <FaClipboardList />,
//       color: "#16a085",
//     },
//     {
//       title: "Today's Salary",
//       count: `₹${attendance.totalPerDaySalary?.toLocaleString()}`,
//       icon: <FaMoneyCheckAlt />,
//       color: "#2c3e50",
//     },
//   ];

//   const attendanceData = {
//     labels: ["Full Day", "Half Day", "Overtime", "Absent"],
//     datasets: [
//       {
//         data: [
//           attendance.fullday,
//           attendance.halfday,
//           attendance.overtime,
//           attendance.absent,
//         ],
//         backgroundColor: ["#27ae60", "#f39c12", "#3498db", "#e74c3c"],
//       },
//     ],
//   };

//   const budgetData = {
//     labels: sites.slice(0, 5).map((site) => site.siteName),
//     datasets: [
//       {
//         label: "Budget (₹)",
//         data: sites.slice(0, 5).map((site) => site.totalBudget / 1000), // Convert to thousands for better visualization
//         backgroundColor: "#2980b9",
//       },
//     ],
//   };

//   return (
//     <div className="container py-4">
//       <h3 className="mb-4 fw-bold text-center text-primary">
//         Engineer Dashboard
//       </h3>

//       <div className="row g-3">
//         {cards.map((card, index) => (
//           <div className="col-12 col-sm-6 col-lg-4" key={index}>
//             <div
//               className="p-4 text-white d-flex align-items-center justify-content-between"
//               style={{ ...cardStyle, backgroundColor: card.color }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.transform = "scale(1.03)")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.transform = "scale(1)")
//               }
//             >
//               <div>
//                 <div className="fs-4 fw-bold">{card.count}</div>
//                 <div className="fs-6">{card.title}</div>
//               </div>
//               <div className="fs-2">{card.icon}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="row g-3 mt-4">
//         <div className="col-12 col-md-6 col-lg-4">
//           <div className="bg-white p-3 shadow-sm rounded h-100">
//             <h6 className="text-center">Today's Attendance</h6>
//             <div style={{ maxHeight: "250px" }}>
//               <Doughnut
//                 data={attendanceData}
//                 options={{
//                   plugins: {
//                     legend: {
//                       position: "bottom",
//                     },
//                   },
//                 }}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="col-12 col-md-6 col-lg-4">
//           <div className="bg-white p-3 shadow-sm rounded h-100">
//             <h6 className="text-center">Site Budgets (in thousands)</h6>
//             <div style={{ maxHeight: "250px" }}>
//               <Bar
//                 data={budgetData}
//                 options={{
//                   scales: {
//                     y: {
//                       beginAtZero: true,
//                       title: {
//                         display: true,
//                         text: "Budget (₹ thousands)",
//                       },
//                     },
//                   },
//                   plugins: {
//                     legend: {
//                       display: false,
//                     },
//                   },
//                 }}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="col-12 col-md-6 col-lg-4">
//           <div className="bg-white p-3 shadow-sm rounded h-100">
//             <h6 className="text-center">Salary Distribution</h6>
//             <div style={{ maxHeight: "250px" }}>
//               <Doughnut
//                 data={{
//                   labels: ["Today's Salary", "Remaining Budget"],
//                   datasets: [
//                     {
//                       data: [
//                         attendance.totalPerDaySalary,
//                         summary.totalBudget - attendance.totalPerDaySalary,
//                       ],
//                       backgroundColor: ["#f39c12", "#2980b9"],
//                     },
//                   ],
//                 }}
//                 options={{
//                   plugins: {
//                     legend: {
//                       position: "bottom",
//                     },
//                   },
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row mt-4">
//         <div className="col-12">
//           <div className="card shadow-sm">
//             <div className="card-header bg-primary text-white">
//               <h5 className="mb-0">Sites Overview</h5>
//             </div>
//             <div className="card-body">
//               <div className="table-responsive">
//                 <table className="table table-hover">
//                   <thead>
//                     <tr>
//                       <th>Site Name</th>
//                       <th>Location</th>
//                       <th>Budget</th>
//                       <th>Supervisors</th>
//                       <th>Status</th>
//                       <th>Attendance Today</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {sites.map((site, index) => (
//                       <tr key={index}>
//                         <td>{site.siteName}</td>
//                         <td>{site.location}</td>
//                         <td>₹{site.totalBudget?.toLocaleString()}</td>
//                         <td>
//                           <span
//                             className={`badge ${
//                               site.supervisors.length === site.totalSupervisors
//                                 ? "bg-success"
//                                 : site.supervisors.length > 0
//                                 ? "bg-warning"
//                                 : "bg-danger"
//                             }`}
//                           >
//                             {site.supervisors.length}/{site.totalSupervisors}
//                           </span>
//                         </td>
//                         <td>
//                           <span
//                             className={`badge ${
//                               site.status === "Completed"
//                                 ? "bg-success"
//                                 : site.status === "In Progress"
//                                 ? "bg-primary"
//                                 : site.status === "On Hold"
//                                 ? "bg-warning"
//                                 : "bg-info"
//                             }`}
//                           >
//                             {site.status}
//                           </span>
//                         </td>
//                         <td>
//                           <span className="badge bg-success me-1">
//                             {site.attendance.fullday}F
//                           </span>
//                           <span className="badge bg-warning me-1">
//                             {site.attendance.halfday}H
//                           </span>
//                           <span className="badge bg-primary me-1">
//                             {site.attendance.overtime}O
//                           </span>
//                           <span className="badge bg-danger">
//                             {site.attendance.absent}A
//                           </span>
//                         </td>
//                         <td>
//                           <button
//                             className="btn btn-sm btn-outline-primary"
//                             onClick={() => handleSiteClick(site._id)}
//                           >
//                             <FaEye className="me-1" /> View
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EngineerDashboard;

import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaBuilding,
  FaMapMarkedAlt,
  FaUserTie,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaEye,
  FaArrowLeft,
  FaIdCard,
  FaPhone,
  FaEnvelope,
  FaDownload,
  FaTimes,
  FaExpand,
} from "react-icons/fa";
import { Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

const cardStyle = {
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease",
  cursor: "pointer",
  minHeight: "110px",
};

const EngineerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [supervisorsView, setSupervisorsView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [siteMapVisible, setSiteMapVisible] = useState(false);
  const [expandedSiteMap, setExpandedSiteMap] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://bulding-constraction-employee-management.onrender.com/api/stats"
      );
      setDashboardData(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch dashboard data");
      setLoading(false);
      console.error("Error fetching dashboard data:", err);
    }
  };

  const fetchSiteDetails = async (siteId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://bulding-constraction-employee-management.onrender.com/api/site/${siteId}`
      );
      setSelectedSite(response.data.data);
      setSupervisorsView(false);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch site details");
      setLoading(false);
      console.error("Error fetching site details:", err);
    }
  };

  const fetchSupervisors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://bulding-constraction-employee-management.onrender.com/api/supervisors"
      );
      setDashboardData((prev) => ({
        ...prev,
        supervisorsData: response.data.data,
      }));
      setSupervisorsView(true);
      setSelectedSite(null);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch supervisors data");
      setLoading(false);
      console.error("Error fetching supervisors:", err);
    }
  };

  const handleSiteClick = (siteId) => {
    fetchSiteDetails(siteId);
  };

  const handleSupervisorsClick = () => {
    fetchSupervisors();
  };

  const handleBackToDashboard = () => {
    setSelectedSite(null);
    setSupervisorsView(false);
  };

  const toggleSiteMap = () => {
    setSiteMapVisible(!siteMapVisible);
  };

  const toggleExpandSiteMap = () => {
    setExpandedSiteMap(!expandedSiteMap);
  };

  const downloadSiteMap = () => {
    if (!selectedSite?.site?.siteMap) return;

    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = selectedSite.site.siteMap;
    link.download = `${selectedSite.site.siteName}_site_map.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="container py-4">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          {error}
          <button
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={fetchDashboardData}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning" role="alert">
          No data available
        </div>
      </div>
    );
  }

  // Render Supervisors View
  if (supervisorsView && dashboardData.supervisorsData) {
    const { supervisors, attendanceSummary } = dashboardData.supervisorsData;

    return (
      <div className="container py-4">
        <button
          className="btn btn-outline-primary mb-3"
          onClick={handleBackToDashboard}
        >
          <FaArrowLeft className="me-2" /> Back to Dashboard
        </button>

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-info text-white">
            <h4 className="mb-0">All Supervisors</h4>
          </div>
          <div className="card-body">
            <div className="row text-center mb-4">
              <div className="col-6 col-md-2 mb-3">
                <div className="p-3 bg-primary bg-opacity-10 rounded">
                  <h4 className="text-primary">{attendanceSummary.total}</h4>
                  <small>Total</small>
                </div>
              </div>
              <div className="col-6 col-md-2 mb-3">
                <div className="p-3 bg-success bg-opacity-10 rounded">
                  <h4 className="text-success">{attendanceSummary.fullday}</h4>
                  <small>Full Day</small>
                </div>
              </div>
              <div className="col-6 col-md-2 mb-3">
                <div className="p-3 bg-warning bg-opacity-10 rounded">
                  <h4 className="text-warning">{attendanceSummary.halfday}</h4>
                  <small>Half Day</small>
                </div>
              </div>
              <div className="col-6 col-md-2 mb-3">
                <div className="p-3 bg-info bg-opacity-10 rounded">
                  <h4 className="text-info">{attendanceSummary.overtime}</h4>
                  <small>Overtime</small>
                </div>
              </div>
              <div className="col-6 col-md-2 mb-3">
                <div className="p-3 bg-danger bg-opacity-10 rounded">
                  <h4 className="text-danger">{attendanceSummary.absent}</h4>
                  <small>Absent</small>
                </div>
              </div>
              <div className="col-6 col-md-2 mb-3">
                <div className="p-3 bg-secondary bg-opacity-10 rounded">
                  <h4 className="text-secondary">
                    ₹{attendanceSummary.totalPerDaySalary?.toLocaleString()}
                  </h4>
                  <small>Total Salary</small>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Type</th>
                    <th>Site</th>
                    <th>Salary/Day</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {supervisors.map((supervisor, index) => (
                    <tr key={index}>
                      <td>
                        {supervisor.photo ? (
                          <img
                            src={supervisor.photo}
                            alt={supervisor.name}
                            className="rounded-circle"
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            className="rounded-circle bg-secondary d-flex align-items-center justify-content-center"
                            style={{ width: "50px", height: "50px" }}
                          >
                            <FaUserTie className="text-white" />
                          </div>
                        )}
                      </td>
                      <td>
                        <strong>{supervisor.name}</strong>
                      </td>
                      <td>
                        <div>
                          <small className="d-block">
                            <FaEnvelope className="me-1" /> {supervisor.email}
                          </small>
                          <small className="d-block">
                            <FaPhone className="me-1" /> {supervisor.phone}
                          </small>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-info">
                          {supervisor.supervisorType}
                        </span>
                      </td>
                      <td>
                        {supervisor.site
                          ? supervisor.site.siteName
                          : "Not Assigned"}
                      </td>
                      <td>₹{supervisor.perDaySalary?.toLocaleString()}</td>
                      <td>
                        <span
                          className={`badge ${
                            supervisor.currentAttendance?.status === "Fullday"
                              ? "bg-success"
                              : supervisor.currentAttendance?.status ===
                                "Halfday"
                              ? "bg-warning"
                              : supervisor.currentAttendance?.status ===
                                "Overtime"
                              ? "bg-primary"
                              : "bg-danger"
                          }`}
                        >
                          {supervisor.currentAttendance?.status || "Absent"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Site Details View
  if (selectedSite) {
    return (
      <div className="container py-4 position-relative">
        <button
          className="btn btn-outline-primary mb-3"
          onClick={handleBackToDashboard}
        >
          <FaArrowLeft className="me-2" /> Back to Dashboard
        </button>

        {/* Site Map Floating Card */}
        {selectedSite.site.siteMap && siteMapVisible && (
          <div className={`site-map-card ${expandedSiteMap ? "expanded" : ""}`}>
            <div className="site-map-header d-flex justify-content-between align-items-center">
              <h6 className="mb-0">{selectedSite.site.siteName} - Site Map</h6>
              <div>
                <button
                  className="btn btn-sm btn-outline-secondary me-1"
                  onClick={toggleExpandSiteMap}
                >
                  <FaExpand />
                </button>
                <button
                  className="btn btn-sm btn-outline-primary me-1"
                  onClick={downloadSiteMap}
                >
                  <FaDownload />
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={toggleSiteMap}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="site-map-body">
              <img
                src={selectedSite.site.siteMap}
                alt="Site Map"
                className="img-fluid"
              />
            </div>
          </div>
        )}

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 className="mb-0">
              {selectedSite.site.siteName} - Site Details
            </h4>
            {selectedSite.site.siteMap && (
              <button className="btn btn-light btn-sm" onClick={toggleSiteMap}>
                <FaMapMarkedAlt className="me-1" /> View Site Map
              </button>
            )}
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Location:</strong> {selectedSite.site.location}
                </p>
                <p>
                  <strong>Total Area:</strong> {selectedSite.site.totalAreaSqFt}{" "}
                  sq.ft
                </p>
                <p>
                  <strong>Budget:</strong> ₹
                  {selectedSite.site.totalBudget?.toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="badge bg-info">
                    {selectedSite.site.status}
                  </span>
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Start Date:</strong> {selectedSite.site.startDate}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {selectedSite.site.endDate || "Not set"}
                </p>
                <p>
                  <strong>Client:</strong> {selectedSite.site.client?.name}
                </p>
                <p>
                  <strong>Supervisors:</strong>{" "}
                  {selectedSite.supervisors.length} /{" "}
                  {selectedSite.site.totalSupervisors}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-info text-white">
                <h5 className="mb-0">Attendance Summary</h5>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-6 col-md-3 mb-3">
                    <div className="p-3 bg-success bg-opacity-10 rounded">
                      <h4 className="text-success">
                        {selectedSite.attendance.fullday}
                      </h4>
                      <small>Full Day</small>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <div className="p-3 bg-warning bg-opacity-10 rounded">
                      <h4 className="text-warning">
                        {selectedSite.attendance.halfday}
                      </h4>
                      <small>Half Day</small>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <div className="p-3 bg-primary bg-opacity-10 rounded">
                      <h4 className="text-primary">
                        {selectedSite.attendance.overtime}
                      </h4>
                      <small>Overtime</small>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <div className="p-3 bg-danger bg-opacity-10 rounded">
                      <h4 className="text-danger">
                        {selectedSite.attendance.absent}
                      </h4>
                      <small>Absent</small>
                    </div>
                  </div>
                </div>
                <p className="text-center mt-2">
                  <strong>Total Per Day Salary:</strong> ₹
                  {selectedSite.attendance.totalPerDaySalary?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-secondary text-white">
                <h5 className="mb-0">
                  Supervisors ({selectedSite.supervisors.length})
                </h5>
              </div>
              <div
                className="card-body"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {selectedSite.supervisors.map((supervisor, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center mb-3 p-2 bg-light rounded"
                  >
                    {supervisor.photo ? (
                      <img
                        src={supervisor.photo}
                        alt={supervisor.name}
                        className="rounded-circle me-3"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-secondary d-flex align-items-center justify-content-center me-3"
                        style={{ width: "50px", height: "50px" }}
                      >
                        <FaUserTie className="text-white" />
                      </div>
                    )}
                    <div className="flex-grow-1">
                      <h6 className="mb-0">{supervisor.name}</h6>
                      <small className="text-muted">
                        {supervisor.supervisorType}
                      </small>
                      <div>
                        <span
                          className={`badge ${
                            supervisor.currentAttendance?.status === "Fullday"
                              ? "bg-success"
                              : supervisor.currentAttendance?.status ===
                                "Halfday"
                              ? "bg-warning"
                              : supervisor.currentAttendance?.status ===
                                "Overtime"
                              ? "bg-primary"
                              : "bg-danger"
                          }`}
                        >
                          {supervisor.currentAttendance?.status || "Absent"}
                        </span>
                      </div>
                    </div>
                    <div className="text-end">
                      <small className="d-block">
                        ₹{supervisor.perDaySalary?.toLocaleString()}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Main Dashboard View
  const { summary, attendance, sites } = dashboardData;

  const cards = [
    {
      title: "Clients",
      count: summary.totalClients,
      icon: <FaUsers />,
      color: "#f1c40f",
    },
    {
      title: "Total Sites",
      count: summary.totalSites,
      icon: <FaMapMarkedAlt />,
      color: "#8e44ad",
    },
    {
      title: "Supervisors",
      count: summary.totalSupervisors,
      icon: <FaUserTie />,
      color: "#e74c3c",
      onClick: handleSupervisorsClick,
    },
    {
      title: "Total Budget",
      count: `₹${summary.totalBudget?.toLocaleString()}`,
      icon: <FaMoneyCheckAlt />,
      color: "#3498db",
    },
    {
      title: "Today's Attendance",
      count: `${
        attendance.fullday + attendance.halfday + attendance.overtime
      }/${summary.totalSupervisors}`,
      icon: <FaClipboardList />,
      color: "#16a085",
    },
    {
      title: "Today's Salary",
      count: `₹${attendance.totalPerDaySalary?.toLocaleString()}`,
      icon: <FaMoneyCheckAlt />,
      color: "#2c3e50",
    },
  ];

  const attendanceData = {
    labels: ["Full Day", "Half Day", "Overtime", "Absent"],
    datasets: [
      {
        data: [
          attendance.fullday,
          attendance.halfday,
          attendance.overtime,
          attendance.absent,
        ],
        backgroundColor: ["#27ae60", "#f39c12", "#3498db", "#e74c3c"],
      },
    ],
  };

  const budgetData = {
    labels: sites.slice(0, 5).map((site) => site.siteName),
    datasets: [
      {
        label: "Budget (₹)",
        data: sites.slice(0, 5).map((site) => site.totalBudget / 1000),
        backgroundColor: "#2980b9",
      },
    ],
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4 fw-bold text-center text-primary">
        Engineer Dashboard
      </h3>

      <div className="row g-3">
        {cards.map((card, index) => (
          <div className="col-12 col-sm-6 col-lg-4" key={index}>
            <div
              className="p-4 text-white d-flex align-items-center justify-content-between"
              style={{ ...cardStyle, backgroundColor: card.color }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              onClick={card.onClick || null}
            >
              <div>
                <div className="fs-4 fw-bold">{card.count}</div>
                <div className="fs-6">{card.title}</div>
              </div>
              <div className="fs-2">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3 mt-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="bg-white p-3 shadow-sm rounded h-100">
            <h6 className="text-center">Today's Attendance</h6>
            <div style={{ maxHeight: "250px" }}>
              <Doughnut
                data={attendanceData}
                options={{
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="bg-white p-3 shadow-sm rounded h-100">
            <h6 className="text-center">Site Budgets (in thousands)</h6>
            <div style={{ maxHeight: "250px" }}>
              <Bar
                data={budgetData}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Budget (₹ thousands)",
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="bg-white p-3 shadow-sm rounded h-100">
            <h6 className="text-center">Salary Distribution</h6>
            <div style={{ maxHeight: "250px" }}>
              <Doughnut
                data={{
                  labels: ["Today's Salary", "Remaining Budget"],
                  datasets: [
                    {
                      data: [
                        attendance.totalPerDaySalary,
                        summary.totalBudget - attendance.totalPerDaySalary,
                      ],
                      backgroundColor: ["#f39c12", "#2980b9"],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Sites Overview</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Site Name</th>
                      <th>Location</th>
                      <th>Budget</th>
                      <th>Supervisors</th>
                      <th>Status</th>
                      <th>Attendance Today</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sites.map((site, index) => (
                      <tr key={index}>
                        <td>{site.siteName}</td>
                        <td>{site.location}</td>
                        <td>₹{site.totalBudget?.toLocaleString()}</td>
                        <td>
                          <span
                            className={`badge ${
                              site.supervisors.length === site.totalSupervisors
                                ? "bg-success"
                                : site.supervisors.length > 0
                                ? "bg-warning"
                                : "bg-danger"
                            }`}
                          >
                            {site.supervisors.length}/{site.totalSupervisors}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              site.status === "Completed"
                                ? "bg-success"
                                : site.status === "In Progress"
                                ? "bg-primary"
                                : site.status === "On Hold"
                                ? "bg-warning"
                                : "bg-info"
                            }`}
                          >
                            {site.status}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-success me-1">
                            {site.attendance.fullday}F
                          </span>
                          <span className="badge bg-warning me-1">
                            {site.attendance.halfday}H
                          </span>
                          <span className="badge bg-primary me-1">
                            {site.attendance.overtime}O
                          </span>
                          <span className="badge bg-danger">
                            {site.attendance.absent}A
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleSiteClick(site._id)}
                          >
                            <FaEye className="me-1" /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-map-card {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 300px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .site-map-card.expanded {
          width: 80%;
          height: 80%;
          bottom: 10%;
          right: 10%;
        }

        .site-map-header {
          padding: 12px 15px;
          background: #3498db;
          color: white;
        }

        .site-map-body {
          padding: 10px;
          max-height: 250px;
          overflow: auto;
        }

        .site-map-card.expanded .site-map-body {
          max-height: calc(100% - 50px);
          height: calc(100% - 50px);
        }

        .site-map-body img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .site-map-card.expanded .site-map-body img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        @media (max-width: 768px) {
          .site-map-card {
            width: 250px;
          }

          .site-map-card.expanded {
            width: 95%;
            height: 70%;
            bottom: 15%;
            right: 2.5%;
          }
        }
      `}</style>
    </div>
  );
};

export default EngineerDashboard;
