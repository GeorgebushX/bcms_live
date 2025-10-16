import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
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
  FaUserPlus,
} from "react-icons/fa";
import styled from "styled-components";

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

const FileInfo = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #6c757d;
  text-align: center;
`;

const AddClient = () => {
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
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setPhotoFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }

    // Email validation (Gmail only as per your requirement)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      toast.error(
        "Please enter a valid Gmail address (e.g., example@gmail.com)"
      );
      return false;
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }

    if (
      formData.alternatePhone &&
      !phoneRegex.test(formData.alternatePhone.replace(/\D/g, ""))
    ) {
      toast.error("Alternate phone must be 10 digits");
      return false;
    }

    if (
      formData.contactPersonPhone &&
      !phoneRegex.test(formData.contactPersonPhone.replace(/\D/g, ""))
    ) {
      toast.error("Contact person phone must be 10 digits");
      return false;
    }

    // Start date validation
    if (formData.startdate) {
      const selectedDate = new Date(formData.startdate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        toast.error("Start date cannot be in the past");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          submitData.append(key, formData[key]);
        }
      });

      // Append photo file if exists
      if (photoFile) {
        submitData.append("photo", photoFile);
      }

      const response = await axios.post(
        "https://bulding-constraction-employee-management.onrender.com/api/clients",
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          timeout: 30000, // 30 seconds timeout for file upload
        }
      );

      if (response.data.success) {
        toast.success("Client added successfully!");

        // Reset form
        setFormData({
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
        });
        setPhotoFile(null);
        setPreviewImage(null);

        navigate("/engineer-dashboard/clients");
      } else {
        toast.error(response.data.message || "Failed to add client");
      }
    } catch (error) {
      console.error("Error adding client:", error);

      if (error.response) {
        // Server responded with error status
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "Server error";
        toast.error(`Error: ${errorMessage}`);
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Network error: Please check your connection");
      } else {
        // Something else happened
        toast.error("Error: " + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format today's date for the min attribute
  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  return (
    <Container>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <Card>
            <CardHeader>
              <h2>
                <FaUserPlus /> Add New Client
              </h2>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <PhotoSection>
                  <PhotoPreview>
                    {previewImage ? (
                      <img src={previewImage} alt="Client Preview" />
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
                    <FaImage /> Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </PhotoUploadButton>
                  {photoFile && (
                    <FileInfo>
                      Selected: {photoFile.name} (
                      {(photoFile.size / 1024).toFixed(2)} KB)
                    </FileInfo>
                  )}
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
                        placeholder="Enter full name"
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
                      <label>
                        <FaEnvelope /> Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
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
                        placeholder="10-digit phone number"
                        pattern="[0-9]{10}"
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
                        placeholder="10-digit phone number"
                        pattern="[0-9]{10}"
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
                        placeholder="Enter nationality"
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaCalendarAlt /> Start Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="startdate"
                        value={formData.startdate}
                        onChange={handleChange}
                        min={getTodayDate()}
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
                        placeholder="Enter current address"
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
                        placeholder="Enter permanent address"
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
                        placeholder="Enter contact person name"
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaPhone /> Contact Person Phone
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        name="contactPersonPhone"
                        value={formData.contactPersonPhone}
                        onChange={handleChange}
                        placeholder="10-digit phone number"
                        pattern="[0-9]{10}"
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
                        placeholder="Enter contact person address"
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
                        placeholder="Enter organization name"
                      />
                    </FormGroup>
                  </div>
                </FormGrid>

                <ActionButtons>
                  <SecondaryButton to="/engineer-dashboard/clients">
                    <FaArrowLeft /> Back
                  </SecondaryButton>
                  <PrimaryButton type="submit" disabled={isSubmitting}>
                    <FaSave /> {isSubmitting ? "Saving..." : "Add Client"}
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

export default AddClient;
