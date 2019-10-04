'use strict';

const BeeQueue = require('bee-queue');

const {
  ioc
} = require('@adonisjs/fold');

class Queue {
  constructor(Config, queues = []) {
    this.Config = Config;
    this._queuesPool = {};
    this.queues = queues;
    this.registeredJobs = [];
  }

  get(key, connection) {
    /**
     * If there is an instance of queue already, then return it
     */
    if (this._queuesPool[key]) {
      return this._queuesPool[key];
    }
    /**
     * Read configuration using Config
     * provider
     */


    const config = this.Config.get(`queue.connections.${connection}`);
    /**
     * Create a new queue instance and save it's
     * reference
     */

    this._queuesPool[key] = new BeeQueue(key, config);
    /**
     * Return the instance back
     */

    return this._queuesPool[key];
  }

  dispatch(key, data, {
    connection = 'default',
    timeout = 300000,
    retries = 1,
    jobFn = () => {}
  } = {}) {
    // console.log(connection, timeout)
    if (typeof key !== 'string') {
      throw new Error(`Expected job key to be of type string but got <${typeof key}>.`);
    }

    const job = this.get(key, connection).createJob(data);
    job.timeout(timeout).retries(retries).save(); // allow custom functions to be called on the job, e.g. backoff

    jobFn(job); // Add promise proxy on job for complete event

    job.result = new Promise((resolve, reject) => {
      job.on('succeeded', result => {
        resolve(`Received result for job ${job.id}: ${result}`);
      });
    });
    return job;
  }

  listen(connection) {
    this.queues.forEach(link => {
      const Job = ioc.use(link); // Every job must expose a key

      if (!Job.key) {
        throw new Error(`No key found for job: ${link}`);
      }

      const jobInstance = ioc.make(Job); // Every job must expose a handle function

      if (!jobInstance.handle) {
        throw new Error(`No handler found for job: ${link}`);
      } // Track currently registered jobs in memory


      this.registeredJobs.push(Job);
      this.get(Job.key, connection).process(function (job, done) {
        jobInstance.handle(job.data).then(result => {
          done(null, result);
        }).catch(error => {
          this.Logger.error(`Error processing job. type=${job.type} id=${job.id}`);
          done(error);
        });
      });
    });
  }

}

module.exports = Queue;
