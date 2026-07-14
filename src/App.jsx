import { useState } from "react";
import {
  CardPicker,
  HandTable,
  JokerPicker,
  Scoreboard,
  ScoreLogger,
} from "./components";
import { resolveScore } from "./engine/scoreResolver.js";
import { JOKERS, BASIC_HANDS, BLANK_CARD } from "./constants.js";

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
    JOKERS.NONE,
    JOKERS.NONE,
    JOKERS.NONE,
    JOKERS.NONE,
    JOKERS.NONE,
  ]);
  const [allJokerMetadata, setAllJokerMetadata] = useState([
    {},
    {},
    {},
    {},
    {},
  ]);

  const gameMetadata = allJokerMetadata.reduce(
    (metadata, jokerMetadata) => ({ ...metadata, ...jokerMetadata }),
    {},
  );
  const [chips, mult, eventLog] = resolveScore(
    allCards,
    handMap,
    allJokers,
    gameMetadata,
  );

  return (
    <div className="app">
      <Scoreboard chips={chips} mult={mult} />
      <HandTable handMap={handMap} onChange={setHandMap} />
      <div className="joker-pickers">
        {allJokers.map((joker, index) => (
          <JokerPicker
            key={index}
            joker={joker}
            metadata={allJokerMetadata[index]}
            onChange={({ joker, metadata }) => {
              const newJokers = JSON.parse(JSON.stringify(allJokers));
              const newMetadata = JSON.parse(JSON.stringify(allJokerMetadata));

              newJokers[index] = joker;
              newMetadata[index] = metadata;

              setAllJokers(newJokers);
              setAllJokerMetadata(newMetadata);
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
