import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileCheck2, ClipboardList } from "lucide-react";

function AdminNavbar() {
  return (
    <nav className="admin-navbar">
      <div className="navbar-brand">
        <div className="brand-logo">B</div>

        <div>
          <h2>BuildSphere</h2>
          <span>Admin Portal</span>
        </div>
      </div>

      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <LayoutDashboard size={16} />
          Dashboard
        </NavLink>

        <NavLink
          to="/certificates"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <FileCheck2 size={16} />
          Certificates
        </NavLink>

        <NavLink
          to="/activity-audit"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <ClipboardList size={16} />
          Activity Audit
        </NavLink>
      </div>

      <div className="navbar-user">
        <div className="navbar-avatar">A</div>

        <div>
          <strong>Admin</strong>
          <span>Coordinator</span>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;