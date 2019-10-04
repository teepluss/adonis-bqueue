'use strict';

const {
  Command
} = require('@adonisjs/ace');

class Listen extends Command {
  static get inject() {
    return ['Adonis/Addons/Bqueue'];
  }

  constructor(Queue) {
    super();
    this.Queue = Queue;
  }

  static get signature() {
    return `
      bqueue:listen
      { --connection=@value : Define a connection to be used  }
    `;
  }

  static get description() {
    return 'Tell something helpful about this command';
  }

  async handle(args, options) {
    if (!options.connection) {
      options.connection = 'default';
    }

    this.Queue.listen(options.connection);
  }

}

module.exports = Listen;
