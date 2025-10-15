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
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";

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

const ContractorSidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [isMyReportsOpen, setIsMyReportsOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
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

  const toggleMyReports = () => setIsMyReportsOpen(!isMyReportsOpen);
  const toggleReports = () => setIsReportsOpen(!isReportsOpen);

  if (!user) return null;

  const defaultImage = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const profileImage = user?.photo
    ? `${import.meta.env.VITE_API_URL || ""}${user.photo}`
    : defaultImage;

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
          alt="Contractor"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
        <h5 className="mb-1">{user?.name || "Contractor"}</h5>
        <small style={{ color: "rgba(255,255,255,0.7)" }}>
          Contractor
        </small>
      </SidebarHeader>

      <SidebarMenu>
        <MenuItem
          to="/contractor-dashboard"
          onClick={onClose}
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </MenuItem>

        <MenuItem
          to={`/contractor-dashboard/profile/${user._id}`}
          onClick={onClose}
        >
          <FaUser />
          <span>My Profile</span>
        </MenuItem>

        <MenuItem
          to="/contractor-dashboard/salary"
          onClick={onClose}
        >
          <FaMoneyBill />
          <span>My Salary</span>
        </MenuItem>

        <MenuToggle
          onClick={toggleMyReports}
          $isOpen={isMyReportsOpen}
          className={isMyReportsOpen ? "active" : ""}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaChartBar />
            <span>My Reports</span>
          </div>
          {isMyReportsOpen ? <FaChevronUp /> : <FaChevronDown />}
        </MenuToggle>

        <Submenu $isOpen={isMyReportsOpen}>
          <SubmenuItem
            to="/contractor-dashboard/my-attendance-report"
            onClick={onClose}
          >
            <FaClipboardList />
            <span>My Attendance Report</span>
          </SubmenuItem>

          <SubmenuItem
            to="/contractor-dashboard/my-salary-report"
            onClick={onClose}
          >
            <FaMoneyBill />
            <span>My Salary Report</span>
          </SubmenuItem>
        </Submenu>

        <MenuItem
          to="/contractor-dashboard/Workers"
          onClick={onClose}
        >
          <FaUserFriends />
          <span>Workers</span>
          </MenuItem>

        <MenuItem
          to="/contractor-dashboard/Workers-attendance"
          onClick={onClose}
        >
          <FaClipboardList />
          <span>Workers Attendance</span>
        </MenuItem>

        <MenuItem
          to="/contractor-dashboard/Workers-salary"
          onClick={onClose}
        >
          <FaFileInvoiceDollar />
          <span>Workers Salary</span>
        </MenuItem>

        <MenuToggle
          onClick={toggleReports}
          $isOpen={isReportsOpen}
          className={isReportsOpen ? "active" : ""}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaChartBar />
            <span>Reports</span>
          </div>
          {isReportsOpen ? <FaChevronUp /> : <FaChevronDown />}
        </MenuToggle>

        <Submenu $isOpen={isReportsOpen}>
          <SubmenuItem
            to="/contractor-dashboard/attendance-report"
            onClick={onClose}
          >
            <FaClipboardList />
            <span>Attendance Report</span>
          </SubmenuItem>

          <SubmenuItem
            to="/contractor-dashboard/payment-report"
            onClick={onClose}
          >
            <FaMoneyBill />
            <span>Payment Report</span>
          </SubmenuItem>
        </Submenu>

        <MenuItem
          to="/contractor-dashboard/settings/change-password"
          onClick={onClose}
        >
          <FaCog />
          <span>Settings</span>
        </MenuItem>
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default ContractorSidebar;