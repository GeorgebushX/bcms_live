// import React, { useState } from "react";
// import { useAuth } from "../../context/authContext";
// import { useNavigate } from "react-router-dom";
// import { Modal, Button } from "react-bootstrap";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);

//   const handleLogout = () => {
//     logout(); // Clear auth context
//     navigate("/login"); // Redirect to login
//   };

//   return (
//     <div>
//       <nav className="d-flex justify-content-between align-items-center bg-info text-white py-2 px-4 shadow-sm">
//         {/* Welcome Message */}
//         <p className="m-0 fw-semibold fs-6">
//           Welcome {user?.name || "Admin"}!
//         </p>

//         {/* Logout Button */}
//         <button
//           className="btn btn-outline-light btn-sm"
//           onClick={() => setShowModal(true)}
//         >
//           Logout
//         </button>
//       </nav>

//       {/* Logout Confirmation Modal */}
//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         centered
//         backdrop="static"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Logout</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to logout?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleLogout}>
//             Yes, Logout
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import {
  FaBars,
  FaSignOutAlt,
  FaUserCircle,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { useAuth } from "../../context/authContext";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
  50% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.8); }
  100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-5px); }
  60% { transform: translateY(-3px); }
`;

const NavbarContainer = styled.nav`
  background: ${(props) => props.theme.navbarBg};
  color: ${(props) => props.theme.textColor};
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: ${(props) => props.theme.navbarShadow};
  transition: all 0.4s ease;
  animation: ${fadeIn} 0.5s ease;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  animation: ${slideIn} 0.5s ease;

  @media (max-width: 576px) {
    gap: 10px;
  }
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${(props) => props.theme.userImageBorder};
  transition: all 0.3s ease;
  box-shadow: ${(props) => props.theme.userImageShadow};

  &:hover {
    transform: scale(1.1);
    border-color: ${(props) => props.theme.userImageBorderHover};
    box-shadow: ${(props) => props.theme.userImageShadowHover};
  }

  @media (max-width: 576px) {
    width: 35px;
    height: 35px;
  }
`;

const MenuButton = styled.button`
  background: ${(props) => props.theme.menuButtonBg};
  border: none;
  color: ${(props) => props.theme.menuButtonColor};
  font-size: 20px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  margin-right: 15px;
  display: none;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease;

  &:hover {
    background: ${(props) => props.theme.menuButtonHoverBg};
    transform: scale(1.05);
  }

  @media (max-width: 992px) {
    display: block;
  }
`;

const LogoutButton = styled.button`
  background: ${(props) => props.theme.logoutButtonBg};
  color: ${(props) => props.theme.logoutButtonColor};
  border: none;
  padding: 8px 15px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: ${(props) => props.theme.logoutButtonShadow};
  animation: ${fadeIn} 0.5s ease;

  &:hover {
    background: ${(props) => props.theme.logoutButtonHoverBg};
    box-shadow: ${(props) => props.theme.logoutButtonHoverShadow};
    transform: translateY(-2px);

    svg {
      transform: translateX(3px);
    }
  }

  svg {
    transition: transform 0.3s ease;
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
  animation: ${slideIn} 0.5s ease;

  @media (max-width: 768px) {
    display: none;
  }
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  color: ${(props) => props.theme.textColor};
`;

const UserRole = styled.span`
  font-size: 0.75rem;
  opacity: 0.8;
  color: ${(props) => props.theme.textSecondary};
`;

const ThemeToggle = styled.button`
  background: ${(props) => props.theme.themeToggleBg};
  border: none;
  color: ${(props) => props.theme.themeToggleColor};
  cursor: pointer;
  font-size: 18px;
  padding: 8px;
  border-radius: 8px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  animation: ${bounce} 2s infinite;

  &:hover {
    background: ${(props) => props.theme.themeToggleHoverBg};
    transform: rotate(15deg);
    animation: none;
  }
`;

const ModalHeader = styled(Modal.Header)`
  background: ${(props) => props.theme.modalHeaderBg};
  color: ${(props) => props.theme.modalHeaderText};
  border-bottom: none;
  transition: all 0.3s ease;
`;

const ModalFooter = styled(Modal.Footer)`
  border-top: none;
  justify-content: center;
  gap: 15px;
  background: ${(props) => props.theme.modalFooterBg};
  transition: all 0.3s ease;
`;

const Title = styled.div`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  font-size: 1.1rem;
  animation: ${fadeIn} 0.5s ease;
`;

// Theme definitions
const lightTheme = {
  navbarBg: "linear-gradient(135deg, #40e1f7ff, #3a6febff)",
  textColor: "#0e0d0dff",
  textSecondary: "rgba(255, 255, 255, 0.8)",
  navbarShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
  userImageBorder: "rgba(255, 255, 255, 0.4)",
  userImageBorderHover: "rgba(255, 255, 255, 0.8)",
  userImageShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  userImageShadowHover: "0 4px 12px rgba(0, 0, 0, 0.2)",
  menuButtonBg: "rgba(255, 255, 255, 0.15)",
  menuButtonColor: "#ffffff",
  menuButtonHoverBg: "rgba(255, 255, 255, 0.25)",
  logoutButtonBg:"#ffffff",
  logoutButtonColor: "#0c0c0cff",
  logoutButtonHoverBg: "rgba(255, 255, 255, 0.25)",
  logoutButtonShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  logoutButtonHoverShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
  themeToggleBg: "rgba(255, 255, 255, 0.15)",
  themeToggleColor: "#ffffff",
  themeToggleHoverBg: "rgba(255, 255, 255, 0.25)",
  modalHeaderBg: "linear-gradient(135deg, #3b82f6, #2563eb)",
  modalHeaderText: "#ffffff",
  modalFooterBg: "#f8f9fa",
};

const darkTheme = {
  navbarBg: "linear-gradient(135deg, #1a202c, #2d3748)",
  textColor: "#e2e8f0",
  textSecondary: "rgba(226, 232, 240, 0.8)",
  navbarShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  userImageBorder: "rgba(255, 255, 255, 0.3)",
  userImageBorderHover: "rgba(255, 255, 255, 0.6)",
  userImageShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  userImageShadowHover: "0 4px 12px rgba(0, 0, 0, 0.3)",
  menuButtonBg: "rgba(255, 255, 255, 0.1)",
  menuButtonColor: "#e2e8f0",
  menuButtonHoverBg: "rgba(255, 255, 255, 0.2)",
  logoutButtonBg: "rgba(255, 255, 255, 0.1)",
  logoutButtonColor: "#e2e8f0",
  logoutButtonHoverBg: "rgba(255, 255, 255, 0.2)",
  logoutButtonShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  logoutButtonHoverShadow: "0 4px 8px rgba(0, 0, 0, 0.25)",
  themeToggleBg: "rgba(255, 255, 255, 0.1)",
  themeToggleColor: "#f6ad55",
  themeToggleHoverBg: "rgba(255, 255, 255, 0.2)",
  modalHeaderBg: "linear-gradient(135deg, #1a202c, #2d3748)",
  modalHeaderText: "#e2e8f0",
  modalFooterBg: "#2d3748",
};

const Navbar = ({ onMenuClick, user, theme: parentTheme = "light" }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [theme, setTheme] = useState(parentTheme);
  const { logout } = useAuth();

  useEffect(() => {
    // Update theme if parentTheme changes
    setTheme(parentTheme);
  }, [parentTheme]);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const defaultUserImage =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const userImage = user?.photo
    ? `${import.meta.env.VITE_API_URL || ""}${user.photo}`
    : defaultUserImage;

  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <>
      <NavbarContainer theme={currentTheme}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <MenuButton onClick={onMenuClick} theme={currentTheme}>
            <FaBars />
          </MenuButton>
          <Title theme={currentTheme}>{user?.name || "Admin Dashboard"}</Title>
        </div>

        <UserInfo>
          <ThemeToggle onClick={toggleTheme} theme={currentTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </ThemeToggle>

          {/* <UserDetails>
            <UserName theme={currentTheme}>{user?.name || "Admin"}</UserName>
            <UserRole theme={currentTheme}>
              {user?.role || "Administrator"}
            </UserRole>
          </UserDetails> */}

          <UserImage
            src={userImage}
            alt="User"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultUserImage;
            }}
            theme={currentTheme}
          />

          <LogoutButton
            onClick={() => setShowLogoutModal(true)}
            theme={currentTheme}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </LogoutButton>
        </UserInfo>
      </NavbarContainer>

      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
        data-bs-theme={theme}
      >
        <ModalHeader closeButton theme={currentTheme}>
          <Modal.Title>Confirm Logout</Modal.Title>
        </ModalHeader>
        <Modal.Body
          className="text-center"
          style={{
            background: theme === "light" ? "#ffffff" : "#2d3748",
            color: theme === "light" ? "#000000" : "#e2e8f0",
          }}
        >
          <div className="mb-3">
            <FaSignOutAlt
              size={48}
              color={theme === "light" ? "#3b82f6" : "#f6ad55"}
            />
          </div>
          <p className="fs-5">Are you sure you want to logout?</p>
        </Modal.Body>
        <ModalFooter theme={currentTheme}>
          <Button
            variant="secondary"
            onClick={() => setShowLogoutModal(false)}
            style={{
              background: theme === "light" ? "#6c757d" : "#4a5568",
              border: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleLogout}
            style={{
              background: theme === "light" ? "#dc3545" : "#e53e3e",
              border: "none",
            }}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Navbar;

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { FaBars, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
// import { Modal, Button } from "react-bootstrap";
// import { useAuth } from "../../context/authContext";

// const NavbarContainer = styled.nav`
//   background: linear-gradient(135deg, #17a2b8, #2c3e50);
//   color: white;
//   padding: 15px 25px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   position: sticky;
//   top: 0;
//   z-index: 1000;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
// `;

// const UserInfo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 15px;

//   @media (max-width: 576px) {
//     gap: 10px;
//   }
// `;

// const UserImage = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   object-fit: cover;
//   border: 2px solid rgba(255, 255, 255, 0.3);

//   @media (max-width: 576px) {
//     width: 35px;
//     height: 35px;
//   }
// `;

// const MenuButton = styled.button`
//   background: rgba(255, 255, 255, 0.1);
//   border: none;
//   color: white;
//   font-size: 20px;
//   cursor: pointer;
//   padding: 8px 12px;
//   border-radius: 6px;
//   margin-right: 15px;
//   display: none;
//   transition: all 0.3s;

//   &:hover {
//     background: rgba(255, 255, 255, 0.2);
//   }

//   @media (max-width: 992px) {
//     display: block;
//   }
// `;

// const LogoutButton = styled.button`
//   background: rgba(255, 255, 255, 0.1);
//   color: white;
//   border: none;
//   padding: 8px 15px;
//   border-radius: 6px;
//   font-weight: 500;
//   cursor: pointer;
//   transition: all 0.3s;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

//   &:hover {
//     background: rgba(255, 255, 255, 0.2);
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
//   }

//   @media (max-width: 576px) {
//     padding: 6px 10px;
//     font-size: 0.8rem;
//     gap: 5px;
//   }
// `;

// const UserDetails = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;

//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

// const UserName = styled.span`
//   font-weight: 600;
//   font-size: 0.95rem;
// `;

// const UserRole = styled.span`
//   font-size: 0.75rem;
//   opacity: 0.8;
// `;

// const ModalHeader = styled(Modal.Header)`
//   background: linear-gradient(135deg, #17a2b8, #2c3e50);
//   color: white;
//   border-bottom: none;
// `;

// const ModalFooter = styled(Modal.Footer)`
//   border-top: none;
//   justify-content: center;
//   gap: 15px;
// `;

// const Navbar = ({ onMenuClick, user }) => {
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const { logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     setShowLogoutModal(false);
//   };

//   const defaultUserImage =
//     "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
//   const userImage = user?.photo
//     ? `${import.meta.env.VITE_API_URL || ""}${user.photo}`
//     : defaultUserImage;

//   return (
//     <>
//       <NavbarContainer>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <MenuButton onClick={onMenuClick}>
//             <FaBars />
//           </MenuButton>
//           <div
//             style={{ color: "white", fontWeight: "600", fontSize: "1.1rem" }}
//           >
//             {user?.name || "Admin Dashboard"}
//           </div>
//         </div>

//         <UserInfo>
//           <UserDetails>
//             {/* <UserName>{user?.name || "Admin"}</UserName> */}
//             {/* <UserRole>{user?.role || "Administrator"}</UserRole> */}
//           </UserDetails>

//           <UserImage
//             src={userImage}
//             alt="User"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = defaultUserImage;
//             }}
//           />

//           <LogoutButton onClick={() => setShowLogoutModal(true)}>
//             <FaSignOutAlt />
//             <span>Logout</span>
//           </LogoutButton>
//         </UserInfo>
//       </NavbarContainer>

//       <Modal
//         show={showLogoutModal}
//         onHide={() => setShowLogoutModal(false)}
//         centered
//       >
//         <ModalHeader closeButton>
//           <Modal.Title>Confirm Logout</Modal.Title>
//         </ModalHeader>
//         <Modal.Body className="text-center">
//           <div className="mb-3">
//             <FaSignOutAlt size={48} color="#17a2b8" />
//           </div>
//           <p className="fs-5">Are you sure you want to logout?</p>
//         </Modal.Body>
//         <ModalFooter>
//           <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleLogout}>
//             <FaSignOutAlt className="me-2" />
//             Logout
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </>
//   );
// };

// export default Navbar;
