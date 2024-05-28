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
let sound = new Sound(document.querySelector("#sound-div")), backgroundSound = sound.create("sounds/Dungeon_Theme.mp3", "background_sound", true), movesSound = sound.create("sounds/moves.mp3", "moves_sound"), dropSound = sound.create("sounds/drop.mp3", "drop_sound"), pointsSound = sound.create("sounds/points.mp3", "points_sound"), finishSound = sound.create("sounds/finish.mp3", "finish_sound");
sound.muteToggle();
sound.soundSetting();
