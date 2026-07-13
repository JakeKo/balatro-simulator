import { identifyHandPlayed } from "./handResolver.js";
import { resolveJoker } from "./jokerResolver.js";
import { JOKERS, HANDS, EVENT_TYPES } from "../constants.js";

function resolveScore(allCards, handMap, allJokers, gameMetadata) {
  const playedCards = allCards.filter((card) => card.rank !== 0);
  const [handPlayed, scoredCards] = identifyHandPlayed(playedCards);
  if (handPlayed === HANDS.NONE) return [0, 0, []];

  const playedJokers = allJokers.filter((joker) => joker !== JOKERS.NONE);
  const resolvedJokers = playedJokers.map(resolveJoker).filter((j) => !!j);
  gameMetadata.jokerCount = playedJokers.length;

  const eventLog = [];
  function addEvent(entry) {
    eventLog.push(entry);
    resolvedJokers.forEach((resolvedJoker) => {
      if (resolvedJoker.when(entry)) {
        resolvedJoker.score(entry, scoredCards, gameMetadata, addEvent);
      }
    });
  }

  const [baseChips, baseMult] = handMap[handPlayed];
  addEvent({
    type: EVENT_TYPES.HAND_PLAYED,
    hand: handPlayed,
    baseChips,
    baseMult,
    scoredCards,
  });

  // BODY OF ROUND - CYCLE THROUGH PLAYED CARDS
  for (let i = 0; i < scoredCards.length; i++) {
    const card = scoredCards[i];
    const rankForScoring = [14, 13, 12].includes(card.rank) ? 11 : card.rank;

    addEvent({
      type: EVENT_TYPES.CARD_SCORED,
      card,
      index: i,
      addChips: rankForScoring,
    });
  }

  // END OF HAND - CYCLE THROUGH JOKERS
  addEvent({ type: EVENT_TYPES.HAND_ENDED });

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
