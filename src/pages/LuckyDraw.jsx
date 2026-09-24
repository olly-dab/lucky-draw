import { useEffect, useRef, useState } from "react";
import { useLuckyDraw } from "../context/LuckyDrawContext";

const LuckyDraw = () => {
  const {
    participants,
    eligibleParticipants,
    winners,
    selectWinner,
    resetDraw,
  } = useLuckyDraw();

  const [isDrawing, setIsDrawing] = useState(false);
  const [displayParticipant, setDisplayParticipant] =
    useState(null);
  const [currentWinner, setCurrentWinner] = useState(null);

  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startDraw = () => {
    if (isDrawing) return;

    if (eligibleParticipants.length === 0) {
      return;
    }

    setCurrentWinner(null);
    setIsDrawing(true);

    let counter = 0;

    intervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(
        Math.random() * eligibleParticipants.length
      );

      setDisplayParticipant(
        eligibleParticipants[randomIndex]
      );

      counter++;

      if (counter >= 25) {
        clearInterval(intervalRef.current);

        setTimeout(() => {
          const result = selectWinner();

          if (result.success) {
            setCurrentWinner(result.winner);
            setDisplayParticipant(result.winner);
          }

          setIsDrawing(false);
        }, 300);
      }
    }, 100);
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "Reset the draw? All winners will become eligible again and winner history will be cleared."
    );

    if (!confirmed) return;

    resetDraw();
    setCurrentWinner(null);
    setDisplayParticipant(null);
  };

  return (
    <div className="page">
      

      <div className="draw-layout">
        <div className="draw-main-card">
          <div className="draw-card-top">
            <div>
              <span className="draw-label">
                🎉 LUCKY DRAW
              </span>

              <h3>Who will be our next winner?</h3>

              
            </div>

            
          </div>

          <div
            className={`draw-display ${
              isDrawing ? "drawing" : ""
            } ${currentWinner ? "winner-display" : ""}`}
          >
            {displayParticipant ? (
              <>
                <div className="draw-avatar">
                  {displayParticipant.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <span className="draw-name">
                  {displayParticipant.name}
                </span>

                <span className="draw-ticket">
                  🎟️ {displayParticipant.lotteryNumber}
                </span>

                {currentWinner && (
                  <div className="winner-announcement">
                    🏆 WINNER!
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="draw-placeholder">
                  🎰
                </div>

                <span className="draw-placeholder-title">
                  Ready to Draw
                </span>

                
              </>
            )}
          </div>

          <div className="draw-actions">
            <button
              className="draw-button"
              onClick={startDraw}
              disabled={
                isDrawing ||
                eligibleParticipants.length === 0
              }
            >
              {isDrawing ? (
                <>
                  <span className="spinner"></span>
                  DRAWING...
                </>
              ) : (
                <>
                  🎰 START DRAW
                </>
              )}
            </button>

            <button
              className="reset-button"
              onClick={handleReset}
              disabled={isDrawing || winners.length === 0}
            >
              ↻ Reset Draw
            </button>
          </div>

          {eligibleParticipants.length === 0 &&
            participants.length > 0 && (
              <div className="draw-warning">
                🏆 All registered participants have already
                won.
              </div>
            )}

          {participants.length === 0 && (
            <div className="draw-warning">
              👥 No participants have been registered yet.
              Please register participants first.
            </div>
          )}
        </div>

        <div className="draw-side-card">
          <div className="card-header">
            <div>
              <h3>Draw Information</h3>
              
            </div>
          </div>

          <div className="draw-info-list">
            <div className="draw-info-item">
              <span>👥</span>

              <div>
                <strong>{participants.length}</strong>
                
              </div>
            </div>

            <div className="draw-info-item">
              <span>🎟️</span>

              <div>
                <strong>
                  {eligibleParticipants.length}
                </strong>
               
              </div>
            </div>

            <div className="draw-info-item">
              <span>🏆</span>

              <div>
                <strong>{winners.length}</strong>
               
              </div>
            </div>
          </div>

         
        </div>
      </div>

      <div className="winner-history-card">
        <div className="card-header">
          <div>
            <h3>Winner History</h3>

            
          </div>

          <span className="history-count">
            {winners.length} Winner
            {winners.length !== 1 ? "s" : ""}
          </span>
        </div>

        {winners.length === 0 ? (
          <div className="empty-state small">
            <div>🏆</div>

            <p>No winners yet</p>

            <span>
              Winners will appear here after each draw.
            </span>
          </div>
        ) : (
          <div className="winner-history-list">
            {winners.map((winner, index) => (
              <div
                className="history-row"
                key={`${winner.id}-${winner.wonAt}`}
              >
                <div className="history-rank">
                  #{winners.length - index}
                </div>

                <div className="history-avatar">
                  {winner.name.charAt(0).toUpperCase()}
                </div>

                <div className="history-person">
                  <strong>{winner.name}</strong>

                  <span>{winner.idNumber}</span>
                </div>

                <div className="history-ticket">
                  {winner.lotteryNumber}
                </div>

                <div className="history-time">
                  {winner.wonAt}
                </div>

                <div className="winner-check">
                  ✓ Winner
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LuckyDraw;