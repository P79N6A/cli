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
        if (!fs.existsSync(file)) {
            shelljs.cp('-Rf', path.join(__dirname, '../template/.rmbfe.json'), info.trim());
        }
        setValue(info, argv, file);
    })
}

function setValue(info, argv, file) {
    const value = require(file);
    if (argv._[1] === 'name') {
        if (argv._[2]) {
            write('name', argv._[2], info, file);
            initShell('name', argv._[2], info);
            const cli = path.join(__dirname, '../relay.sh');
            exec(`chmod -R 777 ${cli}`);
        } else {
            signale.pending('please input the otp machine name');
        }
    }

    if (argv._[1] === 'passwd') {
        if (argv._[2]) {
            write('passwd', argv._[2], info, file);
            initShell('passwd', argv._[2], info);
        } else {
            signale.pending('please input your email passwd');
        }
    }

    if (argv._[1] === 'relay') {
        if (argv._[2]) {
            write('relay', argv._[2], info, file);
            initShell('relay', argv._[2], info);
        } else {
            signale.pending('please input the prefix of your email');
        }
    }
}

function write(key, value, info, file) {
    let content = fs.readFileSync(file, 'utf8');
    let relay = `${info.trim().split('/')[2]}@relay.baidu-int.com`;
    if (key === 'relay') {
        relay = `${value}@relay.baidu-int.com`;
    }
    let newContent = content.replace(/(.*\"relay\": \").*(\",?.*)/ig, `$1${relay}$2`);

    if (key === 'name') {
        newContent = newContent.replace(/(.*\"name\": \").*(\",?.*)/ig, `$1${value}$2`);
    }
    if (key === 'passwd') {
        newContent = newContent.replace(/(.*\"passwd\": \").*(\",?.*)/ig, `$1${value}$2`);
    }

    fs.writeFileSync(file, newContent);
}

function initShell(key, value, info) {
    let content = fs.readFileSync(path.join(__dirname, '../relay.sh'), 'utf8');
    let relay = `${info.trim().split('/')[2]}@relay.baidu-int.com`;
    if (key === 'relay') {
        relay = `${value}@relay.baidu-int.com`;
    }
    let newContent = content.replace(/(.*spawn ssh ).*/ig, `$1${relay}`);

    if (key === 'name') {
        newContent = newContent.replace(/(.*send \"ssh --matrix ).*(\\r\"?.*)/ig, `$1${value}$2`);
    }

    if (key === 'passwd') {
        newContent = newContent.replace(/(.*password:"\nsend \").*(\\r?.*)/m, `$1${value}$2`);
    }

    fs.writeFileSync(path.join(__dirname, '../relay.sh'), newContent);
}