const commando = require('discord.js-commando')
const bot = new commando.Client({
    commandPrefix: '$',
    unknownCommandResponse: false
})

bot.registry.registerGroup('random', 'random')
bot.registry.registerGroup('images', 'images')
bot.registry.registerGroup('users', 'users')
bot.registry.registerGroup('streams', 'streams')
bot.registry.registerGroup('dotabuff', 'dotabuff')
bot.registry.registerDefaults()
bot.registry.registerCommandsIn(__dirname + "/commands")
bot.on('ready', () => {
    console.log('Sakuya ready')
    bot.user.setGame('with Flandre')
})
bot.login('MzM3MjkwNzg0NDE4MTY4ODM0.DFFTzA.WmH7rrxBIlWMsKoZNC9pgAEGYe8')
