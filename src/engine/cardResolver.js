import { ENHANCEMENTS } from "../constants.js";

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

function resolveCard(card) {
  let addChips;
  if (card.rank === 14) addChips = 11;
  else if ([13, 12, 11].includes(card.rank)) addChips = 10;
  else addChips = card.rank;

  if (card.enhancement === ENHANCEMENTS.BONUS) addChips = addChips + 30;
  if (card.enhancement === ENHANCEMENTS.STONE) addChips = 50;

  let addMult = 0;
  let multMult = 1;
  if (card.enhancement === ENHANCEMENTS.MULT) addMult = 4;
  if (card.enhancement === ENHANCEMENTS.LUCKY) addMult = 20;
  if (card.enhancement === ENHANCEMENTS.GLASS) multMult = 2;

  return [addChips, addMult, multMult];
}

export { isOddRank, isEvenRank, isFaceCard, resolveCard };
