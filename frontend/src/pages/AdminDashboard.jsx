import { useState } from "react";
import StatsCard from "../components/StatsCard";
import CertificateTable from "../components/CertificateTable";
import CertificateModal from "../components/CertificateModal";

function AdminDashboard() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-label">ADMIN PORTAL</p>

          <h1>Admin Dashboard</h1>

          <p className="dashboard-subtitle">
            Manage student achievements, certificates and activity points.
          </p>
        </div>

        <div className="admin-profile">
          <div className="admin-avatar">A</div>

          <div>
            <strong>Activity Coordinator</strong>
            <span>Administrator</span>
          </div>
        </div>
      </header>

      <section className="stats-grid">
        <StatsCard
          title="Total Students"
          value="120"
          description="Registered students"
        />

        <StatsCard
          title="Pending Certificates"
          value="18"
          description="Waiting for verification"
        />

        <StatsCard
          title="Approved"
          value="95"
          description="Verified certificates"
        />

        <StatsCard
          title="Points Awarded"
          value="1,240"
          description="Total activity points"
        />
      </section>

      <section className="dashboard-section">
        <CertificateTable onView={handleViewCertificate} />
      </section>

      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default AdminDashboard;