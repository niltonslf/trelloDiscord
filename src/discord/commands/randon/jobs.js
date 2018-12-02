// const TRELLO_APPKEY = '914496ed63a36468c6c75be7950a2f95';
// const TRELLO_USERTOKEN = '5e3e3d3ca88c923ada62f7ebd2413b020ea61dff049dc87966fc4adbb3b775f3';
// const boardId = 'W7YAx5so'; // TODO: Make this dinamic

// // Set up
// const commando = require('discord.js-commando');
// const Trello = require('trello');
// const request = require('request');
// const q = require('q');

// const trello = new Trello(TRELLO_APPKEY, TRELLO_USERTOKEN);

// class JobsCommand extends commando.Command{
// 	constructor(client){
// 		super(client,{
// 			name:'jobs',
// 			group: 'random',
// 			memberName:'jobs',
// 			description:'Check for jobs.',
// 			examples:['jobs']
// 		});
// 	}

// 	async run(message, args){
// 		message.reply("Pode crêr...");
// 		//Funny message
// 		setTimeout(() =>{
// 			message.reply('Seguinte. Achei esses job aí:');
// 		},1000);

// 		// wait a little
// 		setTimeout(() =>{
// 			// get lists on board
// 			trello.getListsOnBoard(boardId).then((lists) => {
// 				let boardUrl = `https://api.trello.com/1/boards/${boardId}?key=${TRELLO_APPKEY}&token=${TRELLO_USERTOKEN}`;

// 				this.makeRequest(boardUrl).then((data)=>{
// 					var board = JSON.parse(data); // parse response to JSON

// 					// show send board Name
// 					message.channel.sendMessage(`Cliente: **${board.name}**\n`);


// 					// get all lists finded and send a message to the user
// 					lists.map((list) => {

// 						/*
// 						*	Alghoritm
// 						* Get all cards from current list > filter only active cards >
// 						* loop tasks array to show all cards (tasks)
// 						*/

// 						// Tasks format
// 						var tasks = [
// 							`\t**Tarefas:**`
// 						];
// 						trello.getCardsOnList(list.id).then((cards) => {
// 							cards.map((card) =>{
// 								tasks.push(`\t\t :pushpin:: **${card.name}**`);
// 								tasks.push(`\t\t :busts_in_silhouette:: **Nilton Lopes**`);
// 								tasks.push(`\t\t :calendar:: **${card.due}**`);
// 								tasks.push(`\t\t :link:: **${card.url}**`);
// 								tasks.push('\t----------------------');
// 							});

// 							// Message format
// 							let jobInfor = [
// 								`Job: **${list.name}**`,
// 								tasks.join('\n'),
// 							];
// 							// Show only active jobs
// 							if (list.closed == false) {
// 								message.channel.sendMessage(jobInfor.join('\n'));
// 							}
// 						});
// 					});
// 				});
// 			});
// 		},2000);

// 	}

// 	/*
// 	* Make request and get data from board
// 	*/
// 	makeRequest(boardUrl){
// 		var def = q.defer();
// 		request(boardUrl, (error,response,body) => {
// 			this.board = JSON.parse(body);
// 			if (error) { throw error }
// 			def.resolve(body);
// 		});
// 		return def.promise;
// 	}

// } // End class

// // Export module
// module.exports = JobsCommand;
