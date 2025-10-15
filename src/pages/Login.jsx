// import React, { useState } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { toast } from "react-toastify";
// import { useAuth } from "../context/authContext";
// import { useNavigate } from "react-router-dom";
// import HomeNavibar from "./HomeNavibar";

// const Login = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await axios.post(
//         "https://bulding-constraction-employee-management.onrender.com/api/login",
//         { email, password }
//       );

//       if (data.success && data.user && data.token) {
//         login(data.user, data.token); // ✅ Pass token to context login

//         // Redirect based on role
//         const role = data.user.role?.toLowerCase();

//         if (role === "engineer") {
//           navigate("/engineer-dashboard");
//         } else if (role === "supervisor") {
//           navigate("/supervisor-dashboard");
//           } else if (role === "contractor") 
//           navigate("/contractor-dashboard");
//           else if (role === "worker") {
//           navigate("/worker-dashboard");
//         } else {
//           toast.error("Unauthorized role detected.");
//           navigate("/unauthorized");
//         }

//         toast.success("✅ Successfully Logged In!");
//         setError(null);
//       } else {
//         setError("❌ Login failed. Check your credentials.");
//       }
//     } catch (error) {
//       setError(
//         error.response?.data?.message || "Server error. Please try again later."
//       );
//     }
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <HomeNavibar systemName="CONSTRUCTION EMPLOYEE MANAGEMENT SYSTEM" />

//       <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
//         <div
//           className="card p-4 shadow-lg border-0 w-100"
//           style={{ maxWidth: "420px", borderRadius: "16px" }}
//         >
//           <div className="text-center mb-4">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
//               alt="Login Icon"
//               width={70}
//               className="mb-2"
//             />
//             <h4 className="fw-bold">Welcome Back!</h4>
//             <p className="text-muted">Login to continue</p>
//           </div>

//           <form onSubmit={handleSubmit}>
//             {error && <div className="alert alert-danger">{error}</div>}

//             <div className="mb-3">
//               <label className="form-label fw-semibold">Email</label>
//               <input
//                 type="email"
//                 className="form-control rounded-pill"
//                 placeholder="Enter email"
//                 required
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   setError(null);
//                 }}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label fw-semibold">Password</label>
//               <div className="input-group">
//                 <input
//                   type={passwordVisible ? "text" : "password"}
//                   className="form-control rounded-start-pill"
//                   placeholder="Enter password"
//                   required
//                   value={password}
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                     setError(null);
//                   }}
//                 />
//                 <span
//                   className="input-group-text rounded-end-pill bg-white"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => setPasswordVisible(!passwordVisible)}
//                 >
//                   {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//             </div>

//             <div className="d-grid mt-4">
//               <button type="submit" className="btn btn-primary rounded-pill">
//                 🔐 Login
//               </button>
//             </div>
//           </form>

//           <div className="text-center mt-4">
//             <small className="text-muted">
//               © 2025 Construction EMS. All rights reserved.
//             </small>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import HomeNavibar from "./HomeNavibar";
import "../pages/Login.css"; // ✅ Custom styles

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post(
        "https://bulding-constraction-employee-management.onrender.com/api/login",
        { email, password }
      );

      if (data.success && data.user && data.token) {
        login(data.user, data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.user.role);

        const role = data.user.role?.toLowerCase();
        if (role === "engineer") navigate("/engineer-dashboard");
        else if (role === "supervisor") navigate("/supervisor-dashboard");
        else if (role === "contractor") navigate("/contractor-dashboard");
        else if (role === "worker") navigate("/worker-dashboard");
        else {
          toast.error("Unauthorized role detected.");
          navigate("/unauthorized");
        }

        toast.success(`Welcome, ${data.user.name}!`);
      } else {
        setError("❌ Login failed. Check your credentials.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Server error. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Navbar */}
      {/* <HomeNavibar systemName="CONSTRUCTION EMPLOYEE MANAGEMENT SYSTEM" /> */}

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Login</h2>
            <p>Please enter your credentials to login</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="alert alert-danger alert-dismissible fade show">
                {error}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setError(null)}
                ></button>
              </div>
            )}

            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <MdEmail className="input-icon" />
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <FaLock className="input-icon" />
                Password
              </label>
              <div className="password-input-group">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                />
                <span
                  className="password-toggle"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
