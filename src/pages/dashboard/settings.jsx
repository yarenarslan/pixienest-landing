import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Alert,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Settings() {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/auth/sign-in");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
        navigate("/auth/sign-in");
      }
    };

    fetchUser();
  }, [navigate]);

  const handlePasswordChange = async () => {
    if (password !== confirm) {
      setSuccess(false);
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      await axios.put(
        `${API_URL}/api/user/password`,
        { new_password: password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("✅ Password updated successfully.");
      setSuccess(true);
      setPassword("");
      setConfirm("");
    } catch (err) {
      console.error("Failed to update password:", err);
      setMessage("❌ Failed to update password.");
      setSuccess(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Card className="max-w-xl mx-auto">
        <CardHeader floated={false} shadow={false} className="p-4">
          <Typography variant="h5">User Settings</Typography>
        </CardHeader>
        <CardBody className="space-y-6">
          {user ? (
            <div>
              <Typography variant="small"><strong>Email:</strong> {user.email}</Typography>
              <Typography variant="small"><strong>Username:</strong> {user.username}</Typography>
            </div>
          ) : (
            <Typography variant="small">Loading user information...</Typography>
          )}

          <div className="space-y-2">
            <Typography variant="h6">Change Password</Typography>
            <Input
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Confirm Password"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <Button onClick={handlePasswordChange}>Update Password</Button>

            {message && (
              <Alert color={success ? "green" : "red"} className="mt-3">
                {message}
              </Alert>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
