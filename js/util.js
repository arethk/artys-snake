class Util {
    static shuffle(array) {
        if (Array.isArray(array) === false) {
            throw "Argument must be an array";
        }
        let currentIndex = array.length;
        let randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }
}