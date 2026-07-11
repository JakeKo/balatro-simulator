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

function handIsRoyalFlush(playedCards) {
  const sortedCards = sortCardsByRank(playedCards);
  return sortedCards[0].rank === 10 && handIsStraightFlush(playedCards);
}

function handIsStraightFlush(playedCards) {
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

function handIsFourOfAKind(playedCards) {
  const rankCounts = countRanks(playedCards);
  return Object.values(rankCounts).includes(4);
}

function handIsFullHouse(playedCards) {
  const rankCounts = countRanks(playedCards);
  const counts = Object.values(rankCounts);
  return counts.includes(3) && counts.includes(2);
}

function handIsFlush(playedCards) {
  const suitCounts = countSuits(playedCards);
  return Object.values(suitCounts).includes(5);
}

function handIsStraight(playedCards) {
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

function handIsThreeOfAKind(playedCards) {
  const rankCounts = countRanks(playedCards);
  return Object.values(rankCounts).includes(3);
}

function handIsTwoPair(playedCards) {
  const rankCounts = countRanks(playedCards);
  const counts = Object.values(rankCounts);
  return counts.filter((count) => count === 2).length === 2;
}

function handIsPair(playedCards) {
  const rankCounts = countRanks(playedCards);
  return Object.values(rankCounts).includes(2);
}

function identifyHandPlayed(playedCards) {
  if (handIsRoyalFlush(playedCards)) return "Royal Flush";
  if (handIsStraightFlush(playedCards)) return "Straight Flush";
  if (handIsFourOfAKind(playedCards)) return "Four of a Kind";
  if (handIsFullHouse(playedCards)) return "Full House";
  if (handIsFlush(playedCards)) return "Flush";
  if (handIsStraight(playedCards)) return "Straight";
  if (handIsThreeOfAKind(playedCards)) return "Three of a Kind";
  if (handIsTwoPair(playedCards)) return "Two Pair";
  if (handIsPair(playedCards)) return "Pair";
  return "High Card";
}

export { identifyHandPlayed };
