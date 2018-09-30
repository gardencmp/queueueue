# Async Queue

[![License](https://img.shields.io/github/license/slikts/asyncqueue.svg)](https://github.com/slikts/asyncqueue)
[![Build Status](https://img.shields.io/travis/slikts/asyncqueue/master.svg)](https://travis-ci.org/slikts/asyncqueue)
[![Test Coverage](https://img.shields.io/codecov/c/github/slikts/asyncqueue/master.svg)](https://codecov.io/github/slikts/asyncqueue?branch=master)
[![Latest Stable Version](https://img.shields.io/npm/v/@slikts/asyncqueue.svg)](https://www.npmjs.com/package/@slikts/asyncqueue)

A library for turning push-based collections into pull-based ones that implement the [ES2018 asynchronous iteration protocols][async].

## Features

* Buffers pushed and pulled values
* Well-typed with TypeScript
* Lightweight, no dependencies

## Explanation

Examples of push-based collections are streams and event emitters, and the 'push' aspect refers to control flow being handed to the collection to return the next value at a time determined by the collection. The control flow is normally passed in as an either explicit or implicit continuation (callbacks being explicit, and generator or async function continuations being implicit), and the values can be returned asynchronously, meaning with a time delay.

Pull collections return values immediately upon request; an example of a pull collection is a JavaScript array, where methods like `Array#pop()` return values directly.

Async iterators are pull collections that return promises, and, in turn, promises are push-based (albeit for singular values, not multiple, like with streams), so async iterators combine the pull- and push-based aspects.

This library is for populating async iterators with values; the intended use case is to implement async iterability for data structures, and to convert collections like event emitters to async iterators.

## Install

```
npm install --save @slikts/asyncqueue
```

## Usage

```typescript
import { AsyncQueue } from "@slikts/asyncqueue";

const queue = new AsyncQueue<number>();
queue.push(1);
queue.push(2);

for await (const n of queue) {
  console.log(n); // logs 1, 2
}
```

## Types

To make TypeScript know about the asnyc iterable types (`AsyncIterable<T>`, `AsyncIterator<T>`, `AsyncIterableiterator<T>`), the TypeScript `--lib` [compiler option][options] should include `"esnext.asynciterable"` or `"esnext"`.

## Alternatives

* [callback-to-async-iterator]

[callback-to-async-iterator]: https://github.com/withspectrum/callback-to-async-iterator
[async]: http://2ality.com/2016/10/asynchronous-iteration.html
[options]: https://www.typescriptlang.org/docs/handbook/compiler-options.html
