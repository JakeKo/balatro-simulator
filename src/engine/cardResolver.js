import { ENHANCEMENTS } from "../constants.js";

function resolveCard(card) {
  let addChips = [14, 13, 12].includes(card.rank) ? 11 : card.rank;
  if (card.enhancement === ENHANCEMENTS.BONUS) addChips = addChips + 30;
  if (card.enhancement === ENHANCEMENTS.STONE) addChips = 50;

  let addMult = 0;
  let multMult = 1;
  if (card.enhancement === ENHANCEMENTS.MULT) addMult = 4;
  if (card.enhancement === ENHANCEMENTS.LUCKY) addMult = 20;
  if (card.enhancement === ENHANCEMENTS.GLASS) multMult = 2;

  return [addChips, addMult, multMult];
}

export { resolveCard };
