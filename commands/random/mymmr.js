const commando = require('discord.js-commando')

class MyMmrCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'mymmr',
            group: 'random',
            memberName: 'mymmr',
            description: 'Shows your true MMR'
        })
    }

    async run(message, args) {
        if(message.member.nickname != null){
            var author = message.member.nickname
        }else{
            var author = message.author.username
        }

        console.log('MyMMR requested by ' + author)
        var mmr = Math.floor(Math.random()*10000)+1
        if(mmr>5000){
            message.channel.send("Hey " + author + ", your MMR is " + mmr + " PogChamp")
        }else{
            message.channel.send("Hey " + author + ", your MMR is " + mmr + " LUUL")
        }
    }
}

module.exports = MyMmrCommand
