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
                    key: 'option',
                    prompt: 'options are mmr and wr',
                    type: 'string',
                    default: 'mmr'
                },
                {
                    key: 'id',
                    prompt: 'provide a player ID',
                    type: 'string',
                    default: '0'
                }
            ]
        })
    }

    async run(message, args) {
        var { option, id } = args
        console.log('From ' + message.author.username + ', input: ' + option + ' ' + id)
        var getJSON = require('get-json')
        var fs = require('fs')
        var players = fs.readFileSync('players.txt','utf8')
        var players_data = JSON.parse(players)
        for(var i=0; i<players_data.length; i+=1){
            if(players_data[i][0] == message.author.id){
                var player_ID = players_data[i][1]
            }
        }

        if(option == 'reg'){
            for(var i=0; i<players_data.length; i+=1){
                if(players_data[i][0] == message.author.id){
                    players_data[i][1] = id
                    console.log(message.author.username + ' already registered a ID \nOverwriting...')
                    var Overwritten = true;
                }
            }
            if(!Overwritten){
                players_data.push([message.author.id, id])
                console.log(message.author.username + ' does not have an ID \nAdding entry...')
            }

            fs.writeFileSync('players.txt', JSON.stringify(players_data), function(err){
                if(err){
                    console.log('something done fucked up')
                }
            })
        }else if(option == 'mmr'){
            if(id == '0'){
                id = player_ID
            }
            getJSON('https://api.opendota.com/api/players/' + id, function(err, data){
                var mmr = data['solo_competitive_rank']
                var partymmr = data['competitive_rank']
                var estimate = data['mmr_estimate']['estimate'] 

                message.channel.send({ embed: {
                    color: 3447003,
                    author: { 
                        name: data['profile']['personaname'],
                        icon_url: data['profile']['avatarmedium']
                    },
                    description: 'Solo MMR: ' + mmr + '\nParty MMR: ' + partymmr + '\nMMR Estimate: ' + estimate
                }})
            })
        }else if(option == 'wr'){
            if(id == '0'){
                id = player_ID
            }
            getJSON('https://api.opendota.com/api/players/' + id + '/wl', function(err, data){
                var wl = data['win'] + '/' + data['lose']
                message.channel.send({ embed: {
                    color: 3447003,
                    description: 'W/L: ' + wl
                }})

            })
        }else{
            message.channel.send({embed: {
                color: 3447003,
                title: 'Available Options',
                description: 'mmr: Displays Solo/Party/Estimated MMR\nwr: Displays Wins and Losses\nreg: Register an account'
            }})
        }
    }
}

module.exports = getDBinfo
