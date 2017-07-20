const commando = require('discord.js-commando')

class MyDong extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'mydong',
            group: 'random',
            memberName: 'mydong',
            description: 'Shows your dongsize'
        })
    }

    async run(message, args) {
        console.log('MyDong requested by ' + message.author.username)
        var dong = Math.floor(Math.random()*25)+1
        var vlecx_dong = Math.floor(Math.random()*10)+1
        if(dong<18){
            var reaction = 'Jebaited'
        }else{
            var reaction = 'KappaPride'
        }

        if(message.author.username == 'HERE I AM - Puck 2016'){
            message.channel.send('Hey ' + message.author.username + ', your dong hangs ' + vlecx_dong + ' cms low LUUL')
        }else{
            message.channel.send('Hey ' + message.author.username + ', your dong hangs ' + dong + ' cms low ' + reaction)
        }
    }
}

module.exports = MyDong
