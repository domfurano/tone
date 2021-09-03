class Orbital {
    constructor(radiansPerSecond, color, frequency, audioContext, audioDestination) {
        this.angle = 0;
        this.toneDuration = 3;
        this.radiansPerMove = radiansPerSecond / 60;
        this.color = color;
        this.audioContext = audioContext;
        this.oscillatorNode = audioContext.createOscillator();
        this.gainNode = audioContext.createGain();
        this.gainNode.gain.value = 0.001;
        this.oscillatorNode.frequency.value = frequency;
        this.oscillatorNode.connect(this.gainNode);
        this.gainNode.connect(audioDestination);
        this.oscillatorNode.start();
    }

    move() {
        this.angle = (this.angle + this.radiansPerMove) % Math.PI_2;
        this.setCoordinates();
    }

    setCoordinates() {
        this.x = this.externalCoords.x + this.externalRadius * Math.cos(this.angle);
        this.y = this.externalCoords.y + this.externalRadius * Math.sin(this.angle);
    }

    move2() {
        this.angle = ((this.angle * (1 - this.radiansPerMove) + Math.atan2(beta,gamma) * this.radiansPerMove)) % Math.PI_2;
        this.setCoordinates();
    }

    draw(visualContext) {
        // this.color.red = Math.min(255, Math.max(0, Math.floor(this.color.red * 0.97)));
        this.color.red = this.gainNode.gain.value * 1000;
        visualContext.fillStyle = this.color.toString();
        visualContext.beginPath();
        visualContext.arc(this.x, this.y, this.internalRadius, 0, Math.PI * 2);
        visualContext.closePath();
        visualContext.fill();
    }

    play() {
        if (this.gainNode.gain.value === 1) {
            this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + this.toneDuration);
        }
    }

    strike() {
        this.gainNode.gain.cancelScheduledValues(this.audioContext.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(1, 0);
        this.color.red = 0xff;
    }

}
