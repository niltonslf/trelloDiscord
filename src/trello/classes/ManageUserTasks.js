const config = require("../../config")
const Trello = require("trello")
const trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_USER_TOKEN)

class ManageUserTasks {
  constructor() {
    this.userId = process.env.TRELLO_USERID
  }

  /**
   *  to show card informations
   * @param {*} card
   */
  showCardInfo(card) {
    console.log(`
    Task: ${card.name}
    Completed: ${card.dueComplete}
    Due Date: ${card.due}
    Members: ${card.idMembers}
    Labels: ${card.labels}
    Task url: ${card.shortUrl}\n`)
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
   */
  getUserBoards() {
    return trello
      .getBoards(this.userId)
      .then(boards => boards)
      .catch(err => console.log(err))
  }

  /**
   * Receive an array of cards returning only cards with due date equals false
   * @param {*} cards
   */
  async getIncompletedCards(boardId) {
    let params = { dueComplete: false }
    return await trello
      .getCardsOnBoardWithExtraParams(boardId, params)
      .then(res => res)
      .catch(err => console.log(err))
  }
  /**
   * Method to return all incompleted user tasks
   * @returns Promisse
   */
  async getUserIncompletedTasks() {
    let result = []
    // get all boards of the user
    this.getUserBoards()
      .then(boards => {
        boards.map(board => {
          // get user incompleted cards for every board
          this.getIncompletedCards(board.id)
            .then(cards =>
              // return only cards that was assigner to the user
              cards.filter(card => {
                if (card.idMembers.includes(this.userId)) return card
              })
            )
            .then(cards => cards.filter(card => card != null))
            .then(cards => {
              result = cards
            })
            .catch(err => console.log(err))
        })
      })
      .catch(err => console.log(err))
    return await result
  }
}

module.exports = ManageUserTasks
