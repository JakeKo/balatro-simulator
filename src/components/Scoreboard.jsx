function Scoreboard({ chips, mult }) {
  const score = chips * mult;

  return <div className="scoreboard">{`${chips} × ${mult} = ${score}`}</div>;
}

export default Scoreboard;
