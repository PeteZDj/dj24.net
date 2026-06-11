namespace DJ24.Game
{
    /// <summary>The four Sick 52 houses (card suits).</summary>
    public enum Suit { Spades, Hearts, Clubs, Diamonds }

    /// <summary>The four DJ24 service branches the player fields.</summary>
    public enum Branch { SpaceForce, Army, Navy, Airforce }

    /// <summary>Two-stance sound combat.</summary>
    public enum Stance { Bass, Treble }

    /// <summary>Bounty difficulty bands, derived from card strength.</summary>
    public enum Difficulty { Standard, Medium, Hard, Elite, Apex }

    public static class GameTypes
    {
        // Web slug ("space-force") -> Branch enum.
        public static Branch BranchFromKey(string key)
        {
            switch (key)
            {
                case "space-force": return Branch.SpaceForce;
                case "army": return Branch.Army;
                case "navy": return Branch.Navy;
                case "airforce": return Branch.Airforce;
                default: return Branch.Army;
            }
        }

        public static Suit SuitFromKey(string key)
        {
            switch (key)
            {
                case "spades": return Suit.Spades;
                case "hearts": return Suit.Hearts;
                case "clubs": return Suit.Clubs;
                case "diamonds": return Suit.Diamonds;
                default: return Suit.Spades;
            }
        }

        public static Difficulty DifficultyFromKey(string key)
        {
            switch (key)
            {
                case "apex": return Difficulty.Apex;
                case "elite": return Difficulty.Elite;
                case "hard": return Difficulty.Hard;
                case "medium": return Difficulty.Medium;
                default: return Difficulty.Standard;
            }
        }

        /// <summary>Which DJ24 branch counters a given Sick 52 house.</summary>
        public static Branch CounterBranch(Suit suit)
        {
            switch (suit)
            {
                case Suit.Spades: return Branch.SpaceForce;
                case Suit.Clubs: return Branch.Army;
                case Suit.Diamonds: return Branch.Navy;
                case Suit.Hearts: return Branch.Airforce;
                default: return Branch.Army;
            }
        }
    }
}
