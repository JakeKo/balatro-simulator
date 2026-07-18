import { EVENT_TYPES } from "../constants.js";

// https://medium.com/@ryan_forrester_/javascript-unique-id-generation-how-to-guide-0d6752318823
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const rand = (Math.random() * 16) | 0;
    const id = char == "x" ? rand : (rand & 0x3) | 0x8;
    return id.toString(16);
  });
}

function createNode(payload, weight = 1) {
  const node = { payload, id: uuidv4(), children: [], parent: null, weight };

  function addChild(childPayload) {
    const childNode = createNode(childPayload);
    childNode.index = node.children.length;
    childNode.parent = node;
    node.children.push(childNode);
  }

  function insertChild(childPayload, index) {
    const childNode = createNode(childPayload);
    childNode.index = index;
    childNode.parent = node;
    node.children.splice(index, 0, childNode);
    node.children.slice(index + 1).forEach((child) => {
      child.index += 1;
    });
  }

  node.addChild = addChild;
  node.insertChild = insertChild;

  return node;
}

function depthFirstTraversal(node, callback) {
  callback(node);
  node.children.forEach((child) => depthFirstTraversal(child, callback));
}

function createSequenceTree() {
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

export { createSequenceTree, depthFirstTraversal };
