// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Table,
//   Button,
//   Spinner,
//   Form,
//   Row,
//   Col,
// } from "react-bootstrap";
// import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../context/authContext";
// import dayjs from "dayjs";

// const WPaymentList = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const navigate = useNavigate();
//   const { user, token: contextToken } = useAuth();
//   const token = contextToken || localStorage.getItem("token");

//   const fetchPayments = async () => {
//     if (!user?._id) {
//       toast.warning("⚠️ User not found. Please login again.");
//       return;
//     }

//     setLoading(true);

//     const url =
//       "https://bulding-constraction-employee-management.onrender.com/api/yes/workers/salary";

//     const params = {};
//     if (startDate && !endDate) {
//       params.date = dayjs(startDate).format("DD/MM/YYYY");
//     } else if (startDate && endDate) {
//       params.start = dayjs(startDate).format("DD/MM/YYYY");
//       params.end = dayjs(endDate).format("DD/MM/YYYY");
//     }

//     try {
//       const res = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//         params,
//       });

//       if (res.data.success && Array.isArray(res.data.data)) {
//         console.log("All payments from API:", res.data.data);

//         // ✅ Filter only payments belonging to the logged-in contractor
//         const filtered = res.data.data.filter(
//           (item) => item.contractorId?.userId === user._id
//         );

//         setPayments(filtered);

//         if (filtered.length === 0) {
//           toast.info("ℹ️ No payment records found for your account.");
//         }
//       } else {
//         setPayments([]);
//         toast.warning("⚠️ No payment data available.");
//       }
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       toast.error("❌ Failed to fetch payments.");
//       setPayments([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this payment?"))
//       return;

//     try {
//       await axios.delete(
//         `https://bulding-constraction-employee-management.onrender.com/api/yes/workers/salary/${id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.success("✅ Payment deleted successfully.");
//       fetchPayments();
//     } catch (err) {
//       console.error("Delete Error:", err);
//       toast.error("❌ Failed to delete payment.");
//     }
//   };

//   useEffect(() => {
//     if (user?._id) {
//       fetchPayments();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user]);

//   return (
//     <div className="container py-4">
//       <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
//         <h3 className="fw-bold mb-0">💰 Worker Payment List</h3>
//         <Button
//           variant="success"
//           onClick={() => navigate("/contractor-dashboard/add-payment")}
//         >
//           <FaPlus className="me-2" /> Add Payment
//         </Button>
//       </div>

//       {/* Filters */}
//       <Form className="mb-4">
//         <Row className="g-3 align-items-end">
//           <Col xs={12} sm={6} md={4}>
//             <Form.Label>Start Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               max={new Date().toISOString().split("T")[0]}
//             />
//           </Col>
//           <Col xs={12} sm={6} md={4}>
//             <Form.Label>End Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               min={startDate}
//               max={new Date().toISOString().split("T")[0]}
//             />
//           </Col>
//           <Col xs={12} sm={12} md={4}>
//             <Button
//               variant="primary"
//               className="w-100 mt-2"
//               onClick={fetchPayments}
//               disabled={!startDate}
//             >
//               <FaSearch className="me-2" />
//               Filter
//             </Button>
//           </Col>
//         </Row>
//       </Form>

//       {loading ? (
//         <div className="text-center py-5">
//           <Spinner animation="border" />
//         </div>
//       ) : (
//         <div className="table-responsive">
//           <Table bordered hover responsive className="align-middle text-center">
//             <thead className="table-dark">
//               <tr>
//                 <th>S.No</th>
//                 <th>Worker Name</th>
//                 <th>Role</th>
//                 <th>Sub Role</th>
//                 <th>Date</th>
//                 <th>Paid</th>
//                 <th>Balance</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {payments.length > 0 ? (
//                 payments.map((item, idx) => (
//                   <tr key={item._id}>
//                     <td>{idx + 1}</td>
//                     <td>{item.workerId?.name || item.workerName || "N/A"}</td>
//                     <td>{item.workerRole || item.workerId?.workerRole || "N/A"}</td>
//                     <td>{item.workerSubRole || item.workerId?.workerSubRole || "N/A"}</td>
//                     <td>
//                       {item.date
//                         ? dayjs(item.date, ["DD/MM/YYYY", "YYYY-MM-DD"]).format(
//                             "DD/MM/YYYY"
//                           )
//                         : "-"}
//                     </td>
//                     <td>{item.paidAmount ?? "-"}</td>
//                     <td>{item.balanceAmount ?? "-"}</td>
//                     <td>
//                       <span
//                         className={`badge ${
//                           item.status === "Paid"
//                             ? "bg-success"
//                             : "bg-warning text-dark"
//                         }`}
//                       >
//                         {item.status}
//                       </span>
//                     </td>
//                     <td>
//                       <Button
//                         variant="info"
//                         size="sm"
//                         className="me-2"
//                         onClick={() =>
//                           navigate(`/contractor-dashboard/edit-payment/${item._id}`)
//                         }
//                       >
//                         <FaEdit />
//                       </Button>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => handleDelete(item._id)}
//                       >
//                         <FaTrash />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="9" className="text-muted">
//                     No payment records found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WPaymentList;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaEye,
  FaEllipsisV,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

// Extend dayjs with custom parse format plugin
dayjs.extend(customParseFormat);

// ======================
// Styled Components
// ======================

const Container = styled.div`
  padding: 1rem;
  background-color: #f8f9fa;
  min-height: calc(100vh - 70px);

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;
  h2 {
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;

    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }
  p {
    color: #7f8c8d;
    font-size: 0.9rem;

    @media (min-width: 768px) {
      font-size: 1rem;
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
    height: 40px;
    font-size: 14px;

    @media (min-width: 768px) {
      height: 45px;
      font-size: 16px;
    }

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
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (min-width: 576px) {
    gap: 1rem;
    flex-wrap: nowrap;
  }

  .react-datepicker-wrapper {
    width: auto;
  }

  .form-control {
    min-width: 120px;
    cursor: pointer;
    height: 40px;
    font-size: 14px;

    @media (min-width: 768px) {
      min-width: 150px;
      height: 45px;
      font-size: 16px;
    }
  }

  span {
    display: none;

    @media (min-width: 576px) {
      display: inline;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s;
  border: none;
  width: 100%;
  font-size: 14px;
  height: 40px;

  @media (min-width: 768px) {
    width: auto;
    height: 45px;
    font-size: 16px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
  }
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
  font-size: 14px;
  height: 40px;

  @media (min-width: 768px) {
    font-size: 16px;
    height: 45px;
  }

  &:hover {
    background-color: #f8f9fa;
  }

  &.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
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
      padding: 0.75rem;
      font-weight: 500;
      border: none;
      text-align: center;
      font-size: 14px;

      @media (min-width: 768px) {
        padding: 1rem;
        font-size: 16px;
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
      padding: 0.5rem;
      vertical-align: middle;
      border-top: 1px solid #e9ecef;
      text-align: center;
      font-size: 14px;

      @media (min-width: 768px) {
        padding: 0.75rem 1rem;
        font-size: 16px;
      }
    }
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;

  @media (min-width: 768px) {
    padding: 0.35rem 0.75rem;
    font-size: 0.85rem;
  }

  &.paid {
    background-color: rgba(40, 167, 69, 0.2);
    color: #1e7e34;
  }

  &.pending {
    background-color: rgba(255, 193, 7, 0.2);
    color: #856404;
  }
`;

const SalaryAmount = styled.span.attrs(({ $positive, $negative }) => ({
  $positive: $positive ? "true" : undefined,
  $negative: $negative ? "true" : undefined,
}))`
  font-weight: 600;
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
  }

  color: ${(props) => {
    if (props.$positive) return "#28a745";
    if (props.$negative) return "#dc3545";
    return "#6c757d";
  }};
`;

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;

  @media (min-width: 576px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const PageInfo = styled.span`
  color: #7f8c8d;
  font-size: 0.85rem;

  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
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
  padding: 0.375rem 0.5rem;
  border-radius: 5px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;

  @media (min-width: 768px) {
    padding: 0.5rem 0.75rem;
    font-size: 16px;
  }

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

const DeleteModalContent = styled.div`
  text-align: center;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }

  .icon {
    font-size: 2.5rem;
    color: #dc3545;
    margin-bottom: 0.75rem;

    @media (min-width: 768px) {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
  }

  .message {
    margin-bottom: 1rem;
    font-size: 1rem;

    @media (min-width: 768px) {
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
    }
  }

  .worker-name {
    font-weight: 600;
    color: #2c3e50;
    margin: 0.5rem 0;
    font-size: 1rem;

    @media (min-width: 768px) {
      font-size: 1.1rem;
    }
  }

  .payment-date {
    color: #6c757d;
    margin-bottom: 1rem;
    font-size: 0.9rem;

    @media (min-width: 768px) {
      margin-bottom: 1.5rem;
      font-size: 1rem;
    }
  }
`;

const PaymentDetailsModal = styled(Modal)`
  .modal-content {
    border-radius: 10px;
  }

  .modal-header {
    border-bottom: 1px solid #e9ecef;
    padding: 1rem;

    @media (min-width: 768px) {
      padding: 1.5rem;
    }
  }

  .modal-title {
    font-weight: 600;
    color: #2c3e50;
    font-size: 1.25rem;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  .modal-body {
    padding: 1rem;

    @media (min-width: 768px) {
      padding: 1.5rem;
    }
  }

  .section-title {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.75rem;
    font-size: 1rem;

    @media (min-width: 768px) {
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
  }

  .detail-item {
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;

    @media (min-width: 768px) {
      margin-bottom: 0.75rem;
      font-size: 1rem;
    }

    strong {
      color: #2c3e50;
    }

    span {
      color: #6c757d;
    }
  }

  .divider {
    border-top: 1px solid #e9ecef;
    margin: 1rem 0;

    @media (min-width: 768px) {
      margin: 1.5rem 0;
    }
  }

  .summary-item {
    font-weight: 600;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;

    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }

  .advance {
    color: #dc3545;
  }
`;

const MobileActionsDropdown = styled(Dropdown)`
  .dropdown-toggle {
    background: transparent;
    border: none;
    color: #6c757d;
    padding: 0.25rem;
    font-size: 1rem;
    
    &::after {
      display: none;
    }
    
    &:focus {
      box-shadow: none;
    }
  }
  
  .dropdown-menu {
    min-width: 120px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    border: 1px solid #e9ecef;
    padding: 0.5rem 0;
  }
  
  .dropdown-item {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:active {
      background-color: #f8f9fa;
      color: #212529;
    }
  }
`;

const WPaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentToDelete, setPaymentToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 10;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navigate = useNavigate();
  const { user, token: contextToken } = useAuth();
  const token = contextToken || localStorage.getItem("token");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchPayments = async () => {
    if (!user?._id) {
      toast.warning("⚠️ User not found. Please login again.");
      return;
    }

    setLoading(true);

    const url =
      "https://bulding-constraction-employee-management.onrender.com/api/yes/workers/salary";

    const params = {};
    if (startDate) params.start = dayjs(startDate).format("DD/MM/YYYY");
    if (endDate) params.end = dayjs(endDate).format("DD/MM/YYYY");
    if (statusFilter !== "all") params.status = statusFilter;

    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      if (res.data.success && Array.isArray(res.data.data)) {
        // Filter only payments belonging to the logged-in contractor
        const filtered = res.data.data.filter(
          (item) => item.contractorId?.userId === user._id
        );

        setPayments(filtered);

        if (filtered.length === 0) {
          toast.info("ℹ️ No payment records found for your account.");
        }
      } else {
        setPayments([]);
        toast.warning("⚠️ No payment data available.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("❌ Failed to fetch payments.");
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (payment) => {
    setSelectedPayment(payment);
    setShowViewModal(true);
  };

  const handleDeleteClick = (payment) => {
    setPaymentToDelete(payment);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!paymentToDelete) return;

    try {
      await axios.delete(
        `https://bulding-constraction-employee-management.onrender.com/api/yes/workers/salary/${paymentToDelete._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("✅ Payment deleted successfully.");
      fetchPayments();
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("❌ Failed to delete payment.");
    } finally {
      setShowDeleteModal(false);
      setPaymentToDelete(null);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchPayments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, statusFilter, startDate, endDate]);

  const filteredPayments = payments.filter((payment) => {
    return true; // Add any additional filtering logic here if needed
  });

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredPayments.length / paymentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const parseDate = (dateString) => {
    if (!dateString) return null;
    
    // Try parsing with different formats
    const formats = [
      "DD/MM/YYYY",
      "MM/DD/YYYY",
      "YYYY-MM-DD",
      "DD-MM-YYYY",
      "MM-DD-YYYY",
      "YYYY/MM/DD"
    ];
    
    for (const format of formats) {
      const parsedDate = dayjs(dateString, format, true);
      if (parsedDate.isValid()) {
        return parsedDate;
      }
    }
    
    return null;
  };

  const formatDateForDisplay = (dateString) => {
    const parsedDate = parseDate(dateString);
    return parsedDate ? parsedDate.format("DD MMM YYYY") : "N/A";
  };

  return (
    <Container>
      {/* View Payment Details Modal */}
      <PaymentDetailsModal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Salary Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <>
              <h4 className="mb-3">{selectedPayment.workerId?.name || selectedPayment.workerName || "Unknown Worker"}</h4>
              <p className="text-muted mb-4">{selectedPayment.workerRole || selectedPayment.workerId?.workerRole || "N/A"} ({selectedPayment.workerSubRole || selectedPayment.workerId?.workerSubRole || "N/A"})</p>

              <h5 className="section-title">Salary Information</h5>
              <div className="detail-item">
                <strong>Payment Date:</strong>
                <span>{formatDateForDisplay(selectedPayment.date)}</span>
              </div>
              <div className="detail-item">
                <strong>Status:</strong>
                <span>
                  {selectedPayment.status === "Paid" ? (
                    <StatusBadge className="paid">Paid</StatusBadge>
                  ) : (
                    <StatusBadge className="pending">Pending</StatusBadge>
                  )}
                </span>
              </div>

              <div className="divider"></div>

              <h5 className="section-title">Payment Details</h5>
              <div className="detail-item">
                <strong>Paid Amount:</strong>
                <span>₹{selectedPayment.paidAmount || "0"}</span>
              </div>
              <div className="detail-item">
                <strong>Balance:</strong>
                <span>₹{selectedPayment.balanceAmount || "0"}</span>
              </div>

              <div className="divider"></div>

              <h5 className="section-title">Summary</h5>
              <div className="summary-item">
                <span>Total Amount:</span>
                <span>₹{(selectedPayment.paidAmount || 0) + (selectedPayment.balanceAmount || 0)}</span>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </PaymentDetailsModal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteModalContent>
            <div className="icon">
              <FaTrash />
            </div>
            <h5 className="message">
              Are you sure you want to delete this payment record?
            </h5>
            {paymentToDelete && (
              <>
                <p className="worker-name">
                  {paymentToDelete.workerId?.name || paymentToDelete.workerName || "Unknown Worker"}
                </p>
                <p className="payment-date">
                  {formatDateForDisplay(paymentToDelete.date)}
                </p>
                <p className="text-muted">
                  This action cannot be undone and will permanently delete the
                  payment record.
                </p>
              </>
            )}
          </DeleteModalContent>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete Record
          </Button>
        </Modal.Footer>
      </Modal>

      <Header>
        <h2>Worker Payment Management</h2>
        <p>View and manage worker payment records</p>
      </Header>

      <ActionBar>
        <DateFilterContainer>
          <FaCalendarAlt />
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setCurrentPage(1);
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="Start Date"
          />
          <span>to</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
              setCurrentPage(1);
            }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="End Date"
          />
        </DateFilterContainer>

        <ActionButtons>
          <AddButton onClick={() => navigate("/contractor-dashboard/add-payment")}>
            <FaPlus />
            <span>Add Payment</span>
          </AddButton>
        </ActionButtons>
      </ActionBar>

      <FilterContainer>
        <FilterButton
          className={statusFilter === "all" ? "active" : ""}
          onClick={() => setStatusFilter("all")}
        >
          All
        </FilterButton>
        <FilterButton
          className={statusFilter === "Paid" ? "active" : ""}
          onClick={() => setStatusFilter("Paid")}
        >
          Paid
        </FilterButton>
        <FilterButton
          className={statusFilter === "Pending" ? "active" : ""}
          onClick={() => setStatusFilter("Pending")}
        >
          Pending
        </FilterButton>
      </FilterContainer>

      <div className="table-responsive">
        <StyledTable>
          <thead>
            <tr>
              {!isMobile && <th>S.No</th>}
              <th>Worker</th>
              {!isMobile && <th>Role</th>}
              {!isMobile && <th>Sub Role</th>}
              {!isMobile && <th>Date</th>}
              <th>Paid</th>
              {!isMobile && <th>Balance</th>}
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={isMobile ? 4 : 8} className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : currentPayments.length > 0 ? (
              currentPayments.map((payment, index) => (
                <tr key={payment._id}>
                  {!isMobile && (
                    <td>
                      <span className="fw-bold">
                        {(currentPage - 1) * paymentsPerPage + index + 1}
                      </span>
                    </td>
                  )}
                  <td>
                    {payment.workerId?.name || payment.workerName || "N/A"}
                    {isMobile && (
                      <div className="text-muted small">
                        {payment.workerRole || payment.workerId?.workerRole || "N/A"}
                      </div>
                    )}
                  </td>
                  {!isMobile && (
                    <td>{payment.workerRole || payment.workerId?.workerRole || "N/A"}</td>
                  )}
                  {!isMobile && (
                    <td>{payment.workerSubRole || payment.workerId?.workerSubRole || "N/A"}</td>
                  )}
                  {!isMobile && (
                    <td>{formatDateForDisplay(payment.date)}</td>
                  )}
                  <td>
                    <SalaryAmount $positive={payment.paidAmount > 0}>
                      ₹{payment.paidAmount || "-"}
                    </SalaryAmount>
                    {isMobile && (
                      <div className="small text-muted">
                        {formatDateForDisplay(payment.date)}
                      </div>
                    )}
                  </td>
                  {!isMobile && (
                    <td>
                      <SalaryAmount
                        $positive={payment.balanceAmount > 0}
                        $negative={payment.balanceAmount < 0}
                      >
                        ₹{payment.balanceAmount || "-"}
                      </SalaryAmount>
                    </td>
                  )}
                  <td>
                    {payment.status === "Paid" ? (
                      <StatusBadge className="paid">Paid</StatusBadge>
                    ) : (
                      <StatusBadge className="pending">Pending</StatusBadge>
                    )}
                  </td>
                  <td>
                    {isMobile ? (
                      <MobileActionsDropdown>
                        <Dropdown.Toggle variant="link" id="dropdown-actions">
                          <FaEllipsisV />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleViewClick(payment)}>
                            <FaEye /> View
                          </Dropdown.Item>
                          <Dropdown.Item 
                            onClick={() => navigate(`/contractor-dashboard/edit-payment/${payment._id}`)}
                          >
                            <FaEdit /> Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDeleteClick(payment)}>
                            <FaTrash /> Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </MobileActionsDropdown>
                    ) : (
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-info"
                          onClick={() => handleViewClick(payment)}
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            navigate(
                              `/contractor-dashboard/edit-payment/${payment._id}`
                            )
                          }
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteClick(payment)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isMobile ? 4 : 8} className="text-center py-4">
                  No payment records found
                </td>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </div>

      <PaginationContainer>
        <PageInfo>
          Showing {indexOfFirstPayment + 1} to{" "}
          {Math.min(indexOfLastPayment, filteredPayments.length)} of{" "}
          {filteredPayments.length} records
        </PageInfo>
        <PaginationButtons>
          <PageButton onClick={prevPage} disabled={currentPage === 1}>
            <FaChevronLeft size={14} />
            {!isMobile && <span>Previous</span>}
          </PageButton>
          {!isMobile && (
            <span className="mx-2">
              Page {currentPage} of{" "}
              {Math.ceil(filteredPayments.length / paymentsPerPage)}
            </span>
          )}
          <PageButton
            onClick={nextPage}
            disabled={
              currentPage >= Math.ceil(filteredPayments.length / paymentsPerPage)
            }
          >
            {!isMobile && <span>Next</span>}
            <FaChevronRight size={14} />
          </PageButton>
        </PaginationButtons>
      </PaginationContainer>
    </Container>
  );
};

export default WPaymentList;
