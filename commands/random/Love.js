const commando = require('discord.js-commando')

class Love extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'love',
            group: 'random',
            memberName: 'love',
            description: 'How much you love something',
            args: [
                {
                    key: 'thing',
                    prompt: 'The thing you may love',
                    type: 'string'
                }
            ]
        })
    }
    
    async run(message, args) {
        if(message.member.nickname != null){
            var author = message.member.nickname
        }else{
            var author = message.author.username
        }
        var { thing } = args
        var love = Math.floor(Math.random()*101)
        if(love>50){
            var reaction = 'KappaPride'
        }else{
            var reaction = 'FeelsBadMan'
        }
        message.channel.send('Hey ' + author + ', your love for ' + thing + ' is around ' + love + '% ' + reaction)
    }
}

module.exports = Love
