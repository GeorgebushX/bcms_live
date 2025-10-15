// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useAuth } from "../../../context/authContext";
// import "bootstrap/dist/css/bootstrap.min.css";

// const WorkerAttendanceList = () => {
//   const { user } = useAuth();
//   const [attendances, setAttendances] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;

//   useEffect(() => {
//     if (user?._id) {
//       fetchData();
//     }
//   }, [selectedDate, user]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Not authenticated.");
//         return;
//       }

//       const res = await axios.get(
//         `https://bulding-constraction-employee-management.onrender.com/api/yes/workers/attendance`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.success && Array.isArray(res.data.data)) {
//         const formattedSelectedDate = new Date(selectedDate).toLocaleDateString(
//           "en-GB"
//         );

//         // ✅ Filter by date AND contractor role
//         const filtered = res.data.data.filter(
//           (att) =>
//             att.currentAttendance?.date === formattedSelectedDate &&
//             att.contractorId?.contractorRole &&
//             att.contractorId.contractorRole === user?.roleType
//         );

//         setAttendances(filtered);
//       } else {
//         toast.warning("⚠️ No worker attendance records found.");
//         setAttendances([]);
//       }
//     } catch (err) {
//       console.error("❌ Fetch Error:", err);
//       toast.error("❌ Error fetching worker attendance");
//       setAttendances([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdate = async (att, status) => {
//     try {
//       const res = await axios.put(
//         `https://bulding-constraction-employee-management.onrender.com/api/yes/workers/attendance/${att._id}`,
//         { status },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );

//       if (res.data.success) {
//         toast.success(`✅ Updated ${att.name}`);
//         setAttendances((prev) =>
//           prev.map((item) =>
//             item._id === att._id
//               ? {
//                   ...item,
//                   currentAttendance: {
//                     ...(item.currentAttendance || {}),
//                     status,
//                   },
//                 }
//               : item
//           )
//         );
//       } else {
//         toast.error("❌ Update failed");
//       }
//     } catch (err) {
//       toast.error("❌ " + (err.response?.data?.message || "Error updating"));
//     }
//   };

//   const handleBulkUpdate = async (status) => {
//     try {
//       const res = await axios.put(
//         "https://bulding-constraction-employee-management.onrender.com/api/workers/attendance/bulk-by-date",
//         { status, date: new Date(selectedDate).toLocaleDateString("en-GB") },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success(`✅ All marked as ${status}`);
//         setAttendances((prev) =>
//           prev.map((a) => ({
//             ...a,
//             currentAttendance: {
//               ...(a.currentAttendance || {}),
//               status,
//               date: new Date(selectedDate).toLocaleDateString("en-GB"),
//             },
//           }))
//         );
//       } else {
//         toast.error("❌ Bulk update failed");
//       }
//     } catch (err) {
//       toast.error("❌ " + (err.response?.data?.message || "Bulk update error"));
//     }
//   };

//   const renderStatusBadge = (status) => {
//     const normalized = status?.toLowerCase();
//     if (normalized === "fullday")
//       return <span className="badge bg-success">✅ Full Day</span>;
//     if (normalized === "halfday")
//       return <span className="badge bg-warning text-dark">⏳ Half Day</span>;
//     if (normalized === "overtime")
//       return <span className="badge bg-primary">⌛ Over Time</span>;
//     return <span className="badge bg-secondary">❌ Not Marked</span>;
//   };

//   const presentStatuses = ["Fullday", "Halfday", "Overtime"];
//   const presentCount = attendances.filter((a) =>
//     presentStatuses.includes(a.currentAttendance?.status)
//   ).length;
//   const absentCount = attendances.length - presentCount;

//   const indexOfLast = currentPage * rowsPerPage;
//   const indexOfFirst = indexOfLast - rowsPerPage;
//   const currentPageData = attendances.slice(indexOfFirst, indexOfLast);

//   return (
//     <main className="d-flex justify-content-center px-2">
//       <div className="w-100" style={{ maxWidth: "1300px", marginTop: "1.5rem" }}>
//         <div className="card shadow-sm border-0 rounded-4 p-4 bg-light">
//           <div className="d-flex justify-content-between flex-wrap align-items-center mb-3">
//             <h4 className="fw-bold text-primary mb-0">Worker Attendance</h4>
//             <div className="text-end">
//               <div className="fw-semibold text-primary fs-5">
//                 {new Date(selectedDate).toLocaleDateString("en-IN", {
//                   weekday: "long",
//                   day: "2-digit",
//                   month: "long",
//                   year: "numeric",
//                 })}
//               </div>
//               <div className="mt-1">
//                 <span className="badge bg-success me-2">
//                   ✅ Present: {presentCount}
//                 </span>
//                 <span className="badge bg-danger">
//                   ❌ Absent: {absentCount}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="row align-items-center mb-3">
//             <div className="col-md-6">
//               <label className="fw-semibold">📅 Select Date</label>
//               <input
//                 type="date"
//                 className="form-control shadow-sm"
//                 value={selectedDate}
//                 max={new Date().toISOString().split("T")[0]}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//               />
//             </div>
//             <div className="col-md-6 mt-3 mt-md-0 d-flex justify-content-md-end gap-2">
//               <button
//                 className="btn btn-success"
//                 onClick={() => handleBulkUpdate("Fullday")}
//               >
//                 Set Full Day
//               </button>
//               <button
//                 className="btn btn-warning"
//                 onClick={() => handleBulkUpdate("Halfday")}
//               >
//                 Set Half Day
//               </button>
//               <button
//                 className="btn btn-primary"
//                 onClick={() => handleBulkUpdate("Overtime")}
//               >
//                 Set Over Time
//               </button>
//             </div>
//           </div>

//           <div className="table-responsive">
//             {loading ? (
//               <p className="text-center text-muted">Loading attendance...</p>
//             ) : (
//               <table className="table table-bordered table-hover align-middle text-center">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>S.No</th>
//                     <th>Worker Name</th>
//                     <th>Role</th>
//                     <th>Date</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentPageData.length > 0 ? (
//                     currentPageData.map((att, index) => {
//                       const status = att.currentAttendance?.status;
//                       return (
//                         <tr key={att._id}>
//                           <td>{indexOfFirst + index + 1}</td>
//                           <td>{att.name}</td>
//                           <td>{att.workerRole || "—"}</td>
//                           <td>
//                             {new Date(selectedDate).toLocaleDateString("en-IN")}
//                           </td>
//                           <td>{renderStatusBadge(status)}</td>
//                           <td>
//                             <div className="d-flex gap-1 justify-content-center flex-wrap">
//                               <button
//                                 className="btn btn-sm btn-success"
//                                 onClick={() => handleUpdate(att, "Fullday")}
//                               >
//                                 FD
//                               </button>
//                               <button
//                                 className="btn btn-sm btn-warning"
//                                 onClick={() => handleUpdate(att, "Halfday")}
//                               >
//                                 HD
//                               </button>
//                               <button
//                                 className="btn btn-sm btn-primary"
//                                 onClick={() => handleUpdate(att, "Overtime")}
//                               >
//                                 OT
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td colSpan="6" className="text-muted py-4">
//                         No attendance records found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             )}
//           </div>

//           <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
//             <button
//               className="btn btn-outline-primary"
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               ⬅ Previous
//             </button>
//             <span className="fw-semibold text-secondary">
//               Page {currentPage} of {Math.ceil(attendances.length / rowsPerPage)}
//             </span>
//             <button
//               className="btn btn-outline-primary"
//               onClick={() => setCurrentPage((prev) => prev + 1)}
//               disabled={
//                 currentPage >= Math.ceil(attendances.length / rowsPerPage)
//               }
//             >
//               Next ➡
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default WorkerAttendanceList;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/authContext";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaEdit,
  FaCalendarAlt,
  FaCheck,
  FaClock,
  FaBusinessTime,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaHistory,
  FaTimes,
  FaFilter,
} from "react-icons/fa";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ======================
// Styled Components
// ======================

const Container = styled.div`
  padding: 1.5rem;
  background-color: #f8f9fa;
  min-height: calc(100vh - 70px);
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;
  h2 {
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  p {
    color: #7f8c8d;
  }
`;

const ActionBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const SearchBox = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: 768px) {
    width: 300px;
  }

  input {
    padding-left: 2.5rem;
    border-radius: 50px;
    border: 1px solid #dfe6e9;
    transition: all 0.3s;

    &:focus {
      border-color: #3498db;
      box-shadow: 0 0 0 0.25rem rgba(52, 152, 219, 0.25);
    }
  }

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #7f8c8d;
  }
`;

const DateFilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .react-datepicker-wrapper {
    width: auto;
  }

  .form-control {
    min-width: 150px;
    cursor: pointer;
  }
`;

const BulkActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const BulkButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  border: none;
  font-size: 0.9rem;

  &.fullday {
    background: linear-gradient(135deg, #28a745, #218838);
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
    }
  }

  &.halfday {
    background: linear-gradient(135deg, #ffc107, #e0a800);
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(255, 193, 7, 0.3);
    }
  }

  &.overtime {
    background: linear-gradient(135deg, #17a2b8, #138496);
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(23, 162, 184, 0.3);
    }
  }

  &.history {
    background: linear-gradient(135deg, #6c757d, #5a6268);
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(108, 117, 125, 0.3);
    }
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const AttendanceCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid;
  border-left-color: ${(props) => {
    switch (props.status) {
      case "Fullday":
        return "#28a745";
      case "Halfday":
        return "#ffc107";
      case "Overtime":
        return "#17a2b8";
      default:
        return "#6c757d";
    }
  }};
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

const CardBody = styled.div`
  flex: 1;
  margin-bottom: 1rem;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const CardField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;

  svg {
    margin-right: 0.75rem;
    color: #7f8c8d;
    min-width: 20px;
  }

  span {
    color: #2c3e50;
    font-weight: 500;
  }
`;

const WorkerAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f0f3f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-right: 1rem;
  flex-shrink: 0;
  border: 2px solid #dee2e6;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    color: #adb5bd;
    width: 60%;
    height: 60%;
  }
`;

const WorkerName = styled.h5`
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #2c3e50;
`;

const WorkerId = styled.p`
  font-size: 0.85rem;
  color: #7f8c8d;
  margin-bottom: 0;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;

  &.fullday {
    background-color: rgba(40, 167, 69, 0.2);
    color: #1e7e34;
  }

  &.halfday {
    background-color: rgba(255, 193, 7, 0.2);
    color: #856404;
  }

  &.overtime {
    background-color: rgba(23, 162, 184, 0.2);
    color: #0c5460;
  }

  &.null {
    background-color: rgba(108, 117, 125, 0.2);
    color: #495057;
  }
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &.edit {
    background-color: rgba(108, 117, 125, 0.1);
    color: #6c757d;

    &:hover {
      background-color: rgba(108, 117, 125, 0.2);
    }
  }

  &.history {
    background-color: rgba(111, 66, 193, 0.1);
    color: #6f42c1;

    &:hover {
      background-color: rgba(111, 66, 193, 0.2);
    }
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;

  @media (min-width: 576px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const PageInfo = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  border: 1px solid #dfe6e9;
  background: white;
  color: #2c3e50;
  padding: 0.5rem 0.75rem;
  border-radius: 5px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
`;

const StatusButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const StatusButton = styled.button`
  border: none;
  border-radius: 50px;
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &.fullday {
    background-color: rgba(40, 167, 69, 0.1);
    color: #28a745;
    &:hover {
      background-color: rgba(40, 167, 69, 0.2);
    }
  }

  &.halfday {
    background-color: rgba(255, 193, 7, 0.1);
    color: #ffc107;
    &:hover {
      background-color: rgba(255, 193, 7, 0.2);
    }
  }

  &.overtime {
    background-color: rgba(23, 162, 184, 0.1);
    color: #17a2b8;
    &:hover {
      background-color: rgba(23, 162, 184, 0.2);
    }
  }

  &.null {
    background-color: rgba(108, 117, 125, 0.1);
    color: #6c757d;
    &:hover {
      background-color: rgba(108, 117, 125, 0.2);
    }
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  border: 1px solid #dee2e6;
  background-color: white;
  color: #495057;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }

  &.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const StatBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;

  &.present {
    background-color: rgba(40, 167, 69, 0.2);
    color: #1e7e34;
  }

  &.absent {
    background-color: rgba(220, 53, 69, 0.2);
    color: #dc3545;
  }
`;

// ======================
// Main Component
// ======================

const WorkerAttendanceList = () => {
  const { user } = useAuth();
  const [attendances, setAttendances] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const workersPerPage = 10;

  useEffect(() => {
    if (user?._id) {
      fetchData();
    }
  }, [selectedDate, user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Not authenticated.");
        return;
      }

      const res = await axios.get(
        `https://bulding-constraction-employee-management.onrender.com/api/yes/workers/attendance`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success && Array.isArray(res.data.data)) {
        const formattedSelectedDate = selectedDate.toLocaleDateString("en-GB");

        // Filter by date AND contractor role
        const filtered = res.data.data.filter(
          (att) =>
            att.currentAttendance?.date === formattedSelectedDate &&
            att.contractorId?.contractorRole &&
            att.contractorId.contractorRole === user?.roleType
        );

        setAttendances(filtered);
      } else {
        toast.warning("No worker attendance records found.");
        setAttendances([]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Error fetching worker attendance");
      setAttendances([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (worker, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `https://bulding-constraction-employee-management.onrender.com/api/yes/workers/attendance/${worker._id}`,
        { status, date: selectedDate.toLocaleDateString("en-GB") },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(`Updated ${worker.name}`);
        setAttendances((prev) =>
          prev.map((item) =>
            item._id === worker._id
              ? {
                  ...item,
                  currentAttendance: {
                    ...(item.currentAttendance || {}),
                    status: status,
                  },
                }
              : item
          )
        );
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("Error updating");
    }
  };

  const handleBulkUpdate = async (status) => {
    try {
      const token = localStorage.getItem("token");
      const date = selectedDate.toLocaleDateString("en-GB");

      const res = await axios.put(
        "https://bulding-constraction-employee-management.onrender.com/api/workers/attendance/bulk-by-date",
        { status, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        toast.success(`All marked as ${status}`);
        setAttendances((prev) =>
          prev.map((a) => ({
            ...a,
            currentAttendance: {
              ...(a.currentAttendance || {}),
              status,
              date: date,
            },
          }))
        );
      } else {
        toast.error("Bulk update failed");
      }
    } catch (err) {
      console.error("Bulk Update Error:", err);
      toast.error("Bulk update error");
    }
  };

  const presentStatuses = ["Fullday", "Halfday", "Overtime"];
  const presentCount = attendances.filter((worker) =>
    presentStatuses.includes(worker.currentAttendance?.status)
  ).length;
  const absentCount = attendances.length - presentCount;

  const filteredWorkers = attendances.filter((worker) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      worker._id.toString().includes(searchLower) ||
      worker.name.toLowerCase().includes(searchLower) ||
      (worker.workerRole && worker.workerRole.toLowerCase().includes(searchLower))
    );
  });

  const indexOfLastWorker = currentPage * workersPerPage;
  const indexOfFirstWorker = indexOfLastWorker - workersPerPage;
  const currentWorkers = filteredWorkers.slice(
    indexOfFirstWorker,
    indexOfLastWorker
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredWorkers.length / workersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getStatusBadge = (status) => {
    let className = "null";
    let text = "Not Marked";

    if (status === "Fullday") {
      className = "fullday";
      text = "Full Day";
    } else if (status === "Halfday") {
      className = "halfday";
      text = "Half Day";
    } else if (status === "Overtime") {
      className = "overtime";
      text = "Overtime";
    }

    return <StatusBadge className={className}>{text}</StatusBadge>;
  };

  const WorkerPhoto = ({ worker }) => {
    const [imageError, setImageError] = useState(false);
    const photoUrl = worker.photo
      ? `https://bulding-constraction-employee-management.onrender.com${worker.photo}`
      : null;

    return (
      <WorkerAvatar>
        {imageError || !photoUrl ? (
          <FaUser size={24} className="text-secondary" />
        ) : (
          <img
            src={photoUrl}
            alt={worker.name}
            onError={() => setImageError(true)}
          />
        )}
      </WorkerAvatar>
    );
  };

  const formatDateForDisplay = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  };

  return (
    <Container>
      <Header>
        <h2>Worker Attendance</h2>
        <p>Manage attendance for all workers</p>
      </Header>

      <ActionBar>
        <SearchBox>
          <FaSearch />
          <input
            type="text"
            placeholder="Search workers..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </SearchBox>

        <DateFilterContainer>
          <FaCalendarAlt />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setCurrentPage(1);
            }}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="Select date"
            maxDate={new Date()}
          />
        </DateFilterContainer>

        <BulkActions>
          <BulkButton
            className="fullday"
            onClick={() => handleBulkUpdate("Fullday")}
          >
            <FaCheck />
            Full Day
          </BulkButton>
          <BulkButton
            className="halfday"
            onClick={() => handleBulkUpdate("Halfday")}
          >
            <FaClock />
            Half Day
          </BulkButton>
          <BulkButton
            className="overtime"
            onClick={() => handleBulkUpdate("Overtime")}
          >
            <FaBusinessTime />
            Overtime
          </BulkButton>
        </BulkActions>
      </ActionBar>

      <StatsContainer>
        <StatBadge className="present">
          <FaCheck /> Present: {presentCount}
        </StatBadge>
        <StatBadge className="absent">
          <FaTimes /> Absent: {absentCount}
        </StatBadge>
      </StatsContainer>

      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : currentWorkers.length > 0 ? (
        <CardContainer>
          {currentWorkers.map((worker) => (
            <AttendanceCard
              key={worker._id}
              status={worker.currentAttendance?.status}
            >
              <CardHeader>
                <WorkerPhoto worker={worker} />
                <div>
                  <WorkerName>{worker.name}</WorkerName>
                  <WorkerId>ID: {worker._id}</WorkerId>
                  {worker.workerRole && (
                    <WorkerId>Role: {worker.workerRole}</WorkerId>
                  )}
                </div>
              </CardHeader>
              <CardBody>
                <CardField>
                  <FaCalendarAlt />
                  <span>{formatDateForDisplay(selectedDate)}</span>
                </CardField>
                <CardField>
                  <FaCheck />
                  <span>
                    {getStatusBadge(worker.currentAttendance?.status)}
                  </span>
                </CardField>

                <StatusButtonsContainer>
                  <StatusButton
                    className="fullday"
                    onClick={() => handleUpdate(worker, "Fullday")}
                  >
                    <FaCheck /> Full Day
                  </StatusButton>
                  <StatusButton
                    className="halfday"
                    onClick={() => handleUpdate(worker, "Halfday")}
                  >
                    <FaClock /> Half Day
                  </StatusButton>
                  <StatusButton
                    className="overtime"
                    onClick={() => handleUpdate(worker, "Overtime")}
                  >
                    <FaBusinessTime /> Overtime
                  </StatusButton>
                  <StatusButton
                    className="null"
                    onClick={() => handleUpdate(worker, null)}
                  >
                    <FaTimes /> Not Marked
                  </StatusButton>
                </StatusButtonsContainer>
              </CardBody>
            </AttendanceCard>
          ))}
        </CardContainer>
      ) : (
        <div className="text-center py-4">
          {searchTerm
            ? "No matching workers found"
            : "No attendance data available for selected date"}
        </div>
      )}

      <PaginationContainer>
        <PageInfo>
          Showing {indexOfFirstWorker + 1} to{" "}
          {Math.min(indexOfLastWorker, filteredWorkers.length)} of{" "}
          {filteredWorkers.length} workers
        </PageInfo>
        <PaginationButtons>
          <PageButton onClick={prevPage} disabled={currentPage === 1}>
            <FaChevronLeft size={14} />
            <span>Previous</span>
          </PageButton>
          <span className="mx-2">
            Page {currentPage} of{" "}
            {Math.ceil(filteredWorkers.length / workersPerPage)}
          </span>
          <PageButton
            onClick={nextPage}
            disabled={
              currentPage >= Math.ceil(filteredWorkers.length / workersPerPage)
            }
          >
            <span>Next</span>
            <FaChevronRight size={14} />
          </PageButton>
        </PaginationButtons>
      </PaginationContainer>
    </Container>
  );
};

export default WorkerAttendanceList;