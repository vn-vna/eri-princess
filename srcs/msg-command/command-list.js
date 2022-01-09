const FileSystem = require('fs')

const COMMANDS_FILES = FileSystem.readdirSync(`${__dirname}/command`)
console.log(COMMANDS_FILES)
/**
 * @type {{command: string, execution: (command: string[], message: Message, client: Client) => any, description: string}[]}
 */
let commandProps = []

for (let file of COMMANDS_FILES) {
    commandProps.push(require(`./command/${file}`))
}

module.exports = commandProps
