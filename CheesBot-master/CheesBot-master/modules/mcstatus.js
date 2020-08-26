// the example module, use it to get the format of modules
var Module = function(){};
const axios    =   require('axios');

var defaultIp = "vibemc.mc-dns.com"

Module.prototype.init = function (bot, config) {
    
    bot.registerCommand("mcstatus", (msg, args) => {
            if (args.length === 0) {
                args = defaultIp;
            }
            axios.get('https://api.mcsrvstat.us/2/'+args)
            .then( (res) => {
                    var jsonData = res.data
                    parseMcStat(bot, msg.channel.id, jsonData)
            }, (err) => {
                    bot.createMessage(msg.channel.id, ":x: Something went wrong and we cannot tell if the server is online.")
           })
        }, {
        description: "check the status of a minecraft server",
        fulldescription: "the bot will ping the server and tell you information about it. Note that it is cached for 1 minute",
        usage: "<ip>"
    })
    
}

function parseMcStat(bot, channel, data) {
    if (data.online == true) {
        var exMes = ""
        if (data.players.online < 1) {
            exMes = "\nthe server **might be down** and just using a bungee layer."
        }
        bot.createMessage(channel, ":white_check_mark: The server is **online**\n"+
"there are **"+data.players.online+"/"+data.players.max+"** players online."+
exMes)
    } else {
        bot.createMessage(channel, ":x: The server is **offline**\n")
    }
}

module.exports = Module;
