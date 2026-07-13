import { resolveScore } from "../scoreResolver.js";
import { parseCards } from "./utils.js";
import { JOKERS, BASIC_HANDS, HANDS, EVENT_TYPES } from "../../constants.js";

/*
  HANDS - UNIT TESTS
*/
describe("scoreResolver handling different hands", () => {
  it("handles a custom hand map", () => {
    const hand = parseCards(["AH", "KH", "QH", "JH", "10H"]);
    const customHandMap = { ...BASIC_HANDS, [HANDS.ROYAL_FLUSH]: [200, 10] };
    const [chips, mult, eventLog] = resolveScore(hand, customHandMap, [], {});

    expect(chips).toBe(254);
    expect(mult).toBe(10);
    expect(eventLog).toContainEqual(
      expect.objectContaining({
        type: EVENT_TYPES.HAND_PLAYED,
        hand: HANDS.ROYAL_FLUSH,
        baseChips: 200,
        baseMult: 10,
      }),
    );
  });

  it("detects a royal flush", () => {
    const hand = parseCards(["AH", "KH", "QH", "JH", "10H"]);
    const [chips, mult, eventLog] = resolveScore(hand, BASIC_HANDS, [], {});

    expect(chips).toBe(154);
    expect(mult).toBe(8);
    expect(eventLog).toContainEqual(
      expect.objectContaining({
        type: EVENT_TYPES.HAND_PLAYED,
        hand: HANDS.ROYAL_FLUSH,
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
        type: EVENT_TYPES.HAND_PLAYED,
        hand: HANDS.STRAIGHT_FLUSH,
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
        type: EVENT_TYPES.HAND_PLAYED,
        hand: HANDS.FOUR_OF_A_KIND,
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
        type: EVENT_TYPES.HAND_PLAYED,
        hand: HANDS.FULL_HOUSE,
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
        type: EVENT_TYPES.HAND_PLAYED,
        hand: HANDS.FLUSH,
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
        type: EVENT_TYPES.HAND_PLAYED,
        hand: HANDS.STRAIGHT,
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
        type: EVENT_TYPES.HAND_PLAYED,
        hand: HANDS.THREE_OF_A_KIND,
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
        type: EVENT_TYPES.HAND_PLAYED,
        hand: HANDS.TWO_PAIR,
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
        type: EVENT_TYPES.HAND_PLAYED,
        hand: HANDS.PAIR,
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
        type: EVENT_TYPES.HAND_PLAYED,
        hand: HANDS.HIGH_CARD,
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

/*
 JOKERS - UNIT AND INTEGRATION TESTS
*/
describe("scoreResolver handling different jokers", () => {
  describe("Abstract Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.ABSTRACT_JOKER];
      const metadata = { jokerCount: 1 };
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        metadata,
      );

      expect(chips).toBe(7); // 5c (high card) + 2c (2H)
      expect(mult).toBe(4); // 1m (high card) + 3m (abstract joker)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.ABSTRACT_JOKER,
          addMult: 3,
        }),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.ABSTRACT_JOKER, JOKERS.ABSTRACT_JOKER];
      const metadata = { jokerCount: 2 };
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        metadata,
      );

      expect(chips).toBe(7); // 5c (high card) + 2c (2H)
      expect(mult).toBe(13); // 1m (high card) + 6m (abstract joker) + 6m (abstract joker)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.ABSTRACT_JOKER,
          addMult: 6,
        }),
      );
    });
  });

  describe("Acrobat", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.ACROBAT];
      const metadata = { finalHand: true };
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        metadata,
      );

      expect(chips).toBe(7); // 5c (high card) + 2c (2H)
      expect(mult).toBe(3); // 1m (high card) * 3m (acrobat)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.ACROBAT,
          multMult: 3,
        }),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.ACROBAT, JOKERS.ACROBAT];
      const metadata = { finalHand: true };
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        metadata,
      );

      expect(chips).toBe(7); // 5c (high card) + 2c (2H)
      expect(mult).toBe(9); // 1m (high card) * 3m (acrobat) * 3m (acrobat)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.ACROBAT,
          multMult: 3,
        }),
      );
    });

    it("Not final hand", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.ACROBAT];
      const metadata = { finalHand: false };
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        metadata,
      );

      expect(chips).toBe(7); // 5c (high card) + 2c (2H)
      expect(mult).toBe(1); // 1m (high card)
      expect(eventLog).not.toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.ACROBAT,
          multMult: 3,
        }),
      );
    });
  });

  describe("Banner", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.BANNER];
      const metadata = { remainingDiscards: 1 };
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        metadata,
      );

      expect(chips).toBe(37); // 5c (high card) + 2c (2H) + 30c (banner)
      expect(mult).toBe(1); // 1m (high card)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.BANNER,
          addChips: 30,
        }),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.BANNER, JOKERS.BANNER];
      const metadata = { remainingDiscards: 1 };
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        metadata,
      );

      expect(chips).toBe(67); // 5c (high card) + 2c (2H) + 30c (banner) + 30c (banner)
      expect(mult).toBe(1); // 1m (high card)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.BANNER,
          addChips: 30,
        }),
      );
    });

    it("No remaining discards", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.BANNER];
      const metadata = { remainingDiscards: 0 };
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        metadata,
      );

      expect(chips).toBe(7); // 5c (high card) + 2c (2H)
      expect(mult).toBe(1); // 1m (high card)
      expect(eventLog).not.toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.BANNER,
          addChips: 30,
        }),
      );
    });
  });

  describe("Blue Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.BLUE_JOKER];
      const metadata = { remainingCardsInDeck: 10 };
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        metadata,
      );

      expect(chips).toBe(27); // 5c (high card) + 2c (2H) + 20c (blue joker)
      expect(mult).toBe(1); // 1m (high card)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.BLUE_JOKER,
          addChips: 20,
        }),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.BLUE_JOKER, JOKERS.BLUE_JOKER];
      const metadata = { remainingCardsInDeck: 10 };
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        metadata,
      );

      expect(chips).toBe(47); // 5c (high card) + 2c (2H) + 20c (blue joker) + 20c (blue joker)
      expect(mult).toBe(1); // 1m (high card)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.BLUE_JOKER,
          addChips: 20,
        }),
      );
    });

    it("No remaining cards in deck", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.BLUE_JOKER];
      const metadata = { remainingCardsInDeck: 0 };
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        metadata,
      );

      expect(chips).toBe(7); // 5c (high card) + 2c (2H)
      expect(mult).toBe(1); // 1m (high card)
      expect(eventLog).not.toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.BLUE_JOKER,
          addChips: 20,
        }),
      );
    });
  });

  describe("Cavendish", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.CAVENDISH];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(7); // 5c (high card) + 2c (2H)
      expect(mult).toBe(3); // 1m (high card) * 3m (cavendish)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.CAVENDISH,
          multMult: 3,
        }),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.CAVENDISH, JOKERS.CAVENDISH];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(7); // 5c (high card) + 2c (2H)
      expect(mult).toBe(9); // 1m (high card) * 3m (cavendish) * 3m (cavendish)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.CAVENDISH,
          multMult: 3,
        }),
      );
    });
  });

  describe("Clever Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2H", "2D", "3H", "3D"]);
      const jokers = [JOKERS.CLEVER_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(110); // 20c (two pair) + 10c (hand) + 80c (clever joker)
      expect(mult).toBe(2); // 2m (two pair)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.CLEVER_JOKER,
          addChips: 80,
        }),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["2H", "2D", "3H", "3D"]);
      const jokers = [JOKERS.CLEVER_JOKER, JOKERS.CLEVER_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(190); // 20c (two pair) + 10c (hand) + 80c (clever joker) + 80c (clever joker)
      expect(mult).toBe(2); // 2m (two pair)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.CLEVER_JOKER,
          addChips: 80,
        }),
      );
    });

    it("Not a two pair", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.CLEVER_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(7); // 5c (high card) + 2c (2H)
      expect(mult).toBe(1); // 1m (high card)
      expect(eventLog).not.toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.CLEVER_JOKER,
          addChips: 80,
        }),
      );
    });
  });

  describe("Crafty Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2D", "4D", "6D", "8D", "10D"]);
      const jokers = [JOKERS.CRAFTY_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(145); // 35 (flush) + 30 (hand) + 80 (crafty joker)
      expect(mult).toBe(4); // 4 (flush)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.CRAFTY_JOKER,
          addChips: 80,
        }),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["2D", "4D", "6D", "8D", "10D"]);
      const jokers = [JOKERS.CRAFTY_JOKER, JOKERS.CRAFTY_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(225); // 35c (flush) + 30c (hand) + 80c (crafty joker) + 80c (crafty joker)
      expect(mult).toBe(4); // 4 (flush)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.CRAFTY_JOKER,
          addChips: 80,
        }),
      );
    });

    it("Not a flush", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.CRAFTY_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
      expect(eventLog).not.toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.CRAFTY_JOKER,
          addChips: 80,
        }),
      );
    });
  });

  describe("Crazy Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2D", "3D", "4S", "5D", "6D"]);
      const jokers = [JOKERS.CRAZY_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(50); // 30 (straight) + 20 (hand)
      expect(mult).toBe(16); // 4 (straight) + 12 (crazy joker)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.CRAZY_JOKER,
          addMult: 12,
        }),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["2D", "3D", "4S", "5D", "6D"]);
      const jokers = [JOKERS.CRAZY_JOKER, JOKERS.CRAZY_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(50); // 30 (straight) + 20 (hand)
      expect(mult).toBe(28); // 4 (straight) + 12 (crazy joker) + 12 (crazy joker)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.CRAZY_JOKER,
          addMult: 12,
        }),
      );
    });

    it("Not a straight", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.CRAZY_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
      expect(eventLog).not.toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.CRAZY_JOKER,
          addMult: 12,
        }),
      );
    });
  });

  describe("Devious Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2D", "3D", "4S", "5D", "6D"]);
      const jokers = [JOKERS.DEVIOUS_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(150); // 30 (straight) + 20 (hand) + 100 (devious joker)
      expect(mult).toBe(4); // 4 (straight)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.DEVIOUS_JOKER,
          addChips: 100,
        }),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["2D", "3D", "4S", "5D", "6D"]);
      const jokers = [JOKERS.DEVIOUS_JOKER, JOKERS.DEVIOUS_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(250); // 30 (straight) + 20 (hand) + 100 (devious joker) + 100 (devious joker)
      expect(mult).toBe(4); // 4 (straight)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.DEVIOUS_JOKER,
          addChips: 100,
        }),
      );
    });

    it("Not a straight", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.DEVIOUS_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
      expect(eventLog).not.toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.DEVIOUS_JOKER,
          addChips: 100,
        }),
      );
    });
  });

  describe("Droll Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2D", "4D", "6D", "8D", "10D"]);
      const jokers = [JOKERS.DROLL_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(65); // 35 (flush) + 30 (hand)
      expect(mult).toBe(14); // 4 (flush) + 10 (droll joker)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.DROLL_JOKER,
          addMult: 10,
        }),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["2D", "4D", "6D", "8D", "10D"]);
      const jokers = [JOKERS.DROLL_JOKER, JOKERS.DROLL_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(65); // 35 (flush) + 30 (hand)
      expect(mult).toBe(24); // 4 (flush) + 10 (droll joker) + 10 (droll joker)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.DROLL_JOKER,
          addMult: 10,
        }),
      );
    });

    it("Not a flush", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.DROLL_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
      expect(eventLog).not.toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.DROLL_JOKER,
          addMult: 10,
        }),
      );
    });
  });

  describe("Even Steven", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.EVEN_STEVEN];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(5); // 1 (high card) + 4 (even steven)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.EVEN_STEVEN,
          addMult: 4,
        }),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.EVEN_STEVEN, JOKERS.EVEN_STEVEN];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(9); // 1 (high card) + 4 (even steven) + 4 (even steven)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.EVEN_STEVEN,
          addMult: 4,
        }),
      );
    });

    it("No even ranks", () => {
      const hand = parseCards(["3H"]);
      const jokers = [JOKERS.EVEN_STEVEN];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(8); // 5 (high card) + 3 (hand)
      expect(mult).toBe(1); // 1 (high card)
      expect(eventLog).not.toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.EVEN_STEVEN,
          addMult: 4,
        }),
      );
    });
  });

  describe("Fortune Teller", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.FORTUNE_TELLER];
      const metadata = { cardsUsedThisRun: 5 };
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        metadata,
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(7); // 1 (high card) + 6 (fortune teller)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.FORTUNE_TELLER,
          addMult: 6,
        }),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.FORTUNE_TELLER, JOKERS.FORTUNE_TELLER];
      const metadata = { cardsUsedThisRun: 5 };
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        metadata,
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(13); // 1 (high card) + 6 (fortune teller) + 6 (fortune teller)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.FORTUNE_TELLER,
          addMult: 6,
        }),
      );
    });

    it("No cards used this run", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.FORTUNE_TELLER];
      const metadata = { cardsUsedThisRun: 0 };
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        metadata,
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(2); // 1 (high card) + 1 (fortune teller)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.FORTUNE_TELLER,
          addMult: 1,
        }),
      );
    });
  });

  describe("Gros Michel", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.GROS_MICHEL];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(16); // 1 (high card) + 15 (gros michel)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.GROS_MICHEL,
          addMult: 15,
        }),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.GROS_MICHEL, JOKERS.GROS_MICHEL];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(31); // 1 (high card) + 15 (gros michel) + 15 (gros michel)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.GROS_MICHEL,
          addMult: 15,
        }),
      );
    });
  });

  describe("Half Joker", () => {
    it("Single", () => {
      const hand = parseCards(["3D", "3H", "3S"]);
      const jokers = [JOKERS.HALF_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(39); // 30 (three of a kind) + 9 (hand)
      expect(mult).toBe(23); // 3 (three of a kind) + 20 (half joker)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.HALF_JOKER,
          addMult: 20,
        }),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["3D", "3H", "3S"]);
      const jokers = [JOKERS.HALF_JOKER, JOKERS.HALF_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(39); // 30 (three of a kind) + 9 (hand)
      expect(mult).toBe(43); // 3 (three of a kind) + 20 (half joker) + 20 (half joker)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.HALF_JOKER,
          addMult: 20,
        }),
      );
    });

    it("More than three cards", () => {
      const hand = parseCards(["2H", "2D", "4H", "4D"]);
      const jokers = [JOKERS.HALF_JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(32); // 20 (two pair) + 12 (hand)
      expect(mult).toBe(2); // 2 (two pair)
      expect(eventLog).not.toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.HALF_JOKER,
          addMult: 20,
        }),
      );
    });
  });

  describe("Hanging Chad", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.HANGING_CHAD];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(11); // 5 (high card) + 6 (hand + hanging chad)
      expect(mult).toBe(1); // 1 (high card)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.HANGING_CHAD,
        }),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["2H", "3H"]);
      const jokers = [JOKERS.HANGING_CHAD, JOKERS.HANGING_CHAD];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(20); // 5 (high card) + 15 (hand + hanging chad + hanging chad)
      expect(mult).toBe(1); // 1 (high card)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.HANGING_CHAD,
        }),
      );
    });
  });

  describe("Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(7); // 5c (high card) + 2c (2H)
      expect(mult).toBe(5); // 1m (high card) + 4m (joker)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.JOKER,
          addMult: 4,
        }),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [JOKERS.JOKER, JOKERS.JOKER];
      const [chips, mult, eventLog] = resolveScore(
        hand,
        BASIC_HANDS,
        jokers,
        {},
      );

      expect(chips).toBe(7); // 5c (high card) + 2c (2H)
      expect(mult).toBe(9); // 1m (high card) + 4m (joker) + 4m (joker)
      expect(eventLog).toContainEqual(
        expect.objectContaining({
          type: EVENT_TYPES.JOKER_SCORED,
          joker: JOKERS.JOKER,
          addMult: 4,
        }),
      );
    });
  });
});
