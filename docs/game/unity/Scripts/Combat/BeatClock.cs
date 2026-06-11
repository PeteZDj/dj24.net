using System;
using UnityEngine;

namespace DJ24.Game
{
    /// <summary>
    /// Drives the rhythm layer. Fires <see cref="OnBeat"/> on every beat of the
    /// level's track and exposes a timing window so abilities (stance transitions)
    /// can reward landing "on the beat".
    /// </summary>
    public class BeatClock : MonoBehaviour
    {
        [SerializeField, Range(40f, 220f)] private float bpm = 120f;
        [Tooltip("Seconds around a beat that still count as 'on beat'.")]
        [SerializeField] private float onBeatWindow = 0.12f;

        public event Action OnBeat;

        private double _secondsPerBeat;
        private double _nextBeatTime;

        public float Bpm
        {
            get => bpm;
            set { bpm = Mathf.Max(1f, value); _secondsPerBeat = 60.0 / bpm; }
        }

        private void Start()
        {
            _secondsPerBeat = 60.0 / Mathf.Max(1f, bpm);
            _nextBeatTime = AudioSettings.dspTime + _secondsPerBeat;
        }

        private void Update()
        {
            if (AudioSettings.dspTime >= _nextBeatTime)
            {
                OnBeat?.Invoke();
                _nextBeatTime += _secondsPerBeat;
            }
        }

        /// <summary>True if the current moment is within the on-beat timing window.</summary>
        public bool IsOnBeat()
        {
            double t = AudioSettings.dspTime;
            double prevBeat = _nextBeatTime - _secondsPerBeat;
            double toPrev = t - prevBeat;
            double toNext = _nextBeatTime - t;
            return Math.Min(toPrev, toNext) <= onBeatWindow;
        }
    }
}
