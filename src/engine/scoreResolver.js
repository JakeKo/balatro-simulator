import { identifyHandPlayed, identifyAllHandsPlayed } from "./handResolver.js";

function resolveScore(allCards, handMap, allJokers, gameMetadata) {
  const playedCards = allCards.filter((card) => card.rank !== 0);
  const playedJokers = allJokers.filter((joker) => joker !== "None");

  const [handPlayed, scoredCards] = identifyHandPlayed(playedCards);
  const allHandsPlayed = identifyAllHandsPlayed(playedCards);
  if (handPlayed === "No Hand") return [0, 0, []];

  const [baseChips, baseMult] = handMap[handPlayed];
  const log = [
    {
      type: "HAND_PLAYED",
      hand: handPlayed,
      baseChips,
      baseMult,
      scoredCards,
    },
  ];

  function isFaceCard(card) {
    return (
      playedJokers.includes("Pareidolia") ||
      (card.rank >= 11 && card.rank <= 13)
    );
  }

  function isOddRank(card) {
    // Rank 14 is an Ace, which is treated instead as rank 1 in this context
    return [14, 9, 7, 5, 3].includes(card.rank);
  }

  delete gameMetadata.hangingChadRepeats;

  // BODY OF ROUND - CYCLE THROUGH PLAYED CARDS
  for (let i = 0; i < scoredCards.length; i++) {
    const card = scoredCards[i];
    const { rank } = card;
    log.push({ type: "CARD_SCORED", card, addChips: rank });

    for (const joker of playedJokers) {
      if (joker === "Even Steven") {
        if (rank % 2 === 0) {
          log.push({ type: "JOKER_SCORED", joker, addMult: 4 });
        }
      } else if (joker === "Hanging Chad") {
        if (i === 0 && gameMetadata.hangingChadRepeats === undefined) {
          gameMetadata.hangingChadRepeats = 2;
        }
      } else if (joker === "Odd Todd") {
        if (isOddRank(card)) {
          log.push({ type: "JOKER_SCORED", joker, addChips: 31 });
        }
      } else if (joker === "Photograph") {
        if (isFaceCard(card)) {
          const isFirstFaceCard = scoredCards
            .slice(0, i)
            .every((card) => !isFaceCard(card));
          if (isFirstFaceCard) {
            log.push({ type: "JOKER_SCORED", joker, addMult: 2 });
          }
        }
      } else if (joker === "Scary Face") {
        if (isFaceCard(card)) {
          log.push({ type: "JOKER_SCORED", joker, addChips: 30 });
        }
      } else if (joker === "Scholar") {
        if (rank === 14) {
          log.push({ type: "JOKER_SCORED", joker, addChips: 20, addMult: 4 });
        }
      } else if (joker === "Smiley Face") {
        if (isFaceCard(card)) {
          log.push({ type: "JOKER_SCORED", joker, addMult: 5 });
        }
      } else if (joker === "Walkie Talkie") {
        if (rank === 4 || rank === 10) {
          log.push({ type: "JOKER_SCORED", joker, addChips: 10, addMult: 4 });
        }
      }
    }

    if (gameMetadata.hangingChadRepeats > 0) {
      i--;
      gameMetadata.hangingChadRepeats--;
    }
  }

  // END OF ROUND - CYCLE THROUGH JOKERS
  for (const joker of playedJokers) {
    if (joker === "Abstract Joker") {
      const addMult = 3 * playedJokers.length;
      log.push({ type: "JOKER_SCORED", joker, addMult });
    } else if (joker === "Banner") {
      if (gameMetadata.remainingDiscards > 0) {
        const addChips = 30 * gameMetadata.remainingDiscards;
        log.push({ type: "JOKER_SCORED", joker, addChips });
      }
    } else if (joker === "Cavendish") {
      log.push({ type: "JOKER_SCORED", joker, addMult: 3 });
    } else if (joker === "Clever Joker") {
      if (allHandsPlayed.includes("Two Pair")) {
        log.push({ type: "JOKER_SCORED", joker, addChips: 80 });
      }
    } else if (joker === "Crafty Joker") {
      if (allHandsPlayed.includes("Flush")) {
        log.push({ type: "JOKER_SCORED", joker, addChips: 80 });
      }
    } else if (joker === "Crazy Joker") {
      if (allHandsPlayed.includes("Straight")) {
        log.push({ type: "JOKER_SCORED", joker, addMult: 12 });
      }
    } else if (joker === "Devious Joker") {
      if (allHandsPlayed.includes("Straight")) {
        log.push({ type: "JOKER_SCORED", joker, addChips: 100 });
      }
    } else if (joker === "Droll Joker") {
      if (allHandsPlayed.includes("Flush")) {
        log.push({ type: "JOKER_SCORED", joker, addMult: 10 });
      }
    } else if (joker === "Gros Michel") {
      log.push({ type: "JOKER_SCORED", joker, addMult: 15 });
    } else if (joker === "Half Joker") {
      if (scoredCards.length <= 3) {
        log.push({ type: "JOKER_SCORED", joker, addMult: 20 });
      }
    } else if (joker === "Joker") {
      log.push({ type: "JOKER_SCORED", joker, addMult: 2 });
    } else if (joker === "Jolly Joker") {
      if (allHandsPlayed.includes("Pair")) {
        log.push({ type: "JOKER_SCORED", joker, addMult: 8 });
      }
    } else if (joker === "Mad Joker") {
      if (allHandsPlayed.includes("Two Pair")) {
        log.push({ type: "JOKER_SCORED", joker, addMult: 10 });
      }
    } else if (joker === "Sly Joker") {
      if (allHandsPlayed.includes("Pair")) {
        log.push({ type: "JOKER_SCORED", joker, addChips: 50 });
      }
    } else if (joker === "Wily Joker") {
      if (allHandsPlayed.includes("Three of a Kind")) {
        log.push({ type: "JOKER_SCORED", joker, addChips: 100 });
      }
    } else if (joker === "Zany Joker") {
      if (allHandsPlayed.includes("Three of a Kind")) {
        log.push({ type: "JOKER_SCORED", joker, addMult: 12 });
      }
    }
  }

  const [chips, mult] = log.reduce(
    ([chips, mult], entry) => {
      return [
        chips + (entry.addChips || 0),
        (mult + (entry.addMult || 0)) * (entry.multMult || 1),
      ];
    },
    [0, 0],
  );

  return [chips, mult, log];
}

export { resolveScore };
