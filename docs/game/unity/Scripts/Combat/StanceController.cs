using System;
using UnityEngine;

namespace DJ24.Game
{
    /// <summary>
    /// Two-stance sound combat. BASS = heavy area control; TREBLE = fast single-target.
    /// Switching stance is a "transition" — landing it on the beat (via <see cref="BeatClock"/>)
    /// grants a damage multiplier for the next hit, the core combo mechanic.
    /// </summary>
    public class StanceController : MonoBehaviour
    {
        [SerializeField] private Stance stance = Stance.Treble;
        [SerializeField] private BeatClock beatClock;

        [Header("Tuning")]
        [SerializeField] private float onBeatTransitionBonus = 1.5f;
        [SerializeField] private float bassVsHeavy = 1.35f;   // Bass vs Clubs / Diamonds
        [SerializeField] private float trebleVsAgile = 1.35f; // Treble vs Hearts / Spades

        public event Action<Stance> OnStanceChanged;

        private bool _comboPrimed;

        public Stance Current => stance;

        public void Toggle() => SetStance(stance == Stance.Bass ? Stance.Treble : Stance.Bass);

        public void SetStance(Stance next)
        {
            if (next == stance) return;
            stance = next;
            // A transition landed on the beat primes the next hit.
            _comboPrimed = beatClock != null && beatClock.IsOnBeat();
            OnStanceChanged?.Invoke(stance);
        }

        /// <summary>Stance-vs-house affinity multiplier.</summary>
        public float AffinityAgainst(Suit house)
        {
            bool heavy = house == Suit.Clubs || house == Suit.Diamonds;
            if (stance == Stance.Bass) return heavy ? bassVsHeavy : 1f;
            return heavy ? 1f : trebleVsAgile; // Treble favors Hearts / Spades
        }

        /// <summary>Total stance multiplier for a hit; consumes the on-beat combo prime.</summary>
        public float ConsumeHitMultiplier(Suit house)
        {
            float mult = AffinityAgainst(house);
            if (_comboPrimed)
            {
                mult *= onBeatTransitionBonus;
                _comboPrimed = false;
            }
            return mult;
        }
    }
}
