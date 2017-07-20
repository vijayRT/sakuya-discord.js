const commando = require('discord.js-commando')

class getInfo extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'info',
            group: 'streams',
            memberName: 'info',
            description: 'Gives information on a stream',
            args: [
                {
                    key: 'stream',
                    prompt: 'Choose a stream',
                    type: 'string',
                    default: 'sing_sing'
                }
            ]
        })
    }

    async run(message, args) {
        var getJSON = require('get-json')
        const { stream } = args
        console.log('Stream info for ' + stream + ' requested by ' + message.author.username)
        getJSON('https://api.twitch.tv/kraken/streams/' + stream + '?client_id=by2oz0y6sh1mvxqgczq06nigh15lfx', function(err, data){
            if(data['stream']==null){
                message.channel.send('https://twitch.tv/' + stream + ' is offline')
            }else{
                message.channel.send('https://twitch.tv/' + stream + ' is playing ' + data['stream']['game'])
            }
        })
    }
}

module.exports = getInfo
