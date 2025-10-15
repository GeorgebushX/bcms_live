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

// const PaymentList = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const navigate = useNavigate();
//   const { token: contextToken } = useAuth();
//   const token = contextToken || localStorage.getItem("token");

//   const fetchPayments = async () => {
//     setLoading(true);
//     const url =
//       "https://bulding-constraction-employee-management.onrender.com/api/yes/supervisors/salary";

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
//         setPayments(res.data.data);
//         if (res.data.data.length === 0)
//           toast.info("ℹ️ No payment records found.");
//       } else {
//         setPayments([]);
//         toast.warning("⚠️ No payment data available.");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       toast.error("❌ Failed to fetch payments.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this payment?")) return;

//     try {
//       await axios.delete(
//         `https://bulding-constraction-employee-management.onrender.com/api/supervisors/salary/${id}`,
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
//     fetchPayments();
//   }, []);

//   return (
//     <div className="container py-4">
//       <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
//         <h3 className="fw-bold mb-2">💰 Payment List</h3>
//         <Button variant="success" onClick={() => navigate("/engineer-dashboard/add-payment")}>
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
//             />
//           </Col>
//           <Col xs={12} sm={6} md={4}>
//             <Form.Label>End Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               min={startDate}
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
//                 <th>Name</th>
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
//                     <td>{item.supervisorId?.name}</td>
//                     <td>{item.date}</td>
//                     <td>{item.paidAmount ?? "-"}</td>
//                     <td>{item.balanceAmount ?? "-"}</td>
//                     <td>
//                       <span
//                         className={`badge ${
//                           item.balanceAmount === 0
//                             ? "bg-success"
//                             : "bg-warning text-dark"
//                         }`}
//                       >
//                         {item.balanceAmount === 0 ? "Paid" : "Pending"}
//                       </span>
//                     </td>
//                     <td>
//                       <Button
//                         variant="info"
//                         size="sm"
//                         className="me-2"
//                         onClick={() => navigate(`/engineer-dashboard/edit-payment/${item._id}`)}
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
//                   <td colSpan="7" className="text-muted">
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

// export default PaymentList;



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
  FaTimes,
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
import Form from "react-bootstrap/Form";

// Extend dayjs with custom parse format plugin
dayjs.extend(customParseFormat);

// Supervisor types for filtering
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
  align-items: center;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.span`
  font-weight: 500;
  color: #495057;
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const FilterSelect = styled(Form.Select)`
  width: auto;
  min-width: 180px;
  height: 40px;
  font-size: 14px;
  border-radius: 50px;
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;

  @media (min-width: 768px) {
    height: 45px;
    font-size: 16px;
  }
`;

const ClearFiltersButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  border: 1px solid #dc3545;
  background-color: white;
  color: #dc3545;
  transition: all 0.2s;
  font-size: 14px;
  height: 40px;

  @media (min-width: 768px) {
    font-size: 16px;
    height: 45px;
  }

  &:hover {
    background-color: #dc3545;
    color: white;
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

const SupervisorTypeBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  background-color: #e9ecef;
  color: #495057;

  @media (min-width: 768px) {
    font-size: 0.8rem;
    padding: 0.35rem 0.6rem;
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

  .supervisor-name {
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  .spinner-border {
    width: 3rem;
    height: 3rem;
    color: #3498db;
  }
`;

const NoRecords = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-style: italic;
`;

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [supervisorTypeFilter, setSupervisorTypeFilter] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentToDelete, setPaymentToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 10;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navigate = useNavigate();
  const { token: contextToken } = useAuth();
  const token = contextToken || localStorage.getItem("token");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    const url =
      "https://bulding-constraction-employee-management.onrender.com/api/yes/supervisors/salary";

    const params = {};
    if (startDate) params.start = dayjs(startDate).format("DD/MM/YYYY");
    if (endDate) params.end = dayjs(endDate).format("DD/MM/YYYY");

    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      if (res.data.success && Array.isArray(res.data.data)) {
        setPayments(res.data.data);
        setFilteredPayments(res.data.data);
        if (res.data.data.length === 0) {
          toast.info("ℹ️ No payment records found.");
        }
      } else {
        setPayments([]);
        setFilteredPayments([]);
        toast.warning("⚠️ No payment data available.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("❌ Failed to fetch payments.");
    } finally {
      setLoading(false);
    }
  };

  // Apply filters whenever filter criteria change
  useEffect(() => {
    let result = [...payments];

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((payment) => {
        if (statusFilter === "Paid") {
          return payment.balanceAmount === 0;
        } else if (statusFilter === "Pending") {
          return payment.balanceAmount !== 0;
        }
        return true;
      });
    }

    // Apply supervisor type filter
    if (supervisorTypeFilter !== "All Types") {
      result = result.filter(
        (payment) =>
          payment.supervisorId?.supervisorType === supervisorTypeFilter
      );
    }

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (payment) =>
          payment.supervisorId?.name?.toLowerCase().includes(query) ||
          payment.supervisorId?.supervisorType?.toLowerCase().includes(query) ||
          payment._id?.toLowerCase().includes(query)
      );
    }

    // Apply date range filter
    if (startDate || endDate) {
      result = result.filter((payment) => {
        const paymentDate = parseDate(payment.date);
        if (!paymentDate) return false;

        const paymentDateObj = paymentDate.toDate();
        const afterStart = !startDate || paymentDateObj >= startDate;
        const beforeEnd = !endDate || paymentDateObj <= endDate;

        return afterStart && beforeEnd;
      });
    }

    setFilteredPayments(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    payments,
    statusFilter,
    supervisorTypeFilter,
    searchQuery,
    startDate,
    endDate,
  ]);

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
        `https://bulding-constraction-employee-management.onrender.com/api/supervisors/salary/${paymentToDelete._id}`,
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

  const clearAllFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setStatusFilter("all");
    setSupervisorTypeFilter("All Types");
    setSearchQuery("");
  };

  useEffect(() => {
    fetchPayments();
  }, []);

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
      "YYYY/MM/DD",
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

  const hasActiveFilters =
    startDate ||
    endDate ||
    statusFilter !== "all" ||
    supervisorTypeFilter !== "All Types" ||
    searchQuery;

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
              <h4 className="mb-3">
                {selectedPayment.supervisorId?.name || "Unknown Supervisor"}
              </h4>
              <p className="text-muted mb-4">
                {selectedPayment.supervisorId?.supervisorType || "Supervisor"}
              </p>

              <h5 className="section-title">Salary Information</h5>
              <div className="detail-item">
                <strong>Period:</strong>
                <span>
                  {formatDateForDisplay(selectedPayment.date)} -{" "}
                  {formatDateForDisplay(selectedPayment.endDate)}
                </span>
              </div>
              <div className="detail-item">
                <strong>Status:</strong>
                <span>
                  {selectedPayment.balanceAmount === 0 ? (
                    <StatusBadge className="paid">Paid</StatusBadge>
                  ) : (
                    <StatusBadge className="pending">Pending</StatusBadge>
                  )}
                </span>
              </div>
              <div className="detail-item">
                <strong>Working Days:</strong>
                <span>{selectedPayment.workingDays || "N/A"}</span>
              </div>
              <div className="detail-item">
                <strong>Half Days:</strong>
                <span>{selectedPayment.halfDays || "N/A"}</span>
              </div>
              <div className="detail-item">
                <strong>Overtime Days:</strong>
                <span>{selectedPayment.overtimeDays || "N/A"}</span>
              </div>

              <div className="divider"></div>

              <h5 className="section-title">Payment Details</h5>
              <div className="detail-item">
                <strong>Basic Salary:</strong>
                <span>₹{selectedPayment.basicSalary || "0"}</span>
              </div>
              <div className="detail-item">
                <strong>Allowances:</strong>
                <span>₹{selectedPayment.allowances || "0"}</span>
              </div>
              <div className="detail-item">
                <strong>Deductions:</strong>
                <span>₹{selectedPayment.deductions || "0"}</span>
              </div>
              <div className="detail-item">
                <strong>Advance:</strong>
                <span>₹{selectedPayment.advance || "0"}</span>
              </div>

              <div className="divider"></div>

              <h5 className="section-title">Summary</h5>
              <div className="summary-item">
                <span>Net Salary:</span>
                <span>₹{selectedPayment.netSalary || "0"}</span>
              </div>
              <div className="summary-item">
                <span>Paid Amount:</span>
                <span>₹{selectedPayment.paidAmount || "0"}</span>
              </div>
              <div className="summary-item">
                <span>Balance:</span>
                <span
                  className={selectedPayment.balanceAmount < 0 ? "advance" : ""}
                >
                  ₹{selectedPayment.balanceAmount || "0"}{" "}
                  {selectedPayment.balanceAmount < 0 ? "(Advance)" : ""}
                </span>
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
                <p className="supervisor-name">
                  {paymentToDelete.supervisorId?.name || "Unknown Supervisor"}
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
        <h2>Supervisor Payment Management</h2>
        <p>View and manage supervisor payment records</p>
      </Header>

      <ActionBar>
        <SearchBox>
          <FaSearch />
          <Form.Control
            type="text"
            placeholder="Search by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBox>

        <ActionButtons>
          <AddButton
            onClick={() => navigate("/engineer-dashboard/add-payment")}
          >
            <FaPlus />
            <span>Add Payment</span>
          </AddButton>
        </ActionButtons>
      </ActionBar>

      <FilterContainer>
        <FilterSection>
          <FilterLabel>Status:</FilterLabel>
          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </FilterSelect>
        </FilterSection>

        <FilterSection>
          <FilterLabel>Type:</FilterLabel>
          <FilterSelect
            value={supervisorTypeFilter}
            onChange={(e) => setSupervisorTypeFilter(e.target.value)}
          >
            {supervisorTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </FilterSelect>
        </FilterSection>

        <FilterSection>
          <FilterLabel>Date Range:</FilterLabel>
          <DateFilterContainer>
            <FaCalendarAlt />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
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
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="dd/MM/yyyy"
              className="form-control"
              placeholderText="End Date"
            />
          </DateFilterContainer>
        </FilterSection>

        {hasActiveFilters && (
          <ClearFiltersButton onClick={clearAllFilters}>
            <FaTimes />
            <span>Clear Filters</span>
          </ClearFiltersButton>
        )}
      </FilterContainer>

      <div className="table-responsive">
        <StyledTable>
          <thead>
            <tr>
              {!isMobile && <th>S.No</th>}
              <th>Supervisor</th>
              {!isMobile && <th>Type</th>}
              {!isMobile && <th>Date</th>}
              <th>Amount</th>
              {!isMobile && <th>Balance</th>}
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={isMobile ? 4 : 8} className="text-center py-4">
                  <LoadingSpinner>
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </LoadingSpinner>
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
                    <div className="fw-medium">
                      {payment.supervisorId?.name || "Unknown Supervisor"}
                    </div>
                    {isMobile && (
                      <>
                        <div className="small text-muted">
                          {payment.supervisorId?.supervisorType || "Supervisor"}
                        </div>
                        <div className="text-muted small">
                          {formatDateForDisplay(payment.date)}
                        </div>
                      </>
                    )}
                  </td>
                  {!isMobile && (
                    <td>
                      <SupervisorTypeBadge>
                        {payment.supervisorId?.supervisorType || "Supervisor"}
                      </SupervisorTypeBadge>
                    </td>
                  )}
                  {!isMobile && <td>{formatDateForDisplay(payment.date)}</td>}
                  <td>
                    <SalaryAmount $positive={payment.paidAmount > 0}>
                      ₹{payment.paidAmount || "-"}
                    </SalaryAmount>
                    {isMobile && payment.balanceAmount !== 0 && (
                      <div className="small text-muted">
                        Balance: ₹{payment.balanceAmount || "0"}
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
                    {payment.balanceAmount === 0 ? (
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
                          <Dropdown.Item
                            onClick={() => handleViewClick(payment)}
                          >
                            <FaEye /> View
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              navigate(
                                `/engineer-dashboard/edit-payment/${payment._id}`
                              )
                            }
                          >
                            <FaEdit /> Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleDeleteClick(payment)}
                          >
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
                              `/engineer-dashboard/edit-payment/${payment._id}`
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
                <td colSpan={isMobile ? 4 : 8}>
                  <NoRecords>
                    No payment records found{" "}
                    {hasActiveFilters ? "matching your filters" : ""}
                  </NoRecords>
                </td>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </div>

      {filteredPayments.length > 0 && (
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
                currentPage >=
                Math.ceil(filteredPayments.length / paymentsPerPage)
              }
            >
              {!isMobile && <span>Next</span>}
              <FaChevronRight size={14} />
            </PageButton>
          </PaginationButtons>
        </PaginationContainer>
      )}
    </Container>
  );
};

export default PaymentList;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   FaEdit,
//   FaTrash,
//   FaPlus,
//   FaSearch,
//   FaCalendarAlt,
//   FaMoneyBillWave,
//   FaChevronLeft,
//   FaChevronRight,
//   FaFilter,
//   FaEye,
//   FaEllipsisV,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../context/authContext";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import styled from "styled-components";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import Dropdown from "react-bootstrap/Dropdown";

// // Extend dayjs with custom parse format plugin
// dayjs.extend(customParseFormat);

// // ======================
// // Styled Components
// // ======================

// const Container = styled.div`
//   padding: 1rem;
//   background-color: #f8f9fa;
//   min-height: calc(100vh - 70px);

//   @media (min-width: 768px) {
//     padding: 1.5rem;
//   }
// `;

// const Header = styled.div`
//   margin-bottom: 1.5rem;
//   text-align: center;
//   h2 {
//     color: #2c3e50;
//     font-weight: 600;
//     margin-bottom: 0.5rem;
//     font-size: 1.5rem;

//     @media (min-width: 768px) {
//       font-size: 2rem;
//     }
//   }
//   p {
//     color: #7f8c8d;
//     font-size: 0.9rem;

//     @media (min-width: 768px) {
//       font-size: 1rem;
//     }
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
//     height: 40px;
//     font-size: 14px;

//     @media (min-width: 768px) {
//       height: 45px;
//       font-size: 16px;
//     }

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
//   gap: 0.5rem;
//   flex-wrap: wrap;

//   @media (min-width: 576px) {
//     gap: 1rem;
//     flex-wrap: nowrap;
//   }

//   .react-datepicker-wrapper {
//     width: auto;
//   }

//   .form-control {
//     min-width: 120px;
//     cursor: pointer;
//     height: 40px;
//     font-size: 14px;

//     @media (min-width: 768px) {
//       min-width: 150px;
//       height: 45px;
//       font-size: 16px;
//     }
//   }

//   span {
//     display: none;

//     @media (min-width: 576px) {
//       display: inline;
//     }
//   }
// `;

// const ActionButtons = styled.div`
//   display: flex;
//   gap: 0.5rem;
//   flex-wrap: wrap;
//   justify-content: flex-end;
// `;

// const AddButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
//   background: linear-gradient(135deg, #3498db, #2980b9);
//   color: white;
//   padding: 0.5rem 1rem;
//   border-radius: 50px;
//   font-weight: 500;
//   transition: all 0.3s;
//   border: none;
//   width: 100%;
//   font-size: 14px;
//   height: 40px;

//   @media (min-width: 768px) {
//     width: auto;
//     height: 45px;
//     font-size: 16px;
//   }

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
//   }
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
//   font-size: 14px;
//   height: 40px;

//   @media (min-width: 768px) {
//     font-size: 16px;
//     height: 45px;
//   }

//   &:hover {
//     background-color: #f8f9fa;
//   }

//   &.active {
//     background-color: #3498db;
//     color: white;
//     border-color: #3498db;
//   }
// `;

// const FilterContainer = styled.div`
//   display: flex;
//   gap: 0.5rem;
//   margin-bottom: 1.5rem;
//   flex-wrap: wrap;
// `;

// const StyledTable = styled.table`
//   background: white;
//   border-radius: 10px;
//   overflow: hidden;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//   width: 100%;

//   thead {
//     background: linear-gradient(135deg, #2c3e50, #34495e);
//     color: white;

//     th {
//       padding: 0.75rem;
//       font-weight: 500;
//       border: none;
//       text-align: center;
//       font-size: 14px;

//       @media (min-width: 768px) {
//         padding: 1rem;
//         font-size: 16px;
//       }
//     }
//   }

//   tbody {
//     tr {
//       transition: all 0.2s;

//       &:hover {
//         background-color: rgba(52, 152, 219, 0.05);
//       }
//     }

//     td {
//       padding: 0.5rem;
//       vertical-align: middle;
//       border-top: 1px solid #e9ecef;
//       text-align: center;
//       font-size: 14px;

//       @media (min-width: 768px) {
//         padding: 0.75rem 1rem;
//         font-size: 16px;
//       }
//     }
//   }
// `;

// const StatusBadge = styled.span`
//   display: inline-block;
//   padding: 0.25rem 0.5rem;
//   border-radius: 50px;
//   font-size: 0.75rem;
//   font-weight: 600;

//   @media (min-width: 768px) {
//     padding: 0.35rem 0.75rem;
//     font-size: 0.85rem;
//   }

//   &.paid {
//     background-color: rgba(40, 167, 69, 0.2);
//     color: #1e7e34;
//   }

//   &.pending {
//     background-color: rgba(255, 193, 7, 0.2);
//     color: #856404;
//   }
// `;

// const SalaryAmount = styled.span.attrs(({ $positive, $negative }) => ({
//   $positive: $positive ? "true" : undefined,
//   $negative: $negative ? "true" : undefined,
// }))`
//   font-weight: 600;
//   font-size: 14px;

//   @media (min-width: 768px) {
//     font-size: 16px;
//   }

//   color: ${(props) => {
//     if (props.$positive) return "#28a745";
//     if (props.$negative) return "#dc3545";
//     return "#6c757d";
//   }};
// `;

// const PaginationContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 1.5rem;
//   gap: 1rem;

//   @media (min-width: 576px) {
//     flex-direction: row;
//     justify-content: space-between;
//   }
// `;

// const PageInfo = styled.span`
//   color: #7f8c8d;
//   font-size: 0.85rem;

//   @media (min-width: 768px) {
//     font-size: 0.9rem;
//   }
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
//   padding: 0.375rem 0.5rem;
//   border-radius: 5px;
//   transition: all 0.2s;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   font-size: 14px;

//   @media (min-width: 768px) {
//     padding: 0.5rem 0.75rem;
//     font-size: 16px;
//   }

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

// const DeleteModalContent = styled.div`
//   text-align: center;
//   padding: 1rem;

//   @media (min-width: 768px) {
//     padding: 1.5rem;
//   }

//   .icon {
//     font-size: 2.5rem;
//     color: #dc3545;
//     margin-bottom: 0.75rem;

//     @media (min-width: 768px) {
//       font-size: 3rem;
//       margin-bottom: 1rem;
//     }
//   }

//   .message {
//     margin-bottom: 1rem;
//     font-size: 1rem;

//     @media (min-width: 768px) {
//       margin-bottom: 1.5rem;
//       font-size: 1.1rem;
//     }
//   }

//   .supervisor-name {
//     font-weight: 600;
//     color: #2c3e50;
//     margin: 0.5rem 0;
//     font-size: 1rem;

//     @media (min-width: 768px) {
//       font-size: 1.1rem;
//     }
//   }

//   .payment-date {
//     color: #6c757d;
//     margin-bottom: 1rem;
//     font-size: 0.9rem;

//     @media (min-width: 768px) {
//       margin-bottom: 1.5rem;
//       font-size: 1rem;
//     }
//   }
// `;

// const PaymentDetailsModal = styled(Modal)`
//   .modal-content {
//     border-radius: 10px;
//   }

//   .modal-header {
//     border-bottom: 1px solid #e9ecef;
//     padding: 1rem;

//     @media (min-width: 768px) {
//       padding: 1.5rem;
//     }
//   }

//   .modal-title {
//     font-weight: 600;
//     color: #2c3e50;
//     font-size: 1.25rem;

//     @media (min-width: 768px) {
//       font-size: 1.5rem;
//     }
//   }

//   .modal-body {
//     padding: 1rem;

//     @media (min-width: 768px) {
//       padding: 1.5rem;
//     }
//   }

//   .section-title {
//     font-weight: 600;
//     color: #2c3e50;
//     margin-bottom: 0.75rem;
//     font-size: 1rem;

//     @media (min-width: 768px) {
//       margin-bottom: 1rem;
//       font-size: 1.1rem;
//     }
//   }

//   .detail-item {
//     margin-bottom: 0.5rem;
//     display: flex;
//     justify-content: space-between;
//     font-size: 0.9rem;

//     @media (min-width: 768px) {
//       margin-bottom: 0.75rem;
//       font-size: 1rem;
//     }

//     strong {
//       color: #2c3e50;
//     }

//     span {
//       color: #6c757d;
//     }
//   }

//   .divider {
//     border-top: 1px solid #e9ecef;
//     margin: 1rem 0;

//     @media (min-width: 768px) {
//       margin: 1.5rem 0;
//     }
//   }

//   .summary-item {
//     font-weight: 600;
//     margin-bottom: 0.5rem;
//     display: flex;
//     justify-content: space-between;
//     font-size: 0.9rem;

//     @media (min-width: 768px) {
//       font-size: 1rem;
//     }
//   }

//   .advance {
//     color: #dc3545;
//   }
// `;

// const MobileActionsDropdown = styled(Dropdown)`
//   .dropdown-toggle {
//     background: transparent;
//     border: none;
//     color: #6c757d;
//     padding: 0.25rem;
//     font-size: 1rem;
    
//     &::after {
//       display: none;
//     }
    
//     &:focus {
//       box-shadow: none;
//     }
//   }
  
//   .dropdown-menu {
//     min-width: 120px;
//     border-radius: 8px;
//     box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//     border: 1px solid #e9ecef;
//     padding: 0.5rem 0;
//   }
  
//   .dropdown-item {
//     font-size: 0.9rem;
//     padding: 0.5rem 1rem;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
    
//     &:active {
//       background-color: #f8f9fa;
//       color: #212529;
//     }
//   }
// `;

// const PaymentList = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [paymentToDelete, setPaymentToDelete] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const paymentsPerPage = 10;
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const navigate = useNavigate();
//   const { token: contextToken } = useAuth();
//   const token = contextToken || localStorage.getItem("token");

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const fetchPayments = async () => {
//     setLoading(true);
//     const url =
//       "https://bulding-constraction-employee-management.onrender.com/api/yes/supervisors/salary";

//     const params = {};
//     if (startDate) params.start = dayjs(startDate).format("DD/MM/YYYY");
//     if (endDate) params.end = dayjs(endDate).format("DD/MM/YYYY");
//     if (statusFilter !== "all") params.status = statusFilter;

//     try {
//       const res = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//         params,
//       });

//       if (res.data.success && Array.isArray(res.data.data)) {
//         setPayments(res.data.data);
//         if (res.data.data.length === 0) {
//           toast.info("ℹ️ No payment records found.");
//         }
//       } else {
//         setPayments([]);
//         toast.warning("⚠️ No payment data available.");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       toast.error("❌ Failed to fetch payments.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewClick = (payment) => {
//     setSelectedPayment(payment);
//     setShowViewModal(true);
//   };

//   const handleDeleteClick = (payment) => {
//     setPaymentToDelete(payment);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!paymentToDelete) return;

//     try {
//       await axios.delete(
//         `https://bulding-constraction-employee-management.onrender.com/api/supervisors/salary/${paymentToDelete._id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.success("✅ Payment deleted successfully.");
//       fetchPayments();
//     } catch (err) {
//       console.error("Delete Error:", err);
//       toast.error("❌ Failed to delete payment.");
//     } finally {
//       setShowDeleteModal(false);
//       setPaymentToDelete(null);
//     }
//   };

//   useEffect(() => {
//     fetchPayments();
//   }, [statusFilter, startDate, endDate]);

//   const filteredPayments = payments.filter((payment) => {
//     return true; // Add any additional filtering logic here if needed
//   });

//   const indexOfLastPayment = currentPage * paymentsPerPage;
//   const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
//   const currentPayments = filteredPayments.slice(
//     indexOfFirstPayment,
//     indexOfLastPayment
//   );

//   const nextPage = () => {
//     if (currentPage < Math.ceil(filteredPayments.length / paymentsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const parseDate = (dateString) => {
//     if (!dateString) return null;
    
//     // Try parsing with different formats
//     const formats = [
//       "DD/MM/YYYY",
//       "MM/DD/YYYY",
//       "YYYY-MM-DD",
//       "DD-MM-YYYY",
//       "MM-DD-YYYY",
//       "YYYY/MM/DD"
//     ];
    
//     for (const format of formats) {
//       const parsedDate = dayjs(dateString, format, true);
//       if (parsedDate.isValid()) {
//         return parsedDate;
//       }
//     }
    
//     return null;
//   };

//   const formatDateForDisplay = (dateString) => {
//     const parsedDate = parseDate(dateString);
//     return parsedDate ? parsedDate.format("DD MMM YYYY") : "N/A";
//   };

//   return (
//     <Container>
//       {/* View Payment Details Modal */}
//       <PaymentDetailsModal
//         show={showViewModal}
//         onHide={() => setShowViewModal(false)}
//         centered
//         size="lg"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Salary Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedPayment && (
//             <>
//               <h4 className="mb-3">{selectedPayment.supervisorId?.name || "Unknown Supervisor"}</h4>
//               <p className="text-muted mb-4">Centering Supervisor</p>

//               <h5 className="section-title">Salary Information</h5>
//               <div className="detail-item">
//                 <strong>Period:</strong>
//                 <span>
//                   {formatDateForDisplay(selectedPayment.date)} -{" "}
//                   {formatDateForDisplay(selectedPayment.endDate)}
//                 </span>
//               </div>
//               <div className="detail-item">
//                 <strong>Status:</strong>
//                 <span>
//                   {selectedPayment.balanceAmount === 0 ? (
//                     <StatusBadge className="paid">Paid</StatusBadge>
//                   ) : (
//                     <StatusBadge className="pending">Pending</StatusBadge>
//                   )}
//                 </span>
//               </div>
//               <div className="detail-item">
//                 <strong>Working Days:</strong>
//                 <span>{selectedPayment.workingDays || "N/A"}</span>
//               </div>
//               <div className="detail-item">
//                 <strong>Half Days:</strong>
//                 <span>{selectedPayment.halfDays || "N/A"}</span>
//               </div>
//               <div className="detail-item">
//                 <strong>Overtime Days:</strong>
//                 <span>{selectedPayment.overtimeDays || "N/A"}</span>
//               </div>

//               <div className="divider"></div>

//               <h5 className="section-title">Payment Details</h5>
//               <div className="detail-item">
//                 <strong>Basic Salary:</strong>
//                 <span>₹{selectedPayment.basicSalary || "0"}</span>
//               </div>
//               <div className="detail-item">
//                 <strong>Allowances:</strong>
//                 <span>₹{selectedPayment.allowances || "0"}</span>
//               </div>
//               <div className="detail-item">
//                 <strong>Deductions:</strong>
//                 <span>₹{selectedPayment.deductions || "0"}</span>
//               </div>
//               <div className="detail-item">
//                 <strong>Advance:</strong>
//                 <span>₹{selectedPayment.advance || "0"}</span>
//               </div>

//               <div className="divider"></div>

//               <h5 className="section-title">Summary</h5>
//               <div className="summary-item">
//                 <span>Net Salary:</span>
//                 <span>₹{selectedPayment.netSalary || "0"}</span>
//               </div>
//               <div className="summary-item">
//                 <span>Paid Amount:</span>
//                 <span>₹{selectedPayment.paidAmount || "0"}</span>
//               </div>
//               <div className="summary-item">
//                 <span>Balance:</span>
//                 <span className={selectedPayment.balanceAmount < 0 ? "advance" : ""}>
//                   ₹{selectedPayment.balanceAmount || "0"} {selectedPayment.balanceAmount < 0 ? "(Advance)" : ""}
//                 </span>
//               </div>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowViewModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </PaymentDetailsModal>

//       {/* Delete Confirmation Modal */}
//       <Modal
//         show={showDeleteModal}
//         onHide={() => setShowDeleteModal(false)}
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Deletion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <DeleteModalContent>
//             <div className="icon">
//               <FaTrash />
//             </div>
//             <h5 className="message">
//               Are you sure you want to delete this payment record?
//             </h5>
//             {paymentToDelete && (
//               <>
//                 <p className="supervisor-name">
//                   {paymentToDelete.supervisorId?.name || "Unknown Supervisor"}
//                 </p>
//                 <p className="payment-date">
//                   {formatDateForDisplay(paymentToDelete.date)}
//                 </p>
//                 <p className="text-muted">
//                   This action cannot be undone and will permanently delete the
//                   payment record.
//                 </p>
//               </>
//             )}
//           </DeleteModalContent>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="outline-secondary"
//             onClick={() => setShowDeleteModal(false)}
//           >
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleDeleteConfirm}>
//             Delete Record
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Header>
//         <h2>Supervisor Payment Management</h2>
//         <p>View and manage supervisor payment records</p>
//       </Header>

//       <ActionBar>
//         <DateFilterContainer>
//           <FaCalendarAlt />
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => {
//               setStartDate(date);
//               setCurrentPage(1);
//             }}
//             selectsStart
//             startDate={startDate}
//             endDate={endDate}
//             dateFormat="dd/MM/yyyy"
//             className="form-control"
//             placeholderText="Start Date"
//           />
//           <span>to</span>
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => {
//               setEndDate(date);
//               setCurrentPage(1);
//             }}
//             selectsEnd
//             startDate={startDate}
//             endDate={endDate}
//             minDate={startDate}
//             dateFormat="dd/MM/yyyy"
//             className="form-control"
//             placeholderText="End Date"
//           />
//         </DateFilterContainer>

//         <ActionButtons>
//           <AddButton onClick={() => navigate("/engineer-dashboard/add-payment")}>
//             <FaPlus />
//             <span>Add Payment</span>
//           </AddButton>
//         </ActionButtons>
//       </ActionBar>

//       <FilterContainer>
//         <FilterButton
//           className={statusFilter === "all" ? "active" : ""}
//           onClick={() => setStatusFilter("all")}
//         >
//           All
//         </FilterButton>
//         <FilterButton
//           className={statusFilter === "Paid" ? "active" : ""}
//           onClick={() => setStatusFilter("Paid")}
//         >
//           Paid
//         </FilterButton>
//         <FilterButton
//           className={statusFilter === "Pending" ? "active" : ""}
//           onClick={() => setStatusFilter("Pending")}
//         >
//           Pending
//         </FilterButton>
//       </FilterContainer>

//       <div className="table-responsive">
//         <StyledTable>
//           <thead>
//             <tr>
//               {!isMobile && <th>S.No</th>}
//               <th>Supervisor</th>
//               {!isMobile && <th>Date</th>}
//               <th>Amount</th>
//               {!isMobile && <th>Balance</th>}
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={isMobile ? 4 : 7} className="text-center py-4">
//                   <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                 </td>
//               </tr>
//             ) : currentPayments.length > 0 ? (
//               currentPayments.map((payment, index) => (
//                 <tr key={payment._id}>
//                   {!isMobile && (
//                     <td>
//                       <span className="fw-bold">
//                         {(currentPage - 1) * paymentsPerPage + index + 1}
//                       </span>
//                     </td>
//                   )}
//                   <td>
//                     {payment.supervisorId?.name || "Unknown Supervisor"}
//                     {isMobile && (
//                       <div className="text-muted small">
//                         {formatDateForDisplay(payment.date)}
//                       </div>
//                     )}
//                   </td>
//                   {!isMobile && (
//                     <td>{formatDateForDisplay(payment.date)}</td>
//                   )}
//                   <td>
//                     <SalaryAmount $positive={payment.paidAmount > 0}>
//                       ₹{payment.paidAmount || "-"}
//                     </SalaryAmount>
//                     {isMobile && payment.balanceAmount !== 0 && (
//                       <div className="small text-muted">
//                         Balance: ₹{payment.balanceAmount || "0"}
//                       </div>
//                     )}
//                   </td>
//                   {!isMobile && (
//                     <td>
//                       <SalaryAmount
//                         $positive={payment.balanceAmount > 0}
//                         $negative={payment.balanceAmount < 0}
//                       >
//                         ₹{payment.balanceAmount || "-"}
//                       </SalaryAmount>
//                     </td>
//                   )}
//                   <td>
//                     {payment.balanceAmount === 0 ? (
//                       <StatusBadge className="paid">Paid</StatusBadge>
//                     ) : (
//                       <StatusBadge className="pending">Pending</StatusBadge>
//                     )}
//                   </td>
//                   <td>
//                     {isMobile ? (
//                       <MobileActionsDropdown>
//                         <Dropdown.Toggle variant="link" id="dropdown-actions">
//                           <FaEllipsisV />
//                         </Dropdown.Toggle>
//                         <Dropdown.Menu>
//                           <Dropdown.Item onClick={() => handleViewClick(payment)}>
//                             <FaEye /> View
//                           </Dropdown.Item>
//                           <Dropdown.Item 
//                             onClick={() => navigate(`/engineer-dashboard/edit-payment/${payment._id}`)}
//                           >
//                             <FaEdit /> Edit
//                           </Dropdown.Item>
//                           <Dropdown.Item onClick={() => handleDeleteClick(payment)}>
//                             <FaTrash /> Delete
//                           </Dropdown.Item>
//                         </Dropdown.Menu>
//                       </MobileActionsDropdown>
//                     ) : (
//                       <div className="d-flex justify-content-center gap-2">
//                         <button
//                           className="btn btn-sm btn-outline-info"
//                           onClick={() => handleViewClick(payment)}
//                           title="View"
//                         >
//                           <FaEye />
//                         </button>
//                         <button
//                           className="btn btn-sm btn-outline-primary"
//                           onClick={() =>
//                             navigate(
//                               `/engineer-dashboard/edit-payment/${payment._id}`
//                             )
//                           }
//                           title="Edit"
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           className="btn btn-sm btn-outline-danger"
//                           onClick={() => handleDeleteClick(payment)}
//                           title="Delete"
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={isMobile ? 4 : 7} className="text-center py-4">
//                   No payment records found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </StyledTable>
//       </div>

//       <PaginationContainer>
//         <PageInfo>
//           Showing {indexOfFirstPayment + 1} to{" "}
//           {Math.min(indexOfLastPayment, filteredPayments.length)} of{" "}
//           {filteredPayments.length} records
//         </PageInfo>
//         <PaginationButtons>
//           <PageButton onClick={prevPage} disabled={currentPage === 1}>
//             <FaChevronLeft size={14} />
//             {!isMobile && <span>Previous</span>}
//           </PageButton>
//           {!isMobile && (
//             <span className="mx-2">
//               Page {currentPage} of{" "}
//               {Math.ceil(filteredPayments.length / paymentsPerPage)}
//             </span>
//           )}
//           <PageButton
//             onClick={nextPage}
//             disabled={
//               currentPage >= Math.ceil(filteredPayments.length / paymentsPerPage)
//             }
//           >
//             {!isMobile && <span>Next</span>}
//             <FaChevronRight size={14} />
//           </PageButton>
//         </PaginationButtons>
//       </PaginationContainer>
//     </Container>
//   );
// };

// export default PaymentList;