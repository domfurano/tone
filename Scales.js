class Scales {
    constructor() {
        this.majorPentatonicSemitones = [0, 2, 5, 9, 11];
        this.minorPentatonicSemitones = [0, 3, 5, 7, 10];
    }

    frequencyFromHalftones(baseFrequency, halftones) {
        let newFrequency = baseFrequency * Math.pow((Math.pow(2, 1 / 12)), halftones);
        if (newFrequency > 2000) {
            throw new Error(`Scales Error: Frequency ${newFrequency} is too high for human comfort.`);
        }
        return newFrequency;
    }

    getFrequencies(semitones, n) {
        let frequencies = [];
        for (let i = 0; i < n; i++) {
            let remainder = i % semitones.length;
            let step = Math.floor(i / semitones.length);
            let frequency = this.frequencyFromHalftones(220, semitones[remainder] + (step * 12));
            frequencies.push(frequency);
        }
        return frequencies;
    }
}
