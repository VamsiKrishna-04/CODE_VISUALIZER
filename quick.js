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
    startSortButton.addEventListener('click', startQuickSort);
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
    
    function startQuickSort() {
        phases = [];
        quickSort(array, 0, array.length - 1);
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

    function quickSort(arr, low, high) {
        if (low < high) {
            const pivotIndex = partition(arr, low, high);
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }

    function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;

        phases.push({
            array: [...arr],
            highlight: [high],
            action: `Choosing pivot ${pivot} at index ${high}`
        });

        for (let j = low; j < high; j++) {
            phases.push({
                array: [...arr],
                highlight: [j, high],
                action: `Comparing ${arr[j]} with pivot ${pivot}`
            });

            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                phases.push({
                    array: [...arr],
                    highlight: [i, j],
                    action: `Swapped ${arr[i]} and ${arr[j]}`
                });
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        phases.push({
            array: [...arr],
            highlight: [i + 1, high],
            action: `Placed pivot ${arr[i + 1]} at index ${i + 1}`
        });

        return i + 1;
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
                alert('Quick Sort Complete!');
            }
        }, speed+pauseTime);
    }
});
