import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import styled from "styled-components";

// 🌟 Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #17a2b8, #2c3e50);
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 2rem;
  width: 100%;
  max-width: 450px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 12px;
  }
`;

const Title = styled.h3`
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(135deg, #2c3e50, #17a2b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1.25rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #17a2b8;
    box-shadow: 0 0 6px rgba(23, 162, 184, 0.4);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.85rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  background: linear-gradient(135deg, #17a2b8, #2c3e50);
  color: white;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(135deg, #2c3e50, #17a2b8);
  }
`;

const Settings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    userId: user._id,
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userId, newPassword, confirmPassword } = formData;

    if (!userId || !newPassword || !confirmPassword) {
      toast.warning("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.put(
        "https://bulding-constraction-employee-management.onrender.com/api/change.password",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Password changed successfully.");
        setFormData({
          userId: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error("Password change failed.");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <Container>
      <Card>
        <Title>🔑 Change Password</Title>
        <form onSubmit={handleSubmit}>
          <div>
            <Label>New Password</Label>
            <Input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              required
            />
          </div>

          <Button type="submit">Update Password</Button>
        </form>
      </Card>
    </Container>
  );
};

export default Settings;
