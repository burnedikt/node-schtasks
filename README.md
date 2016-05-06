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

