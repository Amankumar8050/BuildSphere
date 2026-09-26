const certificates = [
  {
    id: 1,
    student: "Aman Kumar",
    event: "AI Innovation Hackathon",
    category: "Hackathon",
    award: "Winner",
    points: 20,
    status: "Pending",
  },
  {
    id: 2,
    student: "Rahul Kumar",
    event: "Inter College Football",
    category: "Sports",
    award: "Participant",
    points: 10,
    status: "Pending",
  },
  {
    id: 3,
    student: "Neha Singh",
    event: "NSS Camp",
    category: "NSS",
    award: "Participant",
    points: 5,
    status: "Pending",
  },
];

function CertificateTable({ onView }) {
  return (
    <div className="certificate-table-container">
      <div className="section-header">
        <div>
          <h2>Pending Certificates</h2>
          <p>Review and verify student achievements.</p>
        </div>

        <span className="pending-count">
          {certificates.length} Pending
        </span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
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
            {certificates.map((certificate) => (
              <tr key={certificate.id}>
                <td>{certificate.student}</td>
                <td>{certificate.event}</td>
                <td>{certificate.category}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CertificateTable;