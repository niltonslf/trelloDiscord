const commando = require('discord.js-commando');

class helpCommand extends commando.Command{
	constructor(client){
		super(client,{
			name:'helplist',
			group: 'random',
			memberName:'helplist',
			description:'list of commands',
			examples:['helplist']
		});
	}

	async run(message, args){
		message.reply("Fraga só. Nessa lista aí tem os bang que sei fazer. Só dar um toque aí que em dois tempo eu faço.\n**Buscar jobs**\n• !jobs\n• !jobsweek\n• !jobsme\n");
	}
}


module.exports = helpCommand;
