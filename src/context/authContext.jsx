// src/context/authContext.jsx
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [workers, setWorkers] = useState(() => {
    const storedWorkers = localStorage.getItem("workers");
    return storedWorkers ? JSON.parse(storedWorkers) : [];
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    localStorage.setItem("workers", JSON.stringify(workers));
  }, [workers]);

  const verifyUser = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        clearAuth();
        return;
      }

      const response = await axios.get(
        "https://bulding-constraction-employee-management.onrender.com/api/verify",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data?.success && response.data.user) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Fetch workers immediately after verifying user
        await fetchWorkers(token);
      } else {
        clearAuth();
      }
    } catch (error) {
      console.error(
        "User verification failed:",
        error.response?.data || error.message
      );
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkers = async (token) => {
    try {
      const { data } = await axios.get(
        "https://bulding-constraction-employee-management.onrender.com/api/workers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Your backend returns { success, data: [...] }
      if (data?.success && Array.isArray(data.data)) {
        setWorkers(data.data);
      } else {
        setWorkers([]);
      }
    } catch (err) {
      console.error(
        "Error fetching workers:",
        err.response?.data || err.message
      );
      setWorkers([]);
    }
  };

  const login = (userData, token) => {
    setUser(userData);
    if (token) {
      localStorage.setItem("token", token);
    }
    localStorage.setItem("user", JSON.stringify(userData));

    // Fetch workers on login
    if (token) {
      fetchWorkers(token);
    }
  };

  const logout = () => {
    clearAuth();
  };

  const clearAuth = () => {
    setUser(null);
    setWorkers([]);
    localStorage.clear(); // ✅ Completely clears all localStorage keys
  };

  const isAuthenticated = !!user;

  return (
    <UserContext.Provider
      value={{
        user,
        workers,
        setWorkers,
        login,
        logout,
        verifyUser,
        isAuthenticated,
        loading,
      }}
    >
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
export { AuthProvider };
