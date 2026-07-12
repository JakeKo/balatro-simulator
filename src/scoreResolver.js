import { identifyHandPlayed, identifyAllHandsPlayed } from "./handResolver.js";

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
  const allHandsPlayed = identifyAllHandsPlayed(playedCards);
  if (handPlayed === "No Hand") return [0, 0, ["No Hand"]];

  let [chips, mult] = handMap[handPlayed];
  const log = [`${handPlayed} | ${chips} × ${mult}`];

  // BODY OF ROUND - CYCLE THROUGH PLAYED CARDS
  for (const card of playedCards) {
    const { rank } = card;
    chips += rank;
    log.push(`${stringifyCard(card)} | +${rank} chips`);

    for (const joker of playedJokers) {
      if (joker === "Even Steven") {
        if (rank % 2 === 0) {
          mult += 4;
          log.push(`${joker} | +4 mult`);
        }
      }
    }
  }

  // END OF ROUND - CYCLE THROUGH JOKERS
  for (const joker of playedJokers) {
    if (joker === "Abstract Joker") {
      const addedMult = 3 * playedJokers.length;
      mult += addedMult;
      log.push(`${joker} | +${addedMult} mult`);
    } else if (joker === "Cavendish") {
      mult += 3;
      log.push(`${joker} | +3 mult`);
    } else if (joker === "Clever Joker") {
      if (allHandsPlayed.includes("Two Pair")) {
        chips += 80;
        log.push(`${joker} | +80 chips`);
      }
    } else if (joker === "Crafty Joker") {
      if (allHandsPlayed.includes("Flush")) {
        chips += 80;
        log.push(`${joker} | +80 chips`);
      }
    } else if (joker === "Crazy Joker") {
      if (allHandsPlayed.includes("Straight")) {
        mult += 12;
        log.push(`${joker} | +12 mult`);
      }
    } else if (joker === "Devious Joker") {
      if (allHandsPlayed.includes("Straight")) {
        chips += 100;
        log.push(`${joker} | +100 chips`);
      }
    } else if (joker === "Droll Joker") {
      if (allHandsPlayed.includes("Flush")) {
        mult += 10;
        log.push(`${joker} | +10 mult`);
      }
    } else if (joker === "Joker") {
      mult += 2;
      log.push(`${joker} | +2 mult`);
    }
  }

  return [chips, mult, log];
}

export { resolveScore };
