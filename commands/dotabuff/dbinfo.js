const commando = require('discord.js-commando')




class getDBinfo extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'yasp',
            group: 'dotabuff',
            memberName: 'yasp',
            description: 'Gives information about a profile',
            args: [
                {
                    key: 'id',
                    prompt: 'provide a player ID',
                    type: 'integer'
                },
                {
                    key: 'option',
                    prompt: 'options are mmr and wr',
                    type: 'string',
                    default: 'mmr'
                }
            ]
        })
    }

    async run(message, args) {
        const { id, option } = args
        var getJSON = require('get-json')
        if(option == 'mmr'){
            getJSON('https://api.opendota.com/api/players/' + id, function(err, data){
                var mmr = data['solo_competitive_rank']
                var partymmr = data['competitive_rank']
                var estimate = data['mmr_estimate']['estimate'] 

                message.channel.send({ embed: {
                    color: 3447003,
                    author: { 
                        name: message.author.username,
                        icon_url: message.author.avatarURL
                    },
                    description: 'Solo MMR: ' + mmr + '\nParty MMR: ' + partymmr + '\nMMR Estimate: ' + estimate
                }})
            })
        }else if(option == 'wr'){
            getJSON('https://api.opendota.com/api/players/' + id + '/wl', function(err, data){
                var wl = data['win'] + '/' + data['lose']
                message.channel.send({ embed: {
                    color: 3447003,
                    author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL
                    },
                    description: 'W/L: ' + wl
                }})

            })
        }else{
            message.channel.send(
                'unknown option'
            )
        }
    }
}

module.exports = getDBinfo
