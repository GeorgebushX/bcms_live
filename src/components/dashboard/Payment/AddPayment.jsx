// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Form, Button, Row, Col, Card, Spinner } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { FaMoneyCheckAlt, FaArrowLeft } from "react-icons/fa";

// const AddPayment = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     supervisorId: "",
//     startDate: "",
//     endDate: "",
//     workingDays: 0,
//     overtimeDaysCount: 0,
//     halfDaysCount: 0,
//     overtimeOneDaySalary: "",
//     halfdayOneDaySalary: "",
//     allowances: "",
//     deductions: "",
//     advanceSalary: "",
//     paidAmount: "",
//   });

//   const [supervisors, setSupervisors] = useState([]);
//   const [loadingSupervisors, setLoadingSupervisors] = useState(true);

//   useEffect(() => {
//     const fetchSupervisors = async () => {
//       try {
//         const res = await axios.get(
//           "https://bulding-constraction-employee-management.onrender.com/api/supervisors",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         if (res.data.success && Array.isArray(res.data.data)) {
//           setSupervisors(res.data.data);
//         } else {
//           toast.error("Supervisor list is empty or invalid.");
//         }
//       } catch (err) {
//         console.error("❌ Error fetching supervisors:", err);
//         toast.error("Failed to load supervisors.");
//       } finally {
//         setLoadingSupervisors(false);
//       }
//     };

//     fetchSupervisors();
//   }, []);

//   const calculateWorkingDays = (start, end) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     if (isNaN(startDate) || isNaN(endDate)) return 0;
//     const diffTime = Math.abs(endDate - startDate);
//     return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     const updatedForm = {
//       ...formData,
//       [name]: value,
//     };

//     if (name === "startDate" || name === "endDate") {
//       updatedForm.workingDays = calculateWorkingDays(
//         name === "startDate" ? value : formData.startDate,
//         name === "endDate" ? value : formData.endDate
//       );
//     }

//     setFormData(updatedForm);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { supervisorId, startDate, endDate } = formData;

//     if (!supervisorId || !startDate || !endDate) {
//       return toast.error("Please complete all required fields.");
//     }

//     const selectedSupervisor = supervisors.find(
//       (sup) => String(sup._id).trim() === String(supervisorId).trim()
//     );

//     if (!selectedSupervisor) {
//       return toast.error("Selected supervisor is invalid.");
//     }

//     const payload = {
//       supervisorId: selectedSupervisor._id,
//       name: selectedSupervisor.name,
//       startDate,
//       endDate,
//       workingDays: formData.workingDays,
//       overtimeDaysCount: parseInt(formData.overtimeDaysCount) || 0,
//       halfDaysCount: parseInt(formData.halfDaysCount) || 0,
//       overtimeOneDaySalary: parseFloat(formData.overtimeOneDaySalary) || 0,
//       halfdayOneDaySalary: parseFloat(formData.halfdayOneDaySalary) || 0,
//       allowances: parseFloat(formData.allowances) || 0,
//       deductions: parseFloat(formData.deductions) || 0,
//       advanceSalary: parseFloat(formData.advanceSalary) || 0,
//       paidAmount: parseFloat(formData.paidAmount) || 0,
//     };

//     try {
//       const res = await axios.post(
//         "https://bulding-constraction-employee-management.onrender.com/api/supervisors/salary",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success("✅ Payment added successfully!");
//         navigate("/engineer-dashboard/payment");
//       } else {
//         toast.error(res.data.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.error("❌ Submission error:", error.response?.data || error.message);
//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to submit payment. Please check the input fields."
//       );
//     }
//   };

//   return (
//     <div className="container py-4">
//       <Button
//         variant="secondary"
//         onClick={() => navigate("/engineer-dashboard/payment")}
//         className="mb-3"
//       >
//         <FaArrowLeft className="me-2" />
//         Back to Payment List
//       </Button>

//       <Card className="shadow border-0">
//         <Card.Header className="bg-primary text-white text-center fs-5 fw-bold">
//           <FaMoneyCheckAlt className="me-2" />
//           Add New Payment
//         </Card.Header>

//         <Card.Body>
//           {loadingSupervisors ? (
//             <div className="text-center py-4">
//               <Spinner animation="border" variant="primary" />
//               <div>Loading supervisors...</div>
//             </div>
//           ) : (
//             <Form onSubmit={handleSubmit}>
//               <Row className="g-3 mb-3">
//                 <Col xs={12}>
//                   <Form.Group>
//                     <Form.Label className="fw-semibold">Select Supervisor</Form.Label>
//                     <Form.Select
//                       name="supervisorId"
//                       value={formData.supervisorId}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">-- Select Supervisor --</option>
//                       {supervisors.map((sup) => (
//                         <option key={sup._id} value={sup._id}>
//                           {sup.name}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>

//                 <Col xs={12} md={4}>
//                   <Form.Group>
//                     <Form.Label className="fw-semibold">Start Date</Form.Label>
//                     <Form.Control
//                       type="date"
//                       name="startDate"
//                       value={formData.startDate}
//                       onChange={handleChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col xs={12} md={4}>
//                   <Form.Group>
//                     <Form.Label className="fw-semibold">End Date</Form.Label>
//                     <Form.Control
//                       type="date"
//                       name="endDate"
//                       value={formData.endDate}
//                       onChange={handleChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col xs={12} md={4}>
//                   <Form.Group>
//                     <Form.Label className="fw-semibold">Working Days</Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="workingDays"
//                       value={formData.workingDays}
//                       readOnly
//                       disabled
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="g-3 mb-3">
//                 <Col xs={12} md={4}>
//                   <Form.Group>
//                     <Form.Label className="fw-semibold">Overtime Days</Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="overtimeDaysCount"
//                       value={formData.overtimeDaysCount}
//                       onChange={handleChange}
//                       min="0"
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col xs={12} md={4}>
//                   <Form.Group>
//                     <Form.Label className="fw-semibold">Half Days</Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="halfDaysCount"
//                       value={formData.halfDaysCount}
//                       onChange={handleChange}
//                       min="0"
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="g-3 mb-4">
//                 <Col xs={12} md={6}>
//                   <Form.Group>
//                     <Form.Label className="fw-semibold">Overtime One Day Salary</Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="overtimeOneDaySalary"
//                       value={formData.overtimeOneDaySalary}
//                       onChange={handleChange}
//                       min="0"
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col xs={12} md={6}>
//                   <Form.Group>
//                     <Form.Label className="fw-semibold">Halfday One Day Salary</Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="halfdayOneDaySalary"
//                       value={formData.halfdayOneDaySalary}
//                       onChange={handleChange}
//                       min="0"
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="g-3 mb-4">
//                 <Col xs={12} md={4}>
//                   <Form.Group>
//                     <Form.Label className="fw-semibold">Allowances</Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="allowances"
//                       value={formData.allowances}
//                       onChange={handleChange}
//                       min="0"
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col xs={12} md={4}>
//                   <Form.Group>
//                     <Form.Label className="fw-semibold">Deductions</Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="deductions"
//                       value={formData.deductions}
//                       onChange={handleChange}
//                       min="0"
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col xs={12} md={4}>
//                   <Form.Group>
//                     <Form.Label className="fw-semibold">Advance Salary</Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="advanceSalary"
//                       value={formData.advanceSalary}
//                       onChange={handleChange}
//                       min="0"
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="g-3 mb-4">
//                 <Col xs={12} md={6}>
//                   <Form.Group>
//                     <Form.Label className="fw-semibold">Paid Amount</Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="paidAmount"
//                       value={formData.paidAmount}
//                       onChange={handleChange}
//                       min="0"
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <div className="d-flex justify-content-center">
//                 <Button variant="success" type="submit" className="px-4">
//                   ➕ Submit Payment
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default AddPayment;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import {
  FaMoneyCheckAlt,
  FaArrowLeft,
  FaUser,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaSave,
  FaBuilding,
} from "react-icons/fa";
import styled from "styled-components";

// Styled components from first code
const Container = styled.div`
  padding: 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: calc(100vh - 70px);

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Card = styled.div`
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  border: none;
  background: white;
`;

const CardHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  text-align: center;
  border-bottom: none;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 70%
    );
    transform: rotate(30deg);
  }

  h2 {
    margin: 0;
    font-weight: 600;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    @media (min-width: 768px) {
      font-size: 1.8rem;
    }
  }
`;

const CardBody = styled.div`
  padding: 1rem;
  background-color: white;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  position: relative;

  @media (min-width: 768px) {
    margin-bottom: 1.5rem;
  }

  label {
    font-weight: 500;
    color: #495057;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;

    @media (min-width: 768px) {
      font-size: 1rem;
    }

    &.required-field::after {
      content: "*";
      color: #e74c3c;
      margin-left: 4px;
    }
  }

  .form-control {
    border-radius: 8px;
    padding: 0.5rem 1rem;
    border: 1px solid #ced4da;
    transition: all 0.3s;
    background-color: #f8f9fa;
    font-size: 0.9rem;
    width: 100%;

    @media (min-width: 768px) {
      padding: 0.75rem 1rem;
      font-size: 1rem;
    }

    &:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
      background-color: white;
    }
  }

  select.form-control {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1em;
  }
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
  grid-column: 1 / -1;

  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 2rem;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  border: none;
  color: white;
  padding: 0.75rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    padding: 0.75rem 2rem;
    min-width: 180px;
    font-size: 1rem;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(46, 204, 113, 0.3);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SecondaryButton = styled(Link)`
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
  border: none;
  color: white;
  padding: 0.75rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    padding: 0.75rem 2rem;
    min-width: 180px;
    font-size: 1rem;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(149, 165, 166, 0.3);
    color: white;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const FormSectionTitle = styled.h5`
  color: #667eea;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f1f1f1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Divider = styled.hr`
  margin: 1.5rem 0;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(102, 126, 234, 0.75),
    rgba(0, 0, 0, 0)
  );
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
  border: 0.35rem solid rgba(102, 126, 234, 0.2);
  border-radius: 50%;
  border-top-color: #667eea;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const AddPayment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    supervisorId: "",
    siteId: "",
    startDate: "",
    endDate: "",
    workingDays: 0,
    overtimeDaysCount: 0,
    halfDaysCount: 0,
    overtimeOneDaySalary: "",
    halfdayOneDaySalary: "",
    allowances: "",
    deductions: "",
    advanceSalary: "",
    paidAmount: "",
  });

  const [supervisors, setSupervisors] = useState([]);
  const [sites, setSites] = useState([]);
  const [loadingSupervisors, setLoadingSupervisors] = useState(true);
  const [loadingSites, setLoadingSites] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const res = await axios.get(
          "https://bulding-constraction-employee-management.onrender.com/api/supervisors",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.data.success && res.data.data && Array.isArray(res.data.data.supervisors)) {
          setSupervisors(res.data.data.supervisors);
        } else {
          toast.error("Supervisor list is empty or invalid.");
        }
      } catch (err) {
        console.error("❌ Error fetching supervisors:", err);
        toast.error("Failed to load supervisors.");
      } finally {
        setLoadingSupervisors(false);
      }
    };

    const fetchSites = async () => {
      try {
        const res = await axios.get(
          "https://bulding-constraction-employee-management.onrender.com/api/site",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        
        if (res.data.success) {
          setSites(res.data.data || []);
        } else {
          toast.error("Failed to load sites.");
        }
      } catch (error) {
        console.error("Error fetching sites:", error);
        toast.error("Error fetching sites: " + error.message);
      } finally {
        setLoadingSites(false);
      }
    };

    fetchSupervisors();
    fetchSites();
  }, []);

  const calculateWorkingDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate) || isNaN(endDate)) return 0;
    const diffTime = Math.abs(endDate - startDate);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...formData,
      [name]: value,
    };

    if (name === "startDate" || name === "endDate") {
      updatedForm.workingDays = calculateWorkingDays(
        name === "startDate" ? value : formData.startDate,
        name === "endDate" ? value : formData.endDate
      );
    }

    setFormData(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { supervisorId, siteId, startDate, endDate } = formData;

    if (!supervisorId || !siteId || !startDate || !endDate) {
      return toast.error("Please complete all required fields.");
    }

    const selectedSupervisor = supervisors.find(
      (sup) => String(sup._id).trim() === String(supervisorId).trim()
    );

    if (!selectedSupervisor) {
      return toast.error("Selected supervisor is invalid.");
    }

    const selectedSite = sites.find(
      (site) => String(site._id).trim() === String(siteId).trim()
    );

    if (!selectedSite) {
      return toast.error("Selected site is invalid.");
    }

    const payload = {
      supervisorId: selectedSupervisor._id,
      supervisorName: selectedSupervisor.name,
      siteId: selectedSite._id,
      siteName: selectedSite.siteName,
      startDate,
      endDate,
      workingDays: formData.workingDays,
      overtimeDaysCount: parseInt(formData.overtimeDaysCount) || 0,
      halfDaysCount: parseInt(formData.halfDaysCount) || 0,
      overtimeOneDaySalary: parseFloat(formData.overtimeOneDaySalary) || 0,
      halfdayOneDaySalary: parseFloat(formData.halfdayOneDaySalary) || 0,
      allowances: parseFloat(formData.allowances) || 0,
      deductions: parseFloat(formData.deductions) || 0,
      advanceSalary: parseFloat(formData.advanceSalary) || 0,
      paidAmount: parseFloat(formData.paidAmount) || 0,
    };

    try {
      setLoading(true);
      const res = await axios.post(
        "https://bulding-constraction-employee-management.onrender.com/api/supervisors/salary",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        toast.success("✅ Payment added successfully!");
        navigate("/engineer-dashboard/payment");
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("❌ Submission error:", error.response?.data || error.message);
      toast.error(
        error?.response?.data?.message ||
          "Failed to submit payment. Please check the input fields."
      );
    } finally {
      setLoading(false);
    }
  };

  const isLoading = loadingSupervisors || loadingSites;

  return (
    <Container>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <Card>
            <CardHeader>
              <h2>
                <FaMoneyCheckAlt /> Add New Payment
              </h2>
            </CardHeader>
            <CardBody>
              {isLoading ? (
                <SpinnerContainer>
                  <Spinner />
                  <div>Loading data...</div>
                </SpinnerContainer>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FormGrid>
                    {/* Supervisor Selection */}
                    <div>
                      <FormSectionTitle>
                        <FaUser /> Supervisor Information
                      </FormSectionTitle>

                      <FormGroup>
                        <label className="required-field">
                          <FaUser /> Select Supervisor
                        </label>
                        <select
                          className="form-control"
                          name="supervisorId"
                          value={formData.supervisorId}
                          onChange={handleChange}
                          required
                        >
                          <option value="">-- Select Supervisor --</option>
                          {supervisors.map((sup) => (
                            <option key={sup._id} value={sup._id}>
                              {sup.name}
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                    </div>

                    {/* Site Selection */}
                    <div>
                      <FormSectionTitle>
                        <FaBuilding /> Site Information
                      </FormSectionTitle>

                      <FormGroup>
                        <label className="required-field">
                          <FaBuilding /> Select Site
                        </label>
                        <select
                          className="form-control"
                          name="siteId"
                          value={formData.siteId}
                          onChange={handleChange}
                          required
                        >
                          <option value="">-- Select Site --</option>
                          {sites.map((site) => (
                            <option key={site._id} value={site._id}>
                              {site.siteName} - {site.location}
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                    </div>
                  </FormGrid>

                  <Divider />

                  <FormGrid>
                    {/* Date Information */}
                    <div>
                      <FormSectionTitle>
                        <FaCalendarAlt /> Date Information
                      </FormSectionTitle>

                      <FormGroup>
                        <label className="required-field">
                          <FaCalendarAlt /> Start Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <label className="required-field">
                          <FaCalendarAlt /> End Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <label>
                          <FaCalendarAlt /> Working Days
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="workingDays"
                          value={formData.workingDays}
                          readOnly
                          disabled
                        />
                      </FormGroup>
                    </div>

                    {/* Days Count */}
                    <div>
                      <FormSectionTitle>
                        <FaMoneyBillWave /> Days Count
                      </FormSectionTitle>

                      <FormGroup>
                        <label>
                          <FaMoneyBillWave /> Overtime Days
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="overtimeDaysCount"
                          value={formData.overtimeDaysCount}
                          onChange={handleChange}
                          min="0"
                        />
                      </FormGroup>

                      <FormGroup>
                        <label>
                          <FaMoneyBillWave /> Half Days
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="halfDaysCount"
                          value={formData.halfDaysCount}
                          onChange={handleChange}
                          min="0"
                        />
                      </FormGroup>
                    </div>
                  </FormGrid>

                  <Divider />

                  <FormGrid>
                    {/* Salary Information */}
                    <div>
                      <FormSectionTitle>
                        <FaMoneyBillWave /> Salary Information
                      </FormSectionTitle>

                      <FormGroup>
                        <label>
                          <FaMoneyBillWave /> Overtime One Day Salary
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="overtimeOneDaySalary"
                          value={formData.overtimeOneDaySalary}
                          onChange={handleChange}
                          min="0"
                        />
                      </FormGroup>

                      <FormGroup>
                        <label>
                          <FaMoneyBillWave /> Halfday One Day Salary
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="halfdayOneDaySalary"
                          value={formData.halfdayOneDaySalary}
                          onChange={handleChange}
                          min="0"
                        />
                      </FormGroup>
                    </div>

                    {/* Payment Details */}
                    <div>
                      <FormSectionTitle>
                        <FaMoneyBillWave /> Payment Details
                      </FormSectionTitle>

                      <FormGroup>
                        <label>
                          <FaMoneyBillWave /> Allowances
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="allowances"
                          value={formData.allowances}
                          onChange={handleChange}
                          min="0"
                        />
                      </FormGroup>

                      <FormGroup>
                        <label>
                          <FaMoneyBillWave /> Deductions
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="deductions"
                          value={formData.deductions}
                          onChange={handleChange}
                          min="0"
                        />
                      </FormGroup>

                      <FormGroup>
                        <label>
                          <FaMoneyBillWave /> Advance Salary
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="advanceSalary"
                          value={formData.advanceSalary}
                          onChange={handleChange}
                          min="0"
                        />
                      </FormGroup>

                      <FormGroup>
                        <label className="required-field">
                          <FaMoneyBillWave /> Paid Amount
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="paidAmount"
                          value={formData.paidAmount}
                          onChange={handleChange}
                          min="0"
                          required
                        />
                      </FormGroup>
                    </div>
                  </FormGrid>

                  <ActionButtons>
                    <SecondaryButton to="/engineer-dashboard/payment">
                      <FaArrowLeft /> Back
                    </SecondaryButton>
                    <PrimaryButton type="submit" disabled={loading}>
                      <FaSave /> {loading ? "Processing..." : "Submit Payment"}
                    </PrimaryButton>
                  </ActionButtons>
                </form>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default AddPayment; 
