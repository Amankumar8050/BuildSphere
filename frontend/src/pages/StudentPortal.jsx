import { useMemo, useState } from "react";
import {
  Upload,
  Award,
  Clock3,
  CheckCircle2,
  FileText,
  LogOut,
} from "lucide-react";

function StudentPortal() {
  const student = {
    id: "STU-0001",
    name: "Aman Kumar",
    registrationNo: "2515701001",
    branch: "CSE",
    semester: "3rd Semester",
  };

  const [certificates, setCertificates] = useState([
    {
      id: "CERT-0001",
      event: "AI Innovation Hackathon",
      category: "Hackathon",
      points: 20,
      status: "Approved",
    },
    {
      id: "CERT-0002",
      event: "Inter College Football",
      category: "Sports",
      points: 10,
      status: "Pending",
    },
    {
      id: "CERT-0003",
      event: "NSS Camp",
      category: "NSS",
      points: 5,
      status: "Approved",
    },
  ]);

  const [form, setForm] = useState({
    event: "",
    organization: "",
    category: "Hackathon",
    award: "Participation",
    file: null,
  });

  const totalPoints = useMemo(() => {
    return certificates
      .filter((item) => item.status === "Approved")
      .reduce((sum, item) => sum + item.points, 0);
  }, [certificates]);

  const progress = Math.min(totalPoints, 100);

  const handleUpload = (e) => {
    e.preventDefault();

    if (!form.event || !form.file) {
      alert("Please enter event name and select a certificate.");
      return;
    }

    const newCertificate = {
      id: `CERT-${String(certificates.length + 1).padStart(4, "0")}`,
      event: form.event,
      category: form.category,
      points: 5,
      status: "Pending",
    };

    setCertificates((prev) => [newCertificate, ...prev]);

    setForm({
      event: "",
      organization: "",
      category: "Hackathon",
      award: "Participation",
      file: null,
    });

    const input = document.getElementById("certificate-file");

    if (input) {
      input.value = "";
    }

    alert("Certificate submitted successfully.");
  };

  return (
    <main className="student-page">
      <header className="student-header">
        <div>
          <p className="dashboard-label">STUDENT PORTAL</p>

          <h1>Welcome, {student.name}</h1>

          <p>
            {student.registrationNo} • {student.branch} •{" "}
            {student.semester}
          </p>
        </div>

        <button className="student-logout">
          <LogOut size={16} />
          Logout
        </button>
      </header>

      <section className="student-progress-card">
        <div className="progress-top">
          <div>
            <span>Activity Point Progress</span>

            <strong>
              {progress} / 100 Points
            </strong>
          </div>

          <Award size={30} />
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p>
          {progress < 100
            ? `${100 - progress} more points needed.`
            : "Target completed!"}
        </p>
      </section>

      <section className="student-stats">
        <div className="student-stat">
          <CheckCircle2 size={22} />
          <span>Approved</span>
          <strong>
            {
              certificates.filter(
                (item) => item.status === "Approved"
              ).length
            }
          </strong>
        </div>

        <div className="student-stat">
          <Clock3 size={22} />
          <span>Pending</span>
          <strong>
            {
              certificates.filter(
                (item) => item.status === "Pending"
              ).length
            }
          </strong>
        </div>

        <div className="student-stat">
          <FileText size={22} />
          <span>Certificates</span>
          <strong>{certificates.length}</strong>
        </div>

        <div className="student-stat">
          <Award size={22} />
          <span>Total Points</span>
          <strong>{totalPoints}</strong>
        </div>
      </section>

      <section className="student-card">
        <div className="student-card-header">
          <div>
            <h2>Upload Certificate</h2>
            <p>Submit a new achievement.</p>
          </div>

          <Upload size={22} />
        </div>

        <form
          className="student-upload-form"
          onSubmit={handleUpload}
        >
          <div className="student-form-group">
            <label>Event Name</label>

            <input
              type="text"
              value={form.event}
              onChange={(e) =>
                setForm({
                  ...form,
                  event: e.target.value,
                })
              }
              placeholder="AI Innovation Hackathon"
            />
          </div>

          <div className="student-form-group">
            <label>Organization</label>

            <input
              type="text"
              value={form.organization}
              onChange={(e) =>
                setForm({
                  ...form,
                  organization: e.target.value,
                })
              }
              placeholder="Organizing Institution"
            />
          </div>

          <div className="student-form-group">
            <label>Category</label>

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
            >
              <option>Hackathon</option>
              <option>Sports</option>
              <option>NSS</option>
              <option>Other</option>
            </select>
          </div>

          <div className="student-form-group">
            <label>Award Level</label>

            <select
              value={form.award}
              onChange={(e) =>
                setForm({
                  ...form,
                  award: e.target.value,
                })
              }
            >
              <option>Participation</option>
              <option>Finalist</option>
              <option>Runner Up</option>
              <option>Winner</option>
            </select>
          </div>

          <div className="student-form-group full">
            <label>Certificate File</label>

            <input
              id="certificate-file"
              type="file"
              accept=".pdf,image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  file: e.target.files?.[0] || null,
                })
              }
            />
          </div>

          <button
            type="submit"
            className="student-upload-button"
          >
            <Upload size={16} />
            Submit Certificate
          </button>
        </form>
      </section>

      <section className="student-card">
        <div className="student-card-header">
          <div>
            <h2>My Certificates</h2>
            <p>Your submitted achievements.</p>
          </div>
        </div>

        <div className="student-certificate-list">
          {certificates.map((certificate) => (
            <div
              className="student-certificate-item"
              key={certificate.id}
            >
              <div>
                <strong>{certificate.event}</strong>

                <span>
                  {certificate.category} • {certificate.id}
                </span>
              </div>

              <div className="certificate-right">
                <strong>{certificate.points} pts</strong>

                <span
                  className={`student-status ${certificate.status.toLowerCase()}`}
                >
                  {certificate.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default StudentPortal;