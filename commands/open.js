const open = require('open');

module.exports = (argv) => {
    let baseurl = '';
    let baseName = '';

    if(argv._[1]) {
        const baseArr = ['cashvideo', 'mvideo-activity', 'mvideo-app', 'mvideo-growth', 'mvideo-pc'];
        for(let item of baseArr) {
            if (item.indexOf(argv._[1]) > -1) {
                baseName = item;
            }
        }
    }
    baseName = baseName || 'cashvideo'
    if(argv._[0] === 'icode') {
        baseurl = `http://icode.baidu.com/repos/baidu/rmbfe/${baseName}/tree/master`;
    }

    if(argv._[0] === 'agile') {
        baseurl = `http://agile.baidu.com/#/builds/baidu/rmbfe/${baseName}@BranchPipeline@branches`;
    }

    if(argv._[0] === 'agroup') {
        baseurl = 'http://agroup.baidu.com/video-fe/file/view/0';
    }
    console.log(baseurl)
    open(baseurl);
}