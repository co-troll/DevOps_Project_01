class Sound {
    constructor(parent) {
        this.parent = parent;
        this.sounds = [];
        this.muted = true;
    }
    create(src, id, loop = false) {
        let audio = document.createElement("audio");
        audio.src = src;
        audio.id = id;
        audio.muted = true;
        this.sounds.push(audio);
        this.parent.append(audio);
        if (loop) {
            audio.setAttribute("loop", "");
        }
        return audio;
    }
    soundSetting() {
        let soundItems = document.querySelectorAll(".sound-item");
        for (let soundItem of soundItems) {
            soundItem.addEventListener("click", (e) => {
                this.muteToggle();
            });
        }
    }
    muteToggle() {
        if (!this.muted) {
            for (let sound of this.sounds) {
                sound.muted = true;
            }
            document.querySelector("#sound-speaker").innerHTML = "\u{1F507}";
            document.querySelector("#sound-description").innerHTML = "off";
            this.muted = true;
        }
        else {
            for (let sound of this.sounds) {
                sound.muted = false;
            }
            document.querySelector("#sound-speaker").innerHTML = "\u{1F509}";
            document.querySelector("#sound-description").innerHTML = "on";
            this.muted = false;
        }
    }
    pause() {
        for (let sound of this.sounds) {
            sound.pause();
        }
    }
    play() {
        for (let sound of this.sounds) {
            sound.play();
        }
    }
}
let sound = new Sound(document.querySelector("#sound-div")), backgroundSound = sound.create("sounds/06 Tetris BGM 3.mp3", "background_sound", true), backgroundfastSound = sound.create("sounds/07 Tetris BGM 3 (Fast).mp3", "backgroundfast_sound", true), movesSound = sound.create("sounds/moves.mp3", "moves_sound"), dropSound = sound.create("sounds/drop.mp3", "drop_sound"), pointsSound = sound.create("sounds/points.mp3", "points_sound"), finishSound = sound.create("sounds/finish.mp3", "finish_sound"), allclearSound = sound.create("sounds/allclear.ogg", "allclear_sound"), clearlineSound = sound.create("sounds/clearline.ogg", "clearline_sound"), combo1Sound = sound.create("sounds/combo_1.ogg", "combo1_sound"), combo2Sound = sound.create("sounds/combo_2.ogg", "combo2_sound"), combo3Sound = sound.create("sounds/combo_3.ogg", "combo3_sound"), combo4Sound = sound.create("sounds/combo_4.ogg", "combo4_sound"), combo5Sound = sound.create("sounds/combo_5.ogg", "combo5_sound"), gameoverSound = sound.create("sounds/gameover.ogg", "gameover_sound"), harddropSound = sound.create("sounds/harddrop.ogg", "harddrop_sound"), holdSound = sound.create("sounds/hold.ogg", "hold_sound"), levelupSound = sound.create("sounds/levelup.ogg", "levelup_sound"), moveSound = sound.create("sounds/move.ogg", "move_sound"), rotateSound = sound.create("sounds/spin.ogg", "rotate_sound"), softdropSound = sound.create("sounds/softdrop.ogg", "softdrop_sound"), spinSound = sound.create("sounds/spin.ogg", "spin_sound");
sound.muteToggle();
sound.soundSetting();
