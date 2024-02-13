const util = require('../distribution').util;

test('STRESS TEST 1 | ELEMENTS 100', () => {
  var obj = {};
  for (var i = 0; i < 100; i++) {
    obj[i] = i;
  }
  const preSerializeTimestamp = window.performance.now();
  const serialized = util.serialize(obj);
  const postSerializeTimestamp = window.performance.now();
  const preDeserializeTimestamp = window.performance.now();
  const deserialized = util.deserialize(serialized);
  const postDeserializeTimestamp = window.performance.now();
  expect(deserialized).toEqual(obj);
  console.log(`${expect.getState().currentTestName} | serialize time:`,
      postSerializeTimestamp - preSerializeTimestamp);
  console.log(`${expect.getState().currentTestName} | deserialize time:`,
      postDeserializeTimestamp - preDeserializeTimestamp);
});

test('STRESS TEST 2 | ELEMENTS 1000', () => {
  var obj = {};
  for (var i = 0; i < 1000; i++) {
    obj[i] = i;
  }
  const preSerializeTimestamp = window.performance.now();
  const serialized = util.serialize(obj);
  const postSerializeTimestamp = window.performance.now();
  const preDeserializeTimestamp = window.performance.now();
  const deserialized = util.deserialize(serialized);
  const postDeserializeTimestamp = window.performance.now();
  expect(deserialized).toEqual(obj);
  console.log(`${expect.getState().currentTestName} | serialize time:`,
      postSerializeTimestamp - preSerializeTimestamp);
  console.log(`${expect.getState().currentTestName} | deserialize time:`,
      postDeserializeTimestamp - preDeserializeTimestamp);
});

test('STRESS TEST 3 | ELEMENTS 10000', () => {
  var obj = {};
  for (var i = 0; i < 10000; i++) {
    obj[i] = i;
  }
  const preSerializeTimestamp = window.performance.now();
  const serialized = util.serialize(obj);
  const postSerializeTimestamp = window.performance.now();
  const preDeserializeTimestamp = window.performance.now();
  const deserialized = util.deserialize(serialized);
  const postDeserializeTimestamp = window.performance.now();
  expect(deserialized).toEqual(obj);
  console.log(`${expect.getState().currentTestName} | serialize time:`,
      postSerializeTimestamp - preSerializeTimestamp);
  console.log(`${expect.getState().currentTestName} | deserialize time:`,
      postDeserializeTimestamp - preDeserializeTimestamp);
});

test('STRESS TEST 4 | ELEMENTS 100000', () => {
  var obj = {};
  for (var i = 0; i < 10000; i++) {
    obj[i] = i;
  }
  const preSerializeTimestamp = window.performance.now();
  const serialized = util.serialize(obj);
  const postSerializeTimestamp = window.performance.now();
  const preDeserializeTimestamp = window.performance.now();
  const deserialized = util.deserialize(serialized);
  const postDeserializeTimestamp = window.performance.now();
  expect(deserialized).toEqual(obj);
  console.log(`${expect.getState().currentTestName} | serialize time:`,
      postSerializeTimestamp - preSerializeTimestamp);
  console.log(`${expect.getState().currentTestName} | deserialize time:`,
      postDeserializeTimestamp - preDeserializeTimestamp);
});

test('STRESS TEST 5 | FUNCTIONS 100', () => {
  var obj = [];
  for (var i = 0; i < 100; i++) {
    obj[i] = (a, b) => a + b;
  }
  const preSerializeTimestamp = window.performance.now();
  const serialized = util.serialize(obj);
  const postSerializeTimestamp = window.performance.now();
  const preDeserializeTimestamp = window.performance.now();
  const deserialized = util.deserialize(serialized);
  const postDeserializeTimestamp = window.performance.now();
  for (var i = 0; i < 100; i++) {
    expect(deserialized[i](1, i)).toEqual(1 + i);
  }
  console.log(`${expect.getState().currentTestName} | serialize time:`,
      postSerializeTimestamp - preSerializeTimestamp);
  console.log(`${expect.getState().currentTestName} | deserialize time:`,
      postDeserializeTimestamp - preDeserializeTimestamp);
});

test('STRESS TEST 6 | FUNCTIONS 1000', () => {
  var obj = [];
  for (var i = 0; i < 1000; i++) {
    obj[i] = (a, b) => a + b;
  }
  const preSerializeTimestamp = window.performance.now();
  const serialized = util.serialize(obj);
  const postSerializeTimestamp = window.performance.now();
  const preDeserializeTimestamp = window.performance.now();
  const deserialized = util.deserialize(serialized);
  const postDeserializeTimestamp = window.performance.now();
  for (var i = 0; i < 1000; i++) {
    expect(deserialized[i](1, i)).toEqual(1 + i);
  }
  console.log(`${expect.getState().currentTestName} | serialize time:`,
      postSerializeTimestamp - preSerializeTimestamp);
  console.log(`${expect.getState().currentTestName} | deserialize time:`,
      postDeserializeTimestamp - preDeserializeTimestamp);
});

test('STRESS TEST 7 | FUNCTIONS 10000', () => {
  var obj = [];
  for (var i = 0; i < 10000; i++) {
    obj[i] = (a, b) => a + b;
  }
  const preSerializeTimestamp = window.performance.now();
  const serialized = util.serialize(obj);
  const postSerializeTimestamp = window.performance.now();
  const preDeserializeTimestamp = window.performance.now();
  const deserialized = util.deserialize(serialized);
  const postDeserializeTimestamp = window.performance.now();
  for (var i = 0; i < 10000; i++) {
    expect(deserialized[i](1, i)).toEqual(1 + i);
  }
  console.log(`${expect.getState().currentTestName} | serialize time:`,
      postSerializeTimestamp - preSerializeTimestamp);
  console.log(`${expect.getState().currentTestName} | deserialize time:`,
      postDeserializeTimestamp - preDeserializeTimestamp);
});

test('STRESS TEST 8 | FUNCTIONS 100000', () => {
  var obj = [];
  for (var i = 0; i < 100000; i++) {
    obj[i] = (a, b) => a + b;
  }
  const preSerializeTimestamp = window.performance.now();
  const serialized = util.serialize(obj);
  const postSerializeTimestamp = window.performance.now();
  const preDeserializeTimestamp = window.performance.now();
  const deserialized = util.deserialize(serialized);
  const postDeserializeTimestamp = window.performance.now();
  for (var i = 0; i < 100000; i++) {
    expect(deserialized[i](1, i)).toEqual(1 + i);
  }
  console.log(`${expect.getState().currentTestName} | serialize time:`,
      postSerializeTimestamp - preSerializeTimestamp);
  console.log(`${expect.getState().currentTestName} | deserialize time:`,
      postDeserializeTimestamp - preDeserializeTimestamp);
});


test('STRESS TEST 9 | CYCLES 100', () => {
  var obj = [{a: 0}];
  for (var i = 1; i < 100; i++) {
    obj[i] = {
      a: i,
      b: obj[i - 1],
    };
  }
  const preSerializeTimestamp = window.performance.now();
  const serialized = util.serialize(obj);
  const postSerializeTimestamp = window.performance.now();
  const preDeserializeTimestamp = window.performance.now();
  const deserialized = util.deserialize(serialized);
  const postDeserializeTimestamp = window.performance.now();
  for (var i = 0; i < 100; i++) {
    expect(deserialized[i]).toEqual(obj[i]);
  }
  console.log(`${expect.getState().currentTestName} | serialize time:`,
      postSerializeTimestamp - preSerializeTimestamp);
  console.log(`${expect.getState().currentTestName} | deserialize time:`,
      postDeserializeTimestamp - preDeserializeTimestamp);
});

test('STRESS TEST 10 | CYCLES 1000', () => {
  var obj = [{a: 0}];
  for (var i = 1; i < 1000; i++) {
    obj[i] = {
      a: i,
      b: obj[i - 1],
    };
  }
  const preSerializeTimestamp = window.performance.now();
  const serialized = util.serialize(obj);
  const postSerializeTimestamp = window.performance.now();
  const preDeserializeTimestamp = window.performance.now();
  const deserialized = util.deserialize(serialized);
  const postDeserializeTimestamp = window.performance.now();
  for (var i = 0; i < 1000; i++) {
    expect(deserialized[i]).toEqual(obj[i]);
  }
  console.log(`${expect.getState().currentTestName} | serialize time:`,
      postSerializeTimestamp - preSerializeTimestamp);
  console.log(`${expect.getState().currentTestName} | deserialize time:`,
      postDeserializeTimestamp - preDeserializeTimestamp);
});


test('STRESS TEST 11 | NATIVE 100', () => {
  var obj = [{a: 0}];
  for (var i = 1; i < 100; i++) {
    obj[i] = {
      a: i,
      b: console.log,
    };
  }
  const preSerializeTimestamp = window.performance.now();
  const serialized = util.serialize(obj);
  const postSerializeTimestamp = window.performance.now();
  const preDeserializeTimestamp = window.performance.now();
  const deserialized = util.deserialize(serialized);
  const postDeserializeTimestamp = window.performance.now();
  for (var i = 0; i < 100; i++) {
    expect(deserialized[i]).toEqual(obj[i]);
  }
  console.log(`${expect.getState().currentTestName} | serialize time:`,
      postSerializeTimestamp - preSerializeTimestamp);
  console.log(`${expect.getState().currentTestName} | deserialize time:`,
      postDeserializeTimestamp - preDeserializeTimestamp);
});

test('STRESS TEST 12 | NATIVE 1000', () => {
  var obj = [{a: 0}];
  for (var i = 1; i < 1000; i++) {
    obj[i] = {
      a: i,
      b: console.log,
    };
  }
  const preSerializeTimestamp = window.performance.now();
  const serialized = util.serialize(obj);
  const postSerializeTimestamp = window.performance.now();
  const preDeserializeTimestamp = window.performance.now();
  const deserialized = util.deserialize(serialized);
  const postDeserializeTimestamp = window.performance.now();
  for (var i = 0; i < 1000; i++) {
    expect(deserialized[i]).toEqual(obj[i]);
  }
  console.log(`${expect.getState().currentTestName} | serialize time:`,
      postSerializeTimestamp - preSerializeTimestamp);
  console.log(`${expect.getState().currentTestName} | deserialize time:`,
      postDeserializeTimestamp - preDeserializeTimestamp);
});

test('STRESS TEST 13 | NATIVE 10000', () => {
  var obj = [{a: 0}];
  for (var i = 1; i < 10000; i++) {
    obj[i] = {
      a: i,
      b: console.log,
    };
  }
  const preSerializeTimestamp = window.performance.now();
  const serialized = util.serialize(obj);
  const postSerializeTimestamp = window.performance.now();
  const preDeserializeTimestamp = window.performance.now();
  const deserialized = util.deserialize(serialized);
  const postDeserializeTimestamp = window.performance.now();
  for (var i = 0; i < 10000; i++) {
    expect(deserialized[i]).toEqual(obj[i]);
  }
  console.log(`${expect.getState().currentTestName} | serialize time:`,
      postSerializeTimestamp - preSerializeTimestamp);
  console.log(`${expect.getState().currentTestName} | deserialize time:`,
      postDeserializeTimestamp - preDeserializeTimestamp);
});

test('STRESS TEST 14 | NATIVE 100000', () => {
  var obj = [{a: 0}];
  for (var i = 1; i < 100000; i++) {
    obj[i] = {
      a: i,
      b: console.log,
    };
  }
  const preSerializeTimestamp = window.performance.now();
  const serialized = util.serialize(obj);
  const postSerializeTimestamp = window.performance.now();
  const preDeserializeTimestamp = window.performance.now();
  const deserialized = util.deserialize(serialized);
  const postDeserializeTimestamp = window.performance.now();
  for (var i = 0; i < 100000; i++) {
    expect(deserialized[i]).toEqual(obj[i]);
  }
  console.log(`${expect.getState().currentTestName} | serialize time:`,
      postSerializeTimestamp - preSerializeTimestamp);
  console.log(`${expect.getState().currentTestName} | deserialize time:`,
      postDeserializeTimestamp - preDeserializeTimestamp);
});
