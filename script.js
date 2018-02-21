window.onload = function () {
    let canvas = document.getElementById('mainCanvas');
    let visualContext = canvas.getContext('2d');
    let audioContextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext ||  window.msAudioContext);
    let audioContext = new audioContextClass();

    let muted = false;
    let maxGain = 0.05;

    let masterGain = audioContext.createGain();
    masterGain.gain.value = maxGain;
    masterGain.connect(audioContext.destination);

    let orbitalCount = 10;

    let scales = new Scales();

    let orbitalFrequencies = scales.pentatonicFrequencies(scales.minorPentatonicSemitones, orbitalCount);

    let i;
    let colors = [];
    for (i = 0; i < orbitalCount; i++) {
        let blue = Math.floor(0xff * ((i + 1) / orbitalCount));
        let color = new Color(0, 0, blue, 1);
        colors.push(color);
    }

    let orbitals = [];
    for (i = 0; i < orbitalCount; i++) {
        let orbital = new Orbital(
            (i + 1) / 4,
            colors[colors.length - i - 1],
            orbitalFrequencies[orbitalFrequencies.length - i - 1],
            audioContext,
            masterGain
        );
        orbitals.push(orbital);
    }

    function animate() {
        window.requestAnimationFrame(animate);
        visualContext.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        orbitals.forEach(orbital => {
            orbital.move();
            orbital.draw(visualContext);
            orbital.play();
            let sine = Math.sin(orbital.angle);
            let cosine = Math.cos(orbital.angle);
            if (sine < 0.1 && sine > 0 && cosine > 0) {
                orbital.strike();
            }
        });
    }

    function drawBackground() {
        visualContext.fillStyle = '#000000';
        visualContext.fillRect(0, 0, canvas.width, canvas.height);
        visualContext.fill();
    }

    function click(event) {
        // orbitals.forEach(orbital => orbital.strike());
    }

    function mouseMove(event) {
        // MOUSE_X = event.clientX;
        // MOUSE_Y = event.clientY;
    }

    function keyDown(event) {
        // if (event.keyCode == 78) {
        //     circles.push(new Circle(MOUSE_X, MOUSE_Y));
        // }
    }

    function visibilityChange(event) {
        if (muted) {
            masterGain.gain.value = maxGain;
            muted = false;
        } else {
            masterGain.gain.value = 0;
            muted = true;
        }
    }

    function onResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        resetOrbitals();
    }

    function resetOrbitals() {
        let maxRadius = maxCanvasRadius();
        let intervalSize = maxRadius / orbitals.length;
        for (i = 0; i < orbitals.length; i++) {
            orbitals[i].internalRadius = intervalSize * ((orbitalCount - i) / orbitalCount);
            orbitals[i].externalRadius = maxRadius - (intervalSize * i);
            orbitals[i].externalCoords = {
                x: canvas.width / 2,
                y: canvas.height / 2
            };
        }
    }

    function maxCanvasRadius() {
        return Math.min(canvas.width, canvas.height) / 2;
    }

    window.onresize = onResize;
    window.addEventListener('click', click, false);
    window.addEventListener('mousemove', mouseMove, false);
    window.addEventListener('keydown', keyDown, false);
    document.addEventListener('visibilitychange', visibilityChange, false);

    onResize();
    window.requestAnimationFrame(animate);

};
