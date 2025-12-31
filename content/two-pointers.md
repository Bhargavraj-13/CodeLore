# Two Pointers

## Topic Overview

Two Pointers is a technique used when:
- you need to process data from both ends
- or maintain a moving range inside a list or string
- Instead of using nested loops, two pointers help:
- reduce time complexity
- keep logic clean
- avoid unnecessary re-checking

This topic covers:
- left–right two pointers
- sliding window (a special case of two pointers)

Why do we need Two Pointers method?

Kaya the Lion and Biru the Monkey are helping Kurma the Tortoise, who guards a long bridge.
The bridge has stones with numbers written on them:
    
    [1, 2, 3, 4, 6, 8, 9]

Kurma says:
Kurma the Tortoise:
“I want to know if there are two stones whose numbers add up to 10.”
Kaya starts thinking the usual way.
Kaya the Lion:
“I’ll take the first stone and add it with every other stone.”
“Then I’ll move to the next stone and do the same.”
Biru immediately stops him.
Biru the Monkey:
“That will work, but it’s slow.”
“The stones are already in order.”
“Why not use that?”

## Core Idea of Two Pointers

Biru explains in simple terms.
Instead of:
fixing one element
checking all others
we use two pointers:
one at the start
one at the end
Then:
adjust pointers based on the result
move inward
This avoids unnecessary work.

## Left–Right Two Pointers

Problem
    
    Find two numbers whose sum is 10.

Array:
    
    [1, 2, 3, 4, 6, 8, 9]


Step-by-Step
    Left pointer → 1
    Right pointer → 9
    Sum = 1 + 9 = 10

Kaya the Lion:
“That was immediate.”
Kurma nods.

**Example**

    Target = 7
    Left → 1, Right → 9 → sum 10 (too big)
    → move right pointer left
    Left → 1, Right → 6 → sum 7
    → found

### Why Pointer Movement Works

Biru explains:
- If sum is too large, decrease it by moving the right pointer left
- If sum is too small, increase it by moving the left pointer right
- This works because the list is sorted.

### Pseudocode (Left–Right)

    left = 0
    right = last index

    WHILE left < right:

        sum = array[left] + array[right]

        IF sum == target:
            RETURN true

        ELSE IF sum < target:
            left = left + 1
            // need a bigger sum

        ELSE:
            right = right - 1
            // need a smaller sum

    RETURN false


### When Left–Right Two Pointers Are Used

- sorted arrays
- pair sum problems
- reversing arrays or strings
- checking palindromes

## Sliding Window (Why It Exists)

After crossing the bridge, Kurma asks another question.
Kurma the Tortoise:
“Now I want the maximum sum of any 3 consecutive stones.”
Stones:
    [2, 1, 5, 1, 3, 2]

Kaya tries the brute way.
Kaya the Lion:
“I’ll add the first three.”
“Then I’ll add the next three.”
“And again…”
Biru stops him.
Biru the Monkey:
“You’re re-adding the same numbers again and again.”
“Why not move the window instead?”

### Core Idea of Sliding Window

- Sliding Window means:
- maintain a range (window)
- move it step by step
- update the result efficiently
- Instead of recalculating everything:
- remove what goes out
- add what comes in

### Sliding Window Dry Run

Array:
    
    [2, 1, 5, 1, 3, 2]

Window size = 3
    
    Window [2, 1, 5] → sum = 8

Slide window right:

    remove 2
    add 1
    new window [1, 5, 1] → sum = 7
    Slide again:
    remove 1
    add 3
    window [5, 1, 3] → sum = 9
    Slide again:
    remove 5
    add 2
    window [1, 3, 2] → sum = 6
    Maximum found = 9

### Pseudocode

    windowSum = sum of first k elements
    maxSum = windowSum

    FOR i from k to n-1:
        windowSum = windowSum - array[i-k] + array[i]
        maxSum = max(maxSum, windowSum)

    RETURN maxSum


## Difference Between Two Approaches
- Technique
- What Moves
- Used For
- Left–Right
- Two ends inward
- Sorted data problems
- Sliding Window
- Fixed-size or variable window
- Subarray / substring problems


## Common Mistakes

- using left–right on unsorted data
- forgetting to update window correctly
- off-by-one errors in window size
- recalculating sums unnecessarily

## When to Use Two Pointers

Use Two Pointers when:
- brute force feels slow
- data order helps
- ranges or pairs are involved

Common problems:
- pair sum
- longest substring
- max/min subarray
- palindrome check

## Syntax Learning Resources

After the idea clicks, Tavi the Pigeon arrives, clearly upbeat.
Tavi the Pigeon:
“Nice, this one saves a lot of time.”
“Here’s where you learn to write it properly.”

[General](https://www.geeksforgeeks.org/two-pointers-technique/)

[C++](https://en.cppreference.com/w/cpp/algorithm)

[Python](https://www.programiz.com/python-programming/examples/two-pointers)

## Summary

- two pointers reduce unnecessary checks
- left–right works on sorted data
- sliding window handles ranges efficiently
- both replace slow nested loops