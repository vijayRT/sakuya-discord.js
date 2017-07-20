const commando = require('discord.js-commando')

class DiceRollCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'random',
            memberName: 'roll',
            description: 'Rolls a dice',
            args: [
                {
                    key: 'n',
                    prompt: 'Number of sides for the dice',
                    type: 'integer',
                    default: 6
                },
                {
                    key: 'times',
                    prompt: 'How often the rice gets rolled',
                    type: 'integer',
                    default: 1
                }
            ]
        })
    }

    async run(message, args) {
        const { n, times } = args
        console.log('Diceroll requested by ' + message.author.username + ' with arguments ' + n + ' ' + times)
        var roll = []
        for(var i=0; i<times; i=i+1){
            roll.push(Math.floor(Math.random() * n)+1);
        }
        message.channel.send(":game_die: Rolling the dice")
        setTimeout(function(){
            message.channel.send(":game_die: You rolled " + roll.join(', '))
            console.log('Diceroll was ' + roll.join(', '))
        }, 2000)
    }
}

module.exports = DiceRollCommand
