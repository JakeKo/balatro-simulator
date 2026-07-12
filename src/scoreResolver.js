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
      } else if (joker === "Odd Todd") {
        if (rank < 11 && rank % 2 === 1) {
          mult += 31;
          log.push(`${joker} | +31 mult`);
        }
      } else if (joker === "Scary Face") {
        if (rank >= 11 && rank <= 13) {
          chips += 30;
          log.push(`${joker} | +30 chips`);
        }
      } else if (joker === "Scholar") {
        if (rank === 14) {
          chips += 30;
          mult += 4;
          log.push(`${joker} | +30 chips, +4 mult`);
        }
      } else if (joker === "Smiley Face") {
        if (rank >= 11 && rank <= 13) {
          mult += 5;
          log.push(`${joker} | +5 mult`);
        }
      } else if (joker === "Walkie Talkie") {
        if (rank === 4 || rank === 10) {
          chips += 10;
          mult += 4;
          log.push(`${joker} | +10 chips, +4 mult`);
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
    } else if (joker === "Gros Michel") {
      mult += 15;
      log.push(`${joker} | +15 mult`);
    } else if (joker === "Half Joker") {
      if (playedCards.length <= 3) {
        mult += 20;
        log.push(`${joker} | +20 mult`);
      }
    } else if (joker === "Joker") {
      mult += 2;
      log.push(`${joker} | +2 mult`);
    } else if (joker === "Jolly Joker") {
      if (allHandsPlayed.includes("Pair")) {
        mult += 8;
        log.push(`${joker} | +8 mult`);
      }
    } else if (joker === "Mad Joker") {
      if (allHandsPlayed.includes("Two Pair")) {
        mult += 10;
        log.push(`${joker} | +10 mult`);
      }
    } else if (joker === "Sly Joker") {
      if (allHandsPlayed.includes("Pair")) {
        chips += 50;
        log.push(`${joker} | +50 chips`);
      }
    } else if (joker === "Wily Joker") {
      if (allHandsPlayed.includes("Three of a Kind")) {
        chips += 100;
        log.push(`${joker} | +100 chips`);
      }
    } else if (joker === "Zany Joker") {
      if (allHandsPlayed.includes("Three of a Kind")) {
        mult += 12;
        log.push(`${joker} | +12 mult`);
      }
    }
  }

  return [chips, mult, log];
}

export { resolveScore };
