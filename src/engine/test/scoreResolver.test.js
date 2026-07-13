import { resolveScore } from "../scoreResolver.js";
import { parseCards } from "./utils.js";

const BASIC_HANDS = {
  "Flush Five": [160, 16],
  "Flush House": [140, 14],
  "Five of a Kind": [120, 12],
  "Royal Flush": [100, 8],
  "Straight Flush": [100, 8],
  "Four of a Kind": [60, 7],
  "Full House": [40, 4],
  Flush: [35, 4],
  Straight: [30, 4],
  "Three of a Kind": [30, 3],
  "Two Pair": [20, 2],
  Pair: [10, 2],
  "High Card": [5, 1],
};

describe("scoreResolver", () => {
  it("handles a custom hand map", () => {
    const hand = parseCards(["AH", "KH", "QH", "JH", "10H"]);
    const customHandMap = { ...BASIC_HANDS, "Royal Flush": [200, 10] };
    const [chips, mult, eventLog] = resolveScore(hand, customHandMap, [], {});

    expect(chips).toBe(260);
    expect(mult).toBe(10);
    expect(eventLog).toContainEqual(
      expect.objectContaining({
        type: "HAND_PLAYED",
        hand: "Royal Flush",
        baseChips: 200,
        baseMult: 10,
      }),
    );
  });

  it("detects a royal flush", () => {
    const hand = parseCards(["AH", "KH", "QH", "JH", "10H"]);
    const [chips, mult, eventLog] = resolveScore(hand, BASIC_HANDS, [], {});

    expect(chips).toBe(160);
    expect(mult).toBe(8);
    expect(eventLog).toContainEqual(
      expect.objectContaining({
        type: "HAND_PLAYED",
        hand: "Royal Flush",
        baseChips: 100,
        baseMult: 8,
      }),
    );
  });

  it("detects a straight flush", () => {
    const hand = parseCards(["9H", "8H", "7H", "6H", "5H"]);
    const [chips, mult, eventLog] = resolveScore(hand, BASIC_HANDS, [], {});

    expect(chips).toBe(135);
    expect(mult).toBe(8);
    expect(eventLog).toContainEqual(
      expect.objectContaining({
        type: "HAND_PLAYED",
        hand: "Straight Flush",
        baseChips: 100,
        baseMult: 8,
      }),
    );
  });

  it("detects four of a kind", () => {
    const hand = parseCards(["9H", "9D", "9C", "9S", "5H"]);
    const [chips, mult, eventLog] = resolveScore(hand, BASIC_HANDS, [], {});

    expect(chips).toBe(96);
    expect(mult).toBe(7);
    expect(eventLog).toContainEqual(
      expect.objectContaining({
        type: "HAND_PLAYED",
        hand: "Four of a Kind",
        baseChips: 60,
        baseMult: 7,
      }),
    );
  });

  it("detects a full house", () => {
    const hand = parseCards(["9H", "9D", "9C", "8S", "8H"]);
    const [chips, mult, eventLog] = resolveScore(hand, BASIC_HANDS, [], {});

    expect(chips).toBe(83);
    expect(mult).toBe(4);
    expect(eventLog).toContainEqual(
      expect.objectContaining({
        type: "HAND_PLAYED",
        hand: "Full House",
        baseChips: 40,
        baseMult: 4,
      }),
    );
  });

  it("detects a flush", () => {
    const hand = parseCards(["9H", "8H", "7H", "6H", "4H"]);
    const [chips, mult, eventLog] = resolveScore(hand, BASIC_HANDS, [], {});

    expect(chips).toBe(69);
    expect(mult).toBe(4);
    expect(eventLog).toContainEqual(
      expect.objectContaining({
        type: "HAND_PLAYED",
        hand: "Flush",
        baseChips: 35,
        baseMult: 4,
      }),
    );
  });

  it("detects a straight", () => {
    const hand = parseCards(["9H", "8D", "7C", "6S", "5H"]);
    const [chips, mult, eventLog] = resolveScore(hand, BASIC_HANDS, [], {});

    expect(chips).toBe(65);
    expect(mult).toBe(4);
    expect(eventLog).toContainEqual(
      expect.objectContaining({
        type: "HAND_PLAYED",
        hand: "Straight",
        baseChips: 30,
        baseMult: 4,
      }),
    );
  });

  it("detects three of a kind", () => {
    const hand = parseCards(["9H", "9D", "9C", "6S", "5H"]);
    const [chips, mult, eventLog] = resolveScore(hand, BASIC_HANDS, [], {});

    expect(chips).toBe(57);
    expect(mult).toBe(3);
    expect(eventLog).toContainEqual(
      expect.objectContaining({
        type: "HAND_PLAYED",
        hand: "Three of a Kind",
        baseChips: 30,
        baseMult: 3,
      }),
    );
  });

  it("detects two pair", () => {
    const hand = parseCards(["9H", "9D", "8C", "8S", "5H"]);
    const [chips, mult, eventLog] = resolveScore(hand, BASIC_HANDS, [], {});

    expect(chips).toBe(54);
    expect(mult).toBe(2);
    expect(eventLog).toContainEqual(
      expect.objectContaining({
        type: "HAND_PLAYED",
        hand: "Two Pair",
        baseChips: 20,
        baseMult: 2,
      }),
    );
  });

  it("detects a pair", () => {
    const hand = parseCards(["5H", "5D", "KC", "QS", "JH"]);
    const [chips, mult, eventLog] = resolveScore(hand, BASIC_HANDS, [], {});

    expect(chips).toBe(20);
    expect(mult).toBe(2);
    expect(eventLog).toContainEqual(
      expect.objectContaining({
        type: "HAND_PLAYED",
        hand: "Pair",
        baseChips: 10,
        baseMult: 2,
      }),
    );
  });

  it("detects a high card", () => {
    const hand = parseCards(["9H", "8D", "7C", "6S", "4H"]);
    const [chips, mult, eventLog] = resolveScore(hand, BASIC_HANDS, [], {});

    expect(chips).toBe(14);
    expect(mult).toBe(1);
    expect(eventLog).toContainEqual(
      expect.objectContaining({
        type: "HAND_PLAYED",
        hand: "High Card",
        baseChips: 5,
        baseMult: 1,
      }),
    );
  });

  it("returns 0 chips and 0 mult when no hand is detected", () => {
    const hand = parseCards([]);
    const [chips, mult, eventLog] = resolveScore(hand, BASIC_HANDS, [], {});

    expect(chips).toBe(0);
    expect(mult).toBe(0);
    expect(eventLog).toEqual([]);
  });
});
