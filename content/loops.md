# Loops

## Topic Overview

Loops are used when the same task needs to be repeated multiple times.
Instead of writing the same instruction again and again, a loop allows us to write the rule once and let it repeat automatically until a condition is met.

This topic covers:
- why loops exist
- how repetition is controlled
- the three common loop types: 
    - while
    - do-while
    - for

# Why Loops Exist

Kaya the Lion is asked to check stones on a path.
He starts doing it manually:

    stone 1 checked
    stone 2 checked
    stone 3 checked

After a few stones, Kaya stops.
He realizes:
he is doing the same work again and again
only the stone number is changing
writing or saying every step separately is tiring and unnecessary
Kaya asks Biru the Monkey if there is a simpler way.
Biru explains that when:
the task stays the same
only a value keeps changing
there is a clear start and a clear end
we don’t need to write everything manually.
We can describe the rule once and let it repeat.
That idea is called a loop.

## Core Idea of Loops

Every loop has five parts:
- Starting point – where repetition begins
- Condition – when the loop should continue
- Repeated work – what is done again and again
- Progress – something must change each time
- Stopping point – when the loop ends

If any of these are missing, the loop may not work correctly.

## Dry Run Example (Before Code)

Task: Check stones numbered from 1 to 5.
Logical steps:
start at stone 1
check the stone
move to the next stone
repeat the same steps
stop after stone 5
A loop simply automates this thinking.

## While Loop
### Concept

A while loop checks the condition before doing the work.
If the condition is false at the beginning, the loop will not run even once.

### Pseudocode
    SET stone = 1

    WHILE stone <= 5:
        CHECK stone
        stone = stone + 1

### When to Use
when you don’t know how many times the loop will run
when work should happen only if the condition is true

## Do-While Loop

### Concept

A do-while loop does the work first and checks the condition afterward.
This means the loop runs at least once, no matter what.

### Pseudocode

    SET stone = 1

    DO:
        CHECK stone
        stone = stone + 1
    WHILE stone <= 5

### When to Use
- when at least one execution is required
- when the condition depends on work already done

## For Loop
### Concept

A for loop keeps everything in one place:
starting value
condition
update step
It is best when the number of repetitions is already known.
### Pseudocode
    FOR stone = 1 TO 5:
        CHECK stone

### When to Use
- when looping over a fixed range
- when readability matters

### Comparison of Loop Types

| Loop Type | Condition Checked | Runs at Least Once | Best Used When        |
|-----------|-------------------|--------------------|-----------------------|
| while     | Before work       | No                 | Repetitions unknown   |
| do-while | After work        | Yes                | Must run once         |
| for       | Built-in          | No                 | Count is known        |



## Common Mistakes
- forgetting to update the loop variable
- writing a condition that never becomes false
- stopping too early or too late
- These mistakes can lead to:
- infinite loops
- skipped logic
- wrong results

### Syntax Learning Resources

After understanding the idea, Tavi the Pigeon provides trusted sources to learn how loops are written in actual code.
General
https://www.geeksforgeeks.org/loops-in-programming/
C / C++
https://www.learncpp.com/cpp-tutorial/for-loops/
https://www.learncpp.com/cpp-tutorial/while-loops/
Python
https://www.programiz.com/python-programming/for-loop
https://www.programiz.com/python-programming/while-loop

11. Summary
loops avoid repetitive code
all loops repeat work in a controlled way
the main difference is when the condition is checked
choosing the right loop makes programs simpler and safer