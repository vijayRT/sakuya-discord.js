const commando = require('discord.js-commando')

class zaWarudo extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'zawarudo',
            group: 'images',
            memberName: 'zawarudo',
            description: 'glorious Sakuya'
        })
    }

    async run(message, args) {
        var smugs = ['https://my.mixtape.moe/bwzrer.png', 'https://my.mixtape.moe/xzaawu.png', 'http://i.imgur.com/bLfkaVR.jpg', 'https://my.mixtape.moe/lrjkbb.jpg', 'https://my.mixtape.moe/yxvfsw.jpg']
        message.channel.send(smugs[Math.floor(Math.random()*smugs.length)])
    }
}

module.exports = zaWarudo
