// the example module, use it to get the format of modules
var Module = function(){};

Module.prototype.init = function (bot, config) {
    
    // karma command
    bot.registerCommand("karma", (msg, args) => {
        // load karma values
        var mdata = {}
        try {
            var mdata = require('./mdata.json')
        } catch (e) {
            var mdata = {}
        }
        var itsKarma = mdata[args.join(' ').trim().toLowerCase()] || 0
        // tell them the karma
        bot.createMessage(msg.channel.id, "**"+args.join(' ')+"** has **"+itsKarma+"** karma.")
    }, {
    description: "show the karma value of something",
    fullDescription: "show the karma value of something\ndo <item>**++** or <item>**--** to change an item's karma",
    usage: "<item>",
    argsRequired: true
    })
    // tell CheesBot we want create message events
    return 'createMessage'
}
   


Module.prototype.onMessage = function (bot, msg, config) {
    // we need fs for this
    const fs = require('fs')

    // load karma values
    var mdata = {}
    try {
        var mdata = require('./mdata.json')
    } catch (e) {
        var mdata = {}
    }

    // write karma values function
    function wdata(mData) {
        fs.writeFile('modules/karma/mdata.json', JSON.stringify(mData, null, 4), 'utf8', (callback) => {});
    }

    var last2 = msg.content.slice(-2)
    var rest = msg.content.slice(0, -2).trim().toLowerCase()
    
    if (last2 == '++') {
        console.log("[karma]", last2, rest)
        mdata[rest] = (mdata[rest]+1) || 1
        wdata(mdata)
        bot.createMessage(msg.channel.id, "**"+rest+"** now has **"+mdata[rest]+"** karma.")
    } else if (last2 == '--') {
        console.log("[karma]", last2, rest)
        mdata[rest] = (mdata[rest]-1) || -1
        wdata(mdata)
        bot.createMessage(msg.channel.id, "**"+rest+"** now has **"+mdata[rest]+"** karma.")
    }
}


module.exports = Module;
