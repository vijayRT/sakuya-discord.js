const commando = require('discord.js-commando')

class YaspRequ extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'yaspuser',
            group: 'dotabuff',
            memberName: 'yaspuser',
            description: 'shows yasp data for a user if he registered an ID',
            args: [
                {
                    key: 'User',
                    prompt: 'specify a user to request their mmr',
                    type: 'string',
                    default: '0'
                },
                {
                    key: 'option',
                    prompt: 'mmr or wr',
                    type: 'string',
                    default: 'mmr'
                }
            ]
        })
    }
    async run(message, args) {
        var { User, option } = args
        User = User.slice(2,-1)
        var members = message.guild.members.array()
        var found = false
        if(User.charAt(0) == '!'){
            User = User.substr(1)
        }
        var fs = require('fs')   
        var getJSON = require('get-json')
        var players = fs.readFileSync('players.txt','utf8')
        var players_data = JSON.parse(players)
        var registered = false
        for(var i=0; i<players_data.length; i+=1){
            if(players_data[i][0] == User){
                var id = players_data[i][1]
                registered = true
            }
        }
        if(registered){
            if(option == 'mmr'){
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
            }else if(option == 'wr'){
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

            }else if(option == 'link'){
                message.channel.send('https://opendota.com/players/' + id)
            }
        }else{
            message.channel.send('That user could not be found or has not registered an ID yet')
        }

    }
}

module.exports =  YaspRequ
