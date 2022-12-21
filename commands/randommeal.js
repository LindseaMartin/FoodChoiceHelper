const { request } = require("undici");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("randommeal")
    .setDescription("Generates a random meal!"),

  async execute(interaction) {
    const mealResult = await request(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );

    const { meals } = await mealResult.body.json();
    if (!meals.length) {
      return interaction.editReply("No meals found!");
    }

    const [answer] = meals;

    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder().setCustomId("Yes")
      .setLabel("Yes")
      .setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId("No")
      .setLabel("No")
      .setStyle(ButtonStyle.Danger)
    );

    const embed = new EmbedBuilder()
      .setColor(0xefff00)
      .setTitle(answer.strMeal)
      .setURL(answer.strSource)
      .setImage(`${answer.strMealThumb}`)
      .addFields(
        {name: 'Category', value: answer.strCategory}
      );

    await interaction.editReply({
      embeds: [embed],
      components: [row]
    });
  },
};