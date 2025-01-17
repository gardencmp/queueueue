import Buffer from './Buffer';

describe('Buffer', () => {
  it('constructs', () => {
    const q = new Buffer();
    expect(q).toBeInstanceOf(Buffer);
  });

  it('circulates with a limit of one', () => {
    const q = new Buffer(1);
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    expect(q.length).toBe(1);
    expect(q.dequeue()).toBe(3);
    expect(q.length).toBe(0);
    expect(() => q.dequeue()).toThrow();
  });

  it('circulates with a limit of two', () => {
    const q = new Buffer(2);
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    q.enqueue(4);
    expect(q.length).toBe(2);
    expect(q.dequeue()).toBe(3);
    expect(q.length).toBe(1);
    expect(q.dequeue()).toBe(4);
    expect(q.length).toBe(0);
    expect(() => q.dequeue()).toThrow();
  });

  it('empty throws', () => {
    const q = new Buffer();
    expect(() => q.dequeue()).toThrow();
  });

  it(`doesn't circulate without a limit`, () => {
    const q = new Buffer();
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    expect(q.dequeue()).toBe(1);
    expect(q.dequeue()).toBe(2);
    expect(q.dequeue()).toBe(3);
    expect(() => q.dequeue()).toThrow();
  });

  it(`clears`, () => {
    const q = new Buffer();
    q.enqueue(1);
    q.enqueue(2);
    q.clear();
    expect(q.length).toBe(0);
    expect(() => q.dequeue()).toThrow();
  });

  it(`foreaches`, () => {
    const q = new Buffer();
    q.enqueue(1);
    q.enqueue(2);
    let n = 0;
    q.forEach(() => void (n += 1));
    expect(n).toBe(2);
  });

  it('iterates', () => {
    const q = new Buffer();
    q.enqueue(1);
    q.enqueue(2);
    const it = q[Symbol.iterator]();
    expect(it[Symbol.iterator]()).toBe(it[Symbol.iterator]());
    expect([...q]).toEqual([1, 2]);
  });

  it('constructs from an iterable', () => {
    const q: Iterable<number> = Buffer.from([1, 2, 3], 2);
    expect([...q]).toEqual([2, 3]);
  });

  it('reverses', () => {
    const q = new Buffer();
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    expect([...q.reverse()]).toEqual([3, 2, 1]);
  });
});
