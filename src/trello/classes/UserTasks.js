const config = require('../../config')
const Trello = require('trello')
const trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_USER_TOKEN)

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
  getUserBoards() {
    return trello
      .getBoards(this.userId)
      .then(boards => boards.filter(board => board.closed == false))
      .then(boards => boards)
      .catch(err => console.log(err))
  }

  /**
   * Receive an array of cards returning only cards with due date equals false
   * @param {*} cards
   */
  getBoardIncompletedCards(boardId) {
    let params = { dueComplete: false }
    let result = trello
      .getCardsOnBoardWithExtraParams(boardId, params)
      .then(cards => {
        // returns to the user only not null and assigned to the user
        return cards.filter(card => {
          if (card => card != null && card.idMembers.includes(this.userId))
            return card
        })
      })
      .catch(err => console.log(err))
    return result
  }
  /**
   * Method to return all incompleted user tasks
   * @returns Promisse
   */
  async getUserIncompletedCards() {
    let result = []
    this.getUserBoards()
      .then(boards =>
        boards.map(board => {
          // get user incompleted cards for every board
          result.push(this.getBoardIncompletedCards(board.id))
        })
      )
      .catch(err => console.log(err))
    return await result
  }
}

module.exports = UserTasks
