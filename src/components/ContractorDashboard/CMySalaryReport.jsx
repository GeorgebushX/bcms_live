import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Button, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import styled from "styled-components";
import {
  FaFileExcel,
  FaFilePdf,
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisV,
  FaSearch,
  FaCalendarAlt
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ======================
// Styled Components
// ======================

const Container = styled.div`
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  h5 {
    color: #2c3e50;
    font-weight: 600;
    margin: 0;
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
  padding: 0.35rem 0.75rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;

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
  font-size: 14px;

  @media (min-width: 768px) {
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
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
`;

const CustomSpinner = styled.div`
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

const SalaryReports = ({ startDate: propStartDate, endDate: propEndDate }) => {
  const [salaryReports, setSalaryReports] = useState([]);
  const [filteredSalary, setFilteredSalary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(propStartDate || "");
  const [endDate, setEndDate] = useState(propEndDate || "");
  const reportsPerPage = 10;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { user, token: contextToken } = useAuth();
  const token = contextToken || localStorage.getItem("token");

  const SALARY_API =
    "https://bulding-constraction-employee-management.onrender.com/api/yes/contractors/salaries/reports";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchSalaryReports = async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const response = await axios.get(SALARY_API, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success && Array.isArray(response.data.data)) {
        const filteredData = response.data.data.filter(
          (item) => item.contractorId?.contractorRole === user?.roleType
        );
        setSalaryReports(filteredData);
      } else {
        setSalaryReports([]);
      }
    } catch (err) {
      console.error("Salary Fetch Error:", err);
      toast.error("❌ Failed to fetch salary reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchSalaryReports();
  }, [user]);

  useEffect(() => {
    const filterByDate = (data) => {
      return data.filter((item) => {
        if (!item.date) return false;
        
        // Parse the date from the item (assuming it's in DD/MM/YYYY or YYYY-MM-DD format)
        const recordDate = dayjs(item.date, ["DD/MM/YYYY", "YYYY-MM-DD"]);
        
        // Parse the filter dates
        const startDateObj = startDate ? dayjs(startDate) : null;
        const endDateObj = endDate ? dayjs(endDate) : null;
        
        // Check if the record date is valid
        if (!recordDate.isValid()) return false;
        
        // Check date range
        const isAfterStart = startDateObj ? recordDate.isSameOrAfter(startDateObj, 'day') : true;
        const isBeforeEnd = endDateObj ? recordDate.isSameOrBefore(endDateObj, 'day') : true;
        
        return isAfterStart && isBeforeEnd;
      });
    };

    setFilteredSalary(filterByDate(salaryReports));
    setCurrentPage(1);
  }, [startDate, endDate, salaryReports]);

  // Pagination logic
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredSalary
    .filter(item => 
      item.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.date && dayjs(item.date, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("DD/MM/YYYY").toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.paidAmount?.toString().includes(searchTerm)) ||
      (item.balanceAmount?.toString().includes(searchTerm))
    )
    .slice(indexOfFirstReport, indexOfLastReport);

  const totalPages = Math.ceil(filteredSalary.length / reportsPerPage);

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
    if (!filteredSalary.length) {
      toast.warning("No data to export.");
      return;
    }

    const formatted = filteredSalary.map((item) => ({
      Date: item.date
        ? dayjs(item.date, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("DD/MM/YYYY")
        : "-",
      Paid: item.paidAmount ?? 0,
      Balance: item.balanceAmount ?? 0,
      Status: item.status || (item.balanceAmount === 0 ? "Paid" : "Pending"),
    }));

    const ws = XLSX.utils.json_to_sheet(formatted);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Salary Reports");
    XLSX.writeFile(wb, "salary-reports.xlsx");
    toast.success("Excel downloaded.");
  };

  const exportPDF = () => {
    if (!filteredSalary.length) {
      toast.warning("No data to export.");
      return;
    }

    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "A4" });
    doc.setFontSize(16);
    doc.text("Salary Reports", 40, 40);

    const tableData = filteredSalary.map((item, i) => [
      i + 1,
      item.date
        ? dayjs(item.date, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("DD/MM/YYYY")
        : "-",
      item.paidAmount ?? 0,
      item.balanceAmount ?? 0,
      item.status || (item.balanceAmount === 0 ? "Paid" : "Pending"),
    ]);

    autoTable(doc, {
      startY: 60,
      head: [["S.No", "Date", "Paid", "Balance", "Status"]],
      body: tableData,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [40, 40, 40] },
      margin: { top: 60 },
    });

    doc.save("salary-reports.pdf");
    toast.success("PDF downloaded.");
  };

  return (
    <Container>
      <Header>
        <h5>💵 Salary Reports</h5>
        <ExportButtons>
          <ExportButton className="excel" onClick={exportExcel}>
            <FaFileExcel /> {!isMobile && "Excel"}
          </ExportButton>
          <ExportButton className="pdf" onClick={exportPDF}>
            <FaFilePdf /> {!isMobile && "PDF"}
          </ExportButton>
        </ExportButtons>
      </Header>

      <ActionBar>
        <SearchBox>
          <FaSearch />
          <input
            type="text"
            placeholder="Search by status, date, or amount..."
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
            selected={startDate ? dayjs(startDate).toDate() : null}
            onChange={(date) => {
              setStartDate(date ? dayjs(date).format("YYYY-MM-DD") : "");
              if (endDate && date && dayjs(date).isAfter(dayjs(endDate))) {
                setEndDate("");
              }
            }}
            selectsStart
            startDate={startDate ? dayjs(startDate).toDate() : null}
            endDate={endDate ? dayjs(endDate).toDate() : null}
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
            placeholderText="Start date"
            isClearable
            className="form-control"
          />
        </DateFilterContainer>

        <DateFilterContainer>
          <FaCalendarAlt />
          <DatePicker
            selected={endDate ? dayjs(endDate).toDate() : null}
            onChange={(date) => {
              setEndDate(date ? dayjs(date).format("YYYY-MM-DD") : "");
            }}
            selectsEnd
            startDate={startDate ? dayjs(startDate).toDate() : null}
            endDate={endDate ? dayjs(endDate).toDate() : null}
            minDate={startDate ? dayjs(startDate).toDate() : null}
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
            placeholderText="End date"
            isClearable
            disabled={!startDate}
            className="form-control"
          />
        </DateFilterContainer>
      </ActionBar>

      <TableContainer>
        {loading ? (
          <SpinnerContainer>
            <CustomSpinner />
            <div>Loading salary data...</div>
          </SpinnerContainer>
        ) : currentReports.length > 0 ? (
          <Table>
            <thead>
              <tr>
                {!isMobile && <th>S.No</th>}
                <th>Date</th>
                {!isMobile && <th>Paid</th>}
                {!isMobile && <th>Balance</th>}
                <th>Status</th>
                {isMobile && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentReports.map((item, idx) => (
                <tr key={item._id || idx}>
                  {!isMobile && <td>{indexOfFirstReport + idx + 1}</td>}
                  <td>
                    {item.date
                      ? dayjs(item.date, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("DD/MM/YYYY")
                      : "-"}
                  </td>
                  {!isMobile && <td>₹{item.paidAmount ?? "-"}</td>}
                  {!isMobile && <td>₹{item.balanceAmount ?? "-"}</td>}
                  <td>
                    <StatusBadge className={item.balanceAmount === 0 ? "paid" : "pending"}>
                      {item.status || (item.balanceAmount === 0 ? "Paid" : "Pending")}
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
                            Paid: ₹{item.paidAmount ?? "-"}
                          </Dropdown.Item>
                          <Dropdown.Item>
                            Balance: ₹{item.balanceAmount ?? "-"}
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
            {searchTerm
              ? "No matching records found"
              : "No salary records found for selected date range"}
          </EmptyState>
        )}
      </TableContainer>

      {filteredSalary.length > 0 && (
        <PaginationContainer>
          <PageInfo>
            Showing {indexOfFirstReport + 1} to{" "}
            {Math.min(indexOfLastReport, filteredSalary.length)} of{" "}
            {filteredSalary.length} records
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

export default SalaryReports;