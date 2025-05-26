import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(`${API_URL}/users/auth/register`, {
        email,
        username,
        password,
      });
      navigate("/auth/sign-in");
    } catch (err) {
      setError("Registration failed. Email may already be in use.");
    }
  };

  return (
    <section className="m-4 lg:m-8 flex flex-col-reverse lg:flex-row gap-4">
      <div className="w-full lg:w-3/5 mt-8 lg:mt-24 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Join Us Today
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your email and password to register.
          </Typography>
        </div>

        <form onSubmit={handleRegister} className="mt-8 mb-2 mx-auto w-full px-4 max-w-screen-sm">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your username
            </Typography>
            <Input
              size="lg"
              placeholder="yourname"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
            />

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
            />

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
            />

            {error && (
              <Typography variant="small" color="red" className="text-sm">
                {error}
              </Typography>
            )}
          </div>

          <Checkbox
            label={
              <Typography variant="small" color="gray" className="flex items-center justify-start font-medium">
                I agree the&nbsp;
                <a href="#" className="font-normal text-black transition-colors hover:text-gray-900 underline">
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />

          <Button type="submit" className="mt-6" fullWidth>
            Register Now
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">
              Sign in
            </Link>
          </Typography>
        </form>
      </div>

      <div className="w-full lg:w-2/5 h-64 lg:h-auto relative rounded-3xl overflow-hidden flex-shrink-0">
        <img
          src="/img/pattern.png"
          className="absolute inset-0 h-full w-full object-cover"
          alt="Pattern Background"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 py-6">
          <img src="/icons/magic-wand.svg" alt="Magic Wand" className="w-8 h-8 lg:w-10 lg:h-10 mb-2" />
          <h1 className="text-2xl lg:text-4xl font-bold text-white drop-shadow-lg">
            PixieNest
          </h1>
          <p className="text-white text-xs lg:text-sm mt-2 lg:mt-4 max-w-sm opacity-80">
            A magical dashboard that helps Etsy sellers discover trends,
            optimize listings, and boost their sales.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
