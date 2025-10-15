// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   FaEdit,
//   FaCalendarAlt,
//   FaCheck,
//   FaClock,
//   FaBusinessTime,
//   FaSearch,
//   FaChevronLeft,
//   FaChevronRight,
//   FaUser,
//   FaHistory,
//   FaTimes,
//   FaFilter,
// } from "react-icons/fa";
// import styled from "styled-components";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// // ======================
// // Styled Components
// // ======================

// const Container = styled.div`
//   padding: 1.5rem;
//   background-color: #f8f9fa;
//   min-height: calc(100vh - 70px);
// `;

// const Header = styled.div`
//   margin-bottom: 2rem;
//   text-align: center;
//   h2 {
//     color: #2c3e50;
//     font-weight: 600;
//     margin-bottom: 0.5rem;
//   }
//   p {
//     color: #7f8c8d;
//   }
// `;

// const ActionBar = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   margin-bottom: 1.5rem;

//   @media (min-width: 768px) {
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//   }
// `;

// const SearchBox = styled.div`
//   position: relative;
//   width: 100%;

//   @media (min-width: 768px) {
//     width: 300px;
//   }

//   input {
//     padding-left: 2.5rem;
//     border-radius: 50px;
//     border: 1px solid #dfe6e9;
//     transition: all 0.3s;

//     &:focus {
//       border-color: #3498db;
//       box-shadow: 0 0 0 0.25rem rgba(52, 152, 219, 0.25);
//     }
//   }

//   svg {
//     position: absolute;
//     left: 1rem;
//     top: 50%;
//     transform: translateY(-50%);
//     color: #7f8c8d;
//   }
// `;

// const DateFilterContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;

//   .react-datepicker-wrapper {
//     width: auto;
//   }

//   .form-control {
//     min-width: 150px;
//     cursor: pointer;
//   }
// `;

// const BulkActions = styled.div`
//   display: flex;
//   gap: 0.5rem;
//   flex-wrap: wrap;

//   @media (min-width: 768px) {
//     gap: 1rem;
//   }
// `;

// const BulkButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
//   color: white;
//   padding: 0.5rem 1rem;
//   border-radius: 50px;
//   text-decoration: none;
//   font-weight: 500;
//   transition: all 0.3s;
//   border: none;
//   font-size: 0.9rem;

//   &.fullday {
//     background: linear-gradient(135deg, #28a745, #218838);
//     &:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
//     }
//   }

//   &.halfday {
//     background: linear-gradient(135deg, #ffc107, #e0a800);
//     &:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 4px 8px rgba(255, 193, 7, 0.3);
//     }
//   }

//   &.overtime {
//     background: linear-gradient(135deg, #17a2b8, #138496);
//     &:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 4px 8px rgba(23, 162, 184, 0.3);
//     }
//   }

//   &.history {
//     background: linear-gradient(135deg, #6c757d, #5a6268);
//     &:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 4px 8px rgba(108, 117, 125, 0.3);
//     }
//   }
// `;

// const CardContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 1.5rem;
//   margin-bottom: 2rem;

//   @media (max-width: 576px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const AttendanceCard = styled.div`
//   background: white;
//   border-radius: 12px;
//   padding: 1.5rem;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//   transition: all 0.3s ease;
//   border-left: 4px solid;
//   border-left-color: ${(props) => {
//     switch (props.status) {
//       case "Fullday":
//         return "#28a745";
//       case "Halfday":
//         return "#ffc107";
//       case "Overtime":
//         return "#17a2b8";
//       default:
//         return "#6c757d";
//     }
//   }};
//   display: flex;
//   flex-direction: column;

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
//   }
// `;

// const CardHeader = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 1rem;
//   padding-bottom: 1rem;
//   border-bottom: 1px solid #eee;
// `;

// const CardBody = styled.div`
//   flex: 1;
//   margin-bottom: 1rem;
// `;

// const CardFooter = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 0.5rem;
//   padding-top: 1rem;
//   border-top: 1px solid #eee;
// `;

// const CardField = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 0.75rem;
//   font-size: 0.9rem;

//   svg {
//     margin-right: 0.75rem;
//     color: #7f8c8d;
//     min-width: 20px;
//   }

//   span {
//     color: #2c3e50;
//     font-weight: 500;
//   }
// `;

// const SupervisorAvatar = styled.div`
//   width: 60px;
//   height: 60px;
//   border-radius: 50%;
//   background-color: #f0f3f5;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   overflow: hidden;
//   margin-right: 1rem;
//   flex-shrink: 0;
//   border: 2px solid #dee2e6;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }

//   svg {
//     color: #adb5bd;
//     width: 60%;
//     height: 60%;
//   }
// `;

// const SupervisorName = styled.h5`
//   font-weight: 600;
//   margin-bottom: 0.25rem;
//   color: #2c3e50;
// `;

// const SupervisorId = styled.p`
//   font-size: 0.85rem;
//   color: #7f8c8d;
//   margin-bottom: 0;
// `;

// const StatusBadge = styled.span`
//   display: inline-block;
//   padding: 0.35rem 0.75rem;
//   border-radius: 50px;
//   font-size: 0.85rem;
//   font-weight: 600;

//   &.fullday {
//     background-color: rgba(40, 167, 69, 0.2);
//     color: #1e7e34;
//   }

//   &.halfday {
//     background-color: rgba(255, 193, 7, 0.2);
//     color: #856404;
//   }

//   &.overtime {
//     background-color: rgba(23, 162, 184, 0.2);
//     color: #0c5460;
//   }

//   &.null {
//     background-color: rgba(108, 117, 125, 0.2);
//     color: #495057;
//   }
// `;

// const ActionButton = styled.button`
//   border: none;
//   border-radius: 50%;
//   width: 36px;
//   height: 36px;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.2s;

//   &.edit {
//     background-color: rgba(108, 117, 125, 0.1);
//     color: #6c757d;

//     &:hover {
//       background-color: rgba(108, 117, 125, 0.2);
//     }
//   }

//   &.history {
//     background-color: rgba(111, 66, 193, 0.1);
//     color: #6f42c1;

//     &:hover {
//       background-color: rgba(111, 66, 193, 0.2);
//     }
//   }
// `;

// const PaginationContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 2rem;
//   gap: 1rem;

//   @media (min-width: 576px) {
//     flex-direction: row;
//     justify-content: space-between;
//   }
// `;

// const PageInfo = styled.span`
//   color: #7f8c8d;
//   font-size: 0.9rem;
// `;

// const PaginationButtons = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// const PageButton = styled.button`
//   border: 1px solid #dfe6e9;
//   background: white;
//   color: #2c3e50;
//   padding: 0.5rem 0.75rem;
//   border-radius: 5px;
//   transition: all 0.2s;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;

//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }

//   &:not(:disabled):hover {
//     background-color: #3498db;
//     color: white;
//     border-color: #3498db;
//   }
// `;

// const StatusButtonsContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.5rem;
//   margin-top: 1rem;
// `;

// const StatusButton = styled.button`
//   border: none;
//   border-radius: 50px;
//   padding: 0.35rem 0.75rem;
//   font-size: 0.8rem;
//   font-weight: 500;
//   transition: all 0.2s;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;

//   &.fullday {
//     background-color: rgba(40, 167, 69, 0.1);
//     color: #28a745;
//     &:hover {
//       background-color: rgba(40, 167, 69, 0.2);
//     }
//   }

//   &.halfday {
//     background-color: rgba(255, 193, 7, 0.1);
//     color: #ffc107;
//     &:hover {
//       background-color: rgba(255, 193, 7, 0.2);
//     }
//   }

//   &.overtime {
//     background-color: rgba(23, 162, 184, 0.1);
//     color: #17a2b8;
//     &:hover {
//       background-color: rgba(23, 162, 184, 0.2);
//     }
//   }

//   &.null {
//     background-color: rgba(108, 117, 125, 0.1);
//     color: #6c757d;
//     &:hover {
//       background-color: rgba(108, 117, 125, 0.2);
//     }
//   }
// `;

// const FilterContainer = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-bottom: 1.5rem;
//   flex-wrap: wrap;
// `;

// const FilterButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.5rem 1rem;
//   border-radius: 50px;
//   border: 1px solid #dee2e6;
//   background-color: white;
//   color: #495057;
//   transition: all 0.2s;

//   &:hover {
//     background-color: #f8f9fa;
//   }

//   &.active {
//     background-color: #3498db;
//     color: white;
//     border-color: #3498db;
//   }
// `;

// const StatsContainer = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-bottom: 1.5rem;
//   flex-wrap: wrap;
// `;

// const StatBadge = styled.span`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.5rem 1rem;
//   border-radius: 50px;
//   font-size: 0.9rem;
//   font-weight: 600;

//   &.present {
//     background-color: rgba(40, 167, 69, 0.2);
//     color: #1e7e34;
//   }

//   &.absent {
//     background-color: rgba(220, 53, 69, 0.2);
//     color: #dc3545;
//   }
// `;

// // ======================
// // Main Component
// // ======================

// const AttendanceList = () => {
//   const [attendances, setAttendances] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const supervisorsPerPage = 10;

//   useEffect(() => {
//     fetchData(formatDateForAPI(selectedDate));
//   }, [selectedDate]);

//   const fetchData = async (date) => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         `https://bulding-constraction-employee-management.onrender.com/api/supervisors/Attendance?date=${date}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (res.data.success && Array.isArray(res.data.data)) {
//         // Ensure we're properly handling the attendance data structure
//         const formattedAttendances = res.data.data.map(supervisor => ({
//           ...supervisor,
//           // Make sure we're using the correct field from the response
//           currentAttendance: supervisor.currentAttendance || { status: null }
//         }));
//         setAttendances(formattedAttendances);
//       } else {
//         toast.warning("No attendance records found.");
//         setAttendances([]);
//       }
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       toast.error("Error fetching data");
//       setAttendances([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDateForAPI = (date) => {
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const formatDateForDisplay = (date) => {
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       weekday: "short",
//     });
//   };

//   const handleUpdate = async (supervisor, status) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.put(
//         `https://bulding-constraction-employee-management.onrender.com/api/supervisors/Attendance/${supervisor._id}`,
//         { status, date: formatDateForAPI(selectedDate) },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success(`Updated ${supervisor.name}`);
//         // Update the specific supervisor's attendance status
//         setAttendances(prev =>
//           prev.map(item =>
//             item._id === supervisor._id
//               ? {
//                   ...item,
//                   currentAttendance: {
//                     ...item.currentAttendance,
//                     status: status,
//                   },
//                 }
//               : item
//           )
//         );
//       } else {
//         toast.error("Update failed");
//       }
//     } catch (err) {
//       console.error("Update Error:", err);
//       toast.error("Error updating");
//     }
//   };

//   const handleBulkUpdate = async (status) => {
//     try {
//       const token = localStorage.getItem("token");
//       const date = formatDateForAPI(selectedDate);

//       const res = await axios.put(
//         "https://bulding-constraction-employee-management.onrender.com/api/supervisors/bulk-by-status",
//         { status, date },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success(`All marked as ${status}`);
//         // Refresh the data after bulk update
//         fetchData(date);
//       } else {
//         toast.error("Bulk update failed");
//       }
//     } catch (err) {
//       console.error("Bulk Update Error:", err);
//       toast.error("Bulk update error");
//     }
//   };

//   const presentStatuses = ["Fullday", "Halfday", "Overtime"];
//   const presentCount = attendances.filter(supervisor =>
//     presentStatuses.includes(supervisor.currentAttendance?.status)
//   ).length;
//   const absentCount = attendances.length - presentCount;

//   const filteredSupervisors = attendances.filter((supervisor) => {
//     if (!searchTerm) return true;
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       supervisor._id.toString().includes(searchLower) ||
//       supervisor.name.toLowerCase().includes(searchLower)
//     );
//   });

//   const indexOfLastSupervisor = currentPage * supervisorsPerPage;
//   const indexOfFirstSupervisor = indexOfLastSupervisor - supervisorsPerPage;
//   const currentSupervisors = filteredSupervisors.slice(
//     indexOfFirstSupervisor,
//     indexOfLastSupervisor
//   );

//   const nextPage = () => {
//     if (
//       currentPage < Math.ceil(filteredSupervisors.length / supervisorsPerPage)
//     ) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const getStatusBadge = (status) => {
//     let className = "null";
//     let text = "Not Marked";

//     if (status === "Fullday") {
//       className = "fullday";
//       text = "Full Day";
//     } else if (status === "Halfday") {
//       className = "halfday";
//       text = "Half Day";
//     } else if (status === "Overtime") {
//       className = "overtime";
//       text = "Overtime";
//     }

//     return <StatusBadge className={className}>{text}</StatusBadge>;
//   };

//   const SupervisorPhoto = ({ supervisor }) => {
//     const [imageError, setImageError] = useState(false);
//     const photoUrl = supervisor.photo
//       ? `https://bulding-constraction-employee-management.onrender.com${supervisor.photo}`
//       : null;

//     return (
//       <SupervisorAvatar>
//         {imageError || !photoUrl ? (
//           <FaUser size={24} className="text-secondary" />
//         ) : (
//           <img
//             src={photoUrl}
//             alt={supervisor.name}
//             onError={() => setImageError(true)}
//           />
//         )}
//       </SupervisorAvatar>
//     );
//   };

//   return (
//     <Container>
//       <Header>
//         <h2>Supervisor Attendance</h2>
//         <p>Manage attendance for all supervisors</p>
//       </Header>

//       <ActionBar>
//         <SearchBox>
//           <FaSearch />
//           <input
//             type="text"
//             placeholder="Search supervisors..."
//             className="form-control"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         </SearchBox>

//         <DateFilterContainer>
//           <FaCalendarAlt />
//           <DatePicker
//             selected={selectedDate}
//             onChange={(date) => {
//               setSelectedDate(date);
//               setCurrentPage(1);
//             }}
//             dateFormat="dd/MM/yyyy"
//             className="form-control"
//             placeholderText="Select date"
//           />
//         </DateFilterContainer>

//         <BulkActions>
//           <BulkButton
//             className="fullday"
//             onClick={() => handleBulkUpdate("Fullday")}
//           >
//             <FaCheck />
//             Full Day
//           </BulkButton>
//           <BulkButton
//             className="halfday"
//             onClick={() => handleBulkUpdate("Halfday")}
//           >
//             <FaClock />
//             Half Day
//           </BulkButton>
//           <BulkButton
//             className="overtime"
//             onClick={() => handleBulkUpdate("Overtime")}
//           >
//             <FaBusinessTime />
//             Overtime
//           </BulkButton>
//         </BulkActions>
//       </ActionBar>

//       <StatsContainer>
//         <StatBadge className="present">
//           <FaCheck /> Present: {presentCount}
//         </StatBadge>
//         <StatBadge className="absent">
//           <FaTimes /> Absent: {absentCount}
//         </StatBadge>
//       </StatsContainer>

//       {loading ? (
//         <div className="text-center py-4">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : currentSupervisors.length > 0 ? (
//         <CardContainer>
//           {currentSupervisors.map((supervisor) => (
//             <AttendanceCard
//               key={supervisor._id}
//               status={supervisor.currentAttendance?.status}
//             >
//               <CardHeader>
//                 <SupervisorPhoto supervisor={supervisor} />
//                 <div>
//                   <SupervisorName>{supervisor.name}</SupervisorName>
//                   <SupervisorId>ID: {supervisor._id}</SupervisorId>
//                 </div>
//               </CardHeader>
//               <CardBody>
//                 <CardField>
//                   <FaCalendarAlt />
//                   <span>{formatDateForDisplay(selectedDate)}</span>
//                 </CardField>
//                 <CardField>
//                   <FaCheck />
//                   <span>
//                     {getStatusBadge(supervisor.currentAttendance?.status)}
//                   </span>
//                 </CardField>

//                 <StatusButtonsContainer>
//                   <StatusButton
//                     className="fullday"
//                     onClick={() => handleUpdate(supervisor, "Fullday")}
//                   >
//                     <FaCheck /> Full Day
//                   </StatusButton>
//                   <StatusButton
//                     className="halfday"
//                     onClick={() => handleUpdate(supervisor, "Halfday")}
//                   >
//                     <FaClock /> Half Day
//                   </StatusButton>
//                   <StatusButton
//                     className="overtime"
//                     onClick={() => handleUpdate(supervisor, "Overtime")}
//                   >
//                     <FaBusinessTime /> Overtime
//                   </StatusButton>
//                   <StatusButton
//                     className="null"
//                     onClick={() => handleUpdate(supervisor, null)}
//                   >
//                     <FaTimes /> Not Marked
//                   </StatusButton>
//                 </StatusButtonsContainer>
//               </CardBody>
//             </AttendanceCard>
//           ))}
//         </CardContainer>
//       ) : (
//         <div className="text-center py-4">
//           {searchTerm
//             ? "No matching supervisors found"
//             : "No attendance data available for selected date"}
//         </div>
//       )}

//       <PaginationContainer>
//         <PageInfo>
//           Showing {indexOfFirstSupervisor + 1} to{" "}
//           {Math.min(indexOfLastSupervisor, filteredSupervisors.length)} of{" "}
//           {filteredSupervisors.length} supervisors
//         </PageInfo>
//         <PaginationButtons>
//           <PageButton onClick={prevPage} disabled={currentPage === 1}>
//             <FaChevronLeft size={14} />
//             <span>Previous</span>
//           </PageButton>
//           <span className="mx-2">
//             Page {currentPage} of{" "}
//             {Math.ceil(filteredSupervisors.length / supervisorsPerPage)}
//           </span>
//           <PageButton
//             onClick={nextPage}
//             disabled={
//               currentPage >=
//               Math.ceil(filteredSupervisors.length / supervisorsPerPage)
//             }
//           >
//             <span>Next</span>
//             <FaChevronRight size={14} />
//           </PageButton>
//         </PaginationButtons>
//       </PaginationContainer>
//     </Container>
//   );
// };

// export default AttendanceList;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
  FaCaretDown,
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

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;

  @media (max-width: 992px) {
    min-width: 700px;
  }
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  cursor: ${(props) => (props.sortable ? "pointer" : "default")};
  white-space: nowrap;

  &:hover {
    background-color: ${(props) =>
      props.sortable ? "rgba(255,255,255,0.1)" : "transparent"};
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  vertical-align: middle;

  @media (max-width: 992px) {
    padding: 0.75rem;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f3f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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

const SupervisorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SupervisorName = styled.span`
  font-weight: 600;
  color: #2c3e50;
`;

const SupervisorId = styled.span`
  font-size: 0.85rem;
  color: #7f8c8d;
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

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-size: 0.85rem;

  &.edit {
    background-color: rgba(108, 117, 125, 0.1);
    color: #6c757d;

    &:hover {
      background-color: rgba(108, 117, 125, 0.2);
    }
  }

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
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
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

const DropdownFilter = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  border: 1px solid #dee2e6;
  background-color: white;
  color: #495057;
  transition: all 0.2s;
  min-width: 200px;
  justify-content: space-between;

  &:hover {
    background-color: #f8f9fa;
  }

  &.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  background-color: white;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 8px;
  padding: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 0.5rem;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }

  &.active {
    background-color: #3498db;
    color: white;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
`;

const ResponsiveActionBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

// ======================
// Main Component
// ======================

const AttendanceList = () => {
  const [attendances, setAttendances] = useState([]);
  const [summary, setSummary] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const supervisorsPerPage = 10;

  const supervisorTypes = [
    "All Types",
    "Centering Supervisor",
    "Steel Supervisor",
    "Mason Supervisor",
    "Carpenter Supervisor",
    "Plumber Supervisor",
    "Electrician Supervisor",
    "Painter Supervisor",
    "Tiles Supervisor",
  ];

  useEffect(() => {
    fetchData(formatDateForAPI(selectedDate));
  }, [selectedDate]);

  const fetchData = async (date) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `https://bulding-constraction-employee-management.onrender.com/api/supervisors/today/Attendance`,
        { date, status: "Overtime" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (
        res.data.success &&
        res.data.data &&
        Array.isArray(res.data.data.supervisors)
      ) {
        setAttendances(res.data.data.supervisors);
        setSummary(res.data.data.summary || {});
      } else {
        toast.warning("No attendance records found.");
        setAttendances([]);
        setSummary({});
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Error fetching data");
      setAttendances([]);
      setSummary({});
    } finally {
      setLoading(false);
    }
  };

  const formatDateForAPI = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateForDisplay = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  };

  const handleUpdate = async (supervisor, status) => {
    try {
      const token = localStorage.getItem("token");
      const date = formatDateForAPI(selectedDate);

      const res = await axios.put(
        `https://bulding-constraction-employee-management.onrender.com/api/supervisors/Attendance/${supervisor.userId}`,
        { status, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        toast.success(`Updated ${supervisor.name}`);
        fetchData(date);
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
      const date = formatDateForAPI(selectedDate);

      const res = await axios.put(
        "https://bulding-constraction-employee-management.onrender.com/api/supervisors/today/Attendance",
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
        fetchData(date);
      } else {
        toast.error("Bulk update failed");
      }
    } catch (err) {
      console.error("Bulk Update Error:", err);
      toast.error("Bulk update error");
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedAttendances = React.useMemo(() => {
    let sortableItems = [...attendances];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [attendances, sortConfig]);

  const presentStatuses = ["Fullday", "Halfday", "Overtime"];
  const presentCount =
    summary.present ||
    attendances.filter((supervisor) =>
      presentStatuses.includes(supervisor.status)
    ).length;
  const absentCount = summary.Absent || attendances.length - presentCount;

  const filteredSupervisors = sortedAttendances.filter((supervisor) => {
    if (!searchTerm && statusFilter === "all" && typeFilter === "all")
      return true;

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      searchTerm === "" ||
      supervisor.userId.toString().includes(searchLower) ||
      supervisor.name.toLowerCase().includes(searchLower) ||
      supervisor.supervisorType.toLowerCase().includes(searchLower);

    const matchesStatus =
      statusFilter === "all" || supervisor.status === statusFilter;

    const matchesType =
      typeFilter === "all" || supervisor.supervisorType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const indexOfLastSupervisor = currentPage * supervisorsPerPage;
  const indexOfFirstSupervisor = indexOfLastSupervisor - supervisorsPerPage;
  const currentSupervisors = filteredSupervisors.slice(
    indexOfFirstSupervisor,
    indexOfLastSupervisor
  );

  const nextPage = () => {
    if (
      currentPage < Math.ceil(filteredSupervisors.length / supervisorsPerPage)
    ) {
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

  const SupervisorPhoto = ({ supervisor }) => {
    const [imageError, setImageError] = useState(false);
    const photoUrl = supervisor.photo
      ? `https://bulding-constraction-employee-management.onrender.com${supervisor.photo}`
      : null;

    return (
      <Avatar>
        {imageError || !photoUrl ? (
          <FaUser size={16} className="text-secondary" />
        ) : (
          <img
            src={photoUrl}
            alt={supervisor.name}
            onError={() => setImageError(true)}
          />
        )}
      </Avatar>
    );
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    return sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown />;
  };

  const handleTypeFilterSelect = (type) => {
    setTypeFilter(type === "All Types" ? "all" : type);
    setShowTypeDropdown(false);
    setCurrentPage(1);
  };

  return (
    <Container>
      <Header>
        <h2>Supervisor Attendance</h2>
        <p>Manage attendance for all supervisors</p>
      </Header>

      <ResponsiveActionBar>
        <SearchBox>
          <FaSearch />
          <input
            type="text"
            placeholder="Search supervisors..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </SearchBox>

        <FilterGroup>
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
            />
          </DateFilterContainer>

          {/* <DropdownFilter>
            <DropdownButton 
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
              className={typeFilter !== "all" ? "active" : ""}
            >
              <span>{typeFilter === "all" ? "All Types" : typeFilter}</span>
              <FaCaretDown />
            </DropdownButton>
            {showTypeDropdown && (
              <DropdownContent>
                {supervisorTypes.map((type) => (
                  <DropdownItem
                    key={type}
                    className={typeFilter === (type === "All Types" ? "all" : type) ? "active" : ""}
                    onClick={() => handleTypeFilterSelect(type)}
                  >
                    {type}
                  </DropdownItem>
                ))}
              </DropdownContent>
            )}
          </DropdownFilter> */}
        </FilterGroup>

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
      </ResponsiveActionBar>

      <StatsContainer>
        <StatBadge className="fullday">
          <FaCheck /> Full Day: {summary.Fullday || 0}
        </StatBadge>
        <StatBadge className="halfday">
          <FaClock /> Half Day: {summary.Halfday || 0}
        </StatBadge>
        <StatBadge className="overtime">
          <FaBusinessTime /> Overtime: {summary.Overtime || 0}
        </StatBadge>
        <StatBadge className="absent">
          <FaTimes /> Absent: {absentCount}
        </StatBadge>
        {/* <StatBadge className="present">
          <FaCheck /> Total: {filteredSupervisors.length}
        </StatBadge> */}
        <DropdownFilter>
          <DropdownButton
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className={typeFilter !== "all" ? "active" : ""}
          >
            <span>{typeFilter === "all" ? "All Types" : typeFilter}</span>
            <FaCaretDown />
          </DropdownButton>
          {showTypeDropdown && (
            <DropdownContent>
              {supervisorTypes.map((type) => (
                <DropdownItem
                  key={type}
                  className={
                    typeFilter === (type === "All Types" ? "all" : type)
                      ? "active"
                      : ""
                  }
                  onClick={() => handleTypeFilterSelect(type)}
                >
                  {type}
                </DropdownItem>
              ))}
            </DropdownContent>
          )}
        </DropdownFilter>
      </StatsContainer>

      <FilterContainer>
        <FilterButton
          className={statusFilter === "all" ? "active" : ""}
          onClick={() => setStatusFilter("all")}
        >
          <FaFilter /> All
        </FilterButton>
        <FilterButton
          className={statusFilter === "Fullday" ? "active" : ""}
          onClick={() => setStatusFilter("Fullday")}
        >
          <FaCheck /> Full Day
        </FilterButton>
        <FilterButton
          className={statusFilter === "Halfday" ? "active" : ""}
          onClick={() => setStatusFilter("Halfday")}
        >
          <FaClock /> Half Day
        </FilterButton>
        <FilterButton
          className={statusFilter === "Overtime" ? "active" : ""}
          onClick={() => setStatusFilter("Overtime")}
        >
          <FaBusinessTime /> Overtime
        </FilterButton>
        <FilterButton
          className={statusFilter === null ? "active" : ""}
          onClick={() => setStatusFilter(null)}
        >
          <FaTimes /> Not Marked
        </FilterButton>
      </FilterContainer>

      {loading ? (
        <LoadingContainer>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </LoadingContainer>
      ) : currentSupervisors.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell sortable onClick={() => handleSort("name")}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    Supervisor {getSortIcon("name")}
                  </div>
                </TableHeaderCell>
                <TableHeaderCell
                  sortable
                  onClick={() => handleSort("supervisorType")}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    Type {getSortIcon("supervisorType")}
                  </div>
                </TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell sortable onClick={() => handleSort("status")}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    Status {getSortIcon("status")}
                  </div>
                </TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody>
              {currentSupervisors.map((supervisor) => (
                <TableRow key={supervisor.userId}>
                  <TableCell>
                    <AvatarContainer>
                      <SupervisorPhoto supervisor={supervisor} />
                      <SupervisorInfo>
                        <SupervisorName>{supervisor.name}</SupervisorName>
                        <SupervisorId>ID: {supervisor.userId}</SupervisorId>
                      </SupervisorInfo>
                    </AvatarContainer>
                  </TableCell>
                  <TableCell>{supervisor.supervisorType}</TableCell>
                  <TableCell>{formatDateForDisplay(selectedDate)}</TableCell>
                  <TableCell>{getStatusBadge(supervisor.status)}</TableCell>
                  <TableCell>
                    <ActionButtons>
                      <ActionButton
                        className="fullday"
                        onClick={() => handleUpdate(supervisor, "Fullday")}
                        title="Mark as Full Day"
                      >
                        <FaCheck />
                      </ActionButton>
                      <ActionButton
                        className="halfday"
                        onClick={() => handleUpdate(supervisor, "Halfday")}
                        title="Mark as Half Day"
                      >
                        <FaClock />
                      </ActionButton>
                      <ActionButton
                        className="overtime"
                        onClick={() => handleUpdate(supervisor, "Overtime")}
                        title="Mark as Overtime"
                      >
                        <FaBusinessTime />
                      </ActionButton>
                      <ActionButton
                        className="null"
                        onClick={() => handleUpdate(supervisor, null)}
                        title="Mark as Not Marked"
                      >
                        <FaTimes />
                      </ActionButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyState>
          {searchTerm || statusFilter !== "all" || typeFilter !== "all"
            ? "No matching supervisors found"
            : "No attendance data available for selected date"}
        </EmptyState>
      )}

      <PaginationContainer>
        <PageInfo>
          Showing {indexOfFirstSupervisor + 1} to{" "}
          {Math.min(indexOfLastSupervisor, filteredSupervisors.length)} of{" "}
          {filteredSupervisors.length} supervisors
        </PageInfo>
        <PaginationButtons>
          <PageButton onClick={prevPage} disabled={currentPage === 1}>
            <FaChevronLeft size={14} />
            <span>Previous</span>
          </PageButton>
          <span className="mx-2">
            Page {currentPage} of{" "}
            {Math.ceil(filteredSupervisors.length / supervisorsPerPage)}
          </span>
          <PageButton
            onClick={nextPage}
            disabled={
              currentPage >=
              Math.ceil(filteredSupervisors.length / supervisorsPerPage)
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

export default AttendanceList;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   FaEdit,
//   FaCalendarAlt,
//   FaCheck,
//   FaClock,
//   FaBusinessTime,
//   FaSearch,
//   FaChevronLeft,
//   FaChevronRight,
//   FaUser,
//   FaHistory,
//   FaTimes,
//   FaFilter,
// } from "react-icons/fa";
// import styled from "styled-components";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// // ======================
// // Styled Components
// // ======================

// const Container = styled.div`
//   padding: 1.5rem;
//   background-color: #f8f9fa;
//   min-height: calc(100vh - 70px);
// `;

// const Header = styled.div`
//   margin-bottom: 2rem;
//   text-align: center;
//   h2 {
//     color: #2c3e50;
//     font-weight: 600;
//     margin-bottom: 0.5rem;
//   }
//   p {
//     color: #7f8c8d;
//   }
// `;

// const ActionBar = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   margin-bottom: 1.5rem;

//   @media (min-width: 768px) {
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//   }
// `;

// const SearchBox = styled.div`
//   position: relative;
//   width: 100%;

//   @media (min-width: 768px) {
//     width: 300px;
//   }

//   input {
//     padding-left: 2.5rem;
//     border-radius: 50px;
//     border: 1px solid #dfe6e9;
//     transition: all 0.3s;

//     &:focus {
//       border-color: #3498db;
//       box-shadow: 0 0 0 0.25rem rgba(52, 152, 219, 0.25);
//     }
//   }

//   svg {
//     position: absolute;
//     left: 1rem;
//     top: 50%;
//     transform: translateY(-50%);
//     color: #7f8c8d;
//   }
// `;

// const DateFilterContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;

//   .react-datepicker-wrapper {
//     width: auto;
//   }

//   .form-control {
//     min-width: 150px;
//     cursor: pointer;
//   }
// `;

// const BulkActions = styled.div`
//   display: flex;
//   gap: 0.5rem;
//   flex-wrap: wrap;

//   @media (min-width: 768px) {
//     gap: 1rem;
//   }
// `;

// const BulkButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
//   color: white;
//   padding: 0.5rem 1rem;
//   border-radius: 50px;
//   text-decoration: none;
//   font-weight: 500;
//   transition: all 0.3s;
//   border: none;
//   font-size: 0.9rem;

//   &.fullday {
//     background: linear-gradient(135deg, #28a745, #218838);
//     &:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
//     }
//   }

//   &.halfday {
//     background: linear-gradient(135deg, #ffc107, #e0a800);
//     &:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 4px 8px rgba(255, 193, 7, 0.3);
//     }
//   }

//   &.overtime {
//     background: linear-gradient(135deg, #17a2b8, #138496);
//     &:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 4px 8px rgba(23, 162, 184, 0.3);
//     }
//   }

//   &.history {
//     background: linear-gradient(135deg, #6c757d, #5a6268);
//     &:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 4px 8px rgba(108, 117, 125, 0.3);
//     }
//   }
// `;

// const CardContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 1.5rem;
//   margin-bottom: 2rem;

//   @media (max-width: 576px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const AttendanceCard = styled.div`
//   background: white;
//   border-radius: 12px;
//   padding: 1.5rem;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//   transition: all 0.3s ease;
//   border-left: 4px solid;
//   border-left-color: ${(props) => {
//     switch (props.status) {
//       case "Fullday":
//         return "#28a745";
//       case "Halfday":
//         return "#ffc107";
//       case "Overtime":
//         return "#17a2b8";
//       default:
//         return "#6c757d";
//     }
//   }};
//   display: flex;
//   flex-direction: column;

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
//   }
// `;

// const CardHeader = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 1rem;
//   padding-bottom: 1rem;
//   border-bottom: 1px solid #eee;
// `;

// const CardBody = styled.div`
//   flex: 1;
//   margin-bottom: 1rem;
// `;

// const CardFooter = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 0.5rem;
//   padding-top: 1rem;
//   border-top: 1px solid #eee;
// `;

// const CardField = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 0.75rem;
//   font-size: 0.9rem;

//   svg {
//     margin-right: 0.75rem;
//     color: #7f8c8d;
//     min-width: 20px;
//   }

//   span {
//     color: #2c3e50;
//     font-weight: 500;
//   }
// `;

// const SupervisorAvatar = styled.div`
//   width: 60px;
//   height: 60px;
//   border-radius: 50%;
//   background-color: #f0f3f5;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   overflow: hidden;
//   margin-right: 1rem;
//   flex-shrink: 0;
//   border: 2px solid #dee2e6;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }

//   svg {
//     color: #adb5bd;
//     width: 60%;
//     height: 60%;
//   }
// `;

// const SupervisorName = styled.h5`
//   font-weight: 600;
//   margin-bottom: 0.25rem;
//   color: #2c3e50;
// `;

// const SupervisorId = styled.p`
//   font-size: 0.85rem;
//   color: #7f8c8d;
//   margin-bottom: 0;
// `;

// const StatusBadge = styled.span`
//   display: inline-block;
//   padding: 0.35rem 0.75rem;
//   border-radius: 50px;
//   font-size: 0.85rem;
//   font-weight: 600;

//   &.fullday {
//     background-color: rgba(40, 167, 69, 0.2);
//     color: #1e7e34;
//   }

//   &.halfday {
//     background-color: rgba(255, 193, 7, 0.2);
//     color: #856404;
//   }

//   &.overtime {
//     background-color: rgba(23, 162, 184, 0.2);
//     color: #0c5460;
//   }

//   &.null {
//     background-color: rgba(108, 117, 125, 0.2);
//     color: #495057;
//   }
// `;

// const ActionButton = styled.button`
//   border: none;
//   border-radius: 50%;
//   width: 36px;
//   height: 36px;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.2s;

//   &.edit {
//     background-color: rgba(108, 117, 125, 0.1);
//     color: #6c757d;

//     &:hover {
//       background-color: rgba(108, 117, 125, 0.2);
//     }
//   }

//   &.history {
//     background-color: rgba(111, 66, 193, 0.1);
//     color: #6f42c1;

//     &:hover {
//       background-color: rgba(111, 66, 193, 0.2);
//     }
//   }
// `;

// const PaginationContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 2rem;
//   gap: 1rem;

//   @media (min-width: 576px) {
//     flex-direction: row;
//     justify-content: space-between;
//   }
// `;

// const PageInfo = styled.span`
//   color: #7f8c8d;
//   font-size: 0.9rem;
// `;

// const PaginationButtons = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// const PageButton = styled.button`
//   border: 1px solid #dfe6e9;
//   background: white;
//   color: #2c3e50;
//   padding: 0.5rem 0.75rem;
//   border-radius: 5px;
//   transition: all 0.2s;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;

//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }

//   &:not(:disabled):hover {
//     background-color: #3498db;
//     color: white;
//     border-color: #3498db;
//   }
// `;

// const StatusButtonsContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.5rem;
//   margin-top: 1rem;
// `;

// const StatusButton = styled.button`
//   border: none;
//   border-radius: 50px;
//   padding: 0.35rem 0.75rem;
//   font-size: 0.8rem;
//   font-weight: 500;
//   transition: all 0.2s;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;

//   &.fullday {
//     background-color: rgba(40, 167, 69, 0.1);
//     color: #28a745;
//     &:hover {
//       background-color: rgba(40, 167, 69, 0.2);
//     }
//   }

//   &.halfday {
//     background-color: rgba(255, 193, 7, 0.1);
//     color: #ffc107;
//     &:hover {
//       background-color: rgba(255, 193, 7, 0.2);
//     }
//   }

//   &.overtime {
//     background-color: rgba(23, 162, 184, 0.1);
//     color: #17a2b8;
//     &:hover {
//       background-color: rgba(23, 162, 184, 0.2);
//     }
//   }

//   &.null {
//     background-color: rgba(108, 117, 125, 0.1);
//     color: #6c757d;
//     &:hover {
//       background-color: rgba(108, 117, 125, 0.2);
//     }
//   }
// `;

// const FilterContainer = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-bottom: 1.5rem;
//   flex-wrap: wrap;
// `;

// const FilterButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.5rem 1rem;
//   border-radius: 50px;
//   border: 1px solid #dee2e6;
//   background-color: white;
//   color: #495057;
//   transition: all 0.2s;

//   &:hover {
//     background-color: #f8f9fa;
//   }

//   &.active {
//     background-color: #3498db;
//     color: white;
//     border-color: #3498db;
//   }
// `;

// const StatsContainer = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-bottom: 1.5rem;
//   flex-wrap: wrap;
// `;

// const StatBadge = styled.span`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.5rem 1rem;
//   border-radius: 50px;
//   font-size: 0.9rem;
//   font-weight: 600;

//   &.present {
//     background-color: rgba(40, 167, 69, 0.2);
//     color: #1e7e34;
//   }

//   &.absent {
//     background-color: rgba(220, 53, 69, 0.2);
//     color: #dc3545;
//   }
// `;

// // ======================
// // Main Component
// // ======================

// const AttendanceList = () => {
//   const [attendances, setAttendances] = useState([]);
//   const [summary, setSummary] = useState({});
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const supervisorsPerPage = 10;

//   useEffect(() => {
//     fetchData(formatDateForAPI(selectedDate));
//   }, [selectedDate]);

//   const fetchData = async (date) => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       const res = await axios.put(
//         `https://bulding-constraction-employee-management.onrender.com/api/supervisors/today/Attendance`,
//         { date, status: "Fullday" }, // Added status as per your API example
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (
//         res.data.success &&
//         res.data.data &&
//         Array.isArray(res.data.data.supervisors)
//       ) {
//         setAttendances(res.data.data.supervisors);
//         setSummary(res.data.data.summary || {});
//       } else {
//         toast.warning("No attendance records found.");
//         setAttendances([]);
//         setSummary({});
//       }
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       toast.error("Error fetching data");
//       setAttendances([]);
//       setSummary({});
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDateForAPI = (date) => {
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const formatDateForDisplay = (date) => {
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       weekday: "short",
//     });
//   };

//   const handleUpdate = async (supervisor, status) => {
//     try {
//       const token = localStorage.getItem("token");
//       const date = formatDateForAPI(selectedDate);

//       const res = await axios.put(
//         `https://bulding-constraction-employee-management.onrender.com/api/supervisors/Attendance/${supervisor.userId}`,
//         { status, date },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success(`Updated ${supervisor.name}`);
//         // Refresh the data after update
//         fetchData(date);
//       } else {
//         toast.error("Update failed");
//       }
//     } catch (err) {
//       console.error("Update Error:", err);
//       toast.error("Error updating");
//     }
//   };

//   const handleBulkUpdate = async (status) => {
//     try {
//       const token = localStorage.getItem("token");
//       const date = formatDateForAPI(selectedDate);

//       const res = await axios.put(
//         "https://bulding-constraction-employee-management.onrender.com/api/supervisors/today/Attendance",
//         { status, date },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success(`All marked as ${status}`);
//         // Refresh the data after bulk update
//         fetchData(date);
//       } else {
//         toast.error("Bulk update failed");
//       }
//     } catch (err) {
//       console.error("Bulk Update Error:", err);
//       toast.error("Bulk update error");
//     }
//   };

//   const presentStatuses = ["Fullday", "Halfday", "Overtime"];
//   const presentCount =
//     summary.present ||
//     attendances.filter((supervisor) =>
//       presentStatuses.includes(supervisor.status)
//     ).length;
//   const absentCount = summary.Absent || attendances.length - presentCount;

//   const filteredSupervisors = attendances.filter((supervisor) => {
//     if (!searchTerm) return true;
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       supervisor.userId.toString().includes(searchLower) ||
//       supervisor.name.toLowerCase().includes(searchLower) ||
//       supervisor.supervisorType.toLowerCase().includes(searchLower)
//     );
//   });

//   const indexOfLastSupervisor = currentPage * supervisorsPerPage;
//   const indexOfFirstSupervisor = indexOfLastSupervisor - supervisorsPerPage;
//   const currentSupervisors = filteredSupervisors.slice(
//     indexOfFirstSupervisor,
//     indexOfLastSupervisor
//   );

//   const nextPage = () => {
//     if (
//       currentPage < Math.ceil(filteredSupervisors.length / supervisorsPerPage)
//     ) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const getStatusBadge = (status) => {
//     let className = "null";
//     let text = "Not Marked";

//     if (status === "Fullday") {
//       className = "fullday";
//       text = "Full Day";
//     } else if (status === "Halfday") {
//       className = "halfday";
//       text = "Half Day";
//     } else if (status === "Overtime") {
//       className = "overtime";
//       text = "Overtime";
//     }

//     return <StatusBadge className={className}>{text}</StatusBadge>;
//   };

//   const SupervisorPhoto = ({ supervisor }) => {
//     const [imageError, setImageError] = useState(false);
//     const photoUrl = supervisor.photo
//       ? `https://bulding-constraction-employee-management.onrender.com${supervisor.photo}`
//       : null;

//     return (
//       <SupervisorAvatar>
//         {imageError || !photoUrl ? (
//           <FaUser size={24} className="text-secondary" />
//         ) : (
//           <img
//             src={photoUrl}
//             alt={supervisor.name}
//             onError={() => setImageError(true)}
//           />
//         )}
//       </SupervisorAvatar>
//     );
//   };

//   return (
//     <Container>
//       <Header>
//         <h2>Supervisor Attendance</h2>
//         <p>Manage attendance for all supervisors</p>
//       </Header>

//       <ActionBar>
//         <SearchBox>
//           <FaSearch />
//           <input
//             type="text"
//             placeholder="Search supervisors..."
//             className="form-control"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         </SearchBox>

//         <DateFilterContainer>
//           <FaCalendarAlt />
//           <DatePicker
//             selected={selectedDate}
//             onChange={(date) => {
//               setSelectedDate(date);
//               setCurrentPage(1);
//             }}
//             dateFormat="dd/MM/yyyy"
//             className="form-control"
//             placeholderText="Select date"
//           />
//         </DateFilterContainer>

//         <BulkActions>
//           <BulkButton
//             className="fullday"
//             onClick={() => handleBulkUpdate("Fullday")}
//           >
//             <FaCheck />
//             Full Day
//           </BulkButton>
//           <BulkButton
//             className="halfday"
//             onClick={() => handleBulkUpdate("Halfday")}
//           >
//             <FaClock />
//             Half Day
//           </BulkButton>
//           <BulkButton
//             className="overtime"
//             onClick={() => handleBulkUpdate("Overtime")}
//           >
//             <FaBusinessTime />
//             Overtime
//           </BulkButton>
//         </BulkActions>
//       </ActionBar>

//       <StatsContainer>
//         <StatBadge className="present">
//           <FaCheck /> Present: {presentCount}
//         </StatBadge>
//         <StatBadge className="absent">
//           <FaTimes /> Absent: {absentCount}
//         </StatBadge>
//         <StatBadge className="fullday">
//           <FaCheck /> Full Day: {summary.Fullday || 0}
//         </StatBadge>
//         <StatBadge className="halfday">
//           <FaClock /> Half Day: {summary.Halfday || 0}
//         </StatBadge>
//         <StatBadge className="overtime">
//           <FaBusinessTime /> Overtime: {summary.Overtime || 0}
//         </StatBadge>
//       </StatsContainer>

//       {loading ? (
//         <div className="text-center py-4">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : currentSupervisors.length > 0 ? (
//         <CardContainer>
//           {currentSupervisors.map((supervisor) => (
//             <AttendanceCard key={supervisor.userId} status={supervisor.status}>
//               <CardHeader>
//                 <SupervisorPhoto supervisor={supervisor} />
//                 <div>
//                   <SupervisorName>{supervisor.name}</SupervisorName>
//                   <SupervisorId>ID: {supervisor.userId}</SupervisorId>
//                   <SupervisorId>Type: {supervisor.supervisorType}</SupervisorId>
//                 </div>
//               </CardHeader>
//               <CardBody>
//                 <CardField>
//                   <FaCalendarAlt />
//                   <span>{formatDateForDisplay(selectedDate)}</span>
//                 </CardField>
//                 <CardField>
//                   <FaCheck />
//                   <span>{getStatusBadge(supervisor.status)}</span>
//                 </CardField>

//                 <StatusButtonsContainer>
//                   <StatusButton
//                     className="fullday"
//                     onClick={() => handleUpdate(supervisor, "Fullday")}
//                   >
//                     <FaCheck /> Full Day
//                   </StatusButton>
//                   <StatusButton
//                     className="halfday"
//                     onClick={() => handleUpdate(supervisor, "Halfday")}
//                   >
//                     <FaClock /> Half Day
//                   </StatusButton>
//                   <StatusButton
//                     className="overtime"
//                     onClick={() => handleUpdate(supervisor, "Overtime")}
//                   >
//                     <FaBusinessTime /> Overtime
//                   </StatusButton>
//                   <StatusButton
//                     className="null"
//                     onClick={() => handleUpdate(supervisor, null)}
//                   >
//                     <FaTimes /> Not Marked
//                   </StatusButton>
//                 </StatusButtonsContainer>
//               </CardBody>
//             </AttendanceCard>
//           ))}
//         </CardContainer>
//       ) : (
//         <div className="text-center py-4">
//           {searchTerm
//             ? "No matching supervisors found"
//             : "No attendance data available for selected date"}
//         </div>
//       )}

//       <PaginationContainer>
//         <PageInfo>
//           Showing {indexOfFirstSupervisor + 1} to{" "}
//           {Math.min(indexOfLastSupervisor, filteredSupervisors.length)} of{" "}
//           {filteredSupervisors.length} supervisors
//         </PageInfo>
//         <PaginationButtons>
//           <PageButton onClick={prevPage} disabled={currentPage === 1}>
//             <FaChevronLeft size={14} />
//             <span>Previous</span>
//           </PageButton>
//           <span className="mx-2">
//             Page {currentPage} of{" "}
//             {Math.ceil(filteredSupervisors.length / supervisorsPerPage)}
//           </span>
//           <PageButton
//             onClick={nextPage}
//             disabled={
//               currentPage >=
//               Math.ceil(filteredSupervisors.length / supervisorsPerPage)
//             }
//           >
//             <span>Next</span>
//             <FaChevronRight size={14} />
//           </PageButton>
//         </PaginationButtons>
//       </PaginationContainer>
//     </Container>
//   );
// };

// export default AttendanceList;
