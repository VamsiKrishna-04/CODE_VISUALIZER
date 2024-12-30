document.addEventListener('DOMContentLoaded', () => {
    class Queue {
        constructor(maxSize = 10) {
            this.queue = [];
            this.maxSize = maxSize;
        }

        setMaxSize(size) {
            this.maxSize = size;
            this.queue = []; // Reset the queue when size is set
            this.updateStep(`Queue size set to ${size}.`);
            this.visualize();
        }

        enqueue(value) {
            if (this.isFull()) {
                this.updateStep(`Queue Overflow! Cannot enqueue ${value}.`);
                return;
            }
            this.queue.push(value);
            this.updateStep(`Enqueued ${value} to the queue.`);
            this.visualize();
        }

        dequeue() {
            if (this.isEmpty()) {
                this.updateStep('Queue Underflow! Cannot dequeue.');
                return;
            }
            const dequeuedValue = this.queue.shift();
            this.updateStep(`Dequeued ${dequeuedValue} from the queue.`);
            this.visualize();
        }

        peek() {
            if (this.isEmpty()) {
                this.updateStep('Queue is Empty. Nothing to peek.');
                return;
            }
            this.updateStep(`Front element is ${this.queue[0]}.`);
        }

        isEmpty() {
            const isEmpty = this.queue.length === 0;
            this.updateStep(`Queue is ${isEmpty ? 'Empty' : 'Not Empty'}.`);
            return isEmpty;
        }

        isFull() {
            const isFull = this.queue.length >= this.maxSize;
            this.updateStep(`Queue is ${isFull ? 'Full' : 'Not Full'}.`);
            return isFull;
        }

        visualize() {
            const listContainer = document.getElementById('list-container');
            listContainer.innerHTML = ''; // Clear existing elements

            this.queue.forEach((value) => {
                const element = document.createElement('div');
                element.classList.add('queue-element');
                element.innerText = value;
                listContainer.appendChild(element);
            });
        }

        updateStep(message) {
            const stepsContainer = document.getElementById('steps-container');
            const stepElement = document.createElement('p');
            stepElement.innerText = message;
            stepsContainer.appendChild(stepElement);
            stepsContainer.scrollTop = stepsContainer.scrollHeight; // Auto-scroll to the latest step
        }
    }

    let queue = null;

    document.getElementById('setMaxSize').addEventListener('click', () => {
        const maxSizeInput = document.getElementById('maxSize').value;
        const maxSize = parseInt(maxSizeInput);

        if (isNaN(maxSize) || maxSize <= 0) {
            alert('Please enter a valid positive number for the queue size.');
            return;
        }

        queue = new Queue(maxSize);

        // Enable controls
        document.getElementById('enqueue').disabled = false;
        document.getElementById('dequeue').disabled = false;
        document.getElementById('peek').disabled = false;
        document.getElementById('isEmpty').disabled = false;
        document.getElementById('isFull').disabled = false;

        queue.updateStep(`Initialized queue with a maximum size of ${maxSize}.`);
    });

    document.getElementById('enqueue').addEventListener('click', () => {
        if (!queue) {
            alert('Please set the maximum queue size first.');
            return;
        }
        const value = prompt('Enter a value to enqueue:');
        if (value !== null && value.trim() !== '') {
            queue.enqueue(value);
        }
    });

    document.getElementById('dequeue').addEventListener('click', () => {
        if (!queue) {
            alert('Please set the maximum queue size first.');
            return;
        }
        queue.dequeue();
    });

    document.getElementById('peek').addEventListener('click', () => {
        if (!queue) {
            alert('Please set the maximum queue size first.');
            return;
        }
        queue.peek();
    });

    document.getElementById('isEmpty').addEventListener('click', () => {
        if (!queue) {
            alert('Please set the maximum queue size first.');
            return;
        }
        queue.isEmpty();
    });

    document.getElementById('isFull').addEventListener('click', () => {
        if (!queue) {
            alert('Please set the maximum queue size first.');
            return;
        }
        queue.isFull();
    });
});
