const COLS = 10;
const ROWS = 25;
const LINE_PER_LEVELS = 10;
const NO_OF_HIGH_SCORES = 9;
const BLOCK_SIZE = 30;
const BORDER_SIZE = BLOCK_SIZE / 20;
const COLORS = [
    'white',
    'cyan',
    'blue',
    'orange',
    'yellow',
    'lime',
    'purple',
    'red',
];
const SHAPES = [
    [],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0],
    ],
    [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0],
    ],
    [
        [4, 4],
        [4, 4],
    ],
    [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0],
    ],
    [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0],
    ],
    [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0],
    ],
];
var KEY;
(function (KEY) {
    KEY[KEY["LSHIFT"] = 16] = "LSHIFT";
    KEY[KEY["LCTRL"] = 17] = "LCTRL";
    KEY[KEY["LALT"] = 18] = "LALT";
    KEY[KEY["ESC"] = 27] = "ESC";
    KEY[KEY["SPACE"] = 32] = "SPACE";
    KEY[KEY["LEFT"] = 37] = "LEFT";
    KEY[KEY["RIGHT"] = 39] = "RIGHT";
    KEY[KEY["DOWN"] = 40] = "DOWN";
    KEY[KEY["P"] = 80] = "P";
})(KEY || (KEY = {}));
var ROTATION;
(function (ROTATION) {
    ROTATION[ROTATION["LEFT"] = 0] = "LEFT";
    ROTATION[ROTATION["RIGHT"] = 1] = "RIGHT";
})(ROTATION || (ROTATION = {}));
const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    SOFT_DROP: 1,
    HARD_DROP: 2,
};
const LEVEL = {
    0: 800,
    1: 720,
    2: 630,
    3: 550,
    4: 470,
    5: 380,
    6: 300,
    7: 220,
    8: 130,
    9: 100,
    10: 80,
    11: 80,
    12: 80,
    13: 70,
    14: 70,
    15: 70,
    16: 50,
    17: 50,
    18: 50,
    19: 30,
    20: 30,
};
