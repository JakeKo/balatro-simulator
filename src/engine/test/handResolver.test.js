import { handIsRoyalFlush, handIsStraightFlush } from "../handResolver.js";
import { parseCards } from "./utils.js";

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

describe("handIsStraightFlush", () => {
  it("is true when straight flush is present", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "5H"]);
    expect(handIsStraightFlush(playedCards)).toBe(true);
  });

  it("is false when ranks are not consecutive", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "4H"]);
    expect(handIsStraightFlush(playedCards)).toBe(false);
  });

  it("is false when cards are not all the same suit", () => {
    const playedCards = parseCards(["9H", "8H", "7H", "6H", "5D"]);
    expect(handIsStraightFlush(playedCards)).toBe(false);
  });

  it("is false when there are not enough cards for straight flush", () => {
    const playedCards = parseCards(["9H", "8H", "7H"]);
    expect(handIsStraightFlush(playedCards)).toBe(false);
  });
});
