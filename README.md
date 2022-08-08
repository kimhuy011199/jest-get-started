# Get started with Jest

## Concepts

`describe(name, fn)`

`describe(name, fn)` creates a block that groups together several related tests.

- This isn't required - you can write the test blocks directly at the top level.
- This can be handy if you prefer your tests to be organized into groups.
- You can also nest describe blocks if you have a hierarchy of tests

`test(name, fn, timeout)`

`test` method runs a test.

Also under the alias: `it(name, fn, timeout)`

- The first argument is the test name.
- The second argument is a function that contains the expectations to test.
- The third argument (optional) is `timeout` (in milliseconds) for specifying how long to wait before aborting.

`expect(value)`

Use `expect` along with a "matcher" function to assert something about a value. The argument to `expect` should be the value that your code produces, and any argument to the matcher should be the correct value.

## Quick start

- Install `jest`
  ```
  npm install --save-dev jest
  ```
- Add test script to `package.json`
  ```
  "scripts": {
    "test": "jest"
  }
  ```
- Run test
  ```
  npm run test
  ```

## Writing tests

Tests typically contain these general components:

- `describe` function is invoked which accepts two arguments:

  - a string (a description that will appear in the terminal when tests are run, which “describes” the test block)
  - a callback function which will contain the individual tests.

- One (or more) `test` function which accepts two arguments:

  - a string describing the action of the specific test
  - a callback function containing an `expect` function and a `matcher` function.

- The `expect` function accepts the function invocation being tested, and is chained to the `matcher` which describes the expected results.

Let's say you have a method `sum(a, b)` which is supposed to return the sum of `a` and `b`. Here's how you would test that:

```
function sum(a, b) {
  return a + b;
}

describe('algebra', () => {
  test('should return the addition of a and b', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```

In this case, `toBe()` is the matcher function.
More common Jest Matchers can be found in the [official introduction](https://jestjs.io/docs/expect)

## Asynchonous Code

Let's say that function `fetchData()` returns a promise that is supposed to resolve to the string 'peanut butter'. We could test it with:

### Promises

```
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

### Async/Await

```
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```

> Be sure to return (or await) the promise - if you omit the return/await statement, your test will complete before the promise returned from `fetchData()` resolves or rejects.

## Setup and Teardown

If you have some work you need to do repeatedly for many tests, you can use `beforeEach` and `afterEach` hooks.

In some cases, you only need to do setup once, at the beginning of a file. This can be especially bothersome when the setup is asynchronous, so you can't do it inline. Jest provides `beforeAll` and `afterAll` hooks to handle this situation.

Note that the top-level `beforeEach` is executed before the `beforeEach` inside the describe block.

Jest executes all describe handlers in a test file before it executes any of the actual tests. Once the describe blocks are complete, by default Jest runs all the tests serially in the order they were encountered in the collection phase, waiting for each to finish and be tidied up before moving on.

## Mock functions

To test a function, we can use a mock function, and inspect the mock's state to ensure the callback is invoked as expected.

### `.mock` property

All mock functions have this special `.mock` property, which is where data about how the function has been called and what the function returned is kept.

### Mock return value

Mock functions can also be used to inject test values into your code during a test.

More about mock functionscan be found in the [official docs](https://jestjs.io/docs/mock-functions)
