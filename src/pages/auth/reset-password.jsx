import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Input, Button, Typography } from "@material-tailwind/react";

export default function ResetPassword() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleReset = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/user/reset-password`, {
        user_id: parseInt(id),
        new_password: newPassword,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/auth/sign-in"), 1500);
    } catch (err) {
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <Typography variant="h4" className="mb-4">
        Reset Your Password
      </Typography>
      <Input
        type="password"
        label="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="max-w-xs"
      />
      <Button onClick={handleReset} className="mt-4">
        Submit
      </Button>
      {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
    </div>
  );
}
