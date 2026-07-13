import { SUIT_MAP } from "../constants";

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
    suit === SUIT_MAP.HEARTS
      ? "H"
      : suit === SUIT_MAP.DIAMONDS
        ? "D"
        : suit === SUIT_MAP.CLUBS
          ? "C"
          : suit === SUIT_MAP.SPADES
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

function stringifyHandEnded() {
  return "Hand Ended |";
}

function ScoreLogger({ log }) {
  return (
    <div className="score-logger">
      {log.length === 0 && <code>No Hand</code>}
      {log.map((entry, index) => {
        let logString = "";
        switch (entry.type) {
          case "HAND_PLAYED":
            logString = stringifyHandPlayed(entry);
            break;
          case "CARD_SCORED":
            logString = stringifyCardScored(entry);
            break;
          case "JOKER_SCORED":
            logString = stringifyJokerScored(entry);
            break;
          case "HAND_ENDED":
            logString = stringifyHandEnded();
            break;
        }

        return <code key={index}>{logString}</code>;
      })}
    </div>
  );
}

export default ScoreLogger;
