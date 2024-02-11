const util = require('../distribution').util;

test('SERIALIZE-ONLY TEST 1 | PRIMITIVE TEST 1', () => {
  const number = 42;
  const serialized = util.serialize(number);
  const expectation = {
    "type": "number",
    "value": "42",
  }
  expect(serialized).toBe(JSON.stringify(expectation));
});

test('SERIALIZE-ONLY TEST 2 | OBJECT TEST 1', () => {
  const obj = {
    "a": 1,
    "b": 2,
    "c": {
      "d": 3,
      "e": 4,
    },
  };
  const serialized = util.serialize(obj);
  const expectation = {
    "type": "object",
    "id": "#0",
    "value": {
      "a": {
        "type": "number",
        "value": "1"
      },
      "b": {
        "type": "number",
        "value": "2"
      },
      "c": {
        "type": "object",
        "id": "#1",
        "value": {
          "d": {
            "type": "number",
            "value": "3"
          },
          "e": {
            "type": "number",
            "value": "4"
          }
        }
      },
    }
  }
  expect(serialized).toBe(JSON.stringify(expectation));
});

test('SERIALIZE-ONLY TEST 3 | ARRAY TEST 1', () => {
  const array = [1, "2", { "a": 3 }, 4, 5];
  const serialized = util.serialize(array);
  const expectation = {
    "type": "array",
    "id": "#0",
    "value": [
      {
        "type": "number",
        "value": "1"
      },
      {
        "type": "string",
        "value": "2"
      },
      {
        "type": "object",
        "id": "#1",
        "value": {
          "a": {
            "type": "number",
            "value": "3"
          }
        }
      },
      {
        "type": "number",
        "value": "4"
      },
      {
        "type": "number",
        "value": "5"
      }
    ]
  }
  expect(serialized).toBe(JSON.stringify(expectation));
});


test('SERIALIZE-ONLY TEST 4 | CYCLE TEST 1', () => {
  var x = {
    "a": 1,
    "b": 2,
    "c": 3,
  };
  x.self = x;
  const serialized = util.serialize(x);
  const expectation = {
    "type": "object",
    "id": "#0",
    "value": {
      "a": {
        "type": "number",
        "value": "1"
      },
      "b": {
        "type": "number",
        "value": "2"
      },
      "c": {
        "type": "number",
        "value": "3"
      },
      "self": {
        "type": "reference",
        "id": "#0"
      }
    }
  }
  expect(serialized).toBe(JSON.stringify(expectation));
});