// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import { FaEdit } from "react-icons/fa";

// // const UpdateClient = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     contactPerson: "",
// //     gender: "",
// //     email: "",
// //     phone: "",
// //     alternatePhone: "",
// //     address: "",
// //     permanentAddress: "",
// //     nationality: "",
// //     organizationName: "",
// //     contactPersonPhone: "",
// //     contactPersonAddress: "",
// //     startdate: "",
// //     photo: null,
// //   });

// //   useEffect(() => {
// //     const fetchClient = async () => {
// //       try {
// //         const res = await axios.get(
// //           `https://bulding-constraction-employee-management.onrender.com/api/clients/${id}`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${localStorage.getItem("token")}`,
// //             },
// //           }
// //         );
// //         if (res.data.success) {
// //           const data = res.data.data;
// //           const startdate = data.startdate
// //             ? data.startdate.split("/").reverse().join("-")
// //             : "";

// //           setFormData({
// //             name: data.name || "",
// //             contactPerson: data.contactPerson || "",
// //             gender: data.gender || "",
// //             email: data.email || "",
// //             phone: data.phone || "",
// //             alternatePhone: data.alternatePhone || "",
// //             address: data.address || "",
// //             permanentAddress: data.permanentAddress || "",
// //             nationality: data.nationality || "",
// //             organizationName: data.organizationName || "",
// //             contactPersonPhone: data.contactPersonPhone || "",
// //             contactPersonAddress: data.contactPersonAddress || "",
// //             startdate: startdate || "",
// //             photo: null,
// //           });
// //         } else {
// //           toast.error("Failed to fetch client data.");
// //         }
// //       } catch (error) {
// //         toast.error("Error: " + error.message);
// //       }
// //     };

// //     fetchClient();
// //   }, [id]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleFileChange = (e) => {
// //     setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
// //   };

// //   // Validation logic copied from AddClient
// //   const validateForm = () => {
// //     const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
// //     const phoneRegex = /^[0-9]{10}$/;

// //     if (!emailRegex.test(formData.email)) {
// //       toast.error("Please enter a valid Gmail address (e.g., example@gmail.com).");
// //       return false;
// //     }
// //     if (!phoneRegex.test(formData.phone)) {
// //       toast.error("Please enter a valid 10-digit phone number.");
// //       return false;
// //     }
// //     if (formData.alternatePhone && !phoneRegex.test(formData.alternatePhone)) {
// //       toast.error("Alternate phone must be 10 digits.");
// //       return false;
// //     }
// //     if (formData.contactPersonPhone && !phoneRegex.test(formData.contactPersonPhone)) {
// //       toast.error("Contact person phone must be 10 digits.");
// //       return false;
// //     }
// //     return true;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!validateForm()) return;

// //     try {
// //       const form = new FormData();
// //       for (const key in formData) {
// //         if (formData[key] !== null && formData[key] !== undefined) {
// //           if (key === "startdate") {
// //             const [yyyy, mm, dd] = formData[key].split("-");
// //             form.append(key, `${dd}/${mm}/${yyyy}`);
// //           } else {
// //             form.append(key, formData[key]);
// //           }
// //         }
// //       }

// //       const res = await axios.put(
// //         `https://bulding-constraction-employee-management.onrender.com/api/clients/${id}`,
// //         form,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //             "Content-Type": "multipart/form-data",
// //           },
// //         }
// //       );

// //       if (res.data.success) {
// //         toast.success("Client updated successfully.");
// //         navigate("/engineer-dashboard/clients");
// //       } else {
// //         toast.error("Failed to update client.");
// //       }
// //     } catch (error) {
// //       toast.error("Update error: " + error.message);
// //     }
// //   };

// //   const minDate = new Date().toISOString().split("T")[0];

// //   return (
// //     <div className="container py-4">
// //       <div className="card shadow-lg border-0 rounded-4">
// //         <div className="card-header bg-primary text-white text-center py-3">
// //           <h4 className="mb-0 fw-bold">
// //             <FaEdit className="me-2" />
// //             Update Client Information
// //           </h4>
// //         </div>
// //         <div className="card-body p-4">
// //           {/* Back Button */}
// //           <div className="mb-3">
// //             <button
// //               type="button"
// //               className="btn btn-outline-secondary btn-sm"
// //               onClick={() => navigate(-1)}
// //             >
// //               ← Back
// //             </button>
// //           </div>

// //           <form onSubmit={handleSubmit} className="row g-3" encType="multipart/form-data">
// //             {/* Personal Details */}
// //             <h6 className="text-primary fw-bold mt-3">Personal Details</h6>
// //             <div className="col-md-6">
// //               <label className="form-label">Full Name</label>
// //               <input
// //                 type="text"
// //                 name="name"
// //                 value={formData.name}
// //                 onChange={handleChange}
// //                 className="form-control"
// //                 required
// //               />
// //             </div>
// //             <div className="col-md-6">
// //               <label className="form-label">Gender</label>
// //               <select
// //                 name="gender"
// //                 value={formData.gender}
// //                 onChange={handleChange}
// //                 className="form-select"
// //                 required
// //               >
// //                 <option value="">-- Select Gender --</option>
// //                 <option value="Male">Male</option>
// //                 <option value="Female">Female</option>
// //                 <option value="Other">Other</option>
// //               </select>
// //             </div>
// //             <div className="col-md-6">
// //               <label className="form-label">Email</label>
// //               <input
// //                 type="email"
// //                 name="email"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 className="form-control"
// //                 required
// //               />
// //             </div>
// //             <div className="col-md-6">
// //               <label className="form-label">Phone</label>
// //               <input
// //                 type="text"
// //                 name="phone"
// //                 value={formData.phone}
// //                 onChange={handleChange}
// //                 className="form-control"
// //                 required
// //               />
// //             </div>
// //             <div className="col-md-6">
// //               <label className="form-label">Alternate Phone</label>
// //               <input
// //                 type="text"
// //                 name="alternatePhone"
// //                 value={formData.alternatePhone}
// //                 onChange={handleChange}
// //                 className="form-control"
// //               />
// //             </div>
// //             <div className="col-md-6">
// //               <label className="form-label">Nationality</label>
// //               <input
// //                 type="text"
// //                 name="nationality"
// //                 value={formData.nationality}
// //                 onChange={handleChange}
// //                 className="form-control"
// //                 required
// //               />
// //             </div>
// //             <div className="col-md-6">
// //               <label className="form-label">Start Date</label>
// //               <input
// //                 type="date"
// //                 name="startdate"
// //                 value={formData.startdate}
// //                 onChange={handleChange}
// //                 className="form-control"
// //                 min={minDate}
// //                 required
// //               />
// //             </div>
// //             <div className="col-md-6">
// //               <label className="form-label">Upload Photo (optional)</label>
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleFileChange}
// //                 className="form-control"
// //               />
// //             </div>

// //             {/* Address */}
// //             <h6 className="text-primary fw-bold mt-4">Address</h6>
// //             <div className="col-md-6">
// //               <label className="form-label">Current Address</label>
// //               <input
// //                 type="text"
// //                 name="address"
// //                 value={formData.address}
// //                 onChange={handleChange}
// //                 className="form-control"
// //                 required
// //               />
// //             </div>
// //             <div className="col-md-6">
// //               <label className="form-label">Permanent Address</label>
// //               <input
// //                 type="text"
// //                 name="permanentAddress"
// //                 value={formData.permanentAddress}
// //                 onChange={handleChange}
// //                 className="form-control"
// //                 required
// //               />
// //             </div>

// //             {/* Contact Person */}
// //             <h6 className="text-primary fw-bold mt-4">Contact Person</h6>
// //             <div className="col-md-6">
// //               <label className="form-label">Contact Person Name</label>
// //               <input
// //                 type="text"
// //                 name="contactPerson"
// //                 value={formData.contactPerson}
// //                 onChange={handleChange}
// //                 className="form-control"
// //                 required
// //               />
// //             </div>
// //             <div className="col-md-6">
// //               <label className="form-label">Contact Person Phone</label>
// //               <input
// //                 type="text"
// //                 name="contactPersonPhone"
// //                 value={formData.contactPersonPhone}
// //                 onChange={handleChange}
// //                 className="form-control"
// //               />
// //             </div>
// //             <div className="col-12">
// //               <label className="form-label">Contact Person Address</label>
// //               <input
// //                 type="text"
// //                 name="contactPersonAddress"
// //                 value={formData.contactPersonAddress}
// //                 onChange={handleChange}
// //                 className="form-control"
// //               />
// //             </div>

// //             {/* Organization */}
// //             <h6 className="text-primary fw-bold mt-4">Organization</h6>
// //             <div className="col-12">
// //               <label className="form-label">Organization Name</label>
// //               <input
// //                 type="text"
// //                 name="organizationName"
// //                 value={formData.organizationName}
// //                 onChange={handleChange}
// //                 className="form-control"
// //                 required
// //               />
// //             </div>

// //             {/* Buttons */}
// //             <div className="col-12 text-center mt-4">
// //               <button
// //                 type="button"
// //                 className="btn btn-outline-secondary px-4 me-3"
// //                 onClick={() => navigate("/engineer-dashboard/clients")}
// //               >
// //                 ← Back
// //               </button>
// //               <button type="submit" className="btn btn-success px-5 py-2 shadow-sm">
// //                 Update Client
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UpdateClient;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  FaUser,
  FaBuilding,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaImage,
  FaSave,
  FaArrowLeft,
  FaIdCard,
  FaGlobe,
  FaEdit,
} from "react-icons/fa";

// Styled components for custom styling
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

const UpdateClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    gender: "",
    email: "",
    phone: "",
    alternatePhone: "",
    address: "",
    permanentAddress: "",
    nationality: "",
    organizationName: "",
    contactPersonPhone: "",
    contactPersonAddress: "",
    startdate: "",
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingPhotoPath, setExistingPhotoPath] = useState("");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get(
          `https://bulding-constraction-employee-management.onrender.com/api/clients/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          const data = res.data.data;
          const startdate = data.startdate
            ? data.startdate.split("/").reverse().join("-")
            : "";

          setFormData({
            name: data.name || "",
            contactPerson: data.contactPerson || "",
            gender: data.gender || "",
            email: data.email || "",
            phone: data.phone || "",
            alternatePhone: data.alternatePhone || "",
            address: data.address || "",
            permanentAddress: data.permanentAddress || "",
            nationality: data.nationality || "",
            organizationName: data.organizationName || "",
            contactPersonPhone: data.contactPersonPhone || "",
            contactPersonAddress: data.contactPersonAddress || "",
            startdate: startdate || "",
            photo: null,
          });

          if (data.photo) {
            const photoUrl = `https://bulding-constraction-employee-management.onrender.com${data.photo}`;
            setPhotoPreview(photoUrl);
            setExistingPhotoPath(data.photo);
          }
        } else {
          toast.error("Failed to fetch client data.");
        }
      } catch (error) {
        toast.error("Error: " + error.message);
      }
    };

    fetchClient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(formData.email)) {
      toast.error(
        "Please enter a valid Gmail address (e.g., example@gmail.com)."
      );
      return false;
    }
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }
    if (formData.alternatePhone && !phoneRegex.test(formData.alternatePhone)) {
      toast.error("Alternate phone must be 10 digits.");
      return false;
    }
    if (
      formData.contactPersonPhone &&
      !phoneRegex.test(formData.contactPersonPhone)
    ) {
      toast.error("Contact person phone must be 10 digits.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const form = new FormData();

      // Append all fields except photo
      for (const key in formData) {
        if (
          key !== "photo" &&
          formData[key] !== null &&
          formData[key] !== undefined
        ) {
          if (key === "startdate") {
            const [yyyy, mm, dd] = formData[key].split("-");
            form.append(key, `${dd}/${mm}/${yyyy}`);
          } else {
            form.append(key, formData[key]);
          }
        }
      }

      // Only append photo if a new one was selected
      if (formData.photo instanceof File) {
        form.append("photo", formData.photo);
      } else if (!formData.photo && existingPhotoPath) {
        // If no new photo but existing one, send the existing path
        form.append("existingPhoto", existingPhotoPath);
      }

      const res = await axios.put(
        `https://bulding-constraction-employee-management.onrender.com/api/clients/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Client updated successfully.");
        navigate("/engineer-dashboard/clients");
      } else {
        toast.error("Failed to update client.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        "Update error: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <Container>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <Card>
            <CardHeader>
              <h2>
                <FaEdit /> Update Client Information
              </h2>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <PhotoSection>
                  <PhotoPreview>
                    {photoPreview ? (
                      <img src={photoPreview} alt="Client Preview" />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#f0f2f5",
                          color: "#667eea",
                        }}
                      >
                        <FaUser className="default-icon" />
                      </div>
                    )}
                  </PhotoPreview>
                  <PhotoUploadButton>
                    <FaImage /> Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </PhotoUploadButton>
                </PhotoSection>

                <FormGrid>
                  <div>
                    <FormSectionTitle>
                      <FaIdCard /> Personal Details
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
                        <FaUser /> Gender
                      </label>
                      <select
                        className="form-control"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">-- Select Gender --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
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
                        type="text"
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
                        type="text"
                        className="form-control"
                        name="alternatePhone"
                        value={formData.alternatePhone}
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label className="required-field">
                        <FaGlobe /> Nationality
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <label className="required-field">
                        <FaCalendarAlt /> Start Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="startdate"
                        value={formData.startdate}
                        onChange={handleChange}
                        // min={minDate}
                        required
                      />
                    </FormGroup>
                  </div>

                  <div>
                    <FormSectionTitle>
                      <FaMapMarkerAlt /> Address
                    </FormSectionTitle>

                    <FormGroup>
                      <label className="required-field">
                        <FaMapMarkerAlt /> Current Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <label className="required-field">
                        <FaMapMarkerAlt /> Permanent Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="permanentAddress"
                        value={formData.permanentAddress}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>

                    <FormSectionTitle>
                      <FaUser /> Contact Person
                    </FormSectionTitle>

                    <FormGroup>
                      <label className="required-field">
                        <FaUser /> Contact Person Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaPhone /> Contact Person Phone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="contactPersonPhone"
                        value={formData.contactPersonPhone}
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaMapMarkerAlt /> Contact Person Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="contactPersonAddress"
                        value={formData.contactPersonAddress}
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormSectionTitle>
                      <FaBuilding /> Organization
                    </FormSectionTitle>

                    <FormGroup>
                      <label className="required-field">
                        <FaBuilding /> Organization Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </div>
                </FormGrid>

                <ActionButtons>
                  <SecondaryButton to="/engineer-dashboard/clients">
                    <FaArrowLeft /> Back
                  </SecondaryButton>
                  <PrimaryButton type="submit" disabled={isSubmitting}>
                    <FaSave /> {isSubmitting ? "Saving..." : "Update Client"}
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

export default UpdateClient;
