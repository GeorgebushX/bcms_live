import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaEdit,
  FaTrash,
  FaUser,
  FaUserPlus,
  FaSearch,
  FaEye,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaUserTie,
  FaAddressCard,
  FaInfoCircle,
  FaIdCard,
  FaEllipsisV,
} from "react-icons/fa";
import { Modal, Button, Dropdown } from "react-bootstrap";
import styled from "styled-components";
import { format } from "date-fns";

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

const MobileClientPhoto = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
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
  }
`;

const MobileClientName = styled.div`
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

const ClientPhoto = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f0f3f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  overflow: hidden;
  border: 2px solid #dee2e6;

  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    color: #adb5bd;
    font-size: 0.9rem;
  }
`;

const LargeClientPhoto = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f0f3f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  overflow: hidden;
  border: 5px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    width: 120px;
    height: 120px;
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

const PillBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  background-color: #f1f1f1;
  color: #6c757d;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;

  @media (min-width: 768px) {
    font-size: 0.85rem;
    max-width: none;
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

const ClientProfileSection = styled.div`
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

const ClientInfo = styled.div`
  flex: 1;
`;

const ClientName = styled.h3`
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ClientOrg = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

const ClientStatus = styled.span`
  display: inline-block;
  padding: 0.3rem 0.7rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: #e3f2fd;
  color: #1976d2;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 0.85rem;
    padding: 0.35rem 0.75rem;
    margin-bottom: 1.5rem;
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

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const clientsPerPage = 10;

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://bulding-constraction-employee-management.onrender.com/api/clients",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        // Sort by newest first (descending by createdAt)
        const sortedClients = [...res.data.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setClients(sortedClients);
      } else {
        toast.error("Failed to fetch clients");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (client) => {
    setSelectedClient(client);
    setShowViewModal(true);
  };

  const confirmDelete = (client) => {
    setClientToDelete(client);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!clientToDelete) return;
    try {
      const res = await axios.delete(
        `https://bulding-constraction-employee-management.onrender.com/api/clients/${clientToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Client deleted successfully");
        setClients(
          clients.filter((client) => client._id !== clientToDelete._id)
        );
      } else {
        toast.error("Failed to delete client");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    } finally {
      setShowDeleteModal(false);
      setClientToDelete(null);
    }
  };

  const filteredClients = clients.filter(
    (c) =>
      c._id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * clientsPerPage;
  const indexOfFirst = indexOfLast - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirst, indexOfLast);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredClients.length / clientsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Container>
      {/* View Client Modal */}
      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
        size="lg"
      >
        <ModalHeaderGradient closeButton>
          <Modal.Title>
            <FaUserTie /> Client Details
          </Modal.Title>
        </ModalHeaderGradient>

        <ModalBodyContainer>
          {selectedClient && (
            <>
              <ClientProfileSection>
                <LargeClientPhoto>
                  {selectedClient.photo ? (
                    <img
                      src={`https://bulding-constraction-employee-management.onrender.com${selectedClient.photo}`}
                      alt={selectedClient.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentElement.innerHTML = (
                          <FaUser className="text-muted" />
                        );
                      }}
                    />
                  ) : (
                    <FaUser className="text-muted" />
                  )}
                </LargeClientPhoto>

                <ClientInfo>
                  <ClientName>{selectedClient.name}</ClientName>
                  <ClientOrg>
                    {selectedClient.organizationName || "Independent Client"}
                  </ClientOrg>
                  <ClientStatus>
                    Active Client • Since{" "}
                    {formatDate(selectedClient.startdate) || "N/A"}
                  </ClientStatus>
                </ClientInfo>
              </ClientProfileSection>

              <DetailsGrid>
                <DetailCard>
                  <DetailTitle>
                    <FaInfoCircle /> Basic Information
                  </DetailTitle>

                  <DetailItem>
                    <DetailLabel>Email:</DetailLabel>
                    <DetailValue>{selectedClient.email || "N/A"}</DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Phone:</DetailLabel>
                    <DetailValue>{selectedClient.phone || "N/A"}</DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Organization:</DetailLabel>
                    <DetailValue>
                      {selectedClient.organizationName || "N/A"}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Start Date:</DetailLabel>
                    <DetailValue>
                      {formatDate(selectedClient.startdate) || "N/A"}
                    </DetailValue>
                  </DetailItem>
                </DetailCard>

                <DetailCard>
                  <DetailTitle>
                    <FaIdCard /> Address Information
                  </DetailTitle>

                  <DetailItem>
                    <DetailLabel>Alternate Phone:</DetailLabel>
                    <DetailValue>
                      {selectedClient.alternatePhone || "N/A"}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Address:</DetailLabel>
                    <DetailValue>{selectedClient.address || "N/A"}</DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Permanent Address:</DetailLabel>
                    <DetailValue>
                      {selectedClient.permanentAddress || "N/A"}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Nationality:</DetailLabel>
                    <DetailValue>
                      {selectedClient.nationality || "N/A"}
                    </DetailValue>
                  </DetailItem>
                </DetailCard>

                <DetailCard>
                  <DetailTitle>
                    <FaUserTie /> Contact Person
                  </DetailTitle>

                  <DetailItem>
                    <DetailLabel>Name:</DetailLabel>
                    <DetailValue>
                      {selectedClient.contactPerson || "N/A"}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Phone:</DetailLabel>
                    <DetailValue>
                      {selectedClient.contactPersonPhone || "N/A"}
                    </DetailValue>
                  </DetailItem>

                  <DetailItem>
                    <DetailLabel>Address:</DetailLabel>
                    <DetailValue>
                      {selectedClient.contactPersonAddress || "N/A"}
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
          {selectedClient && (
            <Button
              variant="primary"
              as={Link}
              to={`/engineer-dashboard/update-client/${selectedClient._id}`}
              size="sm"
            >
              <FaEdit className="me-2" />
              Edit Client
            </Button>
          )}
        </ModalFooterStyled>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <ModalHeaderGradient closeButton>
          <Modal.Title>
            <FaTrash /> Confirm Deletion
          </Modal.Title>
        </ModalHeaderGradient>
        <Modal.Body className="text-center py-4">
          <div className="mb-3">
            <FaTrash className="text-danger" size={40} />
          </div>
          <h5 className="mb-2" style={{ fontSize: "1.1rem" }}>
            Are you sure you want to delete this client?
          </h5>
          <p className="fw-bold text-primary mb-1">{clientToDelete?.name}</p>
          <p className="text-muted" style={{ fontSize: "0.85rem" }}>
            This action cannot be undone.
          </p>
        </Modal.Body>
        <ModalFooterStyled>
          <Button
            variant="outline-secondary"
            onClick={() => setShowDeleteModal(false)}
            size="sm"
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} size="sm">
            Delete Client
          </Button>
        </ModalFooterStyled>
      </Modal>

      <Header>
        <h2>Client Management</h2>
        <p>Manage all your construction clients in one place</p>
      </Header>

      <ActionBar>
        <SearchBox>
          <FaSearch />
          <input
            type="text"
            placeholder="Search by ID, Name, Phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>
        <AddButton to="/engineer-dashboard/add-client">
          <FaUserPlus />
          <span>Add New Client</span>
        </AddButton>
      </ActionBar>

      {/* Desktop Table (hidden on mobile) */}
      <div className="d-none d-lg-block">
        <div className="table-responsive">
          <StyledTable>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>StartDate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : currentClients.length > 0 ? (
                currentClients.map((client, index) => (
                  <tr key={client._id}>
                    <td>{indexOfFirst + index + 1}</td>
                    <td>
                      <ClientPhoto>
                        {client.photo ? (
                          <img
                            src={`https://bulding-constraction-employee-management.onrender.com${client.photo}`}
                            alt="Client"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.parentElement.innerHTML = (
                                <FaUser className="text-muted" />
                              );
                            }}
                          />
                        ) : (
                          <FaUser className="text-muted" />
                          // <FaUser className="text-blue-400 hover:text-purple-500 transition-colors duration-300" />
                        )}
                      </ClientPhoto>
                    </td>
                    <td className="text-primary fw-bold">{client.name}</td>
                    <td>
                      <PillBadge>{client.phone}</PillBadge>
                    </td>
                    <td>
                      <PillBadge>{client.email}</PillBadge>
                    </td>
                    <td>{client.startdate || "N/A"}</td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <ActionButton
                          className="view"
                          onClick={() => handleViewClick(client)}
                          title="View"
                        >
                          <FaEye />
                        </ActionButton>
                        <Link
                          to={`/engineer-dashboard/update-client/${client._id}`}
                          className="edit"
                          title="Edit"
                          as={ActionButton}
                        >
                          <FaEdit />
                        </Link>
                        <ActionButton
                          className="delete"
                          onClick={() => confirmDelete(client)}
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
                  <td colSpan="7" className="text-muted py-3 text-center">
                    {searchTerm
                      ? "No matching clients found"
                      : "No clients available"}
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
        ) : currentClients.length > 0 ? (
          currentClients.map((client, index) => (
            <MobileCard key={client._id}>
              <MobileCardHeader>
                <MobileClientPhoto>
                  {client.photo ? (
                    <img
                      src={`https://bulding-constraction-employee-management.onrender.com${client.photo}`}
                      alt="Client"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentElement.innerHTML = (
                          <FaUser className="text-muted" />
                        );
                      }}
                    />
                  ) : (
                    <FaUser className="text-muted" />
                  )}
                </MobileClientPhoto>
                <MobileClientName>
                  <h5>{client.name}</h5>
                  <p>{client.organizationName || "Independent Client"}</p>
                </MobileClientName>
                <MobileActions>
                  <Dropdown>
                    <DropdownToggle variant="light" id="dropdown-actions">
                      <FaEllipsisV />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        className="view"
                        onClick={() => handleViewClick(client)}
                      >
                        <FaEye /> View
                      </DropdownItem>
                      <DropdownItem
                        as={Link}
                        to={`/engineer-dashboard/update-client/${client._id}`}
                        className="edit"
                      >
                        <FaEdit /> Edit
                      </DropdownItem>
                      <DropdownItem
                        className="delete"
                        onClick={() => confirmDelete(client)}
                      >
                        <FaTrash /> Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </MobileActions>
              </MobileCardHeader>
              <MobileCardBody>
                <MobileDetailItem>
                  <span>Phone</span>
                  <span>{client.phone || "N/A"}</span>
                </MobileDetailItem>
                <MobileDetailItem>
                  <span>Email</span>
                  <span>{client.email || "N/A"}</span>
                </MobileDetailItem>
                <MobileDetailItem>
                  <span>Address</span>
                  <span>{client.address || "N/A"}</span>
                </MobileDetailItem>
                <MobileDetailItem>
                  <span>Start Date</span>
                  <span>{formatDate(client.startdate) || "N/A"}</span>
                </MobileDetailItem>
              </MobileCardBody>
            </MobileCard>
          ))
        ) : (
          <NoDataMessage>
            {searchTerm ? "No matching clients found" : "No clients available"}
          </NoDataMessage>
        )}
      </MobileTable>

      {filteredClients.length > clientsPerPage && (
        <PaginationContainer>
          <PageInfo>
            Showing {indexOfFirst + 1} to{" "}
            {Math.min(indexOfLast, filteredClients.length)} of{" "}
            {filteredClients.length} clients
          </PageInfo>
          <PaginationButtons>
            <PageButton onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </PageButton>
            <span className="mx-2 fw-bold text-secondary">
              Page {currentPage} of{" "}
              {Math.ceil(filteredClients.length / clientsPerPage)}
            </span>
            <PageButton
              onClick={nextPage}
              disabled={
                currentPage >=
                Math.ceil(filteredClients.length / clientsPerPage)
              }
            >
              Next
            </PageButton>
          </PaginationButtons>
        </PaginationContainer>
      )}
    </Container>
  );
};

export default ClientList;
