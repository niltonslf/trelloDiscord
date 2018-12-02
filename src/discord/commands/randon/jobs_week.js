const commando = require('discord.js-commando');

class jobsWeekCommand extends commando.Command{
	constructor(client){
		super(client,{
			name:'jobsweek',
			group: 'random',
			memberName:'jobsweek',
			description:'Check for jobs.',
			examples:['jobsweek']
		});
	}

	async run(message, args){
		message.reply("A agência tá maior parada essa semana. Aproveita e fica de boa aí!");
	}
}


module.exports = jobsWeekCommand;
