import { useState } from "react";

function JokerPicker({ joker, onChange }) {
  return (
    <div className="joker-picker">
      <select value={joker} onChange={(event) => onChange(event.target.value)}>
        <option>None</option>
        <option>Joker</option>
        {/* +2 mult */}
        <option>Crafty Joker</option>
        {/* +80 chips if Flush */}
        <option>Golden Joker</option>
        {/* +$4 at end of round */}
        <option>Wrathful Joker</option>
        {/* cards with some suit, +3 mult when scored */}
      </select>
    </div>
  );
}

export default JokerPicker;
