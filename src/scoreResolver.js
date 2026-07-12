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

function resolveScore(allCards, handMap, allJokers) {
  const playedCards = allCards.filter((card) => card.rank !== 0);
  const playedJokers = allJokers.filter((joker) => joker !== "None");

  const handPlayed = identifyHandPlayed(playedCards);
  if (handPlayed === "No Hand") return [0, 0, ["No Hand"]];

  let [chips, mult] = handMap[handPlayed];
  const log = [`${handPlayed} | ${chips} × ${mult}`];

  // BODY OF ROUND - CYCLE THROUGH PLAYED CARDS
  for (const card of playedCards) {
    const { rank } = card;
    chips += rank;
    log.push(`${stringifyCard(card)} | +${rank} chips`);
  }

  // END OF ROUND - CYCLE THROUGH JOKERS
  for (const joker of playedJokers) {
    if (joker === "Joker") {
      mult += 2;
      log.push(`${joker} | +2 mult`);
    }
  }

  return [chips, mult, log];
}

export { resolveScore };
