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
