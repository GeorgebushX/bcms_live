// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
// import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// dayjs.extend(customParseFormat);
// dayjs.extend(isSameOrAfter);
// dayjs.extend(isSameOrBefore);

// const getToday = () => new Date().toISOString().split("T")[0];

// const Reports = () => {
//   const [reports, setReports] = useState([]);
//   const [start, setStart] = useState(getToday());
//   const [end, setEnd] = useState(getToday());
//   const [searchName, setSearchName] = useState("");

//   useEffect(() => {
//     fetchReports();
//   }, [start, end]);

//   const fetchReports = async () => {
//     const url =
//       "https://bulding-constraction-employee-management.onrender.com/api/supervisors/Attendance/reports";
//     const params = new URLSearchParams();
//     if (start) params.append("startDate", start);
//     if (end) params.append("endDate", end);

//     try {
//       const res = await axios.get(`${url}?${params.toString()}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (res.data.success && Array.isArray(res.data.data)) {
//         const allRecords = res.data.data.flatMap((item) =>
//           (item.rangeRecords || []).map((record) => {
//             const parsedDate = dayjs(record.date);
//             return {
//               name: item.name || "Unknown",
//               date: parsedDate.isValid() ? parsedDate.format("YYYY-MM-DD") : null,
//               status: record.status,
//             };
//           })
//         );
//         setReports(allRecords.filter((r) => r.date !== null));
//       } else {
//         setReports([]);
//         toast.warning("⚠️ No records found.");
//       }
//     } catch (err) {
//       console.error("❌ Error fetching reports:", err);
//       toast.error("❌ Failed to load reports.");
//     }
//   };

//   const filteredReports = reports
//     .filter((r) =>
//       r.name.toLowerCase().includes(searchName.toLowerCase())
//     )
//     .filter((r) => {
//       const recordDate = dayjs(r.date);
//       return (
//         recordDate.isValid() &&
//         recordDate.isSameOrAfter(dayjs(start), "day") &&
//         recordDate.isSameOrBefore(dayjs(end), "day")
//       );
//     });

//   const exportExcel = () => {
//     if (!filteredReports.length) {
//       toast.warning("⚠️ No data to export.");
//       return;
//     }

//     const formatted = filteredReports.map((r) => ({
//       ...r,
//       date: dayjs(r.date).format("DD/MM/YYYY"),
//     }));

//     const ws = XLSX.utils.json_to_sheet(formatted);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Attendance");
//     XLSX.writeFile(wb, "attendance-report.xlsx");
//     toast.success("✅ Excel downloaded.");
//   };

//   const exportPDF = () => {
//     if (!filteredReports.length) {
//       toast.warning("⚠️ No data to export.");
//       return;
//     }

//     const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "A4" });
//     doc.setFontSize(16);
//     doc.text("Attendance Report", 40, 40);

//     const tableData = filteredReports.map((r, i) => [
//       i + 1,
//       r.name,
//       r.status,
//       dayjs(r.date).format("DD/MM/YYYY"),
//     ]);

//     autoTable(doc, {
//       startY: 60,
//       head: [["S.No", "Supervisor", "Status", "Date"]],
//       body: tableData,
//       styles: { fontSize: 10 },
//       headStyles: { fillColor: [40, 40, 40] },
//       margin: { top: 60 },
//     });

//     doc.save("attendance-report.pdf");
//     toast.success("✅ PDF downloaded.");
//   };

//   return (
//     <div className="container my-4 px-3">
//       <h4 className="text-center fw-bold mb-4">📅 Attendance Reports</h4>

//       {/* Filters */}
//       <div className="row g-3 mb-4">
//         <div className="col-lg-3 col-md-4 col-sm-6 col-12">
//           <label className="form-label fw-semibold">Start Date</label>
//           <input
//             type="date"
//             className="form-control"
//             value={start}
//             onChange={(e) => setStart(e.target.value)}
//             max={getToday()}
//           />
//         </div>

//         <div className="col-lg-3 col-md-4 col-sm-6 col-12">
//           <label className="form-label fw-semibold">End Date</label>
//           <input
//             type="date"
//             className="form-control"
//             value={end}
//             onChange={(e) => setEnd(e.target.value)}
//             min={start}
//             max={getToday()}
//           />
//         </div>

//         <div className="col-lg-3 col-md-4 col-sm-6 col-12">
//           <label className="form-label fw-semibold">Search by Name</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Type supervisor name"
//             value={searchName}
//             onChange={(e) => setSearchName(e.target.value)}
//           />
//         </div>

//         <div className="col-lg-1 col-md-2 col-sm-6 col-6 d-grid">
//           <label className="form-label invisible">Excel</label>
//           <button className="btn btn-success" onClick={exportExcel}>
//             ⬇️ Excel
//           </button>
//         </div>

//         <div className="col-lg-1 col-md-2 col-sm-6 col-6 d-grid">
//           <label className="form-label invisible">PDF</label>
//           <button className="btn btn-danger" onClick={exportPDF}>
//             ⬇️ PDF
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="table-responsive">
//         <table className="table table-bordered text-center table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>S.No</th>
//               <th>Supervisor</th>
//               <th>Status</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredReports.length > 0 ? (
//               filteredReports.map((r, i) => (
//                 <tr key={`${i}-${r.name}-${r.date}`}>
//                   <td>{i + 1}</td>
//                   <td>{r.name}</td>
//                   <td>
//                     <span
//                       className={`badge text-white px-3 py-1 ${
//                         r.status === "Fullday"
//                           ? "bg-success"
//                           : r.status === "Halfday"
//                           ? "bg-warning text-dark"
//                           : r.status === "Overtime"
//                           ? "bg-primary"
//                           : "bg-secondary"
//                       }`}
//                     >
//                       {r.status}
//                     </span>
//                   </td>
//                   <td>{dayjs(r.date).format("DD/MM/YYYY")}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-muted">
//                   No attendance records found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Reports;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import styled from "styled-components";
import {
  FaCalendarAlt,
  FaSearch,
  FaFileExcel,
  FaFilePdf,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaClock,
  FaBusinessTime,
  FaUser,
  FaEllipsisV
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-bootstrap/Dropdown';

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

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [start, setStart] = useState(dayjs().format("YYYY-MM-DD"));
  const [end, setEnd] = useState(dayjs().format("YYYY-MM-DD"));
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchReports();
  }, [start, end]);

  const fetchReports = async () => {
    const url =
      "https://bulding-constraction-employee-management.onrender.com/api/supervisors/Attendance/reports";
    const params = new URLSearchParams();
    if (start) params.append("startDate", start);
    if (end) params.append("endDate", end);

    try {
      const res = await axios.get(`${url}?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success && Array.isArray(res.data.data)) {
        const allRecords = res.data.data.flatMap((item) =>
          (item.rangeRecords || []).map((record) => {
            const parsedDate = dayjs(record.date);
            return {
              name: item.name || "Unknown",
              date: parsedDate.isValid() ? parsedDate.format("YYYY-MM-DD") : null,
              status: record.status,
            };
          })
        );
        setReports(allRecords.filter((r) => r.date !== null));
      } else {
        setReports([]);
        toast.warning("No records found.");
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
      toast.error("Failed to load reports.");
    }
  };

  const filteredReports = reports
    .filter((r) =>
      r.name.toLowerCase().includes(searchName.toLowerCase())
    )
    .filter((r) => {
      const recordDate = dayjs(r.date);
      return (
        recordDate.isValid() &&
        recordDate.isSameOrAfter(dayjs(start), "day") &&
        recordDate.isSameOrBefore(dayjs(end), "day")
      );
    });

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredReports.length / reportsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const exportExcel = () => {
    if (!filteredReports.length) {
      toast.warning("No data to export.");
      return;
    }

    const formatted = filteredReports.map((r) => ({
      ...r,
      date: dayjs(r.date).format("DD/MM/YYYY"),
    }));

    const ws = XLSX.utils.json_to_sheet(formatted);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(wb, "attendance-report.xlsx");
    toast.success("Excel downloaded.");
  };

  const exportPDF = () => {
    if (!filteredReports.length) {
      toast.warning("No data to export.");
      return;
    }

    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "A4" });
    doc.setFontSize(16);
    doc.text("Attendance Report", 40, 40);

    const tableData = filteredReports.map((r, i) => [
      i + 1,
      r.name,
      r.status,
      dayjs(r.date).format("DD/MM/YYYY"),
    ]);

    autoTable(doc, {
      startY: 60,
      head: [["S.No", "Supervisor", "Status", "Date"]],
      body: tableData,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [40, 40, 40] },
      margin: { top: 60 },
    });

    doc.save("attendance-report.pdf");
    toast.success("PDF downloaded.");
  };

  const getStatusBadge = (status) => {
    let className = "null";
    let text = status || "Not Marked";

    if (status === "Fullday") {
      className = "fullday";
    } else if (status === "Halfday") {
      className = "halfday";
    } else if (status === "Overtime") {
      className = "overtime";
    }

    return <StatusBadge className={className}>{text}</StatusBadge>;
  };

  return (
    <Container>
      <Header>
        <h2>Attendance Reports</h2>
        <p>View and export attendance records</p>
      </Header>

      <ActionBar>
        <SearchBox>
          <FaSearch />
          <input
            type="text"
            placeholder="Search supervisors..."
            className="form-control"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
              setCurrentPage(1);
            }}
          />
        </SearchBox>

        <DateFilterContainer>
          <FaCalendarAlt />
          <DatePicker
            selected={dayjs(start).toDate()}
            onChange={(date) => {
              setStart(dayjs(date).format("YYYY-MM-DD"));
              setCurrentPage(1);
            }}
            selectsStart
            startDate={dayjs(start).toDate()}
            endDate={dayjs(end).toDate()}
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="Start date"
          />
        </DateFilterContainer>

        <DateFilterContainer>
          <FaCalendarAlt />
          <DatePicker
            selected={dayjs(end).toDate()}
            onChange={(date) => {
              setEnd(dayjs(date).format("YYYY-MM-DD"));
              setCurrentPage(1);
            }}
            selectsEnd
            startDate={dayjs(start).toDate()}
            endDate={dayjs(end).toDate()}
            minDate={dayjs(start).toDate()}
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
        {currentReports.length > 0 ? (
          <Table>
            <thead>
              <tr>
                {!isMobile && <th>S.No</th>}
                <th>Supervisor</th>
                <th>Status</th>
                {!isMobile && <th>Date</th>}
                {isMobile && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentReports.map((r, i) => (
                <tr key={`${i}-${r.name}-${r.date}`}>
                  {!isMobile && <td>{indexOfFirstReport + i + 1}</td>}
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
                      {r.name}
                    </div>
                  </td>
                  <td>{getStatusBadge(r.status)}</td>
                  {!isMobile && <td>{dayjs(r.date).format("DD/MM/YYYY")}</td>}
                  {isMobile && (
                    <td>
                      <MobileActionsDropdown>
                        <Dropdown.Toggle variant="link" id="dropdown-actions">
                          <FaEllipsisV />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            {dayjs(r.date).format("DD/MM/YY")}
                          </Dropdown.Item>
                          <Dropdown.Item>
                            {getStatusBadge(r.status)}
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
            {searchName
              ? "No matching supervisors found"
              : "No attendance records found for selected date range"}
          </EmptyState>
        )}
      </TableContainer>

      {filteredReports.length > 0 && (
        <PaginationContainer>
          <PageInfo>
            Showing {indexOfFirstReport + 1} to{" "}
            {Math.min(indexOfLastReport, filteredReports.length)} of{" "}
            {filteredReports.length} records
          </PageInfo>
          <PaginationButtons>
            <PageButton onClick={prevPage} disabled={currentPage === 1}>
              <FaChevronLeft size={14} />
              {!isMobile && <span>Previous</span>}
            </PageButton>
            {!isMobile && (
              <span className="mx-2">
                Page {currentPage} of{" "}
                {Math.ceil(filteredReports.length / reportsPerPage)}
              </span>
            )}
            <PageButton
              onClick={nextPage}
              disabled={
                currentPage >= Math.ceil(filteredReports.length / reportsPerPage)
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

export default Reports;