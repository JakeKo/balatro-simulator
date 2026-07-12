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

function resolveScore(playedCards, handMap) {
  const handPlayed = identifyHandPlayed(playedCards);
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
