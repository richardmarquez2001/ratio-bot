// Require the necessary discord.js classes
const { Client } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES']] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', (message) => {
	if (message.author.bot) return;
	// message that will be returned eventually
	const messageSend = [];

	// used for help message (message reply)
	let helpCond = true;
	try {
		const parsedMessage = message.content.toLowerCase();

		// second cond prevents bot from ratioing itself, third cond prevents bot from ratioing me (richard)
		if (parsedMessage.includes('ratio') && message.author.id !== '182594613838610432') {
			messageSend.push('ratio');
		}
		// when someone pings ric
		if (message.mentions.has('182594613838610432')) {
			messageSend.push('noti');
		}
		// when someone types in braindead
		if (parsedMessage.includes('braindead')) {
			messageSend.push('i agree');
		}
		// when someone replies
		if (message.type == 'REPLY') {
			// generic help message
			if (message.content == 'help me') {
				helpCond = false;
				message.channel.send('```Hello! I am the ratio bot, created by Ric. Here are some things you can type, and test out!: \n- "ratio"\n- "noti"\n- "braindead"\n- replying to my message!\n\nIf you have more things you\'d like to add, please message ric.```');
			}
			// for 'can i get a ___ ' condition
			else {
				const msgArr = parsedMessage.split(' ');
				let defaultCond = true;
				try {

					if (msgArr.length > 4) {
						// prefix checks for "can i get a"
						const prefix = msgArr.splice(0, 4);
						if (prefix.join(' ').toLocaleLowerCase() == 'can i get a') {
							// gets the second half of the message
							messageSend.push(msgArr.join(' '));

							defaultCond = false;
							// prevents default message from being sent
						}
					}

				}
				// silent return error
				catch (err) {
					message.channel('Somebody tell <@!182594613838610432> a glitch happened');
					return;
				}
				// default message
				if (defaultCond == true) messageSend.push('chill chill');
			}
		}

		if (messageSend.length != 0 && helpCond) {

			message.channel.send(messageSend.join(' + '));
		}
	}
	catch (err) {
		message.channel('Somebody tell <@!182594613838610432> a glitch happened');
		console.log(err);
	}

});

client.on('error', err => {
	console.log(err);
});

// Login to Discord with your client's token
client.login(token);
