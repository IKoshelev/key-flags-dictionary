"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var index_1 = require("../src/index");
describe('Flags', function () {
    it('can be set and unset', function () {
        var flags = {};
        chai_1.expect(flags.a).to.equal(undefined);
        chai_1.expect(flags.b).to.equal(undefined);
        chai_1.expect(flags.c).to.equal(undefined);
        index_1.setFlags(flags, 'a', 'b');
        chai_1.expect(flags.a).to.equal(true);
        chai_1.expect(flags.b).to.equal(true);
        chai_1.expect(flags.c).to.equal(undefined);
        index_1.unsetFlags(flags, 'a');
        chai_1.expect(flags.a).to.equal(false);
        chai_1.expect(flags.b).to.equal(true);
        chai_1.expect(flags.c).to.equal(undefined);
    });
    it('state can be checked', function () {
        var flags = {};
        index_1.setFlags(flags, 'a', 'b');
        var subset = index_1.getFlagsState(flags, 'a', 'c');
        chai_1.expect(subset.a).to.equal(true);
        chai_1.expect(subset.b).to.equal(undefined);
        chai_1.expect(subset.c).to.equal(undefined);
        var check1 = index_1.hasAllFlags(flags, 'a');
        chai_1.expect(check1).to.equal(true);
        var check2 = index_1.hasAllFlags(flags, 'c');
        chai_1.expect(check2).to.equal(false);
        var check3 = index_1.hasAllFlags(flags, 'a', 'c');
        chai_1.expect(check3).to.equal(false);
        var check4 = index_1.hasSomeFlags(flags, 'a', 'c');
        chai_1.expect(check4).to.equal(true);
        var check5 = index_1.hasSomeFlags(flags, 'c', 'd');
        chai_1.expect(check5).to.equal(false);
        var check6 = index_1.hasExactlyFlags(flags, 'a', 'b', 'c');
        chai_1.expect(check6).to.equal(false);
        var check7 = index_1.hasExactlyFlags(flags, 'a', 'b');
        chai_1.expect(check7).to.equal(true);
    });
    it('state can be merged', function () {
        var flags1 = {};
        index_1.setFlags(flags1, 'a', 'b');
        var flags2 = {};
        index_1.setFlags(flags2, 'd', 'e');
        var check1 = index_1.hasAllFlags(flags1, 'a', 'b');
        chai_1.expect(check1).to.equal(true);
        var check2 = index_1.hasAllFlags(flags1, 'd', 'e');
        chai_1.expect(check2).to.equal(false);
        index_1.mergeFlags(flags1, flags2);
        var check3 = index_1.hasAllFlags(flags1, 'a', 'b', 'd', 'e');
        chai_1.expect(check3).to.equal(true);
    });
    it('executeWithActiveFlags will set given flags to true, execute action and reset those flags state to inital', function () {
        var flags = {};
        index_1.setFlags(flags, 'a', 'b');
        var check1 = index_1.hasExactlyFlags(flags, 'a', 'b');
        chai_1.expect(check1).to.equal(true);
        var result = index_1.executeWithActiveFlags(flags, ['b', 'c'], function () {
            var check2 = index_1.hasExactlyFlags(flags, 'a', 'b', 'c');
            chai_1.expect(check2).to.equal(true);
            return 5;
        });
        chai_1.expect(result).to.equal(5);
        var check3 = index_1.hasExactlyFlags(flags, 'a', 'b');
        chai_1.expect(check3).to.equal(true);
    });
});
//# sourceMappingURL=index.test.js.map