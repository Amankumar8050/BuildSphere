import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  FileText,
  ShieldCheck,
} from "lucide-react";

function CertificateReview() {
  const [status, setStatus] = useState("Pending");

  const certificate = {
    id: "CERT-0001",
    studentId: "STU-0001",
    studentName: "Aman Kumar",
    registrationNo: "2515701001",
    branch: "CSE",
    semester: "3rd Semester",
    eventName: "AI Innovation Hackathon",
    organization: "ABC Institute",
    category: "Hackathon",
    awardLevel: "Winner",
    points: 20,
    fileName: "AI-Innovation-Hackathon-Certificate.pdf",
  };

  const handleApprove = () => {
    setStatus("Approved");
  };

  const handleReject = () => {
    setStatus("Rejected");
  };

  return (
    <main className="review-page">
      <div className="review-header">
        <div>
          <p className="review-eyebrow">Certificate Verification</p>
          <h1>Certificate Review</h1>
          <p className="review-subtitle">
            Verify student certificate details before awarding activity points.
          </p>
        </div>

        <div className={`review-status ${status.toLowerCase()}`}>
          {status}
        </div>
      </div>

      <div className="review-grid">
        {/* Student Information */}
        <section className="review-card">
          <div className="review-card-title">
            <ShieldCheck size={20} />
            <h2>Student Information</h2>
          </div>

          <div className="detail-grid">
            <div className="detail-item">
              <span>Student ID</span>
              <strong>{certificate.studentId}</strong>
            </div>

            <div className="detail-item">
              <span>Name</span>
              <strong>{certificate.studentName}</strong>
            </div>

            <div className="detail-item">
              <span>Registration No.</span>
              <strong>{certificate.registrationNo}</strong>
            </div>

            <div className="detail-item">
              <span>Branch</span>
              <strong>{certificate.branch}</strong>
            </div>

            <div className="detail-item">
              <span>Semester</span>
              <strong>{certificate.semester}</strong>
            </div>
          </div>
        </section>

        {/* Certificate Information */}
        <section className="review-card">
          <div className="review-card-title">
            <FileText size={20} />
            <h2>Certificate Information</h2>
          </div>

          <div className="detail-grid">
            <div className="detail-item">
              <span>Certificate ID</span>
              <strong>{certificate.id}</strong>
            </div>

            <div className="detail-item">
              <span>Event Name</span>
              <strong>{certificate.eventName}</strong>
            </div>

            <div className="detail-item">
              <span>Organization</span>
              <strong>{certificate.organization}</strong>
            </div>

            <div className="detail-item">
              <span>Category</span>
              <strong>{certificate.category}</strong>
            </div>

            <div className="detail-item">
              <span>Award Level</span>
              <strong>{certificate.awardLevel}</strong>
            </div>

            <div className="detail-item">
              <span>Points</span>
              <strong>{certificate.points}</strong>
            </div>
          </div>
        </section>

        {/* Certificate Preview */}
        <section className="review-card certificate-preview-card">
          <div className="review-card-title">
            <FileText size={20} />
            <h2>Certificate Preview</h2>
          </div>

          <div className="certificate-preview">
            <div className="certificate-placeholder">
              <FileText size={56} />

              <h3>Certificate Document</h3>

              <p>{certificate.fileName}</p>

              <span>
                Certificate preview will appear here when the uploaded file is
                connected.
              </span>
            </div>
          </div>
        </section>

        {/* Verification Actions */}
        <section className="review-card verification-card">
          <div className="review-card-title">
            <ShieldCheck size={20} />
            <h2>Verification Action</h2>
          </div>

          <p className="verification-text">
            Please verify the certificate details and select an action.
          </p>

          <div className="review-actions">
            <button
              type="button"
              className="approve-btn"
              onClick={handleApprove}
              disabled={status === "Approved"}
            >
              <CheckCircle2 size={19} />
              {status === "Approved" ? "Approved" : "Approve Certificate"}
            </button>

            <button
              type="button"
              className="reject-btn"
              onClick={handleReject}
              disabled={status === "Rejected"}
            >
              <XCircle size={19} />
              {status === "Rejected" ? "Rejected" : "Reject Certificate"}
            </button>
          </div>

          {status === "Approved" && (
            <div className="verification-message success">
              Certificate approved successfully. {certificate.points} points
              can now be awarded to the student.
            </div>
          )}

          {status === "Rejected" && (
            <div className="verification-message error">
              Certificate has been rejected. No points will be awarded.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default CertificateReview;