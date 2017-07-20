const commando = require('discord.js-commando')

class getTopStreams extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'streams',
            group: 'streams',
            memberName: 'streams',
            description: 'Lists top 5 dota streams'
        })
    }

    async run(message, args) {
        console.log('Top 5 Dota Streamers requested by ' + message.author.username)
        var getJSON = require('get-json')
        getJSON('https://api.twitch.tv/kraken/streams?game=Dota%202&client_id=by2oz0y6sh1mvxqgczq06nigh15lfx&broadcaster_language=en&limit=5', function(err, data){
            var name = data['streams']
            function stream_url(n) {
                console.log(name[n]['channel']['url'])
            }
            var reply = '**Top 5 Dota Streams:** \n'//Top 5 Dota streams:\n'
            for(var i=0; i<5; i++){
                reply += '\n' + (i+1) + '. ' + name[i]['channel']['display_name'] + ' - <' + name[i]['channel']['url'] + '>\n'
            }
            message.channel.send({embed: {
                color: 3447004,
                description: reply
            }})
        })
    }
}

module.exports = getTopStreams
