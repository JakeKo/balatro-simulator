import { JOKERS, JOKERS_LIST, JOKER_METADATA_TEMPLATES } from "../constants";

function getMetadataTemplate(joker) {
  return JOKER_METADATA_TEMPLATES[joker] || [];
}

function JokerPicker({ joker, metadata, onChange }) {
  const metadataTemplate = getMetadataTemplate(joker);

  function onJokerChange(newJoker) {
    const newMetadataTemplate = getMetadataTemplate(newJoker);
    const newMetadata = newMetadataTemplate.reduce(
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
        {JOKERS_LIST.map((joker) => (
          <option key={joker}>{joker}</option>
        ))}
      </select>
      {metadataTemplate.map(({ key, label, type }) => {
        switch (type) {
          case "number":
            return (
              <input
                value={metadata[key]}
                placeholder={label}
                type="number"
                onChange={(e) =>
                  onMetadataChange({ [key]: parseInt(e.target.value, 10) })
                }
              />
            );
          case "boolean":
            return (
              <div>
                <label>{label}</label>
                <input
                  checked={metadata[key]}
                  type="checkbox"
                  onChange={(e) =>
                    onMetadataChange({ [key]: e.target.checked })
                  }
                />
              </div>
            );
        }
      })}
    </div>
  );
}

export default JokerPicker;
