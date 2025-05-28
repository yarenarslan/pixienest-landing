import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const url = `${import.meta.env.VITE_API_URL}/users/auth/reset-password/${token}`;

    try {
      await axios.post(url, {
        new_password: newPassword,
      });

      setSuccess(true);
    } catch (err) {
      setError("Token expired or invalid. Try again.");
    }
  };

  // ✅ Başarıyla şifre yenilendiyse /auth/sign-in sayfasına yönlendir
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate("/auth/sign-in"), 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4">
      <Card className="w-full max-w-sm p-6 shadow-xl bg-white">
        <CardBody className="flex flex-col gap-4">
          <div className="text-center mb-4">
            <img
              src="/icons/magic-wand.svg"
              alt="PixieNest"
              className="w-8 h-8 mx-auto mb-2"
            />
            <Typography variant="h5" className="font-bold text-gray-900">
              Reset Your Password
            </Typography>
            <Typography className="text-sm text-gray-600 mt-1">
              Enter a new password to reset your account
            </Typography>
          </div>

          {success ? (
            <Typography className="text-green-600 text-center">
              Password reset successful! Redirecting to sign-in...
            </Typography>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="text-black"
              />
              <Button
                type="submit"
                fullWidth
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:scale-105 transition-transform duration-300"
              >
                Submit
              </Button>
              {error && (
                <Typography className="text-red-600 text-sm text-center">
                  {error}
                </Typography>
              )}
            </form>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
