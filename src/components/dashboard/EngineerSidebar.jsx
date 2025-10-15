// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import styled from "styled-components";
// import {
//   FaTachometerAlt,
//   FaUsers,
//   FaHardHat,
//   FaMapMarkedAlt,
//   FaUserCog,
//   FaClipboardCheck,
//   FaFileAlt,
//   FaCog,
//   FaKey,
//   FaMoneyCheckAlt,
//   FaBars,
//   FaUserTie,
//   FaUserFriends,
//   FaMoon,
//   FaSun,
//   FaTimes,
//   FaChevronDown,
// } from "react-icons/fa";
// import { useAuth } from "../../context/authContext";

// const Title = styled.h6`
//   margin: 0;
//   font-size: 16px;
//   font-weight: 500;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   max-width: 200px;
// `;

// const SidebarContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: ${({ $isOpen, $isMobile }) => ($isMobile ? ($isOpen ? "0" : "-100%") : "0")};
//   width: ${({ $isMobile }) => ($isMobile ? "100%" : "280px")};
//   height: 100vh;
//   background: linear-gradient(135deg, #2c3e50, #1a252f);
//   color: white;
//   z-index: 1100;
//   transition: all 0.3s ease;
//   box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
//   overflow-y: auto;

//   @media (min-width: 768px) {
//     width: 280px;
//     left: ${({ $isOpen, $isMobile }) => ($isMobile ? ($isOpen ? "0" : "-280px") : "0")};
//   }
// `;

// const SidebarHeader = styled.div`
//   padding: 25px 20px;
//   text-align: center;
//   border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//   position: relative;
//   background: rgba(0, 0, 0, 0.1);
//   margin-top: ${({ $isMobile }) => ($isMobile ? "60px" : "0")};
// `;

// const ProfileImage = styled.img`
//   width: 80px;
//   height: 80px;
//   border-radius: 50%;
//   object-fit: cover;
//   border: 3px solid rgba(255, 255, 255, 0.2);
//   margin-bottom: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
// `;

// const SidebarMenu = styled.div`
//   padding: 15px 0;
// `;

// const MenuItem = styled(NavLink)`
//   display: flex;
//   align-items: center;
//   padding: 12px 20px;
//   margin: 5px 10px;
//   border-radius: 6px;
//   color: rgba(255, 255, 255, 0.8);
//   text-decoration: none;
//   transition: all 0.3s;
//   white-space: nowrap;

//   &:hover {
//     background: rgba(255, 255, 255, 0.1);
//     color: white;
//     transform: translateX(5px);
//   }

//   &.active {
//     background: #3498db;
//     color: white;
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//     transform: translateX(5px);
//   }

//   svg {
//     margin-right: 10px;
//     font-size: 18px;
//     flex-shrink: 0;
//   }

//   span {
//     overflow: hidden;
//     text-overflow: ellipsis;
//   }
// `;

// const SubmenuItem = styled(NavLink)`
//   display: flex;
//   align-items: center;
//   padding: 10px 20px 10px 45px;
//   margin: 3px 10px;
//   border-radius: 6px;
//   color: rgba(255, 255, 255, 0.7);
//   text-decoration: none;
//   transition: all 0.3s;
//   font-size: 14px;
//   position: relative;
//   white-space: nowrap;

//   &:hover {
//     background: rgba(255, 255, 255, 0.05);
//     color: white;
//   }

//   &.active {
//     background: rgba(52, 152, 219, 0.3);
//     color: white;

//     &::before {
//       content: "";
//       position: absolute;
//       left: 30px;
//       top: 50%;
//       transform: translateY(-50%);
//       width: 5px;
//       height: 5px;
//       background: white;
//       border-radius: 50%;
//     }
//   }

//   svg {
//     margin-right: 10px;
//     font-size: 14px;
//     flex-shrink: 0;
//   }

//   span {
//     overflow: hidden;
//     text-overflow: ellipsis;
//   }
// `;

// const MenuToggle = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   width: 100%;
//   padding: 12px 20px;
//   margin: 5px 10px;
//   border-radius: 6px;
//   background: none;
//   border: none;
//   color: rgba(255, 255, 255, 0.8);
//   text-align: left;
//   cursor: pointer;
//   transition: all 0.3s;
//   white-space: nowrap;

//   &:hover {
//     background: rgba(255, 255, 255, 0.1);
//     color: white;
//   }

//   &.active {
//     background: #3498db;
//     color: white;
//   }

//   svg:first-child {
//     margin-right: 10px;
//     font-size: 18px;
//     flex-shrink: 0;
//   }

//   svg:last-child {
//     font-size: 12px;
//     transition: transform 0.3s;
//     transform: ${({ $isOpen }) =>
//       $isOpen ? "rotate(0deg)" : "rotate(-90deg)"};
//   }

//   div {
//     display: flex;
//     align-items: center;
//     overflow: hidden;
//   }

//   span {
//     overflow: hidden;
//     text-overflow: ellipsis;
//   }
// `;

// const Submenu = styled.div`
//   overflow: hidden;
//   max-height: ${({ $isOpen }) => ($isOpen ? "500px" : "0")};
//   transition: max-height 0.3s ease-in-out;
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   right: 15px;
//   top: 15px;
//   background: rgba(255, 255, 255, 0.1);
//   border: none;
//   color: white;
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   transition: all 0.3s;

//   &:hover {
//     background: rgba(255, 255, 255, 0.2);
//   }

//   @media (min-width: 992px) {
//     display: none;
//   }
// `;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 1099;
//   opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
//   visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
//   transition: all 0.3s;
//   pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};

//   @media (min-width: 992px) {
//     display: none;
//   }
// `;

// const MobileToggle = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   padding: 15px;
//   background: linear-gradient(135deg, #2c3e50, #1a252f);
//   color: white;
//   z-index: 1080;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
//   height: 60px;

//   @media (min-width: 992px) {
//     display: none;
//   }
// `;

// const ThemeToggle = styled.button`
//   background: none;
//   border: none;
//   color: white;
//   cursor: pointer;
//   font-size: 18px;
//   margin-right: 15px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 36px;
//   height: 36px;
//   border-radius: 50%;
//   transition: all 0.3s;

//   &:hover {
//     background: rgba(255, 255, 255, 0.1);
//   }
// `;

// const MenuButton = styled.button`
//   background: none;
//   border: none;
//   color: white;
//   cursor: pointer;
//   font-size: 18px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 36px;
//   height: 36px;
//   border-radius: 50%;
//   transition: all 0.3s;

//   &:hover {
//     background: rgba(255, 255, 255, 0.1);
//   }
// `;

// const EngineerSidebar = ({ isOpen, onClose, isControlled = false }) => {
//   const { user } = useAuth();
//   const [internalOpen, setInternalOpen] = useState(false);
//   const [settingsOpen, setSettingsOpen] = useState(false);
//   const [reportsOpen, setReportsOpen] = useState(false);
//   const [employeesOpen, setEmployeesOpen] = useState(false);
//   const [theme, setTheme] = useState("dark");
//   const [isMobile, setIsMobile] = useState(false);

//   // Use controlled state if provided, otherwise use internal state
//   const sidebarOpen = isControlled ? isOpen : internalOpen;

//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 992;
//       setIsMobile(mobile);

//       if (!isControlled) {
//         // Only manage internal state if not controlled
//         if (mobile) {
//           setInternalOpen(false);
//         } else {
//           setInternalOpen(true);
//         }
//       }
//     };

//     // Set initial state based on current screen size
//     handleResize();

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [isControlled]);

//   const toggleTheme = () => {
//     setTheme(prev => (prev === "dark" ? "light" : "dark"));
//   };

//   const toggleSidebar = () => {
//     if (isControlled) {
//       // If controlled, call the parent's function
//       onClose && onClose();
//     } else {
//       // If not controlled, use internal state
//       setInternalOpen(prev => !prev);
//     }
//   };

//   const closeSidebar = () => {
//     if (isMobile) {
//       if (isControlled) {
//         onClose && onClose();
//       } else {
//         setInternalOpen(false);
//       }
//     }
//   };

//   const defaultUserImage = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
//   const profileImage = user?.photo
//     ? `${import.meta.env.VITE_API_URL || ""}${user.photo}`
//     : defaultUserImage;

//   return (
//     <>
//       {isMobile && !isControlled && (
//         <MobileToggle>
//           <Title>Engineer Dashboard</Title>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <ThemeToggle onClick={toggleTheme}>
//               {theme === "dark" ? <FaSun /> : <FaMoon />}
//             </ThemeToggle>
//             <MenuButton onClick={toggleSidebar}>
//               {sidebarOpen ? <FaTimes /> : <FaBars />}
//             </MenuButton>
//           </div>
//         </MobileToggle>
//       )}

//       {!isControlled && (
//         <Overlay $isOpen={sidebarOpen && isMobile} onClick={closeSidebar} />
//       )}

//       <SidebarContainer $isOpen={sidebarOpen} $isMobile={isMobile}>
//         {isMobile && !isControlled && (
//           <CloseButton onClick={closeSidebar}>
//             <FaTimes />
//           </CloseButton>
//         )}

//         <SidebarHeader $isMobile={isMobile}>
//           <ProfileImage
//             src={profileImage}
//             alt="User"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = defaultUserImage;
//             }}
//           />
//           <h5 className="mb-1">{user?.name || "Engineer"}</h5>
//           <small style={{ color: "rgba(255,255,255,0.7)" }}>
//             {user?.role || "Engineer"}
//           </small>
//         </SidebarHeader>

//         <SidebarMenu>
//           <MenuItem
//             to="/engineer-dashboard"
//             onClick={closeSidebar}
//             end
//           >
//             <FaTachometerAlt />
//             <span>Dashboard</span>
//           </MenuItem>

//           <MenuItem
//             to="/engineer-dashboard/clients"
//             onClick={closeSidebar}
//           >
//             <FaUserCog />
//             <span>Clients</span>
//           </MenuItem>

//           <MenuItem
//             to="/engineer-dashboard/sites"
//             onClick={closeSidebar}
//           >
//             <FaMapMarkedAlt />
//             <span>Sites</span>
//           </MenuItem>

//           <MenuToggle
//             onClick={() => setEmployeesOpen(!employeesOpen)}
//             $isOpen={employeesOpen}
//             className={employeesOpen ? "active" : ""}
//           >
//             <div>
//               <FaUsers />
//               <span>Employees</span>
//             </div>
//             <FaChevronDown />
//           </MenuToggle>

//           <Submenu $isOpen={employeesOpen}>
//             <SubmenuItem
//               to="/engineer-dashboard/supervisors"
//               onClick={closeSidebar}
//             >
//               <FaUserTie />
//               <span>Supervisors</span>
//             </SubmenuItem>
//             <SubmenuItem
//               to="/engineer-dashboard/contractors"
//               onClick={closeSidebar}
//             >
//               <FaHardHat />
//               <span>Contractors</span>
//             </SubmenuItem>
//             <SubmenuItem
//               to="/engineer-dashboard/workers"
//               onClick={closeSidebar}
//             >
//               <FaUserFriends />
//               <span>Workers</span>
//             </SubmenuItem>
//           </Submenu>

//           <MenuItem
//             to="/engineer-dashboard/attendance"
//             onClick={closeSidebar}
//           >
//             <FaClipboardCheck />
//             <span>Attendance</span>
//           </MenuItem>

//           <MenuItem
//             to="/engineer-dashboard/payment"
//             onClick={closeSidebar}
//           >
//             <FaMoneyCheckAlt />
//             <span>Payment</span>
//           </MenuItem>

//           <MenuToggle
//             onClick={() => setReportsOpen(!reportsOpen)}
//             $isOpen={reportsOpen}
//             className={reportsOpen ? "active" : ""}
//           >
//             <div>
//               <FaFileAlt />
//               <span>Reports</span>
//             </div>
//             <FaChevronDown />
//           </MenuToggle>

//           <Submenu $isOpen={reportsOpen}>
//             <SubmenuItem
//               to="/engineer-dashboard/attendance-reports"
//               onClick={closeSidebar}
//             >
//               <FaClipboardCheck />
//               <span>Attendance Report</span>
//             </SubmenuItem>
//             <SubmenuItem
//               to="/engineer-dashboard/payment-reports"
//               onClick={closeSidebar}
//             >
//               <FaMoneyCheckAlt />
//               <span>Payment Report</span>
//             </SubmenuItem>
//           </Submenu>

//           <MenuToggle
//             onClick={() => setSettingsOpen(!settingsOpen)}
//             $isOpen={settingsOpen}
//             className={settingsOpen ? "active" : ""}
//           >
//             <div>
//               <FaCog />
//               <span>Settings</span>
//             </div>
//             <FaChevronDown />
//           </MenuToggle>

//           <Submenu $isOpen={settingsOpen}>
//             <SubmenuItem
//               to="/engineer-dashboard/settings/change-password"
//               onClick={closeSidebar}
//             >
//               <FaKey />
//               <span>Change Password</span>
//             </SubmenuItem>
//           </Submenu>
//         </SidebarMenu>
//       </SidebarContainer>
//     </>
//   );
// };

// export default EngineerSidebar;

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import {
  FaTachometerAlt,
  FaUsers,
  FaHardHat,
  FaMapMarkedAlt,
  FaUserCog,
  FaClipboardCheck,
  FaFileAlt,
  FaCog,
  FaKey,
  FaMoneyCheckAlt,
  FaBars,
  FaUserTie,
  FaUserFriends,
  FaMoon,
  FaSun,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
  50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
  100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const Title = styled.h6`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  color: ${(props) => props.theme.textColor};
  transition: color 0.3s ease;
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${({ $isOpen, $isMobile }) =>
    $isMobile ? ($isOpen ? "0" : "-100%") : "0"};
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "280px")};
  height: 100vh;
  background: ${(props) => props.theme.sidebarBg};
  color: ${(props) => props.theme.textColor};
  z-index: 1100;
  transition: all 0.4s ease;
  box-shadow: ${(props) => props.theme.sidebarShadow};
  overflow-y: auto;
  animation: ${slideIn} 0.4s ease;

  @media (min-width: 768px) {
    width: 280px;
    left: ${({ $isOpen, $isMobile }) =>
      $isMobile ? ($isOpen ? "0" : "-280px") : "0"};
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.scrollTrack};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.scrollThumb};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.scrollThumbHover};
  }
`;

const SidebarHeader = styled.div`
  padding: 25px 20px;
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  position: relative;
  background: ${(props) => props.theme.headerBg};
  margin-top: ${({ $isMobile }) => ($isMobile ? "60px" : "0")};
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${(props) => props.theme.profileBorder};
  margin-bottom: 10px;
  box-shadow: 0 4px 12px ${(props) => props.theme.profileShadow};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px ${(props) => props.theme.profileShadowHover};
  }
`;

const SidebarMenu = styled.div`
  padding: 15px 0;
  animation: ${fadeIn} 0.6s ease;
`;

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  margin: 5px 10px;
  border-radius: 8px;
  color: ${(props) => props.theme.menuText};
  text-decoration: none;
  transition: all 0.3s;
  white-space: nowrap;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      ${(props) => props.theme.menuHoverBg},
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    background: ${(props) => props.theme.menuHoverBg};
    color: ${(props) => props.theme.menuHoverText};
    transform: translateX(5px);

    &::before {
      left: 100%;
    }
  }

  &.active {
    background: ${(props) => props.theme.menuActiveBg};
    color: ${(props) => props.theme.menuActiveText};
    box-shadow: ${(props) => props.theme.menuActiveShadow};
    transform: translateX(5px);
    animation: ${pulse} 0.5s ease;

    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 60%;
      background: ${(props) => props.theme.menuActiveIndicator};
      border-radius: 4px 0 0 4px;
    }
  }

  svg {
    margin-right: 10px;
    font-size: 18px;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.2);
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    transition: transform 0.3s ease;
  }

  &:hover span {
    transform: translateX(3px);
  }
`;

const SubmenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 50px;
  margin: 3px 10px;
  border-radius: 6px;
  color: ${(props) => props.theme.submenuText};
  text-decoration: none;
  transition: all 0.3s;
  font-size: 14px;
  position: relative;
  white-space: nowrap;
  background: ${(props) => props.theme.submenuBg};

  &:hover {
    background: ${(props) => props.theme.submenuHoverBg};
    color: ${(props) => props.theme.submenuHoverText};
    padding-left: 55px;
  }

  &.active {
    background: ${(props) => props.theme.submenuActiveBg};
    color: ${(props) => props.theme.submenuActiveText};
    animation: ${pulse} 0.4s ease;

    &::before {
      content: "";
      position: absolute;
      left: 30px;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      background: ${(props) => props.theme.submenuActiveIndicator};
      border-radius: 50%;
      animation: ${glow} 2s infinite;
    }
  }

  svg {
    margin-right: 10px;
    font-size: 14px;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: rotate(10deg);
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    transition: transform 0.3s ease;
  }

  &:hover span {
    transform: translateX(3px);
  }
`;

const MenuToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 20px;
  margin: 5px 10px;
  border-radius: 8px;
  background: none;
  border: none;
  color: ${(props) => props.theme.menuText};
  text-align: left;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;

  &:hover {
    background: ${(props) => props.theme.menuHoverBg};
    color: ${(props) => props.theme.menuHoverText};

    svg:first-child {
      transform: scale(1.1);
    }
  }

  &.active {
    background: ${(props) => props.theme.menuActiveBg};
    color: ${(props) => props.theme.menuActiveText};
  }

  svg:first-child {
    margin-right: 10px;
    font-size: 18px;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  svg:last-child {
    font-size: 12px;
    transition: transform 0.3s ease;
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(0deg)" : "rotate(-90deg)"};
  }

  div {
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    transition: transform 0.3s ease;
  }

  &:hover span {
    transform: translateX(3px);
  }
`;

const Submenu = styled.div`
  overflow: hidden;
  max-height: ${({ $isOpen }) => ($isOpen ? "500px" : "0")};
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const CloseButton = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  background: ${(props) => props.theme.closeButtonBg};
  border: none;
  color: ${(props) => props.theme.closeButtonColor};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease;

  &:hover {
    background: ${(props) => props.theme.closeButtonHoverBg};
    transform: rotate(90deg);
  }

  @media (min-width: 992px) {
    display: none;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.overlayBg};
  z-index: 1099;
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: all 0.4s ease;
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  backdrop-filter: blur(2px);

  @media (min-width: 992px) {
    display: none;
  }
`;

const MobileToggle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  background: ${(props) => props.theme.mobileHeaderBg};
  color: ${(props) => props.theme.mobileHeaderText};
  z-index: 1080;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${(props) => props.theme.mobileHeaderShadow};
  height: 60px;
  transition: all 0.3s ease;

  @media (min-width: 992px) {
    display: none;
  }
`;

const ThemeToggle = styled.button`
  background: ${(props) => props.theme.themeToggleBg};
  border: none;
  color: ${(props) => props.theme.themeToggleColor};
  cursor: pointer;
  font-size: 18px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;
  animation: ${bounce} 2s infinite;

  &:hover {
    background: ${(props) => props.theme.themeToggleHoverBg};
    transform: rotate(20deg);
    animation: none;
  }
`;

const MenuButton = styled.button`
  background: ${(props) => props.theme.menuButtonBg};
  border: none;
  color: ${(props) => props.theme.menuButtonColor};
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.menuButtonHoverBg};
    transform: scale(1.1);
  }
`;

// Theme definitions
const lightTheme = {
  sidebarBg: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
  textColor: "#2d3748",
  sidebarShadow: "5px 0 15px rgba(0, 0, 0, 0.07)",
  borderColor: "rgba(0, 0, 0, 0.06)",
  headerBg: "rgba(255, 255, 255, 0.5)",
  profileBorder: "rgba(59, 130, 246, 0.3)",
  profileShadow: "rgba(59, 130, 246, 0.15)",
  profileShadowHover: "rgba(59, 130, 246, 0.25)",
  menuText: "#4a5568",
  menuHoverBg: "rgba(59, 130, 246, 0.1)",
  menuHoverText: "#3b82f6",
  menuActiveBg: "rgba(59, 130, 246, 0.15)",
  menuActiveText: "#3b82f6",
  menuActiveShadow: "0 4px 10px rgba(59, 130, 246, 0.2)",
  menuActiveIndicator: "#3b82f6",
  submenuText: "#718096",
  submenuBg: "rgba(0, 0, 0, 0.02)",
  submenuHoverBg: "rgba(59, 130, 246, 0.08)",
  submenuHoverText: "#3b82f6",
  submenuActiveBg: "rgba(59, 130, 246, 0.12)",
  submenuActiveText: "#3b82f6",
  submenuActiveIndicator: "#3b82f6",
  closeButtonBg: "rgba(0, 0, 0, 0.08)",
  closeButtonColor: "#4a5568",
  closeButtonHoverBg: "rgba(0, 0, 0, 0.12)",
  overlayBg: "rgba(0, 0, 0, 0.4)",
  mobileHeaderBg: "linear-gradient(135deg, #3b82f6, #2563eb)",
  mobileHeaderText: "#ffffff",
  mobileHeaderShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  themeToggleBg: "rgba(255, 255, 255, 0.2)",
  themeToggleColor: "#ffffff",
  themeToggleHoverBg: "rgba(255, 255, 255, 0.3)",
  menuButtonBg: "rgba(255, 255, 255, 0.2)",
  menuButtonColor: "#ffffff",
  menuButtonHoverBg: "rgba(255, 255, 255, 0.3)",
  scrollTrack: "rgba(0, 0, 0, 0.05)",
  scrollThumb: "rgba(0, 0, 0, 0.1)",
  scrollThumbHover: "rgba(0, 0, 0, 0.2)",
};

const darkTheme = {
  sidebarBg: "linear-gradient(135deg, #1a202c, #2d3748)",
  textColor: "#e2e8f0",
  sidebarShadow: "5px 0 15px rgba(0, 0, 0, 0.3)",
  borderColor: "rgba(255, 255, 255, 0.1)",
  headerBg: "rgba(0, 0, 0, 0.2)",
  profileBorder: "rgba(66, 153, 225, 0.3)",
  profileShadow: "rgba(66, 153, 225, 0.15)",
  profileShadowHover: "rgba(66, 153, 225, 0.25)",
  menuText: "#cbd5e0",
  menuHoverBg: "rgba(66, 153, 225, 0.15)",
  menuHoverText: "#90cdf4",
  menuActiveBg: "rgba(66, 153, 225, 0.2)",
  menuActiveText: "#90cdf4",
  menuActiveShadow: "0 4px 10px rgba(66, 153, 225, 0.25)",
  menuActiveIndicator: "#90cdf4",
  submenuText: "#a0aec0",
  submenuBg: "rgba(255, 255, 255, 0.03)",
  submenuHoverBg: "rgba(66, 153, 225, 0.1)",
  submenuHoverText: "#90cdf4",
  submenuActiveBg: "rgba(66, 153, 225, 0.15)",
  submenuActiveText: "#90cdf4",
  submenuActiveIndicator: "#90cdf4",
  closeButtonBg: "rgba(255, 255, 255, 0.1)",
  closeButtonColor: "#e2e8f0",
  closeButtonHoverBg: "rgba(255, 255, 255, 0.15)",
  overlayBg: "rgba(0, 0, 0, 0.7)",
  mobileHeaderBg: "linear-gradient(135deg, #2d3748, #1a202c)",
  mobileHeaderText: "#e2e8f0",
  mobileHeaderShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
  themeToggleBg: "rgba(255, 255, 255, 0.1)",
  themeToggleColor: "#f6ad55",
  themeToggleHoverBg: "rgba(255, 255, 255, 0.15)",
  menuButtonBg: "rgba(255, 255, 255, 0.1)",
  menuButtonColor: "#e2e8f0",
  menuButtonHoverBg: "rgba(255, 255, 255, 0.15)",
  scrollTrack: "rgba(255, 255, 255, 0.05)",
  scrollThumb: "rgba(255, 255, 255, 0.1)",
  scrollThumbHover: "rgba(255, 255, 255, 0.2)",
};

const EngineerSidebar = ({
  isOpen,
  onClose,
  isControlled = false,
  theme: parentTheme = "dark",
}) => {
  const { user } = useAuth();
  const [internalOpen, setInternalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [employeesOpen, setEmployeesOpen] = useState(false);
  const [theme, setTheme] = useState(parentTheme);
  const [isMobile, setIsMobile] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const sidebarOpen = isControlled ? isOpen : internalOpen;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);

      if (!isControlled) {
        // Only manage internal state if not controlled
        if (mobile) {
          setInternalOpen(false);
        } else {
          setInternalOpen(true);
        }
      }
    };

    // Set initial state based on current screen size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isControlled]);

  useEffect(() => {
    // Update theme if parentTheme changes
    setTheme(parentTheme);
  }, [parentTheme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const toggleSidebar = () => {
    if (isControlled) {
      // If controlled, call the parent's function
      onClose && onClose();
    } else {
      // If not controlled, use internal state
      setInternalOpen((prev) => !prev);
    }
  };

  const closeSidebar = () => {
    if (isMobile) {
      if (isControlled) {
        onClose && onClose();
      } else {
        setInternalOpen(false);
      }
    }
  };

  const defaultUserImage =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const profileImage = user?.photo
    ? `${import.meta.env.VITE_API_URL || ""}${user.photo}`
    : defaultUserImage;

  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <>
      {isMobile && !isControlled && (
        <MobileToggle theme={currentTheme}>
          <Title theme={currentTheme}>Engineer Dashboard</Title>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ThemeToggle onClick={toggleTheme} theme={currentTheme}>
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </ThemeToggle>
            <MenuButton onClick={toggleSidebar} theme={currentTheme}>
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </MenuButton>
          </div>
        </MobileToggle>
      )}

      {!isControlled && (
        <Overlay
          $isOpen={sidebarOpen && isMobile}
          onClick={closeSidebar}
          theme={currentTheme}
        />
      )}

      <SidebarContainer
        $isOpen={sidebarOpen}
        $isMobile={isMobile}
        theme={currentTheme}
      >
        {isMobile && !isControlled && (
          <CloseButton onClick={closeSidebar} theme={currentTheme}>
            <FaTimes />
          </CloseButton>
        )}

        <SidebarHeader $isMobile={isMobile} theme={currentTheme}>
          <ProfileImage
            src={profileImage}
            alt="User"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultUserImage;
            }}
            theme={currentTheme}
          />
          <h5 className="mb-1" style={{ color: currentTheme.textColor }}>
            {user?.name || "Engineer"}
          </h5>
          <small style={{ color: currentTheme.submenuText }}>
            {user?.role || "Engineer"}
          </small>
        </SidebarHeader>

        <SidebarMenu theme={currentTheme}>
          <MenuItem
            to="/engineer-dashboard"
            onClick={closeSidebar}
            end
            theme={currentTheme}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </MenuItem>

          <MenuItem
            to="/engineer-dashboard/clients"
            onClick={closeSidebar}
            theme={currentTheme}
          >
            <FaUserCog />
            <span>Clients</span>
          </MenuItem>

          <MenuItem
            to="/engineer-dashboard/sites"
            onClick={closeSidebar}
            theme={currentTheme}
          >
            <FaMapMarkedAlt />
            <span>Sites</span>
          </MenuItem>

          <MenuToggle
            onClick={() => setEmployeesOpen(!employeesOpen)}
            $isOpen={employeesOpen}
            className={employeesOpen ? "active" : ""}
            theme={currentTheme}
          >
            <div>
              <FaUsers />
              <span>Employees</span>
            </div>
            <FaChevronDown />
          </MenuToggle>

          <Submenu $isOpen={employeesOpen}>
            <SubmenuItem
              to="/engineer-dashboard/supervisors"
              onClick={closeSidebar}
              theme={currentTheme}
            >
              <FaUserTie />
              <span>Supervisors</span>
            </SubmenuItem>
            <SubmenuItem
              to="/engineer-dashboard/contractors"
              onClick={closeSidebar}
              theme={currentTheme}
            >
              <FaHardHat />
              <span>Contractors</span>
            </SubmenuItem>
            <SubmenuItem
              to="/engineer-dashboard/workers"
              onClick={closeSidebar}
              theme={currentTheme}
            >
              <FaUserFriends />
              <span>Workers</span>
            </SubmenuItem>
          </Submenu>

          <MenuItem
            to="/engineer-dashboard/attendance"
            onClick={closeSidebar}
            theme={currentTheme}
          >
            <FaClipboardCheck />
            <span>Attendance</span>
          </MenuItem>

          <MenuItem
            to="/engineer-dashboard/payment"
            onClick={closeSidebar}
            theme={currentTheme}
          >
            <FaMoneyCheckAlt />
            <span>Payment</span>
          </MenuItem>

          <MenuToggle
            onClick={() => setReportsOpen(!reportsOpen)}
            $isOpen={reportsOpen}
            className={reportsOpen ? "active" : ""}
            theme={currentTheme}
          >
            <div>
              <FaFileAlt />
              <span>Reports</span>
            </div>
            <FaChevronDown />
          </MenuToggle>

          <Submenu $isOpen={reportsOpen}>
            <SubmenuItem
              to="/engineer-dashboard/attendance-reports"
              onClick={closeSidebar}
              theme={currentTheme}
            >
              <FaClipboardCheck />
              <span>Attendance Report</span>
            </SubmenuItem>
            <SubmenuItem
              to="/engineer-dashboard/payment-reports"
              onClick={closeSidebar}
              theme={currentTheme}
            >
              <FaMoneyCheckAlt />
              <span>Payment Report</span>
            </SubmenuItem>
          </Submenu>

          <MenuToggle
            onClick={() => setSettingsOpen(!settingsOpen)}
            $isOpen={settingsOpen}
            className={settingsOpen ? "active" : ""}
            theme={currentTheme}
          >
            <div>
              <FaCog />
              <span>Settings</span>
            </div>
            <FaChevronDown />
          </MenuToggle>

          <Submenu $isOpen={settingsOpen}>
            <SubmenuItem
              to="/engineer-dashboard/settings/change-password"
              onClick={closeSidebar}
              theme={currentTheme}
            >
              <FaKey />
              <span>Change Password</span>
            </SubmenuItem>
          </Submenu>
        </SidebarMenu>
      </SidebarContainer>
    </>
  );
};

export default EngineerSidebar;
