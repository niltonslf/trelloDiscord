const commando = require("discord.js-commando")

class helpCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "helplist",
      group: "random",
      memberName: "helplist",
      description: "list of commands",
      examples: ["helplist"]
    })
  }

  async run(message, args) {
    message.reply(
      "Até o momento consigo fazer os seguintes comandos:.\n**Buscar jobs**\n• !jobs\n• !jobsweek\n• !jobsme\n"
    )
  }
}

module.exports = helpCommand
