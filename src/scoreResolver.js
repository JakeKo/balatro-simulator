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

function isFaceCard(card) {
  return card.rank >= 11 && card.rank <= 13;
}

function resolveScore(allCards, handMap, allJokers) {
  const playedCards = allCards.filter((card) => card.rank !== 0);
  const playedJokers = allJokers.filter((joker) => joker !== "None");

  const [handPlayed, scoredCards] = identifyHandPlayed(playedCards);
  const allHandsPlayed = identifyAllHandsPlayed(playedCards);
  if (handPlayed === "No Hand") return [0, 0, ["No Hand"]];

  let [chips, mult] = handMap[handPlayed];
  const log = [
    `${handPlayed} | ${chips} × ${mult}`,
    `Scored: ${scoredCards.map(stringifyCard)}`,
  ];

  function addChipsOrMultAndLog(header, addedChips, addedMult) {
    let readout = " | ";
    if (addedChips > 0 && addedMult > 0) {
      readout += `+${addedChips}c, +${addedMult}m`;
    } else if (addedChips > 0) {
      readout += `+${addedChips}c`;
    } else if (addedMult > 0) {
      readout += `+${addedMult}m`;
    }

    chips += addedChips;
    mult += addedMult;
    log.push(header + readout);
  }

  // BODY OF ROUND - CYCLE THROUGH PLAYED CARDS
  for (let i = 0; i < scoredCards.length; i++) {
    const card = scoredCards[i];
    const { rank } = card;
    addChipsOrMultAndLog(stringifyCard(card), rank, 0);

    for (const joker of playedJokers) {
      if (joker === "Even Steven") {
        if (rank % 2 === 0) {
          addChipsOrMultAndLog(joker, 0, 4);
        }
      } else if (joker === "Odd Todd") {
        if (rank < 11 && rank % 2 === 1) {
          addChipsOrMultAndLog(joker, 0, 31);
        }
      } else if (joker === "Photograph") {
        if (isFaceCard(card)) {
          const isFirstFaceCard = scoredCards
            .slice(0, i)
            .every((card) => !isFaceCard(card));
          if (isFirstFaceCard) {
            addChipsOrMultAndLog(joker, 0, 2);
          }
        }
      } else if (joker === "Scary Face") {
        if (isFaceCard(card)) {
          addChipsOrMultAndLog(joker, 30, 0);
        }
      } else if (joker === "Scholar") {
        if (rank === 14) {
          addChipsOrMultAndLog(joker, 30, 4);
        }
      } else if (joker === "Smiley Face") {
        if (isFaceCard(card)) {
          addChipsOrMultAndLog(joker, 0, 5);
        }
      } else if (joker === "Walkie Talkie") {
        if (rank === 4 || rank === 10) {
          addChipsOrMultAndLog(joker, 10, 4);
        }
      }
    }
  }

  // END OF ROUND - CYCLE THROUGH JOKERS
  for (const joker of playedJokers) {
    if (joker === "Abstract Joker") {
      const addedMult = 3 * playedJokers.length;
      addChipsOrMultAndLog(joker, 0, addedMult);
    } else if (joker === "Cavendish") {
      addChipsOrMultAndLog(joker, 0, 3);
    } else if (joker === "Clever Joker") {
      if (allHandsPlayed.includes("Two Pair")) {
        addChipsOrMultAndLog(joker, 80, 0);
      }
    } else if (joker === "Crafty Joker") {
      if (allHandsPlayed.includes("Flush")) {
        addChipsOrMultAndLog(joker, 80, 0);
      }
    } else if (joker === "Crazy Joker") {
      if (allHandsPlayed.includes("Straight")) {
        addChipsOrMultAndLog(joker, 0, 12);
      }
    } else if (joker === "Devious Joker") {
      if (allHandsPlayed.includes("Straight")) {
        addChipsOrMultAndLog(joker, 100, 0);
      }
    } else if (joker === "Droll Joker") {
      if (allHandsPlayed.includes("Flush")) {
        addChipsOrMultAndLog(joker, 0, 10);
      }
    } else if (joker === "Gros Michel") {
      addChipsOrMultAndLog(joker, 0, 15);
    } else if (joker === "Half Joker") {
      if (scoredCards.length <= 3) {
        addChipsOrMultAndLog(joker, 0, 20);
      }
    } else if (joker === "Joker") {
      addChipsOrMultAndLog(joker, 0, 2);
    } else if (joker === "Jolly Joker") {
      if (allHandsPlayed.includes("Pair")) {
        addChipsOrMultAndLog(joker, 0, 8);
      }
    } else if (joker === "Mad Joker") {
      if (allHandsPlayed.includes("Two Pair")) {
        addChipsOrMultAndLog(joker, 0, 10);
      }
    } else if (joker === "Sly Joker") {
      if (allHandsPlayed.includes("Pair")) {
        addChipsOrMultAndLog(joker, 50, 0);
      }
    } else if (joker === "Wily Joker") {
      if (allHandsPlayed.includes("Three of a Kind")) {
        addChipsOrMultAndLog(joker, 100, 0);
      }
    } else if (joker === "Zany Joker") {
      if (allHandsPlayed.includes("Three of a Kind")) {
        addChipsOrMultAndLog(joker, 0, 12);
      }
    }
  }

  return [chips, mult, log];
}

export { resolveScore };
