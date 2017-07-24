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
                    type: 'string',
                    default: '0'
                }
            ]
        })
    }

    async run(message, args) {
        var { user } = args
//        console.log('Avatar of ' + user.username + ' requested by ' + message.author.username)
//        message.channel.send(":ok_hand: " + user.avatarURL)
        user = user.slice(2,-1)
        var members = message.guild.members.array()
        var found = false
        if(user.charAt(0) == '!'){
            user = user.substr(1)
        }
        for(var i=0; i<message.guild.memberCount; i+=1){
            if(members[i].user.id == user){
                message.channel.send(':ok_hand: ' + members[i].user.avatarURL)
                found = true
                break
            }
        }
        if(found){
            console.log('Showed avatar for user with ID ' + user)
        }else{
            message.channel.send('User not found')
        }

    }
}

module.exports = getAvatar
