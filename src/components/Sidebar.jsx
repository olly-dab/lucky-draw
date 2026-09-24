import { NavLink } from "react-router-dom";

const Sidebar = ({ darkMode, setDarkMode }) => {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">🎯</div>

        <div>
          <h2>LuckyDraw</h2>
          <span>Management System</span>
        </div>
      </div>

      <div className="menu-title">MAIN MENU</div>

      <nav className="sidebar-menu">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <span>🏠</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/registration"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <span>👥</span>
          Registration
        </NavLink>

        <NavLink
          to="/lucky-draw"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <span>🎰</span>
          Lucky Draw
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <button
          className="theme-button"
          onClick={() => setDarkMode(!darkMode)}
        >
          <span>{darkMode ? "☀️" : "🌙"}</span>

          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <div className="sidebar-footer">
          <span>© 2026 LuckyDraw</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;