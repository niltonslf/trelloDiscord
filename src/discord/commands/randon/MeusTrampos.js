const commando = require("discord.js-commando")
const fetch = require("node-fetch")

class MeusTrampos extends commando.Command {
  constructor(client) {
    super(client, {
      name: "meustrampos",
      group: "random",
      memberName: "trampos",
      description: "user jobs list",
      examples: ["meustrampos", "trampos"]
    })
  }

  async run(message, args) {
    const ManageUserTasks = require("../../../trello/classes/ManageUserTasks")
    const userTasks = new ManageUserTasks()
    // get from trello the user incompleted tasks
    userTasks
      .getUserBoards()
      .then(boards => {
        //defines message layout
        let messageInfo = `Meow :smiley_cat: !! 
        Você atualmente está em 
        **${boards.length}** boards. Posso listar todos para voce? (sim/não)`
        // send a message with general informations
        message.reply(messageInfo)

        this.client.on("message", msg => {
          if (msg == "sim") {
            msg.reply("Pera aí... to pegando")
            setTimeout(() => {
              msg.reply("Acheeeei!!")
            }, 500)
            setTimeout(() => {
              // run into array sending a message for each board
              boards.forEach((board, index) => {
                let messageTemplate = `${index + 1} - :pushpin: ${board.name}`
                // reply the message whit data
                message.reply(messageTemplate)
              })
            }, 1000)
          }
        })
      })
      .catch(err => console.log(err))
  }
}

module.exports = MeusTrampos
