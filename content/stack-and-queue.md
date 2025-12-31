Stacks_and_Queues

1. Topic Overview
Stacks and Queues are data structures used when the order of processing matters more than position.
They are useful when:
data must be processed in a specific order
random access is not required
insertion and removal follow strict rules
This topic covers:
why stacks and queues exist
stack (LIFO)
queue (FIFO)
comparisons and use cases

2. Why Stacks & Queues Exist?
Kaya the Lion and Biru the Monkey are helping Mala the Elephant, who manages jungle supplies.
Mala the Elephant shows a pile of wooden crates.
Mala the Elephant:
“These crates are kept one on top of another.”
“When I need one, I always take the top crate first.”
Kaya the Lion nods.
Kaya the Lion:
“You can’t take a crate from the middle without moving the ones above.”
Nearby, a line of animals is waiting for water.
Kurma the Tortoise is standing patiently at the front.
Kurma the Tortoise:
“Everyone waits their turn here.”
“Whoever comes first, drinks first.”
Kaya notices something.
Kaya the Lion:
“These are two different systems.”
“One works like a pile.”
“One works like a line.”
Biru the Monkey nods.
Biru the Monkey:
“And that’s why we use stacks and queues.”

3. Stack (Last In, First Out)
3.1 Core Idea
A stack follows the rule:
Last In, First Out (LIFO)
The last item added is the first item removed.
Common real-life examples:
stacked plates
books piled on a desk

3.2 Stack Operations
Mala the Elephant adds crates one by one.
adding a crate → place it on top
removing a crate → take the top one
The crates below remain untouched.

3.3 Common Stack Operations
push → add an element to the top
pop → remove the top element
peek / top → view the top element

3.4 Dry Run Example
Stack starts empty.
push(10)
push(20)
push(30)

Stack looks like:
30
20
10

Operations:
pop() → removes 30
peek() → returns 20

3.5 Pseudocode (Stack)
PUSH(x):
    add x to top

POP():
    remove and return top element

PEEK():
    return top element


3.6 Where Stacks Are Used
undo / redo functionality
function calls (call stack)
backtracking
expression evaluation

4. Queue (First In, First Out)
4.1 Core Idea
A queue follows the rule:
First In, First Out (FIFO)
The first item added is the first item removed.
Think of:
people standing in a line
task scheduling systems

4.2 Queue Operations
Kurma the Tortoise manages the water line.
new animal arrives → joins at the back
animal at the front gets water and leaves
No skipping is allowed.

4.3 Common Queue Operations
enqueue → add element to the back
dequeue → remove element from the front
front / peek → view the first element

4.4 Dry Run Example
Queue starts empty.
enqueue(10)
enqueue(20)
enqueue(30)

Queue looks like:
10 → 20 → 30

Operations:
dequeue() → removes 10
front() → returns 20

4.5 Pseudocode (Queue)
ENQUEUE(x):
    add x to rear

DEQUEUE():
    remove and return front element

FRONT():
    return front element


5. Stack vs Queue
Feature
Stack
Queue
Order
LIFO
FIFO
Insertion
Top
Rear
Removal
Top
Front
Analogy
Pile
Line


6. Common Mistakes
popping from an empty stack
dequeuing from an empty queue
confusing LIFO and FIFO
using the wrong structure for the problem

7. When to Use Which
Use Stack when:
the most recent action matters
undo-like behavior is required
recursion or backtracking is involved
Use Queue when:
order of arrival matters
fairness is required
scheduling or buffering is needed

8. Variations
Deque → insertion/removal from both ends
Circular Queue → efficient reuse of space
Priority Queue → highest priority served first

9. Syntax Learning Resources
After the idea is clear, Tavi the Pigeon shows up, sounding upbeat.
Tavi the Pigeon:
“These two structures appear everywhere.”
“Get comfortable with them early.”
General
https://www.geeksforgeeks.org/stack-data-structure/
https://www.geeksforgeeks.org/queue-data-structure/
C / C++
https://www.learncpp.com/cpp-tutorial/stacks/
https://en.cppreference.com/w/cpp/container/stack
https://en.cppreference.com/w/cpp/container/queue
Python
https://www.programiz.com/python-programming/stack
https://www.programiz.com/python-programming/queue

10. Summary
stacks follow LIFO
queues follow FIFO
both enforce strict order
choosing the right one simplifies logic