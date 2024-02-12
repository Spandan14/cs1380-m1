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

function recursiveSerialize(object, objectSet, objectDict) {
  const type = getType(object);
  if (type === 'number' || type === 'string' || type === 'boolean') {
    return {
      "type": type,
      "value": object.toString(),
    };
  }
  if (type === 'null') {
    return {
      "type": type,
      "value": "null",
    };
  }

  // beyond this point, only array or object should appear
  console.assert(type === 'array' || type === 'object');

  if (objectSet.has(object)) {
    // circular ref detected
    const reference = objectDict[object];
    console.assert(reference !== undefined);
    return {
      "type": "reference",
      "id": reference,
    };
  } else {
    const reference = `#${objectSet.size}`
    objectSet.add(object);
    objectDict[object] = reference;

    if (type === 'array') {
      return {
        "type": "array",
        "id": reference,
        "value": object.map((element) => recursiveSerialize(element, objectSet, objectDict)),
      };
    } else {
      const result = {};
      for (const key in object) {
        result[key] = recursiveSerialize(object[key], objectSet, objectDict);
      }
      return {
        "type": "object",
        "id": reference,
        "value": result,
      };
    }
  }
}

function serialize(object) { // invocation
  return JSON.stringify(recursiveSerialize(object, new Set(), {}));
}

function buildObjectDict(object, objectDict) {
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
    console.assert(objectDict[object.id] === undefined);
    var deserialized = [];
    objectDict[object.id] = deserialized;

    deserialized = object.value.map((element) => buildObjectDict(element, objectDict));

    return deserialized;
  }

  if (object.type === 'object') {
    // assertion for double IDs
    console.assert(objectDict[object.id] === undefined);
    var result = {};
    objectDict[object.id] = result;

    for (const key in object.value) {
      result[key] = buildObjectDict(object.value[key], objectDict);
    }
    
    return result;
  }
  if (object.type === 'reference') {
    // return the same
    return object;
  }

  throw new Error('ERR: buildObjectDict() received an unknown type!');
}

function injectObjectDict(object, objectDict) {
  const jsType = getType(object);

  if (jsType === 'array') {
    return object.map((element) => injectObjectDict(element, objectDict));
  }

  if (jsType === 'object') {
    if (object.type === 'reference') {
      console.assert(objectDict[object.id] !== undefined); // disaster
      return objectDict[object.id];
    }

    // otherwise, iterate
    for (const key in object) {
      object[key] = injectObjectDict(object[key], objectDict);
    }
    return object;
  }

  return object;
}

function deserialize(string) {
  objectDict = {};
  object = buildObjectDict(JSON.parse(string), objectDict);
  return injectObjectDict(object, objectDict);
}

module.exports = {
  serialize: serialize,
  deserialize: deserialize,
};

