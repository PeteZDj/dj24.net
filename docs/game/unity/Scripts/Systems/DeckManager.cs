using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace DJ24.Game
{
    /// <summary>
    /// The Deck-of-52 most-wanted progression. For each house you work the ladder
    /// from the weakest pip (10) up to the Ace. Lower cards act as the higher cards'
    /// bodyguards: an Ace can't be engaged until its house is cleared down to it.
    /// </summary>
    public class DeckManager : MonoBehaviour
    {
        [SerializeField] private GameDatabase database;

        public event Action<CardDto, int> OnBountyCleared; // (card, rewardPaid)
        public event Action<string> OnHouseCompleted;      // (houseKey)

        private readonly HashSet<string> _defeated = new HashSet<string>();
        private int _totalBounty;

        public int TotalBountyEarned => _totalBounty;
        public GameDatabase Database => database;

        private void Awake()
        {
            if (database != null) database.Build();
        }

        public bool IsDefeated(string slug) => _defeated.Contains(slug);

        /// <summary>The card you're allowed to fight next in a house (lowest undefeated on the ladder).</summary>
        public CardDto CurrentTarget(string houseKey)
        {
            return database.Ladder(houseKey).FirstOrDefault(c => !_defeated.Contains(c.slug));
        }

        /// <summary>
        /// You can only engage a card once every weaker card in its house is down
        /// (weaker == higher cardValue == earlier on the ladder).
        /// </summary>
        public bool CanEngage(CardDto card)
        {
            if (card == null || _defeated.Contains(card.slug)) return false;
            return database.Cards
                .Where(c => c.houseKey == card.houseKey && c.cardValue > card.cardValue)
                .All(c => _defeated.Contains(c.slug));
        }

        /// <summary>Cards still guarding this target (must fall first).</summary>
        public List<CardDto> Bodyguards(CardDto card)
        {
            return database.Cards
                .Where(c => c.houseKey == card.houseKey && c.cardValue > card.cardValue && !_defeated.Contains(c.slug))
                .OrderByDescending(c => c.cardValue)
                .ToList();
        }

        public int RewardFor(CardDto card) => (14 - card.cardValue) * 5000;

        /// <summary>Record a kill. Returns reward paid, or -1 if the card was still guarded.</summary>
        public int Defeat(CardDto card)
        {
            if (!CanEngage(card)) return -1;

            _defeated.Add(card.slug);
            int reward = RewardFor(card);
            _totalBounty += reward;
            OnBountyCleared?.Invoke(card, reward);

            bool houseClear = database.Cards
                .Where(c => c.houseKey == card.houseKey)
                .All(c => _defeated.Contains(c.slug));
            if (houseClear) OnHouseCompleted?.Invoke(card.houseKey);

            return reward;
        }

        public float HouseProgress(string houseKey)
        {
            var ladder = database.Ladder(houseKey);
            if (ladder.Count == 0) return 0f;
            int done = ladder.Count(c => _defeated.Contains(c.slug));
            return (float)done / ladder.Count;
        }
    }
}
