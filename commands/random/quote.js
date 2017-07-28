const commando = require('discord.js-commando')

class Quote extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'quote',
            group: 'random',
            memberName: 'quote',
            description: 'Displays a famous quote',
            args: [
                {
                    key: 'option',
                    prompt: 'only for users with permission',
                    type: 'string',
                    default: 'show'
                },
                {
                    key: 'text',
                    prompt: 'desired input',
                    type: 'string',
                    default: ' '
                }
            ]
        })
    }

    async run(message, args) {
        var { option, text } = args
        var fs = require('fs')
        var quotes = JSON.parse(fs.readFileSync('quotes.txt','utf8'))
        var permission = message.author.id == '123219417256558592' || message.author.id == '186349345719713794' || message.author.id == '77462706893881344'
        var members = message.guild.members
        var members_list = members.array()
        var i = 0
        while(true){
            if(members_list[i].presence.status == 'offline' || members_list[i].user.bot){
                if(i>-1){
                    members_list.splice(i, 1)
                }
            }else{
                i += 1
            }

            if(i == members_list.length){
                break
            }
        }
        var x = Math.floor(Math.random()*members_list.length) 

        if(option == 'show'){
            var quote_n = Math.floor(Math.random()*quotes.length)

            if(members_list[x].nickname != null){
                var author = members_list[x].nickname
            }else{
                var author = members_list[x].user.username
            }

            message.channel.send('\"' + quotes[quote_n] + '\"' + '  ~  ' + author)
            console.log('Quote requested by ' + message.author.username)
        }else if(option == 'addquote'){
            if(permission){
                quotes.push(text)
                fs.writeFileSync('quotes.txt', JSON.stringify(quotes))
                message.channel.send('Quote successfully added')
                console.log('Quote added by ' + message.author.username)
            }else{
                message.channel.send('You don\'t have permission for this command')
            }
        }else if(option == 'remquote'){
            if(permission){
                var Deleted = false
                for(var i=0; i<quotes.length; i+=1){
                    if(quotes[i] == text){
                        quotes.splice(i, 1)
                        Deleted = true
                        break
                    }
                }
                if(Deleted){
                    message.channel.send('Quote successfully deleted')
                    console.log('Quote deleted by ' + message.author.username)
                }else{
                    message.channel.send('Quote could not be found')
                }
                fs.writeFileSync('quotes.txt', JSON.stringify(quotes))
            }
        }else if(option == 'n'){
            message.channel.send('Number of quotes: ' + quotes.length)
        }else if(option.charAt(0) == '<'){
            console.log('this')
            var user = option
            user = user.slice(2,-1)
            var members = message.guild.members.array()
            var found = false
            if(user.charAt(0) == '!'){
                user = user.substr(1)
            }
            for(var i=0; i<message.guild.memberCount; i+=1){
                if(members[i].user.id == user){
                    var quote_n = Math.floor(Math.random()*quotes.length)
                    if(members[i].nickname != null){
                        var author = members[i].nickname
                    }else{
                        var author = members[i].user.username
                    }
                    if (message.author.id == 151576609206435840 || user == 151576609206435840 || quotes[quote_n].indexOf("pubes") != -1)
                    {
                        author = "DanielBot"
                        quotes_n = 16
                    }
                    message.channel.send('\"' + quotes[quote_n] + '\"' + '  ~  ' + author)
                    found = true
                    break
                }
            }
            if(found){
                console.log('Quote requested by ' + message.author.username)
            }else{
                console.log('No user with that id found')
            }
        }else if(option == 'list'){
            message.author.sendMessage({embed: {
                color: 3447004,
                description: quotes.join('\n\n')
            }})
        }else{
            message.channel.send('Use $quote remquote <quote> to remove a quote\nUse $quote addquote <quote> to add a quote')
        }
    }
}

module.exports = Quote
