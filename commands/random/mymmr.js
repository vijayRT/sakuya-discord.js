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
        var mmr = Math.floor(Math.random()*10000)+1
        if(mmr>5000){
            message.channel.send("Hey " + message.author.username + ", your MMR is " + mmr + " PogChamp")
        }else{
            message.channel.send("Hey " + message.author.username + ", your MMR is " + mmr + " LUUL")
        }
    }
}

module.exports = MyMmrCommand
