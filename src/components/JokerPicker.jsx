import { useState } from "react";

const JOKERS = [
  "None",
  "Abstract Joker",
  "Banner",
  "Cavendish",
  "Chaos the Clown",
  "Clever Joker",
  "Crafty Joker",
  "Crazy Joker",
  "Devious Joker",
  "Droll Joker",
  "Even Steven",
  "Gros Michel",
  "Half Joker",
  "Hanging Chad",
  "Joker",
  "Jolly Joker",
  "Mad Joker",
  "Odd Todd",
  "Pareidolia",
  "Photograph",
  "Scary Face",
  "Scholar",
  "Sly Joker",
  "Smiley Face",
  "Walkie Talkie",
  "Wily Joker",
  "Zany Joker",
];

// Some jokers require additional information to calculate
// E.g., Banner needs to know how many discards are remaining
// Rather than implement entire game state tracking, prompt the user to provide the hard-coded values
// The map connects a selected Joker to the metadata that needs to be gathered
const JOKER_METADATA_MAP = {
  Banner: [{ key: "remainingDiscards", label: "Remaining Discards" }],
};

function getJokerMetadata(joker) {
  if (joker in JOKER_METADATA_MAP) {
    return JOKER_METADATA_MAP[joker];
  }

  return [];
}

function JokerPicker({ joker, gameMetadata, onJokerChange, onMetadataChange }) {
  const metadataEntries = getJokerMetadata(joker);

  return (
    <div className="joker-picker">
      <select value={joker} onChange={(e) => onJokerChange(e.target.value)}>
        {JOKERS.map((joker) => (
          <option key={joker}>{joker}</option>
        ))}
      </select>
      {metadataEntries.map(({ key, label }) => (
        <input
          value={gameMetadata[key]}
          placeholder={label}
          type="number"
          onChange={(event) => {
            onMetadataChange({
              [key]: Number.parseInt(event.target.value, 10),
            });
          }}
        />
      ))}
    </div>
  );
}

export default JokerPicker;
