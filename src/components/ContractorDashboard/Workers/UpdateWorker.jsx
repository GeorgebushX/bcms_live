// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "../../../context/authContext";
// import "bootstrap/dist/css/bootstrap.min.css";

// // ✅ Common sub roles for all worker roles
// const commonSubRoles = ["Fitter", "Helper", "Temporary Worker"];

// const subRolesMap = {
//   "Centering Worker": commonSubRoles,
//   "Steel Worker": commonSubRoles,
//   "Mason Worker": commonSubRoles,
//   "Carpenter Worker": commonSubRoles,
//   "Plumber Worker": commonSubRoles,
//   "Electrician Worker": commonSubRoles,
//   "Painter Worker": commonSubRoles,
//   "Tiles Worker": commonSubRoles,
// };

// // ✅ Format date for HTML date input
// const formatForInputDate = (dateStr) => {
//   if (!dateStr) return "";
//   const date = new Date(dateStr);
//   return isNaN(date) ? "" : date.toISOString().split("T")[0];
// };

// const UpdateWorker = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { user } = useAuth();

//   const required = [
//     "name",
//     "email",
//     "gender",
//     "phone",
//     "joiningDate",
//     "perDaySalary",
//     "workerRole",
//     "workerSubRole",
//   ];

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     gender: "",
//     phone: "",
//     alternatePhone: "",
//     dateOfBirth: "",
//     joiningDate: "",
//     perDaySalary: "",
//     workerRole: "",
//     workerSubRole: "",
//     contractor: "",
//     contractorName: "",
//     address: {
//       street: "",
//       city: "",
//       state: "",
//       zipCode: "",
//       country: "",
//     },
//     bankName: "",
//     bankAccount: "",
//     bankCode: "",
//     photo: null,
//   });

//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch existing worker details
//   useEffect(() => {
//     if (!user || !user._id) return;

//     const fetchWorker = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `https://bulding-constraction-employee-management.onrender.com/api/workers/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         const workerData =
//           res.data?.worker || res.data?.data || res.data || null;

//         if (res.data?.success && workerData?._id) {
//           setFormData({
//             name: workerData.name || "",
//             email: workerData.email || "",
//             password: "",
//             gender: workerData.gender || "",
//             phone: workerData.phone || "",
//             alternatePhone: workerData.alternatePhone || "",
//             dateOfBirth: formatForInputDate(workerData.dateOfBirth),
//             joiningDate: formatForInputDate(workerData.joiningDate),
//             perDaySalary: workerData.perDaySalary || "",
//             workerRole: workerData.workerRole || "",
//             workerSubRole: workerData.workerSubRole || "",
//             contractor: user._id,
//             contractorName: user.name || "",
//             address: {
//               street: workerData.address?.street || "",
//               city: workerData.address?.city || "",
//               state: workerData.address?.state || "",
//               zipCode: workerData.address?.zipCode || "",
//               country: workerData.address?.country || "",
//             },
//             bankName: workerData.bankName || "",
//             bankAccount: workerData.bankAccount || "",
//             bankCode: workerData.bankCode || "",
//             photo: null,
//           });
//         } else {
//           toast.error("Worker details not found");
//         }
//       } catch (err) {
//         toast.error("Failed to load worker details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWorker();
//   }, [id, user]);

//   // ✅ Handle field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith("address.")) {
//       const key = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         address: { ...prev.address, [key]: value },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//         ...(name === "workerRole" ? { workerSubRole: "" } : {}),
//       }));
//     }
//   };

//   // ✅ Handle file change
//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
//     }
//   };

//   // ✅ Email validation
//   const validateEmail = (email) =>
//     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

//   // ✅ Phone validation
//   const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

//   // ✅ Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const missing = required.find((field) => !formData[field]);
//     if (missing) return toast.error(`Please fill required: ${missing}`);

//     if (!validateEmail(formData.email))
//       return toast.error("Please enter a valid email address");
//     if (!validatePhone(formData.phone))
//       return toast.error("Please enter a valid 10-digit phone number");

//     try {
//       const payload = new FormData();

//       payload.append("name", formData.name);
//       payload.append("email", formData.email);
//       if (formData.password) payload.append("password", formData.password);
//       payload.append("gender", formData.gender);
//       payload.append("phone", formData.phone);
//       payload.append("alternatePhone", formData.alternatePhone || "");
//       payload.append("dateOfBirth", formData.dateOfBirth || "");
//       payload.append("joiningDate", formData.joiningDate || "");
//       payload.append("perDaySalary", parseFloat(formData.perDaySalary));
//       payload.append("workerRole", formData.workerRole);
//       payload.append("workerSubRole", formData.workerSubRole);
//       payload.append("contractor", formData.contractor);
//       payload.append("contractorName", formData.contractorName);

//       Object.entries(formData.address).forEach(([key, value]) => {
//         payload.append(`address.${key}`, value || "");
//       });

//       payload.append("bankName", formData.bankName || "");
//       payload.append("bankAccount", formData.bankAccount || "");
//       payload.append("bankCode", formData.bankCode || "");

//       if (formData.photo) payload.append("photo", formData.photo);

//       const res = await axios.put(
//         `https://bulding-constraction-employee-management.onrender.com/api/workers/${id}`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success("✅ Worker updated successfully!");
//         navigate("/contractor-dashboard/workers");
//       } else {
//         toast.error("❌ Update failed: " + (res.data.message || ""));
//       }
//     } catch (err) {
//       const msg = err.response?.data?.message || err.message;
//       toast.error("Error: " + msg);
//     }
//   };

//   const availableSubRoles = subRolesMap[formData.workerRole] || [];

//   if (loading) {
//     return (
//       <div className="container py-5 text-center">
//         <div className="spinner-border text-primary" role="status" />
//         <p className="mt-3">Loading worker details...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-4">
//       <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
//         <button
//           className="btn btn-outline-secondary mb-2"
//           onClick={() => navigate("/contractor-dashboard/workers")}
//         >
//           ← Back
//         </button>
//         <h3 className="text-primary fw-bold mb-2 text-center flex-grow-1">
//           ✏️ Update Worker
//         </h3>
//         <div />
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//         noValidate
//         className="row"
//       >
//         <div className="col-12">
//           {/* Worker Details */}
//           <div className="bg-light shadow-sm rounded-4 p-4 mb-4">
//             <h5 className="fw-semibold text-primary mb-3">👷 Worker Details</h5>
//             <div className="row g-3">
//               {[
//                 { label: "Name", name: "name", type: "text" },
//                 { label: "Email", name: "email", type: "email" },
//                 { label: "Phone", name: "phone", type: "text" },
//                 { label: "Alternate Phone", name: "alternatePhone", type: "text" },
//                 { label: "Password (Leave blank if unchanged)", name: "password", type: "password" },
//                 { label: "Joining Date", name: "joiningDate", type: "date" },
//                 { label: "Per Day Salary", name: "perDaySalary", type: "number" },
//               ].map((f) => (
//                 <div className="col-md-6 col-lg-4" key={f.name}>
//                   <label className="form-label">
//                     {f.label} {required.includes(f.name) && "*"}
//                   </label>
//                   <input
//                     type={f.type}
//                     name={f.name}
//                     value={formData[f.name] || ""}
//                     onChange={handleChange}
//                     className="form-control"
//                     required={required.includes(f.name)}
//                   />
//                 </div>
//               ))}

//               {/* Contractor Name */}
//               <div className="col-md-6 col-lg-4">
//                 <label className="form-label">Contractor Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={formData.contractorName || ""}
//                   readOnly
//                 />
//               </div>

//               {/* Worker Role */}
//               <div className="col-md-6 col-lg-4">
//                 <label className="form-label">Worker Role *</label>
//                 <select
//                   className="form-select"
//                   name="workerRole"
//                   value={formData.workerRole}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select</option>
//                   {Object.keys(subRolesMap).map((role) => (
//                     <option key={role} value={role}>
//                       {role}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Worker Sub Role */}
//               <div className="col-md-6 col-lg-4">
//                 <label className="form-label">Worker Sub Role *</label>
//                 <select
//                   className="form-select"
//                   name="workerSubRole"
//                   value={formData.workerSubRole}
//                   onChange={handleChange}
//                   required
//                   disabled={!formData.workerRole}
//                 >
//                   <option value="">Select Sub Role</option>
//                   {availableSubRoles.map((sub) => (
//                     <option key={sub} value={sub}>
//                       {sub}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Personal */}
//           <div className="bg-light shadow-sm rounded-4 p-4 mb-4">
//             <h5 className="fw-semibold text-primary mb-3">🧍 Personal</h5>
//             <div className="row g-3">
//               <div className="col-md-6 col-lg-4">
//                 <label className="form-label">Date of Birth</label>
//                 <input
//                   type="date"
//                   name="dateOfBirth"
//                   value={formData.dateOfBirth}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-md-6 col-lg-4">
//                 <label className="form-label">Gender *</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   className="form-select"
//                   required
//                 >
//                   <option value="">Select</option>
//                   <option>Male</option>
//                   <option>Female</option>
//                   <option>Other</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Address */}
//           <div className="bg-light shadow-sm rounded-4 p-4 mb-4">
//             <h5 className="fw-semibold text-primary mb-3">🏠 Address</h5>
//             <div className="row g-3">
//               {["street", "city", "state", "zipCode", "country"].map((field) => (
//                 <div className="col-md-6 col-lg-4" key={field}>
//                   <label className="form-label">
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>
//                   <input
//                     type="text"
//                     name={`address.${field}`}
//                     value={formData.address[field] || ""}
//                     onChange={handleChange}
//                     className="form-control"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Bank */}
//           <div className="bg-light shadow-sm rounded-4 p-4 mb-4">
//             <h5 className="fw-semibold text-primary mb-3">🏦 Bank</h5>
//             <div className="row g-3">
//               {[
//                 { label: "Bank Name", name: "bankName" },
//                 { label: "Bank Account", name: "bankAccount" },
//                 { label: "Bank Code", name: "bankCode" },
//               ].map((f) => (
//                 <div className="col-md-6 col-lg-4" key={f.name}>
//                   <label className="form-label">{f.label}</label>
//                   <input
//                     type="text"
//                     name={f.name}
//                     value={formData[f.name] || ""}
//                     onChange={handleChange}
//                     className="form-control"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Photo Upload */}
//           <div className="bg-light shadow-sm rounded-4 p-4 mb-4">
//             <h5 className="fw-semibold text-primary mb-3">📸 Photo</h5>
//             <input
//               type="file"
//               name="photo"
//               accept="image/*"
//               className="form-control"
//               onChange={handleFileChange}
//             />
//           </div>

//           <div className="text-center">
//             <button className="btn btn-success px-5 py-2 rounded-3 shadow">
//               💾 Update Worker
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateWorker;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import {
  FaUser,
  FaIdCard,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaBuilding,
  FaMoneyBillWave,
  FaImage,
  FaSave,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaEdit
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
  border-bottom: 2px solid #f1f1f1);
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

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1rem;

  .spinner {
    width: 3rem;
    height: 3rem;
    border: 0.25em solid rgba(102, 126, 234, 0.2);
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Worker roles with sub roles
const commonSubRoles = ["Fitter", "Helper", "Temporary Worker"];

const subRolesMap = {
  "Centering Worker": commonSubRoles,
  "Steel Worker": commonSubRoles,
  "Mason Worker": commonSubRoles,
  "Carpenter Worker": commonSubRoles,
  "Plumber Worker": commonSubRoles,
  "Electrician Worker": commonSubRoles,
  "Painter Worker": commonSubRoles,
  "Tiles Worker": commonSubRoles,
};

// Format date for HTML date input
const formatForInputDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return isNaN(date) ? "" : date.toISOString().split("T")[0];
};

const UpdateWorker = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const required = [
    "name",
    "email",
    "gender",
    "phone",
    "joiningDate",
    "perDaySalary",
    "workerRole",
    "workerSubRole",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    alternatePhone: "",
    dateOfBirth: "",
    joiningDate: "",
    perDaySalary: "",
    workerRole: "",
    workerSubRole: "",
    contractor: "",
    contractorName: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    bankName: "",
    bankAccount: "",
    bankCode: "",
    photo: null,
  });

  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch existing worker details
  useEffect(() => {
    if (!user || !user._id) return;

    const fetchWorker = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://bulding-constraction-employee-management.onrender.com/api/workers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const workerData =
          res.data?.worker || res.data?.data || res.data || null;

        if (res.data?.success && workerData?._id) {
          setFormData({
            name: workerData.name || "",
            email: workerData.email || "",
            password: "",
            gender: workerData.gender || "",
            phone: workerData.phone || "",
            alternatePhone: workerData.alternatePhone || "",
            dateOfBirth: formatForInputDate(workerData.dateOfBirth),
            joiningDate: formatForInputDate(workerData.joiningDate),
            perDaySalary: workerData.perDaySalary || "",
            workerRole: workerData.workerRole || "",
            workerSubRole: workerData.workerSubRole || "",
            contractor: user._id,
            contractorName: user.name || "",
            address: {
              street: workerData.address?.street || "",
              city: workerData.address?.city || "",
              state: workerData.address?.state || "",
              zipCode: workerData.address?.zipCode || "",
              country: workerData.address?.country || "",
            },
            bankName: workerData.bankName || "",
            bankAccount: workerData.bankAccount || "",
            bankCode: workerData.bankCode || "",
            photo: null,
          });

          if (workerData.photoUrl) {
            setPreviewImage(workerData.photoUrl);
          }
        } else {
          toast.error("Worker details not found");
        }
      } catch (err) {
        toast.error("Failed to load worker details");
      } finally {
        setLoading(false);
      }
    };

    fetchWorker();
  }, [id, user]);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "workerRole" ? { workerSubRole: "" } : {}),
      }));
    }
  };

  // Handle file change
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, photo: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Email validation
  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  // Phone validation
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const missing = required.find((field) => !formData[field]);
    if (missing) {
      toast.error(`Please fill required: ${missing}`);
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (!validatePhone(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("email", formData.email);
      if (formData.password) payload.append("password", formData.password);
      payload.append("gender", formData.gender);
      payload.append("phone", formData.phone);
      payload.append("alternatePhone", formData.alternatePhone || "");
      payload.append("dateOfBirth", formData.dateOfBirth || "");
      payload.append("joiningDate", formData.joiningDate || "");
      payload.append("perDaySalary", parseFloat(formData.perDaySalary));
      payload.append("workerRole", formData.workerRole);
      payload.append("workerSubRole", formData.workerSubRole);
      payload.append("contractor", formData.contractor);
      payload.append("contractorName", formData.contractorName);

      Object.entries(formData.address).forEach(([key, value]) => {
        payload.append(`address.${key}`, value || "");
      });

      payload.append("bankName", formData.bankName || "");
      payload.append("bankAccount", formData.bankAccount || "");
      payload.append("bankCode", formData.bankCode || "");

      if (formData.photo) payload.append("photo", formData.photo);

      const res = await axios.put(
        `https://bulding-constraction-employee-management.onrender.com/api/workers/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("✅ Worker updated successfully!");
        navigate("/contractor-dashboard/workers");
      } else {
        toast.error("❌ Update failed: " + (res.data.message || ""));
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error("Error: " + msg);
    }
  };

  const availableSubRoles = subRolesMap[formData.workerRole] || [];

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div className="spinner"></div>
          <p>Loading worker details...</p>
        </LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <Card>
            <CardHeader>
              <h2>
                <FaEdit /> Update Worker
              </h2>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <FormGrid>
                  {/* Worker Details */}
                  <div>
                    <FormSectionTitle>
                      <FaUser /> Worker Details
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        required
                        autoComplete="off"
                      />
                    </FormGroup>

                    <FormGroup>
                      <label className="required-field">
                        <FaPhone /> Phone
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
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
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaIdCard /> Password (Leave blank if unchanged)
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        minLength="6"
                        autoComplete="new-password"
                      />
                    </FormGroup>
                  </div>

                  {/* Employment Information */}
                  <div>
                    <FormSectionTitle>
                      <FaBuilding /> Employment Information
                    </FormSectionTitle>

                    <FormGroup>
                      <label>
                        <FaUser /> Contractor Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.contractorName || ""}
                        readOnly
                      />
                    </FormGroup>

                    <FormGroup>
                      <label className="required-field">
                        <FaUser /> Worker Role
                      </label>
                      <select
                        className="form-control"
                        name="workerRole"
                        value={formData.workerRole}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Role</option>
                        {Object.keys(subRolesMap).map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </FormGroup>

                    <FormGroup>
                      <label className="required-field">
                        <FaUser /> Worker Sub Role
                      </label>
                      <select
                        className="form-control"
                        name="workerSubRole"
                        value={formData.workerSubRole}
                        onChange={handleChange}
                        required
                        disabled={!formData.workerRole}
                      >
                        <option value="">Select Sub Role</option>
                        {availableSubRoles.map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </FormGroup>

                    <FormGroup>
                      <label className="required-field">
                        <FaMoneyBillWave /> Per Day Salary
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="perDaySalary"
                        value={formData.perDaySalary}
                        onChange={handleChange}
                        required
                        min="0"
                      />
                    </FormGroup>

                    <FormGroup>
                      <label className="required-field">
                        <FaCalendarAlt /> Joining Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </div>
                </FormGrid>

                <Divider />

                <FormGrid>
                  {/* Personal Details */}
                  <div>
                    <FormSectionTitle>
                      <FaUser /> Personal Details
                    </FormSectionTitle>

                    <FormGroup>
                      <label>
                        <FaCalendarAlt /> Date of Birth
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label className="required-field">
                        <FaUser /> Gender
                      </label>
                      <select
                        className="form-control"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </FormGroup>
                  </div>

                  {/* Address */}
                  <div>
                    <FormSectionTitle>
                      <FaHome /> Address
                    </FormSectionTitle>

                    {["street", "city", "state", "zipCode", "country"].map((field) => (
                      <FormGroup key={field}>
                        <label>
                          <FaMapMarkerAlt />{" "}
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name={`address.${field}`}
                          value={formData.address[field]}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    ))}
                  </div>
                </FormGrid>

                <Divider />

                <FormGrid>
                  {/* Bank Details */}
                  <div>
                    <FormSectionTitle>
                      <FaMoneyBillWave /> Bank Details
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
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaMoneyBillWave /> Bank Account Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="bankAccount"
                        value={formData.bankAccount}
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaIdCard /> Bank Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="bankCode"
                        value={formData.bankCode}
                        onChange={handleChange}
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
                        <FaImage /> Worker Photo
                      </label>
                      <PhotoUploadButton>
                        <FaImage /> Upload Photo
                        <input
                          type="file"
                          name="photo"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </PhotoUploadButton>
                      {previewImage && (
                        <PhotoPreview>
                          <img src={previewImage} alt="Preview" />
                        </PhotoPreview>
                      )}
                    </FormGroup>
                  </div>
                </FormGrid>

                <ActionButtons>
                  <SecondaryButton to="/contractor-dashboard/workers">
                    <FaArrowLeft /> Back
                  </SecondaryButton>
                  <PrimaryButton type="submit">
                    <FaSave /> Update Worker
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

export default UpdateWorker;