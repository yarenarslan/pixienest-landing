import { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      // API endpoint'in varsa buraya yaz
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, { email });
      setMessage("Reset link sent to your email.");
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow-md bg-white rounded-lg">
      <Typography variant="h4" className="mb-4 text-center">Forgot Password</Typography>
      <form onSubmit={handleReset} className="space-y-4">
        <Input
          label="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" fullWidth>Send Reset Link</Button>
        {message && <Typography className="text-center mt-2">{message}</Typography>}
      </form>
    </div>
  );
}
