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
    

    // Event listeners
    generateArrayButton.addEventListener('click', generateArray);
    startSortButton.addEventListener('click', startMergeSort);
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
        speed = speedControl.value;
        document.getElementById('speedValue').innerText = `${speed} ms`;
    }

    function updatePauseTime() {
        pauseTime = parseInt(pauseTimeInput.value);
        if (pauseTime < 500) pauseTime = 500; // Minimum pause time
        if (pauseTime > 10000) pauseTime = 10000; // Maximum pause time
    }

    function startMergeSort() {
        phases = [];
        mergeSort([...array], 0);

        // Add final sorted array to the phases
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

    function mergeSort(arr, offset) {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = mergeSort(arr.slice(0, mid), offset);
        const right = mergeSort(arr.slice(mid), offset + mid);

        return merge(left, right, offset);
    }

    function merge(left, right, offset) {
        const merged = [];
        let i = 0, j = 0;

        while (i < left.length && j < right.length) {
            phases.push({
                array: [...array],
                highlight: [offset + i, offset + left.length + j],
                action: `Comparing ${left[i]} and ${right[j]} in [${array.join(', ')}]`
            });

            if (left[i] <= right[j]) {
                merged.push(left[i++]);
            } else {
                merged.push(right[j++]);
            }
        }

        while (i < left.length) {
            merged.push(left[i++]);
        }

        while (j < right.length) {
            merged.push(right[j++]);
        }

        for (let k = 0; k < merged.length; k++) {
            array[offset + k] = merged[k];
            phases.push({
                array: [...array],
                highlight: [offset + k],
                action: `Setting ${merged[k]} at position ${offset + k} in [${array.join(', ')}]`
            });
        }

        return merged;
    }

    function showPhases() {
        let phaseIndex = 0;

        interval = setInterval(() => {
            if (phaseIndex < phases.length) {
                const phase = phases[phaseIndex];
                renderBars(phase.array);

                const bars = document.querySelectorAll('.step');
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
                alert('Merge Sort Complete!');
            }
        }, speed+pauseTime);
    }
});
