using UnityEngine;

namespace DJ24.Game
{
    /// <summary>
    /// The player's currently fielded DJ24 branch. Each branch counters one Sick 52
    /// house; fielding the counter branch grants a damage bonus.
    /// </summary>
    public class BranchLoadout : MonoBehaviour
    {
        [SerializeField] private Branch activeBranch = Branch.Army;

        [Tooltip("Damage multiplier when the active branch counters the target's house.")]
        [SerializeField] private float counterBonus = 1.5f;

        public Branch ActiveBranch => activeBranch;

        public void SetBranch(Branch branch) => activeBranch = branch;

        public bool Counters(Suit targetHouse) =>
            GameTypes.CounterBranch(targetHouse) == activeBranch;

        public float DamageMultiplierAgainst(Suit targetHouse) =>
            Counters(targetHouse) ? counterBonus : 1f;

        public float DamageMultiplierAgainst(CardDto target) =>
            DamageMultiplierAgainst(GameTypes.SuitFromKey(target.suit));
    }
}
