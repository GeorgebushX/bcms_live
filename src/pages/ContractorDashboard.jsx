import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/ContractorDashboard/CHeader";
import ContractorSidebar from "../components/ContractorDashboard/ContractorSidebar";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
  position: relative;
`;

const SidebarContainer = styled.div`
  width: 280px;
  background: linear-gradient(135deg, #2c3e50, #4a6491);
  color: white;
  transition: transform 0.3s ease;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100vh;
  z-index: 100;
  overflow-y: auto;

  @media (max-width: 992px) {
    transform: ${({ $isOpen }) => 
      $isOpen ? "translateX(0)" : "translateX(-100%)"};
    width: 280px;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 992px) {
    margin-left: 0;
    width: 100%;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};

  @media (min-width: 993px) {
    display: none;
  }
`;

const ContentContainer = styled.div`
  padding: 1.5rem;
  flex: 1;
  background-color: #f5f7fa;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 576px) {
    padding: 1rem;
  }
`;

const ContractorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Close sidebar when resizing to desktop
      if (window.innerWidth > 992) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (window.innerWidth <= 992) {
      setSidebarOpen(false);
    }
  };

  return (
    <DashboardContainer>
      {/* Mobile Overlay - Only shows on mobile when sidebar is open */}
      <Overlay 
        $isOpen={sidebarOpen} 
        onClick={closeSidebar}
      />

      {/* Sidebar - Fixed on desktop, toggleable on mobile */}
      <SidebarContainer $isOpen={sidebarOpen}>
        <ContractorSidebar 
          isOpen={sidebarOpen}
          onClose={closeSidebar}
        />
      </SidebarContainer>

      {/* Main Content Area */}
      <MainContent>
        {/* Header with responsive menu button */}
        <Header onMenuClick={toggleSidebar} />
        
        {/* Content Container with responsive padding */}
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </MainContent>
    </DashboardContainer>
  );
};

export default ContractorDashboard;