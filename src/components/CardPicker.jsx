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
        <option value="0">None</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
        <option value="6">Six</option>
        <option value="7">Seven</option>
        <option value="8">Eight</option>
        <option value="9">Nine</option>
        <option value="10">Ten</option>
        <option value="11">Jack</option>
        <option value="12">Queen</option>
        <option value="13">King</option>
        <option value="14">Ace</option>
      </select>
      <select value={card.suit} onChange={onSuitChange}>
        <option value="Hearts">Hearts</option>
        <option value="Diamonds">Diamonds</option>
        <option value="Clubs">Clubs</option>
        <option value="Spades">Spades</option>
      </select>
    </div>
  );
}

export default CardPicker;
