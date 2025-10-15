// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Form, Button, Row, Col, Card, Spinner } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { FaMoneyCheckAlt, FaArrowLeft } from "react-icons/fa";
// import { useAuth } from "../../../../context/authContext";

// const CAddPayment = () => {
//   const navigate = useNavigate();
//   const { user, token: contextToken } = useAuth();
//   const token = contextToken || localStorage.getItem("token");

//   const [formData, setFormData] = useState({
//     contractorId: "",
//     name: "",
//     startDate: "",
//     endDate: "",
//     OvertimeOneDaySalary: "",
//     HalfdayOneDaySalary: "",
//     allowances: "",
//     deductions: "",
//     advanceSalary: "",
//     paidAmount: "",
//   });

//   const [contractors, setContractors] = useState([]);
//   const [loadingContractors, setLoadingContractors] = useState(true);

//   useEffect(() => {
//     const fetchContractors = async () => {
//       try {
//         const res = await axios.get(
//           "https://bulding-constraction-employee-management.onrender.com/api/contractors",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (res.data.success && Array.isArray(res.data.data)) {
//           // ✅ Filter by supervisorId
//           const filtered = res.data.data.filter(
//             (contractor) => contractor.supervisorId?._id === user?._id
//           );

//           setContractors(filtered);

//           if (filtered.length === 0) {
//             toast.info("ℹ️ No contractors found for your supervisor ID.");
//           }
//         } else {
//           toast.error("Contractor list is empty or invalid.");
//         }
//       } catch (err) {
//         console.error("Error fetching contractors:", err);
//         toast.error("Failed to load contractors.");
//       } finally {
//         setLoadingContractors(false);
//       }
//     };

//     if (user?._id) {
//       fetchContractors();
//     }
//   }, [user, token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const formatDate = (dateStr) => {
//     const d = new Date(dateStr);
//     if (isNaN(d)) return null;
//     const day = String(d.getDate()).padStart(2, "0");
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const year = d.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const {
//       contractorId,
//       startDate,
//       endDate,
//       OvertimeOneDaySalary,
//       HalfdayOneDaySalary,
//       allowances,
//       deductions,
//       advanceSalary,
//       paidAmount,
//     } = formData;

//     if (!contractorId || !startDate || !endDate || paidAmount === "") {
//       return toast.error("Please fill all required fields.");
//     }

//     const selected = contractors.find((c) => c._id === contractorId);
//     if (!selected) {
//       console.error("Selected Contractor ID:", contractorId);
//       return toast.error("Invalid contractor selected.");
//     }

//     const payload = {
//       name: selected.name,
//       startDate: formatDate(startDate),
//       endDate: formatDate(endDate),
//       OvertimeOneDaySalary: parseFloat(OvertimeOneDaySalary) || 0,
//       HalfdayOneDaySalary: parseFloat(HalfdayOneDaySalary) || 0,
//       allowances: parseFloat(allowances) || 0,
//       deductions: parseFloat(deductions) || 0,
//       advanceSalary: parseFloat(advanceSalary) || 0,
//       paidAmount: parseFloat(paidAmount),
//     };

//     try {
//       const res = await axios.post(
//         "https://bulding-constraction-employee-management.onrender.com/api/yes/contractors/salary",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success("✅ Payment added successfully!");
//         navigate("/supervisor-dashboard/contractor-salary");
//       } else {
//         toast.error(res.data.message || "Something went wrong!");
//       }
//     } catch (err) {
//       console.error("Submission error:", err);
//       toast.error("❌ Failed to submit payment. Please try again.");
//     }
//   };

//   return (
//     <div className="container py-4">
//       <Button
//         variant="secondary"
//         onClick={() => navigate("/supervisor-dashboard/contractor-salary")}
//         className="mb-3"
//       >
//         <FaArrowLeft className="me-2" />
//         Back to Payment List
//       </Button>

//       <Card className="shadow border-0">
//         <Card.Header className="bg-primary text-white text-center fs-5 fw-bold">
//           <FaMoneyCheckAlt className="me-2" />
//           Add New Contractor Payment
//         </Card.Header>
//         <Card.Body>
//           {loadingContractors ? (
//             <div className="text-center py-4">
//               <Spinner animation="border" variant="primary" />
//               <div>Loading contractors...</div>
//             </div>
//           ) : (
//             <Form onSubmit={handleSubmit}>
//               <Row className="g-3 mb-3">
//                 <Col xs={12}>
//                   <Form.Group>
//                     <Form.Label className="fw-semibold">Select Contractor</Form.Label>
//                     <Form.Select
//                       name="contractorId"
//                       value={formData.contractorId}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">-- Select Contractor --</option>
//                       {contractors.map((c) => (
//                         <option key={c._id} value={c._id}>
//                           {c.name}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="g-3 mb-3">
//                 <Col md={6}>
//                   <Form.Label className="fw-semibold">Start Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="startDate"
//                     value={formData.startDate}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Col>
//                 <Col md={6}>
//                   <Form.Label className="fw-semibold">End Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="endDate"
//                     value={formData.endDate}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Col>
//               </Row>

//               <Row className="g-3 mb-3">
//                 <Col md={6}>
//                   <Form.Label className="fw-semibold">Overtime Salary / Day</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="OvertimeOneDaySalary"
//                     value={formData.OvertimeOneDaySalary}
//                     onChange={handleChange}
//                     min="0"
//                   />
//                 </Col>
//                 <Col md={6}>
//                   <Form.Label className="fw-semibold">Halfday Salary / Day</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="HalfdayOneDaySalary"
//                     value={formData.HalfdayOneDaySalary}
//                     onChange={handleChange}
//                     min="0"
//                   />
//                 </Col>
//               </Row>

//               <Row className="g-3 mb-3">
//                 <Col md={4}>
//                   <Form.Label className="fw-semibold">Allowances</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="allowances"
//                     value={formData.allowances}
//                     onChange={handleChange}
//                     min="0"
//                   />
//                 </Col>
//                 <Col md={4}>
//                   <Form.Label className="fw-semibold">Deductions</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="deductions"
//                     value={formData.deductions}
//                     onChange={handleChange}
//                     min="0"
//                   />
//                 </Col>
//                 <Col md={4}>
//                   <Form.Label className="fw-semibold">Advance Salary</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="advanceSalary"
//                     value={formData.advanceSalary}
//                     onChange={handleChange}
//                     min="0"
//                   />
//                 </Col>
//               </Row>

//               <Row className="g-3 mb-4">
//                 <Col md={6}>
//                   <Form.Label className="fw-semibold">Paid Amount *</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="paidAmount"
//                     value={formData.paidAmount}
//                     onChange={handleChange}
//                     min="0"
//                     required
//                   />
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

// export default CAddPayment;


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
} from "react-icons/fa";
import styled from "styled-components";
import { useAuth } from "../../../../context/authContext";

// Styled components
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

const CAddPayment = () => {
  const navigate = useNavigate();
  const { user, token: contextToken } = useAuth();
  const token = contextToken || localStorage.getItem("token");

  const [formData, setFormData] = useState({
    contractorId: "",
    name: "",
    startDate: "",
    endDate: "",
    OvertimeOneDaySalary: "",
    HalfdayOneDaySalary: "",
    allowances: "",
    deductions: "",
    advanceSalary: "",
    paidAmount: "",
  });

  const [contractors, setContractors] = useState([]);
  const [loadingContractors, setLoadingContractors] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const res = await axios.get(
          "https://bulding-constraction-employee-management.onrender.com/api/contractors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success && Array.isArray(res.data.data)) {
          // Filter by supervisorId
          const filtered = res.data.data.filter(
            (contractor) => contractor.supervisorId?._id === user?._id
          );

          setContractors(filtered);

          if (filtered.length === 0) {
            toast.info("ℹ️ No contractors found for your supervisor ID.");
          }
        } else {
          toast.error("Contractor list is empty or invalid.");
        }
      } catch (err) {
        console.error("Error fetching contractors:", err);
        toast.error("Failed to load contractors.");
      } finally {
        setLoadingContractors(false);
      }
    };

    if (user?._id) {
      fetchContractors();
    }
  }, [user, token]);

  const validateForm = () => {
    const errors = {};
    if (!formData.contractorId) errors.contractorId = "Contractor is required";
    if (!formData.startDate) errors.startDate = "Start date is required";
    if (!formData.endDate) errors.endDate = "End date is required";
    if (formData.paidAmount === "") errors.paidAmount = "Paid amount is required";
    
    // Validate date range
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (start > end) {
        errors.dateRange = "End date must be after start date";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is changed
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d)) return null;
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const selectedContractor = contractors.find(
      (c) => c._id.toString() === formData.contractorId.toString()
    );

    if (!selectedContractor) {
      toast.error("Please select a valid contractor");
      return;
    }

    const payload = {
      userId: user._id, // Add supervisor's user ID to the payload
      contractorId: selectedContractor._id,
      name: selectedContractor.name,
      startDate: formatDate(formData.startDate),
      endDate: formatDate(formData.endDate),
      OvertimeOneDaySalary: parseFloat(formData.OvertimeOneDaySalary) || 0,
      HalfdayOneDaySalary: parseFloat(formData.HalfdayOneDaySalary) || 0,
      allowances: parseFloat(formData.allowances) || 0,
      deductions: parseFloat(formData.deductions) || 0,
      advanceSalary: parseFloat(formData.advanceSalary) || 0,
      paidAmount: parseFloat(formData.paidAmount),
    };

    try {
      setLoading(true);
      console.log("Submitting payload:", payload); // Debug log
      
      const res = await axios.post(
        "https://bulding-constraction-employee-management.onrender.com/api/yes/contractors/salary",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        toast.success("✅ Payment added successfully!");
        navigate("/supervisor-dashboard/contractor-salary");
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(
        err.response?.data?.message ||
          "❌ Failed to submit payment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <Card>
            <CardHeader>
              <h2>
                <FaMoneyCheckAlt /> Add New Contractor Payment
              </h2>
            </CardHeader>
            <CardBody>
              {loadingContractors ? (
                <SpinnerContainer>
                  <Spinner />
                  <div>Loading contractors...</div>
                </SpinnerContainer>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FormGrid>
                    {/* Contractor Selection */}
                    <div>
                      <FormSectionTitle>
                        <FaUser /> Contractor Information
                      </FormSectionTitle>

                      <FormGroup>
                        <label className="required-field">
                          <FaUser /> Select Contractor
                        </label>
                        <select
                          className={`form-control ${formErrors.contractorId ? "is-invalid" : ""}`}
                          name="contractorId"
                          value={formData.contractorId}
                          onChange={handleChange}
                          required
                        >
                          <option value="">-- Select Contractor --</option>
                          {contractors.map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                        {formErrors.contractorId && (
                          <div className="invalid-feedback d-block">
                            {formErrors.contractorId}
                          </div>
                        )}
                      </FormGroup>
                    </div>

                    {/* Empty div to balance grid */}
                    <div></div>
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
                          className={`form-control ${formErrors.startDate ? "is-invalid" : ""}`}
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          required
                        />
                        {formErrors.startDate && (
                          <div className="invalid-feedback d-block">
                            {formErrors.startDate}
                          </div>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <label className="required-field">
                          <FaCalendarAlt /> End Date
                        </label>
                        <input
                          type="date"
                          className={`form-control ${formErrors.endDate ? "is-invalid" : ""}`}
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          required
                        />
                        {formErrors.endDate && (
                          <div className="invalid-feedback d-block">
                            {formErrors.endDate}
                          </div>
                        )}
                      </FormGroup>
                      {formErrors.dateRange && (
                        <div className="text-danger small mt-2">
                          {formErrors.dateRange}
                        </div>
                      )}
                    </div>

                    {/* Salary Information */}
                    <div>
                      <FormSectionTitle>
                        <FaMoneyBillWave /> Salary Information
                      </FormSectionTitle>

                      <FormGroup>
                        <label>
                          <FaMoneyBillWave /> Overtime Salary / Day
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="OvertimeOneDaySalary"
                          value={formData.OvertimeOneDaySalary}
                          onChange={handleChange}
                          min="0"
                        />
                      </FormGroup>

                      <FormGroup>
                        <label>
                          <FaMoneyBillWave /> Halfday Salary / Day
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="HalfdayOneDaySalary"
                          value={formData.HalfdayOneDaySalary}
                          onChange={handleChange}
                          min="0"
                        />
                      </FormGroup>
                    </div>
                  </FormGrid>

                  <Divider />

                  <FormGrid>
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
                    </div>

                    <div>
                      <FormSectionTitle>
                        <FaMoneyBillWave /> Additional Information
                      </FormSectionTitle>

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
                          className={`form-control ${formErrors.paidAmount ? "is-invalid" : ""}`}
                          name="paidAmount"
                          value={formData.paidAmount}
                          onChange={handleChange}
                          min="0"
                          required
                        />
                        {formErrors.paidAmount && (
                          <div className="invalid-feedback d-block">
                            {formErrors.paidAmount}
                          </div>
                        )}
                      </FormGroup>
                    </div>
                  </FormGrid>

                  <ActionButtons>
                    <SecondaryButton to="/supervisor-dashboard/contractor-salary">
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

export default CAddPayment;