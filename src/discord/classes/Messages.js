const config = require('../../config')
const moment = require('moment')
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
    let labels = []

    for (const label in card.labels) {
      if (card.labels[label] != '') {
        labels.push(card.labels[label])
      }
    }

    return `
    Task: ${card.name}
    Completed: ${card.dueComplete}
    Due Date: ${moment(card.due).format('DD/MM/YYYY')}
    Labels: ${labels.join(',')}
    Task url: ${card.shortUrl}`
  }

  static showInfo(data, type) {
    return `Meow :smiley_cat: !!
    Você atualmente está em
    **${data.length}** ${type}. Posso listar todos para voce? (sim/não)`
  }
}

module.exports = Messages
