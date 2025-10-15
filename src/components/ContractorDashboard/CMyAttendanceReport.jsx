// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Spinner, Form, Row, Col, Button } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { useAuth } from "../../context/authContext";
// import dayjs from "dayjs";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { FaFileExcel, FaFilePdf } from "react-icons/fa";

// const CMyReports = () => {
//   const [attendanceReports, setAttendanceReports] = useState([]);
//   const [salaryReports, setSalaryReports] = useState([]);
//   const [filteredAttendance, setFilteredAttendance] = useState([]);
//   const [filteredSalary, setFilteredSalary] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const { user, token: contextToken } = useAuth();
//   const token = contextToken || localStorage.getItem("token");

//   const ATTENDANCE_API =
//     "https://bulding-constraction-employee-management.onrender.com/api/contractors/Attendance/reports";
//   const SALARY_API =
//     "https://bulding-constraction-employee-management.onrender.com/api/yes/contractors/salaries/reports";

//   const fetchReports = async () => {
//     if (!user?._id) {
//       toast.warning("⚠️ User not found. Please login again.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const [attRes, salRes] = await Promise.all([
//         axios.get(ATTENDANCE_API, {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//         axios.get(SALARY_API, {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//       ]);

//       // Attendance filter
//       if (attRes.data.success && Array.isArray(attRes.data.data)) {
//         const filteredAttendanceData = attRes.data.data.filter(
//           (item) => item?.userId === user?._id
//         );
//         setAttendanceReports(filteredAttendanceData);
//       } else {
//         setAttendanceReports([]);
//       }

//       // Salary filter
//       if (salRes.data.success && Array.isArray(salRes.data.data)) {
//         const filteredSalaryData = salRes.data.data.filter(
//           (item) => item.contractorId?.contractorRole === user?.roleType
//         );
//         setSalaryReports(filteredSalaryData);
//       } else {
//         setSalaryReports([]);
//       }
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       toast.error("❌ Failed to fetch reports.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user?._id) fetchReports();
//   }, [user]);

//   // Filter by date
//   useEffect(() => {
//     const filterByDate = (data, dateExtractor) => {
//       return data.filter((item) => {
//         const dateValue = dateExtractor(item);
//         if (!dateValue) return false;
//         const recordDate = dayjs(dateValue, ["DD/MM/YYYY", "YYYY-MM-DD"]);
//         const startValid = startDate
//           ? recordDate.isSameOrAfter(dayjs(startDate))
//           : true;
//         const endValid = endDate
//           ? recordDate.isSameOrBefore(dayjs(endDate))
//           : true;
//         return recordDate.isValid() && startValid && endValid;
//       });
//     };

//     // Flatten attendance
//     const flattenedAttendance = [];
//     attendanceReports.forEach((report) => {
//       if (Array.isArray(report.allRecords)) {
//         report.allRecords.forEach((rec) => {
//           flattenedAttendance.push({
//             date: rec?.currentAttendance?.date,
//             status: rec?.currentAttendance?.status,
//           });
//         });
//       }
//     });

//     setFilteredAttendance(
//       filterByDate(flattenedAttendance, (item) => item.date)
//     );
//     setFilteredSalary(filterByDate(salaryReports, (item) => item.date));
//   }, [startDate, endDate, attendanceReports, salaryReports]);

//   // Export Excel
//   const exportExcel = (data, fileName) => {
//     if (!data.length) return toast.warning("No data to export.");
//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, fileName);
//     XLSX.writeFile(wb, `${fileName}.xlsx`);
//     toast.success("✅ Excel downloaded.");
//   };

//   // Export PDF
//   const exportPDF = (data, headers, fileName, title) => {
//     if (!data.length) return toast.warning("No data to export.");
//     const doc = new jsPDF("p", "pt", "a4");
//     doc.setFontSize(18);
//     doc.text(title, 40, 40);
//     autoTable(doc, {
//       startY: 60,
//       head: [headers],
//       body: data,
//       styles: { halign: "center" },
//       headStyles: { fillColor: [52, 58, 64], textColor: 255 },
//     });
//     doc.save(`${fileName}.pdf`);
//     toast.success("✅ PDF downloaded.");
//   };

//   return (
//     <div className="container py-4">
//       <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
//         <h3 className="fw-bold mb-0">📊 My Reports</h3>
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
//             />
//           </Col>
//           <Col xs={12} sm={6} md={3}>
//             <Form.Label>End Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               min={startDate}
//             />
//           </Col>
//         </Row>
//       </Form>

//       {loading ? (
//         <div className="text-center py-5">
//           <Spinner animation="border" />
//         </div>
//       ) : (
//         <>
//           {/* Attendance Reports */}
//           <div className="mb-5">
//             <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
//               <h5 className="fw-bold">🕒 Attendance Reports</h5>
//               <div className="d-flex gap-2">
//                 <Button
//                   variant="success"
//                   onClick={() =>
//                     exportExcel(filteredAttendance, "attendance-reports")
//                   }
//                 >
//                   <FaFileExcel className="me-2" /> Export Excel
//                 </Button>
//                 <Button
//                   variant="danger"
//                   onClick={() =>
//                     exportPDF(
//                       filteredAttendance.map((p, i) => [
//                         i + 1,
//                         p.date ? dayjs(p.date).format("DD/MM/YYYY") : "-",
//                         p.status || "-",
//                       ]),
//                       ["S.No", "Date", "Status"],
//                       "attendance-reports",
//                       "🕒 Attendance Reports"
//                     )
//                   }
//                 >
//                   <FaFilePdf className="me-2" /> Export PDF
//                 </Button>
//               </div>
//             </div>

//             <div className="table-responsive">
//               <Table bordered hover responsive className="align-middle text-center">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>S.No</th>
//                     <th>Date</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredAttendance.length > 0 ? (
//                     filteredAttendance.map((rec, idx) => (
//                       <tr key={idx}>
//                         <td>{idx + 1}</td>
//                         <td>
//                           {rec.date
//                             ? dayjs(rec.date).format("DD/MM/YYYY")
//                             : "-"}
//                         </td>
//                         <td>
//                           <span
//                             className={`badge ${
//                               rec.status?.toLowerCase() === "present" ||
//                               rec.status?.toLowerCase() === "fullday"
//                                 ? "bg-success"
//                                 : rec.status?.toLowerCase() === "absent"
//                                 ? "bg-danger"
//                                 : rec.status?.toLowerCase() === "overtime"
//                                 ? "bg-primary"
//                                 : "bg-warning text-dark"
//                             }`}
//                           >
//                             {rec.status || "-"}
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="3" className="text-muted">
//                         No attendance reports found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           </div>

//           {/* Salary Reports */}
//           <div>
//             <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
//               <h5 className="fw-bold">💵 Salary Reports</h5>
//               <div className="d-flex gap-2">
//                 <Button
//                   variant="success"
//                   onClick={() => exportExcel(filteredSalary, "salary-reports")}
//                 >
//                   <FaFileExcel className="me-2" /> Export Excel
//                 </Button>
//                 <Button
//                   variant="danger"
//                   onClick={() =>
//                     exportPDF(
//                       filteredSalary.map((p, i) => [
//                         i + 1,
//                         p.date
//                           ? dayjs(p.date, ["DD/MM/YYYY", "YYYY-MM-DD"]).format(
//                               "DD/MM/YYYY"
//                             )
//                           : "-",
//                         p.paidAmount ?? 0,
//                         p.balanceAmount ?? 0,
//                         p.status ||
//                           (p.balanceAmount === 0 ? "Paid" : "Pending"),
//                       ]),
//                       ["S.No", "Date", "Paid", "Balance", "Status"],
//                       "salary-reports",
//                       "💵 Salary Reports"
//                     )
//                   }
//                 >
//                   <FaFilePdf className="me-2" /> Export PDF
//                 </Button>
//               </div>
//             </div>

//             <div className="table-responsive">
//               <Table bordered hover responsive className="align-middle text-center">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>S.No</th>
//                     <th>Date</th>
//                     <th>Paid</th>
//                     <th>Balance</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredSalary.length > 0 ? (
//                     filteredSalary.map((item, idx) => (
//                       <tr key={idx}>
//                         <td>{idx + 1}</td>
//                         <td>
//                           {item.date
//                             ? dayjs(item.date, ["DD/MM/YYYY", "YYYY-MM-DD"]).format(
//                                 "DD/MM/YYYY"
//                               )
//                             : "-"}
//                         </td>
//                         <td>₹{item.paidAmount ?? "-"}</td>
//                         <td>₹{item.balanceAmount ?? "-"}</td>
//                         <td>
//                           <span
//                             className={`badge px-3 py-2 ${
//                               (item.status ||
//                                 (item.balanceAmount === 0
//                                   ? "Paid"
//                                   : "Pending")) === "Paid"
//                                 ? "bg-success"
//                                 : "bg-warning text-dark"
//                             }`}
//                             style={{ borderRadius: "8px" }}
//                           >
//                             {item.status ||
//                               (item.balanceAmount === 0 ? "Paid" : "Pending")}
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5" className="text-muted">
//                         No salary reports found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CMyReports;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import styled from "styled-components";
import {
  FaCalendarAlt,
  FaSearch,
  FaFileExcel,
  FaFilePdf,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

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

const DatePickerInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  border: 1px solid #dfe6e9;
  height: 40px;
  font-size: 14px;

  @media (min-width: 768px) {
    height: 45px;
    font-size: 16px;
  }

  &:hover {
    border-color: #3498db;
  }

  input {
    border: none;
    outline: none;
    width: 90px;
    cursor: pointer;

    @media (min-width: 768px) {
      width: 110px;
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
  }

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

  &.present {
    background-color: rgba(40, 167, 69, 0.2);
    color: #1e7e34;
  }

  &.fullday {
    background-color: rgba(40, 167, 69, 0.2);
    color: #1e7e34;
  }

  &.absent {
    background-color: rgba(220, 53, 69, 0.2);
    color: #c82333;
  }

  &.overtime {
    background-color: rgba(23, 162, 184, 0.2);
    color: #0c5460;
  }

  &.halfday {
    background-color: rgba(255, 193, 7, 0.2);
    color: #856404;
  }

  &.null {
    background-color: rgba(108, 117, 125, 0.2);
    color: #495057;
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
  border: 1px solid #dfe6e9";
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

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #3498db;
  font-size: 1.5rem;
`;

const ClearDateButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #dfe6e9;
  border-radius: 50px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    background: #e9ecef;
    border-color: #ced4da;
  }

  @media (min-width: 768px) {
    padding: 0.375rem 1rem;
    font-size: 0.9rem;
  }
`;

const AttendanceReports = () => {
  const [attendanceReports, setAttendanceReports] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const reportsPerPage = 10;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { user, token: contextToken } = useAuth();
  const token = contextToken || localStorage.getItem("token");

  const ATTENDANCE_API =
    "https://bulding-constraction-employee-management.onrender.com/api/contractors/Attendance/reports";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchAttendanceReports = async () => {
    if (!user?._id) {
      toast.warning("⚠️ User not found. Please login again.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(ATTENDANCE_API, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success && Array.isArray(response.data.data)) {
        const filteredData = response.data.data.filter(
          (item) => item?.userId === user?._id
        );
        setAttendanceReports(filteredData);
      } else {
        setAttendanceReports([]);
      }
    } catch (err) {
      console.error("Attendance Fetch Error:", err);
      toast.error("❌ Failed to fetch attendance reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchAttendanceReports();
  }, [user]);

  useEffect(() => {
    const filterByDate = (data) => {
      const flattened = [];
      data.forEach((report) => {
        if (Array.isArray(report.allRecords)) {
          report.allRecords.forEach((rec) => {
            flattened.push({
              date: rec?.currentAttendance?.date,
              status: rec?.currentAttendance?.status,
            });
          });
        }
      });

      return flattened.filter((item) => {
        const recordDate = dayjs(item.date, ["DD/MM/YYYY", "YYYY-MM-DD"]);
        const startValid = startDate
          ? recordDate.isSameOrAfter(dayjs(startDate), "day")
          : true;
        const endValid = endDate
          ? recordDate.isSameOrBefore(dayjs(endDate), "day")
          : true;
        return recordDate.isValid() && startValid && endValid;
      });
    };

    setFilteredAttendance(filterByDate(attendanceReports));
    setCurrentPage(1); // Reset to first page when filters change
  }, [startDate, endDate, attendanceReports]);

  // Pagination logic
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredAttendance
    .filter(rec => 
      rec.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rec.date && dayjs(rec.date).format("DD/MM/YYYY").toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .slice(indexOfFirstReport, indexOfLastReport);

  const totalPages = Math.ceil(filteredAttendance.length / reportsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const exportExcel = () => {
    if (!filteredAttendance.length) {
      toast.warning("No data to export.");
      return;
    }

    const formatted = filteredAttendance.map((rec) => ({
      Date: rec.date ? dayjs(rec.date).format("DD/MM/YYYY") : "-",
      Status: rec.status || "-",
    }));

    const ws = XLSX.utils.json_to_sheet(formatted);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance Reports");
    XLSX.writeFile(wb, "attendance-reports.xlsx");
    toast.success("Excel downloaded.");
  };

  const exportPDF = () => {
    if (!filteredAttendance.length) {
      toast.warning("No data to export.");
      return;
    }

    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "A4" });
    doc.setFontSize(16);
    doc.text("Attendance Reports", 40, 40);

    const tableData = filteredAttendance.map((rec, i) => [
      i + 1,
      rec.date ? dayjs(rec.date).format("DD/MM/YYYY") : "-",
      rec.status || "-",
    ]);

    autoTable(doc, {
      startY: 60,
      head: [["S.No", "Date", "Status"]],
      body: tableData,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [40, 40, 40] },
      margin: { top: 60 },
    });

    doc.save("attendance-reports.pdf");
    toast.success("PDF downloaded.");
  };

  const getStatusBadge = (status) => {
    if (!status) return <StatusBadge className="null">Not Marked</StatusBadge>;

    const statusLower = status.toLowerCase();
    let className = "null";

    if (statusLower === "present" || statusLower === "fullday") {
      className = "fullday";
    } else if (statusLower === "absent") {
      className = "absent";
    } else if (statusLower === "overtime") {
      className = "overtime";
    } else if (statusLower === "halfday") {
      className = "halfday";
    }

    return <StatusBadge className={className}>{status}</StatusBadge>;
  };

  const clearDateFilters = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <Container>
      <Header>
        <h2>Attendance Reports</h2>
        <p>View and export your attendance records</p>
      </Header>

      <ActionBar>
        <SearchBox>
          <FaSearch />
          <input
            type="text"
            placeholder="Search by status or date..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </SearchBox>

        <DateFilterContainer>
          <DatePickerInput>
            <FaCalendarAlt />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              dateFormat="dd/MM/yyyy"
              maxDate={endDate || new Date()}
              isClearable
              className="form-control"
            />
          </DatePickerInput>

          <span>to</span>

          <DatePickerInput>
            <FaCalendarAlt />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              dateFormat="dd/MM/yyyy"
              maxDate={new Date()}
              isClearable
              className="form-control"
            />
          </DatePickerInput>

          {(startDate || endDate) && (
            <ClearDateButton onClick={clearDateFilters}>
              Clear
            </ClearDateButton>
          )}
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
          <LoadingSpinner>
            <FaSpinner className="fa-spin" />
          </LoadingSpinner>
        ) : currentReports.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((rec, i) => (
                <tr key={`${i}-${rec.date}`}>
                  <td>{indexOfFirstReport + i + 1}</td>
                  <td>
                    {rec.date
                      ? dayjs(rec.date).format("DD/MM/YYYY")
                      : "-"}
                  </td>
                  <td>{getStatusBadge(rec.status)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState>
            {searchTerm || startDate || endDate
              ? "No matching records found for your filters"
              : "No attendance records found"}
          </EmptyState>
        )}
      </TableContainer>

      {filteredAttendance.length > 0 && (
        <PaginationContainer>
          <PageInfo>
            Showing {indexOfFirstReport + 1} to{" "}
            {Math.min(indexOfLastReport, filteredAttendance.length)} of{" "}
            {filteredAttendance.length} records
          </PageInfo>
          <PaginationButtons>
            <PageButton onClick={prevPage} disabled={currentPage === 1}>
              <FaChevronLeft size={14} />
              {!isMobile && <span>Previous</span>}
            </PageButton>
            {!isMobile && (
              <span className="mx-2">
                Page {currentPage} of {totalPages}
              </span>
            )}
            <PageButton
              onClick={nextPage}
              disabled={currentPage >= totalPages}
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

export default AttendanceReports;