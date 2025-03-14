const State = {
  memArr: [], // Memory array
  userArr: [], // User input array
  level: 1,
  isStrict: false, // Strict mode: True - Hints On | False - Hints Off
  clicks: 0,
  isStarted: false,
  score: 0,
  memViewTime: 40000, // Total memory view time
  inputTime: Infinity, // Total input time | Infinity - No time limit, till level 5 | 10000 - 10 seconds
  lives: 1,
  isMemViewActive: false, // Memory view active: True - Yes | False - No
  flashModes: ["flash", "flash-reverse", "flash-ignore"],
  boxPositions: {},
  currFlashMode: null,
};

export default State;