const commando = require('discord.js-commando')
const fetch = require('node-fetch')
const UserTasks = require('../../../trello/classes/UserTasks')

class MinhasTarefas extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'minhastarefas',
      group: 'random',
      memberName: 'tarefas',
      description: 'user jobs list',
      examples: ['minhastarefas', 'tarefas'],
    })
  }

  async run(message, args) {
    let template = `Card: nome do card`
    let incompletedTasks = new UserTasks()

    console.log(incompletedTasks.getUserIncompletedCards())

    incompletedTasks
      .getUserIncompletedCards()
      .then(cards => {
        console.log(cards)
        // cards.forEach(card => {
        //   message.reply(`card.name`)
        // })
      })
      .catch(err => console.log(err))
  }
}

module.exports = MinhasTarefas
