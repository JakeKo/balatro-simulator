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
      <div>Hand</div>
      <div>Chips</div>
      <div>Mult</div>
      <div>Total</div>
      {Object.entries(handMap).map(([hand, [chip, mult]]) => (
        <Fragment key={hand}>
          <div className="hand-table-row-hand">{hand}</div>
          <input
            className="hand-table-row-chip"
            value={chip}
            onChange={(e) => onChipChange(hand, e.target.value)}
          />
          <input
            className="hand-table-row-mult"
            value={mult}
            onChange={(e) => onMultChange(hand, e.target.value)}
          />
          <div className="hand-table-row-total">{chip * mult}</div>
        </Fragment>
      ))}
    </div>
  );
}

export default HandTable;
