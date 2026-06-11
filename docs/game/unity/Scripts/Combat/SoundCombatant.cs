using System;
using UnityEngine;

namespace DJ24.Game
{
    /// <summary>
    /// A basic health entity for the player and Sick 52 enemies. Bind an enemy to a
    /// <see cref="CardDto"/> so its toughness scales with card strength.
    /// </summary>
    public class SoundCombatant : MonoBehaviour
    {
        [SerializeField] private float maxHealth = 100f;
        [SerializeField] private string boundCardSlug; // optional: enemy's card

        public event Action<float, float> OnHealthChanged; // (current, max)
        public event Action OnDeath;

        public float Health { get; private set; }
        public float MaxHealth => maxHealth;
        public bool IsAlive => Health > 0f;
        public string BoundCardSlug => boundCardSlug;

        private void Awake() => Health = maxHealth;

        /// <summary>Scale this enemy's HP from its card (Ace = toughest).</summary>
        public void ConfigureFromCard(CardDto card, float baseHp = 80f, float perStep = 40f)
        {
            boundCardSlug = card.slug;
            // cardValue: 1 (Ace) -> 13 (10). Invert so Aces get the most HP.
            maxHealth = baseHp + (13 - card.cardValue) * perStep;
            Health = maxHealth;
            OnHealthChanged?.Invoke(Health, maxHealth);
        }

        public void TakeDamage(float amount)
        {
            if (!IsAlive || amount <= 0f) return;
            Health = Mathf.Max(0f, Health - amount);
            OnHealthChanged?.Invoke(Health, maxHealth);
            if (Health <= 0f) OnDeath?.Invoke();
        }

        public void Heal(float amount)
        {
            if (!IsAlive || amount <= 0f) return;
            Health = Mathf.Min(maxHealth, Health + amount);
            OnHealthChanged?.Invoke(Health, maxHealth);
        }
    }
}
