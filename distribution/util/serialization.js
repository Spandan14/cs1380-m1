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
    const reference = objectDict.get(object);
    console.assert(reference !== undefined);
    return {
      "type": "reference",
      "value": objectDict.get(object),
    };
  } else {
    objectSet.add(object);
    objectDict.add(object, `#${objectSet.size}`);

    if (type === 'array') {
      return {
        "type": "array",
        "value": object.map((element) => recursiveSerialize(element, objectSet, objectDict)),
      };
    } else {
      const result = {};
      for (const key in object) {
        result[key] = recursiveSerialize(object[key], objectSet, objectDict);
      }
      return {
        "type": "object",
        "value": result,
      };
    }
  }
}


function serialize(object) { // invocation
  return JSON.stringify(recursiveSerialize(object, new Set(), {}));
}

function deserialize(string) {
  return {};
}

module.exports = {
  serialize: serialize,
  deserialize: deserialize,
};

