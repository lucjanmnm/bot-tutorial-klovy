const { SlashCommandBuilder, Client, Interaction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Testowa komenda"),
    /**
     * 
     * @param {Interaction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        await interaction.deferReply();

        interaction.editReply({ content: "pong" })
    }
}