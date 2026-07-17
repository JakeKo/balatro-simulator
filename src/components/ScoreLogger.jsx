import { SUITS, EVENT_TYPES } from "../constants";
import { GraphCanvas } from "reagraph";

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
    suit === SUITS.HEARTS
      ? "H"
      : suit === SUITS.DIAMONDS
        ? "D"
        : suit === SUITS.CLUBS
          ? "C"
          : suit === SUITS.SPADES
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
  if (multMult) operations.push(`×${multMult}m`);

  return `${joker.name} | ${operations.join(", ")}`;
}

function stringifyHandEnded() {
  return "Hand Ended |";
}

function stringifyLogEntry(entry) {
  switch (entry.type) {
    case EVENT_TYPES.HAND_PLAYED:
      return stringifyHandPlayed(entry);
    case EVENT_TYPES.CARD_SCORED:
      return stringifyCardScored(entry);
    case EVENT_TYPES.JOKER_SCORED:
      return stringifyJokerScored(entry);
    case EVENT_TYPES.HAND_ENDED:
      return stringifyHandEnded();
  }

  return "";
}

function ScoreLogger({ log }) {
  const nodes = log.map((entry, index) => ({
    id: index.toString(),
    label: stringifyLogEntry(entry),
  }));
  const edges = log.slice(1).map((entry, index) => ({
    id: `${index}->${index + 1}`,
    source: index.toString(),
    target: (index + 1).toString(),
  }));

  return (
    <div className="score-logger">
      {log.length === 0 && <code>No Hand</code>}
      {log.map((entry, index) => {
        const logString = stringifyLogEntry(entry);
        return <code key={index}>{logString}</code>;
      })}

      <div className="score-logger-graph">
        <GraphCanvas
          style={{ width: "100%", height: "200px" }}
          layoutType="hierarchicalLr"
          nodes={nodes}
          edges={edges}
        />
      </div>
    </div>
  );
}

export default ScoreLogger;
