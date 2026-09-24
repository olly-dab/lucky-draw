import { createContext, useContext, useEffect, useState } from "react";

const LuckyDrawContext = createContext();

const PARTICIPANTS_KEY = "lucky_draw_participants";
const WINNERS_KEY = "lucky_draw_winners";

export const LuckyDrawProvider = ({ children }) => {
  const [participants, setParticipants] = useState(() => {
    const saved = localStorage.getItem(PARTICIPANTS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [winners, setWinners] = useState(() => {
    const saved = localStorage.getItem(WINNERS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      PARTICIPANTS_KEY,
      JSON.stringify(participants)
    );
  }, [participants]);

  useEffect(() => {
    localStorage.setItem(WINNERS_KEY, JSON.stringify(winners));
  }, [winners]);

  // Generate the next lottery number
  const generateLotteryNumber = () => {
    const usedNumbers = participants
      .map((participant) => {
        const number = parseInt(
          participant.lotteryNumber.replace("LD-", ""),
          10
        );

        return number;
      })
      .filter((number) => !isNaN(number));

    let nextNumber = 1;

    while (usedNumbers.includes(nextNumber)) {
      nextNumber++;
    }

    return `LD-${String(nextNumber).padStart(4, "0")}`;
  };

  // Register participant
  const addParticipant = ({ idNumber, name }) => {
    const cleanId = idNumber.trim();
    const cleanName = name.trim();

    if (!cleanId || !cleanName) {
      return {
        success: false,
        message: "Please fill in all fields.",
      };
    }

    const duplicateId = participants.some(
      (participant) =>
        participant.idNumber.toLowerCase() === cleanId.toLowerCase()
    );

    if (duplicateId) {
      return {
        success: false,
        message: "This ID number is already registered.",
      };
    }

    const lotteryNumber = generateLotteryNumber();

    const newParticipant = {
      id: Date.now(),
      idNumber: cleanId,
      name: cleanName,
      lotteryNumber,
      status: "Eligible",
      registeredAt: new Date().toLocaleString(),
    };

    setParticipants((prev) => [...prev, newParticipant]);

    return {
      success: true,
      message: `Participant registered successfully. Lottery number: ${lotteryNumber}`,
      participant: newParticipant,
    };
  };

  // Delete participant
  const deleteParticipant = (participantId) => {
    setParticipants((prev) =>
      prev.filter((participant) => participant.id !== participantId)
    );

    setWinners((prev) =>
      prev.filter((winner) => winner.id !== participantId)
    );
  };

  // Select winner
  const selectWinner = () => {
    const eligibleParticipants = participants.filter(
      (participant) => participant.status === "Eligible"
    );

    if (eligibleParticipants.length === 0) {
      return {
        success: false,
        message: "There are no eligible participants.",
      };
    }

    const randomIndex = Math.floor(
      Math.random() * eligibleParticipants.length
    );

    const winner = eligibleParticipants[randomIndex];

    const winnerRecord = {
      ...winner,
      wonAt: new Date().toLocaleString(),
    };

    // Change participant status
    setParticipants((prev) =>
      prev.map((participant) =>
        participant.id === winner.id
          ? {
              ...participant,
              status: "Winner",
            }
          : participant
      )
    );

    // Add to winner history
    setWinners((prev) => [winnerRecord, ...prev]);

    return {
      success: true,
      winner: winnerRecord,
    };
  };

  const resetDraw = () => {
    setParticipants((prev) =>
      prev.map((participant) => ({
        ...participant,
        status: "Eligible",
      }))
    );

    setWinners([]);
  };

  const eligibleParticipants = participants.filter(
    (participant) => participant.status === "Eligible"
  );

  const winnerCount = participants.filter(
    (participant) => participant.status === "Winner"
  ).length;

  const value = {
    participants,
    winners,
    eligibleParticipants,
    winnerCount,
    addParticipant,
    deleteParticipant,
    selectWinner,
    resetDraw,
  };

  return (
    <LuckyDrawContext.Provider value={value}>
      {children}
    </LuckyDrawContext.Provider>
  );
};

export const useLuckyDraw = () => {
  const context = useContext(LuckyDrawContext);

  if (!context) {
    throw new Error(
      "useLuckyDraw must be used inside LuckyDrawProvider"
    );
  }

  return context;
};