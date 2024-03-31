const { Client, Collection } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10")
const fs = require("fs");
require("dotenv").config();


/**
 * 
 * @param {Client} client 
 */
async function loadCommands(client) {
    client.commands = new Collection();

    const folder = "./src/commands";
    const files = fs.readdirSync(folder).map(el => `${folder}/${el}`);

    const rest = new REST({ version: 10 }).setToken(process.env.TOKEN);

    const commands = [];

    for(const file of files) {
        if(!fs.statSync(file).isFile()) continue;

        const object = require(file);

        if(!object.data) continue;

        commands.push(object.data);

        client.commands.set(object.data.name, object.execute);

        console.log(`✅ Załadowano komendę: ${object.data.name}`);

    }

    await rest.put(Routes.applicationCommands(client.user.id), { body: commands });

}

/**
 * 
 * @param {Client} client 
 */
async function loadEvents(client){
    const folder = "./src/events";
    const files = fs.readdirSync(folder).map(el => `${folder}/${el}`);

    for(const file of files){
        if(!fs.statSync(file).isFile()) continue;

        const object = require(file);

        if(!object.name) continue;

        client.on(object.name, (...args) => { object.execute(client, ...args); });

        console.log(`✅ Załadowano event: ${object.name}`);
    }
}

module.exports = {
    loadCommands,
    loadEvents
}