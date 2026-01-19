class OrderedSoundPlayer {
    constructor(soundList) {
        const errorMsg = "Invalid soundList, must be an array of at least one HTML Sound Element";
        if (Array.isArray(soundList) === false || soundList.length === 0) {
            throw new Error(errorMsg);
        }
        soundList.forEach(element => {
            if (element instanceof HTMLAudioElement === false) {
                throw new Error(errorMsg);
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