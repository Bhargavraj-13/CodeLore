# Arrays

---

## Topic Overview

Arrays are used when we need to store many related values together and access them using positions.

Instead of handling many separate variables, arrays help us:

* Keep data together
* Maintain order
* Access any value quickly

This topic covers:

* Why arrays exist
* Indexing
* Traversal
* Basic Operations  

---

## Why Arrays Exist

Kaya the Lion and Biru the Monkey are asked to help Mala the Elephant.

Mala the Elephant has collected fruits from several trees and says:

**Mala the Elephant:**
“I remember how many fruits I picked from each tree, in order.”
“But I keep mixing them up.”

Kaya the Lion tries to help by remembering them separately:

```
first tree  → 5 fruits
second tree → 8 fruits
third tree  → 3 fruits
fourth tree → 6 fruits
```

After some time, Kaya the Lion gets confused.

**Kaya the Lion:**
“If you ask me again for the third tree, I’ll have to think hard.”
“These numbers belong together, but I’m holding them separately.”

Kaya turns to Biru the Monkey.

**Kaya the Lion:**
“There has to be a better way to store all of this.”

**Biru the Monkey:**
“When you have many values of the same kind,
and their order matters,
you store them together in one structure.”

That structure is called an **array**.

---

## Core Idea of Arrays

An array:

* stores multiple values together
* keeps them in a fixed order
* allows access using indexes (positions)

### Example

```
Values :  5   8   3   6
Indexes:  0   1   2   3
```

### Key Points

* indexing usually starts from `0`
* last index is `size - 1`
* accessing outside this range causes errors

---

## Understanding Indexing

Mala the Elephant asks:

**Mala the Elephant:**
“If I want the fruits from the third tree, how do I get it quickly?”

Biru the Monkey explains:

**Biru the Monkey:**
“You don’t count again.”
“You go directly to its position.”

**Biru the Monkey:**
“Third tree means index `2`, not `3`.”

Kaya the Lion realizes:

* position and index are not the same
* mixing them up causes mistakes

---

## Traversal

Traversal means visiting every element one by one.

Mala the Elephant wants Kaya to recheck all fruit counts.

### Dry Run

Array:

```
[5, 8, 3, 6]
```

Steps:

```
index 0 → 5
index 1 → 8
index 2 → 3
index 3 → 6
stop (array ends)
```

Traversal always:

* starts at index `0`
* ends at `size - 1`

---

## Basic Operations on Arrays

### Accessing an Element

Mala asks for fruits from one specific tree.

Kaya:

* uses the index
* directly gets the value

Access is fast because the position is known.

---

### 6.2 Updating an Element

Mala realizes one count was wrong.

**Biru the Monkey:**
“Go to the index and replace the value.”

```
array[2] = 10
```

* only the value changes
* the array size stays the same

---

### Inserting an Element

A new tree is added in between.

Biru explains:

* space must be created
* elements must move to the right

```
Before: [5, 8, 3, 6]
Insert at index 2
After : [5, 8, X, 3, 6]
```

This takes time, especially for large arrays.

---

### Deleting an Element

One tree is removed.

Kaya:

* deletes the value
* shifts remaining elements left

```
Before: [5, 8, 3, 6]
Delete index 1
After : [5, 3, 6]
```

Again, shifting makes this operation slow.

---

## Time Cost

| Operation       | Cost            |
| --------------- | --------------- |
| Access          | Very fast       |
| Traversal       | Depends on size |
| Insert (middle) | Slow            |
| Delete (middle) | Slow            |

**Biru the Monkey’s rule:**
“Arrays are great when you read more than you change.”

---

## Common Mistakes

* using the wrong index
* accessing outside bounds
* off-by-one errors
* assuming insert/delete is cheap

Most array bugs come from index mistakes.

---

## When to Use Arrays

Use arrays when:

* data is of the same type
* order matters
* fast access is required

Avoid arrays when:

* size changes often
* many insertions or deletions are needed

---

## Syntax Learning Resources

After understanding the idea, Tavi the Pigeon brings sources for writing arrays in real code.

[General](https://www.geeksforgeeks.org/array-data-structure/)

[C++](https://www.learncpp.com/cpp-tutorial/arrays/)

[Python Arrays](https://www.programiz.com/python-programming/arrays)

[Python List](https://www.programiz.com/python-programming/list)

---

## Summary

* arrays store related values together
* elements are accessed using indexes
* traversal visits all elements
* access is fast; insert/delete can be slow
* index handling is critical