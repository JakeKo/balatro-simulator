import {
  handIsPair,
  handIsTwoPair,
  handIsThreeOfAKind,
  handIsStraight,
  handIsFlush,
} from "./handResolver";
import { JOKERS, EVENT_TYPES } from "../constants";
import { isOddRank, isEvenRank, isFaceCard } from "./cardResolver";

function jokerScored(joker, addChips, addMult, multMult) {
  const event = {
    type: EVENT_TYPES.JOKER_SCORED,
    joker,
  };

  if (addChips) event.addChips = addChips;
  if (addMult) event.addMult = addMult;
  if (multMult) event.multMult = multMult;

  return event;
}

const resolvedJokers = {
  [JOKERS.ABSTRACT_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const addMult = 3 * gameMetadata.jokerCount;
      addEvent(jokerScored(JOKERS.ABSTRACT_JOKER, 0, addMult, 0));
    },
  },
  [JOKERS.ACROBAT]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (gameMetadata.finalHand) {
        addEvent(jokerScored(JOKERS.ACROBAT, 0, 0, 3));
      }
    },
  },
  [JOKERS.BANNER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (gameMetadata.remainingDiscards > 0) {
        const addChips = 30 * gameMetadata.remainingDiscards;
        addEvent(jokerScored(JOKERS.BANNER, addChips, 0, 0));
      }
    },
  },
  [JOKERS.BLUE_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (gameMetadata.remainingCardsInDeck > 0) {
        const addChips = 2 * gameMetadata.remainingCardsInDeck;
        addEvent(jokerScored(JOKERS.BLUE_JOKER, addChips, 0, 0));
      }
    },
  },
  [JOKERS.CAVENDISH]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      addEvent(jokerScored(JOKERS.CAVENDISH, 0, 0, 3));
    },
  },
  [JOKERS.CLEVER_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (handIsTwoPair(scoredCards)) {
        addEvent(jokerScored(JOKERS.CLEVER_JOKER, 80, 0, 0));
      }
    },
  },
  [JOKERS.CRAFTY_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (handIsFlush(scoredCards)) {
        addEvent(jokerScored(JOKERS.CRAFTY_JOKER, 80, 0, 0));
      }
    },
  },
  [JOKERS.CRAZY_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (handIsStraight(scoredCards)) {
        addEvent(jokerScored(JOKERS.CRAZY_JOKER, 0, 12, 0));
      }
    },
  },
  [JOKERS.DEVIOUS_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (handIsStraight(scoredCards)) {
        addEvent(jokerScored(JOKERS.DEVIOUS_JOKER, 100, 0, 0));
      }
    },
  },
  [JOKERS.DROLL_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (handIsFlush(scoredCards)) {
        addEvent(jokerScored(JOKERS.DROLL_JOKER, 0, 10, 0));
      }
    },
  },
  [JOKERS.EVEN_STEVEN]: {
    when: (entry) => entry.type === EVENT_TYPES.CARD_SCORED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isEvenRank(entry.card)) {
        addEvent(jokerScored(JOKERS.EVEN_STEVEN, 0, 4, 0));
      }
    },
  },
  [JOKERS.FORTUNE_TELLER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      const addMult = gameMetadata.cardsUsedThisRun + scoredCards.length;
      addEvent(jokerScored(JOKERS.FORTUNE_TELLER, 0, addMult, 0));
    },
  },
  [JOKERS.GROS_MICHEL]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      addEvent(jokerScored(JOKERS.GROS_MICHEL, 0, 15, 0));
    },
  },
  [JOKERS.HALF_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (scoredCards.length <= 3) {
        addEvent(jokerScored(JOKERS.HALF_JOKER, 0, 20, 0));
      }
    },
  },
  [JOKERS.HANGING_CHAD]: {
    when: (entry) => entry.type === EVENT_TYPES.CARD_SCORED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (entry.index === 0 && !entry.hangingChadApplied) {
        addEvent(jokerScored(JOKERS.HANGING_CHAD, 0, 0, 0));
        addEvent({ ...entry, hangingChadApplied: true });
        addEvent({ ...entry, hangingChadApplied: true });
      }
    },
  },
  [JOKERS.JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      addEvent(jokerScored(JOKERS.JOKER, 0, 4, 0));
    },
  },
  [JOKERS.JOLLY_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (handIsPair(scoredCards)) {
        addEvent(jokerScored(JOKERS.JOLLY_JOKER, 0, 8, 0));
      }
    },
  },
  [JOKERS.MAD_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (handIsTwoPair(scoredCards)) {
        addEvent(jokerScored(JOKERS.MAD_JOKER, 0, 10, 0));
      }
    },
  },
  [JOKERS.ODD_TODD]: {
    when: (entry) => entry.type === EVENT_TYPES.CARD_SCORED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isOddRank(entry.card)) {
        addEvent(jokerScored(JOKERS.ODD_TODD, 31, 0, 0));
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
          addEvent(jokerScored(JOKERS.PHOTOGRAPH, 0, 0, 2));
        }
      }
    },
  },
  [JOKERS.SCARY_FACE]: {
    when: (entry) => entry.type === EVENT_TYPES.CARD_SCORED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isFaceCard(entry.card, gameMetadata)) {
        addEvent(jokerScored(JOKERS.SCARY_FACE, 30, 0, 0));
      }
    },
  },
  [JOKERS.SCHOLAR]: {
    when: (entry) => entry.type === EVENT_TYPES.CARD_SCORED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (entry.card.rank === 14) {
        addEvent(jokerScored(JOKERS.SCHOLAR, 20, 4, 0));
      }
    },
  },
  [JOKERS.SLY_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (handIsPair(scoredCards)) {
        addEvent(jokerScored(JOKERS.SLY_JOKER, 50, 0, 0));
      }
    },
  },
  [JOKERS.SMILEY_FACE]: {
    when: (entry) => entry.type === EVENT_TYPES.CARD_SCORED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isFaceCard(entry.card, gameMetadata)) {
        addEvent(jokerScored(JOKERS.SMILEY_FACE, 0, 5, 0));
      }
    },
  },
  [JOKERS.WALKIE_TALKIE]: {
    when: (entry) => entry.type === EVENT_TYPES.CARD_SCORED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (entry.card.rank === 4 || entry.card.rank === 10) {
        addEvent(jokerScored(JOKERS.WALKIE_TALKIE, 10, 4, 0));
      }
    },
  },
  [JOKERS.WILY_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (handIsThreeOfAKind(scoredCards)) {
        addEvent(jokerScored(JOKERS.WILY_JOKER, 100, 0, 0));
      }
    },
  },
  [JOKERS.ZANY_JOKER]: {
    when: (entry) => entry.type === EVENT_TYPES.HAND_ENDED,
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (handIsThreeOfAKind(scoredCards)) {
        addEvent(jokerScored(JOKERS.ZANY_JOKER, 0, 12, 0));
      }
    },
  },
};

function resolveJoker(joker) {
  return resolvedJokers[joker];
}

export { resolveJoker };
