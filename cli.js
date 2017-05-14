#!/usr/bin/env node

'use strict';

const dns = require('dns');
const got = require('got');
const cheerio = require('cheerio');
const logUpdate = require('log-update');
const ora = require('ora');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();
const arg = process.argv[2];
const spinner = ora();

if (!arg) {
	console.log(`
 Usage: total-release <package-name>

 Example:
   $ total-release express
   `);
	process.exit(1);
}

dns.lookup('npmjs.com', err => {
	if (err) {
		logUpdate(`\n› Please check your internet connection \n`);
		process.exit(1);
	} else {
		logUpdate();
		spinner.text = `Fetching total release of ${arg}`;
		spinner.start();
	}
});

const check = version => {
	return version.includes('of') === true ? `› ${arg} has total` + version.split('of')[1] + '\n' : '› ' + version.split('is')[0].trim() + ` is the latest release of ${arg}\n`;
};

got(`https://npmjs.com/package/${arg}`).then(res => {
	const $ = cheerio.load(res.body);
	const version = $('.box li').eq(1).text().trim();
	logUpdate(`\n${check(version)}`);
	spinner.stop();
}).catch(err => {
	if (err) {
		logUpdate(`\n› ${arg} is not a node package\n`);
		process.exit(1);
	}
});
