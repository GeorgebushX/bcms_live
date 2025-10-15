// import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import styled from "styled-components";
// import { useAuth } from "../context/authContext";
// import EngineerSidebar from "../components/dashboard/EngineerSidebar";
// import Navbar from "../components/dashboard/Navbar";

// // Styled Components
// const DashboardContainer = styled.div`
//   display: flex;
//   min-height: 100vh;
//   background-color: #f5f7fa;
//   position: relative;
// `;

// const SidebarContainer = styled.div`
//   width: 280px;
//   background: linear-gradient(135deg, #2c3e50, #4a6491);
//   color: white;
//   transition: transform 0.3s ease, width 0.3s ease;
//   box-shadow: 2px 0 10px rgba(43, 214, 236, 0.1);
//   position: fixed;
//   height: 100vh;
//   z-index: 100;
//   overflow-y: auto;

//   @media (max-width: 992px) {
//     transform: ${({ $isOpen }) =>
//       $isOpen ? "translateX(0)" : "translateX(-100%)"};
//     width: 280px;
//   }

//   @media (max-width: 76px) {
//     width: 100%;
//   }
// `;

// const MainContent = styled.div`
//   flex: 1;
//   margin-left: 280px;
//   transition: margin-left 0.3s ease;
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;

//   @media (max-width: 992px) {
//     margin-left: 0;
//     width: 100%;
//   }
// `;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 99;
//   opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
//   visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
//   transition: opacity 0.3s ease, visibility 0.3s ease;

//   @media (min-width: 993px) {
//     display: none;
//   }
// `;

// const ContentContainer = styled.div`
//   padding: 1.5rem;
//   flex: 1;
//   background-color: #f5f7fa;

//   @media (min-width: 768px) {
//     padding: 2rem;
//   }

//   @media (max-width: 576px) {
//     padding: 1rem;
//   }
// `;

// const EngineerDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { user } = useAuth();

//   useEffect(() => {
//     const handleResize = () => {
//       // Close sidebar when resizing to desktop
//       if (window.innerWidth > 992) {
//         setSidebarOpen(false);
//       }
//     };

//     // Check initial screen size
//     if (window.innerWidth > 992) {
//       setSidebarOpen(false);
//     }

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const closeSidebar = () => {
//     if (window.innerWidth <= 992) {
//       setSidebarOpen(false);
//     }
//   };

//   return (
//     <DashboardContainer>
//       {/* Mobile Overlay - Only shows on mobile when sidebar is open */}
//       <Overlay $isOpen={sidebarOpen} onClick={closeSidebar} />

//       {/* Sidebar - Fixed on desktop, toggleable on mobile */}
//       <SidebarContainer $isOpen={sidebarOpen}>
//         <EngineerSidebar
//           isOpen={sidebarOpen}
//           onClose={closeSidebar}
//           isControlled={true}
//         />
//       </SidebarContainer>

//       {/* Main Content Area */}
//       <MainContent>
//         {/* Navbar with responsive menu button */}
//         <Navbar onMenuClick={toggleSidebar} user={user} />

//         {/* Content Container with responsive padding */}
//         <ContentContainer>
//           <Outlet />
//         </ContentContainer>
//       </MainContent>
//     </DashboardContainer>
//   );
// };

// export default EngineerDashboard;





import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import { useAuth } from "../context/authContext";
import EngineerSidebar from "../components/dashboard/EngineerSidebar";
import Navbar from "../components/dashboard/Navbar";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  position: relative;
  transition: all 0.4s ease;
  animation: ${fadeIn} 0.5s ease;
`;

const SidebarContainer = styled.div`
  width: 280px;
  background: ${(props) => props.theme.sidebarBg};
  color: ${(props) => props.theme.sidebarText};
  transition: transform 0.3s ease, width 0.3s ease, box-shadow 0.3s ease;
  box-shadow: ${(props) => props.theme.sidebarShadow};
  position: fixed;
  height: 100vh;
  z-index: 100;
  overflow-y: auto;
  animation: ${slideIn} 0.3s ease;

  &:hover {
    box-shadow: ${(props) => props.theme.sidebarHoverShadow};
  }

  @media (max-width: 992px) {
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateX(0)" : "translateX(-100%)"};
    width: 280px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 280px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  transition: margin-left 0.3s ease, background-color 0.4s ease;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor};

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
  background-color: ${(props) => props.theme.overlayBg};
  z-index: 99;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  @media (min-width: 993px) {
    display: none;
  }
`;

const ContentContainer = styled.div`
  padding: 1.5rem;
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 576px) {
    padding: 1rem;
  }
`;

const ThemeToggle = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${(props) => props.theme.toggleBg};
  color: ${(props) => props.theme.toggleColor};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: ${(props) => props.theme.toggleShadow};
  z-index: 90;
  transition: all 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;

  &:hover {
    transform: scale(1.1);
    box-shadow: ${(props) => props.theme.toggleHoverShadow};
    animation: none;
  }
`;

// Theme definitions
const lightTheme = {
  bgColor: "#f8fafc",
  contentBg: "#ffffff",
  textColor: "#2d3748",
  sidebarBg: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  sidebarText: "#ffffff",
  sidebarShadow: "2px 0 15px rgba(59, 130, 246, 0.15)",
  sidebarHoverShadow: "2px 0 20px rgba(59, 130, 246, 0.3)",
  overlayBg: "rgba(0, 0, 0, 0.3)",
  toggleBg: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  toggleColor: "#ffffff",
  toggleShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
  toggleHoverShadow: "0 6px 16px rgba(59, 130, 246, 0.5)",
  cardBg: "#ffffff",
  cardShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  cardHoverShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
};

const darkTheme = {
  bgColor: "#1a202c",
  contentBg: "#2d3748",
  textColor: "#e2e8f0",
  sidebarBg: "linear-gradient(135deg, #1a202c, #2d3748)",
  sidebarText: "#e2e8f0",
  sidebarShadow: "2px 0 15px rgba(0, 0, 0, 0.3)",
  sidebarHoverShadow: "2px 0 20px rgba(66, 153, 225, 0.2)",
  overlayBg: "rgba(0, 0, 0, 0.7)",
  toggleBg: "linear-gradient(135deg, #f6ad55, #dd6b20)",
  toggleColor: "#1a202c",
  toggleShadow: "0 4px 12px rgba(246, 173, 85, 0.3)",
  toggleHoverShadow: "0 6px 16px rgba(246, 173, 85, 0.5)",
  cardBg: "#2d3748",
  cardShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  cardHoverShadow: "0 10px 15px rgba(0, 0, 0, 0.3)",
};

const EngineerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    } else if (prefersDark) {
      setDarkMode(true);
    }

    const handleResize = () => {
      if (window.innerWidth > 992) {
        setSidebarOpen(false);
      }
    };

    if (window.innerWidth > 992) {
      setSidebarOpen(false);
    }

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

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("darkMode", JSON.stringify(newTheme));
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <DashboardContainer theme={theme}>
      {/* Mobile Overlay - Only shows on mobile when sidebar is open */}
      <Overlay $isOpen={sidebarOpen} onClick={closeSidebar} theme={theme} />

      {/* Sidebar - Fixed on desktop, toggleable on mobile */}
      <SidebarContainer $isOpen={sidebarOpen} theme={theme}>
        <EngineerSidebar
          isOpen={sidebarOpen}
          onClose={closeSidebar}
          isControlled={true}
          theme={theme}
        />
      </SidebarContainer>

      {/* Main Content Area */}
      <MainContent theme={theme}>
        {/* Navbar with responsive menu button */}
        <Navbar onMenuClick={toggleSidebar} user={user} theme={theme} />

        {/* Content Container with responsive padding */}
        <ContentContainer theme={theme}>
          <Outlet />
        </ContentContainer>
      </MainContent>

      {/* Theme Toggle Button */}
      <ThemeToggle onClick={toggleTheme} theme={theme}>
        {darkMode ? "☀️" : "🌙"}
      </ThemeToggle>
    </DashboardContainer>
  );
};

export default EngineerDashboard;
