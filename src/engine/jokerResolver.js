const resolvedJokers = {
  "Hanging Chad": {
    when: (entry) => entry.type === "CARD_SCORED",
    score: (entry, scoredCards, gameMetadata, addLogEntry) => {
      if (entry.index === 0 && !entry.hangingChadApplied) {
        addLogEntry({ ...entry, hangingChadApplied: true });
        addLogEntry({ ...entry, hangingChadApplied: true });
      }
    },
  },
};

function resolveJoker(joker) {
  return resolvedJokers[joker];
}

export { resolveJoker };
