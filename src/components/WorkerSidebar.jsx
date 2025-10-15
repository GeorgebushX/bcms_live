import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  FaUser,
  FaMoneyBill,
  FaCog,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaMoon,
  FaSun,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaChartLine,
} from "react-icons/fa";
import { useAuth } from "../context/authContext";

const Title = styled.h6`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`;

const SidebarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2c3e50, #1a252f);
  color: white;
  overflow-y: auto;
`;

const SidebarHeader = styled.div`
  padding: 25px 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  background: rgba(0, 0, 0, 0.1);
  margin-top: 0;

  @media (max-width: 992px) {
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

  @media (min-width: 993px) {
    display: none;
  }
`;

const WorkerSidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 993);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const toggleReports = () => {
    setReportsOpen(prev => !prev);
  };

  const toggleSettings = () => {
    setSettingsOpen(prev => !prev);
  };

  if (!user) return null;

  const defaultUserImage = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const profileImage = user?.photo
    ? `${import.meta.env.VITE_API_URL || ""}${user.photo}`
    : defaultUserImage;

  return (
    <SidebarContainer>
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
        <h5 className="mb-1">{user?.name || "Worker"}</h5>
        <small style={{ color: "rgba(255,255,255,0.7)" }}>
          {user?.role || "Worker"}
        </small>
      </SidebarHeader>

      <SidebarMenu>
        <MenuItem
          to={`/worker-dashboard/profile/${user._id}`}
          onClick={onClose}
        >
          <FaUser />
          <span>My Profile</span>
        </MenuItem>

        <MenuItem
          to="/worker-dashboard/salary"
          onClick={onClose}
        >
          <FaMoneyBill />
          <span>My Salary</span>
        </MenuItem>

        <MenuToggle
          onClick={toggleReports}
          $isOpen={reportsOpen}
          className={reportsOpen ? "active" : ""}
        >
          <div>
            <FaChartLine />
            <span>My Reports</span>
          </div>
          <FaChevronDown />
        </MenuToggle>

        <Submenu $isOpen={reportsOpen}>
          <SubmenuItem
            to="/worker-dashboard/my-attendance-report"
            onClick={onClose}
          >
            <FaCalendarAlt />
            <span>My Attendance Report</span>
          </SubmenuItem>
          <SubmenuItem
            to="/worker-dashboard/my-salary-report"
            onClick={onClose}
          >
            <FaFileInvoiceDollar />
            <span>My Salary Report</span>
          </SubmenuItem>
        </Submenu>

        <MenuToggle
          onClick={toggleSettings}
          $isOpen={settingsOpen}
          className={settingsOpen ? "active" : ""}
        >
          <div>
            <FaCog />
            <span>Settings</span>
          </div>
          <FaChevronDown />
        </MenuToggle>

        <Submenu $isOpen={settingsOpen}>
          <SubmenuItem
            to="/worker-dashboard/settings/change-password"
            onClick={onClose}
          >
            <FaCog />
            <span>Change Password</span>
          </SubmenuItem>
        </Submenu>
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default WorkerSidebar;