import { useMemo, useState } from "react";
import StatsCard from "../components/StatsCard";
import CertificateTable from "../components/CertificateTable";
import CertificateModal from "../components/CertificateModal";
import { students } from "../data/students";

function AdminDashboard() {
  const [selectedCertificate, setSelectedCertificate] =
    useState(null);

  const stats = useMemo(() => {
    const totalStudents = students.length;

    const pendingStudents = students.filter(
      (student) => student.status === "Pending Verification"
    );

    const approvedStudents = students.filter(
      (student) => student.status === "Active"
    );

    const totalPoints = students.reduce(
      (sum, student) => sum + student.totalPoints,
      0
    );

    return {
      totalStudents,
      pendingStudents: pendingStudents.length,
      approvedStudents: approvedStudents.length,
      totalPoints,
    };
  }, []);

  const branchCounts = useMemo(() => {
    const counts = {};

    students.forEach((student) => {
      counts[student.branch] =
        (counts[student.branch] || 0) + 1;
    });

    return counts;
  }, []);

  const pendingCertificates = useMemo(() => {
    return students
      .filter((student) => student.pendingCertificates > 0)
      .map((student, index) => ({
        id: student.id,
        student: student.name,
        event: `${student.branch} Achievement Activity`,
        category: student.branch,
        award: index % 2 === 0 ? "Winner" : "Participant",
        points: Math.min(
          20,
          Math.max(5, Math.floor(student.totalPoints / 4))
        ),
        status: "Pending",
      }));
  }, []);

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <main className="admin-dashboard">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-label">
            ADMIN PORTAL
          </p>

          <h1>Admin Dashboard</h1>

          <p className="dashboard-subtitle">
            Manage students, achievements, certificates and
            activity points.
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
          value={stats.totalStudents}
          description="Registered students"
        />

        <StatsCard
          title="Pending"
          value={stats.pendingStudents}
          description="Need verification"
        />

        <StatsCard
          title="Active Students"
          value={stats.approvedStudents}
          description="Verified student records"
        />

        <StatsCard
          title="Points Awarded"
          value={stats.totalPoints}
          description="Total activity points"
        />
      </section>

      <section className="branch-section">
        <div className="branch-section-header">
          <div>
            <h2>Branch Overview</h2>
            <p>Students grouped by academic branch.</p>
          </div>
        </div>

        <div className="branch-grid">
          {["CSE", "CE", "AI&ML", "IoT", "EE"].map(
            (branch) => (
              <div
                className="branch-card"
                key={branch}
              >
                <span>{branch}</span>
                <strong>
                  {branchCounts[branch] || 0}
                </strong>
                <small>Students</small>
              </div>
            )
          )}
        </div>
      </section>

      <section className="dashboard-section">
        <CertificateTable
          certificates={pendingCertificates}
          onView={handleViewCertificate}
        />
      </section>

      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}

export default AdminDashboard;