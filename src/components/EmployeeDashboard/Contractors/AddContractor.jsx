// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   FaUserPlus,
//   FaUser,
//   FaIdCard,
//   FaCalendarAlt,
//   FaPhone,
//   FaEnvelope,
//   FaHome,
//   FaMoneyBillWave,
//   FaImage,
//   FaPlus,
//   FaMinus,
//   FaVenusMars,
//   FaGlobe,
//   FaHardHat,
//   FaBuilding,
//   FaRupeeSign,
// } from "react-icons/fa";

// const CONTRACTOR_ROLES = [
//   "Centering Contractor",
//   "Steel Contractor",
//   "Mason Contractor",
//   "Carpenter Contractor",
//   "Plumber Contractor",
//   "Electrician Contractor",
//   "Painter Contractor",
//   "Tiles Contractor",
// ];

// const AddContractor = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     gender: "Male",
//     phone: "",
//     alternatePhone: "",
//     address: {
//       street: "",
//       city: "",
//       state: "",
//       zipCode: "",
//       country: "India",
//     },
//     joiningDate: "",
//     bankName: "State Bank of India",
//     bankAccount: "",
//     bankCode: "",
//     password: "",
//     perDaySalary: "",
//     contractorRole: "",
//     supervisorName: "",
//   });

//   const [supervisors, setSupervisors] = useState([]);
//   const [loadingSupervisors, setLoadingSupervisors] = useState(false);
//   const [files, setFiles] = useState({
//     photo: null,
//     contractorIdProof: [],
//   });
//   const [previews, setPreviews] = useState({
//     photo: null,
//     contractorIdProof: [],
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Fetch supervisors when contractor role changes
//   useEffect(() => {
//     const fetchSupervisors = async () => {
//       if (!formData.contractorRole) {
//         setSupervisors([]);
//         setFormData((prev) => ({ ...prev, supervisorName: "" }));
//         return;
//       }

//       try {
//         setLoadingSupervisors(true);
//         const response = await axios.get(
//           `https://bulding-constraction-employee-management.onrender.com/api/supervisors/role/${encodeURIComponent(
//             formData.contractorRole
//           )}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         if (response.data.success) {
//           setSupervisors(response.data.data);
//         } else {
//           toast.error(response.data.message || "Failed to fetch supervisors");
//           setSupervisors([]);
//         }
//       } catch (error) {
//         console.error("Error fetching supervisors:", error);
//         toast.error(
//           error.response?.data?.message ||
//             "Failed to fetch supervisors. Please try again."
//         );
//         setSupervisors([]);
//       } finally {
//         setLoadingSupervisors(false);
//       }
//     };

//     fetchSupervisors();
//   }, [formData.contractorRole]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name.startsWith("address.")) {
//       const field = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         address: {
//           ...prev.address,
//           [field]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleFileChange = (type, e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file size (5MB max)
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("File size should be less than 5MB");
//       return;
//     }

//     if (type === "photo") {
//       setFiles((prev) => ({ ...prev, photo: file }));

//       const reader = new FileReader();
//       reader.onload = () => {
//         setPreviews((prev) => ({ ...prev, photo: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     } else if (type === "idProof") {
//       const newIdProofs = [...files.contractorIdProof];
//       newIdProofs[index] = file;
//       setFiles((prev) => ({ ...prev, contractorIdProof: newIdProofs }));

//       const reader = new FileReader();
//       reader.onload = () => {
//         const newPreviews = [...previews.contractorIdProof];
//         newPreviews[index] = reader.result;
//         setPreviews((prev) => ({ ...prev, contractorIdProof: newPreviews }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const addIdProofField = () => {
//     if (files.contractorIdProof.length < 5) {
//       setFiles((prev) => ({
//         ...prev,
//         contractorIdProof: [...prev.contractorIdProof, null],
//       }));
//     }
//   };

//   const removeIdProofField = (index) => {
//     if (files.contractorIdProof.length > 1) {
//       const newIdProofs = [...files.contractorIdProof];
//       newIdProofs.splice(index, 1);
//       setFiles((prev) => ({ ...prev, contractorIdProof: newIdProofs }));

//       const newPreviews = [...previews.contractorIdProof];
//       newPreviews.splice(index, 1);
//       setPreviews((prev) => ({ ...prev, contractorIdProof: newPreviews }));
//     }
//   };

// const validateForm = () => {
//   const requiredFields = [
//     "name",
//     "email",
//     "password",
//     "phone",
//     "contractorRole",
//     "supervisorName",
//   ];

//   const missingFields = requiredFields.filter((field) => !formData[field]);

//   if (missingFields.length > 0) {
//     toast.error(
//       `Please fill all required fields: ${missingFields.join(", ")}`
//     );
//     return false;
//   }

//   // ✅ Gmail-only validation
//   const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//   if (!emailRegex.test(formData.email)) {
//     toast.error("Please enter a valid Gmail address (example@gmail.com)");
//     return false;
//   }

//   // ✅ 10-digit Indian mobile validation
//   const phoneRegex = /^[6-9][0-9]{9}$/;
//   if (!phoneRegex.test(formData.phone)) {
//     toast.error("Please enter a valid 10-digit mobile number starting with 6-9");
//     return false;
//   }

//   // Validate password length
//   if (formData.password.length < 6) {
//     toast.error("Password must be at least 6 characters long");
//     return false;
//   }

//   return true;
// };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!validateForm()) {
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const formDataToSend = new FormData();

//       // Add all form data
//       Object.entries(formData).forEach(([key, value]) => {
//         if (key === "address") {
//           formDataToSend.append(key, JSON.stringify(value));
//         } else if (value) {
//           formDataToSend.append(key, value);
//         }
//       });

//       // Add files
//       if (files.photo) formDataToSend.append("photo", files.photo);
//       files.contractorIdProof.forEach((file, index) => {
//         if (file) formDataToSend.append(`contractorIdProof`, file);
//       });

//       const response = await axios.post(
//         `https://bulding-constraction-employee-management.onrender.com/api/contractors`,
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         toast.success("Contractor added successfully!");
//         navigate("/supervisor-dashboard/contractors");
//       } else {
//         toast.error(response.data.message || "Failed to add contractor");
//       }
//     } catch (error) {
//       console.error("Error adding contractor:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to add contractor. Please try again."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-lg-12">
//           <div className="card shadow-lg">
//             <div className="card-header bg-primary text-white">
//               <h2 className="mb-0 d-flex align-items-center">
//                 <FaUserPlus className="me-2" />
//                 Add New Contractor
//               </h2>
//             </div>
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   {/* Personal Information */}
//                   <div className="col-md-6">
//                     <h5 className="mb-3 text-primary">
//                       <FaUser className="me-2" />
//                       Personal Information
//                     </h5>

//                     <div className="mb-3">
//                       <label className="form-label">Full Name*</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label">Email*</label>
//                       <input
//                         type="email"
//                         className="form-control"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label">Password*</label>
//                       <input
//                         type="password"
//                         className="form-control"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleInputChange}
//                         required
//                         minLength="6"
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label">Gender</label>
//                       <select
//                         className="form-control"
//                         name="gender"
//                         value={formData.gender}
//                         onChange={handleInputChange}
//                       >
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                   </div>

//                   {/* Contact Information */}
//                   <div className="col-md-6">
//                     <h5 className="mb-3 text-primary">
//                       <FaPhone className="me-2" />
//                       Contact Information
//                     </h5>

//                     <div className="mb-3">
//                       <label className="form-label">Phone*</label>
//                       <input
//                         type="tel"
//                         className="form-control"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         required
//                         pattern="[0-9]{10,15}"
//                         title="Phone number should be 10-15 digits"
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label">Alternate Phone</label>
//                       <input
//                         type="tel"
//                         className="form-control"
//                         name="alternatePhone"
//                         value={formData.alternatePhone}
//                         onChange={handleInputChange}
//                         pattern="[0-9]{10,15}"
//                         title="Phone number should be 10-15 digits"
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label">Contractor Role*</label>
//                       <select
//                         className="form-control"
//                         name="contractorRole"
//                         value={formData.contractorRole}
//                         onChange={handleInputChange}
//                         required
//                       >
//                         <option value="">Select Role</option>
//                         {CONTRACTOR_ROLES.map((role) => (
//                           <option key={role} value={role}>
//                             {role}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label">Supervisor Name*</label>
//                       <select
//                         className="form-control"
//                         name="supervisorName"
//                         value={formData.supervisorName}
//                         onChange={handleInputChange}
//                         required
//                         disabled={
//                           !formData.contractorRole || loadingSupervisors
//                         }
//                       >
//                         <option value="">Select Supervisor</option>
//                         {supervisors.map((supervisor) => (
//                           <option key={supervisor._id} value={supervisor.name}>
//                             {supervisor.name} ({supervisor.supervisorType})
//                           </option>
//                         ))}
//                       </select>
//                       {loadingSupervisors && (
//                         <div className="mt-2 text-muted">
//                           <small>Loading supervisors...</small>
//                         </div>
//                       )}
//                       {!loadingSupervisors &&
//                         supervisors.length === 0 &&
//                         formData.contractorRole && (
//                           <div className="mt-2 text-warning">
//                             <small>No supervisors found for this role</small>
//                           </div>
//                         )}
//                     </div>
//                   </div>
//                 </div>

//                 <hr className="my-4" />

//                 {/* Address Information */}
//                 <div className="row">
//                   <div className="col-md-6">
//                     <h5 className="mb-3 text-primary">
//                       <FaHome className="me-2" />
//                       Address
//                     </h5>

//                     <div className="mb-3">
//                       <label className="form-label">Street</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="address.street"
//                         value={formData.address.street}
//                         onChange={handleInputChange}
//                       />
//                     </div>

//                     <div className="row">
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">City</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="address.city"
//                           value={formData.address.city}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">State</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="address.state"
//                           value={formData.address.state}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>

//                     <div className="row">
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">Country</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="address.country"
//                           value={formData.address.country}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">Postal Code</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="address.zipCode"
//                           value={formData.address.zipCode}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Employment Information */}
//                   <div className="col-md-6">
//                     <h5 className="mb-3 text-primary">
//                       <FaHardHat className="me-2" />
//                       Employment Information
//                     </h5>

//                     <div className="mb-3">
//                       <label className="form-label">Joining Date</label>
//                       <input
//                         type="date"
//                         className="form-control"
//                         name="joiningDate"
//                         value={formData.joiningDate}
//                         onChange={handleInputChange}
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label">Per Day Salary (₹)</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         name="perDaySalary"
//                         value={formData.perDaySalary}
//                         onChange={handleInputChange}
//                         min="0"
//                         step="0.01"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <hr className="my-4" />

//                 {/* Bank Information */}
//                 <div className="row">
//                   <div className="col-md-6">
//                     <h5 className="mb-3 text-primary">
//                       <FaMoneyBillWave className="me-2" />
//                       Bank Information
//                     </h5>

//                     <div className="mb-3">
//                       <label className="form-label">Bank Name</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="bankName"
//                         value={formData.bankName}
//                         onChange={handleInputChange}
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label">Account Number</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="bankAccount"
//                         value={formData.bankAccount}
//                         onChange={handleInputChange}
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label">Bank Code (IFSC)</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="bankCode"
//                         value={formData.bankCode}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                   </div>

//                   {/* Documents */}
//                   <div className="col-md-6">
//                     <h5 className="mb-3 text-primary">
//                       <FaImage className="me-2" />
//                       Photo
//                     </h5>

//                     <div className="mb-3">
//                       <label className="form-label">Contractor Photo</label>
//                       <input
//                         type="file"
//                         className="form-control"
//                         accept="image/*"
//                         onChange={(e) => handleFileChange("photo", e)}
//                       />
//                       {previews.photo && (
//                         <div className="mt-2">
//                           <img
//                             src={previews.photo}
//                             alt="Preview"
//                             className="img-thumbnail"
//                             style={{ maxWidth: "150px", maxHeight: "150px" }}
//                           />
//                         </div>
//                       )}
//                     </div>

//                     <h5 className="mb-3 text-primary">
//                       <FaIdCard className="me-2" />
//                       ID Proof Documents (Max 5)
//                     </h5>

//                     {files.contractorIdProof.map((_, index) => (
//                       <div key={index} className="mb-3">
//                         <div className="input-group">
//                           <input
//                             type="file"
//                             className="form-control"
//                             accept="image/*,.pdf"
//                             onChange={(e) =>
//                               handleFileChange("idProof", e, index)
//                             }
//                           />
//                           {index === 0 ? (
//                             <button
//                               type="button"
//                               className="btn btn-success"
//                               onClick={addIdProofField}
//                               disabled={files.contractorIdProof.length >= 5}
//                             >
//                               <FaPlus />
//                             </button>
//                           ) : (
//                             <button
//                               type="button"
//                               className="btn btn-danger"
//                               onClick={() => removeIdProofField(index)}
//                             >
//                               <FaMinus />
//                             </button>
//                           )}
//                         </div>

//                         {previews.contractorIdProof[index] && (
//                           <div className="mt-2 d-flex align-items-center">
//                             {previews.contractorIdProof[index].startsWith(
//                               "data:image"
//                             ) ? (
//                               <img
//                                 src={previews.contractorIdProof[index]}
//                                 alt={`ID Proof ${index + 1}`}
//                                 className="img-thumbnail me-2"
//                                 style={{ maxWidth: "50px", maxHeight: "50px" }}
//                               />
//                             ) : (
//                               <div
//                                 className="img-thumbnail me-2 d-flex align-items-center justify-content-center"
//                                 style={{
//                                   width: "50px",
//                                   height: "50px",
//                                   backgroundColor: "#f8f9fa",
//                                 }}
//                               >
//                                 <FaIdCard className="text-secondary" />
//                               </div>
//                             )}
//                             <span>Document {index + 1}</span>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="text-center mt-4">
//                   <button
//                     type="submit"
//                     className="btn btn-primary me-2 px-4"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <span
//                           className="spinner-border spinner-border-sm me-2"
//                           role="status"
//                           aria-hidden="true"
//                         ></span>
//                         Submitting...
//                       </>
//                     ) : (
//                       "Submit"
//                     )}
//                   </button>
//                   <Link
//                     to="/supervisor-dashboard/contractors"
//                     className="btn btn-secondary px-4"
//                   >
//                     Cancel
//                   </Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddContractor; 


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUserPlus,
  FaUser,
  FaIdCard,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaMoneyBillWave,
  FaImage,
  FaPlus,
  FaMinus,
  FaVenusMars,
  FaGlobe,
  FaHardHat,
  FaBuilding,
  FaRupeeSign,
  FaSave,
  FaArrowLeft,
  FaMapMarkerAlt
} from "react-icons/fa";
import styled from "styled-components";

const CONTRACTOR_ROLES = [
  "Centering Contractor",
  "Steel Contractor",
  "Mason Contractor",
  "Carpenter Contractor",
  "Plumber Contractor",
  "Electrician Contractor",
  "Painter Contractor",
  "Tiles Contractor",
];

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

const PhotoSection = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 1.5rem;
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

const PhotoPreview = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 5px solid white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: all 0.3s;

  @media (min-width: 768px) {
    width: 150px;
    height: 150px;
  }

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .default-icon {
    font-size: 3rem;
    color: #adb5bd;

    @media (min-width: 768px) {
      font-size: 4rem;
    }
  }
`;

const PhotoUploadButton = styled.label`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;

  @media (min-width: 768px) {
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 14px rgba(102, 126, 234, 0.3);
  }

  input {
    display: none;
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

const DocumentPreview = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 0.5rem;
    border: 1px solid #dee2e6;
  }

  span {
    font-size: 0.9rem;
    color: #495057;
  }
`;

const DocumentInputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  button {
    border: none;
    border-radius: 5px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;

    &:first-child {
      background-color: #28a745;
      color: white;

      &:hover {
        background-color: #218838;
      }

      &:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
      }
    }

    &:last-child {
      background-color: #dc3545;
      color: white;

      &:hover {
        background-color: #c82333;
      }
    }
  }
`;

const AddContractor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "Male",
    phone: "",
    alternatePhone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
    },
    joiningDate: "",
    bankName: "State Bank of India",
    bankAccount: "",
    bankCode: "",
    password: "",
    perDaySalary: "",
    contractorRole: "",
    supervisorName: "",
  });

  const [supervisors, setSupervisors] = useState([]);
  const [loadingSupervisors, setLoadingSupervisors] = useState(false);
  const [files, setFiles] = useState({
    photo: null,
    contractorIdProof: [],
  });
  const [previews, setPreviews] = useState({
    photo: null,
    contractorIdProof: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedInSupervisor, setLoggedInSupervisor] = useState(null);

  // Fetch logged-in supervisor info when component mounts
  useEffect(() => {
    const fetchLoggedInSupervisor = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          "https://bulding-constraction-employee-management.onrender.com/api/supervisors/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setLoggedInSupervisor(response.data.data);
          // Auto-fill supervisor name if supervisor is logged in
          setFormData(prev => ({
            ...prev,
            supervisorName: response.data.data.name
          }));
        }
      } catch (error) {
        console.error("Error fetching logged-in supervisor:", error);
      }
    };

    fetchLoggedInSupervisor();
  }, []);

  // Fetch supervisors when contractor role changes
  useEffect(() => {
    const fetchSupervisors = async () => {
      if (!formData.contractorRole) {
        setSupervisors([]);
        return;
      }

      try {
        setLoadingSupervisors(true);
        const response = await axios.get(
          `https://bulding-constraction-employee-management.onrender.com/api/supervisors/role/${encodeURIComponent(
            formData.contractorRole
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setSupervisors(response.data.data);
        } else {
          toast.error(response.data.message || "Failed to fetch supervisors");
          setSupervisors([]);
        }
      } catch (error) {
        console.error("Error fetching supervisors:", error);
        toast.error(
          error.response?.data?.message ||
            "Failed to fetch supervisors. Please try again."
        );
        setSupervisors([]);
      } finally {
        setLoadingSupervisors(false);
      }
    };

    fetchSupervisors();
  }, [formData.contractorRole]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (type, e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    if (type === "photo") {
      setFiles((prev) => ({ ...prev, photo: file }));

      const reader = new FileReader();
      reader.onload = () => {
        setPreviews((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    } else if (type === "idProof") {
      const newIdProofs = [...files.contractorIdProof];
      newIdProofs[index] = file;
      setFiles((prev) => ({ ...prev, contractorIdProof: newIdProofs }));

      const reader = new FileReader();
      reader.onload = () => {
        const newPreviews = [...previews.contractorIdProof];
        newPreviews[index] = reader.result;
        setPreviews((prev) => ({ ...prev, contractorIdProof: newPreviews }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addIdProofField = () => {
    if (files.contractorIdProof.length < 5) {
      setFiles((prev) => ({
        ...prev,
        contractorIdProof: [...prev.contractorIdProof, null],
      }));
    }
  };

  const removeIdProofField = (index) => {
    if (files.contractorIdProof.length > 1) {
      const newIdProofs = [...files.contractorIdProof];
      newIdProofs.splice(index, 1);
      setFiles((prev) => ({ ...prev, contractorIdProof: newIdProofs }));

      const newPreviews = [...previews.contractorIdProof];
      newPreviews.splice(index, 1);
      setPreviews((prev) => ({ ...prev, contractorIdProof: newPreviews }));
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "name",
      "email",
      "password",
      "phone",
      "contractorRole",
      "supervisorName",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(
        `Please fill all required fields: ${missingFields.join(", ")}`
      );
      return false;
    }

    // Gmail-only validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid Gmail address (example@gmail.com)");
      return false;
    }

    // 10-digit Indian mobile validation
    const phoneRegex = /^[6-9][0-9]{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit mobile number starting with 6-9");
      return false;
    }

    // Validate password length
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Add all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "address") {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (value) {
          formDataToSend.append(key, value);
        }
      });

      // Add files
      if (files.photo) formDataToSend.append("photo", files.photo);
      files.contractorIdProof.forEach((file, index) => {
        if (file) formDataToSend.append(`contractorIdProof`, file);
      });

      const response = await axios.post(
        `https://bulding-constraction-employee-management.onrender.com/api/contractors`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Contractor added successfully!");
        navigate("/supervisor-dashboard/contractors");
      } else {
        toast.error(response.data.message || "Failed to add contractor");
      }
    } catch (error) {
      console.error("Error adding contractor:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add contractor. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <Card>
            <CardHeader>
              <h2>
                <FaUserPlus /> Add New Contractor
              </h2>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <FormGrid>
                  {/* Personal Information */}
                  <div>
                    <FormSectionTitle>
                      <FaUser /> Personal Information
                    </FormSectionTitle>

                    <FormGroup>
                      <label className="required-field">
                        <FaUser /> Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <label className="required-field">
                        <FaEnvelope /> Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <label className="required-field">
                        <FaIdCard /> Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength="6"
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaVenusMars /> Gender
                      </label>
                      <select
                        className="form-control"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </FormGroup>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <FormSectionTitle>
                      <FaPhone /> Contact Information
                    </FormSectionTitle>

                    <FormGroup>
                      <label className="required-field">
                        <FaPhone /> Phone
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        pattern="[0-9]{10,15}"
                        title="Phone number should be 10-15 digits"
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaPhone /> Alternate Phone
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        name="alternatePhone"
                        value={formData.alternatePhone}
                        onChange={handleInputChange}
                        pattern="[0-9]{10,15}"
                        title="Phone number should be 10-15 digits"
                      />
                    </FormGroup>

                    <FormGroup>
                      <label className="required-field">
                        <FaHardHat /> Contractor Role
                      </label>
                      <select
                        className="form-control"
                        name="contractorRole"
                        value={formData.contractorRole}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Role</option>
                        {CONTRACTOR_ROLES.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </FormGroup>

                    <FormGroup>
                      <label className="required-field">
                        <FaUser /> Supervisor Name
                      </label>
                      <select
                        className="form-control"
                        name="supervisorName"
                        value={formData.supervisorName}
                        onChange={handleInputChange}
                        required
                        disabled={
                          !formData.contractorRole || loadingSupervisors || loggedInSupervisor
                        }
                      >
                        {loggedInSupervisor ? (
                          <option value={loggedInSupervisor.name}>
                            {loggedInSupervisor.name} ({loggedInSupervisor.supervisorType})
                          </option>
                        ) : (
                          <>
                            <option value="">Select Supervisor</option>
                            {supervisors.map((supervisor) => (
                              <option key={supervisor._id} value={supervisor.name}>
                                {supervisor.name} ({supervisor.supervisorType})
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                      {loadingSupervisors && (
                        <div className="mt-2 text-muted">
                          <small>Loading supervisors...</small>
                        </div>
                      )}
                      {!loadingSupervisors &&
                        supervisors.length === 0 &&
                        formData.contractorRole && (
                          <div className="mt-2 text-warning">
                            <small>No supervisors found for this role</small>
                          </div>
                        )}
                    </FormGroup>
                  </div>
                </FormGrid>

                <Divider />

                <FormGrid>
                  {/* Address Information */}
                  <div>
                    <FormSectionTitle>
                      <FaHome /> Address
                    </FormSectionTitle>

                    <FormGroup>
                      <label>
                        <FaMapMarkerAlt /> Street
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleInputChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaMapMarkerAlt /> City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleInputChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaMapMarkerAlt /> State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleInputChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaGlobe /> Country
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="address.country"
                        value={formData.address.country}
                        onChange={handleInputChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaMapMarkerAlt /> Postal Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="address.zipCode"
                        value={formData.address.zipCode}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </div>

                  {/* Employment Information */}
                  <div>
                    <FormSectionTitle>
                      <FaHardHat /> Employment Information
                    </FormSectionTitle>

                    <FormGroup>
                      <label>
                        <FaCalendarAlt /> Joining Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleInputChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaRupeeSign /> Per Day Salary
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="perDaySalary"
                        value={formData.perDaySalary}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                      />
                    </FormGroup>
                  </div>
                </FormGrid>

                <Divider />

                <FormGrid>
                  {/* Bank Information */}
                  <div>
                    <FormSectionTitle>
                      <FaMoneyBillWave /> Bank Information
                    </FormSectionTitle>

                    <FormGroup>
                      <label>
                        <FaMoneyBillWave /> Bank Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaMoneyBillWave /> Account Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="bankAccount"
                        value={formData.bankAccount}
                        onChange={handleInputChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaIdCard /> Bank Code (IFSC)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="bankCode"
                        value={formData.bankCode}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </div>

                  {/* Documents */}
                  <div>
                    <FormSectionTitle>
                      <FaImage /> Documents
                    </FormSectionTitle>

                    <FormGroup>
                      <label>
                        <FaImage /> Contractor Photo
                      </label>
                      <PhotoUploadButton>
                        <FaImage /> Upload Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange("photo", e)}
                        />
                      </PhotoUploadButton>
                      {previews.photo && (
                        <PhotoPreview>
                          <img src={previews.photo} alt="Preview" />
                        </PhotoPreview>
                      )}
                    </FormGroup>

                    <FormSectionTitle>
                      <FaIdCard /> ID Proof Documents (Max 5)
                    </FormSectionTitle>

                    {files.contractorIdProof.map((_, index) => (
                      <FormGroup key={index}>
                        <DocumentInputGroup>
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                              handleFileChange("idProof", e, index)
                            }
                          />
                          {index === 0 ? (
                            <button
                              type="button"
                              onClick={addIdProofField}
                              disabled={files.contractorIdProof.length >= 5}
                            >
                              <FaPlus />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => removeIdProofField(index)}
                            >
                              <FaMinus />
                            </button>
                          )}
                        </DocumentInputGroup>

                        {previews.contractorIdProof[index] && (
                          <DocumentPreview>
                            {previews.contractorIdProof[index].startsWith(
                              "data:image"
                            ) ? (
                              <img
                                src={previews.contractorIdProof[index]}
                                alt={`ID Proof ${index + 1}`}
                              />
                            ) : (
                              <div className="default-icon">
                                <FaIdCard />
                              </div>
                            )}
                            <span>Document {index + 1}</span>
                          </DocumentPreview>
                        )}
                      </FormGroup>
                    ))}
                  </div>
                </FormGrid>

                <ActionButtons>
                  <SecondaryButton to="/supervisor-dashboard/contractors">
                    <FaArrowLeft /> Back
                  </SecondaryButton>
                  <PrimaryButton type="submit" disabled={isSubmitting}>
                    <FaSave /> {isSubmitting ? "Submitting..." : "Submit"}
                  </PrimaryButton>
                </ActionButtons>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default AddContractor;