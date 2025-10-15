import React, { useState } from "react";
import styled from "styled-components";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const NavbarContainer = styled.nav`
  background: linear-gradient(135deg, #17a2b8, #2c3e50);
  color: white;
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 576px) {
    gap: 10px;
  }
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.3);

  @media (max-width: 576px) {
    width: 35px;
    height: 35px;
  }
`;

const MenuButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  margin-right: 15px;
  display: none;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 992px) {
    display: block;
  }
`;

const LogoutButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 576px) {
    padding: 6px 10px;
    font-size: 0.8rem;
    gap: 5px;
  }
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 768px) {
    display: none;
  }
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
`;

const UserRole = styled.span`
  font-size: 0.75rem;
  opacity: 0.8;
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

const CHeader = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowLogoutModal(false);
  };

  const defaultUserImage = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const userImage = user?.photo
    ? `${import.meta.env.VITE_API_URL || ""}${user.photo}`
    : defaultUserImage;

  return (
    <>
      <NavbarContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <MenuButton onClick={onMenuClick}>
            <FaBars />
          </MenuButton>
          <div style={{ color: "white", fontWeight: "600", fontSize: "1.1rem" }}>
            Welcome {user?.name || "Contractor"}!
          </div>
        </div>

        <UserInfo>
          <UserDetails>
            <UserName>{user?.name || "Contractor"}</UserName>
            <UserRole>Contractor</UserRole>
          </UserDetails>

          <UserImage
            src={userImage}
            alt="User"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultUserImage;
            }}
          />

          <LogoutButton onClick={() => setShowLogoutModal(true)}>
            <FaSignOutAlt />
            <span>Logout</span>
          </LogoutButton>
        </UserInfo>
      </NavbarContainer>

      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
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
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            Logout
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CHeader;