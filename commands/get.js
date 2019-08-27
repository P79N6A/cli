const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const signale = require('signale');
const shelljs = require('shelljs');


module.exports = (argv) => {
    exec('cd ~ && pwd', (err, info) => {
        if (err) {
            signale.info('get root user name failed');
        }
        const file = path.resolve(info.trim(), './.rmbfe.json')
        if (fs.existsSync(file)) {
            const value = require(file)
            if (argv._[1] === 'name') {
                console.log(value.name);
            }

            if (argv._[1] === 'passwd') {
                console.log(value.passwd);
            }

            if (argv._[1] === 'relay') {
                console.log(value.relay);
            }
        } else {
            shelljs.cp('-Rf', path.join(__dirname, '../template/.rmbfe.json'), info.trim());
            if (argv._[1] === 'name' || argv._[1] === 'relay' || argv._[1] === 'passwd') {
                signale.pending('please config your configuration at first');
            } else {
                signale.pending('which value you want to get? name or relay or passwd');
            }
        }
    })
}