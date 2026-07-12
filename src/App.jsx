import { useEffect, useState } from "react";
import {
  CardPicker,
  HandTable,
  JokerPicker,
  Scoreboard,
  ScoreLogger,
} from "./components";
import { resolveScore } from "./engine/scoreResolver.js";

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
  const [allCards, setAllCards] = useState([
    { rank: 0, suit: "Hearts" },
    { rank: 0, suit: "Hearts" },
    { rank: 0, suit: "Hearts" },
    { rank: 0, suit: "Hearts" },
    { rank: 0, suit: "Hearts" },
  ]);
  const [allJokers, setAllJokers] = useState([
    "None",
    "None",
    "None",
    "None",
    "None",
  ]);
  const [gameMetadata, setGameMetadata] = useState({});

  useEffect(() => {
    const [newChips, newMult, log] = resolveScore(
      allCards,
      handMap,
      allJokers,
      gameMetadata,
    );
    setChips(newChips);
    setMult(newMult);
    setLog(log);
  }, [allCards, handMap, allJokers, gameMetadata]);

  return (
    <div className="app">
      <Scoreboard chips={chips} mult={mult} />
      <HandTable handMap={handMap} onChange={setHandMap} />
      <div className="joker-pickers">
        {allJokers.map((joker, index) => (
          <JokerPicker
            key={index}
            joker={joker}
            gameMetadata={gameMetadata}
            onJokerChange={(joker) => {
              const newJokers = JSON.parse(JSON.stringify(allJokers));
              newJokers[index] = joker;
              setAllJokers(newJokers);
            }}
            onMetadataChange={(newMetadata) => {
              const newGameMetadata = { ...gameMetadata, ...newMetadata };
              setGameMetadata(newGameMetadata);
            }}
          />
        ))}
      </div>
      <div className="card-pickers">
        {allCards.map((card, index) => (
          <CardPicker
            key={index}
            card={card}
            onChange={(card) => {
              const newPlayedCards = JSON.parse(JSON.stringify(allCards));
              newPlayedCards[index] = card;
              setAllCards(newPlayedCards);
            }}
          />
        ))}
      </div>
      <ScoreLogger log={log} />
    </div>
  );
}

export default App;
