'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class CommandsProvider extends ServiceProvider {
  register () {
    this.app.bind('Adonis/Commands/Bqueue:Listen', () => require('../src/Commands/Listen'))
    this.app.bind('Adonis/Commands/Make:Queue', () => require('../src/Commands/MakeQueue'))
  }

  boot () {
    const ace = require('@adonisjs/ace')
    ace.addCommand('Adonis/Commands/Bqueue:Listen')
    ace.addCommand('Adonis/Commands/Make:Queue')
  }
}

module.exports = CommandsProvider
