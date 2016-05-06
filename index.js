'use strict';
const execa = require('execa');
const parse = require('csv-parse');

const ScheduleTypeEnum = Object.freeze({
   MINUTE: "MINUTE",
   HOURLY: "HOURLY",
   DAILY: "DAILY",
   WEEKLY: "WEEKLY",
   MONTHLY: "MONTHLY",
   ONCE: "ONCE",
   ONSTART: "ONSTART",
   ONLOGON: "ONLOGON",
   ONIDLE: "ONIDLE" 
});

const schtasks = (operation, args) => {
    let _args = [`/${operation}`].concat(args);
    return execa('schtasks', _args);
}

module.exports.create = (opts) => {
    let _opts = Object.assign({
        taskName: 'My Task Name',
        scheduleType: ScheduleTypeEnum.ONIDLE,
        taskRun: '',
        force: true
    }, opts);
    let args = [];
    // support for different arguments, check https://technet.microsoft.com/en-us/library/cc772785(v=ws.10).aspx#BKMK_query
    for (let opt in _opts) {
        let optVal = _opts[opt];
        switch (opt) {
            case 'taskName':
                args.push('/tn');
                args.push(`${optVal}`);
                break;
            case 'scheduleType':
                args.push('/sc');
                args.push(optVal);
                break;
            case 'taskRun':
                args.push('/tr');
                args.push(`${optVal}`);
                break;
            case 'computer':
                args.push('/s');
                args.push(optVal);
                break;
            case 'user':
                args.push('/u');
                args.push(optVal);
                break;
            case 'password':
                args.push('/s');
                args.push(optVal);
                break;
            case 'privilegedUser':
                args.push('/ru');
                args.push(optVal);
                break;
            case 'privilegedPassword':
                args.push('/rp');
                args.push(optVal);
                break;
            case 'modifier':
                args.push('/mo');
                args.push(optVal);
                break;
            case 'day':
                args.push('/d');
                args.push(optVal);
                break;
            case 'month':
                args.push('/m');
                args.push(optVal);
                break;
            case 'idleTime':
                args.push('/i');
                args.push(optVal);
                break;
            case 'startTime':
                args.push('/st');
                args.push(optVal);
                break;
            case 'interval':
                args.push('/ri');
                args.push(optVal);
                break;
            case 'endTime':
                args.push('/et');
                args.push(optVal);
                break;
            case 'duration':
                args.push('/du');
                args.push(optVal);
                break;
            case 'stop':
                args.push('/k');
                break;
            case 'startDate':
                args.push('/sd');
                args.push(optVal);
                break;
            case 'endDate':
                args.push('/ed');
                args.push(optVal);
                break;
            case 'onlyRunAs':
                args.push('/it');
                break;
            case 'deleteTaskOnScheduleCompletion':
                args.push('/Z');
                break;
            case 'force':
                args.push('/F');
                break;
            case 'runLevel':
                args.push('/RL');
                args.push(optVal);
                break;
        }
    }
    return schtasks('create', args).then((result) => {
        return result;
    }, (err) => {
        if (err.stderr.indexOf('ERROR: Access is denied.') > -1) {
            console.error('Please run schtasks in a bash / cmd with admin rights. Else, creating scheduled tasks is not allowed')
        } else {
            console.log(err);
        }
        throw err;
    });
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