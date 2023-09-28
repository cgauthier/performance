# Performance Demo

## Link to Live Demo

http://www.claudegauthier.net/demos/performance/index.html


## Introduction

The purpose of this demo is to demonstrate that in certain cases, functional programming in JS is not always going to achieve high levels of performance while processing embedded loops.

First of all, not all JS engines are identical and as such profiling should always be compared across the intended supported user agents.

When there is processing involve in loops involving arrow based functions, then the optimization one would expect from the "one-liner" so to speak is effectively gone if this arrow function is embedded with more code functionality.

## Performance as a requirement

When performance is a required key metric, we must do our best to implement code that will deliver based on the expections set.

In the best of all worlds, we should write code for clarity, consistency and scalability.

Code that is well written is often also easy to unit test.

As such we do our best to follow best practices and enforce clear design patterns.

But...

There are times when we must write code where performance goals supercede everything else.

When a metric isn't met, we must look for alternatives.

## What was I trying to solve?

The demo code published in this repository is based on a real world problem I was faced.

I needed to load a huge file that would allow me to view/edit a JSON document where the data is organized by Chapter, Policy, Section and Subsection.

The purpose is to create a viewer/editor where the content is controlled in a granular manner akin to data manipulation and yet the editing is akin to word processing.

Being able to achieve this goal would allow the tagging of various attributes with the purpose of being able to assign roles and entitlements and access to any part of the document.

The JSON file that needed to be loaded contained nearly 23000 lines of code.

The end result of the document loaded in the viewer was 3 prefaces in one section and 52 chapters with policies which contained sections, which contained subsections.

In essence if it were to be printed, close to 400 pages of material.

I developed a technique to allow real-time manipulation live in browser for the entire document.

Everything loaded into memory.

One of the reasons for this is that "numbering" had to be dynamically done.

Chapter 1
Policy 100
Section 100.1
Subsection 100.1.1

New content created needs to be numbered on-the-fly, all other content has to quickly renumber itself.

And moving content around or deleting content also required dynamic renumbering or a process to force renumbering.

Suffice to say, first we must load the document.

Initially I used embedded loops using Array.map(arrow function), the performance was atrociously slow.

Considering I'm developing and testing locally on a high performance gaming system, I would expect fast results and yet it was taking about 10 seconds to load/render.

So, I decided to optimize, I knew from experience that functional callbacks in loops can potentially be slow, such it was easy for me to simply convert to for...ioop embedded structures.

The data is in a predictable format, thus, no need to recursive code (which is also slow and memory intensive).

The end result of the optimization is to load/render took less than 4 seconds.

Thats'a huge performance gain.

In this particular case, the optimization, while "ugly" in terms of code, obviously is the winner.

## In the real world - What else could we do?

The UI should do the least amount of processing possible.  We should try and offload large data processing to services.

And with a bit of tweaking, I will eventually do that.

But if I leave all of this in the front-end, I can also easily implement "Web Workers" as well.  Since there is no DOM manipulation, this is all computational, I suspect I can reduce my processing time as well >> Yes, I would need to profile.. :)


## In conclusion

The demo you have access doesn't do much, some pre-calculated messages stuffed into arrays to be output in the debugger's console in a processing manner identical to the code I wrote for my document load/viewer.

But it does demonstrate the fact that when it comes to performance, functional programming isn't always the best solution.

So, keep an open mind and loop for optimization. :)




