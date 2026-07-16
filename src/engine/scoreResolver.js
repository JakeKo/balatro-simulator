import { identifyHandPlayed } from "./handResolver.js";
import { resolveJoker } from "./jokerResolver.js";
import { resolveCard } from "./cardResolver.js";
import { JOKERS, HANDS, EVENT_TYPES } from "../constants.js";

function createNode(payload) {
  const node = { payload, children: [], parent: null };

  function addChild(childPayload) {
    const childNode = createNode(childPayload);
    childNode.parent = node;
    node.children.push(childNode);

    return childNode;
  }

  node.addChild = addChild;
  return node;
}

function traverse(node) {
  const log = [];

  function visit(node) {
    log.push(node.payload);
    node.children.forEach(visit);
  }

  visit(node);
  return log;
}

function createEventGraph() {
  const root = createNode({ root: true });
  const listeners = Object.values(EVENT_TYPES).reduce(
    (acc, type) => ({ ...acc, [type]: [] }),
    {},
  );

  function on(type, callback) {
    listeners[type].push(callback);
  }

  function activate(node, round) {
    const eventType = node.payload.type;

    // Call all listeners for this event type
    // Callbacks can sometimes add child nodes or even siblings (children of the parent node)
    for (let i = 0; i < listeners[eventType]?.length; i++) {
      const callback = listeners[eventType][i];
      callback(node, round);
    }

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      activate(child, round);
    }
  }

  return { root, on, activate };
}

function resolveScore(allCards, handMap, allJokers, gameMetadata) {
  const playedCards = allCards.filter((card) => card.rank !== 0);
  const playedJokers = allJokers.filter((joker) => joker !== JOKERS.NONE);

  const [handPlayed, scoredCards] = identifyHandPlayed(playedCards);
  if (handPlayed === HANDS.NONE) return [0, 0, []];
  const [baseChips, baseMult] = handMap[handPlayed];

  const round = {
    playedCards,
    scoredCards,
    jokers: playedJokers,
    metadata: gameMetadata,
  };

  const { root, on, activate } = createEventGraph();

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

  const eventLog = traverse(root).slice(1);
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
