# Linked_Lists

## Topic Overview

Linked Lists are used when:
- data needs to be connected, not stored together
- size changes frequently
- inserting or deleting elements should be easy

Unlike arrays, linked lists:
- do not store data in one continuous block
- use links to move from one element to the next

This topic covers:
- why linked lists exist
- singly linked lists
- doubly linked lists
- circular linked lists

## Why Linked Lists Exist?

Kaya the Lion and Biru the Monkey are helping Veko the Wolf, who manages a patrol route.
Veko explains:
Veko the Wolf:
“My patrol points keep changing.”
“Sometimes a new point is added.”
“Sometimes one is removed.”

Kaya draws the patrol points in a straight list, like an array.
    
    [ A | B | C | D ]

Veko shakes his head.
Veko the Wolf:
“When I remove B, everything after it shifts.”
“That wastes time.”
Kaya turns to Biru.
Kaya the Lion:
“So arrays aren’t good when things keep changing?”
Biru the Monkey:
“Exactly.”
“When you want flexibility, you don’t store data together.”
“You connect data instead.”
That idea leads to linked lists.

## Core Idea of Linked Lists

A linked list is made of nodes.
Each node contains:
data
a link to another node
Instead of indexes, we move using references.

Simple idea:
    
    [data | next] → [data | next] → [data | null]

Key points:
- nodes are not stored together
- traversal is required to reach elements
- insertion and deletion are easier than arrays

## Singly Linked List

### What It Is?

Veko shows Kaya a simple patrol route.
Veko the Wolf:
“Each point only knows the next point.”
That’s a singly linked list.
Each node knows:
its data
the next node
It does not know what comes before it.

### Dry Run

Route:

    A → B → C → D → null

Steps:

    start at A
    move to B
    move to C
    move to D
    stop when null is reached
    Traversal always starts from the head.

### Insertion Example

To insert X after B:
    point B.next to X
    point X.next to C
    No shifting required.

### Limitations

    cannot move backward
    finding a node takes time
    extra memory needed for links

## Doubly Linked List

### Why It Exists?

Veko now says:
Veko the Wolf:
“Sometimes I need to move forward.”
“Sometimes I need to move backward.”
Kaya realizes a problem.
Kaya the Lion:
“With a singly linked list, you can’t go back.”
Biru nods.
Biru the Monkey:
“Then each node must know both directions.”
That creates a doubly linked list.

### Structure

Each node has:
- data
- link to next node
- link to previous node
    null ← [prev | data | next] ↔ [prev | data | next] → null


### Benefits

- easy forward traversal
- easy backward traversal
- deletion is simpler (no need to track previous node manually)

### Trade-Off

- extra memory for an additional pointer
slightly more complex logic

## Circular Linked List

### Why It Exists?
Veko shows Kaya the night patrol route.
Veko the Wolf:
“When the last point is reached,
I go back to the first one.”
There is no end.
Kaya understands.
Kaya the Lion:
“So the last node should point back to the first.”
That forms a circular linked list.

### Structure

    A → B → C → D
    ↑             ↓
    ← ← ← ← ← ← ←

#### Key idea:

    last node does not point to null
    it points back to the head

### Where It’s Used
round-robin scheduling
continuous cycles
looping tasks

### Comparison of Linked List Types

| Type     | Can Move Forward | Can Move Backward | Has End |
|----------|------------------|-------------------|---------|
| Singly   | Yes              | No                | Yes     |
| Doubly   | Yes              | Yes               | Yes     |
| Circular | Yes              | Depends           | No      |


### Common Mistakes
- losing the head pointer
- incorrect link updates
- infinite loops in circular lists
- forgetting to handle empty lists
- Most linked list bugs come from pointer mistakes.

### When to Use Linked Lists
Use linked lists when:
- insertions and deletions are frequent
- size changes often
- memory does not need to be contiguous
Avoid linked lists when:
- random access is required
- cache performance matters
- indexing is important

### Pseudocode

    current = head

    WHILE current is not null:
        PROCESS current.data
        current = current.next

    This logic works for:
    singly linked list
    doubly linked list
    (Circular lists need a stopping condition.)

## Syntax Learning Resources
After understanding the idea, Tavi the Pigeon arrives, sounding upbeat.
Tavi the Pigeon:
“Linked lists look scary, but they’re just connections.”
“Learn the syntax slowly.”
[General](https://www.geeksforgeeks.org/data-structures/linked-list/)

[C++](https://www.learncpp.com/cpp-tutorial/linked-lists/)

[Python](https://www.programiz.com/python-programming/linked-list)

## Summary
- linked lists store data using links
- no indexing, traversal is required
- singly, doubly, and circular lists solve different needs
- insert/delete is easier than arrays