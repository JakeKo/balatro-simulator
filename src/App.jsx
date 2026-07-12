import { useEffect, useState } from "react";
import Scoreboard from "./Scoreboard.jsx";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import CardPicker from "./CardPicker.jsx";
import HandTable from "./HandTable.jsx";
import { identifyHandPlayed } from "./handResolver.js";
import { resolveScore } from "./scoreResolver.js";
import ScoreLogger from "./ScoreLogger.jsx";
import JokerPicker from "./JokerPicker.jsx";

function App() {
  const [log, setLog] = useState([]);
  const [chips, setChips] = useState(0);
  const [mult, setMult] = useState(1);
  const [handMap, setHandMap] = useState({
    "Flush Five": [160, 16],
    "Flush House": [140, 14],
    "Five of a Kind": [120, 12],
    "Royal Flush": [100, 8],
    "Straight Flush": [100, 8],
    "Four of a Kind": [60, 7],
    "Full House": [40, 4],
    Flush: [35, 4],
    Straight: [30, 4],
    "Three of a Kind": [30, 3],
    "Two Pair": [20, 2],
    Pair: [10, 2],
    "High Card": [5, 1],
  });
  const [playedCards, setPlayedCards] = useState([
    { rank: 14, suit: "Hearts" },
    { rank: 14, suit: "Hearts" },
    { rank: 14, suit: "Hearts" },
    { rank: 14, suit: "Hearts" },
    { rank: 14, suit: "Hearts" },
  ]);
  const [jokers, setJokers] = useState([
    "None",
    "None",
    "None",
    "None",
    "None",
  ]);

  useEffect(() => {
    const [newChips, newMult, log] = resolveScore(playedCards, handMap);
    setChips(newChips);
    setMult(newMult);
    setLog(log);
  }, [playedCards, handMap]);

  return (
    <div className="app">
      <Scoreboard chips={chips} mult={mult} />
      <HandTable handMap={handMap} onChange={setHandMap} />
      <div className="joker-pickers">
        {Array.from({ length: 5 }).map((_, index) => (
          <JokerPicker
            joker={jokers[index]}
            onChange={(joker) => {
              const newJokers = JSON.parse(JSON.stringify(jokers));
              newJokers[index] = joker;
              setJokers(newJokers);
            }}
          />
        ))}
      </div>
      <div className="card-pickers">
        {Array.from({ length: 5 }).map((_, index) => (
          <CardPicker
            key={index}
            card={playedCards[index]}
            onChange={(card) => {
              const newPlayedCards = JSON.parse(JSON.stringify(playedCards));
              newPlayedCards[index] = card;
              setPlayedCards(newPlayedCards);
            }}
          />
        ))}
      </div>
      <ScoreLogger log={log} />
    </div>
  );
}

export default App;
