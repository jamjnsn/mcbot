const Rcon = require('rcon/node-rcon.js');
const Discord = require('discord.js');

const prefix = process.env.COMMAND_PREFIX || '/';
const token = process.env.DISCORD_TOKEN || '';
const rconfig = {
	host: process.env.RCON_HOST || 'localhost',
	port: Number(process.env.RCON_PORT || 25575),
	password: process.env.RCON_PASSWORD || ''
}

console.log(rconfig);

// Create Discord client
const client = new Discord.Client();

client.once('ready', () => {
	// Bot is up and listening
	console.log('[Discord] Ready.');
});

client.on('message', message => {
	// Message received in channel
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();	

	if (command === 'whitelist') {
		if(!args.length) {
			return message.channel.send("Please provide your Minecraft username.");
		}
		
		rconClient.send(`whitelist add ${args[0]}`);
		console.log(`[Discord] whitelist: ${args[0]}`);

		message.channel.send(`Whitelisted ${args[0]}!`);
	} else if(command === 'say') {
		let sayMessage = args.join(' ');
		console.log(`[Discord] say: ${sayMessage}`);
		rconClient.send(`/tellraw @a {"text":"[${message.member.nickname}] ${sayMessage}","color":"#7289da"}`);
	}
});

// Create rcon client
const rconClient = new Rcon(rconfig.host, rconfig.port, rconfig.password, {
    "tcp": true,
    "challenge": false
});

rconClient.on('auth', function() {
	console.log("[rcon] Authorized.");
	client.login(token); // Start Discord client
}).on('response', function(str){
	console.log("[rcon] Response: " + str);
}).on('end', function(){
	console.log("[rcon] Socket closed.");
	process.exit();
});

rconClient.connect();