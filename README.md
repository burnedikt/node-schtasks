# node-schtasks

## Wrapper for schtasks

Wrapper for the Windows `schtasks` command. Used to list, add and modify scheduled tasks.

----

>Task Scheduler is a component of Microsoft Windows that provides the ability to schedule the launch of programs or scripts at pre-defined times or after specified time intervals. It was first introduced in the Microsoft Plus! for Windows 95 as System Agent but was renamed to Task Scheduler in Windows 98. The Windows Event Log service must be running before the Task Scheduler starts up.

### Installation

This package is still in an early development stage and as such is not yet published on npm.
To install it nonetheless, simply run:

```
npm install --save burnedikt/node-schtasks
```

### Usage

```js
const schtasks = require('node-schtasks');
```

#### Query / Find / List Tasks

```js
const schtasks = require('node-schtasks');

schtasks.query().then((tasks) => {
    console.log(tasks);
});
```

#### Create Task

> Unfortunately, creating tasks requires administrator privileges, so you'll either have to run your node js script
 in a bash / cmd with administrator privileges (elevated), or use a suitable node module to run your script in an 
 elevated mode. E.g., check out [elevator](https://www.npmjs.com/package/elevator)...

```js
const schtasks = require('node-schtasks');

var job = {
	taskName: 'test1',
	scheduleType: 'ONLOGON', // refer to https://technet.microsoft.com/en-us/library/cc772785(v=ws.10).aspx#BKMK_create for more values
	taskrun: 'notepad.exe', // path needs to be absolute, else it is suspected to be relative to System32
	force: true // force creation even if the task does alraedy exist
};

schtasks.create(job).then(() => {
    console.log('task created');
});
```

##### Modify Task

t.b.d.

##### Run Task

t.b.d.

#### Delete Task

t.b.d.

### Testing

There is a small set of testcases available in the tests
 folder that can be run using `mocha` (assuming you installed mocha with `npm install -g mocha`).
 
Please be aware that the testcase for creating a scheduled task requires administrator privileges so 
 you are required to run the tests in an elevated bash / cmd.
