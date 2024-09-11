class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }

};

class LinkedList {
    constructor(head = null) {
        this.head = head;
        this.tail = head;
    }

    display() {
        let current = this.head;
        while (current != null) {
            console.log(`${current.value}`);
            current = current.next;
        }
    }

    checkHead() {
        if (this.head == null) return false;
        return true;
    }

    append(value) {
        let newNode = new Node(value);
        if (this.head == null) {
            this.head = newNode;
            this.tail = this.head;
        }
        else {
            this.tail.next = newNode;
            this.tail = this.tail.next;
        }
        return true;
    }

    prepend(value) {
        let newNode = new Node(value);
        if (!this.checkHead()) { //if head null, return false, need to insert beginning
            this.head = newNode;
        }
        else {
            let tempHold = this.head;
            newNode.next = tempHold;
            this.head = newNode;
        }
        return true;
    }

    size() {
        return this._sizeHelper(this.head);
    }

    _sizeHelper(current) {
        if (current.next === null) return 1;
        return 1 + this._sizeHelper(current.next);
    }

    first() {
        if (!this.checkHead()) return null;
        else {
            return this.head.value;
        }
    }

    last() {
        if (!this.checkHead()) return null;
        else {
            return this.tail.value;
        }
    }

    at(index) {
        let sizeOfList = this.size();
        if (index < 0 || index >= sizeOfList) return false;
        let checker = 0;
        let current = this.head;
        while (checker != index) {
            current = current.next;
            ++checker;
        }
        return current.value;
    }

    pop() {
        if (this.head == null) return 0;
        if (this.head.next == null) {
            let val = this.head.value;
            this.head = null;
            this.tail = null;
            return val;
        }
        return this._popHelper(this.head);
    }
    _popHelper(current) {
        if (current.next.next === null) {
            // return current.next.next
            let val = current.next.value;
            current.next = null;
            this.tail = current;
            return val;
        }
        else {
            return this._popHelper(current.next);
        }
    }

    contains(value) {
        if (this.head === null) return false;
        return this._containsHelper(this.head, value);
    }
    _containsHelper(current, value) {
        if (current === null) {
            return false;
        }
        else if (current.value === value) {
            return true;
        }
        return this._containsHelper(current.next, value);
    }

    find(value) {
        if (this.head === null) return null;
        if (this.contains(value)) {
            //if value is in list, get index. 
            let index = 0;
            let current = this.head;
            while (current != null && current.value != value) {
                ++index;
                current = current.next;
            }
            return index;
        }
        else {
            return null;
        }
    }

    //I think if list is empty, we should insert at beginning, and if index too big, we insert at end? 
    insertAt(value, index) {
        let newNode = new Node(value);
        if (this.head === null) {
            this.head = newNode;
            if (this.tail === null) this.tail = newNode;
            return true;
        }
        else if (index >= this.size()) {
            this.tail.next = newNode;
            this.tail = this.tail.next;
            return true;
        }
        else {
            let current = this.head;
            let prev = null;
            let checkIndex = 0;
            while (current != null && checkIndex != index) {
                prev = current;
                current = current.next;
                ++checkIndex;
            }
            newNode.next = current;
            prev.next = newNode;
        }
    }

    removeAt(index) {
        if (this.head === null) {
            return false;
        }
        if (index >= this.size() || index < 0) {
            return false;
        }
        if (index === 0) {
            this.head = this.head.next;
            if (this.head === null) {
                this.tail = null;
            }
            return true;
        }
        else if (index == this.size() - 1) {
            this.pop();
            return true;
        }
        else {
            let current = this.head;
            let prev = null;
            let checkIndex = 0;
            while (current != null && checkIndex != index) {
                prev = current;
                current = current.next;
                ++checkIndex;
            }
            if (prev !== null) {
                prev.next = current.next;
            }
            return true;
        }
    }
};

let LLL = new LinkedList();
LLL.append(3);
LLL.append(5);
LLL.prepend(4);
LLL.prepend(10);
LLL.append(100);
LLL.append(1000);
// let node1 = new LinkedList(3);
// let node2 = new LinkedList(5);
// console.log(LinkedList.display());
LLL.display();
// let size = LLL.size(); 
console.log(`This is the size of list ${LLL.size()}`);
console.log(`This is first item of list: ${LLL.first()}`);
console.log(`This is last item of list: ${LLL.last()}`);
let index = LLL.at(3);
console.log(`This is value at that index: ${index}`);
// LLL.pop();
// LLL.display();
let testContains = LLL.contains(15);
if (testContains) {
    console.log("There is no value in the list");
}
else {
    console.log("The value exists in the list");
}
console.log(LLL.find(1000));
let linkedList = new LinkedList();
linkedList.append(3);
linkedList.append(5);
linkedList.append(7);
linkedList.append(9);

console.log(linkedList.removeAt(2)); // Removes the node with value 7
console.log(linkedList.removeAt(0)); // Removes the head node (value 3)
console.log(linkedList.removeAt(3)); // Attempt to remove an out-of-bounds index (returns false)

linkedList.display(); // Outputs: 5, 9
// let linkedList = new LinkedList();
// linkedList.insertAt(3, 0); // Insert at the beginning (index 0)
// linkedList.insertAt(5, 1); // Insert at index 1
// linkedList.insertAt(2, 1); // Insert at index 1 (between 3 and 5)
// linkedList.insertAt(7, 5); // Insert at the end since index 5 is greater than the size of the list

// linkedList.display(); // Outputs: 3, 2, 5, 7




// // example uses class syntax - adjust as necessary
// const list = new LinkedList();

// list.append("dog");
// list.append("cat");
// list.append("parrot");
// list.append("hamster");
// list.append("snake");
// list.append("turtle");
// console.log(list.toString());