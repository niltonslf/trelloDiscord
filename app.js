const Trello = require("trello")
const trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_USER_TOKEN)

trello
  .getBoards(process.env.TRELLO_USERID)
  .then(boards => boards.map(board => console.log(board.name)))

/**
 * TODO: Get
 * 
 */