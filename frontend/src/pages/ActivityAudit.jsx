import { useMemo, useState } from "react";
import { Download, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { students } from "../data/students";

const PAGE_SIZE = 10;

function ActivityAudit() {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("All");
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        !query ||
        student.id.toLowerCase().includes(query) ||
        student.registrationNo.toLowerCase().includes(query) ||
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query);

      const matchesBranch =
        branch === "All" || student.branch === branch;

      const matchesStatus =
        status === "All" || student.status === status;

      return matchesSearch && matchesBranch && matchesStatus;
    });
  }, [search, branch, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / PAGE_SIZE)
  );

  const page = Math.min(currentPage, totalPages);

  const startIndex = (page - 1) * PAGE_SIZE;

  const pageStudents = filteredStudents.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const exportCSV = () => {
    const headers = [
      "Primary ID",
      "Registration No",
      "Student Name",
      "Branch",
      "Section",
      "Semester",
      "Email",
      "Total Points",
      "Activities",
      "Pending Certificates",
      "Status",
    ];

    const rows = filteredStudents.map((student) => [
      student.id,
      student.registrationNo,
      student.name,
      student.branch,
      student.section,
      student.semester,
      student.email,
      student.totalPoints,
      student.activitiesCount,
      student.pendingCertificates,
      student.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((value) => `"${value}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "buildsphere-student-data.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <main className="audit-page">
      <div className="audit-header">
        <div>
          <p className="dashboard-label">ACTIVITY MANAGEMENT</p>

          <h1>Student Activity Audit</h1>

          <p>
            Manage student records, branches, achievements and points.
          </p>
        </div>

        <button className="export-button" onClick={exportCSV}>
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <section className="audit-filters">
        <div className="search-box">
          <label>Search</label>

          <div className="search-input-wrapper">
            <Search size={16} />

            <input
              type="text"
              placeholder="Name, Primary ID or Registration No..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="filter-box">
          <label>Branch</label>

          <select
            value={branch}
            onChange={(e) => {
              setBranch(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="CE">CE</option>
            <option value="AI&ML">AI&ML</option>
            <option value="IoT">IoT</option>
            <option value="EE">EE</option>
          </select>
        </div>

        <div className="filter-box">
          <label>Status</label>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending Verification">
              Pending Verification
            </option>
          </select>
        </div>
      </section>

      <section className="audit-table-container">
        <div className="audit-table-header">
          <div>
            <h2>Student Records</h2>

            <p>
              Showing {pageStudents.length} of{" "}
              {filteredStudents.length} students
            </p>
          </div>

          <span className="audit-total">
            Total Students: {students.length}
          </span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Primary ID</th>
                <th>Registration No.</th>
                <th>Student</th>
                <th>Branch</th>
                <th>Section</th>
                <th>Points</th>
                <th>Activities</th>
                <th>Pending</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {pageStudents.length > 0 ? (
                pageStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <span className="primary-id">
                        {student.id}
                      </span>
                    </td>

                    <td>{student.registrationNo}</td>

                    <td>
                      <div className="student-cell">
                        <strong>{student.name}</strong>
                        <span>{student.email}</span>
                      </div>
                    </td>

                    <td>
                      <span className="branch-badge">
                        {student.branch}
                      </span>
                    </td>

                    <td>{student.section}</td>

                    <td>
                      <strong>{student.totalPoints}</strong>
                    </td>

                    <td>{student.activitiesCount}</td>

                    <td>{student.pendingCertificates}</td>

                    <td>
                      <span
                        className={`audit-status ${
                          student.status === "Active"
                            ? "approved"
                            : "pending"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-results">
                    No student records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <span>
            Page {page} of {totalPages}
          </span>

          <div className="pagination-buttons">
            <button
              disabled={page === 1}
              onClick={() =>
                setCurrentPage((value) => Math.max(1, value - 1))
              }
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <button
              disabled={page === totalPages}
              onClick={() =>
                setCurrentPage((value) =>
                  Math.min(totalPages, value + 1)
                )
              }
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ActivityAudit;