import { identifyHandPlayed } from "./handResolver.js";
import { resolveJoker } from "./jokerResolver.js";
import { resolveCard } from "./cardResolver.js";
import { JOKERS, HANDS, EVENT_TYPES } from "../constants.js";
import { createSequenceTree, depthFirstTraversal } from "./sequenceTree.js";

function resolveSequenceTree(allCards, handMap, allJokers) {
  const playedCards = allCards.filter((card) => card.rank !== 0);
  const playedJokers = allJokers.filter((joker) => joker.name !== JOKERS.NONE);

  const { root, on, activate } = createSequenceTree();

  const [handPlayed, scoredCards] = identifyHandPlayed(playedCards);
  if (handPlayed === HANDS.NONE) return root;
  const [baseChips, baseMult] = handMap[handPlayed];

  const round = { playedCards, scoredCards, jokers: playedJokers };

  // Resolve jokers and their effects
  playedJokers.forEach((joker) => resolveJoker(joker, { on }));

  // Queue initial HAND_PLAYED event with the base chips and multiplier
  root.addChild({
    type: EVENT_TYPES.HAND_PLAYED,
    hand: handPlayed,
    baseChips,
    baseMult,
    scoredCards,
  });

  // Queue the CARD_SCORED events for each scored card
  scoredCards.forEach((card, index) => resolveCard(card, index, { on }));

  // Queue the HAND_ENDED event to signify the end of the round
  root.addChild({ type: EVENT_TYPES.HAND_ENDED });

  // Activate the event graph, which will trigger all listeners and resolve all effects
  activate(root, round);

  return root;
}

function resolveScore(sequenceTree) {
  // Resolve the event graph into a flat event log
  const eventLog = [];
  depthFirstTraversal(sequenceTree, (node) => {
    eventLog.push(node.payload);
  });

  if (eventLog.length === 1) {
    return [0, 0, []]; // No hand played, return 0 chips and 0 multiplier
  }

  // Calculate the final chips and multiplier
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

export { resolveSequenceTree, resolveScore };
