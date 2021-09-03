class Color {
    constructor(red, green, blue, alpha) {
        if (red < 0 || red > 255 ||
            green < 0 || green > 255 ||
            blue < 0 || blue > 255 ||
            alpha < 0 || alpha > 1) {
            throw new Error('Color Error: illegal argument(s)');
        }
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    toString() {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }
}
