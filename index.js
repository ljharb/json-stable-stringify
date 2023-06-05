'use strict';

var jsonStringify = (typeof JSON !== 'undefined' ? JSON : require('jsonify')).stringify;

var isArray = require('isarray');
var objectKeys = require('object-keys');

module.exports = function (obj, opts) {
	if (!opts) { opts = {}; }
	if (typeof opts === 'function') { opts = { cmp: opts }; }
	var space = opts.space || '';
	if (typeof space === 'number') { space = Array(space + 1).join(' '); }
	var cycles = typeof opts.cycles === 'boolean' ? opts.cycles : false;
	var replacer = opts.replacer || function (key, value) { return value; };

	var cmpOpt = opts.cmp;
	var cmp = cmpOpt && function (node) {
		return function (a, b) {
			return cmpOpt(
				{ key: a, value: node[a] },
				{ key: b, value: node[b] }
			);
		};
	};

	var seen = [];
	return (function stringify(parent, key, node, path = []) {
		var indent = space ? '\n' + new Array(path.length + 1).join(space) : '';
		var colonSeparator = space ? ': ' : ':';

		if (node && node.toJSON && typeof node.toJSON === 'function') {
			node = node.toJSON();
		}

		node = replacer.call(parent, key, node, path);

		if (node === undefined) {
			return;
		}
		if (typeof node !== 'object' || node === null) {
			return jsonStringify(node);
		}
		if (isArray(node)) {
			var out = [];
			for (var i = 0; i < node.length; i++) {
				var item = stringify(node, i, node[i], [].concat(path, [i])) || jsonStringify(null);
				out.push(indent + space + item);
			}
			return '[' + out.join(',') + indent + ']';
		}

		if (seen.indexOf(node) !== -1) {
			if (cycles) { return jsonStringify('__cycle__'); }
			throw new TypeError('Converting circular structure to JSON');
		} else { seen.push(node); }

		var keys = objectKeys(node).sort(cmp && (a, b) => cmp(node)(a, b, path));
		var out = [];
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var value = stringify(node, key, node[key], path.concat(key));

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
