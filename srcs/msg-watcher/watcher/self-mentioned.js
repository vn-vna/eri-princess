const { Message, Client, MessageEmbed } = require('discord.js')

const commandList = require("../../msg-command/command-list")

module.exports = {
    /**
     * 
     * @param {Message} message
     * @param {Client} client
     */
    match: (message, client) => {
        return message.mentions.has(client.user)
    },
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     */
    execution: (message, client) => {
        const eMsg = new MessageEmbed()
            .setColor("#770000")
            .setTitle("Here I am ~~")
            .setDescription("You have mention me, are you? What do u need?")
            .setAuthor(
                {
                    name: "Eri Vampira Shiroka",
                    iconURL: "https://i.imgur.com/sTDFv85.png"
                }
            )
            .setThumbnail("https://i.imgur.com/sTDFv85.png")
            .setDescription("Do U know what does a vampire princess love?\nThat is sweety blood ❤️")
            .addField('\u200b', '\u200b')
            .addField("My Prefix is `eri`", "Here is something i can do ~~")

        for (let ac of commandList) {
            eMsg.addField(ac.command ? ac.command : "command", ac.description ? ac.description : "description", true)
        }

        message.reply({ embeds: [eMsg] })
    },
}
