require("dotenv").config()
const Trello = require("trello")
const trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_USER_TOKEN)
const userID = process.env.TRELLO_USERID

/**
 * Function to show card informations
 * @param {*} card
 */
function showCardInfo(card) {
  console.log(`
    Task: ${card.name}
    Completed: ${card.dueComplete}
    Due Date: ${card.due}
    Members: ${card.idMembers}
    Labels: ${card.labels}
    Task url: ${card.shortUrl}\n`)
}

/**
 * This function get cards assigned for userid
 * @param {*} userID
 * @param {*} boardID
 */
async function getUserCards(userID, boardID) {
  return await trello
    .getCardsOnBoard(boardID)
    .then(cards => {
      return cards.filter(card => {
        // return only cards that contains userid given
        if (card.idMembers.includes(userID)) return card
      })
    })
    .catch(err => console.log(err))
}

/**
 * Receive an array of cards returning only cards with due date equals false
 * @param {*} cards
 */
function getIncompletedCards(cards) {
  return cards.filter(card => card.dueComplete == false)
}

function getUserIncompletedTasks(userID) {
  let boardID = "5b7ef268aae54d64b6577bbc"
  return getUserCards(userID, boardID).then(cards => {
    return getIncompletedCards(cards)
  })
}

getUserIncompletedTasks(userID).then(tasks => {
  tasks.map(task => {
    task.labels = task.labels.map(label => label.name).join(",")
    showCardInfo(task)
  })
})
