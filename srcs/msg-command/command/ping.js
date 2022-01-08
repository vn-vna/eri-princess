const { Message } = require("discord.js");

module.exports = {
    command: "ping",
    /**
     * @param {string[]} command
     * @param {Message} message 
     */
    execution: (command, message) => {
        message.react("❤️").then(reaction => {
            console.log(`${message.author.username}#${message.author.id}`)
            if (`${message.author.id}` === `731473542872432720`) {
                message.reply(`Hi my master.\nU have touched me ><`)
            }
        })
    }
}