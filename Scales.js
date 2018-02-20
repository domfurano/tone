class Scales {
    
    constructor() {
        this.majorPentatonicHalftones = [ 0, 2, 5, 9, 11 ];
    }

    frequencyFromHalftones(baseFrequency, halftones) {
        let newFrequency = baseFrequency * Math.pow((Math.pow(2, 1 / 12)), halftones);
        return newFrequency;
    }

    majorPentatonicFrequencies(n) { 
        let frequencies = [];
        let i;
        for (i = 0; i < n; i++) {
            let remainder = i % this.majorPentatonicHalftones.length;
            let step = Math.floor(i / this.majorPentatonicHalftones.length);
            frequencies.push(
                this.frequencyFromHalftones(220, this.majorPentatonicHalftones[remainder] + (step * 12))
            );
        }
        return frequencies;
    }

}
