# Backtracking
---
## Topic Overview

Backtracking is used when:
you must try all possible choices
each choice leads to more choices
wrong choices must be undone to try others
It is commonly used for:
- permutations
- combinations
- puzzles like mazes and sudoku

## The Situation
Kaya the Lion and Biru the Monkey meet Tavi the Pigeon, who looks unusually serious.
Tavi places three different chillies on the ground.
Tavi the Pigeon:
“These chillies burn differently.”
“I don’t want to eat them just once.”
Kaya the Lion looks confused.
Kaya the Lion:
“What do you want then?”
Tavi the Pigeon:
“I want to eat them in every possible order.”
“No order should repeat.”
“No order should be missed.”
Kaya immediately starts thinking.
Kaya the Lion:
“Red–Green–Yellow…”
“Red–Yellow–Green…”
“Wait… did I already say that?”
He stops.
Kaya the Lion:
“This is getting messy.”
“I’ll forget some orders or repeat them.”
Kaya turns to Biru the Monkey.
Kaya the Lion:
“How do I try every possible way without losing track?”

## Note
Before Biru answers, he stops Kaya.
Biru the Monkey:
“To solve this properly, you must already understand recursion.”
“If you don’t know how problems break into smaller versions of themselves, go learn that first.”
Why this matters:
Backtracking is built on top of recursion.
If recursion is unclear, backtracking will feel impossible.
If you understand:
base case
recursive calls
returning from calls
then continue.

## Core Idea of Backtracking
Biru now explains.
Biru the Monkey:
“Don’t try everything at once.”
“Make one choice.”
“See where it leads.”
“When you’re done, undo it.”
That process is called backtracking.
In simple words:
choose
explore
undo
choose again

## Understanding the Problem Clearly
Problem:
Generate all possible orders of 3 chillies.
Let the chillies be:
[R, G, Y]

Rules:
each chilli must be used exactly once
order matters
all possible orders are required

## Dry Run
Biru guides Kaya carefully.

### Step 1: 
    Choose the first chilli
    Biru the Monkey:
    “Pick one chilli for the first position.”
    Kaya picks R.
    Remaining chillies:
    [G, Y]


### Step 2: 
    Solve the smaller problem (Recursion)
    Biru the Monkey:
    “Now do the same thing for what remains.”
    Kaya forms:
    R G Y
    R Y G
    Both are complete orders.

### Step 3:
    Undo the choice (Backtracking)
    Biru the Monkey:
    “Now undo what you chose.”
    Kaya removes R from the first position.
    This step is critical.

### Step 4:
    Try another choice
    Kaya picks G first.
    Remaining:
    [R, Y]
    Orders formed:
    G R Y
    G Y R

### Step 5:
    Undo again and continue
    Undo G.
    Pick Y.
    Orders:
    Y R G
    Y G R

Now every possible order is generated.

## What Just Happened (Clear Difference)
Recursion handled the depth of the problem
Backtracking handled undoing choices
Every path was explored
No duplicates
No missing cases
Concept
Role
Recursion
Breaks the problem into smaller problems
Backtracking
Reverses choices to explore alternatives


## Pseudocode
    FUNCTION generateOrders(currentOrder, remaining):

        IF remaining is empty:
            OUTPUT currentOrder
            RETURN

        FOR each item in remaining:

            ADD item to currentOrder
            // choose

            generateOrders(currentOrder, remaining - item)
            // explore (recursion)

            REMOVE item from currentOrder
            // undo (backtracking)


## Common Mistakes
forgetting to undo a choice
modifying shared data incorrectly
missing the base case
mixing recursion and backtracking logic
These mistakes cause wrong or incomplete results.

## When to Use Backtracking
Use backtracking when:
all solutions are needed
choices branch at every step
constraints must be respected
Typical problems:
permutations
combinations
maze paths
sudoku

## Syntax Learning Resources
Once the idea is clear, Tavi the Pigeon shows up, slightly excited.
Tavi the Pigeon:
“If this finally made sense, you’re on the right track.”
“Now learn how to write it in real code.”

[General](https://www.geeksforgeeks.org/backtracking-algorithms/)

[C++ Recursion](https://www.learncpp.com/cpp-tutorial/recursion/)

[C++](https://en.cppreference.com/w/cpp/container/vector)

[Python-Recursion](https://www.programiz.com/python-programming/recursion)

[Python-Backtracking](https://www.programiz.com/python-programming/backtracking)


## Summary
backtracking explores all possible choices
recursion handles problem depth
undoing choices is mandatory
recursion understanding comes first