import { identifyHandPlayed, identifyAllHandsPlayed } from "./handResolver.js";
import { resolveJoker } from "./jokerResolver.js";

function resolveScore(allCards, handMap, allJokers, gameMetadata) {
  const playedCards = allCards.filter((card) => card.rank !== 0);
  const playedJokers = allJokers.filter((joker) => joker !== "None");

  const [handPlayed, scoredCards] = identifyHandPlayed(playedCards);
  const allHandsPlayed = identifyAllHandsPlayed(playedCards);
  if (handPlayed === "No Hand") return [0, 0, []];

  const resolvedJokers = playedJokers.map(resolveJoker);

  const [baseChips, baseMult] = handMap[handPlayed];
  const eventLog = [
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

  function addEvent(entry) {
    eventLog.push(entry);
    resolvedJokers.forEach((resolvedJoker) => {
      if (resolvedJoker.when(entry)) {
        resolvedJoker.score(entry, scoredCards, gameMetadata, addEvent);
      }
    });
  }

  // BODY OF ROUND - CYCLE THROUGH PLAYED CARDS
  for (let i = 0; i < scoredCards.length; i++) {
    const card = scoredCards[i];
    addEvent({ type: "CARD_SCORED", card, index: i, addChips: card.rank });
  }

  // END OF ROUND - CYCLE THROUGH JOKERS
  for (const joker of playedJokers) {
    if (joker === "Abstract Joker") {
      const addMult = 3 * playedJokers.length;
      eventLog.push({ type: "JOKER_SCORED", joker, addMult });
    } else if (joker === "Banner") {
      if (gameMetadata.remainingDiscards > 0) {
        const addChips = 30 * gameMetadata.remainingDiscards;
        eventLog.push({ type: "JOKER_SCORED", joker, addChips });
      }
    } else if (joker === "Cavendish") {
      eventLog.push({ type: "JOKER_SCORED", joker, addMult: 3 });
    } else if (joker === "Clever Joker") {
      if (allHandsPlayed.includes("Two Pair")) {
        eventLog.push({ type: "JOKER_SCORED", joker, addChips: 80 });
      }
    } else if (joker === "Crafty Joker") {
      if (allHandsPlayed.includes("Flush")) {
        eventLog.push({ type: "JOKER_SCORED", joker, addChips: 80 });
      }
    } else if (joker === "Crazy Joker") {
      if (allHandsPlayed.includes("Straight")) {
        eventLog.push({ type: "JOKER_SCORED", joker, addMult: 12 });
      }
    } else if (joker === "Devious Joker") {
      if (allHandsPlayed.includes("Straight")) {
        eventLog.push({ type: "JOKER_SCORED", joker, addChips: 100 });
      }
    } else if (joker === "Droll Joker") {
      if (allHandsPlayed.includes("Flush")) {
        eventLog.push({ type: "JOKER_SCORED", joker, addMult: 10 });
      }
    } else if (joker === "Gros Michel") {
      eventLog.push({ type: "JOKER_SCORED", joker, addMult: 15 });
    } else if (joker === "Half Joker") {
      if (scoredCards.length <= 3) {
        eventLog.push({ type: "JOKER_SCORED", joker, addMult: 20 });
      }
    } else if (joker === "Joker") {
      eventLog.push({ type: "JOKER_SCORED", joker, addMult: 2 });
    } else if (joker === "Jolly Joker") {
      if (allHandsPlayed.includes("Pair")) {
        eventLog.push({ type: "JOKER_SCORED", joker, addMult: 8 });
      }
    } else if (joker === "Mad Joker") {
      if (allHandsPlayed.includes("Two Pair")) {
        eventLog.push({ type: "JOKER_SCORED", joker, addMult: 10 });
      }
    } else if (joker === "Sly Joker") {
      if (allHandsPlayed.includes("Pair")) {
        eventLog.push({ type: "JOKER_SCORED", joker, addChips: 50 });
      }
    } else if (joker === "Wily Joker") {
      if (allHandsPlayed.includes("Three of a Kind")) {
        eventLog.push({ type: "JOKER_SCORED", joker, addChips: 100 });
      }
    } else if (joker === "Zany Joker") {
      if (allHandsPlayed.includes("Three of a Kind")) {
        eventLog.push({ type: "JOKER_SCORED", joker, addMult: 12 });
      }
    }
  }

  const [chips, mult] = eventLog.reduce(
    ([chips, mult], entry) => {
      const addChips = entry.addChips || entry.baseChips || 0;
      const addMult = entry.addMult || entry.baseMult || 0;
      const multMult = entry.multMult || 1;

      return [chips + addChips, (mult + addMult) * multMult];
    },
    [0, 0],
  );

  return [chips, mult, eventLog];
}

export { resolveScore };
