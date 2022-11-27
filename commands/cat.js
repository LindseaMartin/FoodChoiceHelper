const { SlashCommandBuilder } = require('discord.js');
//const { request } = require('undici');

module.exports = {
data: new SlashCommandBuilder()
	.setName('cat')
	.setDescription('cat!'),

    async execute(interaction) {
        const catResult = await request('https://aws.random.cat/meow');
		const { file } = await catResult.body.json();
		interaction.editReply({ files: [{ attachment: file, name: 'cat.png' }] });
    },
};



