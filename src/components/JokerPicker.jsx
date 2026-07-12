import { useState } from "react";

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

function JokerPicker({ joker, gameMetadata, onChange }) {
  const metadataEntries = getJokerMetadata(joker);

  return (
    <div className="joker-picker">
      <select value={joker} onChange={(event) => onChange(event.target.value)}>
        <option>None</option>
        <option>Abstract Joker</option>
        {/* +3 mult per joker */}
        <option>Banner</option>
        {/* +30 chips per remaining discard */}
        <option>Cavendish</option>
        {/* +3 mult, 1 / 1000 chance to destroy */}
        <option>Chaos the Clown</option>
        {/* 1 free reroll */}
        <option>Clever Joker</option>
        {/* +80 chips if two pair */}
        <option>Crafty Joker</option>
        {/* +80 chips if Flush */}
        <option>Crazy Joker</option>
        {/* +12 mult if straight */}
        <option>Devious Joker</option>
        {/* +100 chips if straight */}
        <option>Droll Joker</option>
        {/* +10 mult if flush */}
        <option>Even Steven</option>
        {/* +4 mult per card with even rank */}
        <option>Gros Michel</option>
        {/* +15 mult, 1 / 6 chance to destroy */}
        <option>Half Joker</option>
        {/* +20 mult if <= 3 cards */}
        <option>Joker</option>
        {/* +2 mult */}
        <option>Jolly Joker</option>
        {/* +8 mult if pair */}
        <option>Mad Joker</option>
        {/* +10 mult if two pair */}
        <option>Odd Todd</option>
        {/* +31 mult per card with odd rank */}
        <option>Photograph</option>
        {/* +2 mult for first face card */}
        <option>Scary Face</option>
        {/* +30 chips per card with face rank */}
        <option>Scholar</option>
        {/* +20, +4 mult per Ace */}
        <option>Sly Joker</option>
        {/* +50 chips if pair */}
        <option>Smiley Face</option>
        {/* +5 mult per card with face rank */}
        <option>Walkie Talkie</option>
        {/* +10 chips, +4 mult for 10s and 4s */}
        <option>Wily Joker</option>
        {/* +100 chips if three of a kind */}
        <option>Zany Joker</option>
        {/* +12 mult if three of a kind */}
      </select>
      {metadataEntries.map(({ key, label }) => (
        <input value={gameMetadata[key]} placeholder={label} type="number" />
      ))}
    </div>
  );
}

export default JokerPicker;
