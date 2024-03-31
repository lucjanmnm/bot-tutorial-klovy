const { SlashCommandBuilder, Client, Interaction, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Komenda do odbanowania użytkownika")
        .addStringOption(option => option.setName("id").setDescription("ID użytkownika").setRequired(true)),
    /**
     * 
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false });

        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.editReply({ content: "Nie posiadasz uprawnień do odbanowania użytkowników." });

        const userId = interaction.options.getString("id");

        interaction.guild.bans.fetch().then(bans => {
            const bannedUser = bans.find(ban => ban.user.id === userId);

            if (!bannedUser) return interaction.editReply({ content: "Ten użytkownik nie jest zbanowany." });

            interaction.guild.bans.remove(bannedUser.user, "Odbanowany przez administratora").then(() => {
                const warnChannelId = "id-kanału";

                const warnChannel = interaction.guild.channels.cache.get(warnChannelId);

                if (warnChannel) {
                    warnChannel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle("UNBAN!")
                                .setDescription(`Użytkownik o ID ${userId} został odbanowany.`)
                                .setColor("Yellow")
                                .setTimestamp()
                        ]
                    });
                } else {
                    console.log("Kanał ostrzeżeń nie został znaleziony!");
                }

                interaction.editReply({ content: `Pomyślnie odbanowano użytkownika o ID ${userId}.` });
            }).catch(err => {
                console.error("Wystąpił błąd podczas odbanowania użytkownika:", err);
                interaction.editReply({ content: "Wystąpił błąd podczas odbanowania użytkownika." });
            });
        }).catch(err => {
            console.error("Wystąpił błąd podczas pobierania zbanowanych użytkowników:", err);
            interaction.editReply({ content: "Wystąpił błąd podczas pobierania zbanowanych użytkowników." });
        });
    },
};
