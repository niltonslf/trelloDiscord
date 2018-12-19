const config = require('../../config')

class Messages {
  constructor() {}

  /**
   * @description Recebe um objeto do tipo card retornando-o na forma de log no console
   * @param {*} card
   */
  static debugCard(card) {
    console.log(`
    Task: ${card.name}
    Completed: ${card.dueComplete}
    Due Date: ${card.due}
    Members: ${card.idMembers}
    Labels: ${card.labels}
    Task url: ${card.shortUrl}\n`)
  }

  /**
   * @description Recebe um objeto do tipo card retornando uma string comos dados formatados
   * @param {*} card
   */
  static textCard(card) {
    let template = `
    Task: ${card.name}
    Completed: ${card.dueComplete}
    Due Date: ${card.due}
    Members: ${card.idMembers}
    Labels: ${card.labels}
    Task url: ${card.shortUrl}`

    return template
  }
}

module.exports = Messages
