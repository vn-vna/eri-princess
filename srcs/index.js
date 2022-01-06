const { Client, Intents } = require('discord.js');
const DotEnv = require("dotenv")

DotEnv.config()

const token = process.env.BOT_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('Ready!');
});

client.on("message", (message) => {
    if (message.content === "ds#ping")
    {
        message.reply("pong")
    }
})

client.login(token);