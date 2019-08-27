#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));
const App = require('../main')
const commander = require('commander');
const Liftoff = require('liftoff');

const cli = new Liftoff({
    name: 'cli',
    extensions: {
        '.js': null,
        '.json': null,
        '.coffee': 'coffee-script/register'
    }
});
cli.launch({
    cwd: argv.cwd
}, function(env) {
    new App(commander, argv, env);
});
