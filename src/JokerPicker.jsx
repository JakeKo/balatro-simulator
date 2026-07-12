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
        {/* +80 chips if contains two pair */}
        <option>Crafty Joker</option>
        {/* +80 chips if Flush */}
        <option>Joker</option>
        {/* +2 mult */}
        <option>Wrathful Joker</option>
        {/* cards with some suit, +3 mult when scored */}
      </select>
    </div>
  );
}

export default JokerPicker;
