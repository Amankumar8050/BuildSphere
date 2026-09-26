function CertificateTable({ certificates = [], onView }) {
  return (
    <div className="certificate-table-container">
      <div className="section-header">
        <div>
          <h2>Pending Certificates</h2>
          <p>
            Review and verify student achievement records.
          </p>
        </div>

        <span className="pending-count">
          {certificates.length} Pending
        </span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Primary ID</th>
              <th>Student</th>
              <th>Event</th>
              <th>Category</th>
              <th>Award</th>
              <th>Points</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {certificates.length > 0 ? (
              certificates.map((certificate) => (
                <tr key={certificate.id}>
                  <td>
                    <span className="primary-id">
                      {certificate.id}
                    </span>
                  </td>

                  <td>{certificate.student}</td>

                  <td>{certificate.event}</td>

                  <td>
                    <span className="branch-badge">
                      {certificate.category}
                    </span>
                  </td>

                  <td>{certificate.award}</td>

                  <td>{certificate.points}</td>

                  <td>
                    <span className="status pending">
                      {certificate.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="view-button"
                      onClick={() => onView(certificate)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-results">
                  No pending certificates.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CertificateTable;