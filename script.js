// alpha: rotation around z-axis
let alpha = 0;
// gamma: left to right
let gamma = 0;
// beta: front back motion
let beta = 0;

document.addEventListener("DOMContentLoaded", function (event) {
    Math.PI_2 = Math.PI * 2;
    let canvas = document.getElementById('canvas');
    let visualContext = canvas.getContext('2d');

    let audioContextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
    let audioContext = new audioContextClass();

    let maxGain = 0.05;

    let masterGain = audioContext.createGain();
    masterGain.gain.value = maxGain;
    masterGain.connect(audioContext.destination);

    let orbitalCount = 12;

    let scales = new Scales();

    let orbitalFrequencies = scales.getFrequencies(scales.minorPentatonicSemitones, orbitalCount);

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
            (i + 1) * (1 / 3),
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
            // orbital.move();
            orbital.move2();
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
        audioContext.resume();
    }

    function mouseMove(event) {
        audioContext.resume();
    }

    function keyDown(event) {
        audioContext.resume();
    }

    function mouseDown(event) {
        audioContext.resume();
    }

    function onResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        resetOrbitals();
    }

    function touchEnd() {
        audioContext.resume();
        if (typeof DeviceOrientationEvent !== undefined && typeof DeviceOrientationEvent.requestPermission === 'function') {
            // (optional) Do something before API request prompt.
            DeviceOrientationEvent.requestPermission()
                .then(response => {
                    // (optional) Do something after API prompt dismissed.
                    if (response === 'granted') {
                        window.addEventListener('deviceorientation', (event) => {
                            // alpha: rotation around z-axis
                            alpha = event.alpha;
                            // gamma: left to right
                            gamma = event.gamma;
                            // beta: front back motion
                            beta = event.beta;
                        }, true);
                    }
                })
                .catch(console.error);
        } else {
            alert("DeviceMotionEvent is not defined");
        }
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
    window.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('touchend', touchEnd, false);

    onResize();
    window.requestAnimationFrame(animate);

});
