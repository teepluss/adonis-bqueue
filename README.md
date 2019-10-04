# Adonis Beequeue Provider

A [Bee-Queue](https://github.com/bee-queue/bee-queue) provider for the Adonis framework.

This library provides an easy way to get started with an asynchronous job queue for AdonisJS.

## Install

```
npm install --save adonis-bqueue
```

## Configure

Register the bqueue provider in `start/app.js`:

```javascript
const providers = [
  ...
  'adonis-bqueue/providers/QueueProvider'
]
```

Register the commands provider in `start/app.js`:

```javascript
const aceProviders = [
  ...
  'adonis-bqueue/providers/CommandsProvider'
]
```

Register the jobs in `start/app.js`:

```javascript
const jobs = [
  ...
  'App/Queues/Example'
]
```

And then export the `jobs` array:

```js
module.exports = { providers, aceProviders, aliases, commands, queues }
```

Add a configuration file in `config/queue.js`. For example:

```javascript
'use strict'

module.exports = {
  connections: {
    default: {
      prefix: 'bq',
      stallInterval: 5000,
      nearTermWindow: 1200000,
      delayedDebounce: 1000,
      redis: {
        host: '127.0.0.1',
        port: 6379,
        db: 14,
        options: {}
      },
      isWorker: true,
      getEvents: true,
      sendEvents: true,
      storeJobs: true,
      ensureScripts: true,
      activateDelayedJobs: false,
      removeOnSuccess: true,
      removeOnFailure: false,
      redisScanCount: 100
    },
    custom: {
      prefix: 'bq',
      stallInterval: 5000,
      nearTermWindow: 1200000,
      delayedDebounce: 1000,
      redis: {
        host: '127.0.0.1',
        port: 6379,
        db: 15,
        options: {}
      },
      isWorker: true,
      getEvents: true,
      sendEvents: true,
      storeJobs: true,
      ensureScripts: true,
      activateDelayedJobs: false,
      removeOnSuccess: true,
      removeOnFailure: false,
      redisScanCount: 100
    }
  }
}
```

## Usage

### Command List
Command               | Description
:---------------------|:-----------
 `adonis bqueue:listen`  | Starting the listener
 `adonis make:queue`    | Make a new Queue (Job)

### Starting the listener

Starting an instance of the bqueue listener is easy with the included ace command. Simply run `adonis bqueue:listen --connection=default`.

### Creating your first job


They expose the following properties:

| Name        | Required | Type      | Static | Description                                           |
|-------------|----------|-----------|--------|-------------------------------------------------------|
| key         | true     | string    | true   | A unique key for this job                             |
| handle      | true     | function  | false  | A function that is called for this job.               |

### Dispatching jobs

Now that your job listener is running and ready to do some asynchronous work, you can start dispatching jobs.

```javascript
const Queue = use('Bqueue')
const Job = use('App/Queue/Example')
const connection = 'custom' // [option] If you not define this will be use `default`
const data = { test: 'data' } // Data to be passed to job handle
const job = Queue.dispatch(Job.key, data, { connection })

// If you want to wait on the result, you can do this
const result = await job.result
```

## Thanks

Special thanks to the creator(s) of [AdonisJS](http://adonisjs.com/) for creating such a great framework.
