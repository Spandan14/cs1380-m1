# Seralization Schema
## Primitives
Primitive Types include `Number`, `String`, `Boolean`, `null`, and `undefined`. This means that a primitive `primitive` would serialize as follows
```json
{
    "type": "{typeof primitive}",
    "value": "{primitive.toString()}"
}
```
except `null`, which has a value of `"null"`.

## Objects
To parse objects, we can recursively call `serialize` on the values, as the keys are always strings.  This means that an object like
```json
{
    "a": 1,
    "b": 2,
    "c": {
        "d": 3,
        "e": 4,
    },
}
```

would serialize as follows
```json
{
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
```

## Arrays
To parse arrays, we can recursively call `serialize` on each value, and keep them in the same order. This means that an array like
```json
[1, "2", {"a": 3}, 4, 5]
```

would serialize as follows
```json
{
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
```
## Cycles
To parse circular objects, we can store every object that we parse in a set named `objectSet` and assign it an ID in a dictionary/object named `objectDict`. The format of the IDs is always `"#{number}"` where `number` is the number of elements in `objectSet` when the new object was added.

This means that the following call to `serialize`
```javascript
var x = {
    "a": 1,
    "b": 2,
    "c": 3,
};
x.self = x;
serialize(x);
```
would result in the following output
```json
{
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
```