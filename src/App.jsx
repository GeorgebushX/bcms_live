import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/EngineerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ContractorDashboard from "./pages/ContractorDashboard";
import WorkerDashboard from "./pages/WorkerDashboard"

// Route Guards
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";

// Dashboard Components
import AdminSummary from "./components/dashboard/DashboardSummary";
import SupervisorSummary from "./components/EmployeeDashboard/EDashboardSummary"
import ContractorDashboardSummary from "./components/ContractorDashboard/CDashboardSummary";

// Clients
import ClientList from "./components/Client/ClientList";
import AddClient from "./components/Client/AddClient";
import UpdateClient from "./components/Client/UpdateClient";

// Sites
import SiteList from "./components/Sites/SiteList";
import AddSite from "./components/Sites/AddSite";
import UpdateSite from "./components/Sites/UpdateSite";


// Supervisors
import SupervisorList from "./components/Supervisors/SupervisorList";
import AddSupervisor from "./components/Supervisors/AddSupervisor";
import UpdateSupervisor from "./components/Supervisors/UpdateSupervisor";

// Attendance
import AttendanceList from "./components/Attendance/AttendanceList";
import Reports from "./components/Attendance/Reports";

// Payments
import PaymentList from "./components/dashboard/Payment/PaymentList";
import AddPayment from "./components/dashboard/Payment/AddPayment";
import EditPayment from "./components/dashboard/Payment/EditPayment";
import PaymentReport from "./components/dashboard/Payment/PaymentReport";

// Settings
import ChangePassword from "./components/Settings/ChangePassword";

// Contractors
import ContractorList from "./components/EmployeeDashboard/Contractors/ContractorList";
import AddContractor from "./components/EmployeeDashboard/Contractors/AddContractor";
import UpdateContractor from "./components/EmployeeDashboard/Contractors/UpdateContractor";
import MySalary from "./components/EmployeeDashboard/SMySalary";
import SMyAttendanceReport from "./components/EmployeeDashboard/SMyAttendanceReport"
import SMySalaryReport from "./components/EmployeeDashboard/SMySalaryReport";


// Contractor Attendance
import ContractorAttendance from "./components/EmployeeDashboard/Contractors/CAttendance/CAttendance";
import ContractorReports from "./components/EmployeeDashboard/Contractors/CAttendance/CAReports"

// Contractor Payment
import CPaymentList from "./components/EmployeeDashboard/Contractors/CPayment/CPaymentList";
import CAddCPayment from "./components/EmployeeDashboard/Contractors/CPayment/CAddPayment";
import CEditPayment from "./components/EmployeeDashboard/Contractors/CPayment/CEditPayment"
import CPaymentReport from "./components/EmployeeDashboard/Contractors/CPayment/CPaymentReport";

// Workers 
import WorkerList from "./components/ContractorDashboard/Workers/WorkerList";
import AddWorker from "./components/ContractorDashboard/Workers/AddWorker";
import UpdateWorker from "./components/ContractorDashboard/Workers/UpdateWorker"

// Worker Attendance
import WorkerAttendanceList from "./components/ContractorDashboard/WAttendance/WAttendance";
import WAReport from "./components/ContractorDashboard/WAttendance/WAReport"

// worker payment
import WPaymentList from "./components/ContractorDashboard/WPayment/WPaymentList"
import WAddPayment from "./components/ContractorDashboard/WPayment/WAddPayment";
import WEditPayment from "./components/ContractorDashboard/WPayment/WEditPayment";
import WPaymentReport from "./components/ContractorDashboard/WPayment/WPaymentReports";

// Contractor my salary & report
import CMySalary from "./components/ContractorDashboard/CMySalary"
import CMySalaryReport from "./components/ContractorDashboard/CMySalaryReport"
import CMyAttendanceReport from './components/ContractorDashboard/CMyAttendanceReport'

// Workers my salary & report

import WMySalary from "./components/WMySalary"
import WMyAttendanceReport from "./components/WMyAttendanceReport"
import WMySalaryReport from "./components/WMySalaryReport"


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* ENGINEER DASHBOARD */}
        <Route
          path="/engineer-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["Engineer"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="clients" element={<ClientList />} />
          <Route path="add-client" element={<AddClient />} />
          <Route path="update-client/:id" element={<UpdateClient />} />

          <Route path="sites" element={<SiteList />} />
          <Route path="add-site" element={<AddSite />} />
          <Route path="update-site/:id" element={<UpdateSite />} />

          <Route path="supervisors" element={<SupervisorList />} />
          <Route path="add-supervisor" element={<AddSupervisor />} />
          <Route path="update-supervisor/:id" element={<UpdateSupervisor />} />

          <Route path="attendance" element={<AttendanceList />} />
          <Route path="attendance-reports" element={<Reports />} />

          <Route path="payment" element={<PaymentList />} />
          <Route path="add-payment" element={<AddPayment />} />
          <Route path="edit-payment/:id" element={<EditPayment />} />
          <Route path="payment-reports" element={<PaymentReport />} />

          <Route path="settings/change-password" element={<ChangePassword />} />
        </Route>


        {/* SUPERVISOR DASHBOARD WITH FULL NESTED ROUTES */}
        <Route
          path="/supervisor-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["Supervisor"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<SupervisorSummary />} />
           <Route path="/supervisor-dashboard/profile/:id" element={<UpdateSupervisor />} />
           <Route path="attendance" element={<AttendanceList />} />
            <Route path="salary" element={<MySalary />} />
            <Route path="my-attendance-report" element={<SMyAttendanceReport />} />
            <Route path="my-salary-report" element={<SMySalaryReport />} />

           
           <Route path="contractors" element={<ContractorList />} />
          <Route path="add-contractor" element={<AddContractor />} />
          <Route path="update-contractor/:id" element={<UpdateContractor />} />

           <Route path="contractor-attendance" element={<ContractorAttendance />} />
           <Route path="attendance-report" element={<ContractorReports />} />

           <Route path="contractor-salary" element={<CPaymentList />} />
           <Route path="add-payment" element={<CAddCPayment />} />
           <Route path="edit-payment/:id" element={<CEditPayment />} />
          <Route path="payment-report" element={<CPaymentReport />} />
          
          <Route path="settings/change-password" element={<ChangePassword />} />


        </Route>

        <Route
      path="/contractor-dashboard"
     element={
      <PrivateRoutes>
      <RoleBaseRoutes requiredRole={["Contractor"]}>
        <ContractorDashboard />
      </RoleBaseRoutes>
    </PrivateRoutes>
  }
>
  <Route index element={<ContractorDashboardSummary />} />
  <Route path="/contractor-dashboard/profile/:id" element={<UpdateContractor />} />
  <Route path="salary" element={<CMySalary />} />
  <Route path="my-salary-report" element={<CMySalaryReport />} />
  <Route path="my-attendance-report" element={<CMyAttendanceReport />} />


  <Route path="workers" element={<WorkerList />} />
  <Route path="add-worker" element={<AddWorker />} />
  <Route path="update-worker/:id" element={<UpdateWorker />} />

  <Route path="workers-attendance" element={<WorkerAttendanceList />} />
  <Route path="attendance-report" element={<WAReport />} />

  <Route path="workers-salary" element={<WPaymentList />} />
  <Route path="add-payment" element={<WAddPayment />} />
  <Route path="edit-payment/:id" element={<WEditPayment />} />
  <Route path="payment-report" element={<WPaymentReport />} />

  <Route path="settings/change-password" element={<ChangePassword />} />

  
</Route>

   // Worker Dashboard    
<Route
      path="/worker-dashboard"
     element={
      <PrivateRoutes>
      <RoleBaseRoutes requiredRole={["Worker"]}>
        <WorkerDashboard/>
      </RoleBaseRoutes>
    </PrivateRoutes>
  }
>

      <Route path="/worker-dashboard/profile/:id" element={<UpdateWorker />} />
      <Route path="salary" element={<WMySalary />} />
      <Route path="my-attendance-report" element={<WMyAttendanceReport />} />
      <Route path="my-salary-report" element={<WMySalaryReport />} />
      <Route path="settings/change-password" element={<ChangePassword />} />

</Route>

        {/* Redirect old admin route */}
        <Route
          path="/admin-dashboard/*"
          element={<Navigate to="/engineer-dashboard" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
