/* eslint-disable */

/*
 * rmbpack 模块入口
 */

const version = require('../package.json').version;
const { exec } = require('child_process');
class App {
    constructor(commander, argv, env) {
        this.register(commander, argv, env)
    }

    register(commander, argv, env) {
        commander
            .version(version)
        if(argv._.length === 0) {
            exec('rmbfe --help', function(err, info) {
                console.log(info)
            });
        }

        // 更新npm依赖包
        commander
            .command('otp')
            .description('automatic open otp develop machine and ues hi app to confirm')
            .action(() => {
                require('../commands/otp')(argv);
            });
        // 更新npm依赖包
        commander
            .command('get')
            .description('get some info about configuration, there are three params such as name relay and passwd')
            .action(() => {
                require('../commands/get')(argv);
            });
        commander
            .command('set')
            .description('set some info in configuration, there are three params such as name relay and passwd')
            .action(() => {
                require('../commands/set')(argv);
            });
        commander
            .command('agile')
            .description('open agile web, ex: ila agile cash')
            .action(() => {
                require('../commands/open')(argv);
            });
        commander
            .command('icode')
            .description('open icode web, ex: ila icode cash')
            .action(() => {
                require('../commands/open')(argv);
            });
        commander
            .command('agroup')
            .description('open agroup')
            .action(() => {
                require('../commands/open')(argv);
            });
        commander.parse(process.argv);
    }
};
module.exports = App;
