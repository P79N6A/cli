const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const signale = require('signale');

module.exports = (argv) => {
    
    exec('cd ~ && pwd', (err, info) => {
        if (err) {
            signale.info('get root user name failed');
        }
        const file = path.resolve(info.trim(), './.rmbfe.json')
        if (fs.existsSync(file)) {
            const cli = path.join(__dirname, '../relay.sh');
            spawn('sh', ['-c', cli], {stdio: 'inherit'});
        } else {
            signale.fatal(new Error("you dont't have config your configuration, please use rmbfe set"))
        }
    })
}
