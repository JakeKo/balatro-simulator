import { useState } from "react";
import {
  CardPicker,
  HandTable,
  JokerPicker,
  Scoreboard,
  ScoreLogger,
} from "./components";
import { resolveSequenceTree, resolveScore } from "./engine/scoreResolver.js";
import { BASIC_HANDS, BLANK_CARD, FULL_JOKERS } from "./constants.js";

function App() {
  const [handMap, setHandMap] = useState(
    JSON.parse(JSON.stringify(BASIC_HANDS)),
  );
  const [allCards, setAllCards] = useState([
    BLANK_CARD(),
    BLANK_CARD(),
    BLANK_CARD(),
    BLANK_CARD(),
    BLANK_CARD(),
  ]);
  const [allJokers, setAllJokers] = useState([
    FULL_JOKERS.NONE(),
    FULL_JOKERS.NONE(),
    FULL_JOKERS.NONE(),
    FULL_JOKERS.NONE(),
    FULL_JOKERS.NONE(),
  ]);
  const sequenceTree = resolveSequenceTree(allCards, handMap, allJokers);
  const [chips, mult] = resolveScore(sequenceTree);

  return (
    <div className="app">
      <Scoreboard chips={chips} mult={mult} />
      <HandTable handMap={handMap} onChange={setHandMap} />
      <div className="joker-pickers">
        {allJokers.map((joker, index) => (
          <JokerPicker
            key={index}
            joker={joker}
            onChange={(joker) => {
              const newJokers = JSON.parse(JSON.stringify(allJokers));
              newJokers[index] = joker;
              setAllJokers(newJokers);
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
      <ScoreLogger tree={sequenceTree} />
    </div>
  );
}

export default App;
