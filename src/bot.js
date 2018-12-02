const config = require("./config")
const commando = require("discord.js-commando")
// Discord setup
const bot = new commando.Client()
// Registry commands
bot.registry.registerGroup("random", "random")
bot.registry.registerDefaults()
bot.registry.registerCommandsIn(`${__dirname}/discord/commands`)

// Check if bot was started
bot.on("ready", () => {
  console.log(`Logged in as: ${bot.user.tag}!`)
})

bot.on("message", msg => {
  if (msg == "eai") {
    msg.reply("Eai")
  }
})
// login into discord
bot.login(process.env.DISCORD_APPTOKEN)
