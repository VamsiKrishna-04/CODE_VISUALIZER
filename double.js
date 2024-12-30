document.addEventListener('DOMContentLoaded', () => {
    class Node {
        constructor(data) {
            this.data = data;
            this.next = null;
            this.prev = null;
        }
    }

    class DoublyLinkedList {
        constructor() {
            this.head = null;
            this.tail = null;
        }

        createNode(data) {
            return new Node(data);
        }

        insertNode(data) {
            const newNode = this.createNode(data);
            if (!this.head) {
                this.head = this.tail = newNode;
            } else {
                this.tail.next = newNode;
                newNode.prev = this.tail;
                this.tail = newNode;
            }
            this.updateStep(`Inserted node with value ${data}`);
            this.visualize();
        }

        deleteNode(data) {
            if (!this.head) {
                this.updateStep(`Cannot delete. List is empty.`);
                return;
            }

            let current = this.head;

            while (current && current.data !== data) {
                current = current.next;
            }

            if (!current) {
                this.updateStep(`Node with value ${data} not found.`);
                return;
            }

            if (current === this.head) {
                this.head = this.head.next;
                if (this.head) this.head.prev = null;
            } else if (current === this.tail) {
                this.tail = this.tail.prev;
                if (this.tail) this.tail.next = null;
            } else {
                current.prev.next = current.next;
                current.next.prev = current.prev;
            }

            this.updateStep(`Deleted node with value ${data}`);
            this.visualize();
        }

        searchNode(data) {
            let current = this.head;
            let index = 0;

            while (current) {
                if (current.data === data) {
                    this.updateStep(`Node with value ${data} found at position ${index}`);
                    return;
                }
                current = current.next;
                index++;
            }

            this.updateStep(`Node with value ${data} not found.`);
        }

        traverseForward() {
            const result = [];
            let current = this.head;

            while (current) {
                result.push(current.data);
                current = current.next;
            }

            this.updateStep(`Traversed Forward: ${result.join(' <-> ') || 'Empty'}`);
        }

        traverseBackward() {
            const result = [];
            let current = this.tail;

            while (current) {
                result.push(current.data);
                current = current.prev;
            }

            this.updateStep(`Traversed Backward: ${result.join(' <-> ') || 'Empty'}`);
        }

        visualize() {
            const listContainer = document.getElementById('list-container');
            listContainer.innerHTML = '';

            let current = this.head;
            while (current) {
                const nodeDiv = document.createElement('div');
                nodeDiv.classList.add('node');
                nodeDiv.innerText = current.data;
                listContainer.appendChild(nodeDiv);

                current = current.next;
            }
        }

        updateStep(message) {
            const stepsContainer = document.getElementById('steps-container');
            const stepElement = document.createElement('p');
            stepElement.innerText = message;
            stepsContainer.appendChild(stepElement);
            stepsContainer.scrollTop = stepsContainer.scrollHeight; // Auto-scroll to latest step
        }
    }

    const doublyLinkedList = new DoublyLinkedList();

    document.getElementById('createNode').addEventListener('click', () => {
        const value = prompt('Enter value for the node:');
        if (value !== null && !isNaN(value)) {
            doublyLinkedList.updateStep(`Creating node with value ${value}`);
            doublyLinkedList.insertNode(Number(value));
        }
    });

    document.getElementById('insertNode').addEventListener('click', () => {
        const value = prompt('Enter value to insert:');
        if (value !== null && !isNaN(value)) {
            doublyLinkedList.updateStep(`Inserting node with value ${value}`);
            doublyLinkedList.insertNode(Number(value));
        }
    });

    document.getElementById('deleteNode').addEventListener('click', () => {
        const value = prompt('Enter value to delete:');
        if (value !== null && !isNaN(value)) {
            doublyLinkedList.updateStep(`Attempting to delete node with value ${value}`);
            doublyLinkedList.deleteNode(Number(value));
        }
    });

    document.getElementById('traverseForward').addEventListener('click', () => {
        doublyLinkedList.updateStep(`Traversing the list forward.`);
        doublyLinkedList.traverseForward();
    });

    document.getElementById('traverseBackward').addEventListener('click', () => {
        doublyLinkedList.updateStep(`Traversing the list backward.`);
        doublyLinkedList.traverseBackward();
    });

    document.getElementById('searchNode').addEventListener('click', () => {
        const value = prompt('Enter value to search:');
        if (value !== null && !isNaN(value)) {
            doublyLinkedList.updateStep(`Searching for node with value ${value}`);
            doublyLinkedList.searchNode(Number(value));
        }
    });
});
