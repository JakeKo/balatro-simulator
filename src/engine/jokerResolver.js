import { identifyAllHandsPlayed } from "./handResolver";

function isOddRank(card) {
  // Rank 14 is an Ace, which is treated instead as rank 1 in this context
  return [14, 9, 7, 5, 3].includes(card.rank);
}

function isEvenRank(card) {
  return [10, 8, 6, 4, 2].includes(card.rank);
}

function isFaceCard(card, gameMetadata) {
  return gameMetadata.pareidolia || (card.rank >= 11 && card.rank <= 13);
}

const resolvedJokers = {
  "Abstract Joker": {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const addMult = 3 * gameMetadata.jokerCount;
      addEvent({ type: "JOKER_SCORED", joker: "Abstract Joker", addMult });
    },
  },
  Acrobat: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (gameMetadata.finalHand) {
        addEvent({ type: "JOKER_SCORED", joker: "Acrobat", multMult: 3 });
      }
    },
  },
  Banner: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (gameMetadata.remainingDiscards > 0) {
        const addChips = 30 * gameMetadata.remainingDiscards;
        addEvent({ type: "JOKER_SCORED", joker: "Banner", addChips });
      }
    },
  },
  Cavendish: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      addEvent({ type: "JOKER_SCORED", joker: "Cavendish", addMult: 3 });
    },
  },
  "Clever Joker": {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Two Pair")) {
        addEvent({ type: "JOKER_SCORED", joker: "Clever Joker", addChips: 80 });
      }
    },
  },
  "Crafty Joker": {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Flush")) {
        addEvent({ type: "JOKER_SCORED", joker: "Crafty Joker", addChips: 80 });
      }
    },
  },
  "Crazy Joker": {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Straight")) {
        addEvent({ type: "JOKER_SCORED", joker: "Crazy Joker", addMult: 12 });
      }
    },
  },
  "Devious Joker": {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Straight")) {
        addEvent({
          type: "JOKER_SCORED",
          joker: "Devious Joker",
          addChips: 100,
        });
      }
    },
  },
  "Droll Joker": {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Flush")) {
        addEvent({ type: "JOKER_SCORED", joker: "Droll Joker", addMult: 10 });
      }
    },
  },
  "Even Steven": {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isEvenRank(entry.card)) {
        addEvent({ type: "JOKER_SCORED", joker: "Even Steven", addMult: 4 });
      }
    },
  },
  "Gros Michel": {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      addEvent({ type: "JOKER_SCORED", joker: "Gros Michel", addMult: 15 });
    },
  },
  "Half Joker": {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (scoredCards.length <= 3) {
        addEvent({ type: "JOKER_SCORED", joker: "Half Joker", addMult: 20 });
      }
    },
  },
  "Hanging Chad": {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (entry.index === 0 && !entry.hangingChadApplied) {
        addEvent({ type: "JOKER_SCORED", joker: "Hanging Chad" });
        addEvent({ ...entry, hangingChadApplied: true });
        addEvent({ ...entry, hangingChadApplied: true });
      }
    },
  },
  Joker: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      addEvent({ type: "JOKER_SCORED", joker: "Joker", addMult: 2 });
    },
  },
  "Jolly Joker": {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Pair")) {
        addEvent({ type: "JOKER_SCORED", joker: "Jolly Joker", addMult: 8 });
      }
    },
  },
  "Mad Joker": {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Two Pair")) {
        addEvent({ type: "JOKER_SCORED", joker: "Mad Joker", addMult: 10 });
      }
    },
  },
  "Odd Todd": {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isOddRank(entry.card)) {
        addEvent({ type: "JOKER_SCORED", joker: "Odd Todd", addChips: 31 });
      }
    },
  },
  Photograph: {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isFaceCard(entry.card, gameMetadata)) {
        const isFirstFaceCard = scoredCards
          .slice(0, entry.index)
          .every((card) => !isFaceCard(card, gameMetadata));
        if (isFirstFaceCard) {
          addEvent({ type: "JOKER_SCORED", joker: "Photograph", addMult: 2 });
        }
      }
    },
  },
  "Scary Face": {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isFaceCard(entry.card, gameMetadata)) {
        addEvent({ type: "JOKER_SCORED", joker: "Scary Face", addChips: 30 });
      }
    },
  },
  Scholar: {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (entry.card.rank === 14) {
        addEvent({
          type: "JOKER_SCORED",
          joker: "Scholar",
          addChips: 20,
          addMult: 4,
        });
      }
    },
  },
  "Sly Joker": {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Pair")) {
        addEvent({ type: "JOKER_SCORED", joker: "Sly Joker", addChips: 50 });
      }
    },
  },
  "Smiley Face": {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isFaceCard(entry.card, gameMetadata)) {
        addEvent({ type: "JOKER_SCORED", joker: "Smiley Face", addMult: 5 });
      }
    },
  },
  "Walkie Talkie": {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (entry.card.rank === 4 || entry.card.rank === 10) {
        addEvent({
          type: "JOKER_SCORED",
          joker: "Walkie Talkie",
          addChips: 10,
          addMult: 4,
        });
      }
    },
  },
  "Wily Joker": {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Three of a Kind")) {
        addEvent({ type: "JOKER_SCORED", joker: "Wily Joker", addChips: 100 });
      }
    },
  },
  "Zany Joker": {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Three of a Kind")) {
        addEvent({ type: "JOKER_SCORED", joker: "Zany Joker", addMult: 12 });
      }
    },
  },
};

function resolveJoker(joker) {
  return resolvedJokers[joker];
}

export { resolveJoker };
