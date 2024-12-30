document.addEventListener('DOMContentLoaded', () => {
    let array = [];
    let phases = [];
    let interval;
    let pauseTime = 10000;
    let isPaused = false;
    let currentPhaseIndex = 0;
    let speed = 500;

    const barsContainer = document.getElementById('bars-container');
    const phasesBoard = document.getElementById('phasesBoard');
    const arrayLengthInput = document.getElementById('arrayLength');
    const arrayValuesInput = document.getElementById('arrayValues');
    const searchValueInput = document.getElementById('searchValue');
    const generateArrayButton = document.getElementById('generateArray');
    const startSearchButton = document.getElementById('startSearch');
    const pauseResumeButton = document.getElementById('pauseResume');
    const speedControl = document.getElementById('speedControl');
    const pauseTimeInput = document.getElementById('pauseTime');

    // Event listeners
    generateArrayButton.addEventListener('click', generateArray);
    startSearchButton.addEventListener('click', startLinearSearch);
    pauseResumeButton.addEventListener('click', togglePauseResume);
    speedControl.addEventListener('input', updateSpeed);
    pauseTimeInput.addEventListener('input', updatePauseTime);

    function generateArray() {
        const length = parseInt(arrayLengthInput.value);
        const inputValues = arrayValuesInput.value
            .split(',')
            .map(num => parseInt(num.trim()))
            .filter(num => !isNaN(num));

        if (inputValues.length === length) {
            array = inputValues;
        } else {
            array = [];
            for (let i = 0; i < length; i++) {
                array.push(Math.floor(Math.random() * 100) + 1);
            }
        }

        renderBars(array);
        phases = [];
        phasesBoard.innerHTML = '';
        currentPhaseIndex = 0;
        clearInterval(interval);
    }

    function renderBars(arr) {
        barsContainer.innerHTML = '';
        arr.forEach(value => {
            const bar = document.createElement('div');
            bar.classList.add('step');
            bar.style.height = `${value * 3}px`;
            bar.innerText = value;
            barsContainer.appendChild(bar);
        });
    }

    function updateSpeed() {
        speed = parseInt(speedControl.value);
        document.getElementById('speedValue').innerText = `${speed} ms`;
    }

    function updatePauseTime() {
        pauseTime = parseInt(pauseTimeInput.value);
        if (pauseTime < 500) pauseTime = 500; // Minimum pause time
        if (pauseTime > 10000) pauseTime = 10000; // Maximum pause time
    }

    function startLinearSearch() {
        const target = parseInt(searchValueInput.value);
        if (isNaN(target)) {
            alert('Please enter a valid search value.');
            return;
        }

        phases = [];
        linearSearch(array, target);

        showPhases();
    }

    function linearSearch(arr, target) {
        for (let i = 0; i < arr.length; i++) {
            phases.push({
                array: [...arr],
                highlight: [i],
                action: `Phase ${phases.length + 1}: Checking element at index ${i}.`,
                details: `Comparing ${arr[i]} with the target ${target}.`
            });

            if (arr[i] === target) {
                phases.push({
                    array: [...arr],
                    highlight: [i],
                    action: `Phase ${phases.length + 1}: Target found!`,
                    details: `Target ${target} found at index ${i}.`
                });
                return;
            }
        }

        phases.push({
            array: [...arr],
            highlight: [],
            action: `Phase ${phases.length + 1}: Search complete.`,
            details: `Target ${target} not found in the array.`
        });
    }

    function showPhases() {
        clearInterval(interval);
        interval = setInterval(() => {
            if (isPaused) return; // Skip rendering if paused

            if (currentPhaseIndex < phases.length) {
                const phase = phases[currentPhaseIndex];
                renderBars(phase.array);

                const bars = document.querySelectorAll('.step');
                bars.forEach(bar => bar.classList.remove('highlight'));
                if (phase.highlight[0] !== undefined) bars[phase.highlight[0]]?.classList.add('highlight');

                phasesBoard.innerHTML += `
                    <p>
                        <strong>${phase.action}</strong><br>
                        ${phase.details}
                    </p>`;
                currentPhaseIndex++;
            } else {
                clearInterval(interval);
                alert('Linear Search Complete!');
            }
        }, speed + pauseTime);
    }

    function togglePauseResume() {
        isPaused = !isPaused;
        pauseResumeButton.textContent = isPaused ? 'Resume' : 'Pause';
    }
});
