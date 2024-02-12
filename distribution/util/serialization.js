function getType(object) {
  if (object === null) {
    return 'null';
  }
  if (typeof object === 'number') {
    return 'number';
  }
  if (typeof object === 'string') {
    return 'string';
  }
  if (typeof object === 'boolean') {
    return 'boolean';
  }
  if (typeof object === 'object') {
    if (Array.isArray(object)) {
      return 'array';
    }
    return 'object';
  }
  throw new Error('ERR: getType() received an unknown type!');
}

function recursiveSerialize(object, objectSet, objectMap) {
  const type = getType(object);
  if (type === 'number' || type === 'string' || type === 'boolean') {
    return {
      'type': type,
      'value': object.toString(),
    };
  }
  if (type === 'null') {
    return {
      'type': type,
      'value': 'null',
    };
  }

  // beyond this point, only array or object should appear
  console.assert(type === 'array' || type === 'object');

  if (objectSet.has(object)) {
    // circular ref detected
    const reference = objectMap.get(object);
    console.assert(reference !== undefined);
    return {
      'type': 'reference',
      'id': reference,
    };
  } else {
    const reference = `#${objectSet.size}`;
    objectSet.add(object);
    objectMap.set(object, reference);

    if (type === 'array') {
      return {
        'type': 'array',
        'id': reference,
        'value': object.map((element) => recursiveSerialize(element,
            objectSet, objectMap)),
      };
    } else {
      const result = {};
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          result[key] = recursiveSerialize(object[key], objectSet, objectMap);
        }
      }
      return {
        'type': 'object',
        'id': reference,
        'value': result,
      };
    }
  }
}

function serialize(object) { // invocation
  objectMap = new Map();
  return JSON.stringify(recursiveSerialize(object, new Set(), objectMap));
}

function buildObjectMap(object, objectMap) {
  if (object.type === 'number') {
    return Number(object.value);
  }
  if (object.type === 'string') {
    return object.value;
  }
  if (object.type === 'boolean') {
    return object.value === 'true';
  }
  if (object.type === 'null') {
    return null;
  }

  if (object.type === 'array') {
    // assertion for double IDs
    console.assert(objectMap.get(object.id) === undefined);
    var deserialized = [];
    objectMap.set(object.id, deserialized);

    deserialized = object.value.map((element) =>
      buildObjectMap(element, objectMap));

    return deserialized;
  }

  if (object.type === 'object') {
    // assertion for double IDs
    console.assert(objectMap.get(object.id) === undefined);
    var result = {};
    objectMap.set(object.id, result);

    for (const key in object.value) {
      if (object.value.hasOwnProperty(key)) {
        result[key] = buildObjectMap(object.value[key], objectMap);
      }
    }

    return result;
  }
  if (object.type === 'reference') {
    // return the same
    return object;
  }

  throw new Error('ERR: buildObjectMap() received an unknown type!');
}

function injectObjectMap(object, objectMap) {
  const jsType = getType(object);

  if (jsType === 'array') {
    return object.map((element) => injectObjectMap(element, objectMap));
  }

  if (jsType === 'object') {
    if (object.type === 'reference') {
      console.assert(objectMap.get(object.id) !== undefined); // disaster
      return objectMap.get(object.id);
    }

    // otherwise, iterate
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        object[key] = injectObjectMap(object[key], objectMap);
      }
    }
    return object;
  }

  return object;
}

function deserialize(string) {
  objectMap = {};
  object = buildObjectMap(JSON.parse(string), objectMap);
  return injectObjectMap(object, objectMap);
}

module.exports = {
  serialize: serialize,
  deserialize: deserialize,
};

