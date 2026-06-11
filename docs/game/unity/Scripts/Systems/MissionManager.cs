using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace DJ24.Game
{
    /// <summary>
    /// Tracks the hand-authored campaign spine (missions.json). Missions complete
    /// in order; completing one pays its reward into the shared wallet.
    /// </summary>
    public class MissionManager : MonoBehaviour
    {
        [SerializeField] private GameDatabase database;

        public event Action<MissionDto> OnMissionCompleted;
        public event Action<int> OnWalletChanged;

        private readonly HashSet<string> _completed = new HashSet<string>();
        public int Wallet { get; private set; }

        private void Awake()
        {
            if (database != null) database.Build();
        }

        public IReadOnlyList<MissionDto> Missions =>
            database.Missions.OrderBy(m => m.no).ToList();

        public MissionDto CurrentMission =>
            Missions.FirstOrDefault(m => !_completed.Contains(m.id));

        public bool IsCompleted(string id) => _completed.Contains(id);

        public bool Complete(string id)
        {
            var mission = database.Missions.FirstOrDefault(m => m.id == id);
            if (mission == null || _completed.Contains(id)) return false;

            _completed.Add(id);
            if (mission.reward > 0)
            {
                Wallet += mission.reward;
                OnWalletChanged?.Invoke(Wallet);
            }
            OnMissionCompleted?.Invoke(mission);
            return true;
        }

        public void AddBounty(int amount)
        {
            if (amount <= 0) return;
            Wallet += amount;
            OnWalletChanged?.Invoke(Wallet);
        }
    }
}
