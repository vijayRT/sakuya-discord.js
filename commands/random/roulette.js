const commando = require('discord.js-commando')

class Roulette extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'roulette',
            group: 'random',
            memberName: 'roulette',
            description: 'a game of life and death'
        })
    }

    async run(message, args) {
        var fs = require('fs')
        var cylinder = JSON.parse(fs.readFileSync('revolver.txt','utf8')) 
        var bulletn = Number(cylinder)
        bulletn -= 1

        if(message.member.nickname != null){
            var author = message.member.nickname
        }else{
            var author = message.author.username
        }
        message.channel.send(author + ' points the gun at his head and pulls the trigger')
        setTimeout(function(){
            if(bulletn == 0){
                var responses = [', u ded boi FeelsOkayMan ', ', the gun fires and you lie dead in chet', ', the gun fires and you are finally released FeelsGoodMan']
                message.channel.send('Hey ' + author + responses[Math.floor(Math.random()*responses.length)])
                bulletn = Math.floor(Math.random()*6)+1
                console.log('the gun fires')
            }else{
                var responses = [', you\'re a lucky bastard FeelsWeirdMan', ', you survive this time', ', the gun didn\'t fire FeelsBadMan']
                message.channel.send(author + responses[Math.floor(Math.random()*responses.length)])
            }

            fs.writeFileSync('revolver.txt', JSON.stringify(bulletn))
        }, 2000)
    }
}

module.exports = Roulette
