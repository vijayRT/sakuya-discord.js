const commando = require('discord.js-commando')

class Roulette extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'roulette',
            group: 'random',
            memberName: 'roulette',
            description: 'a game of life and death',
            args: [
                {
                    key: 'option',
                    prompt: 'specify an option',
                    type: 'string',
                    default: 'roll'
                },
                {
                    key: 'idk',
                    prompt: 'specify a user',
                    type: 'string',
                    default: '0'
                }
            ]
        })
    }

    async run(message, args) {
        var { option, idk} = args
        var members = message.guild.members.array()
        console.log(idk)
        if(idk != '0'){
            var USER = idk.slice(2,-1)
            if(USER.charAt(0) == '!'){
                USER = USER.substr(1)
            }
            var USER_ID = USER
            console.log(USER_ID)
        }else{
            var USER_ID = message.author.id
        }
        var USER_FOUND = false
        for(var i=0; i<message.guild.memberCount; i+=1){
            if(USER_ID == members[i].user.id){
                if(members[i].nickname != null){
                    var USER_NICK = members[i].nickname
                }else{
                    var USER_NICK = members[i].user.username
                }
                USER_FOUND = true
                var USER_AVATAR = members[i].user.avatarURL
            }
        }
        if(!USER_FOUND){
            message.channel.send('User could not be found')
        }
        var fs = require('fs')
        var cylinder = JSON.parse(fs.readFileSync('revolver.txt','utf8')) 
        var bulletn = Number(cylinder)
        var roulette_stats = JSON.parse(fs.readFileSync('roulette_stats.txt','utf8'))
        var User_exists = false
        for(var i=0; i<roulette_stats.length; i+=1){
            if(roulette_stats[i][0] == message.author.id){
                User_exists = true
                break
            }
        }
        if(!User_exists){
            roulette_stats.push([message.author.id, 0, 0])
        }
        if(option == 'roll'){
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
                    for(var i=0; i<roulette_stats.length; i+=1){
                        if(roulette_stats[i][0] == message.author.id){
                            roulette_stats[i][2] += 1
                            roulette_stats[i][1] += 1
                            fs.writeFileSync('roulette_stats.txt', JSON.stringify(roulette_stats))
                            break
                        }
                    }
                }else{
                    var responses = [', you\'re a lucky bastard FeelsWeirdMan', ', you survive this time', ', the gun didn\'t fire FeelsBadMan']
                    message.channel.send(author + responses[Math.floor(Math.random()*responses.length)])
                    for(var i=0; i<roulette_stats.length; i+=1){
                        if(roulette_stats[i][0] == message.author.id){
                            roulette_stats[i][1] += 1
                            fs.writeFileSync('roulette_stats.txt', JSON.stringify(roulette_stats))
                            break
                        }
                    }
                }
    
                fs.writeFileSync('revolver.txt', JSON.stringify(bulletn))
            }, 2000)
        }else if(option == 'stats'){
            var stats = 'Tries  |  Deaths  |  Ratio \n\n'
            var USER_EXISTS = false
            for(var i=0; i<roulette_stats.length; i+=1){
                if(USER_ID == roulette_stats[i][0]){
                    USER_EXISTS = true
                    stats += '     ' + roulette_stats[i][1] + '             ' + roulette_stats[i][2] + '            ' + Math.floor((roulette_stats[i][2]/roulette_stats[i][1])*100) + '%'
                    break
                }
            }
            if(USER_EXISTS){
                message.channel.send({embed: {
                    author: {
                        name: USER_NICK,
                        icon_url: USER_AVATAR
                    },
                    title: ':gun: Russian Roulette stats :gun:',
                    color: 3447004,
                    description: stats
                }})
            }
        }
    }
}

module.exports = Roulette
