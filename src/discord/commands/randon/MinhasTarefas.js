const commando = require('discord.js-commando')
const UserTasks = require('../../../trello/classes/UserTasks')
const Template = require('./../../classes/Messages')
class MinhasTarefas extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'minhastarefas',
      group: 'random',
      memberName: 'tarefas',
      description: 'user jobs list',
      examples: ['minhastarefas', 'tarefas']
    })
  }

  async run(message, args) {
    let incompletedTasks = new UserTasks()
    incompletedTasks
      .getUserIncompletedCardsOnBoard()
      .then(cards => {
        //defines message layout
        let template = Template.showInfo(cards, 'cards')
        // send a message with general informations
        message.reply(template)
        this.client.on('message', msg => {
          if (msg == 'sim' || msg == 's') {
            cards.forEach(card => {
              card.forEach(c => {
                message.reply(Template.textCard(c))
              })
            })
          }
        })
      })
      .catch(err => console.log(err))
  }
}

module.exports = MinhasTarefas
