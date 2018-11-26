import config from "../config"
const Trello = require("trello")
const trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_USER_TOKEN)

export default class ManageUserTasks {
  constructor(userId) {
    this.userId = userId
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
  async getUserBoards() {
    return await trello
      .getBoards(this.userId)
      .then(boards => boards)
      .catch(err => console.log(err))
  }

  /**
   * Receive an array of cards returning only cards with due date equals false
   * @param {*} cards
   */
  getIncompletedCards(boardId) {
    let params = { dueComplete: false }
    return trello
      .getCardsOnBoardWithExtraParams(boardId, params)
      .then(res => res)
      .catch(err => console.log(err))
  }

  getUserIncompletedTasks() {
    // get all boards of the user
    this.getUserBoards()
      .then(boards => {
        boards.map(board => {
          // get user incompleted cards for every board
          this.getIncompletedCards(board.id)
            .then(cards => {
              cards.forEach(card => this.showCardInfo(card))
            })
            .catch(err => console.log(err))
        })
      })
      .catch(err => console.log(err))
  }
}
