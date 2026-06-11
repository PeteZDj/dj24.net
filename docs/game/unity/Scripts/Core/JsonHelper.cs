using System;
using UnityEngine;

namespace DJ24.Game
{
    /// <summary>
    /// Unity's JsonUtility can't deserialize a top-level JSON array. This wraps the
    /// raw array text in an object so we can parse arrays exported from the website
    /// (cards.json, dj24-branches.json, missions.json, cities.json).
    /// </summary>
    public static class JsonHelper
    {
        [Serializable]
        private class Wrapper<T> { public T[] items; }

        public static T[] FromJsonArray<T>(string json)
        {
            if (string.IsNullOrWhiteSpace(json)) return Array.Empty<T>();
            string wrapped = "{\"items\":" + json.Trim() + "}";
            Wrapper<T> wrapper = JsonUtility.FromJson<Wrapper<T>>(wrapped);
            return wrapper != null && wrapper.items != null ? wrapper.items : Array.Empty<T>();
        }
    }
}
