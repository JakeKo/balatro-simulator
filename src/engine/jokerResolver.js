import { identifyAllHandsPlayed } from "./handResolver";
import { JOKERS_MAP } from "../constants";

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
  [JOKERS_MAP.ABSTRACT_JOKER]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const addMult = 3 * gameMetadata.jokerCount;
      addEvent({
        type: "JOKER_SCORED",
        joker: JOKERS_MAP.ABSTRACT_JOKER,
        addMult,
      });
    },
  },
  [JOKERS_MAP.ACROBAT]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (gameMetadata.finalHand) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.ACROBAT,
          multMult: 3,
        });
      }
    },
  },
  [JOKERS_MAP.BANNER]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (gameMetadata.remainingDiscards > 0) {
        const addChips = 30 * gameMetadata.remainingDiscards;
        addEvent({ type: "JOKER_SCORED", joker: JOKERS_MAP.BANNER, addChips });
      }
    },
  },
  [JOKERS_MAP.BLUE_JOKER]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (gameMetadata.remainingCardsInDeck > 0) {
        const addChips = 2 * gameMetadata.remainingCardsInDeck;
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.BLUE_JOKER,
          addChips,
        });
      }
    },
  },
  [JOKERS_MAP.CAVENDISH]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      addEvent({
        type: "JOKER_SCORED",
        joker: JOKERS_MAP.CAVENDISH,
        addMult: 3,
      });
    },
  },
  [JOKERS_MAP.CLEVER_JOKER]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Two Pair")) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.CLEVER_JOKER,
          addChips: 80,
        });
      }
    },
  },
  [JOKERS_MAP.CRAFTY_JOKER]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Flush")) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.CRAFTY_JOKER,
          addChips: 80,
        });
      }
    },
  },
  [JOKERS_MAP.CRAZY_JOKER]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Straight")) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.CRAZY_JOKER,
          addMult: 12,
        });
      }
    },
  },
  [JOKERS_MAP.DEVIOUS_JOKER]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Straight")) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.DEVIOUS_JOKER,
          addChips: 100,
        });
      }
    },
  },
  [JOKERS_MAP.DROLL_JOKER]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Flush")) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.DROLL_JOKER,
          addMult: 10,
        });
      }
    },
  },
  [JOKERS_MAP.EVEN_STEVEN]: {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isEvenRank(entry.card)) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.EVEN_STEVEN,
          addMult: 4,
        });
      }
    },
  },
  [JOKERS_MAP.FORTUNE_TELLER]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const addMult = gameMetadata.cardsUsedThisRun + scoredCards.length;
      addEvent({
        type: "JOKER_SCORED",
        joker: JOKERS_MAP.FORTUNE_TELLER,
        addMult,
      });
    },
  },
  [JOKERS_MAP.GROS_MICHEL]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      addEvent({
        type: "JOKER_SCORED",
        joker: JOKERS_MAP.GROS_MICHEL,
        addMult: 15,
      });
    },
  },
  [JOKERS_MAP.HALF_JOKER]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (scoredCards.length <= 3) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.HALF_JOKER,
          addMult: 20,
        });
      }
    },
  },
  [JOKERS_MAP.HANGING_CHAD]: {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (entry.index === 0 && !entry.hangingChadApplied) {
        addEvent({ type: "JOKER_SCORED", joker: JOKERS_MAP.HANGING_CHAD });
        addEvent({ ...entry, hangingChadApplied: true });
        addEvent({ ...entry, hangingChadApplied: true });
      }
    },
  },
  [JOKERS_MAP.JOKER]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      addEvent({ type: "JOKER_SCORED", joker: JOKERS_MAP.JOKER, addMult: 2 });
    },
  },
  [JOKERS_MAP.JOLLY_JOKER]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Pair")) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.JOLLY_JOKER,
          addMult: 8,
        });
      }
    },
  },
  [JOKERS_MAP.MAD_JOKER]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Two Pair")) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.MAD_JOKER,
          addMult: 10,
        });
      }
    },
  },
  [JOKERS_MAP.ODD_TODD]: {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isOddRank(entry.card)) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.ODD_TODD,
          addChips: 31,
        });
      }
    },
  },
  [JOKERS_MAP.PHOTOGRAPH]: {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isFaceCard(entry.card, gameMetadata)) {
        const isFirstFaceCard = scoredCards
          .slice(0, entry.index)
          .every((card) => !isFaceCard(card, gameMetadata));
        if (isFirstFaceCard) {
          addEvent({
            type: "JOKER_SCORED",
            joker: JOKERS_MAP.PHOTOGRAPH,
            addMult: 2,
          });
        }
      }
    },
  },
  [JOKERS_MAP.SCARY_FACE]: {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isFaceCard(entry.card, gameMetadata)) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.SCARY_FACE,
          addChips: 30,
        });
      }
    },
  },
  [JOKERS_MAP.SCHOLAR]: {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (entry.card.rank === 14) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.SCHOLAR,
          addChips: 20,
          addMult: 4,
        });
      }
    },
  },
  [JOKERS_MAP.SLY_JOKER]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Pair")) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.SLY_JOKER,
          addChips: 50,
        });
      }
    },
  },
  [JOKERS_MAP.SMILEY_FACE]: {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isFaceCard(entry.card, gameMetadata)) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.SMILEY_FACE,
          addMult: 5,
        });
      }
    },
  },
  [JOKERS_MAP.WALKIE_TALKIE]: {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (entry.card.rank === 4 || entry.card.rank === 10) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.WALKIE_TALKIE,
          addChips: 10,
          addMult: 4,
        });
      }
    },
  },
  [JOKERS_MAP.WILY_JOKER]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Three of a Kind")) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.WILY_JOKER,
          addChips: 100,
        });
      }
    },
  },
  [JOKERS_MAP.ZANY_JOKER]: {
    when: (entry) => entry.type === "HAND_ENDED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes("Three of a Kind")) {
        addEvent({
          type: "JOKER_SCORED",
          joker: JOKERS_MAP.ZANY_JOKER,
          addMult: 12,
        });
      }
    },
  },
};

function resolveJoker(joker) {
  return resolvedJokers[joker];
}

export { resolveJoker };
