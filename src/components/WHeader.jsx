
import React, { useState } from "react";
import styled from "styled-components";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const NavbarContainer = styled.nav`
  background: linear-gradient(135deg, #17a2b8, #2c3e50);
  color: white;
  padding: 12px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const MenuButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (min-width: 992px) {
    display: none;
  }
`;

const WelcomeMessage = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;

  @media (max-width: 576px) {
    font-size: 0.85rem;
    max-width: 150px;
  }
`;

const LogoutButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 576px) {
    padding: 5px 8px;
    font-size: 0.8rem;
    gap: 4px;
  }
`;

const ModalHeader = styled(Modal.Header)`
  background: linear-gradient(135deg, #17a2b8, #2c3e50);
  color: white;
  border-bottom: none;
`;

const ModalFooter = styled(Modal.Footer)`
  border-top: none;
  justify-content: center;
  gap: 15px;
`;

const WHeader = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    logout();
    setShowModal(false);
    navigate("/login");
  };

  return (
    <>
      <NavbarContainer>
        <LeftSection>
          <MenuButton onClick={toggleSidebar} aria-label="Toggle menu">
            <FaBars />
          </MenuButton>
          <WelcomeMessage>
            Welcome {user?.name || "Contractor"}!
          </WelcomeMessage>
        </LeftSection>

        <LogoutButton onClick={() => setShowModal(true)}>
          <FaSignOutAlt />
          <span>Logout</span>
        </LogoutButton>
      </NavbarContainer>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
      >
        <ModalHeader closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </ModalHeader>
        <Modal.Body className="text-center">
          <div className="mb-3">
            <FaSignOutAlt size={48} color="#17a2b8" />
          </div>
          <p className="fs-5">Are you sure you want to logout?</p>
        </Modal.Body>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            Yes, Logout
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default WHeader;