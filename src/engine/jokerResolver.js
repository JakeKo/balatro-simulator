import { identifyAllHandsPlayed } from "./handResolver";
import { JOKERS, HANDS, EVENT_TYPES } from "../constants";

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
  [JOKERS.ABSTRACT_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const addMult = 3 * gameMetadata.jokerCount;
      addEvent({
        type: EVENT_TYPES.JOKER_SCORED,
        joker: JOKERS.ABSTRACT_JOKER,
        addMult,
      });
    },
  },
  [JOKERS.ACROBAT]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (gameMetadata.finalHand) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.ACROBAT,
          multMult: 3,
        });
      }
    },
  },
  [JOKERS.BANNER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (gameMetadata.remainingDiscards > 0) {
        const addChips = 30 * gameMetadata.remainingDiscards;
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.BANNER,
          addChips,
        });
      }
    },
  },
  [JOKERS.BLUE_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (gameMetadata.remainingCardsInDeck > 0) {
        const addChips = 2 * gameMetadata.remainingCardsInDeck;
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.BLUE_JOKER,
          addChips,
        });
      }
    },
  },
  [JOKERS.CAVENDISH]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      addEvent({
        type: EVENT_TYPES.JOKER_SCORED,
        joker: JOKERS.CAVENDISH,
        addMult: 3,
      });
    },
  },
  [JOKERS.CLEVER_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes(HANDS.TWO_PAIR)) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.CLEVER_JOKER,
          addChips: 80,
        });
      }
    },
  },
  [JOKERS.CRAFTY_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes(HANDS.FLUSH)) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.CRAFTY_JOKER,
          addChips: 80,
        });
      }
    },
  },
  [JOKERS.CRAZY_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes(HANDS.STRAIGHT)) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.CRAZY_JOKER,
          addMult: 12,
        });
      }
    },
  },
  [JOKERS.DEVIOUS_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes(HANDS.STRAIGHT)) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.DEVIOUS_JOKER,
          addChips: 100,
        });
      }
    },
  },
  [JOKERS.DROLL_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes(HANDS.FLUSH)) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.DROLL_JOKER,
          addMult: 10,
        });
      }
    },
  },
  [JOKERS.EVEN_STEVEN]: {
    when: (entry) => entry.type === EVENT_TYPES.CARD_SCORED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isEvenRank(entry.card)) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.EVEN_STEVEN,
          addMult: 4,
        });
      }
    },
  },
  [JOKERS.FORTUNE_TELLER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const addMult = gameMetadata.cardsUsedThisRun + scoredCards.length;
      addEvent({
        type: EVENT_TYPES.JOKER_SCORED,
        joker: JOKERS.FORTUNE_TELLER,
        addMult,
      });
    },
  },
  [JOKERS.GROS_MICHEL]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      addEvent({
        type: EVENT_TYPES.JOKER_SCORED,
        joker: JOKERS.GROS_MICHEL,
        addMult: 15,
      });
    },
  },
  [JOKERS.HALF_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (scoredCards.length <= 3) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.HALF_JOKER,
          addMult: 20,
        });
      }
    },
  },
  [JOKERS.HANGING_CHAD]: {
    when: (entry) => entry.type === EVENT_TYPES.CARD_SCORED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (entry.index === 0 && !entry.hangingChadApplied) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.HANGING_CHAD,
        });
        addEvent({ ...entry, hangingChadApplied: true });
        addEvent({ ...entry, hangingChadApplied: true });
      }
    },
  },
  [JOKERS.JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      addEvent({
        type: EVENT_TYPES.JOKER_SCORED,
        joker: JOKERS.JOKER,
        addMult: 4,
      });
    },
  },
  [JOKERS.JOLLY_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes(HANDS.PAIR)) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.JOLLY_JOKER,
          addMult: 8,
        });
      }
    },
  },
  [JOKERS.MAD_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes(HANDS.TWO_PAIR)) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.MAD_JOKER,
          addMult: 10,
        });
      }
    },
  },
  [JOKERS.ODD_TODD]: {
    when: (entry) => entry.type === EVENT_TYPES.CARD_SCORED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isOddRank(entry.card)) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.ODD_TODD,
          addChips: 31,
        });
      }
    },
  },
  [JOKERS.PHOTOGRAPH]: {
    when: (entry) => entry.type === EVENT_TYPES.CARD_SCORED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isFaceCard(entry.card, gameMetadata)) {
        const isFirstFaceCard = scoredCards
          .slice(0, entry.index)
          .every((card) => !isFaceCard(card, gameMetadata));
        if (isFirstFaceCard) {
          addEvent({
            type: EVENT_TYPES.JOKER_SCORED,
            joker: JOKERS.PHOTOGRAPH,
            addMult: 2,
          });
        }
      }
    },
  },
  [JOKERS.SCARY_FACE]: {
    when: (entry) => entry.type === EVENT_TYPES.CARD_SCORED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isFaceCard(entry.card, gameMetadata)) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.SCARY_FACE,
          addChips: 30,
        });
      }
    },
  },
  [JOKERS.SCHOLAR]: {
    when: (entry) => entry.type === EVENT_TYPES.CARD_SCORED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (entry.card.rank === 14) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.SCHOLAR,
          addChips: 20,
          addMult: 4,
        });
      }
    },
  },
  [JOKERS.SLY_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes(HANDS.PAIR)) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.SLY_JOKER,
          addChips: 50,
        });
      }
    },
  },
  [JOKERS.SMILEY_FACE]: {
    when: (entry) => entry.type === EVENT_TYPES.CARD_SCORED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isFaceCard(entry.card, gameMetadata)) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.SMILEY_FACE,
          addMult: 5,
        });
      }
    },
  },
  [JOKERS.WALKIE_TALKIE]: {
    when: (entry) => entry.type === EVENT_TYPES.CARD_SCORED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (entry.card.rank === 4 || entry.card.rank === 10) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.WALKIE_TALKIE,
          addChips: 10,
          addMult: 4,
        });
      }
    },
  },
  [JOKERS.WILY_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes(HANDS.THREE_OF_A_KIND)) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.WILY_JOKER,
          addChips: 100,
        });
      }
    },
  },
  [JOKERS.ZANY_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const allHandsPlayed = identifyAllHandsPlayed(scoredCards);
      if (allHandsPlayed.includes(HANDS.THREE_OF_A_KIND)) {
        addEvent({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.ZANY_JOKER,
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
