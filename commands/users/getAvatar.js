const commando = require('discord.js-commando')

class getAvatar extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            group: 'users',
            memberName: 'avatar',
            description: 'gives the users avatar',
            args: [
                {
                    key: 'user',
                    prompt: 'Specify a member',
                    type: 'user',
                }
            ]
        })
    }

    async run(message, args) {
        const { user } = args
        console.log('Avatar of ' + user.username + ' requested by ' + message.author.username)
        message.channel.send(":ok_hand: " + user.avatarURL)

    }
}

module.exports = getAvatar
