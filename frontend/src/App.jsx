import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminNavbar from "./components/AdminNavbar";
import AdminDashboard from "./pages/AdminDashboard";
import CertificateReview from "./pages/CertificateReview";
import ActivityAudit from "./pages/ActivityAudit";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AdminNavbar />

      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/certificates" element={<CertificateReview />} />
        <Route path="/activity-audit" element={<ActivityAudit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;