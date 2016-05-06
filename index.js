'use strict';
const execa = require('execa');
const parse = require('csv-parse');

const schtasks = (operation, args) => {
    let _args = [`/${operation}`].concat(args);
    return execa('schtasks', _args);
}

module.exports.create = (opts) => {
    return schtasks('create', opts);
}

module.exports.query = (opts) => {
    let _opts = Object.assign({
        format: 'CSV'
    }, opts);
    let args = [];
    for (let opt in _opts) {
        let arg;
        switch (opt) {
            case 'format':
                args.push('/fo');
                args.push(_opts[opt]);
                args.push('/nh');
                break;
        }
    }
    return schtasks('query', args).then(result => {
        return new Promise((resolve, reject) => {
            parse(result.stdout, {comment: '#', columns: ['taskName', 'nextRunTime', 'status']}, function(err, output){
                if (err) {
                    reject(err);
                } else {
                    resolve(output);
                }
            }); 
        });
    });
}