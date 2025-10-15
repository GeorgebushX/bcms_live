

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Modal, Button, Dropdown } from "react-bootstrap";
import {
  FaUser,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaBuilding,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaUserTie,
  FaHardHat,
  FaUsers,
  FaCalendarAlt,
  FaDollarSign,
  FaInfoCircle,
  FaEye,
  FaEllipsisV,
} from "react-icons/fa";
import styled from "styled-components";

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

  @media (min-width: 576px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const SearchBox = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: 576px) {
    width: 250px;
  }

  input {
    padding-left: 2.5rem;
    border-radius: 50px;
    border: 1px solid #dfe6e9;
    transition: all 0.3s;
    height: 40px;
    font-size: 0.9rem;
    width: 100%;

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
    font-size: 0.9rem;
  }
`;

const AddButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white !important;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  border: none;
  width: 100%;
  font-size: 0.9rem;
  height: 40px;

  @media (min-width: 576px) {
    width: auto;
    padding: 0.5rem 1.25rem;
    font-size: 1rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
    color: white;
  }
`;

const StyledTable = styled.table`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;
  font-size: 0.85rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }

  thead {
    background: linear-gradient(135deg, #2c3e50, #34495e);
    color: white;

    th {
      padding: 0.75rem;
      font-weight: 500;
      border: none;
      text-align: center;
      font-size: 0.85rem;

      @media (min-width: 768px) {
        padding: 1rem;
        font-size: 1rem;
      }
    }
  }

  tbody {
    tr {
      transition: all 0.2s;

      &:hover {
        background-color: rgba(52, 152, 219, 0.05);
      }
    }

    td {
      padding: 0.5rem;
      vertical-align: middle;
      border-top: 1px solid #e9ecef;
      text-align: center;

      @media (min-width: 768px) {
        padding: 0.75rem 1rem;
      }
    }
  }
`;

const MobileTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 992px) {
    display: none;
  }
`;

const MobileCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const MobileCardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const MobileSitePhoto = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background-color: #f0f3f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid #dee2e6;
  margin-right: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    color: #adb5bd;
    width: 60%;
    height: 60%;
  }
`;

const MobileSiteInfo = styled.div`
  flex: 1;
  h5 {
    margin: 0;
    color: #2c3e50;
    font-size: 1rem;
  }
  p {
    margin: 0;
    color: #7f8c8d;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
`;

const MobileCardBody = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  font-size: 0.85rem;
`;

const MobileDetailItem = styled.div`
  span:first-child {
    display: block;
    color: #6c757d;
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }
  span:last-child {
    color: #212529;
    font-weight: 500;
    word-break: break-word;
  }
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  margin: 0 3px;
  font-size: 0.85rem;

  &.view {
    background-color: rgba(13, 110, 253, 0.2);
    color: #0d6efd;

    &:hover {
      background-color: rgba(13, 110, 253, 0.3);
    }
  }

  &.edit {
    background-color: rgba(255, 193, 7, 0.2);
    color: #ffc107;

    &:hover {
      background-color: rgba(255, 193, 7, 0.3);
    }
  }

  &.delete {
    background-color: rgba(220, 53, 69, 0.2);
    color: #dc3545;

    &:hover {
      background-color: rgba(220, 53, 69, 0.3);
    }
  }
`;

const MobileActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const DropdownToggle = styled(Dropdown.Toggle)`
  background: transparent !important;
  border: none !important;
  color: #6c757d !important;
  padding: 0.25rem !important;
  &:after {
    display: none !important;
  }
  &:focus {
    box-shadow: none !important;
  }
`;

const DropdownMenu = styled(Dropdown.Menu)`
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 0.5rem;
  min-width: 150px;
`;

const DropdownItem = styled(Dropdown.Item)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  border-radius: 5px;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }

  &.view {
    color: #0d6efd;
  }

  &.edit {
    color: #ffc107;
  }

  &.delete {
    color: #dc3545;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
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
  padding: 0.4rem 0.65rem;
  border-radius: 5px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;

  @media (min-width: 768px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
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

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.7rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;

  &.completed {
    background-color: #99fc60ff;
    color: #155724;
  }

  &.in-progress {
    background-color: #fae6a5ff;
    color: #856404;
  }

  &.planned {
    background-color: #6ddbf7ff;
    color: #0c5460;
  }

  &.on-hold {
    background-color: #f74a7eff;
    color: #383d41;
  }
`;

const ModalHeaderGradient = styled(Modal.Header)`
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  border-bottom: none;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }

  .modal-title {
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;

    @media (min-width: 768px) {
      font-size: 1.25rem;
      gap: 0.75rem;
    }
  }

  .btn-close {
    filter: invert(1);
    opacity: 0.8;
    transition: all 0.2s;
    font-size: 0.75rem;

    &:hover {
      opacity: 1;
    }
  }
`;

const ModalBodyContainer = styled(Modal.Body)`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const SiteProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    margin-bottom: 2rem;
  }
`;

const SiteMapImage = styled.div`
  width: 150px;
  height: 120px;
  border-radius: 10px;
  background-color: #f0f3f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 200px;
    height: 150px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    color: #adb5bd;
    width: 50%;
    height: 50%;

    @media (min-width: 768px) {
      width: 60%;
      height: 60%;
    }
  }
`;

const SiteInfo = styled.div`
  flex: 1;
`;

const SiteName = styled.h3`
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SiteLocation = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    justify-content: flex-start;
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
`;

const DetailCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-left: 3px solid #3498db;

  @media (min-width: 768px) {
    padding: 1.25rem;
    border-radius: 10px;
  }
`;

const DetailTitle = styled.h5`
  font-size: 0.9rem;
  color: #495057;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;

  @media (min-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  svg {
    color: #3498db;
    font-size: 0.9rem;

    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const DetailItem = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: flex-start;
  font-size: 0.85rem;

  @media (min-width: 768px) {
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-size: 0.8rem;
  color: #6c757d;
  min-width: 100px;
  display: inline-block;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 0.9rem;
    min-width: 120px;
  }
`;

const DetailValue = styled.span`
  font-size: 0.85rem;
  color: #212529;
  flex: 1;
  word-break: break-word;

  @media (min-width: 768px) {
    font-size: 0.95rem;
  }
`;

const ModalFooterStyled = styled(Modal.Footer)`
  border-top: none;
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-size: 0.9rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

// ======================
// Main Component
// ======================

const SiteList = () => {
  const [sites, setSites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);
  const [siteToDelete, setSiteToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  const sitesPerPage = 10;

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://bulding-constraction-employee-management.onrender.com/api/site",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setSites(res.data.data);
      } else {
        toast.error("Failed to load sites.");
      }
    } catch (error) {
      toast.error("Error fetching sites: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (site) => {
    setSelectedSite(site);
    setShowViewModal(true);
  };

  const confirmDelete = (site) => {
    setSiteToDelete(site);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!siteToDelete) return;
    try {
      const res = await axios.delete(
        `https://bulding-constraction-employee-management.onrender.com/api/site/${siteToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Site deleted successfully.");
        setSites(sites.filter((s) => s._id !== siteToDelete._id));
      } else {
        toast.error("Failed to delete site.");
      }
    } catch (error) {
      toast.error("Delete error: " + error.message);
    } finally {
      setShowDeleteModal(false);
      setSiteToDelete(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "N/A" : d.toISOString().split("T")[0];
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  const getStatusBadgeClass = (status) => {
    if (!status) return "";
    switch (status.toLowerCase()) {
      case "completed":
        return "completed";
      case "in progress":
        return "in-progress";
      case "planned":
        return "planned";
      case "on hold":
        return "on-hold";
      default:
        return "";
    }
  };

  const filteredSites = sites.filter((s) => {
    const idStr = s._id?.toString()?.toLowerCase() || "";
    const nameStr =
      typeof s.client === "object" ? s.client?.name?.toLowerCase() : "";
    const phoneStr =
      typeof s.client === "object" ? s.client?.phone?.toLowerCase() : "";
    const siteNameStr = s.siteName?.toLowerCase() || "";
    const locationStr = s.location?.toLowerCase() || "";

    return (
      idStr.includes(searchTerm.toLowerCase()) ||
      nameStr.includes(searchTerm.toLowerCase()) ||
      phoneStr.includes(searchTerm.toLowerCase()) ||
      siteNameStr.includes(searchTerm.toLowerCase()) ||
      locationStr.includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLast = currentPage * sitesPerPage;
  const indexOfFirst = indexOfLast - sitesPerPage;
  const currentSites = filteredSites.slice(indexOfFirst, indexOfLast);

  return (
    <Container>
      {/* View Details Modal */}
      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
        size="lg"
        backdrop="static"
      >
        <ModalHeaderGradient closeButton>
          <Modal.Title>
            <FaBuilding /> Site Details
          </Modal.Title>
        </ModalHeaderGradient>

        <ModalBodyContainer>
          {selectedSite && (
            <>
              <SiteProfileSection>
                <SiteMapImage>
                  {selectedSite.client?.photo ? (
                    <img src={selectedSite.client.photo} alt="Client" />
                  ) : (
                    <FaBuilding size={60} />
                  )}
                </SiteMapImage>

                <SiteInfo>
                  <SiteName>{selectedSite.siteName}</SiteName>
                  <SiteLocation>
                    <FaMapMarkerAlt />
                    {selectedSite.location || "Location not specified"}
                  </SiteLocation>
                  <StatusBadge
                    className={getStatusBadgeClass(selectedSite.status)}
                  >
                    {selectedSite.status || "N/A"}
                  </StatusBadge>
                </SiteInfo>
              </SiteProfileSection>

              <DetailsGrid>
                <DetailCard>
                  <DetailTitle>
                    <FaInfoCircle /> Basic Information
                  </DetailTitle>

                  <DetailItem>
                    <DetailLabel>Site ID:</DetailLabel>
                    <DetailValue>{selectedSite._id}</DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Area (sq.ft):</DetailLabel>
                    <DetailValue>
                      {selectedSite.totalAreaSqFt?.toLocaleString() ||
                        selectedSite.areaSqFt?.toLocaleString() ||
                        "N/A"}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Status:</DetailLabel>
                    <DetailValue>
                      <StatusBadge
                        className={getStatusBadgeClass(selectedSite.status)}
                      >
                        {selectedSite.status || "N/A"}
                      </StatusBadge>
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Dates:</DetailLabel>
                    <DetailValue>
                      {formatDate(selectedSite.startDate) || "N/A"} -{" "}
                      {formatDate(selectedSite.endDate) || "Ongoing"}
                    </DetailValue>
                  </DetailItem>
                </DetailCard>

                <DetailCard>
                  <DetailTitle>
                    <FaUserTie /> Client Information
                  </DetailTitle>
                  <DetailItem>
                    <DetailLabel>Client:</DetailLabel>
                    <DetailValue>
                      {selectedSite.client?.name || "Not assigned"}
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Phone:</DetailLabel>
                    <DetailValue>
                      {selectedSite.client?.phone || "N/A"}
                    </DetailValue>
                  </DetailItem>
                </DetailCard>

                <DetailCard>
                  <DetailTitle>
                    <FaDollarSign /> Financial Information
                  </DetailTitle>

                  <DetailItem>
                    <DetailLabel>Total Budget:</DetailLabel>
                    <DetailValue>
                      {formatCurrency(
                        selectedSite.totalBudget || selectedSite.budget
                      )}
                    </DetailValue>
                  </DetailItem>
                </DetailCard>
              </DetailsGrid>
            </>
          )}
        </ModalBodyContainer>

        <ModalFooterStyled>
          <Button
            variant="outline-secondary"
            onClick={() => setShowViewModal(false)}
            size="sm"
          >
            Close
          </Button>
          <Button
            variant="primary"
            as={Link}
            to={`/engineer-dashboard/update-site/${selectedSite?._id}`}
            size="sm"
          >
            <FaEdit className="me-2" />
            Edit Site
          </Button>
        </ModalFooterStyled>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center py-4">
            <div className="mb-4">
              <FaTrash className="text-danger" size={40} />
            </div>
            <h5 className="mb-3" style={{ fontSize: "1.1rem" }}>
              Are you sure you want to delete this site?
            </h5>
            <p className="fw-bold text-primary">{siteToDelete?.siteName}</p>
            <p className="text-muted" style={{ fontSize: "0.85rem" }}>
              This action cannot be undone.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="outline-secondary"
            onClick={() => setShowDeleteModal(false)}
            size="sm"
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} size="sm">
            Delete Site
          </Button>
        </Modal.Footer>
      </Modal>

      <Header>
        <h2>Site Management</h2>
        <p>Manage all construction sites in one place</p>
      </Header>

      <ActionBar>
        <SearchBox>
          <FaSearch />
          <input
            type="text"
            placeholder="Search sites..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </SearchBox>
        <AddButton to="/engineer-dashboard/add-site">
          <FaPlus />
          <span>Add New Site</span>
        </AddButton>
      </ActionBar>

      {/* Desktop Table (hidden on mobile) */}
      <div className="d-none d-lg-block">
        <div className="table-responsive">
          <StyledTable>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Client</th>
                <th>Photo</th>
                <th>Site Name</th>
                <th>Location</th>
                <th>Area (sq ft)</th>
                <th>Status</th>
                <th>Budget</th>
                {/* <th>Start</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : currentSites.length > 0 ? (
                currentSites.map((site, index) => (
                  <tr key={site._id}>
                    <td>{indexOfFirst + index + 1}</td>
                    <td>{site.client?.name || "Unknown"}</td>
                    <td>
                      {site.client?.photo ? (
                        <img
                          src={site.client.photo}
                          alt="Client"
                          width="45"
                          height="45"
                          className="rounded-circle border border-info"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <FaUser size={32} className="text-muted" />
                      )}
                    </td>
                    <td>{site.siteName || "N/A"}</td>
                    <td>
                      <span title={site.location}>
                        {site.location?.slice(0, 25) || "N/A"}...
                      </span>
                    </td>
                    <td>{site.totalAreaSqFt || site.areaSqFt || "N/A"}</td>
                    <td>
                      <StatusBadge className={getStatusBadgeClass(site.status)}>
                        {site.status || "N/A"}
                      </StatusBadge>
                    </td>
                    <td>{formatCurrency(site.totalBudget || site.budget)}</td>
                    {/* <td>{formatDate(site.startDate)}</td> */}
                    <td>
                      <div className="d-flex justify-content-center">
                        <ActionButton
                          className="view"
                          onClick={() => handleViewClick(site)}
                          title="View"
                        >
                          <FaEye />
                        </ActionButton>
                        <Link
                          to={`/engineer-dashboard/update-site/${site._id}`}
                          className="edit"
                          title="Edit"
                          as={ActionButton}
                        >
                          <FaEdit />
                        </Link>
                        <ActionButton
                          className="delete"
                          onClick={() => confirmDelete(site)}
                          title="Delete"
                        >
                          <FaTrash />
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center py-4">
                    {searchTerm
                      ? "No matching sites found"
                      : "No sites available"}
                  </td>
                </tr>
              )}
            </tbody>
          </StyledTable>
        </div>
      </div>

      {/* Mobile/Tablet Cards (hidden on desktop) */}
      <MobileTable>
        {loading ? (
          <LoadingContainer>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </LoadingContainer>
        ) : currentSites.length > 0 ? (
          currentSites.map((site, index) => (
            <MobileCard key={site._id}>
              <MobileCardHeader>
                <MobileSitePhoto>
                  {site.client?.photo ? (
                    <img src={site.client.photo} alt="Client" />
                  ) : (
                    <FaBuilding size={40} />
                  )}
                </MobileSitePhoto>
                <MobileSiteInfo>
                  <h5>{site.siteName || "N/A"}</h5>
                  <p>
                    <FaMapMarkerAlt size={12} />
                    {site.location?.slice(0, 30) || "N/A"}...
                  </p>
                  <StatusBadge className={getStatusBadgeClass(site.status)}>
                    {site.status || "N/A"}
                  </StatusBadge>
                </MobileSiteInfo>
                <MobileActions>
                  <Dropdown>
                    <DropdownToggle variant="light" id="dropdown-actions">
                      <FaEllipsisV />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        className="view"
                        onClick={() => handleViewClick(site)}
                      >
                        <FaEye /> View
                      </DropdownItem>
                      <DropdownItem
                        as={Link}
                        to={`/engineer-dashboard/update-site/${site._id}`}
                        className="edit"
                      >
                        <FaEdit /> Edit
                      </DropdownItem>
                      <DropdownItem
                        className="delete"
                        onClick={() => confirmDelete(site)}
                      >
                        <FaTrash /> Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </MobileActions>
              </MobileCardHeader>
              <MobileCardBody>
                <MobileDetailItem>
                  <span>Client</span>
                  <span>{site.client?.name || "Unknown"}</span>
                </MobileDetailItem>
                <MobileDetailItem>
                  <span>Area</span>
                  <span>
                    {site.totalAreaSqFt || site.areaSqFt || "N/A"} sq ft
                  </span>
                </MobileDetailItem>
                <MobileDetailItem>
                  <span>Budget</span>
                  <span>{formatCurrency(site.totalBudget || site.budget)}</span>
                </MobileDetailItem>
                <MobileDetailItem>
                  <span>Start Date</span>
                  <span>{formatDate(site.startDate)}</span>
                </MobileDetailItem>
              </MobileCardBody>
            </MobileCard>
          ))
        ) : (
          <NoDataMessage>
            {searchTerm ? "No matching sites found" : "No sites available"}
          </NoDataMessage>
        )}
      </MobileTable>

      {/* Pagination */}
      {filteredSites.length > sitesPerPage && (
        <PaginationContainer>
          <PageInfo>
            Showing {indexOfFirst + 1} to{" "}
            {Math.min(indexOfLast, filteredSites.length)} of{" "}
            {filteredSites.length} sites
          </PageInfo>
          <PaginationButtons>
            <PageButton
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronLeft size={12} />
              <span>Previous</span>
            </PageButton>
            <span className="mx-2 fw-bold text-secondary">
              Page {currentPage} of{" "}
              {Math.ceil(filteredSites.length / sitesPerPage)}
            </span>
            <PageButton
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage >= Math.ceil(filteredSites.length / sitesPerPage)
              }
            >
              <span>Next</span>
              <FaChevronRight size={12} />
            </PageButton>
          </PaginationButtons>
        </PaginationContainer>
      )}
    </Container>
  );
};

export default SiteList;
