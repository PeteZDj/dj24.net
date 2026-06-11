using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace DJ24.Game
{
    /// <summary>
    /// Loads the canonical DJ24 / Sick-52 data exported from the website
    /// (scripts/export-game-data.mjs) and exposes runtime lookups.
    ///
    /// Setup: drag the exported JSON files (imported as TextAssets) into the
    /// matching fields in the Inspector, then call <see cref="Build"/> once at boot.
    /// </summary>
    [CreateAssetMenu(fileName = "GameDatabase", menuName = "DJ24/Game Database")]
    public class GameDatabase : ScriptableObject
    {
        [Header("Exported JSON (Assets/DJ24/Data)")]
        public TextAsset cardsJson;     // cards.json
        public TextAsset branchesJson;  // dj24-branches.json
        public TextAsset missionsJson;  // missions.json
        public TextAsset citiesJson;    // cities.json

        public CardDto[] Cards { get; private set; }
        public BranchDto[] Branches { get; private set; }
        public MissionDto[] Missions { get; private set; }
        public CityDto[] Cities { get; private set; }

        private Dictionary<string, CardDto> _cardBySlug;
        private Dictionary<string, BranchDto> _branchByKey;

        public void Build()
        {
            Cards = JsonHelper.FromJsonArray<CardDto>(cardsJson != null ? cardsJson.text : "");
            Branches = JsonHelper.FromJsonArray<BranchDto>(branchesJson != null ? branchesJson.text : "");
            Missions = JsonHelper.FromJsonArray<MissionDto>(missionsJson != null ? missionsJson.text : "");
            Cities = JsonHelper.FromJsonArray<CityDto>(citiesJson != null ? citiesJson.text : "");

            _cardBySlug = Cards.ToDictionary(c => c.slug, c => c);
            _branchByKey = Branches.ToDictionary(b => b.key, b => b);

            Debug.Log($"[GameDatabase] {Cards.Length} cards, {Branches.Length} branches, " +
                      $"{Missions.Length} missions, {Cities.Length} cities loaded.");
        }

        public CardDto GetCard(string slug)
        {
            if (_cardBySlug == null) Build();
            return _cardBySlug.TryGetValue(slug, out var c) ? c : null;
        }

        public BranchDto GetBranch(string key)
        {
            if (_branchByKey == null) Build();
            return _branchByKey.TryGetValue(key, out var b) ? b : null;
        }

        /// <summary>All 13 cards of a house, ordered as the most-wanted ladder: 10 -> ... -> 2 -> J -> Q -> K -> A.</summary>
        public List<CardDto> Ladder(string houseKey)
        {
            if (Cards == null) Build();
            return Cards.Where(c => c.houseKey == houseKey)
                        .OrderByDescending(c => c.cardValue) // 13 (10♠) first, 1 (Ace) last
                        .ToList();
        }

        public BranchDto CounterBranchFor(string houseKey)
        {
            if (Branches == null) Build();
            return Branches.FirstOrDefault(b => b.counters == houseKey);
        }
    }
}
