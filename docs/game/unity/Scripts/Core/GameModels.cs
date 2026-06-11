using System;

namespace DJ24.Game
{
    // ----- Maps 1:1 to the JSON exported by scripts/export-game-data.mjs -----
    // These are plain serializable DTOs parsed by JsonUtility. Keep field names
    // identical to the JSON keys.

    [Serializable]
    public class CardDto
    {
        public string slug;
        public string name;
        public string title;
        public string role;
        public string tier;
        public string suit;       // "spades" | "hearts" | "clubs" | "diamonds"
        public string card;       // "A", "K", "Q", "J", "2".."10"
        public string cardLabel;  // e.g. "A♠"
        public int cardValue;     // 1 = strongest (Ace) ... 13 = weakest (10)
        public string image;      // relative URL on the website, optional for the game
        public string houseKey;
        public string houseName;
        public string suitSymbol;
        public string suitColor;
    }

    [Serializable]
    public class BranchMemberDto
    {
        public string slug;
        public string name;
        public int hour;
        public string role;
        public string squad;
        public string image;
    }

    [Serializable]
    public class BranchDto
    {
        public string key;      // "space-force" | "army" | "navy" | "airforce"
        public string name;
        public string icon;
        public string color;
        public string domain;
        public string desc;
        public string counters; // suit key this branch counters
        public BranchMemberDto[] members;
    }

    [Serializable]
    public class MissionTargetDto
    {
        public string slug;
        public string name;
        public string cardLabel;
    }

    [Serializable]
    public class MissionDto
    {
        public string id;
        public string act;
        public int no;
        public string title;
        public bool boss;
        public string city;
        public string cityName;
        public string branch;
        public string objective;
        public string brief;
        public int reward;
        public MissionTargetDto[] targets;
    }

    [Serializable]
    public class CityDto
    {
        public string slug;
        public string name;
    }
}
