import { useEffect, useState } from "react";
import Scoreboard from "./Scoreboard.jsx";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import CardPicker from "./CardPicker.jsx";
import HandTable from "./HandTable.jsx";
import { identifyHandPlayed } from "./handResolver.js";

function App() {
  const [count, setCount] = useState(0);
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
  const [handPlayed, setHandPlayed] = useState(identifyHandPlayed(playedCards));

  useEffect(() => {
    const handPlayed = identifyHandPlayed(playedCards);
    const [chip, mult] = handMap[handPlayed];
    setChips(chip);
    setMult(mult);
    setHandPlayed(handPlayed);
  }, [playedCards]);

  useEffect(() => {
    const [chip, mult] = handMap[handPlayed];
    setChips(chip);
    setMult(mult);
  }, [handMap]);

  return (
    <>
      <Scoreboard chips={chips} mult={mult} />
      <HandTable handMap={handMap} onChange={setHandMap} />
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
    </>
  );
}

export default App;
