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
    // support for different arguments, check https://technet.microsoft.com/en-us/library/cc772785(v=ws.10).aspx#BKMK_query
    for (let opt in _opts) {
        let optVal = _opts[opt];
        switch (opt) {
            case 'format':
                args.push('/fo');
                args.push(optVal);
                args.push('/nh');
                break;
            case 'computer':
                args.push('/c');
                args.push(optVal);
                break;
            case 'user':
                args.push('/u');
                args.push(optVal);
                break;
            case 'password':
                args.push('/p');
                args.push(optVal);
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

module.exports.list = module.exports.query;