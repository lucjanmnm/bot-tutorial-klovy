const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Usuwa określoną liczbę wiadomości.')
    .addIntegerOption(option => option.setName('amount').setDescription('Liczba wiadomości do usunięcia').setRequired(true)),
  async execute(interaction) {

    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
      return interaction.reply({ content: 'Nie masz uprawnień do zarządzania wiadomościami.', ephemeral: true });
    }

    const amount = interaction.options.getInteger('amount');

    await interaction.channel.bulkDelete(amount);

    return interaction.reply({ content: `Usunięto ${amount} wiadomości.`, ephemeral: true });
  },
};
