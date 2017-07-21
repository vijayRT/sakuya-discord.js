const commando = require('discord.js-commando')

class RollSmug extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'smug',
            group: 'images',
            memberName: 'smug',
            description: 'Shows a smug Smugface',
            args: [
                {
                    key: 'option',
                    prompt: 'only for owner',
                    type: 'string',
                    default: 'show'
                },
                {
                    key: 'link',
                    prompt: 'link for adding smug',
                    type: 'string',
                    default: '0'
                }
            ]
        })
    }

    async run(message, args) {
        var { option, link } = args
        var fs = require('fs')
        var smug_list = fs.readFileSync('smugs.txt','utf8')
        var smugs = JSON.parse(smug_list)
        if(option == 'show'){
            console.log('Smug requested by ' + message.author.username)
            message.channel.send(smugs[Math.floor(Math.random()*smugs.length)])
        }else if(option == 'add' && link != '0'){
            if(message.author.id == '123219417256558592' || message.author.id == '120473568382418945'){
                console.log('Smug add request by owner')
                for(var i=0; i<smugs.length; i+=1){
                    if(smugs[i] == link){
                        console.log('Smug was already added')
                        message.channel.send('That image has already been added to the list')
                        var Added = true;
                    }
                } 
                if(!Added){
                    console.log('Smug not found in list\nAdding entry...')
                    smugs.push(link)
                    message.channel.send('Image added to list')
                }
                fs.writeFileSync('smugs.txt', JSON.stringify(smugs), function(err){
                    if(err){
                        console.log('something went wrong')
                    }
                })
            }else{
                message.channel.send('You don\'t have permission for this command')
            }
        }else if(option == 'list'){
            message.channel.send({embed: {
                color: 3447004,
                title: 'Number of smugs: ' + smugs.length,
                description: smugs.join(', ')
            }})
        }else if(option == 'rem'){
            if(message.author.id == '123219417256558592' || message.author.id == '120473568382418945'){
                var Deleted = false
                for(var i=0; i<smugs.length; i+=1){ 
                    if(smugs[i] == link){
                        smugs.splice(i, 1)
                        Deleted = true
                        break
                    }
                }
                if(Deleted){
                    message.channel.send('Image successfully deleted')
                }else{
                    message.channel.send('Image could not be found')
                }
                fs.writeFileSync('smugs.txt', JSON.stringify(smugs), function(err){
                    if(err){
                        console.log('something went wrong')
                    }
                })
            }else{
                message.channel.send('You don\'t have permission for this command')
            }
        }else{
            message.channel.send({embed: {
                color: 3447004,
                title: 'Options',
                description: 'show: Default option, shows an image from the list\n\nadd: Add an image to the list, only for specified users\n\nrem: Remove an image from the list, only for specified users\n\nlist: Shows the current list of images'
            }})
        }
    }
}

module.exports = RollSmug
