import { EVENT_TYPES } from "../constants.js";

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

function traverseEventGraph(node) {
  const log = [];

  function visit(node) {
    log.push(node.payload);
    if (!node.children) console.log(node);

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

export { createEventGraph, traverseEventGraph };
