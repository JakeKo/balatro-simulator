import { ENHANCEMENTS, EDITIONS, EVENT_TYPES, SEALS } from "../constants.js";

function isOddRank(card) {
  // Rank 14 is an Ace, which is treated instead as rank 1 in this context
  return [14, 9, 7, 5, 3].includes(card.rank);
}

function isEvenRank(card) {
  return [10, 8, 6, 4, 2].includes(card.rank);
}

function isFaceCard(card) {
  return card.rank >= 11 && card.rank <= 13;
}

function isSuit(card, suit) {
  return card.suit === suit || card.enhancement === ENHANCEMENTS.WILD;
}

function resolveCard(card, index, { on }) {
  on(EVENT_TYPES.HAND_PLAYED, (node) => {
    let addChips;
    let addMult = 0;
    let multMult = 1;

    if (card.rank === 14) addChips = 11;
    else if ([13, 12, 11].includes(card.rank)) addChips = 10;
    else addChips = card.rank;

    if (card.enhancement === ENHANCEMENTS.BONUS) addChips += 30;
    if (card.enhancement === ENHANCEMENTS.STONE) addChips = 50;

    if (card.edition === EDITIONS.FOIL) addChips += 50;

    if (card.enhancement === ENHANCEMENTS.MULT) addMult = 4;
    if (card.enhancement === ENHANCEMENTS.LUCKY) addMult = 20;
    if (card.enhancement === ENHANCEMENTS.GLASS) multMult = 2;

    node.addChild({
      type: EVENT_TYPES.CARD_SCORED,
      card,
      index,
      addChips,
      addMult,
      multMult,
    });

    if (card.seal === SEALS.RED) {
      node.addChild({
        type: EVENT_TYPES.CARD_SCORED,
        card,
        index,
        addChips,
        addMult,
        multMult,
        retriggered: true,
      });
    }
  });
}

export { isOddRank, isEvenRank, isFaceCard, isSuit, resolveCard };
