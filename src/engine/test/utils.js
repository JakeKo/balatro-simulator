import { SUITS } from "../../constants.js";

const suitMap = {
  H: SUITS.HEARTS,
  D: SUITS.DIAMONDS,
  C: SUITS.CLUBS,
  S: SUITS.SPADES,
};
const rankMap = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  10: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};
const enhancementMap = {
  X: "None",
  A: "Gold",
  B: "Bonus",
  G: "Glass",
  L: "Lucky",
  M: "Mult",
  O: "Stone",
  S: "Steel",
  W: "Wild",
};
const editionMap = {
  X: "None",
  F: "Foil",
  H: "Holographic",
  N: "Negative",
  P: "Polychrome",
};
const sealMap = {
  X: "None",
  B: "Blue",
  G: "Gold",
  P: "Purple",
  R: "Red",
};

const regex = /([0-9]{1,2}|[AKQJ])([HDCS])([XABGLMOSW]?)([XFHNP]?)([XBGPR]?)/;

function parseCard(cardStr) {
  const [, rankStr, suitStr, enhancementStr, editionStr, sealStr] =
    cardStr.match(regex);

  const rank = rankMap[rankStr];
  const suit = suitMap[suitStr];
  const enhancement = enhancementMap[enhancementStr];
  const edition = editionMap[editionStr];
  const seal = sealMap[sealStr];

  return { suit, rank, enhancement, edition, seal };
}

function parseCards(cardStrs) {
  return cardStrs.map(parseCard);
}

export { parseCard, parseCards };
