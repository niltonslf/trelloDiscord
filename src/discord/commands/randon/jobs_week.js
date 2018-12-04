const commando = require("discord.js-commando")

class jobsWeekCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "jobsweek",
      group: "random",
      memberName: "jobsweek",
      description: "Check for jobs.",
      examples: ["jobsweek"]
    })
  }

  async run(message, args) {
    message.reply("Ops!! Está faltando implementar essa funcionalidade. :/")
  }
}

module.exports = jobsWeekCommand
