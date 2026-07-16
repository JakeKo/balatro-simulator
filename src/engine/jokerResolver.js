import {
  handIsPair,
  handIsTwoPair,
  handIsThreeOfAKind,
  handIsStraight,
  handIsFlush,
} from "./handResolver";
import { JOKERS, EVENT_TYPES, SUITS } from "../constants";
import { isOddRank, isEvenRank, isFaceCard, isSuit } from "./cardResolver";

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

function resolveJoker(joker, { on }) {
  const resolvedJokers = {
    [JOKERS.ABSTRACT_JOKER]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node, round) => {
        const addMult = 3 * round.jokers.length;
        node.addChild(jokerScored(joker, 0, addMult, 0));
      });
    },
    [JOKERS.ACROBAT]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node) => {
        if (joker.metadata.finalHand) {
          node.addChild(jokerScored(joker, 0, 0, 3));
        }
      });
    },
    [JOKERS.ANCIENT_JOKER]: () => {
      on(EVENT_TYPES.CARD_SCORED, (node) => {
        if (isSuit(node.payload.card, joker.metadata.suit)) {
          node.addChild(jokerScored(joker, 0, 0, 1.5));
        }
      });
    },
    [JOKERS.ARROWHEAD]: () => {
      on(EVENT_TYPES.CARD_SCORED, (node) => {
        if (isSuit(node.payload.card, SUITS.SPADES)) {
          node.addChild(jokerScored(joker, 50, 0, 0));
        }
      });
    },
    [JOKERS.BANNER]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node) => {
        if (joker.metadata.remainingDiscards > 0) {
          const addChips = 30 * joker.metadata.remainingDiscards;
          node.addChild(jokerScored(joker, addChips, 0, 0));
        }
      });
    },
    [JOKERS.BARON]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node) => {
        if (joker.metadata.kingsInHand > 0) {
          const multMult = Math.pow(1.5, joker.metadata.kingsInHand);
          node.addChild(jokerScored(joker, 0, 0, multMult));
        }
      });
    },
    [JOKERS.BLUE_JOKER]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node) => {
        if (joker.metadata.remainingCardsInDeck > 0) {
          const addChips = 2 * joker.metadata.remainingCardsInDeck;
          node.addChild(jokerScored(joker, addChips, 0, 0));
        }
      });
    },
    [JOKERS.CAVENDISH]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node) => {
        node.addChild(jokerScored(joker, 0, 0, 3));
      });
    },
    [JOKERS.CLEVER_JOKER]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node, round) => {
        if (handIsTwoPair(round.scoredCards)) {
          node.addChild(jokerScored(joker, 80, 0, 0));
        }
      });
    },
    [JOKERS.CRAFTY_JOKER]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node, round) => {
        if (handIsFlush(round.scoredCards)) {
          node.addChild(jokerScored(joker, 80, 0, 0));
        }
      });
    },
    [JOKERS.CRAZY_JOKER]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node, round) => {
        if (handIsStraight(round.scoredCards)) {
          node.addChild(jokerScored(joker, 0, 12, 0));
        }
      });
    },
    [JOKERS.DEVIOUS_JOKER]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node, round) => {
        if (handIsStraight(round.scoredCards)) {
          node.addChild(jokerScored(joker, 100, 0, 0));
        }
      });
    },
    [JOKERS.DROLL_JOKER]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node, round) => {
        if (handIsFlush(round.scoredCards)) {
          node.addChild(jokerScored(joker, 0, 10, 0));
        }
      });
    },
    [JOKERS.EVEN_STEVEN]: () => {
      on(EVENT_TYPES.CARD_SCORED, (node) => {
        if (isEvenRank(node.payload.card)) {
          node.addChild(jokerScored(joker, 0, 4, 0));
        }
      });
    },
    [JOKERS.FORTUNE_TELLER]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node) => {
        if (joker.metadata.tarotCardsUsed > 0) {
          node.addChild(
            jokerScored(joker, 0, joker.metadata.tarotCardsUsed, 0),
          );
        }
      });
    },
    [JOKERS.GROS_MICHEL]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node) => {
        node.addChild(jokerScored(joker, 0, 15, 0));
      });
    },
    [JOKERS.HALF_JOKER]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node, round) => {
        if (round.playedCards.length <= 3) {
          node.addChild(jokerScored(joker, 0, 20, 0));
        }
      });
    },
    [JOKERS.HANGING_CHAD]: () => {
      on(EVENT_TYPES.CARD_SCORED, (node) => {
        if (node.payload.index === 0 && !node.payload.retriggered) {
          node.addChild(jokerScored(joker, 0, 0, 0));
          node.parent.addChild({ ...node.payload, retriggered: true });
          node.parent.addChild({ ...node.payload, retriggered: true });
        }
      });
    },
    [JOKERS.JOKER]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node) => {
        node.addChild(jokerScored(joker, 0, 4, 0));
      });
    },
    [JOKERS.JOLLY_JOKER]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node, round) => {
        if (handIsPair(round.scoredCards)) {
          node.addChild(jokerScored(joker, 0, 8, 0));
        }
      });
    },
    [JOKERS.MAD_JOKER]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node, round) => {
        if (handIsTwoPair(round.scoredCards)) {
          node.addChild(jokerScored(joker, 0, 10, 0));
        }
      });
    },
    [JOKERS.ODD_TODD]: () => {
      on(EVENT_TYPES.CARD_SCORED, (node) => {
        if (isOddRank(node.payload.card)) {
          node.addChild(jokerScored(joker, 31, 0, 0));
        }
      });
    },
    [JOKERS.PHOTOGRAPH]: () => {
      on(EVENT_TYPES.CARD_SCORED, (node, round) => {
        if (isFaceCard(node.payload.card)) {
          const isFirstFaceCard = round.scoredCards
            .slice(0, node.payload.index)
            .every((card) => !isFaceCard(card));
          if (isFirstFaceCard) {
            node.addChild(jokerScored(joker, 0, 0, 2));
          }
        }
      });
    },
    [JOKERS.SCARY_FACE]: () => {
      on(EVENT_TYPES.CARD_SCORED, (node) => {
        if (isFaceCard(node.payload.card)) {
          node.addChild(jokerScored(joker, 30, 0, 0));
        }
      });
    },
    [JOKERS.SCHOLAR]: () => {
      on(EVENT_TYPES.CARD_SCORED, (node) => {
        if (node.payload.card.rank === 14) {
          node.addChild(jokerScored(joker, 20, 4, 0));
        }
      });
    },
    [JOKERS.SLY_JOKER]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node, round) => {
        if (handIsPair(round.scoredCards)) {
          node.addChild(jokerScored(joker, 50, 0, 0));
        }
      });
    },
    [JOKERS.SMILEY_FACE]: () => {
      on(EVENT_TYPES.CARD_SCORED, (node) => {
        if (isFaceCard(node.payload.card)) {
          node.addChild(jokerScored(joker, 0, 5, 0));
        }
      });
    },
    [JOKERS.THE_ORDER]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node, round) => {
        if (handIsStraight(round.scoredCards)) {
          node.addChild(jokerScored(joker, 0, 0, 3));
        }
      });
    },
    [JOKERS.THE_TRIBE]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node, round) => {
        if (handIsFlush(round.scoredCards)) {
          node.addChild(jokerScored(joker, 0, 0, 2));
        }
      });
    },
    [JOKERS.THE_TRIO]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node, round) => {
        if (handIsThreeOfAKind(round.scoredCards)) {
          node.addChild(jokerScored(joker, 0, 0, 3));
        }
      });
    },
    [JOKERS.THROWBACK]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node) => {
        if (joker.metadata.blindsSkipped > 0) {
          const multMult = 1 + 0.25 * joker.metadata.blindsSkipped;
          node.addChild(jokerScored(joker, 0, 0, multMult));
        }
      });
    },
    [JOKERS.TRIBOULET]: () => {
      on(EVENT_TYPES.CARD_SCORED, (node) => {
        const { card } = node.payload;
        if (card.rank === 12 || card.rank === 13) {
          node.addChild(jokerScored(joker, 0, 0, 2));
        }
      });
    },
    [JOKERS.WALKIE_TALKIE]: () => {
      on(EVENT_TYPES.CARD_SCORED, (node) => {
        if (node.payload.card.rank === 4 || node.payload.card.rank === 10) {
          node.addChild(jokerScored(joker, 10, 4, 0));
        }
      });
    },
    [JOKERS.WILY_JOKER]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node, round) => {
        if (handIsThreeOfAKind(round.scoredCards)) {
          node.addChild(jokerScored(joker, 100, 0, 0));
        }
      });
    },
    [JOKERS.WRATHFUL_JOKER]: () => {
      on(EVENT_TYPES.CARD_SCORED, (node) => {
        if (isSuit(node.payload.card, SUITS.SPADES)) {
          node.addChild(jokerScored(joker, 0, 3, 0));
        }
      });
    },
    [JOKERS.WEE_JOKER]: () => {
      on(EVENT_TYPES.CARD_SCORED, (node) => {
        if (node.payload.card.rank === 2) {
          const { metadata } = joker;
          metadata.extraChipsAdded += 8;
          node.addChild(jokerScored(joker, 0, 0, 0));
        }
      });

      on(EVENT_TYPES.HAND_ENDED, (node) => {
        const { metadata } = joker;
        const addChips = metadata.extraChipsBase + metadata.extraChipsAdded;

        if (addChips > 0) {
          node.addChild(jokerScored(joker, addChips, 0, 0));
        }
      });

      // Zero out the extraChipsAdded for the next hand
      joker.metadata.extraChipsAdded = 0;
    },
    [JOKERS.YORICK]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node) => {
        const multMult = 1 + Math.floor(joker.metadata.cardsDiscarded / 23);
        node.addChild(jokerScored(joker, 0, 0, multMult));
      });
    },
    [JOKERS.ZANY_JOKER]: () => {
      on(EVENT_TYPES.HAND_ENDED, (node, round) => {
        if (handIsThreeOfAKind(round.scoredCards)) {
          node.addChild(jokerScored(joker, 0, 12, 0));
        }
      });
    },
  };

  if (joker.name in resolvedJokers) resolvedJokers[joker.name]();
}

export { resolveJoker };
