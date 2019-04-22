"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setFlags(currentState) {
    var flagsToSet = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        flagsToSet[_i - 1] = arguments[_i];
    }
    for (var _a = 0, flagsToSet_1 = flagsToSet; _a < flagsToSet_1.length; _a++) {
        var flag = flagsToSet_1[_a];
        currentState[flag] = true;
    }
}
exports.setFlags = setFlags;
function mergeFlags(currentState, stateToMerge) {
    Object.assign(currentState, stateToMerge);
}
exports.mergeFlags = mergeFlags;
function unsetFlags(currentState) {
    var flagsToUnset = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        flagsToUnset[_i - 1] = arguments[_i];
    }
    for (var _a = 0, flagsToUnset_1 = flagsToUnset; _a < flagsToUnset_1.length; _a++) {
        var flag = flagsToUnset_1[_a];
        currentState[flag] = false;
    }
}
exports.unsetFlags = unsetFlags;
function hasAllFlags(currentState) {
    var flagsToCheck = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        flagsToCheck[_i - 1] = arguments[_i];
    }
    for (var _a = 0, flagsToCheck_1 = flagsToCheck; _a < flagsToCheck_1.length; _a++) {
        var flag = flagsToCheck_1[_a];
        if (currentState[flag] !== true) {
            return false;
        }
    }
    return true;
}
exports.hasAllFlags = hasAllFlags;
function hasExactlyFlags(currentState) {
    var flagsToCheck = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        flagsToCheck[_i - 1] = arguments[_i];
    }
    var _loop_1 = function (flag) {
        var flagShouldBeSet = flagsToCheck.some(function (x) { return x === flag; });
        var flagActualState = !!currentState[flag];
        if (flagShouldBeSet !== flagActualState) {
            return { value: false };
        }
        return { value: hasAllFlags.apply(void 0, [currentState].concat(flagsToCheck)) };
    };
    for (var _a = 0, _b = Object.getOwnPropertyNames(currentState); _a < _b.length; _a++) {
        var flag = _b[_a];
        var state_1 = _loop_1(flag);
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
exports.hasExactlyFlags = hasExactlyFlags;
function hasSomeFlags(currentState) {
    var flagsToCheck = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        flagsToCheck[_i - 1] = arguments[_i];
    }
    for (var _a = 0, flagsToCheck_2 = flagsToCheck; _a < flagsToCheck_2.length; _a++) {
        var flag = flagsToCheck_2[_a];
        if (currentState[flag] === true) {
            return true;
        }
    }
    return false;
}
exports.hasSomeFlags = hasSomeFlags;
function getFlagsState(currentState) {
    var flagsToGet = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        flagsToGet[_i - 1] = arguments[_i];
    }
    var stateSubset = {};
    for (var _a = 0, flagsToGet_1 = flagsToGet; _a < flagsToGet_1.length; _a++) {
        var flag = flagsToGet_1[_a];
        stateSubset[flag] = currentState[flag];
    }
    return stateSubset;
}
exports.getFlagsState = getFlagsState;
function executeWithActiveFlags(currentState, flagsToSet, action) {
    var initialState = getFlagsState.apply(void 0, [currentState].concat(flagsToSet));
    setFlags.apply(void 0, [currentState].concat(flagsToSet));
    var result = action();
    mergeFlags(currentState, initialState);
    return result;
}
exports.executeWithActiveFlags = executeWithActiveFlags;
//# sourceMappingURL=index.js.map