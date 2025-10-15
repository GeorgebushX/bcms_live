// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import { FaUserPlus } from "react-icons/fa";
// import { useAuth } from "../../../context/authContext";

// const ContractorList = () => {
//   const { user } = useAuth();
//   const [contractors, setContractors] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [deleteId, setDeleteId] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const contractorsPerPage = 10;

//   useEffect(() => {
//     if (user?._id) {
//       fetchContractors();
//     }
//   }, [user]);

//   const fetchContractors = async () => {
//     try {
//       const res = await axios.get(
//         "https://bulding-constraction-employee-management.onrender.com/api/contractors",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (res.data.success) {
//         const filtered = res.data.data.filter(
//           (con) => con.supervisorId && con.supervisorId._id === user._id
//         );
//         setContractors(filtered);
//       } else {
//         toast.error("Failed to load contractors.");
//       }
//     } catch (error) {
//       toast.error("Error fetching contractors: " + error.message);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const res = await axios.delete(
//         `https://bulding-constraction-employee-management.onrender.com/api/contractors/${deleteId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (res.data.success) {
//         toast.success("Contractor deleted successfully.");
//         setContractors(contractors.filter((c) => c._id !== deleteId));
//       } else {
//         toast.error("Failed to delete contractor.");
//       }
//     } catch (error) {
//       toast.error("Delete error: " + error.message);
//     } finally {
//       setShowModal(false);
//       setDeleteId(null);
//     }
//   };

//   const filteredContractors = contractors.filter((c) => {
//     const term = searchTerm.toLowerCase();
//     return (
//       String(c._id).toLowerCase().includes(term) ||
//       c.name?.toLowerCase().includes(term) ||
//       c.phone?.toLowerCase().includes(term) ||
//       c.email?.toLowerCase().includes(term) ||
//       c.site?.siteName?.toLowerCase().includes(term)
//     );
//   });

//   const indexOfLast = currentPage * contractorsPerPage;
//   const indexOfFirst = indexOfLast - contractorsPerPage;
//   const currentContractors = filteredContractors.slice(indexOfFirst, indexOfLast);

//   return (
//     <main className="d-flex justify-content-center px-2 px-md-4">
//       <div className="w-100" style={{ maxWidth: "1300px", marginTop: "1.5rem" }}>
//         {showModal && (
//           <div className="modal-backdrop">
//             <div className="modal-content-box">
//               <h5 className="mb-3">⚠️ Confirm Deletion</h5>
//               <p>Are you sure you want to delete this contractor?</p>
//               <div className="d-flex justify-content-end gap-2 mt-4">
//                 <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
//                   Cancel
//                 </button>
//                 <button className="btn btn-danger" onClick={handleDelete}>
//                   Yes, Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="card shadow-sm border-0 rounded-4 p-3 bg-light">
//           <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4">
//             <h3 className="fw-bold text-primary mb-0">🧱 Contractor Management</h3>
//             <div className="d-flex flex-column flex-md-row gap-2 w-100">
//               <input
//                 type="text"
//                 className="form-control border-primary shadow-sm"
//                 placeholder="🔍 Search ID, Name, Phone, Email, Site"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <Link
//                 to="/supervisor-dashboard/add-contractor"
//                 className="btn btn-success fw-semibold d-flex align-items-center gap-2 shadow-sm"
//               >
//                 <FaUserPlus /> Add Contractor
//               </Link>
//             </div>
//           </div>

//           <div className="table-responsive">
//             <table className="table table-hover align-middle text-center">
//               <thead className="table-primary text-dark">
//                 <tr>
//                   <th>S.No</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   <th>Gender</th>
//                   <th>Role</th>
//                   <th>Site</th>
//                   <th>Joining Date</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentContractors.length > 0 ? (
//                   currentContractors.map((con, index) => (
//                     <tr key={con._id}>
//                       <td>{indexOfFirst + index + 1}</td>
//                       <td className="text-capitalize fw-semibold">{con.name}</td>
//                       <td>{con.email}</td>
//                       <td>{con.phone}</td>
//                       <td>
//                         <span
//                           className={`badge ${
//                             con.gender === "Male"
//                               ? "bg-info"
//                               : con.gender === "Female"
//                               ? "bg-danger"
//                               : "bg-secondary"
//                           }`}
//                         >
//                           {con.gender}
//                         </span>
//                       </td>
//                       <td>
//                         <span className="badge bg-dark">{con.contractorRole}</span>
//                       </td>
//                       <td>
//                         <span className="badge bg-secondary">
//                           {con.site?.siteName || "N/A"}
//                         </span>
//                       </td>
//                       <td>{con.joiningDate?.split("T")[0]}</td>
//                       <td>
//                         <div className="d-flex justify-content-center gap-2 flex-wrap">
//                           <Link
//                             to={`/supervisor-dashboard/update-contractor/${con._id}`}
//                             className="btn btn-sm btn-outline-warning"
//                             title="Edit"
//                           >
//                             ✏️
//                           </Link>
//                           <button
//                             className="btn btn-sm btn-outline-danger"
//                             title="Delete"
//                             onClick={() => {
//                               setDeleteId(con._id);
//                               setShowModal(true);
//                             }}
//                           >
//                             🗑️
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="9" className="text-muted py-4">
//                       No contractors found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
//             <button
//               className="btn btn-outline-primary"
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               ⬅ Previous
//             </button>
//             <span className="fw-semibold text-secondary">
//               Page {currentPage} of{" "}
//               {Math.ceil(filteredContractors.length / contractorsPerPage)}
//             </span>
//             <button
//               className="btn btn-outline-primary"
//               onClick={() => setCurrentPage((prev) => prev + 1)}
//               disabled={
//                 currentPage >= Math.ceil(filteredContractors.length / contractorsPerPage)
//               }
//             >
//               Next ➡
//             </button>
//           </div>
//         </div>

//         {/* Modal Styles */}
//         <style>{`
//           .modal-backdrop {
//             position: fixed;
//             top: 0; left: 0;
//             width: 100%; height: 100%;
//             background: rgba(0, 0, 0, 0.5);
//             z-index: 1050;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }
//           .modal-content-box {
//             background: white;
//             padding: 2rem;
//             border-radius: 12px;
//             width: 100%;
//             max-width: 400px;
//             text-align: center;
//             box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
//           }
//         `}</style>
//       </div>
//     </main>
//   );
// };

// export default ContractorList;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { 
  FaUserPlus, 
  FaEdit, 
  FaTrash, 
  FaSearch, 
  FaUser, 
  FaIdCard, 
  FaBirthdayCake, 
  FaVenusMars, 
  FaPhone, 
  FaHome, 
  FaCalendarAlt,
  FaEye,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { useAuth } from "../../../context/authContext";
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

const ContractorCard = styled.div`
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

  &.info {
    background-color: rgba(23, 162, 184, 0.2);
    color: #0c5460;
  }

  &.danger {
    background-color: rgba(220, 53, 69, 0.2);
    color: #721c24;
  }

  &.dark {
    background-color: rgba(52, 58, 64, 0.2);
    color: #1b1e21;
  }

  &.secondary {
    background-color: rgba(108, 117, 125, 0.2);
    color: #383d41;
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

const ContractorProfileSection = styled.div`
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

const ContractorInfo = styled.div`
  flex: 1;
`;

const ContractorName = styled.h3`
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const ContractorRole = styled.p`
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

const ContractorList = () => {
  const { user } = useAuth();
  const [contractors, setContractors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  const contractorsPerPage = 10;

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (user?._id) {
      fetchContractors();
    }
  }, [user]);

  const fetchContractors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://bulding-constraction-employee-management.onrender.com/api/contractors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        const filtered = res.data.data.filter(
          (con) => con.supervisorId && con.supervisorId._id === user._id
        );
        setContractors(filtered);
      } else {
        toast.error("Failed to load contractors.");
      }
    } catch (error) {
      toast.error("Error fetching contractors: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `https://bulding-constraction-employee-management.onrender.com/api/contractors/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Contractor deleted successfully.");
        setContractors(contractors.filter((c) => c._id !== deleteId));
      } else {
        toast.error("Failed to delete contractor.");
      }
    } catch (error) {
      toast.error("Delete error: " + error.message);
    } finally {
      setShowModal(false);
      setDeleteId(null);
    }
  };

  const handleViewClick = (contractor) => {
    setSelectedContractor(contractor);
    setShowViewModal(true);
  };

  const filteredContractors = contractors.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      String(c._id).toLowerCase().includes(term) ||
      c.name?.toLowerCase().includes(term) ||
      c.phone?.toLowerCase().includes(term) ||
      c.email?.toLowerCase().includes(term) ||
      c.site?.siteName?.toLowerCase().includes(term)
    );
  });

  const indexOfLast = currentPage * contractorsPerPage;
  const indexOfFirst = indexOfLast - contractorsPerPage;
  const currentContractors = filteredContractors.slice(indexOfFirst, indexOfLast);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredContractors.length / contractorsPerPage)) {
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

  const ContractorPhoto = ({ contractor, size = "40px" }) => {
    const [imageError, setImageError] = useState(false);
    const photoUrl = getPhotoUrl(contractor.photo);

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
            alt={contractor.name}
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate serial numbers based on current page
  const getSerialNumber = (index) => {
    return (currentPage - 1) * contractorsPerPage + index + 1;
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
            <FaUser /> Contractor Details
          </Modal.Title>
        </ModalHeaderGradient>

        <ModalBodyContainer>
          {selectedContractor && (
            <>
              <ContractorProfileSection>
                <PhotoContainer>
                  <ProfileImage>
                    <ContractorPhoto
                      contractor={selectedContractor}
                      size="150px"
                    />
                  </ProfileImage>
                </PhotoContainer>

                <ContractorInfo>
                  <ContractorName>{selectedContractor.name}</ContractorName>
                  <ContractorRole>
                    <Badge className="primary">
                      {selectedContractor.contractorRole || "Contractor"}
                    </Badge>
                  </ContractorRole>
                  <div className="d-flex flex-wrap gap-2">
                    <Badge className="success">
                      ID: {selectedContractor._id}
                    </Badge>
                    {selectedContractor.site?.siteName && (
                      <Badge className="warning">
                        Site: {selectedContractor.site.siteName}
                      </Badge>
                    )}
                  </div>
                </ContractorInfo>
              </ContractorProfileSection>

              <DetailsGrid>
                <DetailCard>
                  <DetailTitle>
                    <FaUser /> Personal Information
                  </DetailTitle>

                  <DetailItem>
                    <DetailLabel>Email:</DetailLabel>
                    <DetailValue>{selectedContractor.email}</DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Phone:</DetailLabel>
                    <DetailValue>
                      {selectedContractor.phone || "N/A"}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Gender:</DetailLabel>
                    <DetailValue>
                      {selectedContractor.gender || "N/A"}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Date of Birth:</DetailLabel>
                    <DetailValue>
                      {formatDate(selectedContractor.dateOfBirth)}
                    </DetailValue>
                  </DetailItem>
                </DetailCard>

                <DetailCard>
                  <DetailTitle>
                    <FaHome /> Site Information
                  </DetailTitle>
                  <DetailItem>
                    <DetailLabel>Site Name:</DetailLabel>
                    <DetailValue>
                      {selectedContractor.site?.siteName || "N/A"}
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Site Location:</DetailLabel>
                    <DetailValue>
                      {selectedContractor.site?.location || "N/A"}
                    </DetailValue>
                  </DetailItem>
                </DetailCard>

                <DetailCard>
                  <DetailTitle>
                    <FaIdCard /> Employment Details
                  </DetailTitle>

                  <DetailItem>
                    <DetailLabel>Role:</DetailLabel>
                    <DetailValue>
                      {selectedContractor.contractorRole || "Contractor"}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Joining Date:</DetailLabel>
                    <DetailValue>
                      {formatDate(selectedContractor.joiningDate)}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Supervisor:</DetailLabel>
                    <DetailValue>
                      {selectedContractor.supervisorId?.name || "N/A"}
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
            to={`/supervisor-dashboard/update-contractor/${selectedContractor?._id}`}
            style={{ padding: "0.5rem 1.25rem" }}
          >
            <FaEdit className="me-2" />
            Edit Contractor
          </Button>
        </ModalFooterStyled>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center py-4">
            <div className="mb-4">
              <FaTrash className="text-danger" size={48} />
            </div>
            <h5 className="mb-3">
              Are you sure you want to delete this contractor?
            </h5>
            <p className="fw-bold text-primary">
              {contractors.find(c => c._id === deleteId)?.name}
            </p>
            <p className="text-muted">This action cannot be undone.</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Contractor
          </Button>
        </Modal.Footer>
      </Modal>

      <Header>
        <h2>Contractor Management</h2>
        <p>Manage all contractors under your supervision</p>
      </Header>

      <ActionBar>
        <SearchBox>
          <FaSearch />
          <input
            type="text"
            placeholder="Search contractors..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </SearchBox>
        <AddButton to="/supervisor-dashboard/add-contractor">
          <FaUserPlus />
          <span>Add New Contractor</span>
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
          ) : currentContractors.length > 0 ? (
            <CardContainer>
              {currentContractors.map((contractor, index) => (
                <ContractorCard key={contractor._id}>
                  <CardHeader>
                    <ContractorPhoto contractor={contractor} size="50px" />
                    <div className="ms-3">
                      <h5 className="mb-0">{contractor.name}</h5>
                      <SerialNumberBadge>
                        #{getSerialNumber(index)}
                      </SerialNumberBadge>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <CardField>
                      <FaIdCard />
                      <span>{contractor.contractorRole || "Contractor"}</span>
                    </CardField>
                    <CardField>
                      <FaPhone />
                      <span>{contractor.phone || "N/A"}</span>
                    </CardField>
                    <CardField>
                      <FaCalendarAlt />
                      <span>Joined: {formatDate(contractor.joiningDate)}</span>
                    </CardField>
                    <CardField>
                      <FaVenusMars />
                      <span>{contractor.gender || "N/A"}</span>
                    </CardField>
                    <CardField>
                      <FaHome />
                      <span>{contractor.site?.siteName || "N/A"}</span>
                    </CardField>
                  </CardBody>
                  <CardFooter>
                    <button
                      className="btn btn-sm btn-outline-info"
                      onClick={() => handleViewClick(contractor)}
                      title="View"
                    >
                      <FaEye />
                    </button>
                    <Link
                      to={`/supervisor-dashboard/update-contractor/${contractor._id}`}
                      className="btn btn-sm btn-outline-primary"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        setDeleteId(contractor._id);
                        setShowModal(true);
                      }}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </CardFooter>
                </ContractorCard>
              ))}
            </CardContainer>
          ) : (
            <div className="text-center py-4">
              {searchTerm
                ? "No matching contractors found"
                : "No contractors available"}
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
                <th>Contractor</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Personal Info</th>
                <th>Site</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : currentContractors.length > 0 ? (
                currentContractors.map((contractor, index) => (
                  <tr key={contractor._id}>
                    <td>
                      <SerialNumberBadge>
                        {getSerialNumber(index)}
                      </SerialNumberBadge>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <ContractorPhoto contractor={contractor} />
                        <div>
                          <div className="fw-bold">{contractor.name}</div>
                          <small className="text-muted">
                            {contractor.email}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <FaPhone className="text-primary" />
                        <span>{contractor.phone || "N/A"}</span>
                      </div>
                    </td>
                    <td>
                      <Badge className="dark">
                        {contractor.contractorRole || "Contractor"}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex flex-column small">
                        <div className="d-flex align-items-center gap-1">
                          <FaVenusMars className={
                            contractor.gender === "Male" ? "text-info" : 
                            contractor.gender === "Female" ? "text-danger" : "text-secondary"
                          } />
                          <span>{contractor.gender || "N/A"}</span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <FaCalendarAlt className="text-warning" />
                          <span>{formatDate(contractor.joiningDate)}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge className="secondary">
                        {contractor.site?.siteName || "N/A"}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <ActionButton
                          className="view"
                          onClick={() => handleViewClick(contractor)}
                          title="View"
                        >
                          <FaEye />
                        </ActionButton>
                        <Link
                          to={`/supervisor-dashboard/update-contractor/${contractor._id}`}
                          className="edit"
                          title="Edit"
                          as={ActionButton}
                        >
                          <FaEdit />
                        </Link>
                        <ActionButton
                          className="delete"
                          onClick={() => {
                            setDeleteId(contractor._id);
                            setShowModal(true);
                          }}
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
                  <td colSpan={7} className="text-center py-4">
                    {searchTerm
                      ? "No matching contractors found"
                      : "No contractors available"}
                  </td>
                </tr>
              )}
            </tbody>
          </StyledTable>
        </div>
      )}

      {/* Pagination */}
      <PaginationContainer>
        <PageInfo>
          Showing {indexOfFirst + 1} to{" "}
          {Math.min(indexOfLast, filteredContractors.length)} of{" "}
          {filteredContractors.length} contractors
        </PageInfo>
        <PaginationButtons>
          <PageButton onClick={prevPage} disabled={currentPage === 1}>
            <FaChevronLeft size={14} />
            <span>Previous</span>
          </PageButton>
          <span className="mx-2">
            Page {currentPage} of{" "}
            {Math.ceil(filteredContractors.length / contractorsPerPage)}
          </span>
          <PageButton
            onClick={nextPage}
            disabled={
              currentPage >=
              Math.ceil(filteredContractors.length / contractorsPerPage)
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

export default ContractorList;