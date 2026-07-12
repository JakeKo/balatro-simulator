function ScoreLogger({ log }) {
  return (
    <div className="score-logger">
      {log.map((entry, index) => (
        <div key={index}>{entry}</div>
      ))}
    </div>
  );
}

export default ScoreLogger;
