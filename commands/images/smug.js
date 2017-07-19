const commando = require('discord.js-commando')

class RollSmug extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'smug',
            group: 'images',
            memberName: 'smug',
            description: 'Shows a smug Smugface'
        });
    }

    async run(message, args) {
        var smugs = ['http://i.imgur.com/99qkXRs.jpg', 'http://i.imgur.com/5hk7qbn.jpg', 'http://i.imgur.com/rGFrPu9.jpg', 'http://i.imgur.com/Eglo4rE.jpg'];
        message.channel.send(smugs[Math.floor(Math.random()*smugs.length)]);
    }
}

module.exports = RollSmug;
