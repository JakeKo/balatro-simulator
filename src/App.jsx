import { useState } from "react";
import {
  CardPicker,
  HandTable,
  JokerPicker,
  Scoreboard,
  ScoreLogger,
} from "./components";
import { resolveScore } from "./engine/scoreResolver.js";
import { BASIC_HANDS, BLANK_CARD, FULL_JOKERS } from "./constants.js";

function App() {
  const [handMap, setHandMap] = useState(BASIC_HANDS);
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
  const [chips, mult, eventLog] = resolveScore(allCards, handMap, allJokers);

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
      <ScoreLogger log={eventLog} />
    </div>
  );
}

export default App;
