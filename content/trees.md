# Trees

## Topic Overview

Trees are used when data needs to be stored in a hierarchical structure.
- Unlike arrays or linked lists, trees:
- do not move in a straight line
- branch out
- represent parent–child relationships

This topic covers:
- why trees exist
- basic tree terminology
- binary trees
- tree traversals (DFS & BFS)

## Why Trees Exist?

Kaya the Lion and Biru the Monkey reach a large ancient tree at the center of the jungle.
Aro the Eagle lives at the top and manages information flow.
Aro explains:
Aro the Eagle:
“I don’t manage things in a straight line.”
“Everything has levels.”
He points down.
one main branch splits into smaller branches
those split again
and so on
Kaya looks closely.
Kaya the Lion:
“This isn’t a list.”
“It’s more like a family structure.”
Biru nods.
Biru the Monkey:
“That’s exactly what a tree is.”
“A structure where one thing leads to many others.”

## Core Idea of Trees

A tree is made of **nodes**.

Each node has:
- data
- references to child nodes

---

## Key Concepts

- **root** → top node  
- **child** → node below another  
- **parent** → node above  
- **leaf** → node with no children  

---

## Basic Shape

Basic shape:
       A
      /   \
     B     C
    / \
   D   E


## Binary Tree

### What It Is?

Biru explains:
Biru the Monkey:
“In some trees, a node can have at most two children.”
Kaya nods.
Kaya the Lion:
“Left and right.”
That structure is called a binary tree.

### Properties
- each node has 0, 1, or 2 children
- children are usually referred to as left and right
- no ordering rule is required

## Why Traversal Is Needed?

Kaya asks:
Kaya the Lion:
“How do I visit every node?”
“There’s no straight path.”
Biru replies:
Biru the Monkey:
“You need a rule to decide the visiting order.”
That rule is called tree traversal.

## Depth-First Traversal (DFS)

DFS goes as deep as possible before coming back.
There are three common DFS methods.

### Inorder Traversal

Rule: left --> root --> right

Story Explanation
Kaya visits:
left branch first
then the current node
then the right branch

### Pseudocode
    FUNCTION inorder(node):
        IF node is null:
            RETURN

        inorder(node.left)
        PROCESS node
        inorder(node.right)


### Preorder Traversal


Rule: root --> left --> right

Story Explanation
Kaya announces the current place first,
then explores children.

### Pseudocode

    FUNCTION preorder(node):
        IF node is null:
            RETURN

        PROCESS node
        preorder(node.left)
        preorder(node.right)


### Postorder Traversal

Rule: left --> right --> root

Story Explanation
Kaya finishes exploring children
before reporting the current node.

### Pseudocode

    FUNCTION postorder(node):
        IF node is null:
            RETURN

        postorder(node.left)
        postorder(node.right)
        PROCESS node


## Breadth-First Traversal (Level Order)

### Core Idea

Breadth-First Search (BFS) visits nodes level by level.
Aro explains:
Aro the Eagle:
“I check everything on one level before moving down.”
This traversal uses a queue.

### Pseudocode (BFS)

CREATE empty queue
ADD root to queue

    WHILE queue is not empty:
        current = REMOVE from queue
        PROCESS current

        IF current.left exists:
            ADD to queue

        IF current.right exists:
            ADD to queue


## DFS vs BFS Comparison

| Aspect     | DFS                 | BFS             |
|------------|---------------------|-----------------|
| Direction  | Depth-first         | Level-by-level  |
| Uses       | Recursion / Stack   | Queue           |
| Memory     | Less (usually)      | More            |
| Good for  | Structure exploration | Shortest paths |


## Common Mistakes

- forgetting base case (null)
- mixing traversal orders
- confusing tree with graph
- incorrect recursion
- Most tree bugs come from wrong traversal logic.

## When to Use Trees

- Trees are useful when:
- data has hierarchy
- parent–child relationship exists
- fast searching is required (BST, heaps)

### Common examples:
- file systems
- organization charts
- DOM structure
- decision trees

## Syntax Learning Resources

Once the concept is clear, Tavi the Pigeon arrives, clearly enthusiastic.
Tavi the Pigeon:
“Trees look complex, but the rules are simple.”
“Learn traversal well — everything else builds on it.”

[General](https://www.geeksforgeeks.org/binary-tree-data-structure/)

[C++ Trees](https://www.learncpp.com/cpp-tutorial/trees/)

[Python Trees](https://www.programiz.com/python-programming/tree)

[Python Binary Tree](https://www.geeksforgeeks.org/binary-tree-in-python/)

## Summary

- trees store data hierarchically
- binary trees limit children to two
- traversal defines visiting order
- DFS and BFS solve different needs