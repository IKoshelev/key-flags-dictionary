import * as mocha from 'mocha';
import { expect } from 'chai';

import {
    executeWithActiveFlags, getFlagsState, hasAllFlags, hasExactlyFlags,
    hasSomeFlags, KeyFlagsDict, mergeFlags, setFlags, unsetFlags
} from '../src/index';

type Foo = {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
}

describe('Flags', () => {

    it('can be set and unset', () => {

        const flags: KeyFlagsDict<Foo> = {};

        expect(flags.a).to.equal(undefined);
        expect(flags.b).to.equal(undefined);
        expect(flags.c).to.equal(undefined);

        setFlags(flags, 'a', 'b');

        expect(flags.a).to.equal(true);
        expect(flags.b).to.equal(true);
        expect(flags.c).to.equal(undefined);

        unsetFlags(flags, 'a');

        expect(flags.a).to.equal(false);
        expect(flags.b).to.equal(true);
        expect(flags.c).to.equal(undefined);
    });

    it('state can be checked', () => {
        const flags: KeyFlagsDict<Foo> = {};

        setFlags(flags, 'a', 'b');

        const subset = getFlagsState(flags, 'a', 'c');

        expect(subset.a).to.equal(true);
        expect(subset.b).to.equal(undefined);
        expect(subset.c).to.equal(undefined);

        const check1 = hasAllFlags(flags, 'a');
        expect(check1).to.equal(true);

        const check2 = hasAllFlags(flags, 'c');
        expect(check2).to.equal(false);

        const check3 = hasAllFlags(flags, 'a', 'c');
        expect(check3).to.equal(false);

        const check4 = hasSomeFlags(flags, 'a', 'c');
        expect(check4).to.equal(true);

        const check5 = hasSomeFlags(flags, 'c', 'd');
        expect(check5).to.equal(false);

        const check6 = hasExactlyFlags(flags, 'a', 'b', 'c');
        expect(check6).to.equal(false);

        const check7 = hasExactlyFlags(flags, 'a', 'b');
        expect(check7).to.equal(true);

    });

    it('state can be merged', () => {

        const flags1: KeyFlagsDict<Foo> = {};
        setFlags(flags1, 'a', 'b');

        const flags2: KeyFlagsDict<Foo> = {};
        setFlags(flags2, 'd', 'e');

        const check1 = hasAllFlags(flags1, 'a', 'b');
        expect(check1).to.equal(true);

        const check2 = hasAllFlags(flags1, 'd', 'e');
        expect(check2).to.equal(false);

        mergeFlags(flags1, flags2);

        const check3 = hasAllFlags(flags1, 'a', 'b', 'd', 'e');
        expect(check3).to.equal(true);
    });

    it('executeWithActiveFlags will set given flags to true, execute action and reset those flags state to inital', () => {

        const flags: KeyFlagsDict<Foo> = {};

        setFlags(flags, 'a', 'b');
        const check1 = hasExactlyFlags(flags, 'a', 'b');
        expect(check1).to.equal(true);

        const result = executeWithActiveFlags(flags, ['b', 'c'], () => {
            const check2 = hasExactlyFlags(flags, 'a', 'b', 'c');
            expect(check2).to.equal(true);

            return 5;
        });

        expect(result).to.equal(5);

        const check3 = hasExactlyFlags(flags, 'a', 'b');
        expect(check3).to.equal(true);
    });

});
