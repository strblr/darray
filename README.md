# darray

Given two arrays A and B, returns what should be added, updated and / or removed to transform A into B. In optimal linear time.

## Example 1

```javascript
import diff from "darray";

const [add, update, remove] = diff([1, 2, 3], [2, 3, 4]);
console.log(add); // [4]
console.log(update); // []
console.log(remove); // [1]
```

## Example 2

```javascript
import diff from "darray";

const before = [
  {
    id: "1",
    label: "Do this"
  },
  {
    id: "2",
    label: "Do that"
  }
];

const after = [
  {
    id: "2",
    label: "Nop, do this instead"
  },
  {
    id: "3",
    label: "Do that thing"
  },
  {
    id: "4",
    label: "Do this last thing"
  }
];

const [add, update, remove] = diff(
  before,
  after,
  todo => todo.id,
  (t1, t2) => t1.label === t2.label
);

console.log(add);
/*[
  {
    id: "3",
    label: "Do that thing"
  },
  {
    id: "4",
    label: "Do this last thing"
  }
];*/

console.log(update);
/*[
  {
    id: "2",
    label: "Nop, do this instead"
  }
];*/

console.log(remove);
/*[
  {
    id: "1",
    label: "Do this"
  }
];*/
```

## Module signature

```typescript
export declare function diff<T>(
  oldArray: Array<T>,
  newArray: Array<T>,
  identity?: (element: T) => any,
  equivalent?: (oldElement: T, newElement: T) => boolean
): readonly [T[], T[], T[]];

export declare function hasDiff<T>(
  oldArray: Array<T>,
  newArray: Array<T>,
  identity?: (element: T) => any,
  equivalent?: (oldElement: T, newElement: T) => boolean
): boolean; 

export default diff;
```

- The optional `identity` function should provide a unique and stable identity for each array element. By default, this function returns the element itself.
- The optional `equivalent` function will be called on each pair (old element, new element) with the same identity, to know if the new element should be marked as an update or not. By default, this function performs a strict equality check.
