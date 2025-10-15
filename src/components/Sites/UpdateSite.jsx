import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  FaMapMarkedAlt,
  FaArrowLeft,
  FaBuilding,
  FaUser,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaUserTie,
  FaHardHat,
  FaUsers,
  FaCalendarAlt,
  FaInfoCircle,
  FaDollarSign,
  FaImage,
  FaSave,
  FaLock,
  FaExclamationTriangle,
} from "react-icons/fa";
import styled from "styled-components";

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

const MapSection = styled.div`
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

  textarea.form-control {
    min-height: 100px;
  }
`;

const MapPreview = styled.div`
  width: 100%;
  max-width: 400px;
  height: 200px;
  border-radius: 10px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 3px solid white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.02);
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

const MapUploadButton = styled.label`
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

const ReadOnlyInput = styled.div`
  border-radius: 8px;
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  background-color: #e9ecef;
  color: #495057;
  font-size: 0.9rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const UpdateSite = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    client: "",
    siteName: "",
    location: "",
    totalAreaSqFt: "",
    oneAreaSqFtAmount: "",
    totalAmount: "",
    supervisors: "",
    contractors: "",
    startDate: "",
    endDate: "",
    status: "Planned",
    notes: "",
    siteMap: null,
  });

  // Format a string to yyyy-MM-dd safely
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return !isNaN(d.getTime()) ? d.toISOString().split("T")[0] : "";
    } catch (e) {
      return "";
    }
  };

  useEffect(() => {
    const total =
      Number(formData.totalAreaSqFt || 0) *
      Number(formData.oneAreaSqFtAmount || 0);
    setFormData((prev) => ({
      ...prev,
      totalAmount: total.toFixed(2),
    }));
  }, [formData.totalAreaSqFt, formData.oneAreaSqFtAmount]);

  useEffect(() => {
    const fetchSiteAndClients = async () => {
      try {
        const [siteRes, clientsRes] = await Promise.all([
          axios.get(
            `https://bulding-constraction-employee-management.onrender.com/api/site/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
          axios.get(
            `https://bulding-constraction-employee-management.onrender.com/api/clients`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
        ]);

        if (siteRes.data.success && clientsRes.data.success) {
          const site = siteRes.data.data;
          const clientId =
            typeof site.client === "object" ? site.client._id : site.client;

          setClients(clientsRes.data.data);
          setFormData({
            client: clientId,
            siteName: site.siteName,
            location: site.location,
            totalAreaSqFt: site.totalAreaSqFt || "",
            oneAreaSqFtAmount: site.oneAreaSqFtAmount || "",
            totalAmount: site.totalAmount || "",
            supervisors: site.workersCount?.supervisors || "",
            contractors: site.workersCount?.contractors || "",
            startDate: formatDateForInput(site.startDate),
            endDate: formatDateForInput(site.endDate),
            status: site.status || "Planned",
            notes: site.notes || "",
            siteMap: null,
          });
        } else {
          toast.error("Failed to fetch site or clients data");
        }
      } catch (err) {
        toast.error("Error: " + err.message);
      }
    };

    fetchSiteAndClients();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      siteMap: e.target.files[0],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time part for comparison

    if (formData.startDate) {
      const startDate = new Date(formData.startDate);
      if (startDate < today) {
        newErrors.startDate = "Start date must be today or in the future";
      }
    }

    if (formData.endDate && formData.startDate) {
      const endDate = new Date(formData.endDate);
      const startDate = new Date(formData.startDate);
      if (endDate <= startDate) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (["supervisors", "contractors"].includes(key)) return;
      if (val !== null && val !== "") {
        payload.append(key, val);
      }
    });

    payload.append(
      "workersCount",
      JSON.stringify({
        supervisors: formData.supervisors || 0,
        contractors: formData.contractors || 0,
      })
    );

    try {
      const res = await axios.put(
        `https://bulding-constraction-employee-management.onrender.com/api/site/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Site updated successfully!");
        navigate("/engineer-dashboard/sites");
      } else {
        toast.error("Failed to update site");
      }
    } catch (err) {
      toast.error("Error updating site: " + err.message);
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
              <h2>Update Construction Site</h2>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <MapSection>
                  <MapPreview>
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
                      <FaBuilding className="default-icon" />
                    </div>
                  </MapPreview>
                  <MapUploadButton>
                    <FaImage /> Upload Site Map
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                    />
                  </MapUploadButton>
                </MapSection>

                <FormGrid>
                  <div>
                    <FormSectionTitle>
                      <FaBuilding /> Site Information
                    </FormSectionTitle>

                    <FormGroup>
                      <label className="required-field">
                        <FaUser /> Client
                      </label>
                      <select
                        className="form-control"
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                        required
                      >
                        <option value="">-- Select Client --</option>
                        {clients.map((client) => (
                          <option key={client._id} value={client._id}>
                            {client.name} ({client.companyName})
                          </option>
                        ))}
                      </select>
                    </FormGroup>

                    <FormGroup>
                      <label className="required-field">
                        <FaBuilding /> Site Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="siteName"
                        value={formData.siteName}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <label className="required-field">
                        <FaMapMarkerAlt /> Location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaRulerCombined /> Total Area (sq ft)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="totalAreaSqFt"
                        value={formData.totalAreaSqFt}
                        onChange={handleChange}
                        min="1"
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaDollarSign /> Cost per sq ft
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="oneAreaSqFtAmount"
                        value={formData.oneAreaSqFtAmount}
                        onChange={handleChange}
                        min="1"
                      />
                    </FormGroup>

                    {formData.totalAmount && (
                      <FormGroup>
                        <label>
                          <FaDollarSign /> Total Budget
                        </label>
                        <ReadOnlyInput>
                          <FaLock /> ${formData.totalAmount}
                        </ReadOnlyInput>
                      </FormGroup>
                    )}
                  </div>

                  <div>
                    <FormSectionTitle>
                      <FaCalendarAlt /> Project Timeline
                    </FormSectionTitle>

                    <FormGroup>
                      <label>
                        <FaCalendarAlt /> Start Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                      />
                      {errors.startDate && (
                        <ErrorMessage>
                          <FaExclamationTriangle /> {errors.startDate}
                        </ErrorMessage>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaCalendarAlt /> End Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        min={formData.startDate}
                      />
                      {errors.endDate && (
                        <ErrorMessage>
                          <FaExclamationTriangle /> {errors.endDate}
                        </ErrorMessage>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <label className="required-field">
                        <FaInfoCircle /> Status
                      </label>
                      <select
                        className="form-control"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                      >
                        <option value="Planned">Planned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                      </select>
                    </FormGroup>

                    <FormSectionTitle>
                      <FaUsers /> Workforce
                    </FormSectionTitle>

                    <FormGroup>
                      <label>
                        <FaUserTie /> Supervisors
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="supervisors"
                        value={formData.supervisors}
                        onChange={handleChange}
                        min="0"
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>
                        <FaHardHat /> Contractors
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="contractors"
                        value={formData.contractors}
                        onChange={handleChange}
                        min="0"
                      />
                    </FormGroup>

                    <FormSectionTitle>
                      <FaInfoCircle /> Additional Information
                    </FormSectionTitle>

                    <FormGroup>
                      <label>
                        <FaInfoCircle /> Notes
                      </label>
                      <textarea
                        className="form-control"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="3"
                      ></textarea>
                    </FormGroup>
                  </div>
                </FormGrid>

                <ActionButtons>
                  <SecondaryButton to="/engineer-dashboard/sites">
                    <FaArrowLeft /> Back
                  </SecondaryButton>
                  <PrimaryButton type="submit" disabled={isSubmitting}>
                    <FaSave /> {isSubmitting ? "Updating..." : "Update Site"}
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

export default UpdateSite;
