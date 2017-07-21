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
       // console.log('Yasp request from ' + message.author.username + ' ~input: ' + option + ' ' + id)
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
            console.log('Yasp reg requested by ' + message.author.username + ' with ID ' + id)
            for(var i=0; i<players_data.length; i+=1){
                if(players_data[i][0] == message.author.id){
                    players_data[i][1] = id
                    console.log(message.author.username + ' already registered an ID \nOverwriting...')
                    message.channel.send('Your ID has been updated')
                    var Overwritten = true;
                }
            }
            if(!Overwritten){
                players_data.push([message.author.id, id])
                console.log(message.author.username + ' does not have an ID \nAdding entry...')
                message.channel.send('The ID has been registered to your account')
            }

            fs.writeFileSync('players.txt', JSON.stringify(players_data), function(err){
                if(err){
                    console.log('something went wrong')
                }
            })
        }else if(option == 'mmr'){
            console.log('Yasp mmr requested by ' + message.author.username + ' with ID ' + id)
            if(id == '0'){
                id = player_ID
                console.log('ID was not provided... ID set to ' + id)
            }
            getJSON('https://api.opendota.com/api/players/' + id, function(err, data){
                var mmr = data['solo_competitive_rank']
                var partymmr = data['competitive_rank']
                var estimate = data['mmr_estimate']['estimate'] 
                if(data['profile'] != undefined){
                    message.channel.send({ embed: {
                        color: 3447003,
                        author: { 
                            name: data['profile']['personaname'],
                            icon_url: data['profile']['avatarmedium']
                        },
                        description: 'Solo MMR: ' + mmr + '\nParty MMR: ' + partymmr + '\nMMR Estimate: ' + estimate
                    }})
                    console.log('Posted mmr for ID ' + id)
                }else{
                    message.channel.send('Invalid player ID')
                    console.log('Invalid player ID')
                }

            })
            if(id == undefined){
                message.channel.send('You have not registered an ID to your account yet')
            }
        }else if(option == 'wr'){
            console.log('Yasp W/L requested by ' + message.author.username + ' with ID ' + id)
            if(id == '0'){
                id = player_ID
                console.log('ID was not provided... ID set to ' + id)
            }
            getJSON('https://api.opendota.com/api/players/' + id + '/wl', function(err, data){
                var wl = data['win'] + '/' + data['lose']
                if(data['win']!=0 && data['lose']!=0){
                    message.channel.send({ embed: {
                        color: 3447003,
                        description: 'W/L: ' + wl + '  ~  ' + ((Math.floor((data['win']/(data['lose']+data['win']))*10000))/100) + '%'
                    }})
                    console.log('Posted W/L for ID ' + id)
                }else{
                    message.channel.send('Invalid player ID')
                    console.log('Invalid player ID')
                }
            })
            if(id == undefined){
                message.channel.send('You have not registered an ID to your account yet')
            }
        }else{
            message.channel.send({embed: {
                color: 3447003,
                description: '**Usage**: $yasp <option> <ID>\n\n**Available Options**:\nmmr - default option, displays Solo/Party/Estimated MMR\nwr - displays Wins and Losses\nreg - register an ID to your account'
            }})
            console.log('Unknown option')
        }
    }
}

module.exports = getDBinfo
