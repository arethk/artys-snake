class OrderedSoundPlayer {
    constructor(soundList) {
        if (Array.isArray(soundList) === false) {
            throw new Error("Invalid soundList, must be an array of HTML Sound Elements");
        }
        soundList.forEach(element => {
            if (element instanceof HTMLAudioElement === false) {
                throw new Error("Invalid soundList, must be an array of HTML Sound Elements");
            }
        });
        this.sounds = soundList;
        this.index = 0;
    }

    play() {
        let sound = this.sounds[this.index];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(error => {
                console.log('Sound playback failed:', error);
            });
            this.index++;
        } else {
            this.reset();
            this.play();
        }
    }

    reset() {
        this.index = 0;
    }
}