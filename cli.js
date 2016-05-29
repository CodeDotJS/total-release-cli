#!/usr/bin/env node

'use strict';

const totalRelease = require('total-release');

const colors = require('colors/safe');

const args = process.argv.slice(2);

if (process.argv.slice(2).length === 0) {
	console.log(colors.cyan.bold('\n Usage : totalRelease [package-name]\n'));
	console.log(colors.green.bold(' ❱ Example : totalRelease express\n'));
	process.exit(1);
}

const npmPack = args.toString();

const message = `Fetching total releases of ${args}...`;

console.log(message);

totalRelease(npmPack).then(console.log);
