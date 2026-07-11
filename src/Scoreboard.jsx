function Scoreboard({ chips, mult }) {
  const score = chips * mult;

  return (
    <div>
      <span>{chips}</span>*<span>{mult}</span>=<span>{score}</span>
    </div>
  );
}

export default Scoreboard;
