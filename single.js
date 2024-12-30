document.addEventListener('DOMContentLoaded', () => {
    class Node {
        constructor(data) {
            this.data = data;
            this.next = null;
        }
    }

    class LinkedList {
        constructor() {
            this.head = null;
        }

        createNode(data) {
            return new Node(data);
        }

        insertNode(data) {
            const newNode = this.createNode(data);
            if (!this.head) {
                this.head = newNode;
            } else {
                let current = this.head;
                while (current.next) {
                    current = current.next;
                }
                current.next = newNode;
            }
            this.updateStep(`Inserted node with value ${data}`);
            this.visualize();
        }

        deleteNode(data) {
            if (!this.head) {
                this.updateStep(`Cannot delete. List is empty.`);
                return;
            }

            if (this.head.data === data) {
                this.head = this.head.next;
                this.updateStep(`Deleted node with value ${data}`);
                this.visualize();
                return;
            }

            let current = this.head;
            let prev = null;

            while (current && current.data !== data) {
                prev = current;
                current = current.next;
            }

            if (current) {
                prev.next = current.next;
                this.updateStep(`Deleted node with value ${data}`);
            } else {
                this.updateStep(`Node with value ${data} not found.`);
            }
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

        traverseList() {
            const result = [];
            let current = this.head;

            while (current) {
                result.push(current.data);
                current = current.next;
            }

            this.updateStep(`Linked List: ${result.join(' -> ') || 'Empty'}`);
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
            stepsContainer.scrollTop = stepsContainer.scrollHeight; // Auto-scroll to the latest step
        }
    }

    const linkedList = new LinkedList();

    document.getElementById('createNode').addEventListener('click', () => {
        const value = prompt('Enter value for the node:');
        if (value !== null && !isNaN(value)) {
            linkedList.updateStep(`Creating node with value ${value}`);
            linkedList.insertNode(Number(value));
        }
    });

    document.getElementById('insertNode').addEventListener('click', () => {
        const value = prompt('Enter value to insert:');
        if (value !== null && !isNaN(value)) {
            linkedList.updateStep(`Inserting node with value ${value}`);
            linkedList.insertNode(Number(value));
        }
    });

    document.getElementById('deleteNode').addEventListener('click', () => {
        const value = prompt('Enter value to delete:');
        if (value !== null && !isNaN(value)) {
            linkedList.updateStep(`Attempting to delete node with value ${value}`);
            linkedList.deleteNode(Number(value));
        }
    });

    document.getElementById('traverseList').addEventListener('click', () => {
        linkedList.updateStep(`Traversing the linked list`);
        linkedList.traverseList();
    });

    document.getElementById('searchNode').addEventListener('click', () => {
        const value = prompt('Enter value to search:');
        if (value !== null && !isNaN(value)) {
            linkedList.updateStep(`Searching for node with value ${value}`);
            linkedList.searchNode(Number(value));
        }
    });
});
