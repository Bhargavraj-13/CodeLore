# Recursion

## Topic Overview
Recursion is a way of solving a problem by breaking it into smaller versions of the same problem.

Instead of solving everything at once, recursion:
- solves a smaller part first
- uses that result to solve the bigger problem
- repeats this idea until the problem becomes very simple

This topic covers:
- why recursion exists
- how it works step by step
- base case and recursive case
- common mistakes

## Why do we need Recursion?

Kaya the Lion and Biru the Monkey are walking through a dense part of the jungle.
They reach a tall rock wall blocking the path.
Kaya looks up.
Kaya the Lion:
“This wall is too big. I can’t climb it in one go.”
Biru the Monkey points to the side.
Biru the Monkey:
“Look closely. The wall isn’t one big climb.”
“It’s made of many smaller steps.”
Kaya climbs one step… then another… then another.
After reaching the top, Kaya looks back.
Kaya the Lion:
“I didn’t solve the whole wall at once.”
“I just kept solving a smaller climb.”
Biru nods.
Biru the Monkey:
“That’s exactly why recursion exists.”

## Core Idea of Recursion

Recursion always has two parts:

Base case
    the simplest version of the problem
    where we stop

Recursive case
    the part where the problem calls itself
    with a smaller input

If either of these is missing, recursion fails.

## Simple Recursion Example

Biru gives Kaya a simple task.
Task: Count down from 3 to 1.
Kaya does this:

    say 3
    then say 2
    then say 1

stop
Biru explains:
    saying 3 depends on saying 2
    saying 2 depends on saying 1
    saying 1 is simple — no more work

This is recursion in action.

## Dry Run

Goal: Count down from n = 3
Steps:
    to handle 3 → first handle 2
    to handle 2 → first handle 1
    1 is simple → stop here

return back step by step
The work happens on the way down,
and results come back on the way up.

## Pseudocode

    FUNCTION countDown(n):

        IF n == 0:
            RETURN
            // base case: nothing left to do

        PRINT n
        // current work

        countDown(n - 1)
        // solve a smaller version of the same problem

### What’s happening:

- function keeps calling itself
- each call reduces the problem
- recursion stops at the base case

## Why Recursion Doesn’t Go Forever

Kaya asks:
Kaya the Lion:
“What stops this from running forever?”
Biru answers:
Biru the Monkey:
“Every call must move closer to the base case.”
“If it doesn’t, you fall into an infinite loop.”

Key rule:
Every recursive call must make the problem smaller.

## Common Mistakes in Recursion

- forgetting the base case
- base case is never reached
- reducing the problem incorrectly
- too many recursive calls
These mistakes often lead to:
- infinite recursion
- stack overflow
- wrong answers

## When to Use Recursion

Use recursion when:
- the problem naturally breaks into smaller problems
- the structure is repetitive
- clarity matters more than performance

Avoid recursion when:
- performance is critical
- deep recursion is required
- iteration is simpler

## Relation to Other Topics

Biru reminds Kaya:
Biru the Monkey:
“Recursion shows up everywhere.”
- tree traversal
- divide and conquer
- backtracking
- merge sort

Understanding recursion makes many topics easier.

## Syntax Learning Resources

Once the idea is clear, Tavi the Pigeon flies in, clearly excited.
Tavi the Pigeon:
“Nice! This is one of the most important ideas you’ll ever learn.”
“Now, if you want to write recursion in real code, start here.”

[General](https://www.geeksforgeeks.org/recursion/)

[C++](https://www.learncpp.com/cpp-tutorial/recursion/)

[Python](https://www.programiz.com/python-programming/recursion)

## Summary

- recursion solves problems by reducing them
- base case stops the recursion
- recursive case breaks the problem down
- every call must move toward the base case