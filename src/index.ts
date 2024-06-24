function defaultId<T>(element: T) {
  return element;
}

function defaultEquivalent<T>(oldElement: T, newElement: T) {
  return oldElement === newElement;
}

export function diff<T>(
  oldArray: Array<T>,
  newArray: Array<T>,
  identity: (element: T) => any = defaultId,
  equivalent: (oldElement: T, newElement: T) => boolean = defaultEquivalent
) {
  const keyedOld = new Map(
    oldArray.map(element => [identity(element), element])
  );
  const added: Array<T> = [];
  const updated: Array<T> = [];
  const updatedFromOld: Array<T> = [];

  for (const element of newArray) {
    const k = identity(element);
    if (!keyedOld.has(k)) added.push(element);
    else {
      const oldElement = keyedOld.get(k)!;
      if (!equivalent(oldElement, element)) {
        updated.push(element);
        updatedFromOld.push(oldElement);
      }
      keyedOld.delete(k);
    }
  }

  return [
    added,
    updated,
    Array.from(keyedOld.values()),
    updatedFromOld
  ] as const;
}

export function hasDiff<T>(
  oldArray: Array<T>,
  newArray: Array<T>,
  identity: (element: T) => any = defaultId,
  equivalent: (oldElement: T, newElement: T) => boolean = defaultEquivalent
) {
  return diff(oldArray, newArray, identity, equivalent).some(
    result => result.length !== 0
  );
}

export default diff;
