const commando = require('discord.js-commando');

class getTopStreams extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'streams',
            group: 'streams',
            memberName: 'streams',
            description: 'Lists top 5 dota streams'
        });
    }

    async run(message, args) {
        var getJSON = require('get-json')
        getJSON('https://api.twitch.tv/kraken/streams?game=Dota%202&client_id=by2oz0y6sh1mvxqgczq06nigh15lfx&language=en&limit=5', function(err, data){
            var name = data['streams']
            function stream_url(n) {
                console.log(name[n]['channel']['url'])
            }
            var reply = ''//Top 5 Dota streams:\n'
            for(var i=0; i<5; i++){
                reply += (i+1) + '. ' + name[i]['channel']['display_name'] + ' - <' + name[0]['channel']['url'] + '>\n\n'
            }
            message.channel.send({embed: {
                color: 3447004,
                title: "Top 5 Dota streams: ",
                description: reply
            }})
        })
    }
}

module.exports = getTopStreams;
