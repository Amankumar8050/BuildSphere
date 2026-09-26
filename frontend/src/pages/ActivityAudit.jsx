import { useMemo, useState } from "react";

const activities = [
  {
    id: 1,
    student: "Aman Kumar",
    rollNumber: "25157154906",
    event: "AI Innovation Hackathon",
    category: "Hackathon",
    points: 20,
    status: "Approved",
  },
  {
    id: 2,
    student: "Rahul Kumar",
    rollNumber: "25157154907",
    event: "Inter College Football",
    category: "Sports",
    points: 10,
    status: "Approved",
  },
  {
    id: 3,
    student: "Neha Singh",
    rollNumber: "25157154908",
    event: "NSS Camp",
    category: "NSS",
    points: 5,
    status: "Pending",
  },
  {
    id: 4,
    student: "Priya Kumari",
    rollNumber: "25157154909",
    event: "Coding Contest",
    category: "Hackathon",
    points: 15,
    status: "Approved",
  },
];

function ActivityAudit() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch =
        activity.student.toLowerCase().includes(search.toLowerCase()) ||
        activity.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
        activity.event.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || activity.category === category;

      const matchesStatus =
        status === "All" || activity.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, category, status]);

  const exportCSV = () => {
    const headers = [
      "Student",
      "Roll Number",
      "Event",
      "Category",
      "Points",
      "Status",
    ];

    const rows = filteredActivities.map((activity) => [
      activity.student,
      activity.rollNumber,
      activity.event,
      activity.category,
      activity.points,
      activity.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((value) => `"${value}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "student-activity-audit.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="audit-page">
      <div className="audit-header">
        <div>
          <p className="dashboard-label">ACTIVITY MANAGEMENT</p>

          <h1>Student Activity Audit</h1>

          <p>
            View and manage student achievements and activity points.
          </p>
        </div>

        <button className="export-button" onClick={exportCSV}>
          Export CSV
        </button>
      </div>

      <div className="audit-filters">
        <div className="search-box">
          <label>Search Student</label>

          <input
            type="text"
            placeholder="Search name, roll number or event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Sports">Sports</option>
            <option value="NSS">NSS</option>
          </select>
        </div>

        <div className="filter-box">
          <label>Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="audit-table-container">
        <div className="audit-table-header">
          <div>
            <h2>Activity Records</h2>

            <p>
              Showing {filteredActivities.length} record
              {filteredActivities.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll Number</th>
                <th>Event</th>
                <th>Category</th>
                <th>Points</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <tr key={activity.id}>
                    <td>{activity.student}</td>
                    <td>{activity.rollNumber}</td>
                    <td>{activity.event}</td>
                    <td>{activity.category}</td>
                    <td>{activity.points}</td>

                    <td>
                      <span
                        className={`audit-status ${activity.status.toLowerCase()}`}
                      >
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-results">
                    No activity records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ActivityAudit;