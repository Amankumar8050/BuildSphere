import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminNavbar from "./components/AdminNavbar";

import Landing from "./pages/Landing";
import StudentPortal from "./pages/StudentPortal";

import AdminDashboard from "./pages/AdminDashboard";
import ActivityAudit from "./pages/ActivityAudit";
import CertificateReview from "./pages/CertificateReview";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing */}
        <Route path="/" element={<Landing />} />

        {/* Student */}
        <Route path="/student" element={<StudentPortal />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <>
              <AdminNavbar />
              <AdminDashboard />
            </>
          }
        />

        <Route
          path="/certificates"
          element={
            <>
              <AdminNavbar />
              <CertificateReview />
            </>
          }
        />

        <Route
          path="/activity-audit"
          element={
            <>
              <AdminNavbar />
              <ActivityAudit />
            </>
          }
        />

        {/* Temporary login/register demo */}
        <Route path="/login" element={<StudentPortal />} />
        <Route path="/register" element={<StudentPortal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;