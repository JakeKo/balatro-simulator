import { RANKS, SUITS, ENHANCEMENTS, EDITIONS, SEALS } from "../constants";

function CardPicker({ card, onChange }) {
  function onRankChange(event) {
    const rank = parseInt(event.target.value, 10);
    onChange({ ...card, rank });
  }

  function onSuitChange(event) {
    const suit = event.target.value;
    onChange({ ...card, suit });
  }

  function onEnhancementChange(event) {
    const enhancement = event.target.value;
    onChange({ ...card, enhancement });
  }

  function onEditionChange(event) {
    const edition = event.target.value;
    onChange({ ...card, edition });
  }

  function onSealChange(event) {
    const seal = event.target.value;
    onChange({ ...card, seal });
  }

  return (
    <div className="card-picker">
      <select value={card.rank} onChange={onRankChange}>
        {Object.entries(RANKS).map(([rank, name]) => (
          <option key={rank} value={rank}>
            {name}
          </option>
        ))}
      </select>
      <select value={card.suit} onChange={onSuitChange}>
        {Object.values(SUITS).map((suit) => (
          <option key={suit} value={suit}>
            {suit}
          </option>
        ))}
      </select>
      <select value={card.enhancement} onChange={onEnhancementChange}>
        {Object.values(ENHANCEMENTS).map((enhancement) => (
          <option key={enhancement} value={enhancement}>
            {enhancement}
          </option>
        ))}
      </select>
      <select value={card.edition} onChange={onEditionChange}>
        {Object.values(EDITIONS).map((edition) => (
          <option key={edition} value={edition}>
            {edition}
          </option>
        ))}
      </select>
      <select value={card.seal} onChange={onSealChange}>
        {Object.values(SEALS).map((seal) => (
          <option key={seal} value={seal}>
            {seal}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CardPicker;
