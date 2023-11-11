'use strict';

var jsonStringify = (typeof JSON !== 'undefined' ? JSON : require('jsonify')).stringify;

var isArray = require('isarray');
var objectKeys = require('object-keys');
var callBind = require('call-bind');

var strRepeat = function repeat(n, char) {
	var str = '';
	for (var i = 0; i < n; i += 1) {
		str += char;
	}
	return str;
};

module.exports = function (obj, opts) {
	if (!opts) { opts = {}; }
	if (typeof opts === 'function') { opts = { cmp: opts }; }
	var space = opts.space || '';
	if (typeof space === 'number') { space = strRepeat(space, ' '); }
	var cycles = typeof opts.cycles === 'boolean' ? opts.cycles : false;
	var replacer = opts.replacer ? callBind(opts.replacer) : function (parent, key, value) { return value; };

	var cmpOpt = opts.cmp;
	var cmp = cmpOpt && function (node) {
		var get = cmpOpt.length > 2 && function get(k) { return node[k]; };
		return function (a, b) {
			return cmpOpt(
				{ key: a, value: node[a] },
				{ key: b, value: node[b] },
				get ? { __proto__: null, get: get } : void undefined
			);
		};
	};

	var seen = [];
	return (function stringify(parent, key, node, level) {
		var indent = space ? '\n' + strRepeat(level, space) : '';
		var colonSeparator = space ? ': ' : ':';

		if (node && node.toJSON && typeof node.toJSON === 'function') {
			node = node.toJSON();
		}

		node = replacer(parent, key, node);

		if (node === undefined) {
			return;
		}
		if (typeof node !== 'object' || node === null) {
			return jsonStringify(node);
		}
		if (isArray(node)) {
			var out = [];
			for (var i = 0; i < node.length; i++) {
				var item = stringify(node, i, node[i], level + 1) || jsonStringify(null);
				out.push(indent + space + item);
			}
			return '[' + out.join(',') + indent + ']';
		}

		if (seen.indexOf(node) !== -1) {
			if (cycles) { return jsonStringify('__cycle__'); }
			throw new TypeError('Converting circular structure to JSON');
		} else { seen.push(node); }

		var keys = objectKeys(node).sort(cmp && cmp(node));
		var out = [];
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var value = stringify(node, key, node[key], level + 1);

			if (!value) { continue; }

			var keyValue = jsonStringify(key)
				+ colonSeparator
				+ value;

			out.push(indent + space + keyValue);
		}
		seen.splice(seen.indexOf(node), 1);
		return '{' + out.join(',') + indent + '}';

	}({ '': obj }, '', obj, 0));
};
