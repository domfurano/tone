class Orbital {

    constructor(radiansPerSecond, color, frequency, audioContext, audioDestination) {
        this.angle = 0;
        this.radiansPerMove = radiansPerSecond / 60;
        this.color = color;

        this.oscillatorNode = audioContext.createOscillator();
        this.gainNode = audioContext.createGain();
        this.oscillatorNode.frequency.value = frequency;
        this.gainNode.gain.value = 0;
        this.oscillatorNode.connect(this.gainNode);
        this.gainNode.connect(audioDestination);
        this.oscillatorNode.start();
    }

    move() {
        this.angle = (this.angle + this.radiansPerMove) % (Math.PI * 2);
        this.x = this.externalCoords.x + this.externalRadius * Math.cos(this.angle);
        this.y = this.externalCoords.y + this.externalRadius * Math.sin(this.angle);
    }

    draw(visualContext) {
        visualContext.fillStyle = this.color.toString();
        visualContext.beginPath();
        visualContext.arc(this.x, this.y, this.internalRadius, 0, Math.PI * 2);
        visualContext.closePath();
        visualContext.fill();
    }

    play() {
        this.gain *= 0.9;
        this.gainNode.gain.value = this.gain;

        this.color.red = Math.min(255, Math.max(0, Math.floor(this.color.red * 0.99)));
    }

    strike() {
        this.gain = 1;
        this.gainNode.gain.value = this.gain;

        this.color.red = 0xff;
    }

}
