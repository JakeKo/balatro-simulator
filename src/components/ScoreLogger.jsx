function ScoreLogger({ log }) {
  return (
    <div className="score-logger">
      {log.map((entry, index) => (
        <code key={index}>{entry}</code>
      ))}
    </div>
  );
}

export default ScoreLogger;
