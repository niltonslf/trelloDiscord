const commando = require('discord.js-commando')
const UserTasks = require('../../../trello/classes/UserTasks')
const Template = require('../../classes/Messages')
const moment = require('moment')

class MinhasTarefas extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'tasks',
      group: 'random',
      memberName: 'tasks',
      description: 'user jobs list',
      examples: ['tasks', 'tasks']
    })
  }

  async run(message, args) {
    let incompletedTasks = new UserTasks()
    let interval = {}
    if (args.toLowerCase() == 'week') {
      interval = {
        startDate: new moment(),
        endDate: new moment().add(7, 'days')
      }
    }
    incompletedTasks
      .getIncompletedCardsForAllBoards(interval)
      .then(cards => cards.filter(card => Object.keys(card).length)) // Eliminar os nulos
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
