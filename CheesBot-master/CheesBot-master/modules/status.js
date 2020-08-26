// the example module, use it to get the format of modules
var Module = function(){};

Module.prototype.init = function (bot, config) {
    
    bot.editStatus("online", {
        name: "for m.help",
        type: 3
    })
    
    bot.registerCommand('status', (msg, args) => {
            if (msg.author.id == config.owner) {
                bot.editStatus("online", {"name": args.join(' '), "type": 3})
                bot.createMessage(msg.channel.id, ":white_check_mark: Set Status")
            } else {
                bot.createMessage(msg.channel.id, ":x: You do not have permission to do that.")
            }
        }, {
        description: "Set the bot status",
        fullDescription: "Change the bot status to what ever you would like it to watch",
        usage: "<statustext>"
    })
    
}


module.exports = Module;
