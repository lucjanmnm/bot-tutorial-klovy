const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName('poll')
      .setDescription('Tworzy ankietę z reakcjami.')
      .addStringOption(option => option.setName('name').setDescription('Nazwa ankiety').setRequired(true))
      .addStringOption(option => option.setName('description').setDescription('Opis ankiety').setRequired(true))
      .addStringOption(option => option.setName('color').setDescription('Kolor wiadomości z ankietą (np. #0099ff)').setRequired(false))
      .addChannelOption(option => option.setName('channel').setDescription('Kanał docelowy').setRequired(false)),
    async execute(interaction) {

        if(!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
        return interaction.reply({ content: 'Nie masz uprawnień administratora.', ephemeral: true });
      }
  
      const name = interaction.options.getString('name');
      const description = interaction.options.getString('description');
      const color = interaction.options.getString('color') || '#0099ff';
      const channelOption = interaction.options.getChannel('channel');
      const channel = channelOption || interaction.channel;
  
      const pollEmbed = new EmbedBuilder()
      .setTitle(`${name}`)
      .setDescription(`${description}`)
      .setColor(`${color}`)
      .setTimestamp()
  
      const pollMessage = await channel.send({ embeds: [pollEmbed] });
  
      await pollMessage.react('✅'); 
      await pollMessage.react('❌'); 
  
      return interaction.reply({ content: 'Ankieta została utworzona.', ephemeral: true });
    },
  };
  