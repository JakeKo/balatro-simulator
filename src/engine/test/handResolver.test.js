import { handIsRoyalFlush } from "../handResolver.js";

function parseCard(cardStr) {
  const suitMap = {
    H: "hearts",
    D: "diamonds",
    C: "clubs",
    S: "spades",
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

describe("handIsRoyalFlush", () => {
  it("is true when royal flush is present", () => {
    const playedCards = parseCards(["AH", "KH", "QH", "JH", "10H"]);
    expect(handIsRoyalFlush(playedCards)).toBe(true);
  });

  it("is false when ranks are not consecutive", () => {
    const playedCards = parseCards(["AH", "KH", "QH", "JH", "9H"]);
    expect(handIsRoyalFlush(playedCards)).toBe(false);
  });

  it("is false when cards are not all the same suit", () => {
    const playedCards = parseCards(["AH", "KH", "QH", "JH", "10D"]);
    expect(handIsRoyalFlush(playedCards)).toBe(false);
  });

  it("is false when there are not enough cards for royal flush", () => {
    const playedCards = parseCards(["AH", "KH", "QH"]);
    expect(handIsRoyalFlush(playedCards)).toBe(false);
  });
});
