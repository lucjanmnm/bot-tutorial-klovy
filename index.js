const { loadEvents } = require("./handler"); 
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: Object.keys(GatewayIntentBits).map((a) => {return GatewayIntentBits[a] }), });

require('dotenv').config();

client.on('ready', () => {
  console.log('Bot działa');
});

loadEvents(client);

client.login(process.env.TOKEN); 