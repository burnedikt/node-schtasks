'use strict';

const chai = require('chai');
const expect = chai.expect;
const schtasks = require('../');

describe('Taskscheduler', function() {
    it('should list all scheduled tasks', function(done) {
        schtasks.query().then((tasks) => {
            expect(tasks).to.be.an('array');
            expect(tasks).to.have.length.at.least(1);
            done();
        }, done);
    });
    
    it('should create a scheduled task that runs on logon and delete it again', function(done) {
        const taskData = {
            taskName: 'My Task Name',
            taskRun: 'notepad.exe',
            scheduleType: 'ONLOGON',
            privilegedUser: 'SYSTEM'
        };
        schtasks.create(taskData).then(() => {
            schtasks.query().then((tasks) => {
                expect(tasks).to.be.an('array');
                expect(tasks).to.have.length.at.least(1);
                // make sure the new task is in the list of tasks
                let needle = tasks.find((task) => {
                    return task.taskName === `\\${taskData.taskName}`;
                });
                expect(needle).to.not.be.equal(undefined);
                expect(needle).to.not.be.equal(null);
                // be nice and remove it again
                done();
            }, done);
        }, done);
    });
});