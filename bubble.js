document.addEventListener('DOMContentLoaded', () => {
    let array = [];
    let phases = [];
    let interval;
    let isPaused = false;
    let speed = 1000;
    let pauseTime = 10000;
    let currentLevel = 1;

    const barsContainer = document.getElementById('bars-container');
    const phasesBoard = document.getElementById('phasesBoard');
    const arrayLengthInput = document.getElementById('arrayLength');
    const arrayValuesInput = document.getElementById('arrayValues');
    const generateArrayButton = document.getElementById('generateArray');
    const startSortButton = document.getElementById('startSort');
    const speedControl = document.getElementById('speedControl');
    const pauseResumeButton = document.getElementById('pauseResume');
    const pauseTimeInput = document.getElementById('pauseTime');

    // Event listeners
    generateArrayButton.addEventListener('click', generateArray);
    startSortButton.addEventListener('click', startSort);
    speedControl.addEventListener('input', updateSpeed);
    pauseResumeButton.addEventListener('click', togglePause);
    pauseTimeInput.addEventListener('input', updatePauseTime);

    // Function to generate random array or use user input
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
    }

    // Function to render the array as bars
    function renderBars(arr) {
        barsContainer.innerHTML = '';
        arr.forEach(value => {
            const bar = document.createElement('div');
            bar.classList.add('step');
            bar.style.height = `${value * 3}px`;
            bar.innerText = value; // Display the number inside the box
            barsContainer.appendChild(bar);
        });
    }

    // Function to update speed control
    function updateSpeed() {
        speed = speedControl.value;
        document.getElementById('speedValue').innerText = `${speed} ms`;
    }

    function updatePauseTime() {
        pauseTime = parseInt(pauseTimeInput.value);
        if (pauseTime < 500) pauseTime = 500; // Minimum pause time
        if (pauseTime > 10000) pauseTime = 10000; // Maximum pause time
    }


    // Function to start the sorting process
    function startSort() {
        if (currentLevel > 5) {
            alert('Maximum Level Reached! Restart to play again.');
            return;
        }

        pauseTime = currentLevel * 2000; // Each level increases pause time by 2 seconds
        speed = 10000 / currentLevel; // Adjust speed based on level

        phases = [];
        bubbleSort([...array]);
    }

    // Function to toggle pause and resume
    function togglePause() {
        isPaused = !isPaused;
        pauseResumeButton.innerText = isPaused ? 'Resume' : 'Pause';
    }

    // Bubble Sort with visualization and phases
    function bubbleSort(arr) {
        let n = arr.length;
        let sortedArr = [...arr];
        let phaseCounter = 0;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // Create a snapshot of the current state
                phases.push({
                    array: [...sortedArr],
                    highlight: [j, j + 1], // indices of the elements being compared
                    action: `Comparing ${sortedArr[j]} and ${sortedArr[j + 1]}`
                });

                // If elements are out of order, swap them
                if (sortedArr[j] > sortedArr[j + 1]) {
                    let temp = sortedArr[j];
                    sortedArr[j] = sortedArr[j + 1];
                    sortedArr[j + 1] = temp;

                    phases.push({
                        array: [...sortedArr],
                        highlight: [j, j + 1], // elements swapped
                        action: `Swapped ${sortedArr[j]} and ${sortedArr[j + 1]}`
                    });
                }
            }
        }

        // After sorting, display the final sorted array
        phases.push({
            array: [...sortedArr],
            highlight: [],
            action: `Sorted Array: ${sortedArr.join(', ')}`
        });

        // Display phases and control the timing
        showPhases();
    }

    // Function to display phases one by one with pauses
    function showPhases() {
        let phaseIndex = 0;

        interval = setInterval(() => {
            if (phaseIndex < phases.length) {
                const phase = phases[phaseIndex];
                renderBars(phase.array);

                // Highlight the elements in the current phase
                const bars = document.querySelectorAll('.step');
                phase.highlight.forEach(index => {
                    bars[index].classList.add('highlight');
                });

                phasesBoard.innerHTML += `<p>Phase ${phaseIndex + 1}: ${phase.action}</p>`;
                phaseIndex++;

                if (isPaused) {
                    clearInterval(interval);
                    return;
                }
            } else {
                clearInterval(interval);
                currentLevel++;
                alert(`Level ${currentLevel - 1} Complete!`);
            }
        }, speed + pauseTime);
    }
});
