// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FaUserCircle, FaUserPlus } from "react-icons/fa";
// import axios from "axios";
// import { useAuth } from "../../../context/authContext";

// const WorkerList = () => {
//   const { user } = useAuth();
//   const [workers, setWorkers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [deleteId, setDeleteId] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const workersPerPage = 10;

//   useEffect(() => {
//     if (user?._id) {
//       fetchWorkers();
//     }
//   }, [user]);

//   const fetchWorkers = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Not authenticated.");
//         return;
//       }

//       const res = await axios.get(
//         "https://bulding-constraction-employee-management.onrender.com/api/workers",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res.data?.success && Array.isArray(res.data.data)) {
//         // ✅ Filter workers based on contractorRole matching the logged-in user's roleType
//         const filtered = res.data.data.filter(
//           (worker) =>
//             worker.contractorId?.contractorRole &&
//             worker.contractorId.contractorRole === user?.roleType
//         );
//         setWorkers(filtered);
//       } else {
//         setWorkers([]);
//         toast.info("No workers found.");
//       }
//     } catch (error) {
//       console.error("Error fetching workers:", error);
//       toast.error("Failed to fetch workers.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const res = await axios.delete(
//         `https://bulding-constraction-employee-management.onrender.com/api/workers/${deleteId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (res.data.success) {
//         toast.success("Worker deleted successfully.");
//         setWorkers((prev) => prev.filter((w) => w._id !== deleteId));
//       } else {
//         toast.error("Failed to delete worker.");
//       }
//     } catch (error) {
//       toast.error("Delete error: " + error.message);
//     } finally {
//       setShowModal(false);
//       setDeleteId(null);
//     }
//   };

//   // ✅ Search filter
//   const filteredWorkers = workers.filter((w) => {
//     const term = searchTerm.toLowerCase();
//     return (
//       String(w._id).toLowerCase().includes(term) ||
//       w.name?.toLowerCase().includes(term) ||
//       w.phone?.toLowerCase().includes(term) ||
//       w.email?.toLowerCase().includes(term) ||
//       w.contractorId?.name?.toLowerCase().includes(term)
//     );
//   });

//   const indexOfLast = currentPage * workersPerPage;
//   const indexOfFirst = indexOfLast - workersPerPage;
//   const currentWorkers = filteredWorkers.slice(indexOfFirst, indexOfLast);

//   return (
//     <div className="container py-4">
//       {loading && <p className="text-center text-muted">Loading workers...</p>}

//       {/* Delete Confirmation Modal */}
//       {showModal && (
//         <div className="modal-backdrop">
//           <div className="modal-content-box">
//             <h5 className="mb-3">⚠️ Confirm Deletion</h5>
//             <p>Are you sure you want to delete this worker?</p>
//             <div className="d-flex justify-content-end gap-2 mt-4">
//               <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
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
//           <h3 className="fw-bold text-primary mb-0">👷 Worker Management</h3>
//           <div className="d-flex flex-column flex-md-row gap-2 w-100">
//             <input
//               type="text"
//               className="form-control border-primary shadow-sm"
//               placeholder="🔍 Search ID, Name, Phone, Email, Contractor"
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//             <Link
//               to="/contractor-dashboard/add-worker"
//               className="btn btn-success fw-semibold d-flex align-items-center gap-2 shadow-sm"
//             >
//               <FaUserPlus /> Add Worker
//             </Link>
//           </div>
//         </div>

//         <div className="table-responsive">
//           <table className="table table-hover align-middle text-center">
//             <thead className="table-primary text-dark">
//               <tr>
//                 <th>S.No</th>
//                 <th>Photo</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Gender</th>
//                 <th>Role</th>
//                 <th>Sub Role</th>
//                 <th>Joining Date</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {!loading && currentWorkers.length > 0 ? (
//                 currentWorkers.map((worker, index) => (
//                   <tr key={worker._id}>
//                     <td>{indexOfFirst + index + 1}</td>
//                     <td>
//                       {worker.photo ? (
//                         <img
//                           src={worker.photo}
//                           alt="Worker"
//                           className="rounded-circle border border-info"
//                           style={{ width: "45px", height: "45px", objectFit: "cover" }}
//                         />
//                       ) : (
//                         <FaUserCircle size={40} className="text-secondary" />
//                       )}
//                     </td>
//                     <td className="text-capitalize fw-semibold">{worker.name}</td>
//                     <td>{worker.email}</td>
//                     <td>{worker.phone}</td>
//                     <td>
//                       <span
//                         className={`badge ${
//                           worker.gender === "Male"
//                             ? "bg-info"
//                             : worker.gender === "Female"
//                             ? "bg-danger"
//                             : "bg-secondary"
//                         }`}
//                       >
//                         {worker.gender}
//                       </span>
//                     </td>
//                     <td>
//                       <span className="badge bg-dark">{worker.workerRole || "N/A"}</span>
//                     </td>
//                     <td>
//                       <span className="badge bg-secondary">
//                         {worker.workerSubRole || "N/A"}
//                       </span>
//                     </td>
//                     <td>{worker.joiningDate || "N/A"}</td>
//                     <td>
//                       <div className="d-flex justify-content-center gap-2 flex-wrap">
//                         <Link
//                           to={`/contractor-dashboard/update-worker/${worker._id}`}
//                           className="btn btn-sm btn-outline-warning"
//                           title="Edit"
//                         >
//                           ✏️
//                         </Link>
//                         <button
//                           className="btn btn-sm btn-outline-danger"
//                           title="Delete"
//                           onClick={() => {
//                             setDeleteId(worker._id);
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
//                 !loading && (
//                   <tr>
//                     <td colSpan="10" className="text-muted py-4">
//                       No workers found.
//                     </td>
//                   </tr>
//                 )
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {!loading && filteredWorkers.length > workersPerPage && (
//           <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
//             <button
//               className="btn btn-outline-primary"
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               ⬅ Previous
//             </button>
//             <span className="fw-semibold text-secondary">
//               Page {currentPage} of {Math.ceil(filteredWorkers.length / workersPerPage)}
//             </span>
//             <button
//               className="btn btn-outline-primary"
//               onClick={() =>
//                 setCurrentPage((prev) =>
//                   prev >= Math.ceil(filteredWorkers.length / workersPerPage) ? prev : prev + 1
//                 )
//               }
//               disabled={currentPage >= Math.ceil(filteredWorkers.length / workersPerPage)}
//             >
//               Next ➡
//             </button>
//           </div>
//         )}
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
//       `}</style>
//     </div>
//   );
// };

// export default WorkerList;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../../context/authContext";
import {
  FaUser,
  FaUserPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaPhone,
  FaVenusMars,
  FaCalendarAlt,
  FaIdCard,
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

const WorkerCard = styled.div`
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

const WorkerList = () => {
  const { user } = useAuth();
  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  const workersPerPage = 10;

  useEffect(() => {
    if (user?._id) {
      fetchWorkers();
    }

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [user]);

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Not authenticated.");
        return;
      }

      const res = await axios.get(
        "https://bulding-constraction-employee-management.onrender.com/api/workers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.success && Array.isArray(res.data.data)) {
        const filtered = res.data.data.filter(
          (worker) =>
            worker.contractorId?.contractorRole &&
            worker.contractorId.contractorRole === user?.roleType
        );
        setWorkers(filtered);
      } else {
        setWorkers([]);
        toast.info("No workers found.");
      }
    } catch (error) {
      console.error("Error fetching workers:", error);
      toast.error("Failed to fetch workers.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `https://bulding-constraction-employee-management.onrender.com/api/workers/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Worker deleted successfully.");
        setWorkers((prev) => prev.filter((w) => w._id !== deleteId));
      } else {
        toast.error("Failed to delete worker.");
      }
    } catch (error) {
      toast.error("Delete error: " + error.message);
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const handleViewClick = (worker) => {
    setSelectedWorker(worker);
    setShowViewModal(true);
  };

  const filteredWorkers = workers.filter((w) => {
    const term = searchTerm.toLowerCase();
    return (
      String(w._id).toLowerCase().includes(term) ||
      w.name?.toLowerCase().includes(term) ||
      w.phone?.toLowerCase().includes(term) ||
      w.email?.toLowerCase().includes(term) ||
      w.contractorId?.name?.toLowerCase().includes(term)
    );
  });

  const indexOfLast = currentPage * workersPerPage;
  const indexOfFirst = indexOfLast - workersPerPage;
  const currentWorkers = filteredWorkers.slice(indexOfFirst, indexOfLast);

  const getPhotoUrl = (photoPath) => {
    if (!photoPath) return null;
    return `https://bulding-constraction-employee-management.onrender.com${photoPath}`;
  };

  const WorkerPhoto = ({ worker, size = "40px" }) => {
    const [imageError, setImageError] = useState(false);
    const photoUrl = getPhotoUrl(worker.photo);

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
            alt={worker.name}
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

  const getSerialNumber = (index) => {
    return (currentPage - 1) * workersPerPage + index + 1;
  };

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
            <FaUser /> Worker Details
          </Modal.Title>
        </ModalHeaderGradient>

        <ModalBodyContainer>
          {selectedWorker && (
            <div className="row">
              <div className="col-md-4 text-center mb-4 mb-md-0">
                <div className="mb-3">
                  <WorkerPhoto worker={selectedWorker} size="150px" />
                </div>
                <h4 className="fw-bold">{selectedWorker.name}</h4>
                <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
                  <Badge className="success">ID: {selectedWorker._id}</Badge>
                  <Badge className="dark">
                    {selectedWorker.workerRole || "Worker"}
                  </Badge>
                </div>
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <CardField>
                      <FaUser />
                      <span>Name: {selectedWorker.name}</span>
                    </CardField>
                    <CardField>
                      <FaIdCard />
                      <span>Role: {selectedWorker.workerRole || "N/A"}</span>
                    </CardField>
                    <CardField>
                      <FaIdCard />
                      <span>Sub Role: {selectedWorker.workerSubRole || "N/A"}</span>
                    </CardField>
                    <CardField>
                      <FaPhone />
                      <span>Phone: {selectedWorker.phone || "N/A"}</span>
                    </CardField>
                  </div>
                  <div className="col-md-6 mb-3">
                    <CardField>
                      <FaVenusMars />
                      <span>Gender: {selectedWorker.gender || "N/A"}</span>
                    </CardField>
                    <CardField>
                      <FaCalendarAlt />
                      <span>
                        Joining Date: {formatDate(selectedWorker.joiningDate)}
                      </span>
                    </CardField>
                    <CardField>
                      <FaUser />
                      <span>
                        Contractor: {selectedWorker.contractorId?.name || "N/A"}
                      </span>
                    </CardField>
                    <CardField>
                      <FaUser />
                      <span>Email: {selectedWorker.email || "N/A"}</span>
                    </CardField>
                  </div>
                </div>
              </div>
            </div>
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
            to={`/contractor-dashboard/update-worker/${selectedWorker?._id}`}
            style={{ padding: "0.5rem 1.25rem" }}
          >
            <FaEdit className="me-2" />
            Edit Worker
          </Button>
        </ModalFooterStyled>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <ModalHeaderGradient closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </ModalHeaderGradient>
        <ModalBodyContainer>
          <div className="text-center py-4">
            <div className="mb-4">
              <FaTrash className="text-danger" size={48} />
            </div>
            <h5 className="mb-3">
              Are you sure you want to delete this worker?
            </h5>
            <p className="fw-bold text-primary">
              {workers.find((w) => w._id === deleteId)?.name}
            </p>
            <p className="text-muted">This action cannot be undone.</p>
          </div>
        </ModalBodyContainer>
        <ModalFooterStyled>
          <Button
            variant="outline-secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Worker
          </Button>
        </ModalFooterStyled>
      </Modal>

      <Header>
        <h3>Worker Management</h3>
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
        <AddButton to="/contractor-dashboard/add-worker">
          <FaUserPlus />
          <span>Add New Worker</span>
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
          ) : currentWorkers.length > 0 ? (
            <CardContainer>
              {currentWorkers.map((worker, index) => (
                <WorkerCard key={worker._id}>
                  <CardHeader>
                    <WorkerPhoto worker={worker} size="50px" />
                    <div className="ms-3">
                      <h5 className="mb-0">{worker.name}</h5>
                      <SerialNumberBadge>
                        #{getSerialNumber(index)}
                      </SerialNumberBadge>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <CardField>
                      <FaIdCard />
                      <span>{worker.workerRole || "Worker"}</span>
                    </CardField>
                    <CardField>
                      <FaPhone />
                      <span>{worker.phone || "N/A"}</span>
                    </CardField>
                    <CardField>
                      <FaVenusMars />
                      <span>{worker.gender || "N/A"}</span>
                    </CardField>
                    <CardField>
                      <FaCalendarAlt />
                      <span>
                        Joined: {formatDate(worker.joiningDate) || "N/A"}
                      </span>
                    </CardField>
                  </CardBody>
                  <CardFooter>
                    <button
                      className="btn btn-sm btn-outline-info"
                      onClick={() => handleViewClick(worker)}
                      title="View"
                    >
                      <FaEye />
                    </button>
                    <Link
                      to={`/contractor-dashboard/update-worker/${worker._id}`}
                      className="btn btn-sm btn-outline-primary"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        setDeleteId(worker._id);
                        setShowDeleteModal(true);
                      }}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </CardFooter>
                </WorkerCard>
              ))}
            </CardContainer>
          ) : (
            <div className="text-center py-4">
              {searchTerm
                ? "No matching workers found"
                : "No workers available"}
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
                <th>Worker</th>
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
              ) : currentWorkers.length > 0 ? (
                currentWorkers.map((worker, index) => (
                  <tr key={worker._id}>
                    <td>
                      <SerialNumberBadge>
                        {getSerialNumber(index)}
                      </SerialNumberBadge>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <WorkerPhoto worker={worker} />
                        <div>
                          <div className="fw-bold">{worker.name}</div>
                          <small className="text-muted">
                            {worker.email}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <FaPhone className="text-primary" />
                        <span>{worker.phone || "N/A"}</span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column gap-1">
                        <Badge className="dark">
                          {worker.workerRole || "Worker"}
                        </Badge>
                        {worker.workerSubRole && (
                          <Badge className="secondary">
                            {worker.workerSubRole}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column small">
                        <div className="d-flex align-items-center gap-1">
                          <FaVenusMars className="text-success" />
                          <span>{worker.gender || "N/A"}</span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <FaCalendarAlt className="text-warning" />
                          <span>
                            {formatDate(worker.joiningDate) || "N/A"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <ActionButton
                          className="view"
                          onClick={() => handleViewClick(worker)}
                          title="View"
                        >
                          <FaEye />
                        </ActionButton>
                        <Link
                          to={`/contractor-dashboard/update-worker/${worker._id}`}
                          className="edit"
                          title="Edit"
                          as={ActionButton}
                        >
                          <FaEdit />
                        </Link>
                        <ActionButton
                          className="delete"
                          onClick={() => {
                            setDeleteId(worker._id);
                            setShowDeleteModal(true);
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
                  <td colSpan={6} className="text-center py-4">
                    {searchTerm
                      ? "No matching workers found"
                      : "No workers available"}
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
          {Math.min(indexOfLast, filteredWorkers.length)} of{" "}
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
              currentPage >=
              Math.ceil(filteredWorkers.length / workersPerPage)
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

export default WorkerList;