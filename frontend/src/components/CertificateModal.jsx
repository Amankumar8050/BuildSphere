function CertificateModal({ certificate, onClose }) {
  if (!certificate) {
    return null;
  }

  const handleApprove = () => {
    alert(`Certificate approved for ${certificate.student}`);
    onClose();
  };

  const handleReject = () => {
    alert(`Certificate rejected for ${certificate.student}`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="certificate-modal">
        <div className="modal-header">
          <div>
            <h2>Certificate Details</h2>
            <p>Review certificate information before verification.</p>
          </div>

          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="certificate-details">
          <div>
            <span>Student</span>
            <strong>{certificate.student}</strong>
          </div>

          <div>
            <span>Event</span>
            <strong>{certificate.event}</strong>
          </div>

          <div>
            <span>Category</span>
            <strong>{certificate.category}</strong>
          </div>

          <div>
            <span>Award Level</span>
            <strong>{certificate.award}</strong>
          </div>

          <div>
            <span>Points</span>
            <strong>{certificate.points}</strong>
          </div>
        </div>

        <div className="certificate-preview">
          <p>Certificate Preview</p>

          <div className="preview-box">
            Certificate document will appear here.
          </div>
        </div>

        <div className="modal-actions">
          <button className="reject-button" onClick={handleReject}>
            Reject
          </button>

          <button className="approve-button" onClick={handleApprove}>
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

export default CertificateModal;