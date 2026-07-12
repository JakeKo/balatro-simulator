import { useState } from "react";

const JOKERS = [
  "None",
  // "8 Ball",
  "Abstract Joker",
  // "Acrobat",
  // "Ancient Joker",
  // "Arrowhead",
  // "Astronomer",
  "Banner",
  // "Baron",
  // "Baseball Card",
  // "Blackboard",
  // "Bloodstone",
  // "Blue Joker",
  // "Blueprint",
  // "Bootstraps",
  // "Brainstorm",
  // "Bull",
  // "Burglar",
  // "Burnt Joker",
  // "Business Card",
  // "Campfire",
  // "Canio",
  // "Card Sharp",
  // "Cartomancer",
  // "Castle",
  "Cavendish",
  // "Ceremonial Dagger",
  // "Certificate",
  "Chaos the Clown",
  // "Chicot",
  "Clever Joker",
  // "Cloud 9",
  // "Constellation",
  "Crafty Joker",
  "Crazy Joker",
  // "Credit Card",
  // "DNA",
  // "Delayed Gratification",
  "Devious Joker",
  // "Diet Cola",
  // "Driver's License",
  "Droll Joker",
  // "Drunkard",
  // "Dusk",
  // "Egg",
  // "Erosion",
  "Even Steven",
  // "Faceless Joker",
  // "Fibonacci",
  // "Flash Card",
  // "Flower Pot",
  // "Fortune Teller",
  // "Four Fingers",
  // "Gift Card",
  // "Glass Joker",
  // "Gluttonous Joker",
  // "Golden Joker",
  // "Golden Ticket",
  // "Greedy Joker",
  // "Green Joker",
  "Gros Michel",
  // "Hack",
  "Half Joker",
  // "Hallucination",
  "Hanging Chad",
  // "Hiker",
  // "Hit the Road",
  // "Hologram",
  // "Ice Cream",
  // "Invisible Joker",
  "Joker",
  // "Joker Stencil",
  "Jolly Joker",
  // "Juggler",
  // "Loyalty Card",
  // "Luchador",
  // "Lucky Cat",
  // "Lusty Joker",
  "Mad Joker",
  // "Madness",
  // "Mail-In Rebate",
  // "Marble Joker",
  // "Matador",
  // "Merry Andy",
  // "Midas Mask",
  // "Mime",
  // "Misprint",
  // "Mr. Bones",
  // "Mystic Summit",
  // "Obelisk",
  "Odd Todd",
  // "Onyx Agate",
  // "Oops! All 6s",
  // "Pareidolia",
  "Perkeo",
  "Photograph",
  // "Popcorn",
  // "Raised Fist",
  // "Ramen",
  // "Red Card",
  // "Reserved Parking",
  // "Ride the Bus",
  // "Riff-raff",
  // "Rocket",
  // "Rough Gem",
  // "Runner",
  // "Satellite",
  "Scary Face",
  "Scholar",
  // "Seance",
  // "Seeing Double",
  // "Seltzer",
  // "Shoot the Moon",
  // "Shortcut",
  // "Showman",
  // "Sixth Sense",
  "Sly Joker",
  // "Smeared Joker",
  "Smiley Face",
  // "Sock and Buskin",
  // "Space Joker",
  // "Spare Trousers",
  // "Splash",
  // "Square Joker",
  // "Steel Joker",
  // "Stone Joker",
  // "Stuntman",
  // "Supernova",
  // "Superposition",
  // "Swashbuckler",
  // "The Duo",
  // "The Family",
  // "The Idol",
  // "The Order",
  // "The Tribe",
  // "The Trio",
  // "Throwback",
  // "To Do List",
  // "To the Moon",
  // "Trading Card",
  // "Triboulet",
  // "Troubadour",
  // "Turtle Bean",
  // "Vagabond",
  // "Vampire",
  "Walkie Talkie",
  // "Wee Joker",
  "Wily Joker",
  // "Wrathful Joker",
  // "Yorick",
  "Zany Joker",
];

// Some jokers require additional information to calculate
// E.g., Banner needs to know how many discards are remaining
// Rather than implement entire game state tracking, prompt the user to provide the hard-coded values
// The map connects a selected Joker to the metadata that needs to be gathered
const JOKER_METADATA_MAP = {
  Banner: [
    {
      key: "remainingDiscards",
      label: "Remaining Discards",
      type: "number",
      default: 0,
    },
  ],
};

function getJokerMetadata(joker) {
  if (joker in JOKER_METADATA_MAP) {
    return JOKER_METADATA_MAP[joker];
  }

  return [];
}

function JokerPicker({ joker, metadata, onChange }) {
  const metadataEntries = getJokerMetadata(joker);

  function onJokerChange(newJoker) {
    const metadataEntries = getJokerMetadata(newJoker);
    const newMetadata = metadataEntries.reduce(
      (metadata, entry) => ({ ...metadata, [entry.key]: entry.default }),
      {},
    );

    onChange({
      joker: newJoker,
      metadata: newMetadata,
    });
  }

  function onMetadataChange(newMetadata) {
    onChange({
      joker,
      metadata: { ...metadata, ...newMetadata },
    });
  }

  return (
    <div className="joker-picker">
      <select value={joker} onChange={(e) => onJokerChange(e.target.value)}>
        {JOKERS.map((joker) => (
          <option key={joker}>{joker}</option>
        ))}
      </select>
      {metadataEntries.map(({ key, label, type }) => (
        <input
          value={metadata[key]}
          placeholder={label}
          type={type}
          onChange={(e) =>
            onMetadataChange({ [key]: Number.parseInt(e.target.value, 10) })
          }
        />
      ))}
    </div>
  );
}

export default JokerPicker;
