using System.Linq;
using UnityEngine;

namespace DJ24.Game
{
    /// <summary>
    /// Drop this on an empty GameObject, assign a GameDatabase asset (with the JSON
    /// TextAssets wired up), and press Play. It loads the data and runs a headless
    /// simulation of one house-hunt so you can verify the whole pipeline end to end.
    /// </summary>
    [RequireComponent(typeof(DeckManager), typeof(MissionManager), typeof(BranchLoadout))]
    public class GameBootstrap : MonoBehaviour
    {
        [SerializeField] private GameDatabase database;
        [SerializeField] private string demoHouse = "clubs";

        private DeckManager _deck;
        private MissionManager _missions;
        private BranchLoadout _loadout;

        private void Awake()
        {
            _deck = GetComponent<DeckManager>();
            _missions = GetComponent<MissionManager>();
            _loadout = GetComponent<BranchLoadout>();
        }

        private void Start()
        {
            if (database == null)
            {
                Debug.LogError("[GameBootstrap] Assign a GameDatabase asset first.");
                return;
            }
            database.Build();

            LogBranches();
            LogCampaign();
            SimulateHunt(demoHouse);
        }

        private void LogBranches()
        {
            Debug.Log("=== DJ24 BRANCHES ===");
            foreach (var b in database.Branches)
                Debug.Log($"{b.icon} {b.name} — {b.domain} (counters {b.counters}) :: " +
                          string.Join(", ", b.members.Select(m => m.name)));
        }

        private void LogCampaign()
        {
            Debug.Log("=== CAMPAIGN ===");
            foreach (var m in database.Missions.OrderBy(m => m.no))
                Debug.Log($"#{m.no} [{m.act}] {m.title}{(m.boss ? " (BOSS)" : "")} @ {m.cityName} — {m.objective}");
        }

        private void SimulateHunt(string houseKey)
        {
            var counter = database.CounterBranchFor(houseKey);
            if (counter != null) _loadout.SetBranch(GameTypes.BranchFromKey(counter.key));

            Debug.Log($"=== HUNTING {houseKey.ToUpper()} as {_loadout.ActiveBranch} ===");

            _deck.OnBountyCleared += (card, reward) =>
            {
                _missions.AddBounty(reward);
                Debug.Log($"  CLEARED {card.cardLabel} {card.name}  +${reward:n0}  (wallet ${_missions.Wallet:n0})");
            };
            _deck.OnHouseCompleted += key => Debug.Log($"  HOUSE COMPLETE: {key}");

            foreach (var card in database.Ladder(houseKey))
            {
                float mult = _loadout.DamageMultiplierAgainst(card);
                Debug.Log($"  Engaging {card.cardLabel} {card.name} " +
                          $"(counter x{mult:0.0}, guards: {_deck.Bodyguards(card).Count})");
                _deck.Defeat(card);
            }

            Debug.Log($"=== DONE. Total bounty earned: ${_deck.TotalBountyEarned:n0} ===");
        }
    }
}
