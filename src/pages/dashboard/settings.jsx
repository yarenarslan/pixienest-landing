import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Select,
  Option,
  Switch,
} from "@material-tailwind/react";

export function SettingsPage() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleThemeChange = (val) => setTheme(val);
  const handleLanguageChange = (val) => setLanguage(val);

  const handlePasswordChange = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // TODO: Send to backend
    alert("Password updated successfully.");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-6 text-indigo-700 font-bold">
        ⚙️ User Settings
      </Typography>

      <Card className="max-w-3xl mx-auto">
        <CardHeader floated={false} shadow={false} className="bg-blue-gray-50 p-4">
          <Typography variant="h6">Preferences</Typography>
        </CardHeader>
        <CardBody className="p-6 space-y-6">
          <div>
            <Typography variant="small" className="mb-2 block text-gray-700">
              Theme
            </Typography>
            <Select label="Choose Theme" value={theme} onChange={handleThemeChange}>
              <Option value="light">Light</Option>
              <Option value="dark">Dark</Option>
            </Select>
          </div>

          <div>
            <Typography variant="small" className="mb-2 block text-gray-700">
              Language
            </Typography>
            <Select label="Choose Language" value={language} onChange={handleLanguageChange}>
              <Option value="en">English</Option>
              <Option value="tr">Turkish</Option>
            </Select>
          </div>

          <div>
            <Typography variant="h6" className="mt-6 mb-2">
              Change Password
            </Typography>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button className="mt-4" onClick={handlePasswordChange}>
              Update Password
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default SettingsPage;
