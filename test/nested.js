'use strict';

var test = require('tape');
var stringify = require('../');

test('nested', function (t) {
	t.plan(1);
	var obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
	t.equal(stringify(obj), '{"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}');
});

test('cyclic (default)', function (t) {
	t.plan(1);
	var one = { a: 1, two: {} };
	var two = { a: 2, one: one };
	one.two = two;
	try {
		stringify(one);
	} catch (ex) {
		if (ex == null) { // eslint-disable-line eqeqeq
			t.fail('nullish exception');
		} else {
			t.equal(ex.toString(), 'TypeError: Converting circular structure to JSON');
		}
	}
});

test('cyclic (specifically allowed)', function (t) {
	t.plan(1);
	var one = { a: 1, two: {} };
	var two = { a: 2, one: one };
	one.two = two;
	t.equal(stringify(one, { cycles: true }), '{"a":1,"two":{"a":2,"one":"__cycle__"}}');
});

test('repeated non-cyclic value', function (t) {
	t.plan(1);
	var one = { x: 1 };
	var two = { a: one, b: one };
	t.equal(stringify(two), '{"a":{"x":1},"b":{"x":1}}');
});

test('acyclic but with reused obj-property pointers', function (t) {
	t.plan(1);
	var x = { a: 1 };
	var y = { b: x, c: x };
	t.equal(stringify(y), '{"b":{"a":1},"c":{"a":1}}');
});

test('cyclic arrays respect both cycle modes', function (t) {
	/** @type {unknown[]} */
	var self = [];
	self.push(self);

	t['throws'](function () { stringify(self); }, TypeError, 'default mode rejects an array cycle');
	t['throws'](function () { stringify(self, { cycles: false }); }, TypeError, 'explicit false rejects an array cycle');
	t.doesNotThrow(function () {
		t.equal(stringify(self, { cycles: true }), '["__cycle__"]');
	});
	t.end();
});

test('mutually cyclic arrays', function (t) {
	/** @type {unknown[]} */
	var one = [];
	/** @type {unknown[]} */
	var two = [];
	one.push(two);
	two.push(one);

	t['throws'](function () { stringify(one); }, TypeError);
	t.doesNotThrow(function () {
		t.equal(stringify(one, { cycles: true }), '[["__cycle__"]]');
	});
	t.doesNotThrow(function () {
		t.equal(stringify(two, { cycles: true }), '[["__cycle__"]]');
	});
	t.end();
});

test('mixed object and array cycles use the current ancestor', function (t) {
	/** @type {unknown[]} */
	var array = [];
	var object = { array: array };
	array.push(object);

	t['throws'](function () { stringify(array); }, TypeError);
	t['throws'](function () { stringify(object); }, TypeError);
	t.doesNotThrow(function () {
		t.equal(stringify(array, { cycles: true }), '[{"array":"__cycle__"}]');
	});
	t.doesNotThrow(function () {
		t.equal(stringify(object, { cycles: true }), '{"array":["__cycle__"]}');
	});
	t.doesNotThrow(function () {
		t.equal(stringify({ nested: array }, { cycles: true }), '{"nested":[{"array":"__cycle__"}]}');
	});
	t.end();
});

test('shared arrays are serialized again after leaving their path', function (t) {
	var shared = [1, { x: 2 }];
	var value = { a: shared, b: [shared] };
	var expected = '{"a":[1,{"x":2}],"b":[[1,{"x":2}]]}';

	t.doesNotThrow(function () {
		t.equal(stringify(value), expected);
	});
	t.doesNotThrow(function () {
		t.equal(stringify(value, { cycles: true }), expected);
	});
	t.doesNotThrow(function () {
		t.equal(stringify([shared, shared]), '[[1,{"x":2}],[1,{"x":2}]]');
	});
	t.doesNotThrow(function () {
		t.equal(stringify([[], []], { collapseEmpty: true, cycles: true }), '[[],[]]');
	});
	t.end();
});

test('repeated cyclic arrays are tracked separately on each path', function (t) {
	/** @type {unknown[]} */
	var array = [];
	array.push(array);

	t.doesNotThrow(function () {
		t.equal(stringify([array, { nested: array }], { cycles: true }), '[["__cycle__"],{"nested":["__cycle__"]}]');
	});
	t.end();
});

test('replacer can remove or introduce an array cycle', function (t) {
	/** @type {unknown[]} */
	var array = [];
	array.push(array);
	/** @type {import('..').StableStringifyOptions['replacer']} */
	var removeCycle = function (_key, value) {
		return this === array ? void undefined : value;
	};

	t.doesNotThrow(function () {
		t.equal(stringify(array, { replacer: removeCycle }), '[null]');
	});
	t.doesNotThrow(function () {
		t.equal(stringify(array, { cycles: true, replacer: removeCycle }), '[null]');
	});

	var ordinary = [1];
	/** @type {import('..').StableStringifyOptions['replacer']} */
	var introduceCycle = function (_key, value) {
		return this === ordinary ? ordinary : value;
	};
	t['throws'](function () { stringify(ordinary, { replacer: introduceCycle }); }, TypeError);
	t.doesNotThrow(function () {
		t.equal(stringify(ordinary, { cycles: true, replacer: introduceCycle }), '["__cycle__"]');
	});
	t.end();
});

test('toJSON conversion runs before array cycle detection', function (t) {
	/** @type {unknown[]} */
	var array = [];
	array.push({ toJSON: function () { return array; } });

	t['throws'](function () { stringify(array); }, TypeError);
	t.doesNotThrow(function () {
		t.equal(stringify(array, { cycles: true }), '["__cycle__"]');
	});
	t.end();
});
