class Scales {
    
    constructor() {
        this.majorPentatonicSemitones = [ 0, 2, 5, 9, 11 ];
        this.minorPentatonicSemitones = [ 0, 3, 5, 7, 10 ];
    }

    frequencyFromHalftones(baseFrequency, halftones) {
        let newFrequency = baseFrequency * Math.pow((Math.pow(2, 1 / 12)), halftones);
        return newFrequency;
    }

    pentatonicFrequencies(semitones, n) { 
        let frequencies = [];
        let i;
        for (i = 0; i < n; i++) {
            let remainder = i % semitones.length;
            let step = Math.floor(i / semitones.length);
            frequencies.push(
                this.frequencyFromHalftones(220, semitones[remainder] + (step * 12))
            );
        }
        return frequencies;
    }

}
