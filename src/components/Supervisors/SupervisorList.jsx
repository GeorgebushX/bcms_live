// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import { FaUserCircle, FaUserPlus } from "react-icons/fa";

// const SupervisorList = () => {
//   const [supervisors, setSupervisors] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [deleteId, setDeleteId] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const supervisorsPerPage = 10;

//   useEffect(() => {
//     fetchSupervisors();
//   }, []);

//   const fetchSupervisors = async () => {
//     try {
//       const res = await axios.get(
//         "https://bulding-constraction-employee-management.onrender.com/api/supervisors",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (res.data.success) {
//         setSupervisors(res.data.data);
//       } else {
//         toast.error("Failed to load supervisors.");
//       }
//     } catch (error) {
//       toast.error("Error fetching supervisors: " + error.message);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const res = await axios.delete(
//         `https://bulding-constraction-employee-management.onrender.com/api/supervisors/${deleteId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (res.data.success) {
//         toast.success("Supervisor deleted successfully.");
//         setSupervisors(supervisors.filter((s) => s._id !== deleteId));
//       } else {
//         toast.error("Failed to delete supervisor.");
//       }
//     } catch (error) {
//       toast.error("Delete error: " + error.message);
//     } finally {
//       setShowModal(false);
//       setDeleteId(null);
//     }
//   };

//   const filteredSupervisors = supervisors.filter((s) => {
//     const term = searchTerm.toLowerCase();
//     return (
//       String(s._id).toLowerCase().includes(term) ||
//       s.name?.toLowerCase().includes(term) ||
//       s.phone?.toLowerCase().includes(term) ||
//       s.email?.toLowerCase().includes(term) ||
//       s.site?.siteName?.toLowerCase().includes(term)
//     );
//   });

//   const indexOfLast = currentPage * supervisorsPerPage;
//   const indexOfFirst = indexOfLast - supervisorsPerPage;
//   const currentSupervisors = filteredSupervisors.slice(
//     indexOfFirst,
//     indexOfLast
//   );

//   return (
//     <div className="container-fluid py-4">
//       {/* Modal */}
//       {showModal && (
//         <div className="modal-backdrop">
//           <div className="modal-content-box">
//             <h5 className="mb-3">⚠️ Confirm Deletion</h5>
//             <p>Are you sure you want to delete this supervisor?</p>
//             <div className="d-flex justify-content-end gap-2 mt-4">
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//               <button className="btn btn-danger" onClick={handleDelete}>
//                 Yes, Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="card shadow-sm border-0 rounded-4 p-3 bg-light">
//         <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4">
//           <h3 className="fw-bold text-primary mb-0">
//             👷 Supervisor Management
//           </h3>
//           <div className="d-flex flex-column flex-md-row gap-2 w-100">
//             <input
//               type="text"
//               className="form-control border-primary shadow-sm"
//               placeholder="🔍 Search ID, Name, Phone, Email, Site"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <Link
//               to="/engineer-dashboard/add-supervisor"
//               className="btn btn-success fw-semibold d-flex align-items-center gap-2 shadow-sm"
//             >
//               <FaUserPlus /> Add Supervisor
//             </Link>
//           </div>
//         </div>

//         <div className="table-responsive">
//           <table className="table table-hover align-middle text-center">
//             <thead className="table-primary text-dark sticky-top">
//               <tr>
//                 <th>S.No</th>
//                 <th>Photo</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Gender</th>
//                 <th>Type</th>
//                 <th>Site</th>
//                 <th>Joining Date</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentSupervisors.length > 0 ? (
//                 currentSupervisors.map((sup, index) => (
//                   <tr key={sup._id}>
//                     <td>{indexOfFirst + index + 1}</td>
//                     <td>
//                       {sup.photo ? (
//                         <img
//                           src={sup.photo}
//                           alt="Supervisor"
//                           className="rounded-circle border border-info"
//                           style={{
//                             width: "45px",
//                             height: "45px",
//                             objectFit: "cover",
//                           }}
//                         />
//                       ) : (
//                         <FaUserCircle size={40} className="text-secondary" />
//                       )}
//                     </td>
//                     <td className="text-capitalize fw-semibold">
//                       {sup.name}
//                     </td>
//                     <td>{sup.email}</td>
//                     <td>{sup.phone}</td>
//                     <td>
//                       <span
//                         className={`badge ${
//                           sup.gender === "Male"
//                             ? "bg-info"
//                             : sup.gender === "Female"
//                             ? "bg-danger"
//                             : "bg-secondary"
//                         }`}
//                       >
//                         {sup.gender}
//                       </span>
//                     </td>
//                     <td>
//                       <span className="badge bg-dark">
//                         {sup.supervisorType}
//                       </span>
//                     </td>
//                     <td>
//                       <span className="badge bg-secondary">
//                         {sup.site?.siteName || "N/A"}
//                       </span>
//                     </td>
//                     <td>{sup.joiningDate?.split("T")[0]}</td>
//                     <td>
//                       <div className="d-flex justify-content-center gap-2 flex-wrap">
//                         <Link
//                           to={`/engineer-dashboard/update-supervisor/${sup._id}`}
//                           className="btn btn-sm btn-outline-warning"
//                           title="Edit"
//                         >
//                           ✏️
//                         </Link>
//                         <button
//                           className="btn btn-sm btn-outline-danger"
//                           title="Delete"
//                           onClick={() => {
//                             setDeleteId(sup._id);
//                             setShowModal(true);
//                           }}
//                         >
//                           🗑️
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="10" className="text-muted py-4">
//                     No supervisors found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="d-flex justify-content-center align-items-center mt-4 flex-wrap gap-3">
//           <button
//             className="btn btn-outline-primary"
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             ⬅ Previous
//           </button>
//           <span className="fw-semibold text-secondary">
//             Page {currentPage} of{" "}
//             {Math.ceil(filteredSupervisors.length / supervisorsPerPage)}
//           </span>
//           <button
//             className="btn btn-outline-primary"
//             onClick={() =>
//               setCurrentPage((prev) => prev + 1)
//             }
//             disabled={
//               currentPage >=
//               Math.ceil(filteredSupervisors.length / supervisorsPerPage)
//             }
//           >
//             Next ➡
//           </button>
//         </div>
//       </div>

//       {/* Modal Styles */}
//       <style>{`
//         .modal-backdrop {
//           position: fixed;
//           top: 0; left: 0;
//           width: 100%; height: 100%;
//           background: rgba(0, 0, 0, 0.5);
//           z-index: 1050;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .modal-content-box {
//           background: white;
//           padding: 2rem;
//           border-radius: 12px;
//           width: 100%;
//           max-width: 400px;
//           text-align: center;
//           box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
//         }
//         @media (max-width: 768px) {
//           .table {
//             font-size: 0.85rem;
//           }
//           th, td {
//             white-space: nowrap;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SupervisorList;




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaUserPlus,
  FaUser,
  FaIdCard,
  FaBirthdayCake,
  FaVenusMars,
  FaPhone,
  FaHome,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBuilding,
  FaCalendarDay,
  FaDollarSign,
  FaIdBadge,
  FaUserTie,
  FaInfoCircle
} from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

// ======================
// Styled Components
// ======================

const Container = styled.div`
  padding: 1.5rem;
  background-color: #f8f9fa;
  min-height: calc(100vh - 70px);

  @media (max-width: 576px) {
    padding: 1rem;
  }
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

  @media (max-width: 576px) {
    margin-bottom: 1.5rem;
    
    h3 {
      font-size: 1.5rem;
    }
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

const AddButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white !important;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  border: none;
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
  }
`;

const StyledTable = styled.table`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;

  thead {
    background: linear-gradient(135deg, #2c3e50, #34495e);
    color: white;

    th {
      padding: 1rem;
      font-weight: 500;
      border: none;
      
      @media (max-width: 992px) {
        padding: 0.75rem;
      }
    }
  }

  tbody {
    tr {
      transition: all 0.2s;

      &:hover {
        background-color: rgba(52, 152, 219, 0.05);
      }
    }

    td {
      padding: 0.75rem 1rem;
      vertical-align: middle;
      border-top: 1px solid #e9ecef;
      
      @media (max-width: 992px) {
        padding: 0.5rem;
      }
    }
  }
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  margin: 0 3px;

  &.view {
    background-color: rgba(13, 110, 253, 0.2);
    color: #0d6efd;

    &:hover {
      background-color: rgba(13, 110, 253, 0.3);
    }
  }

  &.edit {
    background-color: rgba(255, 193, 7, 0.2);
    color: #ffc107;

    &:hover {
      background-color: rgba(255, 193, 7, 0.3);
    }
  }

  &.delete {
    background-color: rgba(220, 53, 69, 0.2);
    color: #dc3545;

    &:hover {
      background-color: rgba(220, 53, 69, 0.3);
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

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const SupervisorCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  border-left: 4px solid #3498db;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 576px) {
    padding: 1rem;
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
  margin-bottom: 1rem;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
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

const SerialNumberBadge = styled.span`
  font-size: 0.8rem;
  background-color: #f1f1f1;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: #7f8c8d;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;

  &.primary {
    background-color: rgba(52, 152, 219, 0.2);
    color: #1a5276;
  }

  &.success {
    background-color: rgba(46, 204, 113, 0.2);
    color: #145a32;
  }

  &.warning {
    background-color: rgba(241, 196, 15, 0.2);
    color: #7d6608;
  }
`;

// ======================
// Modal Styled Components
// ======================

const ModalHeaderGradient = styled(Modal.Header)`
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  border-bottom: none;
  padding: 1.5rem;

  .modal-title {
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .btn-close {
    filter: invert(1);
    opacity: 0.8;
    transition: all 0.2s;

    &:hover {
      opacity: 1;
    }
  }
`;

const ModalBodyContainer = styled(Modal.Body)`
  padding: 2rem;

  @media (max-width: 576px) {
    padding: 1.5rem;
  }
`;

const SupervisorProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
  }
`;

const PhotoContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 2rem;
  }
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #f0f3f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 0 auto;

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

  @media (max-width: 576px) {
    width: 120px;
    height: 120px;
  }
`;

const SupervisorInfo = styled.div`
  flex: 1;
`;

const SupervisorName = styled.h3`
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const SupervisorRole = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const DetailCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 1.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-left: 3px solid #3498db;
`;

const DetailTitle = styled.h5`
  font-size: 1rem;
  color: #495057;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;

  svg {
    color: #3498db;
  }
`;

const DetailItem = styled.div`
  margin-bottom: 0.75rem;
  display: flex;
  align-items: flex-start;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-size: 0.9rem;
  color: #6c757d;
  min-width: 120px;
  display: inline-block;
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 0.95rem;
  color: #212529;
  flex: 1;
  word-break: break-word;
`;

const ModalFooterStyled = styled(Modal.Footer)`
  border-top: none;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;

// ======================
// Main Component
// ======================

const SupervisorsList = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [supervisorToDelete, setSupervisorToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const supervisorsPerPage = 10;

  useEffect(() => {
    fetchSupervisors();

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchSupervisors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://bulding-constraction-employee-management.onrender.com/api/supervisors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        // Extract the supervisors array from the response data
        setSupervisors(response.data.data.supervisors || []);
      } else {
        toast.error("Failed to fetch supervisors");
      }
    } catch (error) {
      toast.error("Error fetching supervisors: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (supervisor) => {
    setSelectedSupervisor(supervisor);
    setShowViewModal(true);
  };

  const handleDeleteClick = (supervisor) => {
    setSupervisorToDelete(supervisor);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!supervisorToDelete) return;

    try {
      const response = await axios.delete(
        `https://bulding-constraction-employee-management.onrender.com/api/supervisors/${supervisorToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Supervisor deleted successfully");
        setSupervisors(
          supervisors.filter(
            (supervisor) => supervisor._id !== supervisorToDelete._id
          )
        );
      } else {
        toast.error("Failed to delete supervisor");
      }
    } catch (error) {
      toast.error("Error deleting supervisor: " + error.message);
    } finally {
      setShowDeleteModal(false);
      setSupervisorToDelete(null);
    }
  };

  const filteredSupervisors = supervisors.filter((supervisor) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    const fieldsToSearch = [
      supervisor._id,
      supervisor.name,
      supervisor.email,
      supervisor.phone,
      supervisor.supervisorType,
      supervisor.gender,
    ].filter(Boolean);

    return fieldsToSearch.some((field) =>
      field.toString().toLowerCase().includes(searchLower)
    );
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

  const getPhotoUrl = (photoPath) => {
    if (!photoPath) return null;
    return `https://bulding-constraction-employee-management.onrender.com${photoPath}`;
  };

  const SupervisorPhoto = ({ supervisor, size = "40px" }) => {
    const [imageError, setImageError] = useState(false);
    const photoUrl = getPhotoUrl(supervisor.photo);

    return (
      <div className="d-flex align-items-center justify-content-center">
        {imageError || !photoUrl ? (
          <div
            className="rounded-circle bg-light d-flex align-items-center justify-content-center"
            style={{
              width: size,
              height: size,
              border: "2px solid #dee2e6",
            }}
          >
            <FaUser size={parseInt(size) / 2} className="text-secondary" />
          </div>
        ) : (
          <img
            src={photoUrl}
            alt={supervisor.name}
            className="rounded-circle"
            style={{
              width: size,
              height: size,
              objectFit: "cover",
              border: "2px solid #dee2e6",
            }}
            onError={() => setImageError(true)}
          />
        )}
      </div>
    );
  };

  const formatAddress = (address) => {
    if (!address) return "N/A";
    if (typeof address === "string") return address;
    return `${address.street || ""}, ${address.city || ""}, ${
      address.state || ""
    }, ${address.country || ""}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate serial numbers based on current page
  const getSerialNumber = (index) => {
    return (currentPage - 1) * supervisorsPerPage + index + 1;
  };

  return (
    <Container>
      {/* View Details Modal */}
      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
        size="lg"
        backdrop="static"
      >
        <ModalHeaderGradient closeButton>
          <Modal.Title>
            <FaUserTie /> Supervisor Details
          </Modal.Title>
        </ModalHeaderGradient>

        <ModalBodyContainer>
          {selectedSupervisor && (
            <>
              <SupervisorProfileSection>
                <PhotoContainer>
                  <ProfileImage>
                    <SupervisorPhoto
                      supervisor={selectedSupervisor}
                      size="150px"
                    />
                  </ProfileImage>
                </PhotoContainer>

                <SupervisorInfo>
                  <SupervisorName>{selectedSupervisor.name}</SupervisorName>
                  <SupervisorRole>
                    <Badge className="primary">
                      {selectedSupervisor.supervisorType || "Supervisor"}
                    </Badge>
                  </SupervisorRole>
                  <div className="d-flex flex-wrap gap-2">
                    <Badge className="success">
                      <FaIdBadge className="me-1" />
                      ID: {selectedSupervisor._id}
                    </Badge>
                  </div>
                </SupervisorInfo>
              </SupervisorProfileSection>

              <DetailsGrid>
                <DetailCard>
                  <DetailTitle>
                    <FaUser /> Personal Information
                  </DetailTitle>

                  <DetailItem>
                    <DetailLabel><FaEnvelope /> Email:</DetailLabel>
                    <DetailValue>{selectedSupervisor.email}</DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel><FaPhone /> Phone:</DetailLabel>
                    <DetailValue>
                      {selectedSupervisor.phone || "N/A"}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel><FaPhone /> Alt. Phone:</DetailLabel>
                    <DetailValue>
                      {selectedSupervisor.alternatePhone || "N/A"}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel><FaVenusMars /> Gender:</DetailLabel>
                    <DetailValue>
                      {selectedSupervisor.gender || "N/A"}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel><FaBirthdayCake /> Date of Birth:</DetailLabel>
                    <DetailValue>
                      {formatDate(selectedSupervisor.dateOfBirth)}
                    </DetailValue>
                  </DetailItem>
                </DetailCard>

                <DetailCard>
                  <DetailTitle>
                    <FaHome /> Address Information
                  </DetailTitle>
                  <DetailItem>
                    <DetailLabel><FaMapMarkerAlt /> Address:</DetailLabel>
                    <DetailValue>
                      {formatAddress(selectedSupervisor.address)}
                    </DetailValue>
                  </DetailItem>
                </DetailCard>

                <DetailCard>
                  <DetailTitle>
                    <FaBuilding /> Employment Details
                  </DetailTitle>

                  <DetailItem>
                    <DetailLabel><FaUserTie /> Role:</DetailLabel>
                    <DetailValue>
                      {selectedSupervisor.supervisorType || "Supervisor"}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel><FaCalendarDay /> Joining Date:</DetailLabel>
                    <DetailValue>
                      {formatDate(selectedSupervisor.joiningDate)}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel><FaDollarSign /> Bank Account:</DetailLabel>
                    <DetailValue>
                      {selectedSupervisor.bankAccount || "N/A"}
                    </DetailValue>
                  </DetailItem>
                </DetailCard>
              </DetailsGrid>
            </>
          )}
        </ModalBodyContainer>

        <ModalFooterStyled>
          <Button
            variant="outline-secondary"
            onClick={() => setShowViewModal(false)}
            style={{ padding: "0.5rem 1.25rem" }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            as={Link}
            to={`/engineer-dashboard/update-supervisor/${selectedSupervisor?._id}`}
            style={{ padding: "0.5rem 1.25rem" }}
          >
            <FaEdit className="me-2" />
            Edit Supervisor
          </Button>
        </ModalFooterStyled>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title><FaTrash className="me-2" />Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center py-4">
            <div className="mb-4">
              <FaTrash className="text-danger" size={48} />
            </div>
            <h5 className="mb-3">
              Are you sure you want to delete this supervisor?
            </h5>
            <p className="fw-bold text-primary">{supervisorToDelete?.name}</p>
            <p className="text-muted">This action cannot be undone.</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="outline-secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete Supervisor
          </Button>
        </Modal.Footer>
      </Modal>

      <Header>
        <h3><FaUserTie className="me-2" />Supervisor Management</h3>
        <p className="text-muted">Manage and oversee all construction supervisors</p>
      </Header>

      <ActionBar>
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
        <AddButton to="/engineer-dashboard/add-supervisor">
          <FaUserPlus />
          <span>Add New Supervisor</span>
        </AddButton>
      </ActionBar>

      {isMobileView ? (
        /* Mobile Card View */
        <div>
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : currentSupervisors.length > 0 ? (
            <CardContainer>
              {currentSupervisors.map((supervisor, index) => (
                <SupervisorCard key={supervisor._id}>
                  <CardHeader>
                    <SupervisorPhoto supervisor={supervisor} size="50px" />
                    <div className="ms-3">
                      <h5 className="mb-0">{supervisor.name}</h5>
                      <SerialNumberBadge>
                        #{getSerialNumber(index)}
                      </SerialNumberBadge>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <CardField>
                      <FaUserTie />
                      <span>{supervisor.supervisorType || "Supervisor"}</span>
                    </CardField>
                    <CardField>
                      <FaPhone />
                      <span>{supervisor.phone || "N/A"}</span>
                    </CardField>
                    <CardField>
                      <FaCalendarDay />
                      <span>Joined: {formatDate(supervisor.joiningDate)}</span>
                    </CardField>
                    <CardField>
                      <FaVenusMars />
                      <span>{supervisor.gender || "N/A"}</span>
                    </CardField>
                  </CardBody>
                  <CardFooter>
                    <button
                      className="btn btn-sm btn-outline-info"
                      onClick={() => handleViewClick(supervisor)}
                      title="View"
                    >
                      <FaEye />
                    </button>
                    <Link
                      to={`/engineer-dashboard/update-supervisor/${supervisor._id}`}
                      className="btn btn-sm btn-outline-primary"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteClick(supervisor)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </CardFooter>
                </SupervisorCard>
              ))}
            </CardContainer>
          ) : (
            <div className="text-center py-5">
              <FaInfoCircle size={48} className="text-muted mb-3" />
              <h5 className="text-muted">
                {searchTerm
                  ? "No matching supervisors found"
                  : "No supervisors available"}
              </h5>
              {!searchTerm && (
                <p className="text-muted">Add a new supervisor to get started</p>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Desktop Table View */
        <div className="table-responsive">
          <StyledTable>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Supervisor</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Personal Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : currentSupervisors.length > 0 ? (
                currentSupervisors.map((supervisor, index) => (
                  <tr key={supervisor._id}>
                    <td>
                      <SerialNumberBadge>
                        {getSerialNumber(index)}
                      </SerialNumberBadge>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <SupervisorPhoto supervisor={supervisor} />
                        <div>
                          <div className="fw-bold">{supervisor.name}</div>
                          <small className="text-muted">
                            <FaEnvelope className="me-1" />
                            {supervisor.email}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <FaPhone className="text-primary" />
                        <span>{supervisor.phone || "N/A"}</span>
                      </div>
                      {supervisor.alternatePhone && (
                        <div className="d-flex align-items-center gap-1 small">
                          <FaPhone className="text-secondary" />
                          <span>{supervisor.alternatePhone}</span>
                        </div>
                      )}
                    </td>
                    <td>
                      <Badge className="primary">
                        <FaUserTie className="me-1" />
                        {supervisor.supervisorType || "Supervisor"}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex flex-column small">
                        <div className="d-flex align-items-center gap-1">
                          <FaVenusMars className="text-success" />
                          <span>{supervisor.gender || "N/A"}</span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <FaBirthdayCake className="text-warning" />
                          <span>{formatDate(supervisor.dateOfBirth)}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <ActionButton
                          className="view"
                          onClick={() => handleViewClick(supervisor)}
                          title="View"
                        >
                          <FaEye />
                        </ActionButton>
                        <Link
                          to={`/engineer-dashboard/update-supervisor/${supervisor._id}`}
                          className="edit"
                          title="Edit"
                          as={ActionButton}
                        >
                          <FaEdit />
                        </Link>
                        <ActionButton
                          className="delete"
                          onClick={() => handleDeleteClick(supervisor)}
                          title="Delete"
                        >
                          <FaTrash />
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-5">
                    <FaInfoCircle size={32} className="text-muted mb-3" />
                    <h5 className="text-muted">
                      {searchTerm
                        ? "No matching supervisors found"
                        : "No supervisors available"}
                    </h5>
                    {!searchTerm && (
                      <p className="text-muted">Add a new supervisor to get started</p>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </StyledTable>
        </div>
      )}

      {/* Pagination */}
      {filteredSupervisors.length > 0 && (
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
      )}
    </Container>
  );
};

export default SupervisorsList;