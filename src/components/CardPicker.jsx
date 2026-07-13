import { RANK_TO_NAME, SUITS } from "../constants";

function CardPicker({ card, onChange }) {
  function onRankChange(event) {
    const rank = parseInt(event.target.value, 10);
    onChange({ rank, suit: card.suit });
  }

  function onSuitChange(event) {
    const suit = event.target.value;
    onChange({ rank: card.rank, suit });
  }

  return (
    <div className="card-picker">
      <select value={card.rank} onChange={onRankChange}>
        {Object.entries(RANK_TO_NAME).map(([rank, name]) => (
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
    </div>
  );
}

export default CardPicker;
