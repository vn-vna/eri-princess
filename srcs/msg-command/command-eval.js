const FileSystem = require("fs")
const { Message } = require("discord.js");
const CMD_PING = require("./command/ping")

const COMMANDS_FILES = FileSystem.readdirSync(`${__dirname}/command`)
console.log(COMMANDS_FILES)
/**
 * @type {{command: string, execution: (command: string[], message: Message) => any}[]}
 */
let commandProps = []

for (let file of COMMANDS_FILES) {
    commandProps.push(require(`./command/${file}`))
}

/**
 * 
 * @param {Array<string>} command 
 * @param {Message} message 
 */
module.exports = (command, message) => {
    console.log(command)
    for (let cp of commandProps) {
        if (cp.command == command[1]) {
            cp.execution(command, message)
            break;
        }
    }
}