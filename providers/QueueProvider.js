'use strict'

const path = require('path')
const { ServiceProvider } = require('@adonisjs/fold')

class QueueProvider extends ServiceProvider {
  register () {
    this.app.singleton('Adonis/Addons/Bqueue', function (app) {
      const Config = app.use('Adonis/Src/Config')
      const Helpers = app.use('Adonis/Src/Helpers')
      const { queues } = require(path.join(Helpers.appRoot(), 'start/app.js')) || {}
      return new (require('../src/Queue'))(Config, queues || [])
      // return new (require('../'))(Config, queues || [])
    })

    this.app.alias('Adonis/Addons/Bqueuee', 'Bqueue')
  }
}

module.exports = QueueProvider
