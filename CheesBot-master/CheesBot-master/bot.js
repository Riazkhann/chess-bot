console.log('Starting...')

// constants and libraries
const Eris     =   require('eris');
const auth     =   require('./auth.json');
const config   =   require('./config.json');

// login as bot
const bot = new Eris.CommandClient(auth.token, {}, {
    description: config.description,
    owner: config.ownerName,
    prefix: config.prefix,
    ignoreBots: false
});

bot.on("ready", () => { // When the bot is ready
    console.log("Connected... Initilizing Modules");
    modules.forEach( (v, k) => {
        modules[k].init(bot, config) == 'createMessage' && modEvents.createMessage.push(k)
        console.log('Inititilized', modNames[k], 'module successfully...')
    })
    console.log('Ready!')
});

// pass createMessage events to more advanced modules
bot.on("messageCreate", (msg) => {
    modEvents.createMessage.forEach( (v, k) => {
        modules[v].onMessage(bot, msg)
    } )
})

// module loader
var modules   =   []
var modNames  =   []
var modEvents =   {createMessage: []}
var autoLoad  =   require('./modules/autoload.json');
console.log('Loading Modules: ', autoLoad)
console.log('Use the module command to load non-autoloading modules.')

autoLoad.forEach( (v, k) => {
    modules[k] = require('./modules/'+v);
    modules[k] = new modules[k]();
    modNames[k] = v.split('.')[0]
})

// module management commands
bot.registerCommand("modules", (msg, args) => {
    bot.createMessage(msg.channel.id, "**The currently loaded modules are:**\n"+modNames.join(", "))
}, {
    description: "list loaded modules",
    fullDescription: "This command can list the modules that are currently loaded."
});

// connect to bot
bot.connect()

