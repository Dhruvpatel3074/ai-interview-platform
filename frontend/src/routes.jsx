import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RoleSelection from "./pages/RoleSelection";
import InterviewSetup from "./pages/InterviewSetup";
import InterviewSession from "./pages/InterviewSession";
import Results from "./pages/Results";
import InterviewHistory from "./pages/InterviewHistory";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/role-selection" element={<RoleSelection />} />

      <Route path="/interview-setup" element={<InterviewSetup />} />

      <Route path="/interview-session" element={<InterviewSession />} />

      <Route path="/results" element={<Results />} />

      <Route path="/history" element={<InterviewHistory />} />

    </Routes>
  );
}