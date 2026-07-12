import { useState } from "react";

function JokerPicker({ joker, onChange }) {
  return (
    <div className="joker-picker">
      <select value={joker} onChange={(event) => onChange(event.target.value)}>
        <option>None</option>
        <option>Abstract Joker</option>
        {/* +3 mult per joker */}
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
        <option>Joker</option>
        {/* +2 mult */}
        <option>Wrathful Joker</option>
        {/* cards with some suit, +3 mult when scored */}
      </select>
    </div>
  );
}

export default JokerPicker;
