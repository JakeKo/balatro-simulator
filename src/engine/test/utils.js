import { SUIT_MAP } from "../constants.js";

function parseCard(cardStr) {
  const suitMap = {
    H: SUIT_MAP.HEARTS,
    D: SUIT_MAP.DIAMONDS,
    C: SUIT_MAP.CLUBS,
    S: SUIT_MAP.SPADES,
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

  const suit = suitMap[cardStr.slice(-1)];
  const rank = rankMap[cardStr.slice(0, -1)];

  return { suit, rank };
}

function parseCards(cardStrs) {
  return cardStrs.map(parseCard);
}

export { parseCard, parseCards };
