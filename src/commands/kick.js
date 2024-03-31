const { SlashCommandBuilder, Client, Interaction, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Komenda do wyrzucenia użytkowników")
    .addUserOption(option => option.setName("target").setDescription("użytkownik").setRequired(true))
    .addStringOption(option => option.setName("reason").setDescription("powód")),
    /**
     * 
     * @param {Interaction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: false });

        if(!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) return interaction.editReply({ content: "Nie posiadasz uprawnień"});

        const target = await interaction.guild.members.fetch(interaction.options.getUser("target").id);

        if(!target) return interaction.editReply({ content: "tego użytkownika nie ma na serwerze"});

        const rolePosition = {
            target: target.roles.highest.position,
            user: interaction.member.roles.highest.position,
            bot: interaction.guild.members.me.roles.highest.position
        }

        if(rolePosition.user < rolePosition.target){
            return interaction.editReply({ content: "Ten użytkownik ma wyższą lub tą samą role co ty!"});
        }

        if(rolePosition.bot < rolePosition.target){
            return interaction.editReply({ content:"Bot nie ma uprawnienń do wykonania tego!" });
        }

        const reason = interaction.options?.getString("reason") || "Brak powodu";

        target.kick({reason: reason});

        const warnChannelId = "id-kanału"

        const warnChannel = client.channels.cache.get(warnChannelId)

        warnChannel.send({embeds: [
            new EmbedBuilder()
            .setTitle("Wyrzucono!")
            .setDescription(`Użytkownik <@${target.id}> został wyrzucony za \`${reason}\``)
            .setColor("Red")
            .setTimestamp()
        ] })

        return interaction.editReply({ content: `Wyrzucono użytkownika ${target}`})
    }
}