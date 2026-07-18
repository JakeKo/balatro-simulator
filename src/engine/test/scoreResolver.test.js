import { resolveScore, resolveSequenceTree } from "../scoreResolver.js";
import { parseCards, expectEventLogContains } from "./utils.js";
import {
  JOKERS,
  FULL_JOKERS,
  BASIC_HANDS,
  HANDS,
  EVENT_TYPES,
  SUITS,
  handPlayed,
  jokerScored,
} from "../../constants.js";

/*
  HANDS - UNIT TESTS
*/
describe("scoreResolver handling different hands", () => {
  it("handles a custom hand map", () => {
    const hand = parseCards(["AH", "KH", "QH", "JH", "10H"]);
    const customHandMap = { ...BASIC_HANDS, [HANDS.ROYAL_FLUSH]: [200, 10] };
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, customHandMap, [], {}),
    );

    expect(chips).toBe(251); // 200 (royal flush) + 51 (hand)
    expect(mult).toBe(10); // 10 (royal flush)
    expectEventLogContains(eventLog, handPlayed(HANDS.ROYAL_FLUSH, 200, 10));
  });

  it("detects a royal flush", () => {
    const hand = parseCards(["AH", "KH", "QH", "JH", "10H"]);
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, BASIC_HANDS, [], {}),
    );

    expect(chips).toBe(151); // 100 (royal flush) + 51 (hand)
    expect(mult).toBe(8); // 8 (royal flush)
    expectEventLogContains(eventLog, handPlayed(HANDS.ROYAL_FLUSH, 100, 8));
  });

  it("detects a straight flush", () => {
    const hand = parseCards(["9H", "8H", "7H", "6H", "5H"]);
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, BASIC_HANDS, [], {}),
    );

    expect(chips).toBe(135);
    expect(mult).toBe(8);
    expectEventLogContains(eventLog, handPlayed(HANDS.STRAIGHT_FLUSH, 100, 8));
  });

  it("detects four of a kind", () => {
    const hand = parseCards(["9H", "9D", "9C", "9S", "5H"]);
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, BASIC_HANDS, [], {}),
    );

    expect(chips).toBe(96);
    expect(mult).toBe(7);
    expectEventLogContains(eventLog, handPlayed(HANDS.FOUR_OF_A_KIND, 60, 7));
  });

  it("detects a full house", () => {
    const hand = parseCards(["9H", "9D", "9C", "8S", "8H"]);
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, BASIC_HANDS, [], {}),
    );

    expect(chips).toBe(83);
    expect(mult).toBe(4);
    expectEventLogContains(eventLog, handPlayed(HANDS.FULL_HOUSE, 40, 4));
  });

  it("detects a flush", () => {
    const hand = parseCards(["9H", "8H", "7H", "6H", "4H"]);
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, BASIC_HANDS, [], {}),
    );

    expect(chips).toBe(69);
    expect(mult).toBe(4);
    expectEventLogContains(eventLog, handPlayed(HANDS.FLUSH, 35, 4));
  });

  it("detects a straight", () => {
    const hand = parseCards(["9H", "8D", "7C", "6S", "5H"]);
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, BASIC_HANDS, [], {}),
    );

    expect(chips).toBe(65);
    expect(mult).toBe(4);
    expectEventLogContains(eventLog, handPlayed(HANDS.STRAIGHT, 30, 4));
  });

  it("detects three of a kind", () => {
    const hand = parseCards(["9H", "9D", "9C", "6S", "5H"]);
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, BASIC_HANDS, [], {}),
    );

    expect(chips).toBe(57);
    expect(mult).toBe(3);
    expectEventLogContains(eventLog, handPlayed(HANDS.THREE_OF_A_KIND, 30, 3));
  });

  it("detects two pair", () => {
    const hand = parseCards(["9H", "9D", "8C", "8S", "5H"]);
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, BASIC_HANDS, [], {}),
    );

    expect(chips).toBe(54);
    expect(mult).toBe(2);
    expectEventLogContains(eventLog, handPlayed(HANDS.TWO_PAIR, 20, 2));
  });

  it("detects a pair", () => {
    const hand = parseCards(["5H", "5D", "KC", "QS", "JH"]);
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, BASIC_HANDS, [], {}),
    );

    expect(chips).toBe(20);
    expect(mult).toBe(2);
    expectEventLogContains(eventLog, handPlayed(HANDS.PAIR, 10, 2));
  });

  it("detects a high card", () => {
    const hand = parseCards(["9H", "8D", "7C", "6S", "4H"]);
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, BASIC_HANDS, [], {}),
    );

    expect(chips).toBe(14);
    expect(mult).toBe(1);
    expectEventLogContains(eventLog, handPlayed(HANDS.HIGH_CARD, 5, 1));
  });

  it("returns 0 chips and 0 mult when no hand is detected", () => {
    const hand = parseCards([]);
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, BASIC_HANDS, [], {}),
    );

    expect(chips).toBe(0);
    expect(mult).toBe(0);
    expect(eventLog).toEqual([]);
  });
});

/*
  CARD MODIFIERS - UNIT TESTS
*/
describe("scoreResolver - Card Modifiers", () => {
  it("Bonus Card", () => {
    const hand = parseCards(["9HBXX"]);
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, BASIC_HANDS, [], {}),
    );

    expect(chips).toBe(44); // 5 (high card) + 9 (hand) + 30 (bonus card)
    expect(mult).toBe(1); // 1 (high card)
  });

  it("Mult Card", () => {
    const hand = parseCards(["9HMXX"]);
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, BASIC_HANDS, [], {}),
    );

    expect(chips).toBe(14); // 5 (high card) + 9 (hand)
    expect(mult).toBe(5); // 1 (high card) + 4 (mult card)
  });

  it("Glass Card", () => {
    const hand = parseCards(["9HGXX"]);
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, BASIC_HANDS, [], {}),
    );

    expect(chips).toBe(14); // 5 (high card) + 9 (hand)
    expect(mult).toBe(2); // 1 (high card) * 2 (glass card)
  });

  it("Stone Card", () => {
    const hand = parseCards(["9HOXX"]);
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, BASIC_HANDS, [], {}),
    );

    expect(chips).toBe(55); // 5 (high card) + 50 (hand + stone)
    expect(mult).toBe(1); // 1 (high card)
  });

  it("Lucky Card", () => {
    const hand = parseCards(["9HLXX"]);
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, BASIC_HANDS, [], {}),
    );

    expect(chips).toBe(14); // 5 (high card) + 9 (hand)
    expect(mult).toBe(21); // 1 (high card) + 20 (lucky card)
  });

  it("Foil", () => {
    const hand = parseCards(["9HXFX"]);
    const [chips, mult, eventLog] = resolveScore(
      resolveSequenceTree(hand, BASIC_HANDS, [], {}),
    );

    expect(chips).toBe(64); // 5 (high card) + 59 (hand)
    expect(mult).toBe(1); // 1 (high card)
  });
});

/*
 JOKERS - UNIT AND INTEGRATION TESTS
*/
describe("scoreResolver handling different jokers", () => {
  describe("Abstract Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.ABSTRACT_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(4); // 1 (high card) + 3 (abstract joker)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 3, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [
        FULL_JOKERS.ABSTRACT_JOKER(),
        FULL_JOKERS.ABSTRACT_JOKER(),
      ];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(13); // 1 (high card) + 6 (abstract joker) + 6 (abstract joker)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 6, 0),
        jokerScored(jokers[1], 0, 6, 0),
      );
    });
  });

  describe("Acrobat", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.ACROBAT()];
      jokers[0].metadata.finalHand = true;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(3); // 1 (high card) * 3 (acrobat)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 3));
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.ACROBAT(), FULL_JOKERS.ACROBAT()];
      jokers[0].metadata.finalHand = true;
      jokers[1].metadata.finalHand = true;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(9); // 1 (high card) * 3 (acrobat) * 3 (acrobat)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 0, 3),
        jokerScored(jokers[1], 0, 0, 3),
      );
    });

    it("Not final hand", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.ACROBAT()];
      jokers[0].metadata.finalHand = false;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Ancient Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.ANCIENT_JOKER()];
      jokers[0].metadata.suit = SUITS.HEARTS;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1.5); // 1 (high card) * 1.5 (ancient joker)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 1.5));
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.ANCIENT_JOKER(), FULL_JOKERS.ANCIENT_JOKER()];
      jokers[0].metadata.suit = SUITS.HEARTS;
      jokers[1].metadata.suit = SUITS.HEARTS;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(2.25); // 1 (high card) * 1.5 (ancient joker) * 1.5 (ancient joker)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 0, 1.5),
        jokerScored(jokers[1], 0, 0, 1.5),
      );
    });
  });

  describe("Arrowhead", () => {
    it("Single", () => {
      const hand = parseCards(["2S"]);
      const jokers = [FULL_JOKERS.ARROWHEAD()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(57); // 5 (high card) + 2 (hand) + 50 (arrowhead)
      expect(mult).toBe(1); // 1 (high card)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 50, 0, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2DW"]);
      const jokers = [FULL_JOKERS.ARROWHEAD(), FULL_JOKERS.ARROWHEAD()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(107); // 5 (high card) + 2 (hand) + 50 (arrowhead) + 50 (arrowhead)
      expect(mult).toBe(1); // 1 (high card)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 50, 0, 0),
        jokerScored(jokers[1], 50, 0, 0),
      );
    });
  });

  describe("Banner", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.BANNER()];
      jokers[0].metadata.remainingDiscards = 1;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(37); // 5 (high card) + 2 (hand) + 30 (banner)
      expect(mult).toBe(1); // 1 (high card)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 30, 0, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.BANNER(), FULL_JOKERS.BANNER()];
      jokers[0].metadata.remainingDiscards = 1;
      jokers[1].metadata.remainingDiscards = 1;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(67); // 5 (high card) + 2 (hand) + 30 (banner) + 30 (banner)
      expect(mult).toBe(1); // 1 (high card)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 30, 0, 0),
        jokerScored(jokers[1], 30, 0, 0),
      );
    });

    it("No remaining discards", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.BANNER()];
      jokers[0].metadata.remainingDiscards = 0;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Baron", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.BARON()];
      jokers[0].metadata.kingsInHand = 1;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1.5); // 1 (high card) * 1.5 (baron)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 1.5));
    });

    it("Double Barons", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.BARON(), FULL_JOKERS.BARON()];
      jokers[0].metadata.kingsInHand = 1;
      jokers[1].metadata.kingsInHand = 1;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(2.25); // 1 (high card) * 1.5 (baron) * 1.5 (baron)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 1.5));
    });

    it("Double Kings", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.BARON()];
      jokers[0].metadata.kingsInHand = 2;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(2.25); // 1 (high card) * 2.25 (baron)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 2.25));
    });

    it("No kings in Hand", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.BARON()];
      jokers[0].metadata.kingsInHand = 0;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Blackboard", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.BLACKBOARD()];
      jokers[0].metadata.allSpadesClubsInHand = true;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(3); // 1 (high card) * 3 (blackboard)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 3));
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.BLACKBOARD(), FULL_JOKERS.BLACKBOARD()];
      jokers[0].metadata.allSpadesClubsInHand = true;
      jokers[1].metadata.allSpadesClubsInHand = true;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(9); // 1 (high card) * 3 (blackboard) * 3 (blackboard)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 3));
    });

    it("Not all spades or clubs in hand", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.BLACKBOARD()];
      jokers[0].metadata.allSpadesClubsInHand = false;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Blue Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.BLUE_JOKER()];
      jokers[0].metadata.remainingCardsInDeck = 10;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(27); // 5 (high card) + 2 (hand) + 20 (blue joker)
      expect(mult).toBe(1); // 1 (high card)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 20, 0, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.BLUE_JOKER(), FULL_JOKERS.BLUE_JOKER()];
      jokers[0].metadata.remainingCardsInDeck = 10;
      jokers[1].metadata.remainingCardsInDeck = 10;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(47); // 5 (high card) + 2 (hand) + 20 (blue joker) + 20 (blue joker)
      expect(mult).toBe(1); // 1 (high card)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 20, 0, 0),
        jokerScored(jokers[1], 20, 0, 0),
      );
    });

    it("No remaining cards in deck", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.BLUE_JOKER()];
      jokers[0].metadata.remainingCardsInDeck = 0;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Cavendish", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.CAVENDISH()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(3); // 1 (high card) * 3 (cavendish)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 3));
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.CAVENDISH(), FULL_JOKERS.CAVENDISH()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(9); // 1 (high card) * 3 (cavendish) * 3 (cavendish)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 0, 3),
        jokerScored(jokers[1], 0, 0, 3),
      );
    });
  });

  describe("Clever Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2H", "2D", "3H", "3D"]);
      const jokers = [FULL_JOKERS.CLEVER_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(110); // 20 (two pair) + 10 (hand) + 80 (clever joker)
      expect(mult).toBe(2); // 2 (two pair)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 80, 0, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2H", "2D", "3H", "3D"]);
      const jokers = [FULL_JOKERS.CLEVER_JOKER(), FULL_JOKERS.CLEVER_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(190); // 20 (two pair) + 10 (hand) + 80 (clever joker) + 80 (clever joker)
      expect(mult).toBe(2); // 2 (two pair)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 80, 0, 0),
        jokerScored(jokers[1], 80, 0, 0),
      );
    });

    it("Not a two pair", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.CLEVER_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Crafty Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2D", "4D", "6D", "8D", "10D"]);
      const jokers = [FULL_JOKERS.CRAFTY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(145); // 35 (flush) + 30 (hand) + 80 (crafty joker)
      expect(mult).toBe(4); // 4 (flush)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 80, 0, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2D", "4D", "6D", "8D", "10D"]);
      const jokers = [FULL_JOKERS.CRAFTY_JOKER(), FULL_JOKERS.CRAFTY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(225); // 35 (flush) + 30c (hand) + 80 (crafty joker) + 80 (crafty joker)
      expect(mult).toBe(4); // 4 (flush)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 80, 0, 0),
        jokerScored(jokers[1], 80, 0, 0),
      );
    });

    it("Not a flush", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.CRAFTY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Crazy Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2D", "3D", "4S", "5D", "6D"]);
      const jokers = [FULL_JOKERS.CRAZY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(50); // 30 (straight) + 20 (hand)
      expect(mult).toBe(16); // 4 (straight) + 12 (crazy joker)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 12, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2D", "3D", "4S", "5D", "6D"]);
      const jokers = [FULL_JOKERS.CRAZY_JOKER(), FULL_JOKERS.CRAZY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(50); // 30 (straight) + 20 (hand)
      expect(mult).toBe(28); // 4 (straight) + 12 (crazy joker) + 12 (crazy joker)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 12, 0));
    });

    it("Not a straight", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.CRAZY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Devious Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2D", "3D", "4S", "5D", "6D"]);
      const jokers = [FULL_JOKERS.DEVIOUS_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(150); // 30 (straight) + 20 (hand) + 100 (devious joker)
      expect(mult).toBe(4); // 4 (straight)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 100, 0, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2D", "3D", "4S", "5D", "6D"]);
      const jokers = [FULL_JOKERS.DEVIOUS_JOKER(), FULL_JOKERS.DEVIOUS_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(250); // 30 (straight) + 20 (hand) + 100 (devious joker) + 100 (devious joker)
      expect(mult).toBe(4); // 4 (straight)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 100, 0, 0),
        jokerScored(jokers[1], 100, 0, 0),
      );
    });

    it("Not a straight", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.DEVIOUS_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Droll Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2D", "4D", "6D", "8D", "10D"]);
      const jokers = [FULL_JOKERS.DROLL_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(65); // 35 (flush) + 30 (hand)
      expect(mult).toBe(14); // 4 (flush) + 10 (droll joker)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 10, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2D", "4D", "6D", "8D", "10D"]);
      const jokers = [FULL_JOKERS.DROLL_JOKER(), FULL_JOKERS.DROLL_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(65); // 35 (flush) + 30 (hand)
      expect(mult).toBe(24); // 4 (flush) + 10 (droll joker) + 10 (droll joker)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 10, 0),
        jokerScored(jokers[1], 0, 10, 0),
      );
    });

    it("Not a flush", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.DROLL_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Even Steven", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.EVEN_STEVEN()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(5); // 1 (high card) + 4 (even steven)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 4, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.EVEN_STEVEN(), FULL_JOKERS.EVEN_STEVEN()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(9); // 1 (high card) + 4 (even steven) + 4 (even steven)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 4, 0),
        jokerScored(jokers[1], 0, 4, 0),
      );
    });

    it("No even ranks", () => {
      const hand = parseCards(["3H"]);
      const jokers = [FULL_JOKERS.EVEN_STEVEN()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(8); // 5 (high card) + 3 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Fortune Teller", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.FORTUNE_TELLER()];
      jokers[0].metadata.tarotCardsUsed = 5;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(6); // 1 (high card) + 5 (fortune teller)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 5, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [
        FULL_JOKERS.FORTUNE_TELLER(),
        FULL_JOKERS.FORTUNE_TELLER(),
      ];
      jokers[0].metadata.tarotCardsUsed = 5;
      jokers[1].metadata.tarotCardsUsed = 5;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(11); // 1 (high card) + 5 (fortune teller) + 5 (fortune teller)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 5, 0),
        jokerScored(jokers[1], 0, 5, 0),
      );
    });

    it("No cards used this run", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.FORTUNE_TELLER()];
      jokers[0].metadata.tarotCardsUsed = 0;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Gros Michel", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.GROS_MICHEL()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(16); // 1 (high card) + 15 (gros michel)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 15, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.GROS_MICHEL(), FULL_JOKERS.GROS_MICHEL()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(31); // 1 (high card) + 15 (gros michel) + 15 (gros michel)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 15, 0),
        jokerScored(jokers[1], 0, 15, 0),
      );
    });
  });

  describe("Half Joker", () => {
    it("Single", () => {
      const hand = parseCards(["3D", "3H", "3S"]);
      const jokers = [FULL_JOKERS.HALF_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(39); // 30 (three of a kind) + 9 (hand)
      expect(mult).toBe(23); // 3 (three of a kind) + 20 (half joker)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 20, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["3D", "3H", "3S"]);
      const jokers = [FULL_JOKERS.HALF_JOKER(), FULL_JOKERS.HALF_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(39); // 30 (three of a kind) + 9 (hand)
      expect(mult).toBe(43); // 3 (three of a kind) + 20 (half joker) + 20 (half joker)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 20, 0),
        jokerScored(jokers[1], 0, 20, 0),
      );
    });

    it("More than three cards", () => {
      const hand = parseCards(["2H", "2D", "4H", "4D"]);
      const jokers = [FULL_JOKERS.HALF_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(32); // 20 (two pair) + 12 (hand)
      expect(mult).toBe(2); // 2 (two pair)
    });
  });

  describe("Hanging Chad", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.HANGING_CHAD()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(11); // 5 (high card) + 6 (hand + hanging chad)
      expect(mult).toBe(1); // 1 (high card)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2H", "3H"]);
      const jokers = [FULL_JOKERS.HANGING_CHAD(), FULL_JOKERS.HANGING_CHAD()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(20); // 5 (high card) + 15 (hand + hanging chad + hanging chad)
      expect(mult).toBe(1); // 1 (high card)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 0));
    });

    it("Single, red seal", () => {
      const hand = parseCards(["2HXXR"]);
      const jokers = [FULL_JOKERS.HANGING_CHAD()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(13); // 5 (high card) + 8 (hand + hanging chad + red seal)
      expect(mult).toBe(1); // 1 (high card)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 0));
    });
  });

  describe("Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(5); // 1 (high card) + 4 (joker)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 4, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.JOKER(), FULL_JOKERS.JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(9); // 1 (high card) + 4 (joker) + 4 (joker)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 4, 0),
        jokerScored(jokers[1], 0, 4, 0),
      );
    });
  });

  describe("Jolly Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2D", "2H"]);
      const jokers = [FULL_JOKERS.JOLLY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(14); // 10 (pair) + 4 (hand)
      expect(mult).toBe(10); // 2 (pair) + 8 (jolly joker)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 8, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2D", "2H"]);
      const jokers = [FULL_JOKERS.JOLLY_JOKER(), FULL_JOKERS.JOLLY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(14); // 10 (pair) + 4 (hand)
      expect(mult).toBe(18); // 2 (pair) + 8 (jolly joker) + 8 (jolly joker)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 8, 0),
        jokerScored(jokers[1], 0, 8, 0),
      );
    });

    it("Not a pair", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.JOLLY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Mad Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2D", "2H", "3D", "3H"]);
      const jokers = [FULL_JOKERS.MAD_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(30); // 20 (two pair) + 10 (hand)
      expect(mult).toBe(12); // 2 (two pair) + 10 (mad joker)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 10, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2D", "2H", "3D", "3H"]);
      const jokers = [FULL_JOKERS.MAD_JOKER(), FULL_JOKERS.MAD_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(30); // 20 (two pair) + 10 (hand)
      expect(mult).toBe(22); // 2 (two pair) + 10 (mad joker) + 10 (mad joker)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 10, 0),
        jokerScored(jokers[1], 0, 10, 0),
      );
    });

    it("Not a two pair", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.MAD_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Odd Todd", () => {
    it("Single", () => {
      const hand = parseCards(["3H"]);
      const jokers = [FULL_JOKERS.ODD_TODD()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(39); // 5 (high card) + 3 (hand) + 31 (odd todd)
      expect(mult).toBe(1); // 1 (high card)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 31, 0, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["AH"]);
      const jokers = [FULL_JOKERS.ODD_TODD(), FULL_JOKERS.ODD_TODD()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(78); // 5 (high card) + 11 (hand) + 31 (odd todd) + 31 (odd todd)
      expect(mult).toBe(1); // 1 (high card)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 31, 0, 0),
        jokerScored(jokers[1], 31, 0, 0),
      );
    });

    it("No odd ranks", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.ODD_TODD()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Photograph", () => {
    it("Single", () => {
      const hand = parseCards(["JH"]);
      const jokers = [FULL_JOKERS.PHOTOGRAPH()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(15); // 5 (high card) + 10 (hand)
      expect(mult).toBe(2); // 1 (high card) * 2 (photograph)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 2));
    });

    it("Single, multiple face cards", () => {
      const hand = parseCards(["JH", "JD", "QS"]);
      const jokers = [FULL_JOKERS.PHOTOGRAPH()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(30); // 10 (pair) + 20 (hand)
      expect(mult).toBe(4); // 2 (pair) * 2 (photograph)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 2));
    });

    it("Single, Hanging Chad applied", () => {
      const hand = parseCards(["JH"]);
      const jokers = [FULL_JOKERS.PHOTOGRAPH(), FULL_JOKERS.HANGING_CHAD()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(35); // 5 (high card) + 30 (hand + hanging chad)
      expect(mult).toBe(8); // 1 (high card) * 8 (photograph + hanging chad)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 0, 2),
        jokerScored(jokers[0], 0, 0, 2),
        jokerScored(jokers[0], 0, 0, 2),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["JH"]);
      const jokers = [FULL_JOKERS.PHOTOGRAPH(), FULL_JOKERS.PHOTOGRAPH()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(15); // 5 (high card) + 10 (hand)
      expect(mult).toBe(4); // 1 (high card) * 2 (photograph) * 2 (photograph)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 0, 2),
        jokerScored(jokers[1], 0, 0, 2),
      );
    });

    it("No face cards", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.PHOTOGRAPH()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Scary Face", () => {
    it("Single", () => {
      const hand = parseCards(["JH"]);
      const jokers = [FULL_JOKERS.SCARY_FACE()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(45); // 5 (high card) + 10 (hand) + 30 (scary face)
      expect(mult).toBe(1); // 1 (high card)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 30, 0, 0));
    });

    it("Single, multiple face cards", () => {
      const hand = parseCards(["JH", "JD", "QS"]);
      const jokers = [FULL_JOKERS.SCARY_FACE()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(90); // 10 (pair) + 20 (hand) + 60 (scary face)
      expect(mult).toBe(2); // 2 (pair)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 30, 0, 0),
        jokerScored(jokers[0], 30, 0, 0),
      );
    });

    it("Single, Hanging Chad applied", () => {
      const hand = parseCards(["JH"]);
      const jokers = [FULL_JOKERS.SCARY_FACE(), FULL_JOKERS.HANGING_CHAD()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(125); // 5 (high card) + 30 (hand + hanging chad) + 90 (scary face + hanging chad)
      expect(mult).toBe(1); // 1 (high card)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 30, 0, 0),
        jokerScored(jokers[0], 30, 0, 0),
        jokerScored(jokers[0], 30, 0, 0),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["JH"]);
      const jokers = [FULL_JOKERS.SCARY_FACE(), FULL_JOKERS.SCARY_FACE()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(75); // 5 (high card) + 10 (hand) + 30 (scary face) + 30 (scary face)
      expect(mult).toBe(1); // 1 (high card)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 30, 0, 0),
        jokerScored(jokers[1], 30, 0, 0),
      );
    });

    it("No face cards", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.SCARY_FACE()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Scholar", () => {
    it("Single", () => {
      const hand = parseCards(["AH"]);
      const jokers = [FULL_JOKERS.SCHOLAR()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(36); // 5 (high card) + 11 (hand) + 20 (scholar)
      expect(mult).toBe(5); // 1 (high card) + 4 (scholar)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 20, 4, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["AH"]);
      const jokers = [FULL_JOKERS.SCHOLAR(), FULL_JOKERS.SCHOLAR()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(56); // 5 (high card) + 11 (hand) + 20 (scholar) + 20 (scholar)
      expect(mult).toBe(9); // 1 (high card) + 4 (scholar) + 4 (scholar)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 20, 4, 0),
        jokerScored(jokers[1], 20, 4, 0),
      );
    });

    it("No aces", () => {
      const hand = parseCards(["3H"]);
      const jokers = [FULL_JOKERS.SCHOLAR()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(8); // 5 (high card) + 3 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Sly Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2D", "2H", "3D", "3H"]);
      const jokers = [FULL_JOKERS.SLY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(80); // 20 (two pair) + 10 (hand) + 50 (sly joker)
      expect(mult).toBe(2); // 2 (two pair)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 50, 0, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2D", "2H", "3D", "3H"]);
      const jokers = [FULL_JOKERS.SLY_JOKER(), FULL_JOKERS.SLY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(130); // 20 (two pair) + 10 (hand) + 50 (sly joker) + 50 (sly joker)
      expect(mult).toBe(2); // 2 (two pair)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 50, 0, 0),
        jokerScored(jokers[1], 50, 0, 0),
      );
    });

    it("Not a pair", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.SLY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Smiley Face", () => {
    it("Single", () => {
      const hand = parseCards(["JH"]);
      const jokers = [FULL_JOKERS.SMILEY_FACE()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(15); // 5 (high card) + 10 (hand)
      expect(mult).toBe(6); // 1 (high card) + 5 (smiley face)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 5, 0));
    });

    it("Single, multiple face cards", () => {
      const hand = parseCards(["JH", "JD", "QS"]);
      const jokers = [FULL_JOKERS.SMILEY_FACE()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(30); // 10 (pair) + 20 (hand)
      expect(mult).toBe(12); // 2 (pair) + 10 (smiley face)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 5, 0),
        jokerScored(jokers[0], 0, 5, 0),
      );
    });

    it("Single, Hanging Chad applied", () => {
      const hand = parseCards(["JH"]);
      const jokers = [FULL_JOKERS.SMILEY_FACE(), FULL_JOKERS.HANGING_CHAD()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(35); // 5 (high card) + 30 (hand + hanging chad)
      expect(mult).toBe(16); // 1 (high card) + 15 (smiley face + hanging chad)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 5, 0),
        jokerScored(jokers[0], 0, 5, 0),
        jokerScored(jokers[0], 0, 5, 0),
      );
    });

    it("Multiple", () => {
      const hand = parseCards(["JH"]);
      const jokers = [FULL_JOKERS.SMILEY_FACE(), FULL_JOKERS.SMILEY_FACE()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(15); // 5 (high card) + 10 (hand)
      expect(mult).toBe(11); // 1 (high card) + 5 (smiley face) + 5 (smiley face)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 5, 0),
        jokerScored(jokers[1], 0, 5, 0),
      );
    });

    it("No face cards", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.SMILEY_FACE()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("The Order", () => {
    it("Single", () => {
      const hand = parseCards(["2H", "3H", "4D", "5H", "6H"]);
      const jokers = [FULL_JOKERS.THE_ORDER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(50); // 30 (straight) + 20 (hand)
      expect(mult).toBe(12); // 4 (straight) * 3 (the order)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 3));
    });

    it("Multiple", () => {
      const hand = parseCards(["2H", "3H", "4D", "5H", "6H"]);
      const jokers = [FULL_JOKERS.THE_ORDER(), FULL_JOKERS.THE_ORDER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(50); // 30 (straight) + 20 (hand)
      expect(mult).toBe(36); // 4 (straight) * 3 (the order) * 3 (the order)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 0, 3),
        jokerScored(jokers[1], 0, 0, 3),
      );
    });
  });

  describe("The Tribe", () => {
    it("Single", () => {
      const hand = parseCards(["2H", "4H", "6H", "8H", "10H"]);
      const jokers = [FULL_JOKERS.THE_TRIBE()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(65); // 35 (flush) + 30 (hand)
      expect(mult).toBe(8); // 4 (flush) * 2 (the tribe)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 2));
    });

    it("Multiple", () => {
      const hand = parseCards(["2H", "4H", "6H", "8H", "10H"]);
      const jokers = [FULL_JOKERS.THE_TRIBE(), FULL_JOKERS.THE_TRIBE()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(65); // 35 (flush) + 30 (hand)
      expect(mult).toBe(16); // 4 (flush) * 2 (the tribe) * 2 (the tribe)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 0, 2),
        jokerScored(jokers[1], 0, 0, 2),
      );
    });
  });

  describe("The Trio", () => {
    it("Single", () => {
      const hand = parseCards(["QH", "QS", "QD"]);
      const jokers = [FULL_JOKERS.THE_TRIO()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(60); // 30 (three of a kind) + 30 (hand)
      expect(mult).toBe(9); // 3 (three of a kind) * 3 (the trio)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 3));
    });

    it("Multiple", () => {
      const hand = parseCards(["QH", "QS", "QD"]);
      const jokers = [FULL_JOKERS.THE_TRIO(), FULL_JOKERS.THE_TRIO()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(60); // 30 (three of a kind) + 30 (hand)
      expect(mult).toBe(27); // 3 (three of a kind) * 3 (the trio) * 3 (the trio)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 0, 3),
        jokerScored(jokers[1], 0, 0, 3),
      );
    });
  });

  describe("Throwback", () => {
    it("Single", () => {
      const hand = parseCards(["QH"]);
      const jokers = [FULL_JOKERS.THROWBACK()];
      jokers[0].metadata.blindsSkipped = 2;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(15); // 5 (high card) + 10 (hand)
      expect(mult).toBe(1.5); // 1 (high card) * 1.5 (throwback)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 1.5));
    });

    it("Multiple", () => {
      const hand = parseCards(["QH"]);
      const jokers = [FULL_JOKERS.THROWBACK(), FULL_JOKERS.THROWBACK()];
      jokers[0].metadata.blindsSkipped = 2;
      jokers[1].metadata.blindsSkipped = 2;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(15); // 5 (high card) + 10 (hand)
      expect(mult).toBe(2.25); // 1 (high card) * 1.5 (throwback) * 1.5 (throwback)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 0, 1.5),
        jokerScored(jokers[1], 0, 0, 1.5),
      );
    });
  });

  describe("Triboulet", () => {
    it("Single", () => {
      const hand = parseCards(["QH"]);
      const jokers = [FULL_JOKERS.TRIBOULET()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(15); // 5 (high card) + 10 (hand)
      expect(mult).toBe(2); // 1 (high card) * 2 (triboulet)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 2));
    });

    it("Multiple", () => {
      const hand = parseCards(["QH"]);
      const jokers = [FULL_JOKERS.TRIBOULET(), FULL_JOKERS.TRIBOULET()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(15); // 5 (high card) + 10 (hand)
      expect(mult).toBe(4); // 1 (high card) * 2 (triboulet) * 2 (triboulet)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 0, 2),
        jokerScored(jokers[1], 0, 0, 2),
      );
    });
  });

  describe("Walkie Talkie", () => {
    it("Single", () => {
      const hand = parseCards(["10H", "10D", "4H", "4D"]);
      const jokers = [FULL_JOKERS.WALKIE_TALKIE()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(88); // 20 (two pair) + 28 (hand) + 40 (walkie talkie)
      expect(mult).toBe(18); // 2 (two pair) + 16 (walkie talkie)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 10, 4, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["10H", "10D", "4H", "4D"]);
      const jokers = [FULL_JOKERS.WALKIE_TALKIE(), FULL_JOKERS.WALKIE_TALKIE()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(128); // 20 (two pair) + 28 (hand) + 40 (walkie talkie) + 40 (walkie talkie)
      expect(mult).toBe(34); // 2 (two pair) + 16 (walkie talkie) + 16 (walkie talkie)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 10, 4, 0),
        jokerScored(jokers[1], 10, 4, 0),
      );
    });

    it("No 10s or 4s", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.WALKIE_TALKIE()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Wee Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.WEE_JOKER()];
      jokers[0].metadata.extraChipsBase = 8;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(23); // 5 (high card) + 2 (hand) + 16 (wee joker)
      expect(mult).toBe(1); // 1 (high card)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 16, 0, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.WEE_JOKER(), FULL_JOKERS.WEE_JOKER()];
      jokers[0].metadata.extraChipsBase = 0;
      jokers[1].metadata.extraChipsBase = 8;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(31); // 5 (high card) + 2 (hand) + 8 (wee joker) + 16 (wee joker)
      expect(mult).toBe(1); // 1 (high card)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 8, 0, 0),
        jokerScored(jokers[1], 16, 0, 0),
      );
    });
  });

  describe("Wily Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2D", "2H", "2S"]);
      const jokers = [FULL_JOKERS.WILY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(136); // 30 (three of a kind) + 6 (hand) + 100 (wily joker)
      expect(mult).toBe(3); // 3 (three of a kind)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 100, 0, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2D", "2H", "2S"]);
      const jokers = [FULL_JOKERS.WILY_JOKER(), FULL_JOKERS.WILY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(236); // 30 (three of a kind) + 6 (hand) + 100 (wily joker) + 100 (wily joker)
      expect(mult).toBe(3); // 3 (three of a kind)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 100, 0, 0),
        jokerScored(jokers[1], 100, 0, 0),
      );
    });

    it("Not a three of a kind", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.WILY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Wrathful Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2S"]);
      const jokers = [FULL_JOKERS.WRATHFUL_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(4); // 1 (high card) + 3 (wrathful joker)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 3, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2S"]);
      const jokers = [
        FULL_JOKERS.WRATHFUL_JOKER(),
        FULL_JOKERS.WRATHFUL_JOKER(),
      ];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(7); // 1 (high card) + 3 (wrathful joker) + 3 (wrathful joker)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 3, 0),
        jokerScored(jokers[1], 0, 3, 0),
      );
    });

    it("No spades", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.WRATHFUL_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });

  describe("Yorick", () => {
    it("Single", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.YORICK()];
      jokers[0].metadata.cardsDiscarded = 23;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(2); // 1 (high card) * 2 (yorick)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 0, 2));
    });

    it("Multiple", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.YORICK(), FULL_JOKERS.YORICK()];
      jokers[0].metadata.cardsDiscarded = 23;
      jokers[1].metadata.cardsDiscarded = 23;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(4); // 1 (high card) * 2 (yorick) * 2 (yorick)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 0, 2),
        jokerScored(jokers[1], 0, 0, 2),
      );
    });

    it("Not enough cards discarded", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.ZANY_JOKER()];
      jokers[0].metadata.cardsDiscarded = 22;
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card) * 1 (yorick)
    });
  });

  describe("Zany Joker", () => {
    it("Single", () => {
      const hand = parseCards(["2D", "2H", "2S"]);
      const jokers = [FULL_JOKERS.ZANY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(36); // 30 (three of a kind) + 6 (hand)
      expect(mult).toBe(15); // 3 (three of a kind) + 12 (zany joker)
      expectEventLogContains(eventLog, jokerScored(jokers[0], 0, 12, 0));
    });

    it("Multiple", () => {
      const hand = parseCards(["2D", "2H", "2S"]);
      const jokers = [FULL_JOKERS.ZANY_JOKER(), FULL_JOKERS.ZANY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(36); // 30 (three of a kind) + 6 (hand)
      expect(mult).toBe(27); // 3 (three of a kind) + 12 (zany joker) + 12 (zany joker)
      expectEventLogContains(
        eventLog,
        jokerScored(jokers[0], 0, 12, 0),
        jokerScored(jokers[1], 0, 12, 0),
      );
    });

    it("Not a three of a kind", () => {
      const hand = parseCards(["2H"]);
      const jokers = [FULL_JOKERS.ZANY_JOKER()];
      const [chips, mult, eventLog] = resolveScore(
        resolveSequenceTree(hand, BASIC_HANDS, jokers),
      );

      expect(chips).toBe(7); // 5 (high card) + 2 (hand)
      expect(mult).toBe(1); // 1 (high card)
    });
  });
});
