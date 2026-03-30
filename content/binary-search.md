# Binary Search

## Topic Overview

Binary Search is used to find an element quickly in a sorted list.
Instead of checking elements one by one, Binary Search:
repeatedly cuts the search space in half
reduces the number of checks
works only when data is sorted
This topic covers:
- why Binary Search exists
- how it works
- dry run explanation
- basic rules and mistakes

## Why Binary Search Exists

Kaya the Lion and Biru the Monkey are helping Aro the Eagle, who keeps records of jungle watch posts.
Aro the Eagle shows a list of post numbers, already sorted:
[2, 5, 8, 12, 16, 23, 38]

Aro asks Kaya:
Aro the Eagle:
“Can you tell me if watch post 16 exists?”
Kaya the Lion starts from the beginning.
Kaya the Lion:
“I’ll check 2… then 5… then 8…”
Biru the Monkey stops him.
Biru the Monkey:
“Wait.
Why are you checking one by one?”
Kaya looks confused.
Kaya the Lion:
“That’s how I always search.”
Biru points to the list.
Biru the Monkey:
“The list is already sorted.
Why not use that to your advantage?”

## Core Idea of Binary Search

Binary Search works on one simple idea:
- look at the middle element
- compare it with what you’re searching for
- discard half the list
- repeat on the remaining half
- Each step makes the problem smaller.
Important rule:
    Binary Search works only on sorted data.

## Dry Run Example

Goal: Find 16
List: [2, 5, 8, 12, 16, 23, 38]
Biru guides Kaya step by step.

Step 1:

    Middle element → 12
    16 > 12

Biru the Monkey:
“Everything before 12 is useless now.”
Search moves to the right half.

Step 2:

    Remaining list: [16, 23, 38]
    Middle element → 23
    16 < 23

Biru the Monkey:
“Everything after 23 is useless now.”
Search moves to the left half.

Step 3:

    Remaining list: [16]
    Middle element → 16

Kaya the Lion:
“Found it.”
Aro the Eagle nods.

## Why This Is Faster Than Linear Search

Kaya asks:
Kaya the Lion:
“I skipped so many numbers. Why does this always work?”
Biru explains:
Biru the Monkey:
“Each comparison removes half the list.”
“You don’t need to look everywhere.”
Key idea:
Linear search → checks one by one
Binary search → cuts the problem in half

## Pseudocode

    SET low = 0
    SET high = last index of array

    WHILE low <= high:
        mid = (low + high) / 2

        IF array[mid] == target:
            RETURN found

        ELSE IF target > array[mid]:
            low = mid + 1
            // discard left half

        ELSE:
            high = mid - 1
            // discard right half

    RETURN not found

## What’s happening:

- low and high define the current search space
- mid checks the middle
- half the data is discarded every step

## When Binary Search Stops

Binary Search ends when:
- the element is found
- the search space becomes empty
- If low > high, the element does not exist.

## Common Mistakes

- Using Binary Search on an unsorted array
- Wrong middle calculation
- Infinite loop due to incorrect updates
- Confusing index with value
- Most Binary Search bugs are boundary mistakes.

## When to Use Binary Search

Use Binary Search when:
- Data is sorted
- Fast searching is required
- Repeated searches are needed
Avoid Binary Search when:
- Data is unsorted
- Insertion/deletion happens frequently

## Syntax Learning Resources

After understanding the idea, Tavi the Pigeon brings sources for writing Binary Search in code.

[General](https://www.geeksforgeeks.org/binary-search/)

[C++](https://www.learncpp.com/cpp-tutorial/binary-search/)

[Python](https://www.programiz.com/python-programming/binary-search)

## Summary

Binary Search finds elements efficiently
it works only on sorted data
each step removes half the search space
careful boundary handling is critical