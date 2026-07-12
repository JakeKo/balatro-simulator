function stringifyCard(card) {
  const { rank, suit } = card;
  const rankString =
    rank === 14
      ? "A"
      : rank === 13
        ? "K"
        : rank === 12
          ? "Q"
          : rank === 11
            ? "J"
            : rank.toString();
  const suitString =
    suit === "Hearts"
      ? "H"
      : suit === "Diamonds"
        ? "D"
        : suit === "Clubs"
          ? "C"
          : suit === "Spades"
            ? "S"
            : "";
  return `${rankString}${suitString}`;
}

function stringifyHandPlayed(entry) {
  const { hand, baseChips, baseMult, scoredCards } = entry;
  return `${hand} | ${baseChips} × ${baseMult} | ${scoredCards.map(stringifyCard)}`;
}

function stringifyCardScored(entry) {
  const { card, addChips } = entry;
  return `${stringifyCard(card)} | +${addChips}c`;
}

function stringifyJokerScored(entry) {
  const { joker, addChips, addMult, multMult } = entry;

  const operations = [];
  if (addChips) operations.push(`+${addChips}c`);
  if (addMult) operations.push(`+${addMult}m`);
  if (multMult) operations.push(`+×${multMult}m`);

  return `${joker} | ${operations.join(", ")}`;
}

function ScoreLogger({ log }) {
  return (
    <div className="score-logger">
      {log.length === 0 && <code>No Hand</code>}
      {log.map((entry, index) => {
        switch (entry.type) {
          case "HAND_PLAYED":
            return <code>{stringifyHandPlayed(entry)}</code>;
          case "CARD_SCORED":
            return <code>{stringifyCardScored(entry)}</code>;
          case "JOKER_SCORED":
            return <code>{stringifyJokerScored(entry)}</code>;
        }
      })}
    </div>
  );
}

export default ScoreLogger;
