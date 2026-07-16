const JOKERS = {
  NONE: "None",
  // EIGHT_BALL: "8 Ball",
  ABSTRACT_JOKER: "Abstract Joker",
  ACROBAT: "Acrobat",
  ANCIENT_JOKER: "Ancient Joker",
  ARROWHEAD: "Arrowhead",
  // ASTRONOMER: "Astronomer",
  BANNER: "Banner",
  BARON: "Baron",
  // BASEBALL_CARD: "Baseball Card",
  BLACKBOARD: "Blackboard",
  // BLOODSTONE: "Bloodstone",
  BLUE_JOKER: "Blue Joker",
  // BLUEPRINT: "Blueprint",
  // BOOTSTRAPS: "Bootstraps",
  // BRAINSTORM: "Brainstorm",
  // BULL: "Bull",
  // BURGLAR: "Burglar",
  // BURNT_JOKER: "Burnt Joker",
  // BUSINESS_CARD: "Business Card",
  // CAMPFIRE: "Campfire",
  // CANIO: "Canio",
  // CARD_SHARP: "Card Sharp",
  // CARTOMANCER: "Cartomancer",
  // CASTLE: "Castle",
  CAVENDISH: "Cavendish",
  // CEREMONIAL_DAGGER: "Ceremonial Dagger",
  // CERTIFICATE: "Certificate",
  // CHAOS_THE_CLOWN: "Chaos the Clown",
  // CHICOT: "Chicot",
  CLEVER_JOKER: "Clever Joker",
  // CLOUD_9: "Cloud 9",
  // CONSTELLATION: "Constellation",
  CRAFTY_JOKER: "Crafty Joker",
  CRAZY_JOKER: "Crazy Joker",
  // CREDIT_CARD: "Credit Card",
  // DNA: "DNA",
  // DELAYED_GRATIFICATION: "Delayed Gratification",
  DEVIOUS_JOKER: "Devious Joker",
  // DIET_COLA: "Diet Cola",
  // DRIVERS_LICENSE: "Driver's License",
  DROLL_JOKER: "Droll Joker",
  // DRUNKARD: "Drunkard",
  // DUSK: "Dusk",
  // EGG: "Egg",
  // EROSION: "Erosion",
  EVEN_STEVEN: "Even Steven",
  // FACELESS_JOKER: "Faceless Joker",
  // FIBONACCI: "Fibonacci",
  // FLASH_CARD: "Flash Card",
  // FLOWER_POT: "Flower Pot",
  FORTUNE_TELLER: "Fortune Teller",
  // FOUR_FINGERS: "Four Fingers",
  // GIFT_CARD: "Gift Card",
  // GLASS_JOKER: "Glass Joker",
  // GLUTTONOUS_JOKER: "Gluttonous Joker",
  // GOLDEN_JOKER: "Golden Joker",
  // GOLDEN_TICKET: "Golden Ticket",
  // GREEDY_JOKER: "Greedy Joker",
  // GREEN_JOKER: "Green Joker",
  GROS_MICHEL: "Gros Michel",
  // HACK: "Hack",
  HALF_JOKER: "Half Joker",
  // HALLUCINATION: "Hallucination",
  HANGING_CHAD: "Hanging Chad",
  // HIKER: "Hiker",
  // HIT_THE_ROAD: "Hit the Road",
  // HOLOGRAM: "Hologram",
  // ICE_CREAM: "Ice Cream",
  // INVISIBLE_JOKER: "Invisible Joker",
  JOKER: "Joker",
  // JOKER_STENCIL: "Joker Stencil",
  JOLLY_JOKER: "Jolly Joker",
  // JUGGLER: "Juggler",
  // LOYALTY_CARD: "Loyalty Card",
  // LUCHADOR: "Luchador",
  // LUCKY_CAT: "Lucky Cat",
  // LUSTY_JOKER: "Lusty Joker",
  MAD_JOKER: "Mad Joker",
  // MADNESS: "Madness",
  // MAIL_IN_REBATE: "Mail-In Rebate",
  // MARBLE_JOKER: "Marble Joker",
  // MATADOR: "Matador",
  // MERRY_ANDY: "Merry Andy",
  // MIDAS_MASK: "Midas Mask",
  // MIME: "Mime",
  // MISPRINT: "Misprint",
  // MR_BONES: "Mr. Bones",
  // MYSTIC_SUMMIT: "Mystic Summit",
  // OBELISK: "Obelisk",
  ODD_TODD: "Odd Todd",
  // ONYX_AGATE: "Onyx Agate",
  // OOPS_ALL_6S: "Oops! All 6s",
  // PAREIDOLIA: "Pareidolia",
  // PERKEO: "Perkeo",
  PHOTOGRAPH: "Photograph",
  // POPCORN: "Popcorn",
  // RAISED_FIST: "Raised Fist",
  // RAMEN: "Ramen",
  // RED_CARD: "Red Card",
  // RESERVED_PARKING: "Reserved Parking",
  // RIDE_THE_BUS: "Ride the Bus",
  // RIFF_RAFF: "Riff-raff",
  // ROCKET: "Rocket",
  // ROUGH_GEM: "Rough Gem",
  // RUNNER: "Runner",
  // SATELLITE: "Satellite",
  SCARY_FACE: "Scary Face",
  SCHOLAR: "Scholar",
  // SEANCE: "Seance",
  // SEEING_DOUBLE: "Seeing Double",
  // SELTZER: "Seltzer",
  // SHOOT_THE_MOON: "Shoot the Moon",
  // SHORTCUT: "Shortcut",
  // SHOWMAN: "Showman",
  // SIXTH_SENSE: "Sixth Sense",
  SLY_JOKER: "Sly Joker",
  // SMEARED_JOKER: "Smeared Joker",
  SMILEY_FACE: "Smiley Face",
  // SOCK_AND_BUSKIN: "Sock and Buskin",
  // SPACE_JOKER: "Space Joker",
  // SPARE_TROUSERS: "Spare Trousers",
  // SPLASH: "Splash",
  // SQUARE_JOKER: "Square Joker",
  // STEEL_JOKER: "Steel Joker",
  // STONE_JOKER: "Stone Joker",
  // STUNTMAN: "Stuntman",
  // SUPERNOVA: "Supernova",
  // SUPERPOSITION: "Superposition",
  // SWASHBUCKLER: "Swashbuckler",
  // THE_DUO: "The Duo",
  // THE_FAMILY: "The Family",
  // THE_IDOL: "The Idol",
  THE_ORDER: "The Order",
  THE_TRIBE: "The Tribe",
  THE_TRIO: "The Trio",
  THROWBACK: "Throwback",
  // TO_DO_LIST: "To Do List",
  // TO_THE_MOON: "To the Moon",
  // TRADING_CARD: "Trading Card",
  TRIBOULET: "Triboulet",
  // TROUBADOUR: "Troubadour",
  // TURTLE_BEAN: "Turtle Bean",
  // VAGABOND: "Vagabond",
  // VAMPIRE: "Vampire",
  WALKIE_TALKIE: "Walkie Talkie",
  WEE_JOKER: "Wee Joker",
  WILY_JOKER: "Wily Joker",
  WRATHFUL_JOKER: "Wrathful Joker",
  YORICK: "Yorick",
  ZANY_JOKER: "Zany Joker",
};

const JOKERS_LIST = Object.values(JOKERS);

const RANKS = {
  14: "Ace",
  13: "King",
  12: "Queen",
  11: "Jack",
  10: "Ten",
  9: "Nine",
  8: "Eight",
  7: "Seven",
  6: "Six",
  5: "Five",
  4: "Four",
  3: "Three",
  2: "Two",
  0: "None",
};

const RANK_LIST = Object.keys(RANKS).map((rank) => parseInt(rank, 10));

const SUITS = {
  HEARTS: "Hearts",
  DIAMONDS: "Diamonds",
  CLUBS: "Clubs",
  SPADES: "Spades",
};

const SUIT_LIST = Object.values(SUITS);

// Some jokers require additional information to calculate
// E.g., Banner needs to know how many discards are remaining
// Rather than implement entire game state tracking, prompt the user to provide the hard-coded values
// The map connects a selected Joker to the metadata that needs to be gathered
const JOKER_METADATA_TEMPLATES = {
  [JOKERS.ACROBAT]: [
    {
      key: "finalHand",
      label: "Final Hand",
      type: "boolean",
      default: false,
    },
  ],
  [JOKERS.ANCIENT_JOKER]: [
    {
      key: "suit",
      label: "Suit",
      type: "suit",
      default: SUITS.HEARTS,
    },
  ],
  [JOKERS.BANNER]: [
    {
      key: "remainingDiscards",
      label: "Remaining Discards",
      type: "number",
      default: 0,
    },
  ],
  [JOKERS.BARON]: [
    {
      key: "kingsInHand",
      label: "Kings in Hand",
      type: "number",
      default: 0,
    },
  ],
  [JOKERS.BLACKBOARD]: [
    {
      key: "allSpadesClubsInHand",
      label: "All Spades/Clubs in Hand",
      type: "boolean",
      default: false,
    },
  ],
  [JOKERS.BLUE_JOKER]: [
    {
      key: "remainingCardsInDeck",
      label: "Remaining Cards in Deck",
      type: "number",
      default: 0,
    },
  ],
  [JOKERS.FORTUNE_TELLER]: [
    {
      key: "tarotCardsUsed",
      label: "Tarot Cards Used",
      type: "number",
      default: 0,
    },
  ],
  [JOKERS.THROWBACK]: [
    {
      key: "blindsSkipped",
      label: "Blinds Skipped",
      type: "number",
      default: 0,
    },
  ],
  [JOKERS.WEE_JOKER]: [
    {
      key: "extraChipsBase",
      label: "Extra Chips",
      type: "number",
      default: 0,
    },
    {
      key: "extraChipsAdded",
      default: 0,
      readonly: true,
    },
  ],
  [JOKERS.YORICK]: [
    {
      key: "cardsDiscarded",
      label: "Cards Discarded",
      type: "number",
      default: 0,
    },
  ],
};

const FULL_JOKERS = Object.entries(JOKERS).reduce((acc, [key, value]) => {
  const metadata =
    JOKER_METADATA_TEMPLATES[value]?.reduce(
      (metadata, entry) => ({ ...metadata, [entry.key]: entry.default }),
      {},
    ) || {};

  return {
    ...acc,
    [key]: () => ({
      name: value,
      edition: EDITIONS.NONE,
      seal: SEALS.NONE,
      metadata: JSON.parse(JSON.stringify(metadata)),
    }),
  };
}, {});

function fullJokerByName(jokerName) {
  const jokerKey = Object.keys(JOKERS).find((key) => JOKERS[key] === jokerName);
  return FULL_JOKERS[jokerKey]();
}

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

const HANDS = {
  FLUSH_FIVE: "Flush Five",
  FLUSH_HOUSE: "Flush House",
  FIVE_OF_A_KIND: "Five of a Kind",
  ROYAL_FLUSH: "Royal Flush",
  STRAIGHT_FLUSH: "Straight Flush",
  FOUR_OF_A_KIND: "Four of a Kind",
  FULL_HOUSE: "Full House",
  FLUSH: "Flush",
  STRAIGHT: "Straight",
  THREE_OF_A_KIND: "Three of a Kind",
  TWO_PAIR: "Two Pair",
  PAIR: "Pair",
  HIGH_CARD: "High Card",
  NONE: "No Hand",
};

const HANDS_LIST = Object.keys(BASIC_HANDS);

const EVENT_TYPES = {
  HAND_PLAYED: "Hand Played",
  CARD_SCORED: "Card Scored",
  HAND_ENDED: "Hand Ended",
  JOKER_SCORED: "Joker Scored",
};

const ENHANCEMENTS = {
  NONE: "None",
  BONUS: "Bonus",
  MULT: "Mult",
  WILD: "Wild",
  GLASS: "Glass",
  STEEL: "Steel",
  STONE: "Stone",
  GOLD: "Gold",
  LUCKY: "Lucky",
};

const EDITIONS = {
  NONE: "None",
  FOIL: "Foil",
  HOLOGRAPHIC: "Holographic",
  POLYCHROME: "Polychrome",
  NEGATIVE: "Negative",
};

const SEALS = {
  NONE: "None",
  GOLD: "Gold",
  RED: "Red",
  BLUE: "Blue",
  PURPLE: "Purple",
};

function BLANK_CARD() {
  return {
    rank: 0,
    suit: SUITS.HEARTS,
    enhancement: ENHANCEMENTS.NONE,
    edition: EDITIONS.NONE,
    seal: SEALS.NONE,
  };
}

export {
  JOKERS,
  JOKERS_LIST,
  JOKER_METADATA_TEMPLATES,
  FULL_JOKERS,
  fullJokerByName,
  RANKS,
  RANK_LIST,
  SUITS,
  SUIT_LIST,
  BASIC_HANDS,
  HANDS,
  HANDS_LIST,
  EVENT_TYPES,
  ENHANCEMENTS,
  EDITIONS,
  SEALS,
  BLANK_CARD,
};
