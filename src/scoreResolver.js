import { identifyHandPlayed } from "./handResolver.js";

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

function resolveScore(allCards, handMap) {
  const playedCards = allCards.filter((card) => card.rank !== 0);
  const handPlayed = identifyHandPlayed(playedCards);
  if (handPlayed === "No Hand") {
    return [0, 0, ["No Hand"]];
  }

  let [chips, mult] = handMap[handPlayed];
  const log = [`${handPlayed} | ${chips} × ${mult}`];

  for (const card of playedCards) {
    const { rank } = card;
    chips += rank;
    log.push(`${stringifyCard(card)} | +${rank} chips`);
  }

  return [chips, mult, log];
}

export { resolveScore };
