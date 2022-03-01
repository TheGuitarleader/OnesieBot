const Discord = require('discord.js');
const config = require('../config.json');
const logger = require('../extensions/logging');

const sqlite = require('sqlite3').verbose();
let db = new sqlite.Database('./data.db');

module.exports = {
    name: "twitter-list",
    description: "Lists the followed Twitch accounts",
    async execute(interaction, client) {
        db.all(`SELECT * FROM tweetProfiles ORDER BY accountName ASC`, (err, rows) => {

            const embed = new Discord.MessageEmbed();
            embed.setColor('1DA1F2');
            embed.setTitle("Currently Following");
            rows.forEach((row) => {
                embed.addField(row.discordName, "@" + row.accountName);
            });
            interaction.reply({ embeds: [embed] });
        });
    }
}