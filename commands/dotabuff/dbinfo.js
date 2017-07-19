const commando = require('discord.js-commando')




class getDBinfo extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'db',
            group: 'dotabuff',
            memberName: 'db',
            description: 'Gives information about a profile',
            args: [
                {
                    key: 'id',
                    prompt: 'provide a player ID',
                    type: 'integer'
                }
            ]
        })
    }

    async run(message, args) {
        var reply = ''
        var pointer = [reply]
        const { id } = args
        var getJSON = require('get-json')

        message.channel.send(
            ">Statistcs for " + message.author.username,
        )
        getJSON('https://api.opendota.com/api/players/' + id, function(err, data){
            var mmr = data['solo_competitive_rank']
            var estimate = data['mmr_estimate']['estimate'] 
            pointer[0] = ''
            pointer[0] += 'Solo MMR: ' + mmr + '\n'
            pointer[0] += 'MMR Estimate: ' + estimate + '\n'
            pointer[0]=data

            message.channel.send(
                'Solo MMR: ' + mmr + '\nMMR Estimate: ' + estimate
            )
        })

        getJSON('https://api.opendota.com/api/players/' + id + '/wl', function(err, data){
            var wl = data['win'] + '/' + data['lose']
            pointer[0] += 'W/L:  ' + wl
            message.channel.send(
                'W/L: ' + wl
            )

        })
    }
}

module.exports = getDBinfo
