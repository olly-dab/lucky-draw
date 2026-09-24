import { useLocation } from "react-router-dom";

const Topbar = () => {
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname === "/") return "Dashboard";
    if (location.pathname === "/registration") return "Participant Registration";
    if (location.pathname === "/lucky-draw") return "Lucky Draw";

    return "LuckyDraw";
  };

  return (
    <header className="topbar">
      <div>
        <p className="breadcrumb">LuckyDraw /</p>
        <h1>{getPageTitle()}</h1>
      </div>

      <div className="admin-profile">
        <div className="notification">🔔</div>

        <div className="avatar">A</div>

        <div className="admin-info">
          <strong>Administrator</strong>
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;