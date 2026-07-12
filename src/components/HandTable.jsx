import { Fragment } from "react";

function HandTable({ handMap, onChange }) {
  function onChipChange(hand, newChip) {
    const newHandMap = { ...handMap };
    newHandMap[hand][0] = parseInt(newChip);
    onChange(newHandMap);
  }

  function onMultChange(hand, newMult) {
    const newHandMap = { ...handMap };
    newHandMap[hand][1] = parseInt(newMult);
    onChange(newHandMap);
  }

  return (
    <div className="hand-table">
      <strong>Hand</strong>
      <strong>Chips</strong>
      <strong>Mult</strong>
      <strong>Total</strong>
      {Object.entries(handMap).map(([hand, [chip, mult]]) => (
        <Fragment key={hand}>
          <div className="hand-table-hand">{hand}</div>
          <input
            className="hand-table-chip"
            value={chip}
            type="number"
            onChange={(event) =>
              onChipChange(hand, Number.parseInt(event.target.value, 10))
            }
          />
          <input
            className="hand-table-mult"
            value={mult}
            type="number"
            onChange={(event) =>
              onMultChange(hand, Number.parseInt(event.target.value, 10))
            }
          />
          <strong className="hand-table-total">{chip * mult}</strong>
        </Fragment>
      ))}
    </div>
  );
}

export default HandTable;
