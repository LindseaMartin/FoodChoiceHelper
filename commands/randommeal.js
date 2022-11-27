const { request } = require("undici");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("randommeal")
    .setDescription("Generates a random meal!"),

  async execute(interaction) {
    const mealResult = await request(
      'www.themealdb.com/api/json/v1/1/random.php'
    );
    const { meals } = await mealResult.body.json();

    const [answer] = meals;

    const embed = new EmbedBuilder()
      .setColor(0xefff00)
      .setTitle(answer.strMeal)
      .setURL(answer.strSource);

    interaction.editReply({ embeds: [embed] });
  },
};
