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
});