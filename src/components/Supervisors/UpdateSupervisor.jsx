// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate, useParams } from "react-router-dom";

// const UpdateSupervisor = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [sites, setSites] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     alternatePhone: "",
//     gender: "",
//     dateOfBirth: "",
//     password: "",
//     joiningDate: "",
//     supervisorType: "",
//     perDaySalary: "",
//     site: "",
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
//     supervisorIdProof: [],
//   });

//   // Convert date to YYYY-MM-DD for HTML date input
//   const convertToYMD = (input) => {
//     if (!input) return "";
//     if (input.includes("/")) {
//       const [d, m, y] = input.split("/");
//       return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
//     }
//     return input;
//   };

//   // Email & phone validation functions
//   const validateEmail = (email) =>
//     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email.trim());

//   const validatePhone = (phone) => /^[0-9]{10}$/.test(phone.trim());

//   useEffect(() => {
//     fetchSites();
//     fetchSupervisor();
//   }, [id]);

//   const fetchSites = async () => {
//     try {
//       const res = await axios.get(
//         "https://bulding-constraction-employee-management.onrender.com/api/site",
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );
//       if (res.data.success) setSites(res.data.data);
//       else toast.error("Failed to load sites");
//     } catch (err) {
//       toast.error("Error fetching sites");
//     }
//   };

//   const fetchSupervisor = async () => {
//     try {
//       const res = await axios.get(
//         `https://bulding-constraction-employee-management.onrender.com/api/supervisors/${id}`,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );
//       if (res.data.success) {
//         const s = res.data.data;
//         setFormData({
//           name: s.name || "",
//           email: s.email || "",
//           phone: s.phone || "",
//           alternatePhone: s.alternatePhone || "",
//           gender: s.gender || "",
//           dateOfBirth: convertToYMD(s.dateOfBirth),
//           password: "",
//           joiningDate: convertToYMD(s.joiningDate),
//           supervisorType: s.supervisorType || "",
//           perDaySalary: s.perDaySalary || "",
//           site: s.site?.siteName || "",
//           address: {
//             street: s.address?.street || "",
//             city: s.address?.city || "",
//             state: s.address?.state || "",
//             zipCode: s.address?.zipCode || "",
//             country: s.address?.country || "",
//           },
//           bankName: s.bankName || "",
//           bankAccount: s.bankAccount || "",
//           bankCode: s.bankCode || "",
//           photo: null,
//           supervisorIdProof: [],
//         });
//       } else toast.error("Failed to fetch supervisor data");
//     } catch (err) {
//       toast.error("Error fetching supervisor: " + err.message);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith("address.")) {
//       const key = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         address: { ...prev.address, [key]: value },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     if (name === "photo") {
//       setFormData((prev) => ({ ...prev, photo: files[0] }));
//     } else if (name === "supervisorIdProof") {
//       setFormData((prev) => ({
//         ...prev,
//         supervisorIdProof: Array.from(files),
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Email validation
//     if (!validateEmail(formData.email)) {
//       return toast.error("Please enter a valid email (e.g., john@gmail.com)");
//     }

//     // Phone validation
//     if (!validatePhone(formData.phone)) {
//       return toast.error("Please enter a valid 10-digit phone number");
//     }

//     const requiredFields = [
//       "name",
//       "email",
//       "phone",
//       "joiningDate",
//       "gender",
//       "supervisorType",
//       "perDaySalary",
//     ];
//     const missing = requiredFields.find((field) => !formData[field]);
//     if (missing) return toast.error("Please fill in all required fields");

//     try {
//       setLoading(true);
//       const payload = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (key === "address") {
//           Object.entries(value).forEach(([k, v]) => {
//             if (v) payload.append(`address[${k}]`, v);
//           });
//         } else if (key === "password") {
//           if (value) payload.append("password", value);
//         } else if (key === "photo" && value instanceof File) {
//           payload.append("photo", value);
//         } else if (key === "supervisorIdProof" && Array.isArray(value)) {
//           value.forEach((file) => payload.append("supervisorIdProof", file));
//         } else {
//           payload.append(key, value);
//         }
//       });

//       const res = await axios.put(
//         `https://bulding-constraction-employee-management.onrender.com/api/supervisors/${id}`,
//         payload,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success("✅ Supervisor updated successfully!");
//         navigate("/engineer-dashboard/supervisors");
//       } else {
//         toast.error("❌ Failed to update supervisor");
//       }
//     } catch (err) {
//       toast.error("❌ Error: " + (err.response?.data?.message || err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-4">
//       <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
//         <button
//           className="btn btn-outline-secondary mb-3 mb-md-0"
//           onClick={() => navigate("/engineer-dashboard/supervisors")}
//         >
//           ← Back
//         </button>
//         <h3 className="fw-bold text-primary text-center mb-0">
//           ✏️ Update Supervisor
//         </h3>
//         <div></div>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//         className="needs-validation"
//         noValidate
//       >
//         {/* Supervisor Details */}
//         <div className="bg-light shadow-sm rounded-4 p-4 mb-4">
//           <h5 className="fw-semibold text-primary mb-3">
//             👷 Supervisor Details
//           </h5>
//           <div className="row g-3">
//             {[
//               { label: "Name", name: "name" },
//               { label: "Email", name: "email", type: "email" },
//               { label: "Phone", name: "phone" },
//               { label: "Alternate Phone", name: "alternatePhone" },
//               { label: "Joining Date", name: "joiningDate", type: "date" },
//               { label: "Per Day Salary", name: "perDaySalary", type: "number" },
//             ].map(({ label, name, type = "text" }) => (
//               <div className="col-12 col-md-6 col-lg-4" key={name}>
//                 <label className="form-label">{label}</label>
//                 <input
//                   className="form-control"
//                   name={name}
//                   type={type}
//                   value={formData[name]}
//                   onChange={handleChange}
//                   required={["name", "email", "phone", "joiningDate", "perDaySalary"].includes(name)}
//                 />
//               </div>
//             ))}

//             <div className="col-12 col-md-6 col-lg-4">
//               <label className="form-label">Supervisor Type</label>
//               <select
//                 className="form-select"
//                 name="supervisorType"
//                 value={formData.supervisorType}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select</option>
//                 <option>Centering Supervisor</option>
//                 <option>Steel Supervisor</option>
//                 <option>Mason Supervisor</option>
//                 <option>Carpenter Supervisor</option>
//                 <option>Plumber Supervisor</option>
//                 <option>Electrician Supervisor</option>
//                 <option>Painter Supervisor</option>
//                 <option>Tiles Supervisor</option>
//               </select>
//             </div>

//             <div className="col-12 col-md-6 col-lg-4">
//               <label className="form-label">Site</label>
//               <select
//                 className="form-select"
//                 name="site"
//                 value={formData.site}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Site</option>
//                 {sites.map((site) => (
//                   <option key={site._id} value={site.siteName}>
//                     {site.siteName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Personal Details */}
//         <div className="bg-light shadow-sm rounded-4 p-4 mb-4">
//           <h5 className="fw-semibold text-primary mb-3">🧍 Personal Details</h5>
//           <div className="row g-3">
//             <div className="col-12 col-md-6 col-lg-4">
//               <label className="form-label">Date of Birth</label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 className="form-control"
//                 value={formData.dateOfBirth}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-12 col-md-6 col-lg-4">
//               <label className="form-label">Gender</label>
//               <select
//                 name="gender"
//                 className="form-select"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select</option>
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Other</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Address */}
//         <div className="bg-light shadow-sm rounded-4 p-4 mb-4">
//           <h5 className="fw-semibold text-primary mb-3">🏠 Address</h5>
//           <div className="row g-3">
//             {["street", "city", "state", "zipCode", "country"].map((field) => (
//               <div className="col-12 col-md-6 col-lg-4" key={field}>
//                 <label className="form-label">
//                   {field.charAt(0).toUpperCase() + field.slice(1)}
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name={`address.${field}`}
//                   value={formData.address[field]}
//                   onChange={handleChange}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bank Details */}
//         <div className="bg-light shadow-sm rounded-4 p-4 mb-4">
//           <h5 className="fw-semibold text-primary mb-3">🏦 Bank Details</h5>
//           <div className="row g-3">
//             {[
//               { label: "Bank Name", name: "bankName" },
//               { label: "Bank Account", name: "bankAccount" },
//               { label: "Bank Code", name: "bankCode" },
//             ].map((field) => (
//               <div className="col-12 col-md-6 col-lg-4" key={field.name}>
//                 <label className="form-label">{field.label}</label>
//                 <input
//                   type="text"
//                   name={field.name}
//                   className="form-control"
//                   value={formData[field.name]}
//                   onChange={handleChange}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* File Uploads */}
//         <div className="bg-light shadow-sm rounded-4 p-4 mb-4">
//           <h5 className="fw-semibold text-primary mb-3">📤 Uploads</h5>
//           <div className="row g-3">
//             <div className="col-12 col-md-6">
//               <label>Upload New Photo (optional)</label>
//               <input
//                 type="file"
//                 className="form-control"
//                 name="photo"
//                 onChange={handleFileChange}
//                 accept="image/*"
//               />
//             </div>
//             <div className="col-12 col-md-6">
//               <label>Upload ID Proofs (optional)</label>
//               <input
//                 type="file"
//                 className="form-control"
//                 name="supervisorIdProof"
//                 onChange={handleFileChange}
//                 accept=".pdf,image/*"
//                 multiple
//               />
//             </div>
//           </div>
//         </div>

//         {/* Password */}
//         <div className="bg-light shadow-sm rounded-4 p-4 mb-4">
//           <label>New Password (optional)</label>
//           <input
//             type="password"
//             className="form-control"
//             name="password"
//             value={formData.password}
//             placeholder="Leave blank to retain existing password"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="text-center">
//           <button
//             type="submit"
//             className="btn btn-success px-5 py-2 rounded-3 shadow"
//             disabled={loading}
//           >
//             {loading ? "Updating..." : "✅ Update Supervisor"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateSupervisor;




import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
  FaBuilding,
  FaMoneyBillWave,
  FaImage,
  FaSave,
  FaArrowLeft,
  FaMapMarkerAlt
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

const UpdateSupervisor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    alternatePhone: "",
    gender: "",
    dateOfBirth: "",
    password: "",
    joiningDate: "",
    supervisorType: "",
    perDaySalary: "",
    site: "",
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
    supervisorIdProof: [],
  });

  // Convert date to YYYY-MM-DD for HTML date input
  const convertToYMD = (input) => {
    if (!input) return "";
    if (input.includes("/")) {
      const [d, m, y] = input.split("/");
      return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
    return input;
  };

  // Email & phone validation functions
  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email.trim());

  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone.trim());

  useEffect(() => {
    fetchSites();
    fetchSupervisor();
  }, [id]);

  const fetchSites = async () => {
    try {
      const res = await axios.get(
        "https://bulding-constraction-employee-management.onrender.com/api/site",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.data.success) setSites(res.data.data);
      else toast.error("Failed to load sites");
    } catch (err) {
      toast.error("Error fetching sites");
    }
  };

  const fetchSupervisor = async () => {
    try {
      const res = await axios.get(
        `https://bulding-constraction-employee-management.onrender.com/api/supervisors/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.data.success) {
        const s = res.data.data;
        setFormData({
          name: s.name || "",
          email: s.email || "",
          phone: s.phone || "",
          alternatePhone: s.alternatePhone || "",
          gender: s.gender || "",
          dateOfBirth: convertToYMD(s.dateOfBirth),
          password: "",
          joiningDate: convertToYMD(s.joiningDate),
          supervisorType: s.supervisorType || "",
          perDaySalary: s.perDaySalary || "",
          site: s.site?.siteName || "",
          address: {
            street: s.address?.street || "",
            city: s.address?.city || "",
            state: s.address?.state || "",
            zipCode: s.address?.zipCode || "",
            country: s.address?.country || "",
          },
          bankName: s.bankName || "",
          bankAccount: s.bankAccount || "",
          bankCode: s.bankCode || "",
          photo: null,
          supervisorIdProof: [],
        });
      } else toast.error("Failed to fetch supervisor data");
    } catch (err) {
      toast.error("Error fetching supervisor: " + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "photo") {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
      } else {
        setPreviewImage(null);
      }
    } else if (name === "supervisorIdProof") {
      setFormData((prev) => ({
        ...prev,
        supervisorIdProof: Array.from(files),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    if (!validateEmail(formData.email)) {
      return toast.error("Please enter a valid email (e.g., john@gmail.com)");
    }

    // Phone validation
    if (!validatePhone(formData.phone)) {
      return toast.error("Please enter a valid 10-digit phone number");
    }

    const requiredFields = [
      "name",
      "email",
      "phone",
      "joiningDate",
      "gender",
      "supervisorType",
      "perDaySalary",
    ];
    const missing = requiredFields.find((field) => !formData[field]);
    if (missing) return toast.error("Please fill in all required fields");

    try {
      setLoading(true);
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "address") {
          Object.entries(value).forEach(([k, v]) => {
            if (v) payload.append(`address[${k}]`, v);
          });
        } else if (key === "password") {
          if (value) payload.append("password", value);
        } else if (key === "photo" && value instanceof File) {
          payload.append("photo", value);
        } else if (key === "supervisorIdProof" && Array.isArray(value)) {
          value.forEach((file) => payload.append("supervisorIdProof", file));
        } else {
          payload.append(key, value);
        }
      });

      const res = await axios.put(
        `https://bulding-constraction-employee-management.onrender.com/api/supervisors/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Supervisor updated successfully!");
        navigate("/engineer-dashboard/supervisors");
      } else {
        toast.error("Failed to update supervisor");
      }
    } catch (err) {
      toast.error("Error: " + (err.response?.data?.message || err.message));
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
                <FaUserPlus /> Update Supervisor
              </h2>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <FormGrid>
                  {/* Supervisor Details */}
                  <div>
                    <FormSectionTitle>
                      <FaUser /> Supervisor Details
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
                  </div>

                  {/* Employment Information */}
                  <div>
                    <FormSectionTitle>
                      <FaBuilding /> Employment Information
                    </FormSectionTitle>

                    <FormGroup>
                      <label className="required-field">
                        <FaUser /> Supervisor Type
                      </label>
                      <select
                        className="form-control"
                        name="supervisorType"
                        value={formData.supervisorType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Type</option>
                        <option>Centering Supervisor</option>
                        <option>Steel Supervisor</option>
                        <option>Mason Supervisor</option>
                        <option>Carpenter Supervisor</option>
                        <option>Plumber Supervisor</option>
                        <option>Electrician Supervisor</option>
                        <option>Painter Supervisor</option>
                        <option>Tiles Supervisor</option>
                      </select>
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaBuilding /> Site
                      </label>
                      <select
                        className="form-control"
                        name="site"
                        value={formData.site}
                        onChange={handleChange}
                      >
                        <option value="">Select Site</option>
                        {sites.map((site) => (
                          <option key={site._id} value={site.siteName}>
                            {site.siteName}
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
                        <FaImage /> Supervisor Photo
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

                    <FormGroup>
                      <label>
                        <FaIdCard /> ID Proof Documents
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        name="supervisorIdProof"
                        onChange={handleFileChange}
                        accept=".pdf,image/*"
                        multiple
                      />
                    </FormGroup>
                  </div>
                </FormGrid>

                <Divider />

                {/* Password */}
                <FormGrid>
                  <div>
                    <FormSectionTitle>
                      <FaIdCard /> Password Update
                    </FormSectionTitle>
                    <FormGroup>
                      <label>
                        <FaIdCard /> New Password (optional)
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        placeholder="Leave blank to retain existing password"
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </div>
                </FormGrid>

                <ActionButtons>
                  <SecondaryButton to="/engineer-dashboard/supervisors">
                    <FaArrowLeft /> Back
                  </SecondaryButton>
                  <PrimaryButton type="submit" disabled={loading}>
                    <FaSave /> {loading ? "Updating..." : "Update Supervisor"}
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

export default UpdateSupervisor;