import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import { useLuckyDraw } from "../context/LuckyDrawContext";

const Dashboard = () => {
  const {
    participants,
    eligibleParticipants,
    winnerCount,
    winners,
  } = useLuckyDraw();

  return (
    <div className="page">
      <div className="welcome-section">
        <div>
          

          
        </div>

        <div className="dashboard-date">
          📅 {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          icon="👥"
          title="Total Participants"
          value={participants.length}
          
          
        />

        <StatCard
          icon="🎟️"
          title="Eligible Participants"
          value={eligibleParticipants.length}
          
         
        />

        <StatCard
          icon="🏆"
          title="Total Winners"
          value={winnerCount}
          
          
        />

        
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card quick-actions">
          <div className="card-header">
            <div>
              <h3>Quick Actions</h3>
            
            </div>
          </div>

          <div className="action-grid">
            <Link to="/registration" className="action-card">
              <div className="action-icon">👤</div>

              <div>
                <strong>Register Participant</strong>
                
              </div>

              <span className="arrow">→</span>
            </Link>

            <Link to="/lucky-draw" className="action-card">
              <div className="action-icon draw-action">🎰</div>

              <div>
                <strong>Start Lucky Draw</strong>
                
              </div>

              <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Recent Winners</h3>
             
            </div>

            <Link to="/lucky-draw" className="view-link">
              View Draw
            </Link>
          </div>

          {winners.length === 0 ? (
            <div className="empty-state small">
              <div>🏆</div>
              <p>No winners yet</p>
              
            </div>
          ) : (
            <div className="recent-winners">
              {winners.slice(0, 4).map((winner) => (
                <div className="winner-row" key={winner.id}>
                  <div className="winner-avatar">
                    {winner.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="winner-info">
                    <strong>{winner.name}</strong>
                    <span>{winner.lotteryNumber}</span>
                  </div>

                  <div className="winner-badge">Winner</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-card overview-card">
        <div className="card-header">
          <div>
            <h3>System Overview</h3>
            
          </div>
        </div>

        <div className="progress-container">
          <div className="progress-info">
            <span>Eligible Participants</span>
            <strong>
              {eligibleParticipants.length} / {participants.length}
            </strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width:
                  participants.length === 0
                    ? "0%"
                    : `${
                        (eligibleParticipants.length /
                          participants.length) *
                        100
                      }%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;