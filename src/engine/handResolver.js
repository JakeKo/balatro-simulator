function sortCardsByRank(playedCards) {
  return [...playedCards].sort((a, b) => (a.rank < b.rank ? -1 : 1));
}

function countRanks(playedCards) {
  return playedCards.reduce((counter, card) => {
    counter[card.rank] = (counter[card.rank] || 0) + 1;
    return counter;
  }, {});
}

function countSuits(playedCards) {
  return playedCards.reduce((counter, card) => {
    counter[card.suit] = (counter[card.suit] || 0) + 1;
    return counter;
  }, {});
}

function findRankWithCount(rankCounts, count) {
  const [rankString] = Object.entries(rankCounts).find(([, c]) => c === count);
  return Number.parseInt(rankString, 10);
}

function findRanksWithCount(rankCounts, count) {
  return Object.entries(rankCounts)
    .filter(([, c]) => c === count)
    .map(([rankString]) => Number.parseInt(rankString, 10));
}

function handIsRoyalFlush(playedCards) {
  if (playedCards.length < 5) return false;
  const sortedCards = sortCardsByRank(playedCards);
  return sortedCards[0].rank === 10 && handIsStraightFlush(playedCards);
}

function findRoyalFlush(playedCards) {
  return playedCards;
}

function handIsStraightFlush(playedCards) {
  if (playedCards.length < 5) return false;
  const sortedCards = sortCardsByRank(playedCards);

  for (let i = 1; i < sortedCards.length; i++) {
    const prev = sortedCards[i - 1];
    const curr = sortedCards[i];

    if (curr.suit !== prev.suit || curr.rank !== prev.rank + 1) {
      return false;
    }
  }

  return true;
}

function findStraightFlush(playedCards) {
  return playedCards;
}

function handIsFourOfAKind(playedCards) {
  if (playedCards.length < 4) return false;
  const rankCounts = countRanks(playedCards);
  return Object.values(rankCounts).includes(4);
}

function findFourOfAKind(playedCards) {
  const rankCounts = countRanks(playedCards);
  const rankToFind = findRankWithCount(rankCounts, 4);
  return playedCards.filter((card) => card.rank === rankToFind);
}

function handIsFullHouse(playedCards) {
  if (playedCards.length < 5) return false;
  const rankCounts = countRanks(playedCards);
  const counts = Object.values(rankCounts);
  return counts.includes(3) && counts.includes(2);
}

function findFullHouse(playedCards) {
  const rankCounts = countRanks(playedCards);
  const ranksToFind = [
    findRankWithCount(rankCounts, 2),
    findRankWithCount(rankCounts, 3),
  ];

  return playedCards.filter((card) => ranksToFind.includes(card.rank));
}

function handIsFlush(playedCards) {
  if (playedCards.length < 5) return false;
  const suitCounts = countSuits(playedCards);
  return Object.values(suitCounts).includes(5);
}

function findFlush(playedCards) {
  return playedCards;
}

function handIsStraight(playedCards) {
  if (playedCards.length < 5) return false;
  const sortedCards = sortCardsByRank(playedCards);

  for (let i = 1; i < sortedCards.length; i++) {
    const prev = sortedCards[i - 1];
    const curr = sortedCards[i];

    if (curr.rank !== prev.rank + 1) {
      return false;
    }
  }

  return true;
}

function findStraight(playedCards) {
  return playedCards;
}

function handIsThreeOfAKind(playedCards) {
  if (playedCards.length < 3) return false;
  const rankCounts = countRanks(playedCards);
  return Object.values(rankCounts).includes(3);
}

function findThreeOfAKind(playedCards) {
  const rankCounts = countRanks(playedCards);
  const rankToFind = findRankWithCount(rankCounts, 3);
  return playedCards.filter((card) => card.rank === rankToFind);
}

function handIsTwoPair(playedCards) {
  if (playedCards.length < 4) return false;
  const rankCounts = countRanks(playedCards);
  const counts = Object.values(rankCounts);
  return counts.filter((count) => count === 2).length === 2;
}

function findTwoPair(playedCards) {
  const rankCounts = countRanks(playedCards);
  const ranksToFind = findRanksWithCount(rankCounts, 2);
  return playedCards.filter((card) => ranksToFind.includes(card.rank));
}

function handIsPair(playedCards) {
  if (playedCards.length < 2) return false;
  const rankCounts = countRanks(playedCards);
  return Object.values(rankCounts).includes(2);
}

function findPair(playedCards) {
  const rankCounts = countRanks(playedCards);
  const rankToFind = findRankWithCount(rankCounts, 2);
  return playedCards.filter((card) => card.rank === rankToFind);
}

function handIsHighCard(playedCards) {
  return playedCards.length > 0;
}

function findHighCard(playedCards) {
  const highRank = Math.max(...playedCards.map((card) => card.rank));
  return [playedCards.find((card) => card.rank === highRank)];
}

function identifyHandPlayed(playedCards) {
  if (handIsRoyalFlush(playedCards)) {
    return ["Royal Flush", findRoyalFlush(playedCards)];
  } else if (handIsStraightFlush(playedCards)) {
    return ["Straight Flush", findStraightFlush(playedCards)];
  } else if (handIsFourOfAKind(playedCards)) {
    return ["Four of a Kind", findFourOfAKind(playedCards)];
  } else if (handIsFullHouse(playedCards)) {
    return ["Full House", findFullHouse(playedCards)];
  } else if (handIsFlush(playedCards)) {
    return ["Flush", findFlush(playedCards)];
  } else if (handIsStraight(playedCards)) {
    return ["Straight", findStraight(playedCards)];
  } else if (handIsThreeOfAKind(playedCards)) {
    return ["Three of a Kind", findThreeOfAKind(playedCards)];
  } else if (handIsTwoPair(playedCards)) {
    return ["Two Pair", findTwoPair(playedCards)];
  } else if (handIsPair(playedCards)) {
    return ["Pair", findPair(playedCards)];
  } else if (handIsHighCard(playedCards)) {
    return ["High Card", findHighCard(playedCards)];
  }

  return ["No Hand", []];
}

function identifyAllHandsPlayed(playedCards) {
  const hands = [];
  if (handIsRoyalFlush(playedCards)) hands.push("Royal Flush");
  if (handIsStraightFlush(playedCards)) hands.push("Straight Flush");
  if (handIsFourOfAKind(playedCards)) hands.push("Four of a Kind");
  if (handIsFullHouse(playedCards)) hands.push("Full House");
  if (handIsFlush(playedCards)) hands.push("Flush");
  if (handIsStraight(playedCards)) hands.push("Straight");
  if (handIsThreeOfAKind(playedCards)) hands.push("Three of a Kind");
  if (handIsTwoPair(playedCards)) hands.push("Two Pair");
  if (handIsPair(playedCards)) hands.push("Pair");
  if (playedCards.length > 0) hands.push("High Card");
  return hands;
}

export {
  handIsRoyalFlush,
  findRoyalFlush,
  handIsStraightFlush,
  findStraightFlush,
  handIsFourOfAKind,
  findFourOfAKind,
  handIsFullHouse,
  findFullHouse,
  handIsFlush,
  findFlush,
  handIsStraight,
  findStraight,
  handIsThreeOfAKind,
  findThreeOfAKind,
  handIsTwoPair,
  findTwoPair,
  handIsPair,
  findPair,
  handIsHighCard,
  findHighCard,
  identifyHandPlayed,
  identifyAllHandsPlayed,
};
