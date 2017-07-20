const commando = require('discord.js-commando')

class myLove extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'mylove',
            group: 'random',
            memberName: 'mylove',
            description: 'shows your true love'
        })
    }

    async run(message, args) {
        console.log('MyLove requested by ' + message.author.username)
        var member_amount = message.guild.memberCount
        var members = message.guild.members
        var members_list = members.array()
        var i = 0
        while(true){
            if(members_list[i].presence.status == 'offline'){
                if(i>-1){
                    members_list.splice(i, 1)
                }
            }else{
                i += 1
            }

            if(i == members_list.length){
                break
            }
        }
        var x = Math.floor(Math.random()*members_list.length) 
        message.channel.send('Hey ' + message.author.username + ' your true love is ' + members_list[x].user.username)

    }
}

module.exports = myLove
