document.addEventListener('DOMContentLoaded', () => {
    let array = [];
    let phases = [];
    let interval;
    let isPaused = false;
    let speed = 1000;
    let pauseTime = 10000;

    const barsContainer = document.getElementById('bars-container');
    const phasesBoard = document.getElementById('phasesBoard');
    const arrayLengthInput = document.getElementById('arrayLength');
    const arrayValuesInput = document.getElementById('arrayValues');
    const generateArrayButton = document.getElementById('generateArray');
    const startSortButton = document.getElementById('startSort');
    const speedControl = document.getElementById('speedControl');
    const pauseResumeButton = document.getElementById('pauseResume');
    const pauseTimeInput = document.getElementById('pauseTime');

    generateArrayButton.addEventListener('click', generateArray);
    startSortButton.addEventListener('click', startHeapSort);
    speedControl.addEventListener('input', updateSpeed);
    pauseResumeButton.addEventListener('click', togglePause);
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

    function startHeapSort() {
        phases = [];
        heapSort(array);

        // Add the final sorted array to the phases
        phases.push({
            array: [...array],
            highlight: [],
            action: `Final Sorted Array: [${array.join(', ')}]`
        });

        showPhases();
    }

    function togglePause() {
        isPaused = !isPaused;
        pauseResumeButton.innerText = isPaused ? 'Resume' : 'Pause';
    }

    function heapSort(arr) {
        const n = arr.length;

        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            // Swap the root of the heap with the last element
            [arr[0], arr[i]] = [arr[i], arr[0]];
            phases.push({
                array: [...arr],
                highlight: [0, i],
                action: `Swapped ${arr[0]} and ${arr[i]}`
            });

            // Heapify the reduced heap
            heapify(arr, i, 0);
        }
    }

    function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        // Check if left child is larger than root
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        // Check if right child is larger than largest so far
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        // If largest is not root, swap and continue heapifying
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            phases.push({
                array: [...arr],
                highlight: [i, largest],
                action: `Swapped ${arr[i]} and ${arr[largest]}`
            });

            heapify(arr, n, largest);
        }
    }

    function showPhases() {
        let phaseIndex = 0;

        interval = setInterval(() => {
            if (phaseIndex < phases.length) {
                const phase = phases[phaseIndex];
                renderBars(phase.array);

                const bars = document.querySelectorAll('.step');
                bars.forEach(bar => bar.classList.remove('highlight'));
                phase.highlight.forEach(index => {
                    bars[index]?.classList.add('highlight');
                });

                phasesBoard.innerHTML += `<p>Phase ${phaseIndex + 1}: ${phase.action}</p>`;
                phaseIndex++;

                if (isPaused) {
                    clearInterval(interval);
                    return;
                }
            } else {
                clearInterval(interval);
                alert('Heap Sort Complete!');
            }
        }, speed+pauseTime);
    }
});