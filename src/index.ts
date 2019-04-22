export type KeyFlagsDict<T> = {
    [key in keyof T]?: boolean;
}

export function setFlags<T>(currentState: KeyFlagsDict<T>, ...flagsToSet: (keyof T)[]) {
    for (const flag of flagsToSet) {
        currentState[flag] = true;
    }
}

export function mergeFlags<T>(currentState: KeyFlagsDict<T>, stateToMerge: KeyFlagsDict<T>) {
    Object.assign(currentState, stateToMerge);
}

export function unsetFlags<T>(currentState: KeyFlagsDict<T>, ...flagsToUnset: (keyof T)[]) {
    for (const flag of flagsToUnset) {
        currentState[flag] = false;
    }
}

export function hasAllFlags<T>(currentState: KeyFlagsDict<T>, ...flagsToCheck: (keyof T)[]) {
    for (const flag of flagsToCheck) {
        if (currentState[flag] !== true) {
            return false;
        }
    }

    return true;
}

export function hasExactlyFlags<T>(currentState: KeyFlagsDict<T>, ...flagsToCheck: (keyof T)[]) {
    for (const flag of Object.getOwnPropertyNames(currentState)) {

        const flagShouldBeSet = flagsToCheck.some(x => x === flag);

        const flagActualState = !!(<any>currentState)[flag];

        if (flagShouldBeSet !== flagActualState) {
            return false;
        }

        return hasAllFlags(currentState, ...flagsToCheck);
    }
}

export function hasSomeFlags<T>(currentState: KeyFlagsDict<T>, ...flagsToCheck: (keyof T)[]) {
    for (const flag of flagsToCheck) {
        if (currentState[flag] === true) {
            return true;
        }
    }

    return false;
}

export function getFlagsState<T>(currentState: KeyFlagsDict<T>, ...flagsToGet: (keyof T)[]): KeyFlagsDict<T> {
    const stateSubset: KeyFlagsDict<T> = {};
    for (const flag of flagsToGet) {
        stateSubset[flag] = currentState[flag];
    }

    return stateSubset;
}

export function executeWithActiveFlags<T, TResult>(currentState: KeyFlagsDict<T>, flagsToSet: (keyof T)[], action: () => TResult): TResult {
    const initialState = getFlagsState(currentState, ...flagsToSet);
    setFlags(currentState, ...flagsToSet);
    let result = action();
    mergeFlags(currentState, initialState);
    return result;
}

