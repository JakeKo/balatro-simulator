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

  it("Royal flush with wild card", () => {
    const playedCards = parseCards(["AH", "KH", "QDWXX", "JH", "10H"]);
    expect(handIsRoyalFlush(playedCards)).toBe(true);
  });

  it("Royal flush with all wild cards", () => {
    const playedCards = parseCards(["ADW", "KHW", "QDW", "JHW", "10DW"]);
    expect(handIsRoyalFlush(playedCards)).toBe(true);
  });

  it("Royal flush with other card modifiers", () => {
    const playedCards = parseCards(["AHB", "KHG", "QHL", "JHM", "10H"]);
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

  it("All wild cards", () => {
    const playedCards = parseCards(["AHW", "KHW", "QDW", "JHW", "10DW"]);
    expect(findRoyalFlush(playedCards)).toEqual(playedCards);
  });

  it("Other card modifiers", () => {
    const playedCards = parseCards(["AHB", "KHG", "QHL", "JHM", "10H"]);
    expect(findRoyalFlush(playedCards)).toEqual(playedCards);
  });
});

describe("handIsStraightFlush", () => {
  it("Straight flush present", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "5H"]);
    expect(handIsStraightFlush(playedCards)).toBe(true);
  });

  it("Straight flush with wild card", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "5DWXX"]);
    expect(handIsStraightFlush(playedCards)).toBe(true);
  });

  it("Straight flush with all wild cards", () => {
    const playedCards = parseCards(["9DW", "8HW", "7DW", "6HW", "5DW"]);
    expect(handIsStraightFlush(playedCards)).toBe(true);
  });

  it("Straight flush with other card modifiers", () => {
    const playedCards = parseCards(["9HB", "8HG", "7HL", "6HM", "5H"]);
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

  it("All wild cards", () => {
    const playedCards = parseCards(["9DW", "8HW", "7DW", "6HW", "5DW"]);
    expect(findStraightFlush(playedCards)).toEqual(playedCards);
  });

  it("Other card modifiers", () => {
    const playedCards = parseCards(["9HB", "8HG", "7HL", "6HM", "5H"]);
    expect(findStraightFlush(playedCards)).toEqual(playedCards);
  });
});

describe("handIsFourOfAKind", () => {
  it("Four of a kind present", () => {
    const playedCards = parseCards(["9H", "9D", "9C", "9S", "5H"]);
    expect(handIsFourOfAKind(playedCards)).toBe(true);
  });

  it("Four of a kind with other card modifiers", () => {
    const playedCards = parseCards(["9HB", "9DG", "9CL", "9SM", "5HW"]);
    expect(handIsFourOfAKind(playedCards)).toBe(true);
  });

  it("Ranks not all the same", () => {
    const playedCards = parseCards(["9H", "9D", "9C", "8S", "5H"]);
    expect(handIsFourOfAKind(playedCards)).toBe(false);
  });

  it("Not enough cards", () => {
    const playedCards = parseCards(["9H", "9D", "9C"]);
    expect(handIsFourOfAKind(playedCards)).toBe(false);
  });
});

describe("findFourOfAKind", () => {
  it("Normal", () => {
    const playedCards = parseCards(["9H", "9D", "9C", "9S", "5H"]);
    const expected = parseCards(["9H", "9D", "9C", "9S"]);
    expect(findFourOfAKind(playedCards)).toEqual(expected);
  });

  it("Other card modifiers", () => {
    const playedCards = parseCards(["9HB", "9DG", "9CL", "9SM", "5HW"]);
    const expected = parseCards(["9HB", "9DG", "9CL", "9SM"]);
    expect(findFourOfAKind(playedCards)).toEqual(expected);
  });
});

describe("handIsFullHouse", () => {
  it("Full house present", () => {
    const playedCards = parseCards(["9H", "9D", "9C", "8S", "8H"]);
    expect(handIsFullHouse(playedCards)).toBe(true);
  });

  it("Full house with other card modifiers", () => {
    const playedCards = parseCards(["9HB", "9DG", "9CL", "8SM", "8HW"]);
    expect(handIsFullHouse(playedCards)).toBe(true);
  });

  it("No three of a kind", () => {
    const playedCards = parseCards(["9H", "9D", "8C", "8S", "7H"]);
    expect(handIsFullHouse(playedCards)).toBe(false);
  });

  it("No pair", () => {
    const playedCards = parseCards(["9H", "9D", "9C", "8S", "7H"]);
    expect(handIsFullHouse(playedCards)).toBe(false);
  });

  it("Not enough cards", () => {
    const playedCards = parseCards(["9H", "9D", "9C"]);
    expect(handIsFullHouse(playedCards)).toBe(false);
  });
});

describe("findFullHouse", () => {
  it("Normal", () => {
    const playedCards = parseCards(["9H", "9D", "9C", "8S", "8H"]);
    expect(findFullHouse(playedCards)).toEqual(playedCards);
  });

  it("Other card modifiers", () => {
    const playedCards = parseCards(["9HB", "9DG", "9CL", "8SM", "8HW"]);
    expect(findFullHouse(playedCards)).toEqual(playedCards);
  });
});

describe("handIsFlush", () => {
  it("Flush is present", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "4H"]);
    expect(handIsFlush(playedCards)).toBe(true);
  });

  it("Flush with wild card", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "4DWXX"]);
    expect(handIsFlush(playedCards)).toBe(true);
  });

  it("Flush with all wild cards", () => {
    const playedCards = parseCards(["9DW", "8DW", "7DW", "6DW", "4DW"]);
    expect(handIsFlush(playedCards)).toBe(true);
  });

  it("Flush with other card modifiers", () => {
    const playedCards = parseCards(["9HB", "8HG", "7HL", "6HM", "4H"]);
    expect(handIsFlush(playedCards)).toBe(true);
  });

  it("Suits not all the same", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "4D"]);
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

  it("All wild cards", () => {
    const playedCards = parseCards(["9DW", "8DW", "7DW", "6DW", "5DW"]);
    expect(findFlush(playedCards)).toEqual(playedCards);
  });

  it("Other card modifiers", () => {
    const playedCards = parseCards(["9HB", "8HG", "7HL", "6HM", "5H"]);
    expect(findFlush(playedCards)).toEqual(playedCards);
  });
});

describe("handIsStraight", () => {
  it("Straight is present", () => {
    const playedCards = parseCards(["9H", "8D", "7C", "6S", "5H"]);
    expect(handIsStraight(playedCards)).toBe(true);
  });

  it("Straight with other card modifiers", () => {
    const playedCards = parseCards(["9HB", "8DG", "7CL", "6SM", "5HW"]);
    expect(handIsStraight(playedCards)).toBe(true);
  });

  it("Ranks not consecutive", () => {
    const playedCards = parseCards(["9H", "8D", "7C", "6S", "4H"]);
    expect(handIsStraight(playedCards)).toBe(false);
  });

  it("Not enough cards", () => {
    const playedCards = parseCards(["9H", "8D", "7C"]);
    expect(handIsStraight(playedCards)).toBe(false);
  });
});

describe("findStraight", () => {
  it("Normal", () => {
    const playedCards = parseCards(["9H", "8D", "7C", "6S", "5H"]);
    expect(findStraight(playedCards)).toEqual(playedCards);
  });

  it("Other card modifiers", () => {
    const playedCards = parseCards(["9HB", "8DG", "7CL", "6SM", "5HW"]);
    expect(findStraight(playedCards)).toEqual(playedCards);
  });
});

describe("handIsThreeOfAKind", () => {
  it("Three of a kind is present", () => {
    const playedCards = parseCards(["9H", "9D", "9C", "6S", "5H"]);
    expect(handIsThreeOfAKind(playedCards)).toBe(true);
  });

  it("Three of a kind with other card modifiers", () => {
    const playedCards = parseCards(["9HB", "9DG", "9CL", "6SM", "5HW"]);
    expect(handIsThreeOfAKind(playedCards)).toBe(true);
  });

  it("Less than three of a kind", () => {
    const playedCards = parseCards(["9H", "9D", "8C", "6S", "5H"]);
    expect(handIsThreeOfAKind(playedCards)).toBe(false);
  });

  it("Not enough cards", () => {
    const playedCards = parseCards(["9H", "9D"]);
    expect(handIsThreeOfAKind(playedCards)).toBe(false);
  });
});

describe("findThreeOfAKind", () => {
  it("Normal", () => {
    const playedCards = parseCards(["9H", "9D", "9C", "6S", "5H"]);
    const expected = parseCards(["9H", "9D", "9C"]);
    expect(findThreeOfAKind(playedCards)).toEqual(expected);
  });

  it("Other card modifiers", () => {
    const playedCards = parseCards(["9HB", "9DG", "9CL", "6SM", "5HW"]);
    const expected = parseCards(["9HB", "9DG", "9CL"]);
    expect(findThreeOfAKind(playedCards)).toEqual(expected);
  });
});

describe("handIsTwoPair", () => {
  it("Two pair is present", () => {
    const playedCards = parseCards(["9H", "9D", "8C", "8S", "5H"]);
    expect(handIsTwoPair(playedCards)).toBe(true);
  });

  it("Two pair with other card modifiers", () => {
    const playedCards = parseCards(["9HB", "9DG", "8CL", "8SM", "5HW"]);
    expect(handIsTwoPair(playedCards)).toBe(true);
  });

  it("Not two pairs of the same rank", () => {
    const playedCards = parseCards(["9H", "9D", "8C", "7S", "5H"]);
    expect(handIsTwoPair(playedCards)).toBe(false);
  });

  it("Not enough cards", () => {
    const playedCards = parseCards(["9H", "9D"]);
    expect(handIsTwoPair(playedCards)).toBe(false);
  });
});

describe("findTwoPair", () => {
  it("Normal", () => {
    const playedCards = parseCards(["9H", "9D", "8C", "8S", "5H"]);
    const expected = parseCards(["9H", "9D", "8C", "8S"]);
    expect(findTwoPair(playedCards)).toEqual(expected);
  });

  it("Other card modifiers", () => {
    const playedCards = parseCards(["9HB", "9DG", "8CL", "8SM", "5HW"]);
    const expected = parseCards(["9HB", "9DG", "8CL", "8SM"]);
    expect(findTwoPair(playedCards)).toEqual(expected);
  });
});

describe("handIsPair", () => {
  it("Pair is present", () => {
    const playedCards = parseCards(["9H", "9D", "8C", "7S", "5H"]);
    expect(handIsPair(playedCards)).toBe(true);
  });

  it("Pair with other card modifiers", () => {
    const playedCards = parseCards(["9HB", "9DG", "8CL", "7SM", "5HW"]);
    expect(handIsPair(playedCards)).toBe(true);
  });

  it("Not two cards of the same rank", () => {
    const playedCards = parseCards(["9H", "8D", "7C", "6S", "5H"]);
    expect(handIsPair(playedCards)).toBe(false);
  });

  it("Not enough cards", () => {
    const playedCards = parseCards(["9H"]);
    expect(handIsPair(playedCards)).toBe(false);
  });
});

describe("findPair", () => {
  it("Normal", () => {
    const playedCards = parseCards(["9H", "9D", "8C", "7S", "5H"]);
    const expected = parseCards(["9H", "9D"]);
    expect(findPair(playedCards)).toEqual(expected);
  });

  it("Other card modifiers", () => {
    const playedCards = parseCards(["9HB", "9DG", "8CL", "7SM", "5HW"]);
    const expected = parseCards(["9HB", "9DG"]);
    expect(findPair(playedCards)).toEqual(expected);
  });
});

describe("handIsHighCard", () => {
  it("High card is present", () => {
    const playedCards = parseCards(["9H", "8D", "7C", "6S", "4H"]);
    expect(handIsHighCard(playedCards)).toBe(true);
  });

  it("High card with other card modifiers", () => {
    const playedCards = parseCards(["9HB", "8DG", "7CL", "6SM", "4HW"]);
    expect(handIsHighCard(playedCards)).toBe(true);
  });

  it("No cards played", () => {
    const playedCards = [];
    expect(handIsHighCard(playedCards)).toBe(false);
  });
});

describe("findHighCard", () => {
  it("Normal", () => {
    const playedCards = parseCards(["9H", "8D", "7C", "6S", "4H"]);
    const expected = parseCards(["9H"]);
    expect(findHighCard(playedCards)).toEqual(expected);
  });

  it("Other card modifiers", () => {
    const playedCards = parseCards(["9HB", "8DG", "7CL", "6SM", "4HW"]);
    const expected = parseCards(["9HB"]);
    expect(findHighCard(playedCards)).toEqual(expected);
  });
});
