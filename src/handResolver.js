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
  if (playedCards.length < 5) return false;
  const sortedCards = sortCardsByRank(playedCards);
  return sortedCards[0].rank === 10 && handIsStraightFlush(playedCards);
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

function handIsFourOfAKind(playedCards) {
  if (playedCards.length < 4) return false;
  const rankCounts = countRanks(playedCards);
  return Object.values(rankCounts).includes(4);
}

function handIsFullHouse(playedCards) {
  if (playedCards.length < 5) return false;
  const rankCounts = countRanks(playedCards);
  const counts = Object.values(rankCounts);
  return counts.includes(3) && counts.includes(2);
}

function handIsFlush(playedCards) {
  if (playedCards.length < 5) return false;
  const suitCounts = countSuits(playedCards);
  return Object.values(suitCounts).includes(5);
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

function handIsThreeOfAKind(playedCards) {
  if (playedCards.length < 3) return false;
  const rankCounts = countRanks(playedCards);
  return Object.values(rankCounts).includes(3);
}

function handIsTwoPair(playedCards) {
  if (playedCards.length < 4) return false;
  const rankCounts = countRanks(playedCards);
  const counts = Object.values(rankCounts);
  return counts.filter((count) => count === 2).length === 2;
}

function handIsPair(playedCards) {
  if (playedCards.length < 2) return false;
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
  if (playedCards.length > 0) return "High Card";
  return "No Hand";
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

export { identifyHandPlayed, identifyAllHandsPlayed };
