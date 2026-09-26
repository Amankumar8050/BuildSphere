import { useEffect, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  FileText,
  ShieldCheck,
  Loader2,
  Sparkles,
} from "lucide-react";

import {
  getCertificateById,
  updateCertificateStatus,
  extractCertificateMetadata,
} from "../services/api";

function CertificateReview() {
  const [certificate, setCertificate] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiData, setAiData] = useState(null);

  // Temporary ID for development.
  // Later get this from the URL.
  const certificateId = "CERT-0001";

  useEffect(() => {
    const loadCertificate = async () => {
      try {
        const data = await getCertificateById(certificateId);

        setCertificate(data);
        setStatus(
          data?.status === "APPROVED"
            ? "Approved"
            : data?.status === "REJECTED"
              ? "Rejected"
              : "Pending"
        );
      } catch (error) {
        console.error("Certificate loading error:", error);

        setMessage(
          "Certificate could not be loaded from backend."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCertificate();
  }, []);

  const handleApprove = async () => {
    if (!certificate || actionLoading) return;

    setActionLoading("approve");
    setMessage("");

    try {
      await updateCertificateStatus(
        certificate.id,
        "APPROVED"
      );

      setStatus("Approved");
      setCertificate((prev) => ({
        ...prev,
        status: "APPROVED",
      }));

      setMessage(
        "Certificate approved and points can now be awarded."
      );
    } catch (error) {
      console.error(error);

      setMessage(
        error?.response?.data?.message ||
          "Unable to approve certificate."
      );
    } finally {
      setActionLoading("");
    }
  };

  const handleReject = async () => {
    if (!certificate || actionLoading) return;

    setActionLoading("reject");
    setMessage("");

    try {
      await updateCertificateStatus(
        certificate.id,
        "REJECTED"
      );

      setStatus("Rejected");
      setCertificate((prev) => ({
        ...prev,
        status: "REJECTED",
      }));

      setMessage("Certificate rejected.");
    } catch (error) {
      console.error(error);

      setMessage(
        error?.response?.data?.message ||
          "Unable to reject certificate."
      );
    } finally {
      setActionLoading("");
    }
  };

  const handleAIExtraction = async () => {
    if (!certificate || aiLoading) return;

    setAiLoading(true);
    setMessage("");

    try {
      const result = await extractCertificateMetadata(
        certificate.id
      );

      setAiData(result?.data || result);

      setMessage(
        "Certificate metadata extracted successfully."
      );
    } catch (error) {
      console.error(error);

      setMessage(
        error?.response?.data?.message ||
          "AI metadata extraction failed."
      );
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="review-page">
        <div className="review-loading">
          <Loader2 className="spin" size={32} />
          <p>Loading certificate...</p>
        </div>
      </main>
    );
  }

  if (!certificate) {
    return (
      <main className="review-page">
        <div className="review-card">
          <h2>Certificate unavailable</h2>
          <p>
            The certificate could not be retrieved from the
            backend.
          </p>
        </div>
      </main>
    );
  }

  const fileUrl = certificate.fileUrl || "";
  const isPdf = fileUrl.toLowerCase().includes(".pdf");

  return (
    <main className="review-page">
      <div className="review-header">
        <p className="dashboard-label">
          CERTIFICATE MANAGEMENT
        </p>

        <div className="review-title-row">
          <div>
            <h1>Certificate Review</h1>
            <p>
              Verify the uploaded proof before awarding
              activity points.
            </p>
          </div>

          <span
            className={`review-status ${status.toLowerCase()}`}
          >
            {status}
          </span>
        </div>
      </div>

      {message && (
        <div
          className={`review-message ${
            status === "Approved"
              ? "approved"
              : status === "Rejected"
                ? "rejected"
                : ""
          }`}
        >
          {status === "Approved" ? (
            <CheckCircle2 size={18} />
          ) : status === "Rejected" ? (
            <XCircle size={18} />
          ) : null}

          <span>{message}</span>
        </div>
      )}

      <div className="review-grid">
        <section className="review-card">
          <div className="review-card-header">
            <div>
              <h2>Student Information</h2>
              <p>Applicant details</p>
            </div>
          </div>

          <div className="review-details">
            <div>
              <span>Primary ID</span>
              <strong>{certificate.studentId}</strong>
            </div>

            <div>
              <span>Student</span>
              <strong>{certificate.studentName}</strong>
            </div>

            <div>
              <span>Registration No.</span>
              <strong>
                {certificate.registrationNo}
              </strong>
            </div>

            <div>
              <span>Branch</span>
              <strong>{certificate.branch}</strong>
            </div>

            <div>
              <span>Semester</span>
              <strong>{certificate.semester}</strong>
            </div>
          </div>
        </section>

        <section className="review-card">
          <div className="review-card-header">
            <div>
              <h2>Certificate Information</h2>
              <p>Uploaded certificate metadata</p>
            </div>

            <ShieldCheck size={22} />
          </div>

          <div className="review-details">
            <div>
              <span>Certificate ID</span>
              <strong>{certificate.id}</strong>
            </div>

            <div>
              <span>Event</span>
              <strong>{certificate.eventName}</strong>
            </div>

            <div>
              <span>Organization</span>
              <strong>{certificate.organization}</strong>
            </div>

            <div>
              <span>Category</span>
              <strong>{certificate.category}</strong>
            </div>

            <div>
              <span>Award Level</span>
              <strong>{certificate.awardLevel}</strong>
            </div>

            <div>
              <span>Points</span>
              <strong>{certificate.points}</strong>
            </div>
          </div>
        </section>
      </div>

      <section className="review-card preview-card">
        <div className="review-card-header">
          <div>
            <h2>Certificate Preview</h2>
            <p>{certificate.fileName}</p>
          </div>

          <FileText size={22} />
        </div>

        <div className="real-certificate-preview">
          {fileUrl ? (
            isPdf ? (
              <iframe
                src={fileUrl}
                title="Certificate PDF"
                className="certificate-frame"
              />
            ) : (
              <img
                src={fileUrl}
                alt="Student Certificate"
                className="certificate-image"
              />
            )
          ) : (
            <>
              <FileText size={48} />
              <span>Certificate file unavailable</span>
            </>
          )}
        </div>

        <div className="review-actions">
          <button
            className="ai-button"
            onClick={handleAIExtraction}
            disabled={aiLoading}
          >
            {aiLoading ? (
              <Loader2 className="spin" size={16} />
            ) : (
              <Sparkles size={16} />
            )}

            {aiLoading
              ? "Extracting..."
              : "Extract Metadata"}
          </button>

          <button
            className="reject-button"
            onClick={handleReject}
            disabled={
              status === "Rejected" ||
              actionLoading !== ""
            }
          >
            {actionLoading === "reject" ? (
              <Loader2 className="spin" size={16} />
            ) : (
              <XCircle size={16} />
            )}

            {status === "Rejected"
              ? "Rejected"
              : "Reject"}
          </button>

          <button
            className="approve-button"
            onClick={handleApprove}
            disabled={
              status === "Approved" ||
              actionLoading !== ""
            }
          >
            {actionLoading === "approve" ? (
              <Loader2 className="spin" size={16} />
            ) : (
              <CheckCircle2 size={16} />
            )}

            {status === "Approved"
              ? "Approved"
              : "Approve"}
          </button>
        </div>
      </section>

      {aiData && (
        <section className="review-card ai-result-card">
          <div className="review-card-header">
            <div>
              <h2>AI Extracted Metadata</h2>
              <p>
                Review extracted values before verification.
              </p>
            </div>

            <Sparkles size={22} />
          </div>

          <div className="review-details">
            <div>
              <span>Event Name</span>
              <strong>
                {aiData.eventName || "Not detected"}
              </strong>
            </div>

            <div>
              <span>Organization</span>
              <strong>
                {aiData.organization || "Not detected"}
              </strong>
            </div>

            <div>
              <span>Award Level</span>
              <strong>
                {aiData.awardLevel || "Not detected"}
              </strong>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default CertificateReview;