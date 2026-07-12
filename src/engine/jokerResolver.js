function isOddRank(card) {
  // Rank 14 is an Ace, which is treated instead as rank 1 in this context
  return [14, 9, 7, 5, 3].includes(card.rank);
}

function isEvenRank(card) {
  return [10, 8, 6, 4, 2].includes(card.rank);
}

function isFaceCard(card, gameMetadata) {
  return gameMetadata.pareidolia || (card.rank >= 11 && card.rank <= 13);
}

const resolvedJokers = {
  "Even Steven": {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isEvenRank(entry.card)) {
        addEvent({ type: "JOKER_SCORED", joker: "Even Steven", addMult: 4 });
      }
    },
  },
  "Hanging Chad": {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (entry.index === 0 && !entry.hangingChadApplied) {
        addEvent({ type: "JOKER_SCORED", joker: "Hanging Chad" });
        addEvent({ ...entry, hangingChadApplied: true });
        addEvent({ ...entry, hangingChadApplied: true });
      }
    },
  },
  "Odd Todd": {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isOddRank(entry.card)) {
        addEvent({ type: "JOKER_SCORED", joker: "Odd Todd", addChips: 31 });
      }
    },
  },
  Photograph: {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isFaceCard(entry.card, gameMetadata)) {
        const isFirstFaceCard = scoredCards
          .slice(0, entry.index)
          .every((card) => !isFaceCard(card, gameMetadata));
        if (isFirstFaceCard) {
          addEvent({ type: "JOKER_SCORED", joker: "Photograph", addMult: 2 });
        }
      }
    },
  },
  "Scary Face": {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isFaceCard(entry.card, gameMetadata)) {
        addEvent({ type: "JOKER_SCORED", joker: "Scary Face", addChips: 30 });
      }
    },
  },
  Scholar: {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (entry.card.rank === 14) {
        addEvent({
          type: "JOKER_SCORED",
          joker: "Scholar",
          addChips: 20,
          addMult: 4,
        });
      }
    },
  },
  "Smiley Face": {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (isFaceCard(entry.card, gameMetadata)) {
        addEvent({ type: "JOKER_SCORED", joker: "Smiley Face", addMult: 5 });
      }
    },
  },
  "Walkie Talkie": {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addEvent) => {
      if (entry.card.rank === 4 || entry.card.rank === 10) {
        addEvent({
          type: "JOKER_SCORED",
          joker: "Walkie Talkie",
          addChips: 10,
          addMult: 4,
        });
      }
    },
  },
};

function resolveJoker(joker) {
  return resolvedJokers[joker];
}

export { resolveJoker };
