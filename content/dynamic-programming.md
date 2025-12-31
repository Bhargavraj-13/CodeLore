# Dynamic Programming

## Topic Overview

Dynamic Programming (DP) is used when:
The same subproblems are solved again and again
Solving them repeatedly wastes time
remembering past results makes the solution faster
DP is about:
breaking a problem into smaller parts
saving answers of those parts
reusing them instead of recomputing

## Where is DP used

After helping Tavi the Pigeon with chillies, Kaya the Lion feels confident.
Soon, Kaya and Biru the Monkey reach a long jungle trail with many checkpoints.
Each checkpoint has a cost to cross.
The costs are written in order:
    
    [1, 3, 1, 5, 1]

Kaya is told:
Biru the Monkey:
“You must reach the end.”
“You can move forward one step or two steps at a time.”
“Your goal is to spend the least total energy.”
Kaya starts thinking.

## Why is DP better than Recursion

Kaya Tries the Recursive Way First

Kaya says:
Kaya the Lion:
“I’ll try all possible paths.”
“From here, I can move one step or two steps.”
He starts breaking the problem:
cost to reach step 5 depends on step 4 and step 3
cost to reach step 4 depends on step 3 and step 2
cost to reach step 3 depends on step 2 and step 1
Very soon, Kaya notices something.
Kaya the Lion:
“Wait…”
“I’m calculating the cost for step 2 again.”
“And again.”
“And again.”
He looks tired.

## The Key Insight

Biru watches quietly, then interrupts.
Biru the Monkey:
“You are solving the same problem many times.”
“Why are you forgetting the answers?”
Kaya pauses.
Kaya the Lion:
“So… every time I reach a step,
I recompute the cost from scratch.”
Biru nods.
Biru the Monkey:
“That’s the problem.”
“If a question has already been answered once,
remember it.”
This is where Dynamic Programming begins.

## Core Idea of Dynamic Programming

Dynamic Programming is built on two ideas:
Overlapping subproblems
the same smaller problems appear again and again
Optimal substructure
the best answer to a big problem depends on best answers to smaller problems
DP simply means:
Solve once. Store it. Reuse it.

## Dry Run

Let’s track the minimum cost to reach each step.
Costs:

    [1, 3, 1, 5, 1]

Biru guides Kaya.

    cost to reach step 0 → 1
    cost to reach step 1 → 3

Now:

    cost to reach step 2
    = cost[2] + min(step 0, step 1)
    = 1 + min(1, 3) = 2
    cost to reach step 3
    = 5 + min(3, 2) = 7
    cost to reach step 4
    = 1 + min(2, 7) = 3

Kaya reaches the end without recomputing anything.

## What Changed from Recursion

Kaya asks:
Kaya the Lion:
“I’m still breaking the problem into smaller ones.”
“So what’s different?”
Biru explains:
Approach
What happens
Recursion
Same subproblem solved many times
Backtracking
Explores all paths
Dynamic Programming
Solves once and remembers

DP is not a new idea —
it is recursion done smartly.

## Two Ways to Do DP

Biru explains there are two common styles.

1. Top-Down (Memoization)
start from the big problem
use recursion
store answers when computed
“Think first, remember later.”

2. Bottom-Up (Tabulation)
start from the smallest problems
build answers step by step
no recursion needed
“Build from the ground up.”

## Pseudocode

    dp[0] = cost[0]
    dp[1] = cost[1]

    FOR i from 2 to n-1:
        dp[i] = cost[i] + MIN(dp[i-1], dp[i-2])

    RETURN dp[n-1]

    What this means:
    each step uses previously stored answers
    nothing is recomputed
    time is saved

## Common Mistakes in DP

- jumping to DP without understanding recursion
- not identifying overlapping subproblems
- storing unnecessary states
- wrong base cases
- Most DP confusion comes from skipping the thinking phase.

## When to Use Dynamic Programming

**Use DP when:**
- recursion feels slow
- same subproblems repeat
- optimal answers are required

**Classic DP problems:**
- climbing stairs
- knapsack
- minimum path sum
- longest subsequence

## Syntax Learning Resources

After everything clicks, Tavi the Pigeon shows up, clearly excited again.

Tavi the Pigeon:
“If recursion made sense and this felt cleaner,
you’re doing it right.”
“Now learn how to write DP properly.”

[General](https://www.geeksforgeeks.org/dynamic-programming/)

[C++](https://www.learncpp.com/cpp-tutorial/dynamic-memory-allocation/)

[Python](https://www.programiz.com/python-programming/dynamic-programming)

## Summary

DP avoids repeated work
results are stored and reused
recursion + memory = DP
understanding recursion is mandatory