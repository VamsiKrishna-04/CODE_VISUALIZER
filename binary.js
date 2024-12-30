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
    startSearchButton.addEventListener('click', startBinarySearch);
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
            array = inputValues.sort((a, b) => a - b);
        } else {
            array = [];
            for (let i = 0; i < length; i++) {
                array.push(Math.floor(Math.random() * 100) + 1);
            }
            array.sort((a, b) => a - b); // Ensure the array is sorted
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

    function startBinarySearch() {
        const target = parseInt(searchValueInput.value);
        if (isNaN(target)) {
            alert('Please enter a valid search value.');
            return;
        }

        phases = [];
        binarySearch(array, target);

        showPhases();
    }

    function binarySearch(arr, target) {
        let low = 0;
        let high = arr.length - 1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);

            phases.push({
                array: [...arr],
                highlight: [low, mid, high],
                action: `Phase ${phases.length + 1}: Dividing the array into two halves.`,
                details: `Low index (${low}): ${arr[low]}, Mid index (${mid}): ${arr[mid]}, High index (${high}): ${arr[high]}.`
            });

            if (arr[mid] === target) {
                phases.push({
                    array: [...arr],
                    highlight: [mid],
                    action: `Phase ${phases.length + 1}: Found the target!`,
                    details: `Target ${target} found at index ${mid}.`
                });
                return;
            } else if (arr[mid] < target) {
                phases.push({
                    array: [...arr],
                    highlight: [mid],
                    action: `Phase ${phases.length + 1}: Target is greater than ${arr[mid]}.`,
                    details: `Moving the low pointer to ${mid + 1}.`
                });
                low = mid + 1;
            } else {
                phases.push({
                    array: [...arr],
                    highlight: [mid],
                    action: `Phase ${phases.length + 1}: Target is smaller than ${arr[mid]}.`,
                    details: `Moving the high pointer to ${mid - 1}.`
                });
                high = mid - 1;
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
                bars.forEach(bar => bar.classList.remove('low', 'mid', 'high'));
                if (phase.highlight[0] !== undefined) bars[phase.highlight[0]]?.classList.add('low');
                if (phase.highlight[1] !== undefined) bars[phase.highlight[1]]?.classList.add('mid');
                if (phase.highlight[2] !== undefined) bars[phase.highlight[2]]?.classList.add('high');

                phasesBoard.innerHTML += `
                    <p>
                        <strong>${phase.action}</strong><br>
                        ${phase.details}
                    </p>`;
                currentPhaseIndex++;
            } else {
                clearInterval(interval);
                alert('Binary Search Complete!');
            }
        }, speed + pauseTime);
    }

    function togglePauseResume() {
        isPaused = !isPaused;
        pauseResumeButton.textContent = isPaused ? 'Resume' : 'Pause';
    }
});
