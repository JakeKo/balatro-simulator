import {
  JOKERS_LIST,
  JOKER_METADATA_TEMPLATES,
  SUIT_LIST,
  FULL_JOKERS,
  fullJokerByName,
} from "../constants";

function getMetadataTemplate(joker) {
  return JOKER_METADATA_TEMPLATES[joker.name] || [];
}

function JokerPicker({ joker, onChange }) {
  const metadataTemplate = getMetadataTemplate(joker);

  function onJokerChange(jokerName) {
    const fullJoker = fullJokerByName(jokerName);
    onChange(fullJoker);
  }

  function onMetadataChange(newMetadata) {
    const updatedJoker = {
      ...joker,
      metadata: { ...joker.metadata, ...newMetadata },
    };
    onChange(updatedJoker);
  }

  return (
    <div className="joker-picker">
      <select
        className="joker-picker-name"
        value={joker.name}
        onChange={(e) => onJokerChange(e.target.value)}
      >
        {JOKERS_LIST.map((jokerName) => (
          <option key={jokerName}>{jokerName}</option>
        ))}
      </select>
      {metadataTemplate.map(({ key, label, type }) => {
        switch (type) {
          case "number":
            return (
              <input
                key={key}
                className="joker-picker-number"
                value={joker.metadata[key]}
                placeholder={label}
                type="number"
                onChange={(e) =>
                  onMetadataChange({ [key]: parseInt(e.target.value, 10) })
                }
              />
            );
          case "boolean":
            return (
              <div key={key} className="joker-picker-boolean">
                {label}
                <input
                  checked={joker.metadata[key]}
                  type="checkbox"
                  onChange={(e) =>
                    onMetadataChange({ [key]: e.target.checked })
                  }
                />
              </div>
            );
          case "suit":
            return (
              <select
                key={key}
                className="joker-picker-suit"
                value={joker.metadata[key]}
                onChange={(e) => onMetadataChange({ [key]: e.target.value })}
              >
                {SUIT_LIST.map((suit) => (
                  <option key={suit} value={suit}>
                    {suit}
                  </option>
                ))}
              </select>
            );
        }
      })}
    </div>
  );
}

export default JokerPicker;
