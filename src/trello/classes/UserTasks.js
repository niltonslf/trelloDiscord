const config = require('../../config')
const Trello = require('trello')
const trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_USER_TOKEN)
const moment = require('moment')

class UserTasks {
  constructor() {
    this.userId = process.env.TRELLO_USERID
  }

  /**
   * This  get cards assigned for the user
   * @param {*} boardID
   */
  async getUserCards(boardID) {
    return await trello
      .getCardsOnBoard(boardID)
      .then(cards => {
        return cards.filter(card => {
          // return only cards that contains userId given
          if (card.idMembers.includes(this.userId)) return card
        })
      })
      .catch(err => console.log(err))
  }
  /**
   * This  get boards assigned for the user
   * @returns prmisse with user boards
   */
  async getUserBoards() {
    return await trello
      .getBoards(this.userId)
      .then(boards => boards.filter(board => board.closed == false))
      .catch(err => console.log(err))
  }

  /**
   * Receive an array of cards returning only cards with due date equals false
   * @param {*} cards
   */
  async getIncompletedCardsOnBoard(boardId) {
    let result = null
    // get cards without due date incompleted
    result = this.getUserCards(boardId)
      .then(cards => cards.filter(card => card.dueComplete === false))
      .catch(err => console.log(err))
    return await result
  }
  /**
   * Method to return all incompleted user tasks
   * @returns Promisse
   */
  async getIncompletedCardsForAllBoards(interval = null) {
    const boards = await this.getUserBoards()
    var result = []
    for (const board of boards) {
      result.push(
        this.getIncompletedCardsOnBoard(board.id, interval)
          .then(cards => cards.filter(card => Object.keys(card).length))
          .then(cards =>
            cards.filter(card => this.verifyInterval(card, interval))
          )
      )
    }
    return await Promise.all(result)
  }

  /**
   * Verificar se um card está entre um intevalo de datas
   * @param {*} card O card que está sendo analisado
   * @param {*} interval objeto com a data de inicio e fim
   */
  verifyInterval(card, interval) {
    // Cards com due até o hoje
    if (interval.startDate === null) {
      if (moment(card.due) <= interval.endDate) return true
    } else {
      // cards dentro do intervalo
      if (
        moment(card.due) >= interval.startDate &&
        moment(card.due) <= interval.endDate
      )
        return true
    }
    return false
  }
}

module.exports = UserTasks
