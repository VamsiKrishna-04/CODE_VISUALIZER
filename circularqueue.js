document.addEventListener('DOMContentLoaded', () => {
    let circularQueue = [];
    let front = -1;
    let rear = -1;
    let maxSize = 0;

    const listContainer = document.getElementById('list-container');
    const stepsContainer = document.getElementById('steps-container');
    const maxSizeInput = document.getElementById('maxSize');
    const setMaxSizeButton = document.getElementById('setMaxSize');
    const enqueueButton = document.getElementById('enqueue');
    const dequeueButton = document.getElementById('dequeue');
    const peekFrontButton = document.getElementById('peekFront');
    const peekRearButton = document.getElementById('peekRear');
    const isEmptyButton = document.getElementById('isEmpty');
    const isFullButton = document.getElementById('isFull');

    // Helper to update steps
    function logStep(step) {
        const stepElement = document.createElement('p');
        stepElement.innerText = step;
        stepsContainer.appendChild(stepElement);
    }

    // Helper to visualize the queue
    function renderQueue() {
        listContainer.innerHTML = '';
        if (front === -1) return;

        const size = circularQueue.length;
        for (let i = 0; i < size; i++) {
            const angle = (360 / size) * i;
            const element = document.createElement('div');
            element.classList.add('circular-queue-element');
            element.style.transform = `rotate(${angle}deg) translate(120px) rotate(-${angle}deg)`;

            const index = (front + i) % size;
            element.innerText = circularQueue[index] !== undefined ? circularQueue[index] : '';
            listContainer.appendChild(element);
        }
    }

    // Initialize queue
    setMaxSizeButton.addEventListener('click', () => {
        const size = parseInt(maxSizeInput.value);
        if (isNaN(size) || size <= 0) {
            alert('Please enter a valid size.');
            return;
        }
        
        maxSize = size;
        circularQueue = new Array(maxSize);
        front = rear = -1;
        logStep(`Circular queue initialized with size ${maxSize}.`);
        enqueueButton.disabled = dequeueButton.disabled = peekFrontButton.disabled = peekRearButton.disabled = isEmptyButton.disabled = isFullButton.disabled = false;
    });

    // Enqueue operation
    enqueueButton.addEventListener('click', () => {
        const value = prompt('Enter a value to enqueue:');
        if (value === null || value.trim() === '') return;

        if ((rear + 1) % maxSize === front) {
            logStep('Queue is full! Cannot enqueue.');
            alert('Queue Overflow');
            return;
        }

        if (front === -1) front = 0;
        rear = (rear + 1) % maxSize;
        circularQueue[rear] = value;
        logStep(`Enqueued ${value} at position ${rear}.`);
        renderQueue();
    });

    // Dequeue operation
    dequeueButton.addEventListener('click', () => {
        if (front === -1) {
            logStep('Queue is empty! Cannot dequeue.');
            alert('Queue Underflow');
            return;
        }

        const dequeuedValue = circularQueue[front];
        circularQueue[front] = undefined;

        if (front === rear) {
            front = rear = -1;
        } else {
            front = (front + 1) % maxSize;
        }

        logStep(`Dequeued ${dequeuedValue} from position ${front === -1 ? 'last position' : front}.`);
        renderQueue();
    });

    // Peek front operation
    peekFrontButton.addEventListener('click', () => {
        if (front === -1) {
            logStep('Queue is empty! No front element.');
            alert('Queue is Empty');
        } else {
            logStep(`Front element is ${circularQueue[front]}.`);
            alert(`Front element: ${circularQueue[front]}`);
        }
    });

    // Peek rear operation
    peekRearButton.addEventListener('click', () => {
        if (rear === -1) {
            logStep('Queue is empty! No rear element.');
            alert('Queue is Empty');
        } else {
            logStep(`Rear element is ${circularQueue[rear]}.`);
            alert(`Rear element: ${circularQueue[rear]}`);
        }
    });

    // Check if queue is empty
    isEmptyButton.addEventListener('click', () => {
        if (front === -1) {
            logStep('Queue is empty.');
            alert('Queue is Empty');
        } else {
            logStep('Queue is not empty.');
            alert('Queue is not Empty');
        }
    });

    // Check if queue is full
    isFullButton.addEventListener('click', () => {
        if ((rear + 1) % maxSize === front) {
            logStep('Queue is full.');
            alert('Queue is Full');
        } else {
            logStep('Queue is not full.');
            alert('Queue is not Full');
        }
    });
});
