import { identifyHandPlayed, identifyAllHandsPlayed } from "./handResolver.js";
import { resolveJoker } from "./jokerResolver.js";

function resolveScore(allCards, handMap, allJokers, gameMetadata) {
  const playedCards = allCards.filter((card) => card.rank !== 0);
  const playedJokers = allJokers.filter((joker) => joker !== "None");

  const [handPlayed, scoredCards] = identifyHandPlayed(playedCards);
  const allHandsPlayed = identifyAllHandsPlayed(playedCards);
  if (handPlayed === "No Hand") return [0, 0, []];

  const resolvedJokers = playedJokers.map(resolveJoker);
  gameMetadata.jokerCount = playedJokers.length;

  const [baseChips, baseMult] = handMap[handPlayed];
  const eventLog = [
    {
      type: "HAND_PLAYED",
      hand: handPlayed,
      baseChips,
      baseMult,
      scoredCards,
    },
  ];

  function addEvent(entry) {
    eventLog.push(entry);
    resolvedJokers.forEach((resolvedJoker) => {
      if (resolvedJoker.when(entry)) {
        resolvedJoker.score(entry, scoredCards, gameMetadata, addEvent);
      }
    });
  }

  // BODY OF ROUND - CYCLE THROUGH PLAYED CARDS
  for (let i = 0; i < scoredCards.length; i++) {
    const card = scoredCards[i];
    addEvent({ type: "CARD_SCORED", card, index: i, addChips: card.rank });
  }

  // END OF HAND - CYCLE THROUGH JOKERS
  addEvent({ type: "HAND_ENDED" });

  const [chips, mult] = eventLog.reduce(
    ([chips, mult], entry) => {
      const addChips = entry.addChips || entry.baseChips || 0;
      const addMult = entry.addMult || entry.baseMult || 0;
      const multMult = entry.multMult || 1;

      return [chips + addChips, (mult + addMult) * multMult];
    },
    [0, 0],
  );

  return [chips, mult, eventLog];
}

export { resolveScore };
