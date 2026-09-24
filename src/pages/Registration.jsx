import { useMemo, useState } from "react";
import { useLuckyDraw } from "../context/LuckyDrawContext";

const Registration = () => {
  const {
    participants,
    addParticipant,
    deleteParticipant,
  } = useLuckyDraw();

  const [idNumber, setIdNumber] = useState("");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const participantsPerPage = 10;

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = addParticipant({
      idNumber,
      name,
    });

    if (!result.success) {
      setMessage({
        type: "error",
        text: result.message,
      });

      return;
    }

    setMessage({
      type: "success",
      text: result.message,
    });

    setIdNumber("");
    setName("");
  };

  const filteredParticipants = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return participants;
    }

    return participants.filter(
      (participant) =>
        participant.name.toLowerCase().includes(searchText) ||
        participant.idNumber.toLowerCase().includes(searchText) ||
        participant.lotteryNumber
          .toLowerCase()
          .includes(searchText)
    );
  }, [participants, search]);

  // Total pages
  const totalPages = Math.ceil(
    filteredParticipants.length / participantsPerPage
  );

  // Participants for current page
  const startIndex =
    (currentPage - 1) * participantsPerPage;

  const currentParticipants =
    filteredParticipants.slice(
      startIndex,
      startIndex + participantsPerPage
    );

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this participant?"
    );

    if (confirmed) {
      deleteParticipant(id);

      setMessage({
        type: "success",
        text: "Participant deleted successfully.",
      });
    }
  };

  return (
    <div className="page">
      <div className="page-intro">
      </div>

      {message && (
        <div className={`message ${message.type}`}>
          <span>
            {message.type === "success" ? "✓" : "!"}
          </span>

          {message.text}

          <button onClick={() => setMessage(null)}>
            ×
          </button>
        </div>
      )}

      <div className="registration-layout">
        <div className="form-card">
          <div className="form-header">
            <div className="form-icon">👤</div>

            <div>
              <h3>Register Participant</h3>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="idNumber">
                ID Number
                <span>*</span>
              </label>

              <input
                id="idNumber"
                type="text"
                placeholder="e.g. ID-001"
                value={idNumber}
                onChange={(e) =>
                  setIdNumber(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">
                Full Name
                <span>*</span>
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter participant full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className="primary-button"
            >
              <span>＋</span>
              Register Participant
            </button>
          </form>
        </div>

        <div className="info-card">
          <div className="info-icon">💡</div>

          <h3>Registration Guide</h3>

          <div className="guide-item">
            <span>1</span>

            <div>
              <strong>Enter Lottery Number</strong>
            </div>
          </div>

          <div className="guide-item">
            <span>2</span>

            <div>
              <strong>Enter Full Name</strong>
            </div>
          </div>

          <div className="guide-item">
            <span>4</span>

            <div>
              <strong>Ready for Draw</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="participants-card">
        <div className="card-header participant-header">
          <div>
            <h3>Registered Participants</h3>
          </div>

          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search by name, ID or lottery..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {filteredParticipants.length === 0 ? (
          <div className="empty-state">
            <div>👥</div>

            <h3>
              {participants.length === 0
                ? "No participants yet"
                : "No participants found"}
            </h3>

            <p>
              {participants.length === 0
                ? "Register your first participant above."
                : "Try a different search term."}
            </p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ID NUMBER</th>
                    <th>PARTICIPANT</th>
                    <th>STATUS</th>
                    <th>REGISTERED</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {currentParticipants.map(
                    (participant, index) => (
                      <tr key={participant.id}>
                        <td>
                          {startIndex + index + 1}
                        </td>

                        <td>
                          <strong className="id-text">
                            {participant.idNumber}
                          </strong>
                        </td>

                        <td>
                          <div className="table-person">
                            <div className="table-avatar">
                              {participant.name
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <span>
                              {participant.name}
                            </span>
                          </div>
                        </td>

                        <td>
                          <span className="lottery-number">
                            {participant.lotteryNumber}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`status-badge ${
                              participant.status ===
                              "Winner"
                                ? "winner-status"
                                : "eligible-status"
                            }`}
                          >
                            {participant.status ===
                            "Winner"
                              ? "🏆 Winner"
                              : "✓ Eligible"}
                          </span>
                        </td>

                        <td>
                          <span className="date-text">
                            {participant.registeredAt}
                          </span>
                        </td>

                        <td>
                          <button
                            className="delete-button"
                            onClick={() =>
                              handleDelete(
                                participant.id
                              )
                            }
                            title="Delete participant"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.max(page - 1, 1)
                    )
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    type="button"
                    key={page}
                    className={
                      currentPage === page
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setCurrentPage(page)
                    }
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(
                        page + 1,
                        totalPages
                      )
                    )
                  }
                  disabled={
                    currentPage === totalPages
                  }
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Registration;