export declare type KeyFlagsDict<T> = {
    [key in keyof T]?: boolean;
};
export declare function setFlags<T>(currentState: KeyFlagsDict<T>, ...flagsToSet: (keyof T)[]): void;
export declare function mergeFlags<T>(currentState: KeyFlagsDict<T>, stateToMerge: KeyFlagsDict<T>): void;
export declare function unsetFlags<T>(currentState: KeyFlagsDict<T>, ...flagsToUnset: (keyof T)[]): void;
export declare function hasAllFlags<T>(currentState: KeyFlagsDict<T>, ...flagsToCheck: (keyof T)[]): boolean;
export declare function hasExactlyFlags<T>(currentState: KeyFlagsDict<T>, ...flagsToCheck: (keyof T)[]): boolean | undefined;
export declare function hasSomeFlags<T>(currentState: KeyFlagsDict<T>, ...flagsToCheck: (keyof T)[]): boolean;
export declare function getFlagsState<T>(currentState: KeyFlagsDict<T>, ...flagsToGet: (keyof T)[]): KeyFlagsDict<T>;
export declare function executeWithActiveFlags<T, TResult>(currentState: KeyFlagsDict<T>, flagsToSet: (keyof T)[], action: () => TResult): TResult;
