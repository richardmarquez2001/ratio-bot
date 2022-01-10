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
	const parsedMessage = message.content.toLowerCase();

	// second cond prevents bot from ratioing itself
	if (parsedMessage.includes('ratio') && message.author.id !== '930038766184304650') {
		message.channel.send('ratio');
	}
	else if (message.mentions.has('182594613838610432')) {
		message.channel.send('noti');
	}
});

client.on('error', err => {
	console.log(err);
});

// Login to Discord with your client's token
client.login(token);
