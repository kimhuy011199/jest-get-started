const axios = require('axios');
const { sum, subtract, fetchData } = require('./spaghetti');

// USING MATCHERS
describe('algebra', () => {
  test('should return the addition of a and b', () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  });
  test('should return the subtraction of a and b', () => {
    expect(subtract(1, 2)).toBe(-1);
  });
});

// TESTING ASYNCHRONOUS CODE
describe('asynchronous', () => {
  // Promise
  it('should return correct todo', () => {
    fetchData(1).then((todo) => {
      expect(todo.id).toBe(1);
    });
  });
  // Async/Await
  it('should return correct todo', async () => {
    const todo = await fetchData(1);
    expect(todo.id).toBe(1);
  });
});

// SETUP AND TEARDOWN
let animals = [];
// Run this before each test
beforeEach(() => {
  animals = ['elephant', 'zebra', 'bear', 'tiger'];
});
describe('animals array', () => {
  it('should add "aligator" to end of array', () => {
    animals.push('aligator');
    expect(animals[animals.length - 1]).toBe('aligator');
  });
  it('should add "monkey" to beginning of array', () => {
    animals.unshift('monkey');
    expect(animals[0]).toBe('monkey');
  });
  it('should have initial length of 4', () => {
    expect(animals.length).toBe(4);
  });
});

// MOCK FUNCTIONS
const forEach = (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
};
describe('mock sync functions', () => {
  it('mock callback', () => {
    const mockCallback = jest.fn((x) => x + 42);
    forEach([10, 12, 14], mockCallback);
    console.log(mockCallback.mock);
    expect(mockCallback.mock.calls.length).toBe(3);
    expect(mockCallback.mock.calls[0][0]).toBe(10);
    expect(mockCallback.mock.results[0].value).toBe(52);
  });
  it('mock return value', () => {
    const mockFn = jest.fn();
    mockFn.mockReturnValueOnce(10).mockReturnValueOnce(20).mockReturnValue(30);
    expect(mockFn()).toBe(10);
    expect(mockFn()).toBe(20);
    expect(mockFn()).toBe(30);
    expect(mockFn()).toBe(30);
  });
  it('mock async', async () => {
    jest.spyOn(axios, 'get').mockReturnValueOnce({
      data: {
        id: 1,
        todo: 'Do something',
      },
    });
    const results = await fetchData(1);
    expect(results.todo).toBe('Do something');
  });
});
