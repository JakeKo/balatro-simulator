import {
  handIsRoyalFlush,
  findRoyalFlush,
  handIsStraightFlush,
  findStraightFlush,
  handIsFourOfAKind,
  findFourOfAKind,
  handIsFullHouse,
  findFullHouse,
  handIsFlush,
  findFlush,
  handIsStraight,
  findStraight,
  handIsThreeOfAKind,
  findThreeOfAKind,
  handIsTwoPair,
  findTwoPair,
  handIsPair,
  findPair,
  handIsHighCard,
  findHighCard,
} from "../handResolver.js";
import { parseCards } from "./utils.js";

describe("handIsRoyalFlush", () => {
  it("Royal flush present", () => {
    const playedCards = parseCards(["AH", "KH", "QH", "JH", "10H"]);
    expect(handIsRoyalFlush(playedCards)).toBe(true);
  });

  it("Royal flush present with wild card", () => {
    const playedCards = parseCards(["AH", "KH", "QDWXX", "JH", "10H"]);
    expect(handIsRoyalFlush(playedCards)).toBe(true);
  });

  it("Ranks not consecutive", () => {
    const playedCards = parseCards(["AH", "KH", "QH", "JH", "9H"]);
    expect(handIsRoyalFlush(playedCards)).toBe(false);
  });

  it("Suits not all the same", () => {
    const playedCards = parseCards(["AH", "KH", "QH", "JH", "10D"]);
    expect(handIsRoyalFlush(playedCards)).toBe(false);
  });

  it("Not enough cards", () => {
    const playedCards = parseCards(["AH", "KH", "QH"]);
    expect(handIsRoyalFlush(playedCards)).toBe(false);
  });
});

describe("findRoyalFlush", () => {
  it("Normal", () => {
    const playedCards = parseCards(["AH", "KH", "QH", "JH", "10H"]);
    expect(findRoyalFlush(playedCards)).toEqual(playedCards);
  });

  it("Wild card", () => {
    const playedCards = parseCards(["AH", "KH", "QDWXX", "JH", "10H"]);
    expect(findRoyalFlush(playedCards)).toEqual(playedCards);
  });
});

describe("handIsStraightFlush", () => {
  it("Straight flush present", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "5H"]);
    expect(handIsStraightFlush(playedCards)).toBe(true);
  });

  it("Straight flush present with wild card", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "5DWXX"]);
    expect(handIsStraightFlush(playedCards)).toBe(true);
  });

  it("Ranks not consecutive", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "4H"]);
    expect(handIsStraightFlush(playedCards)).toBe(false);
  });

  it("Suits not all the same", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "5D"]);
    expect(handIsStraightFlush(playedCards)).toBe(false);
  });

  it("Not enough cards", () => {
    const playedCards = parseCards(["9H", "8H", "7H"]);
    expect(handIsStraightFlush(playedCards)).toBe(false);
  });
});

describe("findStraightFlush", () => {
  it("Normal", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "5H"]);
    expect(findStraightFlush(playedCards)).toEqual(playedCards);
  });

  it("Wild card", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "5DWXX"]);
    expect(findStraightFlush(playedCards)).toEqual(playedCards);
  });
});

describe("handIsFourOfAKind", () => {
  it("is true when four of a kind is present", () => {
    const playedCards = parseCards(["9H", "9D", "9C", "9S", "5H"]);
    expect(handIsFourOfAKind(playedCards)).toBe(true);
  });

  it("is false when there are not four cards of the same rank", () => {
    const playedCards = parseCards(["9H", "9D", "9C", "8S", "5H"]);
    expect(handIsFourOfAKind(playedCards)).toBe(false);
  });

  it("is false when there are not enough cards for four of a kind", () => {
    const playedCards = parseCards(["9H", "9D", "9C"]);
    expect(handIsFourOfAKind(playedCards)).toBe(false);
  });
});

describe("findFourOfAKind", () => {
  it("returns the correct cards for four of a kind", () => {
    const playedCards = parseCards(["9H", "9D", "9C", "9S", "5H"]);
    const expected = parseCards(["9H", "9D", "9C", "9S"]);
    expect(findFourOfAKind(playedCards)).toEqual(expected);
  });
});

describe("handIsFullHouse", () => {
  it("is true when full house is present", () => {
    const playedCards = parseCards(["9H", "9D", "9C", "8S", "8H"]);
    expect(handIsFullHouse(playedCards)).toBe(true);
  });

  it("is false when there are not three cards of the same rank", () => {
    const playedCards = parseCards(["9H", "9D", "8C", "8S", "7H"]);
    expect(handIsFullHouse(playedCards)).toBe(false);
  });

  it("is false when there are not two cards of the same rank", () => {
    const playedCards = parseCards(["9H", "9D", "9C", "8S", "7H"]);
    expect(handIsFullHouse(playedCards)).toBe(false);
  });

  it("is false when there are not enough cards for full house", () => {
    const playedCards = parseCards(["9H", "9D", "9C"]);
    expect(handIsFullHouse(playedCards)).toBe(false);
  });
});

describe("findFullHouse", () => {
  it("returns the correct cards for a full house", () => {
    const playedCards = parseCards(["9H", "9D", "9C", "8S", "8H"]);
    const expected = parseCards(["9H", "9D", "9C", "8S", "8H"]);
    expect(findFullHouse(playedCards)).toEqual(expected);
  });
});

describe("handIsFlush", () => {
  it("Flush is present", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "5H"]);
    expect(handIsFlush(playedCards)).toBe(true);
  });

  it("Flush is present with wild card", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "5DWXX"]);
    expect(handIsFlush(playedCards)).toBe(true);
  });

  it("Suits not all the same", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "5D"]);
    expect(handIsFlush(playedCards)).toBe(false);
  });

  it("Not enough cards", () => {
    const playedCards = parseCards(["9H", "8H", "7H"]);
    expect(handIsFlush(playedCards)).toBe(false);
  });
});

describe("findFlush", () => {
  it("Normal", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "5H"]);
    expect(findFlush(playedCards)).toEqual(playedCards);
  });

  it("Wild card", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "5DWXX"]);
    expect(findFlush(playedCards)).toEqual(playedCards);
  });
});

describe("handIsStraight", () => {
  it("is true when straight is present", () => {
    const playedCards = parseCards(["9H", "8D", "7C", "6S", "5H"]);
    expect(handIsStraight(playedCards)).toBe(true);
  });

  it("is false when ranks are not consecutive", () => {
    const playedCards = parseCards(["9H", "8D", "7C", "6S", "4H"]);
    expect(handIsStraight(playedCards)).toBe(false);
  });

  it("is false when there are not enough cards for straight", () => {
    const playedCards = parseCards(["9H", "8D", "7C"]);
    expect(handIsStraight(playedCards)).toBe(false);
  });
});

describe("findStraight", () => {
  it("returns the correct cards for a straight", () => {
    const playedCards = parseCards(["9H", "8D", "7C", "6S", "5H"]);
    expect(findStraight(playedCards)).toEqual(playedCards);
  });
});

describe("handIsThreeOfAKind", () => {
  it("is true when three of a kind is present", () => {
    const playedCards = parseCards(["9H", "9D", "9C", "6S", "5H"]);
    expect(handIsThreeOfAKind(playedCards)).toBe(true);
  });

  it("is false when there are not three cards of the same rank", () => {
    const playedCards = parseCards(["9H", "9D", "8C", "6S", "5H"]);
    expect(handIsThreeOfAKind(playedCards)).toBe(false);
  });

  it("is false when there are not enough cards for three of a kind", () => {
    const playedCards = parseCards(["9H", "9D"]);
    expect(handIsThreeOfAKind(playedCards)).toBe(false);
  });
});

describe("findThreeOfAKind", () => {
  it("returns the correct cards for three of a kind", () => {
    const playedCards = parseCards(["9H", "9D", "9C", "6S", "5H"]);
    const expected = parseCards(["9H", "9D", "9C"]);
    expect(findThreeOfAKind(playedCards)).toEqual(expected);
  });
});

describe("handIsTwoPair", () => {
  it("is true when two pair is present", () => {
    const playedCards = parseCards(["9H", "9D", "8C", "8S", "5H"]);
    expect(handIsTwoPair(playedCards)).toBe(true);
  });

  it("is false when there are not two pairs of the same rank", () => {
    const playedCards = parseCards(["9H", "9D", "8C", "7S", "5H"]);
    expect(handIsTwoPair(playedCards)).toBe(false);
  });

  it("is false when there are not enough cards for two pair", () => {
    const playedCards = parseCards(["9H", "9D"]);
    expect(handIsTwoPair(playedCards)).toBe(false);
  });
});

describe("findTwoPair", () => {
  it("returns the correct cards for two pair", () => {
    const playedCards = parseCards(["9H", "9D", "8C", "8S", "5H"]);
    const expected = parseCards(["9H", "9D", "8C", "8S"]);
    expect(findTwoPair(playedCards)).toEqual(expected);
  });
});

describe("handIsPair", () => {
  it("is true when pair is present", () => {
    const playedCards = parseCards(["9H", "9D", "8C", "7S", "5H"]);
    expect(handIsPair(playedCards)).toBe(true);
  });

  it("is false when there are not two cards of the same rank", () => {
    const playedCards = parseCards(["9H", "8D", "7C", "6S", "5H"]);
    expect(handIsPair(playedCards)).toBe(false);
  });

  it("is false when there are not enough cards for pair", () => {
    const playedCards = parseCards(["9H"]);
    expect(handIsPair(playedCards)).toBe(false);
  });
});

describe("findPair", () => {
  it("returns the correct cards for a pair", () => {
    const playedCards = parseCards(["9H", "9D", "8C", "7S", "5H"]);
    const expected = parseCards(["9H", "9D"]);
    expect(findPair(playedCards)).toEqual(expected);
  });
});

describe("handIsHighCard", () => {
  it("is true when no other hand is present", () => {
    const playedCards = parseCards(["9H", "8D", "7C", "6S", "4H"]);
    expect(handIsHighCard(playedCards)).toBe(true);
  });

  it("is false when there are no cards played", () => {
    const playedCards = [];
    expect(handIsHighCard(playedCards)).toBe(false);
  });
});

describe("findHighCard", () => {
  it("returns the correct card for high card", () => {
    const playedCards = parseCards(["9H", "8D", "7C", "6S", "4H"]);
    const expected = parseCards(["9H"]);
    expect(findHighCard(playedCards)).toEqual(expected);
  });
});
