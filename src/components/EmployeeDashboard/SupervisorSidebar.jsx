import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  FaTachometerAlt,
  FaUser,
  FaMoneyBill,
  FaUsers,
  FaCog,
  FaClipboardList,
  FaUserFriends,
  FaFileInvoiceDollar,
  FaChartBar,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
  width: 280px;
  height: 100vh;
  background: linear-gradient(135deg, #2c3e50, #1a252f);
  color: white;
  z-index: 1100;
  transition: all 0.3s ease;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  @media (max-width: 576px) {
    width: 100%;
    left: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
  }

  @media (min-width: 577px) and (max-width: 991px) {
    width: 280px;
    left: ${({ $isOpen }) => ($isOpen ? "0" : "-280px")};
  }

  @media (min-width: 992px) {
    left: 0;
  }
`;

const SidebarHeader = styled.div`
  padding: 25px 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  background: rgba(0, 0, 0, 0.1);
  margin-top: 70px;

  @media (min-width: 992px) {
    margin-top: 0;
  }

  @media (max-width: 576px) {
    margin-top: 60px;
  }
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SidebarMenu = styled.div`
  padding: 15px 0;
`;

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  margin: 5px 10px;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transform: translateX(5px);
  }

  &.active {
    background: #3498db;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateX(5px);
  }

  svg {
    margin-right: 10px;
    font-size: 18px;
    flex-shrink: 0;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const SubmenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 45px;
  margin: 3px 10px;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s;
  font-size: 14px;
  position: relative;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }

  &.active {
    background: rgba(52, 152, 219, 0.3);
    color: white;

    &::before {
      content: "";
      position: absolute;
      left: 30px;
      top: 50%;
      transform: translateY(-50%);
      width: 5px;
      height: 5px;
      background: white;
      border-radius: 50%;
    }
  }

  svg {
    margin-right: 10px;
    font-size: 14px;
    flex-shrink: 0;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const MenuToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 20px;
  margin: 5px 10px;
  border-radius: 6px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  text-align: left;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  &.active {
    background: #3498db;
    color: white;
  }

  svg:first-child {
    margin-right: 10px;
    font-size: 18px;
    flex-shrink: 0;
  }

  svg:last-child {
    font-size: 12px;
    transition: transform 0.3s;
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
  }
`;

const Submenu = styled.div`
  overflow: hidden;
  max-height: ${({ $isOpen }) => ($isOpen ? "500px" : "0")};
  transition: max-height 0.3s ease-in-out;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 1200;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
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
  background: rgba(0, 0, 0, 0.5);
  z-index: 1099;
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: all 0.3s;
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};

  @media (min-width: 992px) {
    display: none;
  }
`;

const SupervisorSidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [reportsOpen, setReportsOpen] = useState(false);
  const [myReportsOpen, setMyReportsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  if (!user) return null;

  const defaultUserImage = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const profileImage = user?.photo
    ? `${import.meta.env.VITE_API_URL || ""}${user.photo}`
    : defaultUserImage;

  return (
    <>
      {isMobile && (
        <Overlay $isOpen={isOpen} onClick={onClose} />
      )}
      
      <SidebarContainer $isOpen={isOpen}>
        {isMobile && (
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        )}
        
        <SidebarHeader>
          <ProfileImage
            src={profileImage}
            alt="User"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultUserImage;
            }}
          />
          <h5 className="mb-1">{user?.name || "Supervisor"}</h5>
          <small style={{ color: "rgba(255,255,255,0.7)" }}>
            {user?.role || "Supervisor"}
          </small>
        </SidebarHeader>

        <SidebarMenu>
          <MenuItem
            to="/supervisor-dashboard"
            onClick={onClose}
            end
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </MenuItem>

          <MenuItem
            to={`/supervisor-dashboard/profile/${user._id}`}
            onClick={onClose}
          >
            <FaUser />
            <span>My Profile</span>
          </MenuItem>

          <MenuItem
            to="/supervisor-dashboard/salary"
            onClick={onClose}
          >
            <FaMoneyBill />
            <span>My Salary</span>
          </MenuItem>

          <MenuToggle
            onClick={() => setMyReportsOpen(!myReportsOpen)}
            $isOpen={myReportsOpen}
            className={myReportsOpen ? "active" : ""}
          >
            <div>
              <FaUsers />
              <span>My Reports</span>
            </div>
            <FaChevronDown />
          </MenuToggle>

          <Submenu $isOpen={myReportsOpen}>
            <SubmenuItem
              to="/supervisor-dashboard/my-attendance-report"
              onClick={onClose}
            >
              <FaClipboardList />
              <span>My Attendance Report</span>
            </SubmenuItem>
            <SubmenuItem
              to="/supervisor-dashboard/my-salary-report"
              onClick={onClose}
            >
              <FaMoneyBill />
              <span>My Salary Report</span>
            </SubmenuItem>
          </Submenu>

          <MenuItem
            to="/supervisor-dashboard/contractors"
            onClick={onClose}
          >
            <FaUserFriends />
            <span>Contractors</span>
          </MenuItem>

          <MenuItem
            to="/supervisor-dashboard/contractor-attendance"
            onClick={onClose}
          >
            <FaClipboardList />
            <span>Contractor Attendance</span>
          </MenuItem>

          <MenuItem
            to="/supervisor-dashboard/contractor-salary"
            onClick={onClose}
          >
            <FaFileInvoiceDollar />
            <span>Contractor Salary</span>
          </MenuItem>

          <MenuToggle
            onClick={() => setReportsOpen(!reportsOpen)}
            $isOpen={reportsOpen}
            className={reportsOpen ? "active" : ""}
          >
            <div>
              <FaChartBar />
              <span>Contractor Reports</span>
            </div>
            <FaChevronDown />
          </MenuToggle>

          <Submenu $isOpen={reportsOpen}>
            <SubmenuItem
              to="/supervisor-dashboard/attendance-report"
              onClick={onClose}
            >
              <FaClipboardList />
              <span>Attendance Report</span>
            </SubmenuItem>
            <SubmenuItem
              to="/supervisor-dashboard/payment-report"
              onClick={onClose}
            >
              <FaMoneyBill />
              <span>Payment Report</span>
            </SubmenuItem>
          </Submenu>

          <MenuItem
            to="/supervisor-dashboard/settings/change-password"
            onClick={onClose}
          >
            <FaCog />
            <span>Settings</span>
          </MenuItem>
        </SidebarMenu>
      </SidebarContainer>
    </>
  );
};

export default SupervisorSidebar;