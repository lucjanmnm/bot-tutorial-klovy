const { Client, Interaction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    async execute(client, interaction) {
        if(interaction.isCommand()) {
            if(!client.commands.has(interaction.commandName)) return;

            const interactionFunction = client.commands.get(interaction.commandName);

            interactionFunction(interaction, client);
        }
    }
}