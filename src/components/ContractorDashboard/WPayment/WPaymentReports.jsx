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
// import { FaFileExcel, FaFilePdf, FaSearch } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { useAuth } from "../../../context/authContext";
// import dayjs from "dayjs";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const WPaymentReport = () => {
//   const [payments, setPayments] = useState([]);
//   const [filteredPayments, setFilteredPayments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [search, setSearch] = useState("");
//   const { user, token: contextToken } = useAuth();
//   const token = contextToken || localStorage.getItem("token");

//   // ✅ Fetch worker payments for logged-in contractor with API filter
//   const fetchPayments = async () => {
//     if (!user?._id) {
//       toast.warning("⚠️ User not found. Please login again.");
//       return;
//     }

//     setLoading(true);
//     const url =
//       "https://bulding-constraction-employee-management.onrender.com/api/yes/workers/salaries/report";

//     // Build query params for server-side filtering
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
//         // ✅ Keep only this contractor's payments
//         const filteredByContractor = res.data.data.filter(
//           (item) => item.contractorId?.userId === user?._id
//         );

//         setPayments(filteredByContractor);
//         if (filteredByContractor.length === 0)
//           toast.info("ℹ️ No payment records found for your workers.");
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

//   // Fetch on page load & when user changes
//   useEffect(() => {
//     if (user?._id) fetchPayments();
//   }, [user]);

//   // Apply frontend search filter
//   useEffect(() => {
//     let data = [...payments];

//     // 🔍 Search by worker name
//     if (search) {
//       data = data.filter((item) =>
//         item.workerId?.name?.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     setFilteredPayments(data);
//   }, [search, payments]);

//   // 📤 Export to Excel
//   const exportExcel = () => {
//     if (!filteredPayments.length) return toast.warning("No data to export.");
//     const data = filteredPayments.map((p, i) => ({
//       SNo: i + 1,
//       WorkerName: p.workerId?.name || "-",
//       WorkerRole: p.workerId?.workerRole || "-",
//       WorkerSubRole: p.workerId?.workerSubRole || "-",
//       Date: p.date || "-",
//       Paid: p.paidAmount || 0,
//       Balance: p.balanceAmount || 0,
//       Status: p.balanceAmount === 0 ? "Paid" : "Pending",
//     }));
//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Worker Payments");
//     XLSX.writeFile(wb, "worker-payment-report.xlsx");
//     toast.success("✅ Excel downloaded.");
//   };

//   // 📄 Export to PDF
//   const exportPDF = () => {
//     if (!filteredPayments.length) return toast.warning("No data to export.");

//     const doc = new jsPDF("p", "pt", "a4");
//     doc.setFontSize(18);
//     doc.text("💰 Worker Payment Report", 40, 40);

//     const tableData = filteredPayments.map((p, i) => [
//       i + 1,
//       p.workerId?.name || "-",
//       p.workerId?.workerRole || "-",
//       p.workerId?.workerSubRole || "-",
//       p.date || "-",
//       p.paidAmount ?? 0,
//       p.balanceAmount ?? 0,
//       p.balanceAmount === 0 ? "Paid" : "Pending",
//     ]);

//     autoTable(doc, {
//       startY: 60,
//       head: [["S.No", "Worker Name", "Role", "Sub Role", "Date", "Paid", "Balance", "Status"]],
//       body: tableData,
//       styles: { halign: "center" },
//       headStyles: { fillColor: [52, 58, 64], textColor: 255 },
//     });

//     doc.save("worker-payment-report.pdf");
//     toast.success("✅ PDF downloaded.");
//   };

//   return (
//     <div className="container py-4">
//       <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
//         <h3 className="fw-bold mb-0">💰 Worker Payment Report</h3>
//         <Button
//           variant="primary"
//           onClick={fetchPayments}
//           disabled={!startDate}
//         >
//           <FaSearch className="me-2" /> Filter
//         </Button>
//       </div>

//       {/* Filters */}
//       <Form className="mb-4">
//         <Row className="g-3 align-items-end">
//           <Col xs={12} sm={6} md={3}>
//             <Form.Label>Start Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               max={new Date().toISOString().split("T")[0]}
//             />
//           </Col>
//           <Col xs={12} sm={6} md={3}>
//             <Form.Label>End Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               min={startDate}
//               max={new Date().toISOString().split("T")[0]}
//             />
//           </Col>
//           <Col xs={12} sm={6} md={3}>
//             <Form.Label>Search by Worker Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Worker name"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </Col>
//         </Row>
//       </Form>

//       {/* Export Buttons */}
//       <div className="mb-3 d-flex flex-wrap gap-2">
//         <Button variant="success" onClick={exportExcel}>
//           <FaFileExcel className="me-2" /> Export Excel
//         </Button>
//         <Button variant="danger" onClick={exportPDF}>
//           <FaFilePdf className="me-2" /> Export PDF
//         </Button>
//       </div>

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
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPayments.length > 0 ? (
//                 filteredPayments.map((item, idx) => (
//                   <tr key={item._id}>
//                     <td>{idx + 1}</td>
//                     <td>{item.workerId?.name || "-"}</td>
//                     <td>{item.workerId?.workerRole || "-"}</td>
//                     <td>{item.workerId?.workerSubRole || "-"}</td>
//                     <td>
//                       {item.date
//                         ? dayjs(item.date, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("DD/MM/YYYY")
//                         : "-"}
//                     </td>
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
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="text-muted">
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

// export default WPaymentReport;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/authContext";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  FaFileExcel,
  FaFilePdf,
  FaCalendarAlt,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaEllipsisV,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";

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

const ExportButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const ExportButton = styled.button`
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

  &.excel {
    background: linear-gradient(135deg, #28a745, #218838);
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
    }
  }

  &.pdf {
    background: linear-gradient(135deg, #dc3545, #c82333);
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
    }
  }
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
  overflow-x: auto;

  @media (min-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: #2c3e50;
    color: white;

    th {
      padding: 0.75rem;
      text-align: left;
      font-weight: 600;
      font-size: 14px;

      @media (min-width: 768px) {
        padding: 1rem;
        font-size: 16px;
      }
    }
  }

  td {
    padding: 0.75rem;
    border-bottom: 1px solid #eee;
    vertical-align: middle;
    font-size: 14px;

    @media (min-width: 768px) {
      padding: 1rem;
      font-size: 16px;
    }
  }

  tr:hover {
    background-color: #f8f9fa;
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

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-size: 0.9rem;

  @media (min-width: 768px) {
    padding: 3rem;
    font-size: 1rem;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
`;

const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 0.35rem solid rgba(52, 152, 219, 0.2);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
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

// ======================
// Main Component
// ======================

const WPaymentReport = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 10;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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
      "https://bulding-constraction-employee-management.onrender.com/api/yes/workers/salaries/report";

    const params = {};
    if (startDate && !endDate) {
      params.date = dayjs(startDate).format("DD/MM/YYYY");
    } else if (startDate && endDate) {
      params.start = dayjs(startDate).format("DD/MM/YYYY");
      params.end = dayjs(endDate).format("DD/MM/YYYY");
    }

    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      if (res.data.success && Array.isArray(res.data.data)) {
        const filteredByContractor = res.data.data.filter(
          (item) => item.contractorId?.userId === user?._id
        );
        setPayments(filteredByContractor);
        if (filteredByContractor.length === 0) {
          toast.info("ℹ️ No payment records found for your workers.");
        }
      } else {
        setPayments([]);
        toast.warning("⚠️ No payment data available.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("❌ Failed to fetch payments.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter((item) =>
    item.workerId?.name?.toLowerCase().includes(search.toLowerCase())
  );

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

  const exportExcel = () => {
    if (!filteredPayments.length) {
      toast.warning("No data to export.");
      return;
    }

    const data = filteredPayments.map((p, i) => ({
      SNo: i + 1,
      WorkerName: p.workerId?.name || "-",
      WorkerRole: p.workerId?.workerRole || "-",
      WorkerSubRole: p.workerId?.workerSubRole || "-",
      Date: p.date || "-",
      Paid: p.paidAmount || 0,
      Balance: p.balanceAmount || 0,
      Status: p.balanceAmount === 0 ? "Paid" : "Pending",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Worker Payments");
    XLSX.writeFile(wb, "worker-payment-report.xlsx");
    toast.success("✅ Excel downloaded.");
  };

  const exportPDF = () => {
    if (!filteredPayments.length) {
      toast.warning("No data to export.");
      return;
    }

    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "A4" });
    doc.setFontSize(16);
    doc.text("Worker Payment Report", 40, 40);

    const tableData = filteredPayments.map((p, i) => [
      i + 1,
      p.workerId?.name || "-",
      p.workerId?.workerRole || "-",
      p.workerId?.workerSubRole || "-",
      p.date || "-",
      p.paidAmount ?? 0,
      p.balanceAmount ?? 0,
      p.balanceAmount === 0 ? "Paid" : "Pending",
    ]);

    autoTable(doc, {
      startY: 60,
      head: [["S.No", "Worker Name", "Role", "Sub Role", "Date", "Paid", "Balance", "Status"]],
      body: tableData,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [40, 40, 40] },
      margin: { top: 60 },
    });

    doc.save("worker-payment-report.pdf");
    toast.success("✅ PDF downloaded.");
  };

  useEffect(() => {
    if (user?._id) {
      fetchPayments();
    }
  }, [user, startDate, endDate]);

  return (
    <Container>
      <Header>
        <h2>Worker Payment Reports</h2>
        <p>View and export worker payment records</p>
      </Header>

      <ActionBar>
        <SearchBox>
          <FaSearch />
          <input
            type="text"
            placeholder="Search workers..."
            className="form-control"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </SearchBox>

        <DateFilterContainer>
          <FaCalendarAlt />
          <DatePicker
            selected={dayjs(startDate).toDate()}
            onChange={(date) => {
              setStartDate(dayjs(date).format("YYYY-MM-DD"));
              setCurrentPage(1);
            }}
            selectsStart
            startDate={dayjs(startDate).toDate()}
            endDate={dayjs(endDate).toDate()}
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="Start date"
          />
        </DateFilterContainer>

        <DateFilterContainer>
          <FaCalendarAlt />
          <DatePicker
            selected={dayjs(endDate).toDate()}
            onChange={(date) => {
              setEndDate(dayjs(date).format("YYYY-MM-DD"));
              setCurrentPage(1);
            }}
            selectsEnd
            startDate={dayjs(startDate).toDate()}
            endDate={dayjs(endDate).toDate()}
            minDate={dayjs(startDate).toDate()}
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="End date"
          />
        </DateFilterContainer>

        <ExportButtons>
          <ExportButton className="excel" onClick={exportExcel}>
            <FaFileExcel /> {!isMobile && "Excel"}
          </ExportButton>
          <ExportButton className="pdf" onClick={exportPDF}>
            <FaFilePdf /> {!isMobile && "PDF"}
          </ExportButton>
        </ExportButtons>
      </ActionBar>

      <TableContainer>
        {loading ? (
          <SpinnerContainer>
            <Spinner />
            <div>Loading payment data...</div>
          </SpinnerContainer>
        ) : currentPayments.length > 0 ? (
          <Table>
            <thead>
              <tr>
                {!isMobile && <th>S.No</th>}
                <th>Worker Name</th>
                {!isMobile && <th>Role</th>}
                {!isMobile && <th>Sub Role</th>}
                {!isMobile && <th>Date</th>}
                <th>Paid</th>
                {!isMobile && <th>Balance</th>}
                <th>Status</th>
                {isMobile && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentPayments.map((item, idx) => (
                <tr key={item._id}>
                  {!isMobile && <td>{indexOfFirstPayment + idx + 1}</td>}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        backgroundColor: "#f0f3f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <FaUser color="#adb5bd" />
                      </div>
                      {item.workerId?.name || "-"}
                    </div>
                  </td>
                  {!isMobile && <td>{item.workerId?.workerRole || "-"}</td>}
                  {!isMobile && <td>{item.workerId?.workerSubRole || "-"}</td>}
                  {!isMobile && (
                    <td>
                      {item.date
                        ? dayjs(item.date, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("DD/MM/YYYY")
                        : "-"}
                    </td>
                  )}
                  <td>{item.paidAmount ?? "-"}</td>
                  {!isMobile && <td>{item.balanceAmount ?? "-"}</td>}
                  <td>
                    <StatusBadge className={item.balanceAmount === 0 ? "paid" : "pending"}>
                      {item.balanceAmount === 0 ? "Paid" : "Pending"}
                    </StatusBadge>
                  </td>
                  {isMobile && (
                    <td>
                      <MobileActionsDropdown>
                        <Dropdown.Toggle variant="link" id="dropdown-actions">
                          <FaEllipsisV />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            Role: {item.workerId?.workerRole || "-"}
                          </Dropdown.Item>
                          <Dropdown.Item>
                            Sub Role: {item.workerId?.workerSubRole || "-"}
                          </Dropdown.Item>
                          <Dropdown.Item>
                            Date: {item.date ? dayjs(item.date, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("DD/MM/YYYY") : "-"}
                          </Dropdown.Item>
                          <Dropdown.Item>
                            Balance: {item.balanceAmount ?? "-"}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </MobileActionsDropdown>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState>
            {search
              ? "No matching workers found"
              : "No payment records found for selected date range"}
          </EmptyState>
        )}
      </TableContainer>

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
                currentPage >= Math.ceil(filteredPayments.length / paymentsPerPage)
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

export default WPaymentReport;