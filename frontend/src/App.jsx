import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RoleSelection from "./pages/RoleSelection";
import InterviewSetup from "./pages/InterviewSetup";
import InterviewSession from "./pages/InterviewSession";
import Results from "./pages/Results";

function Layout() {

  const location = useLocation();

  const showNavbar = location.pathname === "/dashboard";

  return (
    <>
      {showNavbar && <Navbar />}

      <div style={{ paddingTop: showNavbar ? "80px" : "0px" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roles" element={<RoleSelection />} />
          <Route path="/interview-setup" element={<InterviewSetup />} />
          <Route path="/interview-session" element={<InterviewSession />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;