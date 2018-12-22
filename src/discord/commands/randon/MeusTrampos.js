const commando = require('discord.js-commando')
const fetch = require('node-fetch')
const UserTasks = require('../../../trello/classes/UserTasks')
const Template = require('../../classes/Messages')

class MeusTrampos extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'meustrampos',
      group: 'random',
      memberName: 'trampos',
      description: 'user jobs list',
      examples: ['meustrampos', 'trampos']
    })
  }

  async run(message, args) {
    const userTasks = new UserTasks()
    // get from trello the user incompleted tasks
    userTasks
      .getUserBoards()
      .then(boards => {
        let template = Template.showInfo(boards, 'boards')
        // send a message with general informations
        message.reply(template)

        this.client.on('message', msg => {
          if (msg == 'sim') {
            // run into array sending a message for each board
            boards.forEach((board, index) => {
              console.log(board)
              let messageTemplate = `${index + 1} - :pushpin: ${board.name}`
              // reply the message whit data
              message.reply(messageTemplate)
            })
          }
        })
      })
      .catch(err => console.log(err))
  }
}

module.exports = MeusTrampos
